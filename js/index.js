/// <reference path="../tsd/three/three.d.ts" />

let container = document.getElementById('container');

let width = container.clientWidth;
let height = container.clientHeight;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(4, 0, 10);

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xeaeaeaea);
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

let controls = new THREE.TrackballControls(camera, renderer.domElement);
let clock = new THREE.Clock();

let firstGeometry = new THREE.BoxGeometry(1, 1, 1);
firstGeometry.translate(-2, 0, 0);

let firstMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

let firstCube = new THREE.Mesh(firstGeometry, firstMaterial);

scene.add(firstCube);

let firstCubeEdgesGeometry = new THREE.EdgesGeometry(firstCube.geometry, 10);

let firstCubeWireframe = new THREE.LineSegments(firstCubeEdgesGeometry, new THREE.LineBasicMaterial({
    color: 0x00000000,
    linewidth: 1.0
}));

scene.add(firstCubeWireframe);

let secondGeometry = new THREE.BoxGeometry(1, 1, 1);
secondGeometry.translate(2, 0, 0);

let secondMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

let secondCube = new THREE.Mesh(secondGeometry, secondMaterial);

scene.add(secondCube);

let secondCubeEdgesGeometry = new THREE.EdgesGeometry(secondCube.geometry, 10);

let position = secondCubeEdgesGeometry.getAttribute("position").array;

console.log(position);

let secondCubeWireframe = new MeshLine();
secondCubeWireframe.setGeometry(position);

let secondCubeWireframeMesh = new THREE.Mesh(secondCubeWireframe.geometry, new MeshLineMaterial({
    color: new THREE.Color(0x00000000),
    near: camera.near,
    far: camera.far,
    lineWidth: 1.0,
    resolution: new THREE.Vector2(width, height)
}));

scene.add(secondCubeWireframeMesh);

let render = function() {
    requestAnimationFrame(render);

    controls.update();

    renderer.render(scene, camera);
};

render();