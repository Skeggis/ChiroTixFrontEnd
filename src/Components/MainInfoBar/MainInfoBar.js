import React from 'react'
import { Typography, Row, Col, Button } from 'antd'
import './MainInfoBar.scss'

function MainInfoBar({ priceRange = '', dates = '', CEcredits = '' }) {
    return (
        <div className='MainInfoBar'>
            <Row className="MainInfoBar__bar" type="flex">
                <Col span={6}>
                    <h2>
                        <b>Price:</b>
                    </h2>
                    <h3>
                        {priceRange}
                    </h3>
                </Col>
                <Col span={6}>
                    <h2>
                        <b>Dates:</b>
                    </h2>
                    <h3>
                        {dates}
                    </h3>
                </Col>
                <Col span={6} className="MainInfoBar__buttonDiv">
                    <h2>
                        <b>CE credits:</b>
                    </h2>
                    <h3>
                        {CEcredits}
                    </h3>
                </Col>
                <Col span={6} className="MainInfoBar__buttonDiv">
                    <Button className="MainInfoBar__button" size="large" ghost={true} >Go to</Button>
                </Col>
            </Row>
        </div>
    );
}

export default MainInfoBar