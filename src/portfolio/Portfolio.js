"use strict";
const { DynamoDBClient, PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require('uuid');
const { transform } = require("../util/portfolioUtil");
const { mergePortfolios } = require("../util/portfolioUtil");

const addPortfolio = async (event) => {
    const { userId, portfolio } = JSON.parse(event.body);
    const createdAt = new Date();
    const id = uuidv4();
    let startDate = new Date();
    const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });
    const transformedPortfolio = transform(portfolio);
    const input = {
        TableName: "PortfolioTable",
        Item: {
            id: { S: id },
            userId: { S: userId },
            portfolio: { M: transformedPortfolio },
            createdAt: { S: createdAt }
        }
    };
    try { 
        await dynamoDBClient.send(new PutItemCommand(input));
    } catch(err) {
        console.log(err)
    }
    const newPortfolio = {
        id: { S: id },
        userId: { S: userId },
        portfolio: { M: transformedPortfolio },
        createdAt: { S: createdAt }
      }

    let endDate = new Date();
    let executionTimeInSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
    console.log("Execution time: " + executionTimeInSeconds + " seconds");
    return {
        statusCode: 200,
        body: JSON.stringify(newPortfolio),
    };
}

const getPortfolio = async (event) => {
    const { id } = event.pathParameters;
    const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });
    const input = {
        TableName: "PortfolioTable",
        Key: {
            id: { S: id }
        }
    };
    try { 
        const data = await dynamoDBClient.send(new GetItemCommand(input));
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item),
        };
    } catch(err) {
        console.log(err)
    }

}

const updatePortfolio = async (event) => {
    try {
        const { portfolio } = JSON.parse(event.body); // Portfolio changes received from frontend
        const { id } = event.pathParameters;
        const createdAt = new Date().toISOString();

        const getItemInput = {
            TableName: "PortfolioTable",
            Key: {
                id: { S: id }
            }
        };

        const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });

        const existingItem = await dynamoDBClient.send(new GetItemCommand(getItemInput));

        if (!existingItem.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify("Portfolio not found"),
            };
        }
        const updatedPortfolio = mergePortfolios(existingItem.Item.portfolio.M, portfolio);
        const updateInput = {
            TableName: "PortfolioTable",
            Key: {
                id: { S: id }
            },
            UpdateExpression: "SET portfolio = :portfolio, createdAt = :createdAt",
            ExpressionAttributeValues: {
                ":portfolio": { M: updatedPortfolio },
                ":createdAt": { S: createdAt }
            },
            ReturnValues: "ALL_NEW"
        };

        const dynamoDBResponse = await dynamoDBClient.send(new UpdateItemCommand(updateInput));

        return {
            statusCode: 200,
            body: JSON.stringify(dynamoDBResponse.Attributes),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify("Error updating portfolio item"),
        };
    }
};

const deletePortfolio = async (event) => {
    try {
        const { id } = event.pathParameters;

        const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });

        const deleteInput = {
            TableName: "PortfolioTable",
            Key: {
                id: { S: id }
            }
        };

        await dynamoDBClient.send(new DeleteItemCommand(deleteInput));

        return {
            statusCode: 200,
            body: JSON.stringify("Portfolio deleted successfully"),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify("Error deleting portfolio"),
        };
    }
};

module.exports = { addPortfolio, getPortfolio, updatePortfolio, deletePortfolio };