import React from 'react'
import { DialogBox } from '../../../ui/DialogBox'
import { LessonDialogProps } from '../../LessonScript'
import { PageLayoutTopSlot } from '../../PageLayout'

export function QNHIntroduction(props: LessonDialogProps) {
    return (
        <PageLayoutTopSlot>
            <DialogBox>
                Let's talk about altimeter settings
            </DialogBox>
        </PageLayoutTopSlot>
    )
}