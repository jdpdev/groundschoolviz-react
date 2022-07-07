import React, { ReactElement, useState } from 'react'
import { Modal } from '../ui/Modal'

import './css/PageLayout.css'
import { LessonDialogProps } from './LessonScript'

export enum LayoutSlot {
    Top = 'layout-top',
    Bottom = 'layout-bottom',
    Modal = 'layout-modal'
}

type SetInLayoutType = (content: React.FC<LessonDialogProps>, slot: LayoutSlot) => void

type RenderProp = (
    setInLayout: SetInLayoutType
) => React.FC<LessonDialogProps>

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
    return (
        <div className='slot-top'>
            { show !== false && children }
        </div>
    )
}

export function PageLayoutBottomSlot({ children, show }: SlotProps) {
    return (
        <div className='slot-bottom'>
            { show !== false && children }
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
    return (
        <div className='slot-overlay'>
            { show !== false && children }
        </div>
    )
}