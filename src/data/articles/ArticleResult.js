function filterArticleResponse(response) {
    const articles = response.data.stories.map(article => ({
        title: { S: article.title }, 
        thumbnailImage: { S: article.thumbnailImage },
        shorturl: { S: article.shortURL }
      }));
    return articles;
    }


module.exports = { filterArticleResponse }