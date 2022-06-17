var width = 500;
var height = 400;

var canvas = document.getElementById('item');
canvas.style="border: 1px solid #000;width: "+width+"px; height:"+height+"px;";
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
var camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 1000 );
var renderer = new THREE.WebGLRenderer( { canvas: canvas } );
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var clock = new THREE.Clock();
var mixer = new THREE.AnimationMixer( scene );

renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.8;
renderer.setSize( width, height );
renderer.shadowMap.enabled = true;

camera.position.set( 1.5, 1.5, 1 );
camera.lookAt( 0,0,0 );

/* Product */
var desk, legs;

/* Product Animations */
var drawer = [], door;

new THREE.GLTFLoader().load( 'models/desk2022.gltf', function ( gltf ) {
        
    scene.add( gltf.scene );

    let clip = THREE.AnimationClip.findByName( gltf.animations, 'leftDrawer2Action' );
    drawer[0] = mixer.clipAction( clip );
    clip = THREE.AnimationClip.findByName( gltf.animations, 'leftStorage2Action' );
    door = mixer.clipAction( clip );
    clip = THREE.AnimationClip.findByName( gltf.animations, 'rightDrawer10Action' );
    drawer[1] = mixer.clipAction( clip );
    clip = THREE.AnimationClip.findByName( gltf.animations, 'rightDrawer11Action' );
    drawer[2] = mixer.clipAction( clip );
    clip = THREE.AnimationClip.findByName( gltf.animations, 'rightDrawer12Action' );
    drawer[3] = mixer.clipAction( clip );
    clip = THREE.AnimationClip.findByName( gltf.animations, 'rightDrawer13Action' );
    drawer[4] = mixer.clipAction( clip );

    scene.traverse( function(x) {

        if (x.isMesh) {
            x.castShadow = true;
            x.receiveShadow = true;	
        }
    })

    gltf.material = new THREE.MeshStandardMaterial();
    desk = scene.getObjectByName("desk_out6");
    legs = scene.getObjectByName("paw1");

});

addLights();
animate();

function animate() {

    requestAnimationFrame( animate );
    controls.update();
    mixer.update( clock.getDelta() );
    renderer.render( scene, camera );
}

function addLights() {

    var hemilight = new THREE.HemisphereLight( 0xffeeb1, 0x292619, 4)
    scene.add(hemilight);
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 10, 100, 10 );
    spotLight.castShadow = true;
    scene.add( spotLight );

    var light = document.getElementById("light");

    spotLight.intensity = light.value;

    // Update the current slider value (each time the slider handle is dragged)
    light.oninput = function() {
        spotLight.intensity = this.value;
    }
}

var x = true;
var y = true;
var z = true;

document.getElementById('button_drawers').onclick = function() {
    
    var i;

    for (i = 0; i<5; i++) {

        drawer[i].setLoop(THREE.LoopOnce);
        drawer[i].clampWhenFinished = true;
    }

    for (i = 0; i<5; i++) {
        
        if (x) {

            drawer[i].timeScale = 1;
            
        } else {
            
            drawer[i].timeScale = -1;
        }
    }

    x =! x;

    for (i = 0; i<5; i++) {
        
        drawer[i].paused = false;
        drawer[i].play();
    }
}

document.getElementById('button_door').onclick = function() {

    door.setLoop(THREE.LoopOnce);
    door.clampWhenFinished = true;
    if (y) {
        door.timeScale = 1;
    } else {
        door.timeScale = -1;
    }
    y =! y;
    door.paused = false;
    door.play();
}

function changeTexture(textures) {

    const loader = new THREE.TextureLoader();

    if (textures == 'Birch') {
        var texture = loader.load( 'models/textures/Birch.jpg' );
        desk.material.map = texture;
        var texture = loader.load( 'models/textures/Spruce.jpg' );
        legs.material.map = texture;
    }

    if (textures == 'Spruce') {
        var texture = loader.load( 'models/textures/Spruce.jpg' );
        desk.material.map = texture;
        var texture = loader.load( 'models/textures/Birch.jpg' );
        legs.material.map = texture;
    }

    if (textures == 'Black') {
        var texture = loader.load( 'models/textures/Black.jpg' );
        desk.material.map = texture;
        var texture = loader.load( 'models/textures/White.jpg' );
        legs.material.map = texture;
    }

    if (textures == 'White') {
        var texture = loader.load( 'models/textures/White.jpg' );
        desk.material.map = texture;
        var texture = loader.load( 'models/textures/Black.jpg' );
        legs.material.map = texture;
    }

    if (textures == 'Purple') {
        var texture = loader.load( 'models/textures/Purple.jpg' );
        desk.material.map = texture;
        var texture = loader.load( 'models/textures/Pink.jpg' );
        legs.material.map = texture;
    }

    if (textures == 'Pink') {
        var texture = loader.load( 'models/textures/Pink.jpg' );
        desk.material.map = texture;
        var texture = loader.load( 'models/textures/Purple.jpg' );
        legs.material.map = texture;
    }
}