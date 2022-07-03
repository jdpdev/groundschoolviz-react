import React from 'react'

import './css/Altimeter.css'

interface Props {
    setting: number,
    altitude: number
}

export function Altimeter({ setting, altitude }: Props) {
    return (
        <div className='altimeter'>
            <div className='altimeter-body'>
                <div 
                    className='altimeter-arm' 
                    style={{
                        transform: `rotate(${altitude}turn)`,
                        transition: 'transform',
                        transitionDuration: '1s'
                    }}
                />
            </div>
            <div className='altimeter-setting'>
                { setting.toPrecision(4) }
            </div>
        </div>
    )
}