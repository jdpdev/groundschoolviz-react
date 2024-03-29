import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Button, OutlineButton } from '../../../ui/Button';
import { ControlBar } from '../../../ui/ControlBar';
import { DialogBox } from '../../../ui/DialogBox';
import { LessonDialogProps } from '../../LessonScript';
import { PageLayoutBottomSlot, PageLayoutOverlay, PageLayoutTopSlot } from '../../PageLayout';

import './css/QNHPressureAltitude.css'

export function QNHPressureAltitude(props: LessonDialogProps) {
    const [step, setStep] = useState(0)
    const next = () => {
        if (step === 0) {
            setStep(1)
        } else {
            props.nextStep()
        }
    }

    return (
        <>
            <PageLayoutTopSlot show={step === 0}>
                <DialogBox>
                    <div>
                        When you maintain level flight you follow a <b>pressure altitude</b>, not a <i>physical</i> altitude.
                    </div>
                </DialogBox>
            </PageLayoutTopSlot>
            <PageLayoutBottomSlot show={step === 0}>
                <DialogBox>
                    <div>
                        An area of constant atmosphereic pressure is an <b>isobar</b>, and your altitude will follow that isobar.
                    </div>
                    <ControlBar>
                        <OutlineButton onClick={next}>More</OutlineButton>
                    </ControlBar>
                </DialogBox>
            </PageLayoutBottomSlot>
            <PageLayoutOverlay show={step === 0}>
                <div className='isobar-pointers'>
                    <div className='isobar'>Isobar <FontAwesomeIcon icon={faArrowRight} /></div>
                    <div className='airplane'>Your Altitude <FontAwesomeIcon icon={faArrowRight} /></div>
                </div>
            </PageLayoutOverlay>
            <PageLayoutTopSlot show={step === 1}>
                <DialogBox>
                    <div>
                        So what happens if the local altimeter setting changes, and you don't change it?
                    </div>
                    <ControlBar>
                        <Button onClick={next}>Uh-oh</Button>
                    </ControlBar>
                </DialogBox>
            </PageLayoutTopSlot>
        </>
    )
}