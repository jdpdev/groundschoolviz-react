import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export function Title({ children }: Props) {
    return (
        <h2 style={{
            marginTop: 0
        }}>
            { children }
        </h2>
    )
}