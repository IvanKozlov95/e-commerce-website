const sendXMLRequest = (method, url, data, cb) => {
  var xmlhttp = new XMLHttpRequest();


  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
         if (xmlhttp.status == 200) {
           cb();
         }
         else {
             alert('Cant do that bro');
         }
      }
  };

  xmlhttp.open(method, url, true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlhttp.send(data);
}