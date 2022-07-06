import React, { useState } from 'react'
import { Modal } from '../ui/Modal'

import './css/PageLayout.css'

export enum LayoutSlot {
    Top = 'layout-top',
    Bottom = 'layout-bottom',
    Modal = 'layout-modal'
}

type SetInLayoutType = (content: JSX.Element, slot: LayoutSlot) => void

type RenderProp = (
    setInLayout: SetInLayoutType
) => JSX.Element

export interface LayoutSlots {
    [LayoutSlot.Top]?: JSX.Element,
    [LayoutSlot.Bottom]?: JSX.Element,
    [LayoutSlot.Modal]?: JSX.Element
}

interface Props {
    children?: JSX.Element,
    slots: LayoutSlots
}

/**
 * Defines the various slots available to place popups in
 */
export function PageLayout(props: Props) {
    const { children, slots } = props

    return (
        <div className='layout-container'>
            <div className='slot-top'>
                { slots[LayoutSlot.Top] }
            </div>

            <div className='base-content'>
                { children }
            </div>

            <div className='slot-bottom'>
                { slots[LayoutSlot.Bottom] }
            </div>

            { slots[LayoutSlot.Modal] && <Modal>{ slots[LayoutSlot.Modal]! }</Modal> }
        </div>
    )
}