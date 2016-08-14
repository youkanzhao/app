function IndexPage(){
	this._init();
}

IndexPage.prototype = {
	_init : function(){
		this._bindEvent();
	},
	_bindEvent : function(){
		$('input, textarea').placeholder();
	}
};


$(function(){
	var page = new IndexPage();
	
});