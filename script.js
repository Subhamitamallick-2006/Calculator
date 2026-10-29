// === Web Audio API (Sci-Fi Sound Generation) ===
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSciFiSound(freq = 600, type = 'sine') {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

// === Calculator Logic with Scientific Functions ===
const display = document.getElementById('display');
const subDisplay = document.getElementById('sub-display');

function appendValue(val) {
    playSciFiSound(800, 'square');
    display.value += val;
}

function appendFunction(func) {
    playSciFiSound(900, 'sine');
    display.value += func;
}

function clearDisplay() {
    playSciFiSound(300, 'sawtooth');
    display.value = '';
    subDisplay.innerText = '';
}

function deleteChar() {
    playSciFiSound(400, 'triangle');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    playSciFiSound(1200, 'sine');
    try {
        subDisplay.innerText = display.value + ' =';
        // JavaScript eval-এর মাধ্যমে ম্যাথ ফাংশন এক্সিকিউট করা
        let result = eval(display.value);
        display.value = Number.isFinite(result) ? parseFloat(result.toFixed(6)) : 'ERROR';
    } catch (err) {
        display.value = 'ERROR';
    }
}

// === THREE.JS 3D BACKGROUND ANIMATION ===
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 1. Fiery Ring (Arc Reactor Style)
const ringGeo = new THREE.TorusGeometry(3.5, 0.08, 16, 100);
const ringMat = new THREE.MeshBasicMaterial({ color: 0xffd700, wireframe: true });
const fieryRing = new THREE.Mesh(ringGeo, ringMat);
scene.add(fieryRing);

// 2. Inner Blue Core
const coreGeo = new THREE.OctahedronGeometry(1.5, 2);
const coreMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true });
const coreMesh = new THREE.Mesh(coreGeo, coreMat);
scene.add(coreMesh);

// 3. Floating 3D Cubes
const cubes = [];
const cubeGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);

for (let i = 0; i < 30; i++) {
    const cubeMat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x00f0ff : 0xff3366,
        wireframe: true
    });
    const cube = new THREE.Mesh(cubeGeo, cubeMat);
    
    cube.position.x = (Math.random() - 0.5) * 15;
    cube.position.y = (Math.random() - 0.5) * 10;
    cube.position.z = (Math.random() - 0.5) * 10;
    
    scene.add(cube);
    cubes.push(cube);
}

camera.position.z = 7;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate Center Ring & Core
    fieryRing.rotation.x += 0.01;
    fieryRing.rotation.y += 0.02;

    coreMesh.rotation.y -= 0.015;

    // Floating Cubes Movement
    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.y += Math.sin(Date.now() * 0.001 + cube.position.x) * 0.003;
    });

    renderer.render(scene, camera);
}

animate();

// Responsive Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});