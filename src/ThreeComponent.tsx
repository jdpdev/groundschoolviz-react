import React, { useEffect, useRef, useState } from 'react'
import { Clock, PCFShadowMap, Renderer, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { QNHScene } from './three/qnh/QNHScene'

interface Props {
    children: (scene: QNHScene) => JSX.Element
}

export function ThreeComponent({ children }: Props) {
    console.log('[ThreeComponent]')
    const { scene } = useThreeJSApp()

    return (
        <div id='three-component' style={{height: '100%'}}>
            { scene != null && children(scene) }
        </div>
    )
}

type ThreeProps = {
    renderer?: WebGLRenderer,
    scene?: QNHScene,
    clock?: Clock
}

function useThreeJSApp() {
    const [props, setProps] = useState<ThreeProps>({})
    const rendererRef = useRef<Renderer | null>(null)
    const controlsRef = useRef<OrbitControls | null>(null)

    useEffect(() => {
        if (rendererRef.current != null) {
            console.warn('trying to make a second renderer')
            return
        }

        const _renderer = new WebGLRenderer()
        const _scene = new QNHScene(_renderer)
        console.log(_renderer.domElement)
        const _clock = new Clock()

        _renderer.setSize(window.innerWidth, window.innerHeight)
        _renderer.shadowMap.enabled = true
        _renderer.shadowMap.type = PCFShadowMap

        document.body.appendChild(_renderer.domElement)
        
        window.addEventListener('resize', onWindowResize, false)
        function onWindowResize() {
            _scene.camera.aspect = window.innerWidth / window.innerHeight
            _scene.camera.updateProjectionMatrix()
            _renderer.setSize(window.innerWidth, window.innerHeight)
            render()
        }

        let lastFixedTick = 0

        function animate() {
            requestAnimationFrame(animate)

            const delta = _clock.getDelta()
            _scene.tick(_clock.elapsedTime, delta)

            var fdelta = _clock.elapsedTime - lastFixedTick
            if (fdelta > 0.03) {
                _scene.fixedTick(_clock.elapsedTime, fdelta)
                lastFixedTick = _clock.elapsedTime
            }

            render()
        }

        function render() {
            _renderer.render(_scene, _scene.camera)
        }
        animate()

        setProps({
            renderer: _renderer,
            scene: _scene,
            clock: _clock
        })
        rendererRef.current = _renderer
    }, [])

    useEffect(() => {
        if (props.renderer == null || controlsRef.current != null) {
            return
        }

        controlsRef.current = new OrbitControls(props.scene!.camera, props.renderer.domElement)
    }, [props])

    return props
}