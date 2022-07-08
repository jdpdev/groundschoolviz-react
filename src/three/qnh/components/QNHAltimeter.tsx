import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, OutlineButton } from '../../../ui/Button'
import { ControlBar } from '../../../ui/ControlBar'
import { DialogBox } from '../../../ui/DialogBox'
import { LessonDialogProps } from '../../LessonScript'
import { PageLayoutBottomSlot, PageLayoutTopSlot } from '../../PageLayout'
import { Altimeter } from './Altimeter'

import './css/QNHAltimeter.css'

export function QNHAltimeter(props: LessonDialogProps) {
    const [step, setStep] = useState(0)
    const [setting, setSetting] = useState(29.92)
    const altitude = (setting - 28) / 4

    const onNext = () => {
        if (step === 0) {
            setStep(1)
        } else {
            props.nextStep()
        }
    }

    return (
        <>
            <PageLayoutTopSlot>
                <DialogBox>
                    {step === 0 && <div>The altimeter is a <b>barometer</b> that compares the current pressure with the set <b>altimeter setting</b> to derive your height above sea level.</div>}
                    {step === 1 && <div>Changing the setting while in level flight will indicate a change in altitude.</div>}

                    <ControlBar>
                        {step === 0 && <OutlineButton onClick={onNext}>More</OutlineButton>}
                        {step === 1 && <Button onClick={onNext}>Roger</Button>}
                    </ControlBar>
                </DialogBox>
            </PageLayoutTopSlot>
            
            <PageLayoutBottomSlot>
                <div className='altimeter-demo'>
                    <div className='altimeter-container'>
                        <div className='altitude-label'>
                            Altitude
                            
                            <div style={{
                                position: 'relative',
                                left: '3.5em'
                            }}>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </div>
                        </div>
                        <Altimeter
                            setting={setting}
                            altitude={altitude}
                        />
                        <div className='setting-label'>
                            <div style={{
                                position: 'relative',
                                left: '6.5em'
                            }}>
                                <FontAwesomeIcon icon={faArrowUp} />
                            </div>
                            Altimeter Setting
                        </div>
                    </div>
                    <div className='right-container'>
                        <div className='setting-buttons'>
                            <Button onClick={() => setSetting(setting + 0.14)}>+</Button>
                            <Button onClick={() => setSetting(setting - 0.14)}>-</Button>
                        </div>
                        <div>
                            Change the altimeter setting<br/>
                            to see the indicated altitude change.
                        </div>
                    </div>
                </div>
            </PageLayoutBottomSlot>
        </>
    )
}