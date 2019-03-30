const deleteArticle = (id) => {
  sendXMLRequest('/article', { id }, () => document.getElementById(`article-${id}`).remove());
}

const sendXMLRequest = (url, data, cb) => {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
         if (xmlhttp.status == 200) {
           cb();
         }
         else {
             alert('Cant delete an article');
         }
      }
  };

  xmlhttp.open("DELETE", url, true);
  xmlhttp.send();
}