var camera, scene, renderer, controls, gui;
var angle = 0;
var clock = new THREE.Clock();
var time; var startTime = new Date().getTime();

var box;
var shape, shape2, shape3;
var ground;
var shapes = [];

function resize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function init() {
		var container = document.getElementById( 'container' );
		renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCSoftShadowMap;
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight);
		renderer.setClearColor(0xededed);
		container.appendChild( renderer.domElement );
		
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .001, 10000 );
		camera.position.set(0, 0, 10);
		// controls = new THREE.TrackballControls(camera, renderer.domElement);
		// controls.rotateSpeed = 2.0;
		// controls.panSpeed = 0.8;
		// controls.zoomSpeed = 1.5;
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.zoomSpeed = 4.0;
		// controls = new THREE.FirstPersonControls(camera, renderer.domElement);
		// controls.moveSpeed = 1.0;

		scene = new THREE.Scene();

		var directionalLight = new THREE.DirectionalLight(0xffffff, .7);
		directionalLight.position.set(1, -1, 0).normalize();
		directionalLight.castShadow = true;
		var ambientLight = new THREE.AmbientLight(0xffffff);
		var pointLight = new THREE.PointLight(0xffffff);
		pointLight.position.set(0, 0, 0);

		scene.add(ambientLight);
		scene.add(directionalLight);
		scene.add(pointLight);

		ground = new THREE.Group();

		var geom = new THREE.PlaneGeometry(1, 1, 128, 128);
		var shapeMat = new THREE.ShaderMaterial({
			uniforms : {
				time : { value : time }
			},
			side : THREE.DoubleSide,
			// depthTest: false,
			vertexShader : document.getElementById('vertexShader').textContent,
			fragmentShader : document.getElementById('fragmentShader').textContent
		});

		var s = 12;
		for (var i=-1; i<2; i++){
			var shape = new THREE.Mesh(geom, shapeMat);
			shape.scale.set(s, s, s);
			shape.rotation.z = i*Math.PI/2;
			shape.position.set(0, i*(s - 1), 0);
			ground.add(shape);
			shapes.push(shape);
			// scene.add(shape);
		}

		// shape = new THREE.Mesh(geom, shapeMat);
		// var s = 12;
		// shape.scale.set(s, s, s);

		// shape.position.set(0, -s, 0);

		// shape2 = shape.clone();
		// shape2.rotation.z = Math.PI/2;
		// shape2.position.set(0, 0, 0);

		// shape3 = shape.clone();
		// shape3.rotation.z = Math.PI;
		// shape3.position.set(0, s, 0);

		// ground.add(shape);
		// ground.add(shape2);
		// ground.add(shape3);

		ground.rotation.x = -Math.PI/2.1;

		scene.add(ground);

		window.addEventListener('resize', resize);
	}

	function update(){
		var delta = clock.getDelta();
		// controls.update(delta);
		controls.update();
		for (var i=0; i<shapes.length; i++){
			if(shapes[i].position.y <= -15)
				shapes[i].position.y = 11;
			shapes[i].position.y -= .023;
		}
	}

	function animate(){
		update();
		renderer.render(scene, camera);
		window.requestAnimationFrame(animate);
	}

	init();
	animate();