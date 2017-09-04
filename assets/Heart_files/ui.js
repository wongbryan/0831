var UI =function(){
	this.domElement = document.getElementById('ui');
	this.hide = function(){
		this.domElement.classList.remove('show');
		this.domElement.classList.add('hide');
	}
	this.show = function(){
		this.domElement.classList.remove('hide');
		this.domElement.classList.add('show');
	}
	this.replaceQuote = function(string){
		var quote = document.getElementById('quote').getElementsByTagName('h1')[0];
		quote.innerText = string;
	}
};

var ui = new UI();

var closeButton = document.getElementById('close');
closeButton.addEventListener('mousedown', function(){
	ui.hide();
});