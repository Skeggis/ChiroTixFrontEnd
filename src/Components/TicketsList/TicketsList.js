import React from 'react'
import { List, Col, Row, Button } from 'antd'

import './TicketsList.scss'

function TicketsList({ ticketTypes = [], location = '', organization = '', handleTicketChange = () => { }, totalTicketPrice=0, interactive=true }) {
    let theTicketTypes = []
    theTicketTypes.push(
        <List.Item >
            <Row className='TicketsList__listRow'>
                <Col span={1}></Col>
                <Col span={4}><h3 className="TicketsList__ticketInfoTitle">Event</h3></Col>
                <Col span={3}></Col>
                <Col span={3}><h3 className="TicketsList__ticketInfoTitle rightAlign">Organization</h3></Col>
                <Col span={2}></Col>
                <Col span={3}><h3 className="TicketsList__ticketInfoTitle rightAlign">Location</h3></Col>
                <Col span={1}></Col>
                <Col span={3}><h3 className="TicketsList__ticketInfoTitle rightAlign">Price</h3></Col>
                <Col span={2}></Col>
                <Col span={2}><h3 className="TicketsList__ticketInfoTitle" style={{ textAlign: "center" }}>Amount</h3></Col>
            </Row>
        </List.Item>)
        for(let i = 0; i < ticketTypes.length; i++){
            let ticket = ticketTypes[i]
            if(!interactive && ticket.amount === 0){continue}
            theTicketTypes.push(
                <List.Item style={{ borderColor: "rgba(0,0,0,0.5)", backgroundColor: "rgb(0,0,0,0.1)" }}>
                    <Row className='TicketsList__listRow'>
                        <Col span={1}></Col>
                        <Col span={4} className="TicketsList__ticketTypeInfo"> {ticket.name} </Col>
                        <Col span={3}></Col>
                        <Col span={3} className="TicketsList__ticketTypeInfo rightAlign"> {organization} </Col>
                        <Col span={2}></Col>
                        <Col span={3} className="TicketsList__ticketTypeInfo rightAlign"> {location} </Col>
                        <Col span={1}></Col>
                        <Col span={3} className="TicketsList__ticketTypeInfo rightAlign"> {parseFloat(ticket.price).toFixed(2)} $</Col>
                        <Col span={2}></Col>
                        <Col span={2} className="TicketsList__ticketTypeInfo">
                            <div className="TicketsList__amountDiv">
                                {/* <div className="TicketsList__roundButton">
                                <h4>-</h4>
                            </div> */}
                            {interactive ? <Button shape="circle" onClick={() => handleTicketChange(ticket.id, false)} size="small">-</Button>:''}
                                
                                <h3 className="TicketsList__amount">{ticket.amount}</h3>
                                {interactive ? <Button shape="circle" onClick={() => handleTicketChange(ticket.id, true)} size="small">+</Button>:''}
                                {/* <div className="TicketsList__roundButton">
                                <h4>+</h4>
                            </div> */}
    
                            </div>
                        </Col>
                    </Row>
                </List.Item>)
        }
    
    theTicketTypes.push(
        <List.Item >
            <Row className='TicketsList__listRow'>
                <Col span={1}></Col>
                <Col span={4}><h3 className="TicketsList__ticketInfoTitle">Total</h3></Col>
                <Col span={17}></Col>
                <Col span={2}><h3 className="TicketsList__ticketInfoTitle" style={{ textAlign: "center" }}>{parseFloat(totalTicketPrice).toFixed(2)} $</h3></Col>
            </Row>
        </List.Item>)

    return (
        <div className="TicketsList">
            <List style={{ borderColor: "rgba(0,0,0,0.5)" }}>

                {theTicketTypes}

            </List>

        </div>

    );
}

export default TicketsList