import * as THREE from '../assets/three/build/three.module.js'
import { GLTFLoader } from '../assets/three/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from '../assets/three/jsm/controls/OrbitControls.js';
((window, document, undefined) => {
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 800;

  const canvas = document.querySelector('.webgl')

  const renderer = new THREE.WebGL1Renderer({ antialias: true, alpha: true, canvas: canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
  const camera = new THREE.PerspectiveCamera(45, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 2000);
  camera.position.set(100, 200, 300);

  const scene = new THREE.Scene();
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(0, 40, -10);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 180;
  dirLight.shadow.camera.bottom = -100;
  dirLight.shadow.camera.left = -120;
  dirLight.shadow.camera.right = 120;
  scene.add(dirLight);
  console.log(dirLight)
  const controls = new OrbitControls(camera, renderer.domElement);
  const manager = new THREE.LoadingManager();
  const textureLoader = new THREE.TextureLoader(manager);

  //textures
  var Charizard = '3DAssets/Mesh/rig_bat_000610_lv3.gltf'
  var texturearray = [{
      map: '3DAssets/Texture2D/t_d_bat_0006body_lv3.-5158045368632964036_Texture2D.png',
      //normalMap: 'Assets/Texture2D/t_mroe_bat_0006body_lv3.-3515256714795374082_Texture2D.png',
    },
    {
      map: '3DAssets/Texture2D/t_d_bat_0006eye_lv3.-6939755195413027275_Texture2D.png',
      //normalMap: 'Assets/Texture2D/t_n_bat_000610_lv3.8318666180261033197_Texture2D.png',
    },
    {
      map: '3DAssets/Texture2D/t_d_bat_000610_lv3.-4421308770218877270_Texture2D.png',
      normalMap: 'Assets/Texture2D/t_n_bat_000610_lv3.8318666180261033197_Texture2D.png',
    }
  ];

  const loader = new GLTFLoader()
  var model;
  loader.load(
    Charizard,
    function(gltf) {
      model = gltf.scene
      model.children.forEach((c) => {
        c.children.forEach((child, i) => {
          const TexMap = textureLoader.load(texturearray[i].map)
          const TexNM = textureLoader.load(texturearray[i].normalMap)
          child.material.map = TexMap;
          if (texturearray[i].normalMap) {
            child.material.normalMap = TexNM;
          }
          child.material.metalness = 0;
        });
      });
      model.rotation.x = 4.71239
      model.position.y = -100
      model.scale.multiplyScalar(100);
      scene.add(model);

      gltf.animations;
      gltf.scene;
      gltf.scenes;
      gltf.cameras;
      gltf.asset;
    },
    function(xhr) {
      //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function(error) {
      console.log('An error happened');
    }
  );

  var texture = textureLoader.load('Assets/Images/t_default_entrycard_bg.png');
  scene.background = texture;

  function render() {
    renderer.render(scene, camera, model);
    renderer.setClearColor(0x808080);
  }
  (function animate() {
    requestAnimationFrame(animate);
    render();
  })();
})(window, window.document);
