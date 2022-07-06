import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export function ControlBar({ children }: Props) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '0.5em'
        }}>
            { children }
        </div>
    )
}