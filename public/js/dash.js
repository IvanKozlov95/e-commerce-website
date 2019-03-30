const addToCard = (item) => {
  sendXMLRequest('POST', '/users/card', `id=${item._id}`, addItemCard.bind(this, item));
}

const clearCard = () => sendXMLRequest('POST', '/users/card/clear', '', addItemCard());

const addItemCard = (item) => {
  window.location.reload();
}

const remoteCardItem = (id) => {
    // sendXMLRequest('DELETE', '/users/card', `id=${id}`, () => document.getElementById(`card-article-${id}`).remove());
    sendXMLRequest('DELETE', '/users/card', `id=${id}`, addItemCard);
}
