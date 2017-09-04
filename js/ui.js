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

var nav = document.getElementById('nav');
var boxes = nav.getElementsByClassName('flex-item');
var activeBox = boxes[0];

function initNav(){
	for ( var i=0; i<HEARTS.length; i++){
		(function(index){

			var box = boxes[index];
			console.log(HEARTS[index]);
			box.addEventListener('mousedown', function(){

				if (activeBox == box)
					return;
				else{
					activeBox.classList.remove('active');
					box.classList.add('active');
					activeBox = box;
				}

				var pos = HEARTS[index].position;
				var x = pos.x, y = pos.y;
				controls.moveTo(x, y, 250, 2000);
			});

		})(i);
	}
}

