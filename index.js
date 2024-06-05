import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";

function main() {
  // canvas
  const canvas = document.querySelector("#c");
  //const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
    alpha: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio * 2); // Increase pixel ratio for higher resolution
  // Adjust antialiasing quality
  renderer.antialias = true;
  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;

  // camera
  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 200;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  // orbit controls for camera to move around canvas
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  // new scene
  const scene = new THREE.Scene();

  // Directional light 1

  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  // Ambient light
  const ambientLightColor = 0xffff00; // Light yellow
  const ambientLightIntensity = 3;
  const ambientLight = new THREE.AmbientLight(ambientLightColor, ambientLightIntensity);
  scene.add(ambientLight);

  // Hemisphere light
  const skyColor = 0x00bfff; // Light blue
  const groundColor = 0xb97a20; // Brown
  const hemisphereLightIntensity = 3;
  const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, hemisphereLightIntensity);
  scene.add(hemisphereLight);
  

  // geometry
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // new instance

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  // initialize cubes

  // const cubes = [
  //   makeInstance(geometry, 0x44aa88, 0),
  //   makeInstance(geometry, 0x8844aa, -2),
  //   makeInstance(geometry, 0xaa8844, 2),
  // ];

  //sphere
  // const loader = new THREE.TextureLoader();
  // const addImage = loader.load("resources/images/sky.jpg");
  // addImage.colorSpace = THREE.SRGBColorSpace;

  // const sphereGeometry = new THREE.SphereGeometry(5, 10, 10);
  // const sphereColor = 0xff00ff;
  // const sphereMaterial = new THREE.MeshPhongMaterial({ map: addImage });
  // const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  // sphere.position.set(-15, 3, -20);
  // scene.add(sphere);

  //cylinder

  // const cylinderColor = 0xffc0cb;
  // const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 2, 32); // Increase segments for smoother surface
  // const cylinderMaterial = new THREE.MeshPhongMaterial({
  //   color: cylinderColor,
  // });
  // const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  // cylinder.position.set(0, 1, -5);
  // scene.add(cylinder);

    // Add the floor
    const floorGeometry = new THREE.BoxGeometry(30, 0.1, 30); // Width, height, depth
    const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x654321 }); // Gray color
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.set(0, -0.5, 0); // Adjust the position to place it at the bottom
    scene.add(floor);



// Add trees
function addTree(position) {
  const trunkColor = 0xD2B48C; // Light brown
  const leavesColor = 0x228B22; // Dark green
  
  // Trunk (cylinder)
  const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.3, 3, 8); // Adjust size and segments as needed
  const trunkMaterial = new THREE.MeshPhongMaterial({ color: trunkColor });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.copy(position);
  scene.add(trunk);
  
  // Leaves (cone)
  const leavesGeometry = new THREE.ConeGeometry(2, 3, 10); // Adjust size and segments as needed
  const leavesMaterial = new THREE.MeshPhongMaterial({ color: leavesColor });
  const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
  leaves.position.set(position.x, position.y + 2, position.z); // Adjust the position to place leaves on top of the trunk
  scene.add(leaves);
}

// Add trees in the area

// back side
addTree(new THREE.Vector3(-14, 1, -14)); 
addTree(new THREE.Vector3(-9, 1, -14)); 
addTree(new THREE.Vector3(-4, 1, -14)); 
addTree(new THREE.Vector3(1, 1, -14)); 
addTree(new THREE.Vector3(6, 1, -14)); 
addTree(new THREE.Vector3(11, 1, -14)); 

// right side
addTree(new THREE.Vector3(13, 1, -9)); 
addTree(new THREE.Vector3(13, 1, -4)); 
addTree(new THREE.Vector3(13, 1, 1)); 
addTree(new THREE.Vector3(13, 1, 6)); 
addTree(new THREE.Vector3(13, 1, 11)); 

// left side
addTree(new THREE.Vector3(-14, 1, -9)); 
addTree(new THREE.Vector3(-14, 1, -4)); 
addTree(new THREE.Vector3(-14, 1, 1)); 
addTree(new THREE.Vector3(-14, 1, 6)); 
addTree(new THREE.Vector3(-14, 1, 11)); 

// front side
addTree(new THREE.Vector3(-10, 1, 13)); 
addTree(new THREE.Vector3(-4, 1, 13));
addTree(new THREE.Vector3(2, 1, 13));
addTree(new THREE.Vector3(8, 1, 13));






  

  // Load 3D model



  let cat;

  const mtlLoader = new MTLLoader();
  const objLoader = new OBJLoader();

  mtlLoader.load("resources/models/cat.mtl", function (mtl) {
    mtl.preload();
    objLoader.setMaterials(mtl);
    objLoader.load("resources/models/cat.obj", function (root) {
      initializeCat(root);
      animate();
    });
  });


  function initializeCat(root) {
    root.position.set(0, -0.4, -2);
    root.scale.set(0.05, 0.05, 0.05);
    root.rotation.set(-Math.PI / 2, 0, 0); // Rotate the cat to stand on the floor
    scene.add(root);
    cat = root;
  }

  let farmhouse;

  function loadFarmhouse() {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
  
    mtlLoader.load("resources/models/FarmHouse.mtl", function (mtl) {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load("resources/models/FarmHouse.obj", function (root) {
        initializeFarmhouse(root);
        // No need to call animate again if it's already running
      });
    });
  }
  
  function initializeFarmhouse(root) {
    root.position.set(7, -0.4, -8); // Adjust the position as needed
    root.scale.set(0.3, 0.3, 0.3);  // Adjust the scale as needed
    root.rotation.set(0, 0, 0);     // Adjust the rotation as needed
    scene.add(root);
    farmhouse = root;
  }
  loadFarmhouse();


  let shrub;

  // Function to load the shrub model
  function loadShrub() {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();

    mtlLoader.load("resources/models/shrub.mtl", function (mtl) {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load("resources/models/shrub.obj", function (root) {
        initializeShrub(root);
        // No need to call animate again if it's already running
      });
    });
  }

  function initializeShrub(root) {
    root.position.set(2, -0.4, -8); // Adjust the position as needed
    root.scale.set(0.5, 0.5, 0.5);  // Adjust the scale as needed
    root.rotation.set(0, 0, 0);     // Adjust the rotation as needed
    scene.add(root);
    shrub = root;
  }
  loadShrub();


  let gym_1269;

  function loadGym_1269() {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
  
    mtlLoader.load("resources/models/Gym_1269.mtl", function (mtl) {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load("resources/models/Gym_1269.obj", function (root) {
        initializeGym_1269(root);
        // No need to call animate again if it's already running
      });
    });
  }
  
  function initializeGym_1269(root) {
    // Adjust position, scale, rotation as needed
    root.position.set(-6, -0.4, -8); // Adjusted position similar to the shrub
    root.scale.set(0.07, 0.07, 0.07);  // Adjust the scale as needed
    root.rotation.set(0, 0, 0);     // Adjust the rotation as needed
    
    scene.add(root);
    gym_1269 = root;
  }
  // Call loadGym_1269 function to load the model
  loadGym_1269();
  
  let diner;

  function loadDiner() {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
  
    mtlLoader.load("resources/models/Diner.mtl", function (mtl) {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load("resources/models/Diner.obj", function (root) {
        initializeDiner(root);
        // No need to call animate again if it's already running
      });
    });
  }
  
  function initializeDiner(root) {
    // Adjust position, scale, rotation as needed
    root.position.set(6, -0.4, 9); // Adjusted position similar to the shrub
    root.scale.set(-0.5, 0.5, -0.5);  // Adjust the scale as needed
    root.rotation.set(0, 0, 0); // Rotate left (counter-clockwise) by 90 degrees around the z-axis
    
    scene.add(root);
    diner = root;
  }
  
  // Call loadDiner function to load the model
  loadDiner();
  


  function loadTelephonePole() {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
  
    mtlLoader.load("resources/models/telephonePole.mtl", function (mtl) {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load("resources/models/telephonePole.obj", function (root) {
        initializeTelephonePole(root);
        // No need to call animate again if it's already running
      });
    });
  }
  
  function initializeTelephonePole(root) {
    // Adjust position, scale, rotation as needed
    root.position.set(11, -0.4, -3); // Adjusted position similar to the shrub
    root.scale.set(-0.5, 0.5, -0.5);  // Adjust the scale as needed
    root.rotation.set(0, 0, 0); // No rotation needed
    
    scene.add(root);
    telephonePole = root;
  }
  
  // Call loadTelephonePole function to load the model
  loadTelephonePole();
  
  function loadTractor() {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
  
    mtlLoader.load("resources/models/Tractor.mtl", function (mtl) {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load("resources/models/Tractor(1).obj", function (root) {
        initializeTractor(root);
        // No need to call animate again if it's already running
      });
    });
  }
  
  function initializeTractor(root) {
    // Adjust position, scale, rotation as needed
    root.position.set(8, -0.4, 0); // Adjusted position similar to the diner
    root.scale.set(0.3, 0.3, 0.3);  // Adjust the scale as needed
    root.rotation.set(0, 0, 0); // No rotation needed
    
    scene.add(root);
    tractor = root; // Assuming you have a variable named "tractor" to store the reference to the loaded tractor model
  }
  
  // Call loadTractor function to load the model
  loadTractor();

  function loadClub_1260() {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
  
    mtlLoader.load("resources/models/Club_1260.mtl", function (mtl) {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load("resources/models/Club_1260.obj", function (root) {
        initializeClub_1260(root);
        // No need to call animate again if it's already running
      });
    });
  }
  
  function initializeClub_1260(root) {
    // Adjust position, scale, rotation as needed
    root.position.set(-6, -0.4, 7); // Adjusted position similar to the diner
    root.scale.set(-0.05, 0.05, -0.05);  // Adjust the scale as needed
    root.rotation.set(0, 0, 0); // No rotation needed
    
    scene.add(root);
    club_1260 = root; // Assuming you have a variable named "club_1260" to store the reference to the loaded model
  }
  
  // Call loadClub_1260 function to load the model
  loadClub_1260();
  
  function loadBisonPlains() {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
  
    mtlLoader.load("resources/models/BisonPlains.mtl", function (mtl) {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load("resources/models/BisonPlains.obj", function (root) {
        initializeBisonPlains(root);
        // No need to call animate again if it's already running
      });
    });
  }
  
  function initializeBisonPlains(root) {
    // Adjust position, scale, rotation as needed
    root.position.set(4, -0.4, -2); // Adjusted position similar to the diner
    root.scale.set(0.2, 0.2, 0.2);  // Adjust the scale as needed
    root.rotation.set(0, 0, 0); // No rotation needed
    
    scene.add(root);
    bisonPlains = root; // Assuming you have a variable named "bisonPlains" to store the reference to the loaded model
  }
  
  // Call loadBisonPlains function to load the model
  loadBisonPlains();
  
  function loadBadger() {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
  
    mtlLoader.load("resources/models/Badger.mtl", function (mtl) {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load("resources/models/Badger.obj", function (root) {
        initializeBadger(root);
        // No need to call animate again if it's already running
      });
    });
  }
  
  function initializeBadger(root) {
    // Adjust position, scale, rotation as needed
    root.position.set(2, -0.4, -2); // Adjusted position similar to the BisonPlains
    root.scale.set(0.2, 0.2, 0.2);  // Adjust the scale as needed
    root.rotation.set(0, 0, 0); // No rotation needed
    
    scene.add(root);
    badger = root; // Assuming you have a variable named "badger" to store the reference to the loaded model
  }
  
  // Call loadBadger function to load the model
  loadBadger();
   
  function loadTurtle() {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
  
    mtlLoader.load("resources/models/turtle.mtl", function (mtl) {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load("resources/models/turtle.obj", function (root) {
        initializeTurtle(root);
        // No need to call animate again if it's already running
      });
    });
  }
  
  function initializeTurtle(root) {
    // Adjust position, scale, rotation as needed
    root.position.set(-2, -0.4, -2); // Adjusted position similar to the BisonPlains
    root.scale.set(0.1, 0.1, 0.1);  // Adjust the scale as needed
    root.rotation.set(0, 0, 0); // No rotation needed
    
    scene.add(root);
    turtle = root; // Assuming you have a variable named "turtle" to store the reference to the loaded model
  }
  
  // Call loadTurtle function to load the model
  loadTurtle();
  

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const clientWidth = canvas.clientWidth;
    const clientHeight = canvas.clientHeight;
    const model =
      canvas.width !== clientWidth || canvas.height !== clientHeight;
    if (model) {
      renderer.setSize(clientWidth, clientHeight, false);
    }
    return model;
  }

  function render(time) {
    time *= 0.001; // convert time to seconds

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      const aspectRatio = canvas.clientWidth / canvas.clientHeight;
      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
    }

    // cubes.forEach(function (cube, index) {
    //   const speed = 1 + index * 0.1;
    //   const rotation = time * speed;
    //   cube.rotation.x = rotation;
    //   cube.rotation.y = rotation;
    // });

    //if (cat) cat.rotation.y += 0.01;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
