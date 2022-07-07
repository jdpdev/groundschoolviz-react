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
                        <Altimeter
                            setting={setting}
                            altitude={0.34}
                        />
                    </div>
                    <div className='setting-buttons'>
                        <Button onClick={() => setSetting(setting + 0.14)}>+</Button>
                        <Button onClick={() => setSetting(setting - 0.14)}>-</Button>
                    </div>
                </div>
            </PageLayoutBottomSlot>
        </>
    )
}