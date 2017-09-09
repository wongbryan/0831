var FlatControls = function( camera, domElement ){
	var x = camera.position.x, y = camera.position.y, z = camera.position.z;

	var _this = this;

	this.camera = camera;
	this.target = new THREE.Vector3(x, y, 0);

	this.moveTo = function(x, y, z, duration){
		var vector = new THREE.Vector3(x, y, z);

		var tween = new TWEEN.Tween(_this.camera.position).to(vector, duration);
		tween.easing(TWEEN.Easing.Exponential.Out);
		tween.onUpdate(function(){	

			var pos = camera.position;
			_this.target.set(pos.x, pos.y, 0); //look straight ahead
			_this.update();
		});
		tween.start();
	}

	this.update = function(){
		this.camera.lookAt( this.target );
	}
}