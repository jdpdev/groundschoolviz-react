import React, { ReactNode, useMemo } from 'react'
import { createPortal } from 'react-dom'

import './css/Modal.css'

interface Props {
    children: ReactNode,
    show: boolean
}

export function Modal({ children, show }: Props) {
    const portal = useMemo(() => document.getElementById('app-portal'), [])

    if (!show) {
        return null
    }

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