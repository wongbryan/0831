var loader = new THREE.TextureLoader();
var clock = new THREE.Clock();

/* LIBRARIES */

function loadTexture(path, repeat){
	var texture = loader.load(path);
	if(repeat)
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	return texture;
}

function generateHeightMap(dt_size){
	var data_arr = new Float32Array( dt_size * dt_size * 3 );
	var length = dt_size * dt_size;

	for ( var i = 0; i < length; i ++ ) {

		var val = THREE.Math.randFloat( 0, 1 );
		data_arr[ i * 3 + 0 ] = val;
		data_arr[ i * 3 + 1 ] = val;
		data_arr[ i * 3 + 2 ] = val;

	}

	var texture = new THREE.DataTexture( data_arr, dt_size, dt_size, THREE.RGBFormat, THREE.FloatType );
	texture.needsUpdate = true;
	return texture;
}

const TEXTURE_LIB = {
	rain : loadTexture('assets/textures/rain.jpg', false),
	china : loadTexture('assets/textures/chin.jpg', true),
	perlin : loadTexture('assets/textures/rgb texture.png', false),
	ocean : loadTexture('assets/textures/ocean.jpg', false),
	me : loadTexture('assets/textures/me.jpg', true)
};

const SHADER_LIB = {
	lavalamp : {
		uniforms : {
			texture : { value : TEXTURE_LIB['rain'] },
			time : { value : 0. },
			speed : { value : .05 }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('lavalampFragment').textContent
	},

	marbling : {		
		uniforms : {
			time : { value : 0. },
			speed : { value : .5 }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('marblingFragment').textContent
	},

	wormhole : {
		uniforms : {
			resolution : { value : new THREE.Vector2(window.innerWidth, window.innerHeight) },
			time : { value : 0. }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('wormholeFragment').textContent
	},

	tendrils : {
		uniforms : {
			resolution : { value : new THREE.Vector2(10, 10) },
			time : { value : 0. },
			speed : { value : .01 },
			opacity : { value : .05 },
			texture : { value : TEXTURE_LIB['ocean'] }
			// pointSize : { value : 3. }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('tendrilsFragment').textContent,
		wireframe : true,
		transparent : true,
	},

	kaleido : {
		uniforms : {
			texture : { value : TEXTURE_LIB['china'] },
			sides : { value : 8 },
			angle : { value : 2*Math.PI/3 },
			time : { value : 0. },
			speed : { value : .05 }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('kaleidoFragment').textContent,
	},

	technicolor : {
		uniforms : {
			time : { value : 0. },
			speed : { value : 2. }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('technicolorFragment').textContent,
		transparent : true
	},

	glitch : {
		uniforms : {
			tDiffuse :		{ value: TEXTURE_LIB['me'] },//diffuse texture
			tDisp :			{ value: generateHeightMap(64) },//displacement texture for digital glitch squares
			amount :		{ value: .001 },
			angle :			{ value: 0.02 },
			seed :			{ value: 0.02 },
			seed_x :		{ value: 0.02 },//-1,1
			seed_y :		{ value: 0.02 },//-1,1
			distortion_x :	{ value: 0.5 },
			distortion_y :	{ value: 0.6 },
			col_s :			{ value: 0.5 },
			time : { value: 0. },
			speed : { value : .05 }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('glitchFragment').textContent,
	}
};

const MATERIALS_LIB = {
	lavalamp : new THREE.ShaderMaterial(SHADER_LIB['lavalamp']),

	marbling : new THREE.ShaderMaterial(SHADER_LIB['marbling']),

	wormhole : new THREE.ShaderMaterial(SHADER_LIB['wormhole']),

	tendrils : new THREE.ShaderMaterial(SHADER_LIB['tendrils']),

	refraction : (function(){
		var r = "assets/textures/cube/dark-s_";
		var urls = [
			r + "px.jpg", r + "nx.jpg",
			r + "py.jpg", r + "ny.jpg",
			r + "pz.jpg", r + "nz.jpg"
		];
		var refractionCube = new THREE.CubeTextureLoader().load( urls );
		refractionCube.format = THREE.RGBFormat;
		refractionCube.mapping = THREE.CubeRefractionMapping;

		var reflectionCube = new THREE.CubeTextureLoader().load( urls );
		reflectionCube.format = THREE.RGBFormat;

		var material = new THREE.MeshLambertMaterial( { 
			color: 0xffffff, 
			envMap: reflectionCube, 
		} );

		return material;
	})(),

	kaleido : new THREE.ShaderMaterial(SHADER_LIB['kaleido']),

	technicolor : new THREE.ShaderMaterial(SHADER_LIB['technicolor']),

	glitch : new THREE.ShaderMaterial(SHADER_LIB['glitch'])
}
