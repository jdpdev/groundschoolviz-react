import React from 'react'
import { Link } from 'react-router-dom'
import { ThreeComponent } from '../../ThreeComponent'
import { EmptyScene } from '../EmptyScene'

import './Menu.css'

interface Props {

}

export function Menu() {
    return (
        <ThreeComponent sceneId={EmptyScene.ID}>
            { (scene) => <MenuContent /> }
        </ThreeComponent>
    )
}

function MenuContent() {
    return (
        <div className='menu-container'>
            <div className='menu-content'>
                <h2>Lessons</h2>

                <p>
                    <Link to='/qnh'>What's the Deal with Altimeter Setting?</Link>
                    <span>Demonstrates the importance of keeping your altimeter setting up-to-date with local conditions.</span>
                </p>
            </div>
        </div>
    )
}