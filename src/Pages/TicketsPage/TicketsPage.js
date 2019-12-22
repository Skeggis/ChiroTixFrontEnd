import React, { useState, useEffect } from 'react'
import { Button, Icon } from 'antd'

import TicketsImage from '../../Components/TicketsImage/TicketsImage'
import TicketsSteps from '../../Components/TicketsSteps/TicketsSteps'

import TicketsList from '../../Components/TicketsList/TicketsList'


import Step2Form from '../../Components/Step2Form/Step2Form'
import './TicketsPage.scss'


let stepsInfo = [{
    title: "Tickets", subTitle: "00:00:05"
}, {
    title: "Billing Information"
}, {
    title: "Receipt"
}]
function TicketsPage(props) {
    
    //position of the steps
    const [current, setCurrent] = useState(0);

    
    const [eventInfo, setEventInfo] = useState({})

    //Array of objects of the types of tickets for this event and with key "amount" representing how many of each type the buyer wants
    /**
     * ticketTypes: [{
     *      id:Integer,
     *      name: String,
     *      price: double,
     *      amount: Integer
     * }]
     */
    const [ticketTypes, setTicketTypes] = useState([]); 
    //Total price of the tickets
    const [totalTicketPrice, setTotalTicketPrice] = useState(0) 
    
    //Array of integer-keys representing which panel of tickets is open (in step 2)
    const [openPanels, setOpenPanels] = useState([1])
    const [buyerInfo, setBuyerInfo] = useState({
        name: '',
        email: '',
        confirmEmail: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        agreement: false,
    })
    /**
     * ticketsOwnersInfo: [{
     *          id: Integer, (the id of the ticketType),
     *          name: String, (name of the ticketType),
     *          price: double, 
     *          header: String, (is set in TOI.js and represents the header-title of its panel)
     *          extra: boolean or string, (is set in TOI.js and represents wether the panel is to show an icon on the right side (if "empty" then no icon. If true then a success icon, and error icon if false))
     *          open: boolean, (is set in TOI.js and represents wether this panel is Open)
     *          ownerInfo: [{
     *              label: string, (the label-string for the input for this info)
                    value: string, (the value in the input for this info)
                    type: string, (the type of input, "checkbox" etc.)
                    required: boolean, (wether it is required of the user to fill in this info)
                    isEmpty: boolean (set in TOI.js and represents wether the input for this info is empty or not),
                    beenTouched: boolean (set in TOI.js and represents wether the input has been in focus in the past, if true the user has clicked it sometime in the past)
     *          }]
     * }]
     */
    const [ticketsOwnersInfo, setTicketsOwnersInfo] = useState([])



    useEffect(() => {
        const data = {
            image: '../../../tempDefaultImg.jpg',
            name: 'ChiroPraktik 101',
            dates: '16.12.19 - 17.12.19',
            country: 'Germany',
            city: 'Berlin',
            organization: 'ICPA',
            ticketTypes: [{
                id: 0,
                name: 'Student',
                price: 699
            }, {
                id: 1,
                name: 'Chiropraktor',
                price: 1199
            }, {
                id: 2,
                name: 'Spouse (non chiro)',
                price: 999
            }, {
                id: 3,
                name: 'Grandpa',
                price: 3999
            }],
            ownerInfo: [{label:"name", type:"input", required:true}, {label:"Massi", type:"input", required:true}]
        }
        setEventInfo(data)

        for(let i = 0; i < data.ticketTypes.length; i++){ data.ticketTypes[i].amount = 0 }
        setTicketTypes(data.ticketTypes)

    }, [])


    let handleTicketChange = (ticketId, addTicket) => {
        let newTickets = JSON.parse(JSON.stringify(ticketTypes))
        for (let i = 0; i < newTickets.length; i++) {
            if (newTickets[i].id === ticketId) {
                if (addTicket) {//Increment the amount of tickets for this type
                    newTickets[i].amount++
                    setTotalTicketPrice(totalTicketPrice + newTickets[i].price)
                    let ownerInfo = []
                    for (let k = 0; k < eventInfo.ownerInfo.length; k++) {
                        let info = eventInfo.ownerInfo[k]
                        ownerInfo.push({
                            label: info.label,
                            value: "",
                            type: info.type,
                            required: info.required
                        })
                    }
                    ticketsOwnersInfo.push({
                        id: newTickets[i].id,
                        name: newTickets[i].name,
                        price: newTickets[i].price,
                        ownerInfo: ownerInfo
                    })
                    setTicketsOwnersInfo(ticketsOwnersInfo)
                    break
                }
                else if (newTickets[i].amount > 0) {
                    newTickets[i].amount--
                    setTotalTicketPrice(totalTicketPrice - newTickets[i].price)
                    ticketsOwnersInfo.reverse()
                    let ticketToDelete = ticketsOwnersInfo.find(ticket => ticket.id === ticketId)
                    let index = ticketsOwnersInfo.indexOf(ticketToDelete)
                    if(index >= 0){ticketsOwnersInfo.splice(index,1)}
                    ticketsOwnersInfo.reverse()
                    setTicketsOwnersInfo(ticketsOwnersInfo)
                    break
                }
            }
        }
        setTicketTypes(newTickets)
    }

    let stepsController = (direction) => setCurrent(current+direction)

    let onButtonClick = () =>{
        let list = JSON.parse(JSON.stringify(ticketsOwnersInfo))
        let open = []
        for(let i = 0; i < list.length; i++){
            list[i].extra = true
            list[i].open = false
            for(let j = 0; j < list[i].ownerInfo.length; j++){
                list[i].extra = list[i].ownerInfo[j].success 
                if(!list[i].extra){list[i].open = true}
            }
            if(!list[i].extra){open.push(i+1)}
        }
        setOpenPanels(open)
        setTicketsOwnersInfo(list)
    }

    let continueButton;
    let buyTicketsButton;

    if (current < 2) {
        if (current === 1) {
            buyTicketsButton = (
                <div className="TicketsPage__buttonDiv">
                    <Button htmlType="submit" form="billingInformationForm" className="TicketsPage__button" onClick={onButtonClick}>
                        Buy tickets
                        <Icon type="arrow-right" />
                    </Button>
                </div>
            );
            continueButton = ""
        } else {
            continueButton = (<div className="TicketsPage__buttonDiv">
                <Button onClick={() => stepsController(1)} className="TicketsPage__button">
                    Find tickets
                    <Icon type="arrow-right" />
                </Button>
            </div>);
            buyTicketsButton = ""
        }
    }

    let backButton;

    if (current === 1 || current === 2) {
        backButton = (<div className="TicketsPage__buttonDiv">
            <Button onClick={() => stepsController(-1)} className="TicketsPage__button">
                <Icon type="arrow-left" />
                Back
        </Button>
        </div>);
    }



    let componentToShow;
    if (current === 0) {
        componentToShow = <TicketsList ticketTypes={ticketTypes} organization={eventInfo.organization}
            location={`${eventInfo.city}, ${eventInfo.country}`} handleTicketChange={handleTicketChange} totalTicketPrice={totalTicketPrice} />
    } else if (current === 1) {
        componentToShow = <div className="TicketsPage__billingInfo">
            <Step2Form 
            openPanels={openPanels} setOpenPanels={setOpenPanels} 
            ticketsOwnersInfo={ticketsOwnersInfo} setTicketsOwnersInfo={setTicketsOwnersInfo}
            buyerInfo={buyerInfo} setBuyerInfo={setBuyerInfo}/>
            </div> 
    }

    return (
        <div className="TicketsPage">
            <div className="TicketsPage__ticketsImage">
                <TicketsImage imageUrl={eventInfo.image} title={eventInfo.name} subTitle={eventInfo.dates} />
            </div>
            <div className="TicketsPage__page">
                <div className="TicketsPage__ticketsSteps">
                    <TicketsSteps current={current} stepsInfo={stepsInfo} />
                </div>
                <div >
                    {componentToShow}
                </div>
            </div>
            {backButton}
            {continueButton}
            {buyTicketsButton}

        </div>

    );
}

export default TicketsPage