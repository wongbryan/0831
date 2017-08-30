var loader = new THREE.TextureLoader();
var clock = new THREE.Clock();

/* LIBRARIES */

const TEXTURE_LIB = {
	rain : loader.load('assets/textures/rain.jpg'),
	china : loader.load('assets/textures/chin.jpg'),
	perlin : loader.load('assets/textures/rgb texture.png'),
	ocean : loader.load('assets/textures/ocean.jpg')
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

	refraction : {
		uniforms : {
			resolution : { value : new THREE.Vector2(10, 10) },
			time : { value : 0. },
			speed : { value : .01 },
			opacity : { value : .05 },
			texture : { value : TEXTURE_LIB['ocean'] }
			// pointSize : { value : 3. }
		},
		vertexShader : document.getElementById('genericVertex').textContent,
		fragmentShader : document.getElementById('refractionFragment').textContent
	}
};
