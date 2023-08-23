"use strict";
const axios = require('axios');
const { filterTimeSeriesResponse } = require("../time-series/TimeSeriesResult")
const { TimeSeriesRequestBuilder } = require("../RequestUtil")
const getTimeSeriesData = async (event) => {
    const { ticker } = JSON.parse(event.body);
    const timeSeriesRequest = TimeSeriesRequestBuilder(ticker);
    try { 
        const response = await axios.request(timeSeriesRequest);
        const finalResponse = filterTimeSeriesResponse(response);
        return {
            statusCode: 200,
            body: JSON.stringify(finalResponse),
        };
    }catch (error) {
        console.error(error);
    }
    
}

module.exports = { getTimeSeriesData }