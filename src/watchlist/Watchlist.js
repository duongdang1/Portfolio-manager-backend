"use strict";
const { DynamoDBClient, PutItemCommand, GetItemCommand, DeleteItemCommand,UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { v4: uuidv4 } = require('uuid');
const { updateWatchListUtil } = require("../util/watchlistUtil");

const createWatchList = async (event) => {
    try {
        const { userId, watchListName } = JSON.parse(event.body);
        const id = uuidv4();
        const createdAt = new Date();
        const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });

        const putInput = {
            TableName: "WatchlistTable",
            Item: {
                id: { S: id },
                userId: { S: userId },
                watchListName: { S: watchListName },
                createdAt: { S: createdAt },
                watchlist: { L: [] }
            }
        }

        await dynamoDBClient.send(new PutItemCommand(putInput));
        return {
            statusCode: 200,
            body: JSON.stringify("watchlist created successfully"),
        };
    } catch(err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify("Error creating watchlist"),
        }
    }
}

const updateWatchList = async (event) => {
    try {
        const { watchlist } = JSON.parse(event.body);
        const { id } = event.pathParameters;
        const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });
        const processedWatchlist = watchlist.map(symbol => {
            return { "S": symbol };
        });
        
        const updateInput = {
            TableName: "WatchlistTable",
            Key: {
                id: { S: id }
            },
            UpdateExpression: "SET watchlist = :watchlist",
            ExpressionAttributeValues: {
                ":watchlist": { L: processedWatchlist }
            },
            ReturnValues: "ALL_NEW"
        };
        const dynamoDBResponse = await dynamoDBClient.send(new UpdateItemCommand(updateInput));
        return {
            statusCode: 200,
            body: JSON.stringify(dynamoDBResponse.Attributes),
        };
    }catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify("Error updating watchlist item"),
        };
    }
}

const getWatchList = async (event) => {
    const { id } = event.pathParameters;
    const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });
    const input = {
        TableName: "WatchlistTable",
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

const deleteWatchList = async (event) => {
    try {
        const { id } = event.pathParameters;
        const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });
        const deleteItemInput = {
            TableName: "WatchlistTable",
            Key: { id: { S: id } }
        }
        await dynamoDBClient.send(new DeleteItemCommand({ deleteItemInput }));
        return {
            statusCode: 200,
            body: JSON.stringify("Watchlist deleted successfully"),
        };
    }catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify("Error deleting watchlist item"),
        };
    }
}

module.exports = { createWatchList, getWatchList, deleteWatchList, updateWatchList }