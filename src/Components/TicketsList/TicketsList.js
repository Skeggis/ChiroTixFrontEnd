import React from 'react'
import { List, Col, Row, Button } from 'antd'

import './TicketsList.scss'

function TicketsList({ ticketTypes = [], location = '', organization = '', onTicket = () => { }, totalTicketPrice=0 }) {
    let theTicketTypes = []
    theTicketTypes.push(
        <List.Item >
            <Row className='TicketsList__listRow'>
                <Col span={1}></Col>
                <Col span={6}><h3 className="TicketsList__ticketInfoTitle">Event</h3></Col>
                <Col span={5}><h3 className="TicketsList__ticketInfoTitle">Organization</h3></Col>
                <Col span={6}><h3 className="TicketsList__ticketInfoTitle">Location</h3></Col>
                <Col span={2}><h3 className="TicketsList__ticketInfoTitle">Price</h3></Col>
                <Col span={4}><h3 className="TicketsList__ticketInfoTitle" style={{ textAlign: "center" }}>Amount</h3></Col>
            </Row>
        </List.Item>)
    ticketTypes.forEach(ticket =>
        theTicketTypes.push(
            <List.Item style={{ borderColor: "rgba(0,0,0,0.5)", backgroundColor: "rgb(0,0,0,0.1)" }}>
                <Row className='TicketsList__listRow'>
                    <Col span={1}></Col>
                    <Col span={6} className="TicketsList__ticketTypeInfo"> {ticket.name} </Col>
                    <Col span={5} className="TicketsList__ticketTypeInfo"> {organization} </Col>
                    <Col span={6} className="TicketsList__ticketTypeInfo"> {location} </Col>
                    <Col span={2} className="TicketsList__ticketTypeInfo"> {ticket.price} </Col>
                    <Col span={4} className="TicketsList__ticketTypeInfo">
                        <div className="TicketsList__amountDiv">
                            {/* <div className="TicketsList__roundButton">
                            <h4>-</h4>
                        </div> */}
                            <Button shape="circle" onClick={() => onTicket(ticket.id, false)}>-</Button>
                            <h3 className="TicketsList__amount">{ticket.amount}</h3>
                            <Button shape="circle" onClick={() => onTicket(ticket.id, true)}>+</Button>
                            {/* <div className="TicketsList__roundButton">
                            <h4>+</h4>
                        </div> */}

                        </div>
                    </Col>
                </Row>
            </List.Item>)
    )
    
    theTicketTypes.push(
        <List.Item >
            <Row className='TicketsList__listRow'>
                <Col span={1}></Col>
                <Col span={6}><h3 className="TicketsList__ticketInfoTitle">Total</h3></Col>
                <Col span={5}></Col>
                <Col span={6}></Col>
                <Col span={2}></Col>
                <Col span={4}><h3 className="TicketsList__ticketInfoTitle" style={{ textAlign: "center" }}>{totalTicketPrice} $</h3></Col>
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