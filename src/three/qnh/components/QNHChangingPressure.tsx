import React from 'react'
import { OutlineButton } from '../../../ui/Button';
import { ControlBar } from '../../../ui/ControlBar';
import { DialogBox } from '../../../ui/DialogBox';
import { LessonDialogProps } from '../../LessonScript';
import { PageLayoutTopSlot } from '../../PageLayout';
import { useInternalStep } from '../../useInternalStep';

export function QNHChangingPressure(props: LessonDialogProps) {
    const {scene} = props
    const {goNext, index} = useInternalStep(5, props.nextStep)

    const finishHighPressure = () => {
        console.log('[finishHighPressure]')
        goNext()
    }

    return (
        <>
            <PageLayoutTopSlot show={index === 0}>
                <DialogBox>
                    <div>
                        Flying through an airmass with a <b>higher</b> pressure will push the pressure levels up, resulting in a higher-than-indicated altitude.
                    </div>
                    <ControlBar>
                        <OutlineButton onClick={async () => {
                            goNext()
                            scene.highPressure()
                                .then(finishHighPressure)
                        }}>
                            Go Higher
                        </OutlineButton>
                    </ControlBar>
                </DialogBox>
            </PageLayoutTopSlot>
            <PageLayoutTopSlot show={index === 2}>
                <DialogBox>
                    <div>
                        Conversely, an airmass with a <b>lower</b> pressure will push the pressure levels lower, resulting in a lower-than-indicated altitude.
                    </div>
                    <ControlBar>
                        <OutlineButton onClick={async () => {
                            goNext()
                            await scene.lowPressure()
                            goNext()
                        }}>
                            Go Lower
                        </OutlineButton>
                    </ControlBar>
                </DialogBox>
            </PageLayoutTopSlot>
        </>
    )
}