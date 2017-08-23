var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var camera, scene, renderer, controls, gui;
var angle = 0;
var clock = new THREE.Clock();
var time; var startTime = new Date().getTime();

var plane;

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
		
		// camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .001, 10000 );
		// camera.position.set(0, 0, 10);

		camera = new THREE.OrthographicCamera( SCREEN_WIDTH / - 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / - 2, -1000, 1000 );

		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.zoomSpeed = 4.0;

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

		var planeGeom = new THREE.PlaneGeometry(SCREEN_WIDTH, SCREEN_HEIGHT);
		var planeMat = new THREE.ShaderMaterial({
			vertexShader : document.getElementById('vertexShader').textContent,
			fragmentShader : document.getElementById('fragmentShader').textContent,
			uniforms : {
				time: { type: "f", value: 1.0 },
				resolution: { type: "v2", value: new THREE.Vector2() },
				utime : { type : "f", value : 0. },
				qtime : { type : "f", value : 0. },
				an : { type : "f", value : 0. },
				speed : { value : 1.0 }
			}
		});

		plane = new THREE.Mesh(planeGeom, planeMat);
		scene.add(plane);

		window.addEventListener('resize', resize);
	}

	function update(){
		controls.update();

		plane.material.uniforms.time.value += .0005;
		var time = plane.material.uniforms.time.value;
		plane.material.uniforms.qtime.value = Math.sin(time) * .4;
		plane.material.uniforms.utime.value = time/2;
		plane.material.uniforms.an.value = Math.sin(time)*3.14157;
	}

	function animate(){
		update();
		renderer.render(scene, camera);
		window.requestAnimationFrame(animate);
	}

	init();
	animate();