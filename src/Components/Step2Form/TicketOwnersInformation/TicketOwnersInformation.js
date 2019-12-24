import React, { useState, useEffect } from 'react'

import { Form, Collapse, Icon, Input } from 'antd'

import './TicketOwnersInformation.scss'

const genExtra = (success) => {
    if (success === "empty") { return }
    if (success) {
        return (<Icon type="check-circle" style={{ color: "green" }} onClick={event => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
        }} />);
    }
    else {
        return (<Icon type="warning" style={{ color: "red" }} onClick={event => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
        }} />)
    }
}
//props: ticketTypes=[{}], ownerInfo=[{label:"name", type:"input", required:true}]
function TicketOwnersInformation(props) {

    const { getFieldDecorator } = props.form
    const { openPanels, setOpenPanels, setTicketsOwnersInfo, ticketsOwnersInfo } = props

    const formItemLayout = {
        labelCol: {
            // xs: { span: 12 },
            sm: { span: 3 },
        },
        wrapperCol: {
            // xs: { span: 12 },
            sm: { span: 15 },
        },
    };


    let validate = (nr, infoNr, e) => {
        let list = JSON.parse(JSON.stringify(ticketsOwnersInfo))
        list[nr].ownerInfo[infoNr].isEmpty = !e.target.value
        list[nr].ownerInfo[infoNr].value = e.target.value
        list[nr].ownerInfo[infoNr].beenTouched = true
        let allTouched = true
        for (let i = 0; i < list[nr].ownerInfo.length; i++) { if (!list[nr].ownerInfo[i].beenTouched) { allTouched = false; break; } }
        if (!allTouched) {
            setTicketsOwnersInfo(list)
            return
        }
        list[nr].extra = true
        for (let i = 0; i < list[nr].ownerInfo.length; i++) {
            let info = list[nr].ownerInfo[i]
            if (info.isEmpty) {
                list[nr].extra = false
                break;
            }
        }
        setTicketsOwnersInfo(list)
    }

    useEffect(() => {
        let copy = JSON.parse(JSON.stringify(ticketsOwnersInfo))
        copy.sort((a,b) => { return a.id > b.id ? 1: (a.id < b.id) ? -1:0 })
        for (let i = 0; i < copy.length; i++) {
            let ticket = copy[i]
            ticket.header = `ticket ${i + 1} - ${ticket.name}`
            ticket.extra = "empty"
            ticket.open = i === 0
            for (let k = 0; k < ticket.ownerInfo.length; k++) {
                ticket.ownerInfo[k].isEmpty = true
                ticket.ownerInfo[k].beenTouched = false
            }
        }
        setTicketsOwnersInfo(copy)
    }, [])

    let openThis = (panelsOpen) => { setOpenPanels(panelsOpen) }

    let ticketsOwnerInfoHTML = []
    ticketsOwnerInfoHTML.push(
        <div>
            <h2>Attendees' Information</h2>
        </div>
    )
    let ticketsList = []
    for (let i = 0; i < ticketsOwnersInfo.length; i++) {
        let ticketState = ticketsOwnersInfo[i]
        let ticketInfo = []
        if (!ticketState.ownerInfo) { continue }
        for (let j = 0; j < ticketState.ownerInfo.length; j++) {
            let info = ticketState.ownerInfo[j]
            ticketInfo.push(
                <Form.Item {...formItemLayout} label={info.label} style={{ marginBottom: "0px", display: "flex" }} >
                    {getFieldDecorator(`tickets[${i}].${info.label}`, {
                        initialValue: info.value,
                        rules: [
                            {
                                required: info.required,
                                message: `Please input the ${info.label}!`,
                            }

                        ],
                    })(<Input onChange={(e) => { validate(i, j, e) }} />)}
                </Form.Item>
            )
        }

        ticketsList.push(
            <Collapse.Panel header={ticketState.header} key={i + 1} extra={genExtra(ticketState.extra)} style={{ border: 0 }} >
                {ticketInfo}
            </Collapse.Panel>
        )
    }


    ticketsOwnerInfoHTML.push(<div className='TicketsOwnersInformation__collapse'>
        <Collapse activeKey={openPanels} onChange={openThis}>
            {ticketsList}
        </Collapse>
    </div>)



    return (
        <div>
            {ticketsOwnerInfoHTML}
        </div>

    );
}

export default TicketOwnersInformation;