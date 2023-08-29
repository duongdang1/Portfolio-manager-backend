"use strict"; 
const axios = require('axios');

const { filterArticleResponse } = require("./ArticleResult");
const { ArticleRequestBuilder } = require("../RequestUtil");

const getArticleData = async (event) => {
    const articleDataRequest = ArticleRequestBuilder();
    try {
        const response = await axios.request(articleDataRequest);
        const finalResponse = filterArticleResponse(response);
        return {
            statusCode: 200,
            body: JSON.stringify(finalResponse),
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': true,
            },
        }
    }catch (error) {
        console.error(error);
    }
}

module.exports = { getArticleData }