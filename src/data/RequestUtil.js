function TimeSeriesRequestBuilder(symbol) {
    const options = {
        method: "GET",
        url: "https://alpha-vantage.p.rapidapi.com/query",
        params: {
            interval: "5min",
            function: "TIME_SERIES_INTRADAY",
            symbol: symbol,
            datatype: "json",
            output_size: "compact"
        },
        headers: {
            "X-RapidAPI-Key": "a3f7c9efd6msh223c604baea790cp1796a9jsn3493cf60d423",
            "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com"
        }
    };
    return options;
}

module.exports = { TimeSeriesRequestBuilder }