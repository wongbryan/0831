var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var camera, scene, renderer, controls, gui;
var angle = 0;
var clock = new THREE.Clock();
var time; var startTime = new Date().getTime();

var plane, box, heart;
var NUM_ACROSS = 5;
var NUM_DOWN = 5;
var NUM_MATS = 8;
var hearts = [];

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
		
		camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, .001, 10000 );
		camera.position.set(0, 0, 75);

		// camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, -1000, 1000 );

		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.zoomSpeed = 1.0;

		// controls = new THREE.FirstPersonControls(camera, renderer.domElement)

		// controls = new THREE.OrthographicTrackballControls(camera, renderer.domElement);

		// controls = new THREE.FlyControls(camera, renderer.domElement);
		// controls.movementSpeed = 5.0;
		// controls.rollSpeed = .05;
		// controls.dragToLook = true;

		scene = new THREE.Scene();

		// var height = 125, width = 250, depth = 100;
		var height = HEIGHT, width = WIDTH, depth = WIDTH;

		var directionalLight = new THREE.DirectionalLight(0xffffff, .7);
		directionalLight.position.set(0, height, 0);
		directionalLight.castShadow = true;
		var ambientLight = new THREE.AmbientLight(0x404040);
		var pointLight = new THREE.PointLight(0xff0000, 1, 0);
		pointLight.position.set(0, 25, 10);

		scene.add(ambientLight);
		scene.add(directionalLight);
		scene.add(pointLight);

		var boxGeom = new THREE.OpenBoxBufferGeometry(width, height, depth, 64, 64, 64);
		var mat = new THREE.MeshPhongMaterial({ 
			color : 0x404040,
			specular : 0xffffff,
			transparent : true,
			opacity: .2,
			// side : THREE.DoubleSide
		});
		box = new THREE.Mesh(boxGeom, mat);

		var planeGeom = new THREE.PlaneGeometry(width, depth, 64, 64);
		// var planeMat = new THREE.MeshPhongMaterial({
		// 	color : 0x000000,
		// 	specular : 0xe1e1e1,
		// 	side : THREE.DoubleSide
		// });

		var HEART_GEOM = new THREE.BufferGeometry();

		var loader = new THREE.JSONLoader();
		loader.load(
			'assets/heart.json',

			function(geometry, materials){
				geometry.computeBoundingBox();

				var max = geometry.boundingBox.max,
				    min = geometry.boundingBox.min;
				var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
				var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
				var faces = geometry.faces;

				geometry.faceVertexUvs[0] = [];

				for (var i = 0; i < faces.length ; i++) {

				    var v1 = geometry.vertices[faces[i].a], 
				        v2 = geometry.vertices[faces[i].b], 
				        v3 = geometry.vertices[faces[i].c];

				    geometry.faceVertexUvs[0].push([
				        new THREE.Vector2((v1.x + offset.x)/range.x ,(v1.y + offset.y)/range.y),
				        new THREE.Vector2((v2.x + offset.x)/range.x ,(v2.y + offset.y)/range.y),
				        new THREE.Vector2((v3.x + offset.x)/range.x ,(v3.y + offset.y)/range.y)
				    ]);
				};

				geometry.uvsNeedUpdate = true;
				HEART_GEOM.fromGeometry(geometry);
				HEART_GEOM.computeBoundingBox();

				initHearts(HEART_GEOM);
			}
		);

		window.addEventListener('resize', resize);
	}

	function update(){
		// controls.update();
		var delta = clock.getDelta();
		controls.update(delta);

		SHADER_LIB['lavalamp'].uniforms['time'].value += delta;
		SHADER_LIB['marbling'].uniforms['time'].value += delta;
		SHADER_LIB['wormhole'].uniforms['time'].value += delta;
		SHADER_LIB['tendrils'].uniforms['time'].value += delta;
		SHADER_LIB['kaleido'].uniforms['angle'].value += delta;
		SHADER_LIB['kaleido'].uniforms['time'].value += delta;
		SHADER_LIB['technicolor'].uniforms['time'].value += delta;
		SHADER_LIB['glitch'].uniforms['time'].value += delta;
	}

	function animate(){
		update();
		renderer.render(scene, camera);
		window.requestAnimationFrame(animate);
	}

	init();
	animate();