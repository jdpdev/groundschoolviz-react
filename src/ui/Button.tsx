import classNames from 'classnames'
import React, { ComponentProps } from 'react'

import './css/Button.css'

interface ButtonProps extends ComponentProps<'button'> {
    
}

export function Button(props: ButtonProps) {
    const classes = classNames(props.className, 'standard-button')
    return (
        <button
            {...props}
            className={classes}
        >
            { props.children }
        </button>
    )
}

// bright color: #ffc800