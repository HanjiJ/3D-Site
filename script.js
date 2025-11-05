// === THREE.JS СЦЕНА ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 3;

// === СВЕТ ===
const pointLight = new THREE.PointLight(0x00e0ff, 2);
pointLight.position.set(4, 4, 4);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// === ОБЪЁМНЫЙ КУБ ===
const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
const material = new THREE.MeshPhysicalMaterial({
  color: 0x00e0ff,
  metalness: 0.8,
  roughness: 0.1,
  clearcoat: 0.5,
  emissive: 0x001144,
  emissiveIntensity: 0.6,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// === ЗВЁЗДЫ ===
const starsGeometry = new THREE.BufferGeometry();
const isMobile = window.innerWidth < 768;
const starsCount = isMobile ? 1000 : 4000;
const positions = [];
for (let i = 0; i < starsCount; i++) {
  positions.push((Math.random() - 0.5) * 100);
  positions.push((Math.random() - 0.5) * 100);
  positions.push((Math.random() - 0.5) * 100);
}
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const starsMaterial = new THREE.PointsMaterial({
  color: 0x00e0ff,
  size: isMobile ? 0.05 : 0.02,
});
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// === ПАРАЛЛАКС ДЛЯ ПК ===
if (!isMobile) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    cube.rotation.x += y * 0.02;
    cube.rotation.y += x * 0.02;
  });
}

// === АНИМАЦИЯ ===
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.013;
  stars.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

// === АДАПТИВ ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

