import * as THREE from 'three'
import { AmbientLight, Clock, HemisphereLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { QNHScene } from './qnh/QNHScene'

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
document.body.appendChild(renderer.domElement)

const scene = new QNHScene(renderer)
const controls = new OrbitControls(scene.camera, renderer.domElement)
const clock = new Clock()

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    scene.camera.aspect = window.innerWidth / window.innerHeight
    scene.camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

let lastFixedTick = 0

function animate() {
    requestAnimationFrame(animate)

    //cube.rotation.x += 0.01
    //cube.rotation.y += 0.01

    //controls.update()

    const delta = clock.getDelta()
    scene.tick(clock.elapsedTime, delta)

    var fdelta = clock.elapsedTime - lastFixedTick
    if (fdelta > 0.03) {
        scene.fixedTick(clock.elapsedTime, fdelta)
        lastFixedTick = clock.elapsedTime
    }

    render()
}

function render() {
    renderer.render(scene, scene.camera)
}
animate()
