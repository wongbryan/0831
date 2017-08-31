var loader = new THREE.TextureLoader();
var clock = new THREE.Clock();

/* LIBRARIES */

function loadTexture(path, video, repeat){
	var texture;
	if (video){
		var video = document.createElement('video');
		video.src = path;
		video.loop = true;
		video.play();

		texture = new THREE.VideoTexture(video);
		texture.flipY = false;
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		texture.format = THREE.RGBFormat;
	}

	else{
		texture = loader.load(path);
	}

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
	rain : loadTexture('assets/textures/rain.jpg', false, false),
	china : loadTexture('assets/textures/chin.jpg', false, true),
	perlin : loadTexture('assets/textures/rgb texture.png', false, false),
	ocean : loadTexture('assets/textures/ocean.jpg', false, true),
	me : loadTexture('assets/textures/me.jpg', false, true),
	heightmap : loadTexture('assets/textures/height-map.jpg', false, false),
	video : loadTexture('assets/video.mp4', true, false, ),
	oatmeal : loadTexture('assets/textures/oatmeal.jpg', false, false, )
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
		vertexShader : document.getElementById('tendrilsVertex').textContent,
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
	},

	gradient : {
		uniforms : {
			colorA : { value : new THREE.Color(0xff0000) },
			colorB : { value : new THREE.Color(0xffff00) },
			resolution : { value : new THREE.Vector2(window.innerWidth, window.innerHeight) },
			time : { value : 0. },
			speed : { value : .5 }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('gradientFragment').textContent,
		transparent : true
	},

	ring : {
		uniforms : {
			resolution : { value : new THREE.Vector2(window.innerWidth, window.innerHeight) },
			time : { value : 0. },
			speed : { value : .5 }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('ringFragment').textContent,
		transparent : true
	},

	rainbow : {
		uniforms : {
			resolution : { value : new THREE.Vector2(window.innerWidth, window.innerHeight) },
			time : { value : 0. },
			speed : { value : .5 }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('rainbowFragment').textContent,
		transparent : true
	},

	video : {
		uniforms : {
			tVideo : { value : TEXTURE_LIB['video'] }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('videoFragment').textContent
	},

	sepia : {
		uniforms : {
			amount : { value : 5. },
			tDiffuse : { value : TEXTURE_LIB['video'] },
			time : { value : 0. },
			speed : { value : .5 }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('sepiaFragment').textContent,
		transparent : true
	},

	crystal : {
		uniforms : {
			resolution : { value : new THREE.Vector2(window.innerWidth, window.innerHeight) },
			time : { value : 0. },
			speed : { value : .25 }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('crystalFragment').textContent
	},

	cells : {
		uniforms : {
			resolution : { value : new THREE.Vector2(window.innerWidth, window.innerHeight) },
			time : { value : 0. },
			speed : { value : .25 }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('cellsFragment').textContent
	},

	waves : {
		uniforms : {
			resolution : { value : new THREE.Vector2(window.innerWidth, window.innerHeight) },
			time : { value : 0. },
			speed : { value : .25 }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('wavesFragment').textContent
	},

	fbm : {
		uniforms : {
			resolution : { value : new THREE.Vector2(window.innerWidth, window.innerHeight) },
			time : { value : 0. },
			speed : { value : .25 }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('fbmFragment').textContent
	},

	kaleido2 : {
		uniforms : {
			texture : { value : TEXTURE_LIB['ocean'] },
			sides : { value : 8 },
			angle : { value : 2*Math.PI/3 },
			time : { value : 0. },
			speed : { value : .2 }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('kaleidoFragment').textContent,
	},

	oatmeal : {
		uniforms : {
			texture : { value : TEXTURE_LIB['oatmeal'] },
			time : { value : 0. },
			speed : { value : .05 }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('lavalampFragment').textContent
	},
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

	glitch : new THREE.ShaderMaterial(SHADER_LIB['glitch']),

	video : new THREE.ShaderMaterial(SHADER_LIB['video']),

	gradient : new THREE.ShaderMaterial(SHADER_LIB['gradient']),

	ring : new THREE.ShaderMaterial(SHADER_LIB['ring']),

	rainbow : new THREE.ShaderMaterial(SHADER_LIB['rainbow']),

	sepia : new THREE.ShaderMaterial(SHADER_LIB['sepia']),

	crystal : new THREE.ShaderMaterial(SHADER_LIB['crystal']),

	cells : new THREE.ShaderMaterial(SHADER_LIB['cells']),

	waves : new THREE.ShaderMaterial(SHADER_LIB['waves']),

	fbm : new THREE.ShaderMaterial(SHADER_LIB['fbm']),

	kaleido2 : new THREE.ShaderMaterial(SHADER_LIB['kaleido2']),

	oatmeal : new THREE.ShaderMaterial(SHADER_LIB['oatmeal'])
}
