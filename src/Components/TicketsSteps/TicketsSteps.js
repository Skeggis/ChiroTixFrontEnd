import React from 'react'
import { Steps, List, Col, Row, Button } from 'antd'

import './TicketsSteps.scss'

function TicketsSteps({ current = 0, onNextStep = () => { }}) {

    return (
        <div className="TicketsSteps">
            <div className="TicketsSteps__steps">
                <Steps current={current} onChange={onNextStep} >
                    <Steps.Step title="Tickets" subTitle="00:00:05" status="finish" />
                    <Steps.Step title="Billing Information" />
                    <Steps.Step title="Receipt" />
                </Steps>
            </div>

        </div>

    );
}

export default TicketsSteps