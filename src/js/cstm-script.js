(function(){
	'use strict';
	if (document.querySelectorAll('.custom-sublist').length > 0) {
		window.customMatrix = {
			valid: true,
			arr: [],
			value: ''
		};
		var customSublists = document.querySelectorAll('.custom-sublist');
		var arrOfIds = [];

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

			createArrOfIds(el);
			setInputValue(arrOfIds);
		});

		checkCustomList();

		function initSortableFor(el) {
			Sortable.create(el, {
				group: 'imgs',
				onClone: function (evt) {
					var cloneEl = evt.clone;
					cloneEl.remove();
				},
				onEnd: function (evt) {
					arrOfIds.length = 0;
					Array.prototype.forEach.call(customSublists, function (el){
						createArrOfIds(el);
						setInputValue(arrOfIds);
					});
					checkCustomList();
				}
			});
		}

		function createArrOfIds(el) {
			var customSublist = [];
			Array.prototype.forEach.call(el.children, function(child) {
				customSublist.push(child.getAttribute('data-id'));
			});

			arrOfIds.push(customSublist);
		}

		/**
		 * @param {Array} value
		 */
		function setInputValue(value) {
			document.querySelector('.custom-matrix').value = JSON.stringify(value);
			customMatrix.arr = value;
			customMatrix.value = JSON.stringify(value);
		}

		function checkCustomList() {
			var hasNoOverflow = Array.prototype.every.call(customSublists, function(el, index) {
				var MAX_LENGTH = 4;
				if (document.querySelectorAll('.custom-list-1').length > 0 && ((index + 1) % 3 == 0) ) {
					MAX_LENGTH = 5;
				}
				if (el.children.length > MAX_LENGTH) {
					return false;
				} else {
					return true;
				}
			});

			customMatrix.valid = hasNoOverflow;
		}
	}

})();