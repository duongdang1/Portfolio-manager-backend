"use strict";
const axios = require('axios');
const { filterRealTimeResponse } = require("./RealTimeResult")
const { RealTimeRequestBuilder } = require("../RequestUtil");
const getRealTimeData = async (event) => {
    const { ticker } = JSON.parse(event.body);
    const realTimeRequest = RealTimeRequestBuilder(ticker);
    try {
        const response = await axios.request(realTimeRequest)
        const finalResponse = filterRealTimeResponse(response);
        return {
            statusCode:200,
            body: JSON.stringify(finalResponse),
        }
    }catch (error) {
        console.error(error);
    }
}

module.exports = { getRealTimeData }
