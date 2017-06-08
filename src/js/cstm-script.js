(function(){
	'use strict';
	if (document.querySelectorAll('.custom-sublist').length > 0) {
		var customSublists = document.querySelectorAll('.custom-sublist');

		Element.prototype.remove = function() {
			this.parentElement.removeChild(this);
		}

		NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
			for (var i = this.length - 1; i >= 0; i--) {
				if(this[i] && this[i].parentElement) {
					this[i].parentElement.removeChild(this[i]);
				}
			}
		}

		Array.prototype.forEach.call(customSublists, function (el){
			initSortableFor(el);
		});

		function initSortableFor(el) {
			Sortable.create(el, {
				group: 'imgs',
				onClone: function (evt) {
					var cloneEl = evt.clone;
					cloneEl.remove();
				}
			});
		}
	}

})();