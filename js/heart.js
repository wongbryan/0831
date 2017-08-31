function initHearts(geom){
	var counter = 0;
	var NODE_WIDTH = 10;
	var NODE_HEIGHT = 10;

	for (var i=0; i<NUM_DOWN; i++){
		for (var j=0; j<NUM_ACROSS; j++){
			if (counter == NUM_MATS)
				return;
			var points = false;
			var mat = MATERIALS_LIB[Object.keys(MATERIALS_LIB)[counter]];
			// if (mat.uniforms['pointSize'] !== undefined)
			// 	points = true;
			var x = (j-NUM_ACROSS/2) * NODE_WIDTH, y = -(i-NUM_DOWN/2)* NODE_HEIGHT, z = 0;
			var heart = new Heart(geom, mat, points, x, y, z);
			heart.mesh.materialID = Object.keys(MATERIALS_LIB)[counter];
			hearts.push(heart.mesh);
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