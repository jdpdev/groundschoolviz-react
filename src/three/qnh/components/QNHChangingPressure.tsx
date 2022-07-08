import React, { useCallback } from 'react'
import { Button, OutlineButton } from '../../../ui/Button';
import { ControlBar } from '../../../ui/ControlBar';
import { DialogBox } from '../../../ui/DialogBox';
import { LessonDialogProps } from '../../LessonScript';
import { PageLayoutBottomSlot, PageLayoutTopSlot } from '../../PageLayout';
import { useInternalStep } from '../../useInternalStep';

export function QNHChangingPressure(props: LessonDialogProps) {
    const {scene} = props
    const {goNext, gotoStep, index} = useInternalStep(5, props.nextStep)

    console.log('[QHNChangingPressure]', index)

    const finishHighPressure = useCallback(() => {
        console.log('[finishHighPressure]')
        gotoStep(2)
    }, [goNext, index])

    return (
        <>
            <PageLayoutTopSlot show={index === 0}>
                <DialogBox>
                    <div>
                        Flying through an airmass with a <b>higher</b> pressure will push the pressure levels up, resulting in a higher-than-indicated altitude.
                    </div>
                    <ControlBar>
                        <OutlineButton onClick={async () => {
                            gotoStep(1)
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
                            gotoStep(3)
                            await scene.lowPressure()
                            gotoStep(4)
                        }}>
                            Go Lower
                        </OutlineButton>
                    </ControlBar>
                </DialogBox>
            </PageLayoutTopSlot>
            <PageLayoutTopSlot show={index === 4}>
                <DialogBox>
                    <div>
                        You can see how you can maintain a constant altitude according to the altimeter, even though your actual altitude can wildly vary if the altimeter setting is wrong.
                    </div>
                </DialogBox>
            </PageLayoutTopSlot>
            <PageLayoutBottomSlot show={index === 4}>
                <ControlBar>
                    <Button onClick={() => scene.highPressure()}>High Pressure</Button>
                    <Button onClick={() => scene.normalPressure()}>Starting Pressure</Button>
                    <Button onClick={() => scene.lowPressure()}>Low Pressure</Button>
                </ControlBar>
            </PageLayoutBottomSlot>
        </>
    )
}