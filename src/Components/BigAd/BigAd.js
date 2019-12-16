import React from 'react'
import {Typography, Row, Col} from 'antd'
import './BigAd.scss'

function BigAd({image='', title='', minorTitle=''}) {
    return (
        <div className='BigAd' style={{ backgroundImage: `url('${image}')` }}>
            <div>
                <Row>
                    <Col span={24} type="flex" align="end">
                        <Typography.Title className='BigAd__organizationTitle' type="secondary">{minorTitle}</Typography.Title>
                    </Col>
                </Row>
            </div>


            <div className="BigAd__eventTitleDiv">
                <h1 className='BigAd__eventTitle'>{title}</h1>
            </div>
        </div>
    );
}

export default BigAd