function filterRealTimeResponse(response) {
    const finalResponse = { 
        ticker: { S: response.data["data"]["symbol"]},
        price: { N: response.data["data"]["price"]},
        open: { N: response.data["data"]["open"]},
        high: { N: response.data["data"]["high"]},
        low: { N: response.data["data"]["low"]},
        volume: { N: response.data["data"]["volume"]},
        change: { N: response.data["data"]["change"]},
        changePercent: {N: response.data["data"]["change_percent"]},
        lastUpdate: { S: response.data["data"]["last_update_utc"]}
    }
    return finalResponse;
}

module.exports = { filterRealTimeResponse }