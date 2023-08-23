function filterTimeSeriesResponse(response) {
    const finalResponse = {
        symbol: { S: response.data["Meta Data"]["2. Symbol"] },
        interval: { S: response.data["Meta Data"]["4. Interval"] },
        lastRefreshed: { S: response.data["Meta Data"]["3. Last Refreshed"]},
        timeZone: { S: response.data["Meta Data"]["6. Time Zone"] },
        timeSeries: { M: response.data["Time Series (5min)"]}
    }
    return finalResponse;
}

module.exports = { filterTimeSeriesResponse }
