/* ===== 3D BACKGROUND WORLD ===== */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
/* =====   ===== */
camera.position.z = 18;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

renderer.domElement.style.position = "fixed";
renderer.domElement.style.inset = "0";
renderer.domElement.style.zIndex = "0";

document.body.appendChild(renderer.domElement);

/* ===== OBJECT GROUP ===== */

const group = new THREE.Group();
scene.add(group);

/* FLOATING OBJECTS */
for (let i = 0; i < 70; i++) {

  const geo = new THREE.IcosahedronGeometry(
    Math.random() * 0.7 + 0.2,
    1
  );

  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(
      `hsl(${Math.random()*360},80%,60%)`
    ),
    wireframe: true
  });

  const mesh = new THREE.Mesh(geo, mat);

  mesh.position.set(
    (Math.random() - .5) * 30,
    (Math.random() - .5) * 30,
    (Math.random() - .5) * 30
  );

  group.add(mesh);

  /* floating motion */
  gsap.to(mesh.position, {
    y: mesh.position.y + (Math.random() * 3),
    duration: 3 + Math.random() * 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

/* ===== LIGHTS ===== */

scene.add(new THREE.AmbientLight(0xffffff, .6));

const light = new THREE.PointLight(0x38bdf8, 2);
light.position.set(10, 10, 10);
scene.add(light);

/* ===== SMOOTH MOTION ===== */

gsap.to(group.rotation, {
  y: Math.PI * 4,
  x: Math.PI * 2,
  duration: 40,
  repeat: -1,
  ease: "none"
});

/* ===== MOUSE PARALLAX ===== */

addEventListener("mousemove", e => {
  const x = (e.clientX / innerWidth - 0.5) * 0.5;
  const y = (e.clientY / innerHeight - 0.5) * 0.5;

  gsap.to(group.rotation, {
    x: y,
    y: x,
    duration: 1
  });
});

/* ===== RENDER LOOP ===== */

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

/* ===== RESIZE ===== */

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
