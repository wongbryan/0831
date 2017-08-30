function initHearts(geom){
	var counter = 0;
	var NODE_WIDTH = 10;
	var NODE_HEIGHT = 10;

	for (var i=0; i<NUM_DOWN; i++){
		for (var j=0; j<NUM_ACROSS; j++){
			var points = false;
			var shader = SHADER_LIB[Object.keys(SHADER_LIB)[counter]];
			var mat = new THREE.ShaderMaterial(shader);
			console.log(mat.uniforms['points']);
			if (mat.uniforms['pointSize'] !== undefined)
				points = true;
			var x = (j-NUM_ACROSS/2) * NODE_WIDTH, y = -(i-NUM_DOWN/2)* NODE_HEIGHT, z = 0;
			var heart = new Heart(geom, mat, points, x, y, z);
			hearts.push(heart);
			scene.add(heart.mesh);

			counter++;
		}
	}
}

var Heart = function(geometry, material, points, x, y, z){
	var geom = geometry;
	// geom.computeBoundingBox();
	// var geom = new THREE.BoxGeometry(100, 100, 100, 64, 64);
	var mesh;

	if (points)
		mesh = new THREE.Points(geom, material);
	else
		mesh = new THREE.Mesh(geom, material);

	mesh.position.set(x, y, z);
	mesh.rotation.x = Math.PI;

	this.mesh = mesh;

}