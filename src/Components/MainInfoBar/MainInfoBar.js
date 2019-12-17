import React from 'react'
import { Typography, Row, Col, Button } from 'antd'
import './MainInfoBar.scss'

function MainInfoBar({ priceRange = '', dates = '', CEcredits = '' }) {
    return (
        <div className='MainInfoBar'>
            <Row className="MainInfoBar__bar" type="flex">
                <Col span={6}>
                    <div className="MainInfoBar__colDiv">
                        <h2>
                            <b>Price:</b>
                        </h2>
                        <h3>
                            {priceRange}
                        </h3>
                    </div>

                </Col>
                <Col span={6}>
                    <div className="MainInfoBar__colDiv">
                        <h2>
                            <b>Dates:</b>
                        </h2>
                        <h3>
                            {dates}
                        </h3>
                    </div>

                </Col>
                <Col span={6}>
                    <div className="MainInfoBar__colDiv">
                        <h2>
                            <b>CE credits:</b>
                        </h2>
                        <h3>
                            {CEcredits}
                        </h3>
                    </div>

                </Col>
                <Col span={6}>
                    <div className='MainInfoBar__colDiv MainInfoBar__buttonDiv'>
                        <Button className="MainInfoBar__button" style={{ backgroundColor: "#725252", borderColor: "#725252", fontSize: "25px", color: "white" }} >Go to</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default MainInfoBar