const deleteArticle = (id) => {
  sendXMLRequest('DELETE', '/article', `id=${id}`, () => document.getElementById(`article-${id}`).remove());
}
