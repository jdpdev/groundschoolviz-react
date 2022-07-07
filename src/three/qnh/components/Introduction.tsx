import React from 'react'
import { Button } from '../../../ui/Button'
import { ControlBar } from '../../../ui/ControlBar'
import { DialogBox } from '../../../ui/DialogBox'
import { LessonDialogProps } from '../../LessonScript'
import { PageLayoutBottomSlot } from '../../PageLayout'

export function QNHIntroduction(props: LessonDialogProps) {
    return (
        <PageLayoutBottomSlot>
            <DialogBox>
                <div>
                    <p>
                        Knowing your altitude while flying is important.
                    </p>
                    <p>
                        The altimeter is the instrument we use to find the altitude.
                    </p>
                </div>

                <ControlBar>
                    <Button onClick={props.nextStep}>Okay</Button>
                </ControlBar>
            </DialogBox>
        </PageLayoutBottomSlot>
    )
}