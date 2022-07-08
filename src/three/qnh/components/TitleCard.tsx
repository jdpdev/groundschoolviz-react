import React from 'react'
import { Button } from '../../../ui/Button'
import { ControlBar } from '../../../ui/ControlBar'
import { DialogBox } from '../../../ui/DialogBox'
import { Title } from '../../../ui/Title'
import { LessonDialogProps } from '../../LessonScript'
import { PageLayoutModalSlot } from '../../PageLayout'

export function QNHTitleCard(props: LessonDialogProps) {
    return (
        <PageLayoutModalSlot>
            <DialogBox>
                <div>
                    <Title>What's the Deal with Altimeter Setting?</Title>
                    <p>
                        A visual demonstration of what happens when you
                        don't keep your altimeter set.
                    </p>
                    <ControlBar>
                        <Button onClick={props.nextStep}>Let's Go</Button>
                    </ControlBar>
                </div>
            </DialogBox>
        </PageLayoutModalSlot>
    )
}