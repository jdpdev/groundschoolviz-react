import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export function ControlBar({ children }: Props) {
    return (
        <div style={{
            flex: '0 0 auto',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '0.5em'
        }}>
            { children }
        </div>
    )
}