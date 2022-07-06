import React from 'react'
import { DialogBox } from '../../../ui/DialogBox'
import { Title } from '../../../ui/Title'

export function TitleCard() {
    return (
        <DialogBox>
            <div>
                <Title>What's the Deal with Altimeter Setting?</Title>
                <p>
                    A visual demonstration of what happens when you
                    don't keep your altimeter set.
                </p>
            </div>
        </DialogBox>
    )
}