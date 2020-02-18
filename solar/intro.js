function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});
  const fov = 40; //field of view angulo de la camara
  const aspect = 2; //Ratio de los pixeles
  const near = 0.1; // punto mas cercano a dibujar
  const far = 500; // punto mas lejano
  const camera = new THREE.PerspectiveCamera(fov,aspect,near,far); // Frustrum aka vision
  camera.position.z = 10; // posicion con los elementos en el eje z
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xDDCCAA);
  const boxWidth = 1; 
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth,boxWidth,boxDepth);
  const material = new THREE.MeshPhongMaterial({color:0x44bb88});
  const cube = new THREE.Mesh(geometry,material);
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color,intensity);
  light.position.set(-1,2,4);
  scene.add(light);
// Funcion de reescalado del canvas
  function resizeRendererToDisplaySize(renderer){
    const canvas = renderer.domElement;
    //this is for HD-DPI
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio| 0;
    //end HD-DPI
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize){
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function makeInstance(geometry,color,x){
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry,material);
    scene.add(cube);

    cube.position.x =(Math.random() * 5) * ((-1)** Math.floor(Math.random() * 2));
    cube.position.y = (Math.random() * 2) * ((-1)** Math.floor(Math.random() * 2));
    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44AA88, 0),
    makeInstance(geometry, 0x8844AA, -2),
    makeInstance(geometry, 0xAA8844, 2)
  ];

  function render(time){
    time *=0.001;

    //responsive de la figura
    if (resizeRendererToDisplaySize(renderer)){
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
    // end responsive

    cubes.forEach((cube,ndx) =>{
    const speed = 1 + ndx *.1;
    const rot = time *speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }  
  requestAnimationFrame(render);

  
}




main();

