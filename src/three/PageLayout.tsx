import React, { ReactElement } from 'react'
import { Modal } from '../ui/Modal'

import './css/PageLayout.css'

export enum LayoutSlot {
    Top = 'layout-top',
    Bottom = 'layout-bottom',
    Modal = 'layout-modal'
}

export interface LayoutSlots {
    [LayoutSlot.Top]?: ReactElement,
    [LayoutSlot.Bottom]?: ReactElement,
    [LayoutSlot.Modal]?: ReactElement
}

interface Props {
    children?: ReactElement
}

/**
 * Defines the various slots available to place popups in
 */
export function PageLayout(props: Props) {
    const { children } = props

    return (
        <div className='layout-container'>
            <div className='base-content'>
                { children }
            </div>
        </div>
    )
}

interface SlotProps {
    children?: ReactElement | ReactElement[]
    show?: boolean
}

export function PageLayoutTopSlot({ children, show }: SlotProps) {
    if (show === false) {
        return null
    }
    
    return (
        <div className='slot-top'>
            { children }
        </div>
    )
}

export function PageLayoutBottomSlot({ children, show }: SlotProps) {
    if (show === false) {
        return null
    }
    
    return (
        <div className='slot-bottom'>
            { children }
        </div>
    )
}

export function PageLayoutModalSlot({ children, show }: SlotProps) {
    return (
        <Modal show={show !== false}>
            { children }
        </Modal>
    )
}

export function PageLayoutOverlay({ children, show }: SlotProps) {
    if (show === false) {
        return null
    }
    
    return (
        <div className='slot-overlay'>
            { children }
        </div>
    )
}