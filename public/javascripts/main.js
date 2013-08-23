(function () {
  
  var link = document.querySelector('a');
  var href = link.getAttribute('href');
  
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
      case 37: return back();
      case 32: case 39: return next();
    }
  };
  
  function back() {
    history.go(-1);
    return false;
  }
  
  function next() {
    document.location.href = href;
    return false;
  }
  
  // Mobile Safari in standalone mode
  // https://gist.github.com/kylebarrow/1042026
  if (("standalone" in window.navigator) && window.navigator.standalone) {
    link.ontouchstart = function (event) {
      event.preventDefault();
      document.location.href = href;
    };
  }
  
}());
