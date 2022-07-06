import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'

import './css/Modal.css'

interface Props {
    children: JSX.Element
}

export function Modal({ children }: Props) {
    const portal = useMemo(() => document.getElementById('app-portal'), [])

    return createPortal(
        <div className='modal-container'>
            <div className='modal-background' />
            <div className='modal-content'>
                { children }
            </div>
        </div>,
        portal!
    )
}