function search(e) {
  if(e.keyCode == 13)
  {
    // sendXMLRequest('POST', '/users/card', `id=${item._id}`, addItemCard.bind(this, item));
    window.location = `/dashboard?search=${e.target.value}`;
    return false;
  }
  return true;
}