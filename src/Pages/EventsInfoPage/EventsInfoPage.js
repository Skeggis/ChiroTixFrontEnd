import React, {useEffect, useState} from 'react'
import {
    Collapse, 
    notification,
    List,
    Row,
    Col,
    Button
} from 'antd'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import './EventsInfoPage.scss'
import FileSaver from 'file-saver'


function EventsInfoPage(props){
    const [events, setEvents] = useState([])

    useEffect(() => {
        async function getEvents(){
            let result = await axios(process.env.REACT_APP_SERVER_URL + '/eventsInfo')
            let {data} = result
            if(!data.success){return showErrors(data.messages)}
            setEvents(data.events)
        }
        getEvents()
    }, [])

    async function onDownload(eventId){
        let response = await axios({
            url: process.env.REACT_APP_SERVER_URL + '/downloadTickets/' + eventId,
            method: 'get',
            responseType: 'blob',
            headers: {
              'Accept': 'application/vnd.openxmlformats-officedocument'
               + '.spreadsheetml.sheet',
            },
          })
          FileSaver.saveAs(response.data, 'data.xlsx') 
    }


    function showErrors(messages, title) {
        if (!messages || messages.length === 0) { return }
        messages.forEach(message => {
            notification.error({
                message: message.title || title || "Error!",
                description: message.message,
                placement: 'bottomLeft'
            })
        })
    }

    let collapsePanels = []

    for(let i = 0; i < events.length; i++){
        let eventInfo = events[i].eventInfo
        let ticketTypes = events[i].ticketTypes

        let ticketDivs = []
        ticketDivs.push(
            <List.Item style={{ margin: 0, padding: 0 }}>
                <Row className='TicketsList__listRow' gutter={0}>
                    <Col span={1}></Col>
                    <Col span={4}><h3 className="TicketsList__ticketInfoTitle">Type</h3></Col>
                    <Col span={3}></Col>
                    <Col span={3}><h3 className="TicketsList__ticketInfoTitle rightAlign">Price</h3></Col>
                    <Col span={2}></Col>
                    <Col span={3}><h3 className="TicketsList__ticketInfoTitle rightAlign">Amount</h3></Col>
                    <Col span={1}></Col>
                    <Col span={3}><h3 className="TicketsList__ticketInfoTitle rightAlign">Reserved</h3></Col>
                    <Col span={2}></Col>
                    <Col span={2}><h3 className="TicketsList__ticketInfoTitle rightAlign">Sold</h3></Col>
    
                </Row>
            </List.Item>)
        for(let j = 0; j < ticketTypes.length; j++){
            let ticketType = ticketTypes[j]
            ticketDivs.push(
                <List.Item>
                    <Row align='center' style={{ alignItems: 'center', display: 'flex' }} className='TicketsList__listRow'>
                    <Col span={1}></Col>
                    <Col span={4} className="TicketsList__ticketTypeInfo"> {ticketType.name} </Col>
                    <Col span={3}></Col>
                    <Col span={3} className="TicketsList__ticketTypeInfo rightAlign"> {parseFloat(ticketType.price).toFixed(2)} $</Col>
                    <Col span={2}></Col>
                    <Col span={3} className="TicketsList__ticketTypeInfo rightAlign"> {ticketType.amount} </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="TicketsList__ticketTypeInfo rightAlign"> {ticketType.reserved} </Col>
                    <Col span={2}></Col>
                    <Col span={2} className="TicketsList__ticketTypeInfo rightAlign"> {ticketType.sold}</Col>
                </Row>
                </List.Item>
            )
        }

        collapsePanels.push(
        <Collapse.Panel header={eventInfo.name} key={i+1}>
            <List>
                {ticketDivs}
            </List>
            <Button onClick={() => onDownload(eventInfo.id)} >Download</Button>
        </Collapse.Panel>
        )
    }
    return (
        <div className="EventsInfoPage">
            <Collapse className="EventsInfoPage__collapse" defaultActiveKey={1}>
                {collapsePanels}
            </Collapse>
        </div>
        
    );
}

export default withRouter(EventsInfoPage)