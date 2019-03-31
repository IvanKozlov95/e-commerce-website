const deleteArticle = (id) => {
  sendXMLRequest('DELETE', '/article', `id=${id}`, () => document.getElementById(`article-${id}`).remove());
}

const deleteUser = (id) => {
  sendXMLRequest('DELETE', '/users', `id=${id}`, () => window.location.reload());
}