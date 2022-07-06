import React from 'react'

interface Props {
    children: JSX.Element | string
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