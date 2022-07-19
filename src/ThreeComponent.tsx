import React, { useEffect, useRef, useState } from 'react'
import { Clock, Color, PCFShadowMap, Renderer, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { LessonScene } from './LessonScene'
import { SceneManager } from './SceneManager'
import { EmptyScene } from './three/EmptyScene'
import { QNHScene } from './three/qnh/QNHScene'

interface Props {
    children: (scene: LessonScene) => JSX.Element
    sceneId: string
}

const sceneManager = new SceneManager(
    {
        [QNHScene.ID]: QNHScene,
        [EmptyScene.ID]: EmptyScene
    },
    EmptyScene.ID
)

export function ThreeComponent({ children, sceneId }: Props) {
    const { sceneManager } = useThreeJSApp(sceneId)
    const scene = sceneManager?.currentScene

    return (
        <>
            <div id='three-component' style={{height: '100%'}}>
                { scene != null && children(scene) }
            </div>
            <div id='canvas-container'></div>
        </>
    )
}

type ThreeProps = {
    renderer?: WebGLRenderer,
    sceneManager?: SceneManager,
    scene?: QNHScene,
    clock?: Clock
}

function useThreeJSApp(sceneId: string) {
    const [props, setProps] = useState<ThreeProps>({})
    const rendererRef = useRef<Renderer | null>(null)

    useEffect(() => {
        if (rendererRef.current != null) {
            return
        }

        const _renderer = new WebGLRenderer({
            antialias: true
        })
        const _clock = new Clock()
        
        sceneManager.loadScene(_renderer, sceneId)
        _renderer.setSize(window.innerWidth, window.innerHeight)
        _renderer.shadowMap.enabled = true
        _renderer.shadowMap.type = PCFShadowMap

        document.body.appendChild(_renderer.domElement)
        //document.getElementById('canvas-container')!.appendChild(_renderer.domElement)
        
        window.addEventListener('resize', onWindowResize, false)
        function onWindowResize() {
            const scene = sceneManager.currentScene

            if (scene == null) {
                return
            }

            scene.camera.aspect = window.innerWidth / window.innerHeight
            scene.camera.updateProjectionMatrix()
            _renderer.setSize(window.innerWidth, window.innerHeight)
            render()
        }

        function animate() {
            requestAnimationFrame(animate)

            sceneManager.tick(_clock)
            render()
        }

        function render() {
            const scene = sceneManager.currentScene

            if (scene) {
                _renderer.render(scene, scene.camera)
            }   
        }
        animate()

        setProps({
            renderer: _renderer,
            sceneManager: sceneManager,
            clock: _clock
        })
        rendererRef.current = _renderer

        return () => {
            window.removeEventListener('resize', onWindowResize)
            _renderer.dispose()
        }
    }, [sceneId])

    return props
}