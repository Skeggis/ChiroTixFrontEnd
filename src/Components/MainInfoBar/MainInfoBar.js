import React from 'react'
import { Typography, Row, Col, Button } from 'antd'
import './MainInfoBar.scss'

function MainInfoBar({ priceRange = '', dates = '' }) {
    return (
        <div className='MainInfoBar'>
            <Row className="MainInfoBar__bar" type="flex">
            <Col span={6}></Col>
                <Col span={4}>
                    <div className="MainInfoBar__colDiv">

                        <div className="MainInfoBar__nameDiv">
                            <h2>
                                Price
                            </h2>
                        </div>
                        <div className="MainInfoBar__valueDiv">
                            <h3>
                                {priceRange}
                            </h3>
                        </div>

                    </div>

                </Col>
                <Col span={2}></Col>
                <Col span={4}>
                    <div className="MainInfoBar__colDiv">
                        <div className="MainInfoBar__nameDiv">
                            <h2>
                                Dates
                        </h2>
                        </div>

                        <div className="MainInfoBar__valueDiv">
                            <h3>
                                {dates}
                            </h3>
                        </div>

                    </div>

                </Col>
                <Col span={3}></Col>
                <Col span={3}>
                    <div className='MainInfoBar__colDiv MainInfoBar__buttonDiv'>
                        <Button className="MainInfoBar__button" style={{ backgroundColor: "#6D8791", borderColor: "#6D8791", fontSize: "20px", fontWeight: "400", color: "white" }} >BUY</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default MainInfoBar