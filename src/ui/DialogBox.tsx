import React from 'react'

import './css/DialogBox.css'

interface Props {
    children: JSX.Element
}

export function DialogBox({ children }: Props) {
    return (
        <div className='dialog-box'>
            { children }
        </div>
    )
}