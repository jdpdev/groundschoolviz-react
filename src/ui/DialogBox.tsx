import React, { ReactNode } from 'react'

import './css/DialogBox.css'

interface Props {
    children: ReactNode
}

export function DialogBox({ children }: Props) {
    return (
        <div className='dialog-box'>
            { children }
        </div>
    )
}