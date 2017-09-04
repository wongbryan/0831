var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var camera, scene, renderer, controls, gui;
var angle = 0;
var clock = new THREE.Clock();
var raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2;

var plane, box, heart;
var NUM_ACROSS = 5;
var NUM_DOWN = 5;
var NUM_MATS = 20;
var GRID_WIDTH = 750;
var GRID_HEIGHT = 600; // ):
var hearts = [];

var sound;

function onMouseDown(){
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);

	var intersects = raycaster.intersectObjects(hearts, true);

	if (intersects.length > 0){
		for (var i=0; i<intersects.length; i++){
			var object = intersects[i].object;

			var direction = Math.random() > .5 ? 1 : -1;
			var cur = object.rotation;
			var target = new THREE.Vector3(Math.PI, 8*direction*Math.PI, 0.);
			var tween = new TWEEN.Tween(cur).to(target, 2250);
			tween.easing(TWEEN.Easing.Quartic.InOut);
			tween.onComplete(function(){
				ui.replaceQuote(QUOTES[object.materialID]);
				ui.show();
			});

			tween.start();
		}
	}
	
}

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
		camera.position.set(0, 0, 400);

		var listener = new THREE.AudioListener();
		camera.add( listener );

		// create a global audio source
		sound = new THREE.Audio( listener );

		var audioLoader = new THREE.AudioLoader();

		//Load a sound and set it as the Audio object's buffer
		audioLoader.load( 'assets/dont-know-why.mp3', function( buffer ) {
			sound.setBuffer( buffer );
			sound.setLoop(true);
			sound.play();
		});

		// camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, -1000, 1000 );

		// controls = new THREE.OrbitControls(camera, renderer.domElement);
		// controls.zoomSpeed = 1.0;

		controls = new FlatControls(camera, renderer.domElement);

		// controls = new THREE.FirstPersonControls(camera, renderer.domElement)
		// controls.lookSpeed = .05;

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
		// scene.add(pointLight);

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
		renderer.domElement.addEventListener('mousedown', onMouseDown);

		THREE.DefaultLoadingManager.onLoad = function ( ) {

			var title = document.getElementById('title');
			title.classList.add('hide');

		};
	}

	function morph(){
		return;
	}

	function update(){
		controls.update();
		var delta = clock.getDelta();
		// controls.update(delta);

		var lookat = new THREE.Vector3(camera.position.x, camera.position.y, 0);
		camera.lookAt(lookat);

		SHADER_LIB['lavalamp'].uniforms['time'].value += delta;
		SHADER_LIB['marbling'].uniforms['time'].value += delta;
		SHADER_LIB['wormhole'].uniforms['time'].value += delta;
		SHADER_LIB['tendrils'].uniforms['time'].value += delta;
		SHADER_LIB['kaleido'].uniforms['angle'].value += delta;
		SHADER_LIB['kaleido'].uniforms['time'].value += delta;
		SHADER_LIB['technicolor'].uniforms['time'].value += delta;
		SHADER_LIB['glitch'].uniforms['time'].value += delta;
		SHADER_LIB['gradient'].uniforms['time'].value += delta;
		SHADER_LIB['ring'].uniforms['time'].value += delta;
		SHADER_LIB['rainbow'].uniforms['time'].value += delta;
		SHADER_LIB['crystal'].uniforms['time'].value += delta;
		SHADER_LIB['cells'].uniforms['time'].value += delta;
		SHADER_LIB['waves'].uniforms['time'].value += delta;
		SHADER_LIB['fbm'].uniforms['time'].value += delta;
		SHADER_LIB['kaleido2'].uniforms['time'].value += delta;
		SHADER_LIB['oatmeal'].uniforms['time'].value += delta;

		TWEEN.update();
	}

	function animate(){
		update();
		renderer.render(scene, camera);
		window.requestAnimationFrame(animate);
	}

	init();
	animate();