import React, { useState, useEffect, useRef } from 'react'
import { Button, Icon, Modal } from 'antd'
import axios from 'axios'
import {URL} from '../../Constants'
import io from 'socket.io-client';

import TicketsImage from '../../Components/TicketsImage/TicketsImage'
import TicketsSteps from '../../Components/TicketsSteps/TicketsSteps'

import TicketsList from '../../Components/TicketsList/TicketsList'


import Step2Form from '../../Components/Step2Form/Step2Form'
import OrderDetails from '../../Components/OrderDetails/OrderDetails'
import PaymentStep from '../../Components/PaymentStep/PaymentStep'
import './TicketsPage.scss'




let stepsInfo = [{
    title: "Tickets"
}, {
    title: "Billing Information"
},{title:"Payment"}, {
    title: "Receipt"
}
]
let defaultImage = '../../../tempDefaultImg.jpg'
function TicketsPage(props) {
    
    //position of the steps
    const [current, setCurrent] = useState(0);
    const [buyerId, setBuyerId] = useState(undefined)
    
    const [timer, setTimer] = useState(0)
    const [releaseTime, setReleaseTime] = useState(undefined)
    const [eventInfo, setEventInfo] = useState({})

    useEffect(() => {
        setTimeout(() => {
            if(!releaseTime){return setTimer(0) }
            let now = new Date()
            if(new Date(releaseTime) - now < 0){return setReleaseTime(undefined)}
            setTimer(new Date(releaseTime) - now)
        }, 1000)
    }, [timer, releaseTime])

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

    const ref = useRef({})
    // useEffect(() => () => console.log("SOCKETCHANGE"), [ref.current])

    useEffect(() => {
        async function fetchData(){
            let eventId = props.match.params.eventId
            let result = await axios.get(URL + `/tickets/info/${eventId}`)
            let data = result.data
            setEventInfo(data.eventInfo)
            setBuyerId(data.buyerId)
            setTicketTypes(data.ticketTypes)


            ref.current.socket = io.connect(URL, { query:{buyerId: data.buyerId, eventId: eventId}})

            ref.current.socket.on('connect', () => {console.log("COONNNEST!")})

            ref.current.socket.on('timerDone', () => {

                showErrorModal()
                // setModalVisible(true)
                // stepsController(0)
            })
            
        }
        fetchData()
    }, [])

    let reserveTickets = async () => {
        // if(ticketTypes.length === 0){return}
        let post = {
            url:URL+'/tickets/reserveTickets',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data:{
                buyerId: buyerId,
                eventId: eventInfo.id,
                ticketTypes: ticketTypes,
                socketId: ref.current.socket.id
            }
        }

        let result = await axios(post)
        ref.current.socket.emit('timer')
        let data = result.data
        setReleaseTime(data.releaseTime)
        // startTimer(data.releaseTime)
        if(!data.success){return console.log("ERROR ON SERVER!")/** TODO: Handle error message from server */}

        let {reservedTickets} = data
        let ownerInfo = []
        let newTicketsOwnersInfo = []
        let oldTicketsOwnersInfo = JSON.parse(JSON.stringify(ticketsOwnersInfo)) 
        for (let k = 0; k < eventInfo.ownerInfo.length; k++) {
            let info = eventInfo.ownerInfo[k]
            ownerInfo.push({
                label: info.label,
                value: "",
                type: info.type,
                required: info.required
            })
        }
        for(let i = 0; i < reservedTickets.length; i++){
            let reservedTicket = reservedTickets[i]
            let ownerInfoForThisTicket = JSON.parse(JSON.stringify(ownerInfo))
            for(let j = 0; j < oldTicketsOwnersInfo.length; j++){
                let oldTicket = oldTicketsOwnersInfo[j]
                if(oldTicket.ticketTypeId === reservedTicket.ticketTypeId && !oldTicket.used){//If there is a ticket of this kind already (perhaps with data)
                    oldTicket.used = true
                    ownerInfoForThisTicket = oldTicket.ownerInfo
                    break;
                }
            }
            newTicketsOwnersInfo.push({
                id: reservedTicket.id,
                ticketTypeId: reservedTicket.ticketTypeId,
                name: reservedTicket.name,
                price: reservedTicket.price,
                ownerInfo: ownerInfoForThisTicket
            })
        } 
        setTicketsOwnersInfo(newTicketsOwnersInfo)
        stepsController(1)
    }

    let releaseTickets = async () => {
console.log("RELEASE ME!")
 // if(ticketTypes.length === 0){return}
 let post = {
    url:URL+'/tickets/releaseTickets',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    },
    data:{
        buyerId: buyerId,
        eventId: eventInfo.id,
        tickets: ticketsOwnersInfo
    }
}

let result = await axios(post)
let data = result.data
console.log("DATA:", data)
setReleaseTime(undefined)
stepsController(-1)
setTimer(0)
if(!data.success){return console.log("ERROR ON SERVER!")/** TODO: Handle error message from server */}

    }

    let buyTickets = async (cardInformation) => {
console.log("BUYINGTICKETS!")
        let post = {
            url:URL+'/tickets/buyTickets',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data:{
                buyerId: buyerId,
                eventId: eventInfo.id,
                tickets: ticketsOwnersInfo,
                buyerInfo,
                cardInformation
            }
        }

        let result = await axios(post)
        let data = result.data
        console.log("DATA:", data)
        if(!data.success){return console.log("ERROR ON SERVER!")/** TODO: Handle error message from server */}
        stepsController(1)
    }


    let handleTicketChange = (ticketId, addTicket) => {
        let newTickets = JSON.parse(JSON.stringify(ticketTypes))
        for (let i = 0; i < newTickets.length; i++) {
            if (newTickets[i].id === ticketId) {
                if (addTicket) {//Increment the amount of tickets for this type
                    newTickets[i].amount++
                    setTotalTicketPrice(totalTicketPrice + parseFloat(newTickets[i].price))
                    break
                }
                else if (newTickets[i].amount > 0) {
                    newTickets[i].amount--
                    setTotalTicketPrice(totalTicketPrice - parseFloat(newTickets[i].price))
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

    let stepsController = (direction) => {
        setCurrent(current+direction)
        if(current+direction >= 3){setReleaseTime(undefined)}
    }

    let onButtonClick = () =>{
        let list = JSON.parse(JSON.stringify(ticketsOwnersInfo))
        let open = []
        for(let i = 0; i < list.length; i++){
            list[i].extra = true
            list[i].open = false
            for(let j = 0; j < list[i].ownerInfo.length; j++){
                list[i].extra = !list[i].ownerInfo[j].isEmpty
                if(!list[i].extra){ list[i].open = true }
            }
            if(!list[i].extra){open.push(i+1)}
        }
        setOpenPanels(open)
        setTicketsOwnersInfo(list)
    }

    let continueButton;
         if(current ===1){
            continueButton = (
                <div className="TicketsPage__buttonDiv">
                    <Button htmlType="submit" form="billingInformationForm" className="TicketsPage__button" onClick={onButtonClick}>
                        Buy tickets
                        <Icon type="arrow-right" />
                    </Button>
                </div>
            );
        } else if (current === 0) {
            continueButton = (<div className="TicketsPage__buttonDiv">
                <Button onClick={() => reserveTickets()} className="TicketsPage__button">
                    Find tickets
                    <Icon type="arrow-right" />
                </Button>
            </div>);
        } else { continueButton = ""}


    let backButton;

    if (current === 1 ) {
        backButton = (<div className="TicketsPage__buttonDiv">
            <Button onClick={releaseTickets} className="TicketsPage__button">
                <Icon type="arrow-left" />
                Back
        </Button>
        </div>);
    } else if(current === 2){
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
        console.log("SHOWME!")
        componentToShow = <div className="TicketsPage__billingInfo">
            <Step2Form 
            openPanels={openPanels} setOpenPanels={setOpenPanels} 
            ticketsOwnersInfo={ticketsOwnersInfo} setTicketsOwnersInfo={setTicketsOwnersInfo}
            buyerInfo={buyerInfo} setBuyerInfo={setBuyerInfo} stepsController={stepsController} current={current}/>
            </div> 
    } else if (current === 2){
        console.log("HERE")
        componentToShow = <PaymentStep ticketTypes={ticketTypes} totalTicketPrice={totalTicketPrice} buyTickets={buyTickets}/>
    } else if (current === 3){
        console.log("THERE")
        componentToShow = <OrderDetails ticketTypes={ticketTypes} totalTicketPrice={totalTicketPrice}/>
    }

// let modal = Modal.error()
// modal.update({
//     title: "You took too long",
//     content: "The tickets you reserved have been unreserved so you have to start over again if you want to buy a ticket",
//     onOk: () => {setModalVisible(false)},
//     visible: isModalVisible,
//     afterClose: () => {setCurrent(0)},
//     okText: "Ok",
//     centered: true
// })

let showErrorModal = () => {
    Modal.error({
        title: "You took too long",
        content: "The tickets you reserved have been unreserved so you have to start over again if you want to buy a ticket",
        onOk: () => {setCurrent(0)},
        centered: true,
        zIndex: 1000000
      });
}
    return (
        
        <div className="TicketsPage">
            {/* {modal} */}
            <div className="TicketsPage__ticketsImage">
                <TicketsImage imageUrl={defaultImage} title={eventInfo.name} subTitle={eventInfo.dateRange} timer={timer} showTimer={!!releaseTime && current !== 3} />
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

        </div>
    

    );
}

export default TicketsPage