function getBarcode(number){
  document.getElementById('cloudResponse').innerHTML = 'Loading..'
  $fh.cloud({
    path: "/barcode/read",
    data: {
      "barcode": number
    }
  }, function(res) {
    document.getElementById('cloudResponse').innerHTML = "<img src='" + res.imagebase64 + "'>" +
    "<p>" + res.productname + "</p>" +
    "<span>$" + res.price + "</span>";
  }, function(msg, err) {
    alert('An error occured: ' + code + ' : ' + errorprops);
  });
}

function loadRecent(){
  $fh.cloud({
    path : '/barcode/recent', method : 'get'
  }, function success(recentItems){
    var recent = document.getElementById('recent');
    recent.innerHTML = '';
    recentItems.forEach(function(item){
      var li = document.createElement('li');
      li.textContent = item;
      recent.appendChild(li);
      li.addEventListener('click', function(e){
        var el = e.target;
        getBarcode(el.textContent);
      });
    });
  },
  function error(){
    console.log(arguments);
  });
}