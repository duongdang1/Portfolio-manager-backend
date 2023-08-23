require('dotenv').config();
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
            "X-RapidAPI-Key": process.env.ALPHA_VANTAGE_TIMESERIES_API,
            "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com"
        }
    };
    return options;
}

function RealTimeRequestBuilder(symbol) {
    const options = {
        method: 'GET',
        url: 'https://real-time-finance-data.p.rapidapi.com/stock-quote',
        params: {
            symbol: symbol,
            language: 'en'
        },
        headers: {
            'X-RapidAPI-Key': process.env.REALTIME_FINANCE_DATA,
            'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
        }
    };
    return options;
}

module.exports = { TimeSeriesRequestBuilder, RealTimeRequestBuilder }