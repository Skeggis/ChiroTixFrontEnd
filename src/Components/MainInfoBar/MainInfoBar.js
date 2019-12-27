import React from 'react'
import { Typography, Row, Col, Button } from 'antd'
import './MainInfoBar.scss'

function MainInfoBar({ priceRange = '', dates = '', handleBuyTickets = () => {} }) {
    return (
        <div className='MainInfoBar'>
            <Row className="MainInfoBar__bar" type="flex">
            <Col span={6}></Col>
                <Col span={4}>
                    <div className="MainInfoBar__colDiv">

                        <div className="MainInfoBar__nameDiv">
                            <h2 style={{fontSize: '24px'}}>
                                Price
                            </h2>
                        </div>
                        <div className="MainInfoBar__valueDiv">
                            <h3 style={{fontSize: '20px'}}>
                                {priceRange}
                            </h3>
                        </div>

                    </div>

                </Col>
                <Col span={2}></Col>
                <Col span={4}>
                    <div className="MainInfoBar__colDiv">
                        <div className="MainInfoBar__nameDiv">
                            <h2 style={{fontSize: '24px'}}>
                                Dates
                        </h2>
                        </div>

                        <div className="MainInfoBar__valueDiv">
                            <h3 style={{fontSize: '20px'}}>
                                {dates}
                            </h3>
                        </div>

                    </div>

                </Col>
                <Col span={3}></Col>
                <Col span={3}>
                    <div className='MainInfoBar__colDiv MainInfoBar__buttonDiv'>
                        <Button onClick={handleBuyTickets} className="MainInfoBar__button" style={{ backgroundColor: "#6D8791", borderColor: "#6D8791", fontSize: "20px", fontWeight: "400", color: "white" }} >Tickets</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default MainInfoBar