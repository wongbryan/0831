var camera, scene, renderer, controls, gui;
var angle = 0;
var clock = new THREE.Clock();
var time; var startTime = new Date().getTime();

var box;
var shape;

const MAX_VERTICES = 200000;

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
		
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.set(0, 0, 10);
		controls = new THREE.TrackballControls(camera, renderer.domElement);
		controls.rotateSpeed = 2.0;
		controls.panSpeed = 0.8;
		controls.zoomSpeed = 1.5;

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

		var texture = new THREE.TextureLoader().load('assets/rain.jpg');
		texture.wrapT = texture.wrapS = THREE.RepeatWrapping;

		/*INITIALIZE INITIAL POSITIONS*/
		var sphereGeom = new THREE.SphereGeometry(1, 256, 256);

		var geom = new THREE.BufferGeometry();
		var positionArray = new Float32Array(MAX_VERTICES * 3);
		for (var i=0; i<sphereGeom.vertices.length; i++){
			var index = i*3;
			positionArray[index] = sphereGeom.vertices[i].x;
			positionArray[index+1] = sphereGeom.vertices[i].y;
			positionArray[index+2] = sphereGeom.vertices[i].z;
		}
		geom.addAttribute('position', new THREE.BufferAttribute(positionArray, 3));
		geom.attributes['position'].dynamic = true;

		/*INITIALIZE TARGETS*/

		var boxGeom = new THREE.BoxGeometry(1, 256, 256);
		var targetPositionArray = new Float32Array(MAX_VERTICES * 3);
		for (var i=0; i<boxGeom.vertices.length; i++){
			var index = i*3;
			targetPositionArray[index] = boxGeom.vertices[i].x;
			targetPositionArray[index+1] = boxGeom.vertices[i].y;
			targetPositionArray[index+2] = boxGeom.vertices[i].z;
		}
		geom.addAttribute('targetPosition', new THREE.BufferAttribute(targetPositionArray, 3));
		geom.attributes['targetPosition'].dynamic = true;

		/*INITIALIZE MATERIAL*/

		shapeMat = new THREE.ShaderMaterial({
			transparent: true,
			wireframe: true,
			uniforms : {
				"uTime" : { type: "f", value : 0.0 },
				"texture" : { type : "t", value : texture},
				"fSpeed" : { type : "f", value : 5.},
			},
			depthTest: false,
			vertexShader : document.getElementById('vertexShader').textContent,
			fragmentShader : document.getElementById('fragmentShader').textContent
		});

		shape = new THREE.Mesh(geom, shapeMat);
		var s = 7;
		shape.scale.set(s, s, s);
		// shape.position.set()
		scene.add(shape);

		window.addEventListener('resize', resize);
	}

	function morph(){
		return;
	}

	function update(){
		time = new Date().getTime() - startTime;
		shapeMat.uniforms['uTime'].value = time * .000000250;
		camera.lookAt(scene.position);
		controls.update();
	}

	function animate(){
		update();
		renderer.render(scene, camera);
		window.requestAnimationFrame(animate);
	}

	init();
	animate();