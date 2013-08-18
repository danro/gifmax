(function () {
	
	document.onkeydown = function (evt) {
		evt = evt || window.event;
		switch (evt.keyCode) {
			case 37: return back();
			case 32: case 39: return next();
		}
	};
	
	function back() {
		history.go(-1);
	}
	
	function next() {
		var el = document.querySelector("a");
		window.location.href = el.attributes.href.value;
	}
	
}());
