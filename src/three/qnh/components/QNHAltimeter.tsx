import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button } from '../../../ui/Button'
import { ControlBar } from '../../../ui/ControlBar'
import { DialogBox } from '../../../ui/DialogBox'
import { LessonDialogProps } from '../../LessonScript'
import { PageLayoutBottomSlot, PageLayoutTopSlot } from '../../PageLayout'
import { Altimeter } from './Altimeter'

import './css/QNHAltimeter.css'

export function QNHAltimeter(props: LessonDialogProps) {
    const [setting, setSetting] = useState(29.92)
    const altitude = (setting - 28) / 4

    return (
        <>
            <PageLayoutTopSlot>
                <DialogBox>
                    <div>
                        The altimeter is a <b>barometer</b> that compares the current pressure with the set <b>altimeter setting</b> to derive your height above sea level.
                    </div>

                    <ControlBar>
                        <Button onClick={props.nextStep}>Roger</Button>
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