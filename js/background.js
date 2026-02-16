const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({
  alpha:true,
  antialias:true
});

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

/* OBJECTS */
const group = new THREE.Group();
scene.add(group);

for(let i=0;i<60;i++){

  const geo = new THREE.IcosahedronGeometry(
    Math.random()*0.6 + 0.2,
    1
  );

  const mat = new THREE.MeshBasicMaterial({
    color:new THREE.Color(
      `hsl(${Math.random()*360},80%,60%)`
    ),
    wireframe:true
  });

  const mesh = new THREE.Mesh(geo,mat);

  mesh.position.set(
    (Math.random()-.5)*25,
    (Math.random()-.5)*25,
    (Math.random()-.5)*25
  );

  group.add(mesh);
}

/* MOTION */
gsap.to(group.rotation,{
  y:Math.PI*4,
  x:Math.PI*2,
  duration:30,
  repeat:-1,
  ease:"none"
});

/* MOUSE EFFECT */
window.addEventListener("mousemove",(e)=>{
  gsap.to(group.rotation,{
    x:(e.clientY/innerHeight-.5),
    y:(e.clientX/innerWidth-.5),
    duration:1
  });
});

/* RENDER */
function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}
animate();

/* RESIZE */
window.addEventListener("resize",()=>{
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});
