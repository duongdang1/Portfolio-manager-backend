function updateWatchlistUtil(existingWatchlist, itemsToAdd, itemsToRemove) {
    const updatedWatchlist = existingWatchlist.filter(item => !itemsToRemove.includes(item.S));
    
    itemsToAdd.forEach(item => {
        if (!updatedWatchlist.includes(item)) {
            updatedWatchlist.push({ S: item });
        }
    });

    return updatedWatchlist;
}

module.exports = { updateWatchlistUtil }