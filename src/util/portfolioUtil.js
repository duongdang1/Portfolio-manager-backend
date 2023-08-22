function mergePortfolios(existingPortfolio, portfolioChanges) {
    const updatedPortfolio = { ...existingPortfolio };

    for (const symbol in portfolioChanges) {
        if (updatedPortfolio[symbol]) {
            updatedPortfolio[symbol].N = (parseInt(updatedPortfolio[symbol].N) + parseInt(portfolioChanges[symbol])).toString();
        }
        // You might want to handle cases where the symbol doesn't exist in the portfolio
    }

    return updatedPortfolio;
    
}


function transform(portfolio) {
    const transformedPortfolio = {};

    for (const symbol in portfolio) {
        transformedPortfolio[symbol] = { N: portfolio[symbol] };
    }

    return transformedPortfolio;
}

module.exports = { mergePortfolios, transform };