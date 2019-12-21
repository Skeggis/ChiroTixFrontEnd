import React, { useState } from 'react'
import { Button, Icon } from 'antd'

import TicketsImage from '../../Components/TicketsImage/TicketsImage'
import TicketsSteps from '../../Components/TicketsSteps/TicketsSteps'

import TicketsList from '../../Components/TicketsList/TicketsList'
import BillingInformation from '../../Components/BillingInformation/BillingInformation'
import OrderDetails from '../../Components/OrderDetails/OrderDetails'
import './TicketsPage.scss'


function TicketsPage(props) {
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
            price: 699,
            amount: 0
        }, {
            id: 1,
            name: 'Chiropraktor',
            price: 1199,
            amount: 0
        }, {
            id: 2,
            name: 'Spouse (non chiro)',
            price: 999,
            amount: 0
        }, {
            id: 3,
            name: 'Grandpa',
            price: 3999,
            amount: 0
        }]
    }
    const [current, setCurrent] = useState(2);
    const [ticketTypes, setTicketTypes] = useState(data.ticketTypes || []);
    const [totalTicketPrice, setTotalTicketPrice] = useState(0)
    const [stepsInfo, setStepsInfo] = useState([{
        title: "Tickets", subTitle: "00:00:05"
    }, {
        title: "Billing Information"
    }, {
        title: "Receipt"
    }])






    let onTicket = (ticketId, add) => {
        let newTickets = JSON.parse(JSON.stringify(ticketTypes))
        for (let i = 0; i < newTickets.length; i++) {
            if (newTickets[i].id === ticketId) {
                if (add) {
                    newTickets[i].amount++
                    setTotalTicketPrice(totalTicketPrice + newTickets[i].price)
                }
                else if (newTickets[i].amount > 0) {
                    newTickets[i].amount--
                    setTotalTicketPrice(totalTicketPrice - newTickets[i].price)
                }
            }
        }
        setTicketTypes(newTickets)
    }

    let onContinue = () => {
        if (current === 1) {
            stepsInfo[2].status = "error"
            setStepsInfo(stepsInfo)
        }
        setCurrent(current + 1)
    }

    let onBack = () => {
        if (current === 2) {
            stepsInfo[2].status = ""
            setStepsInfo(stepsInfo)
        }
        setCurrent(current - 1)
    }

    let continueButton;

    if (current < 2) {
        continueButton = (<div className="TicketsPage__buttonDiv">
            <Button onClick={onContinue} className="TicketsPage__button">
                Find tickets
        <Icon type="arrow-right" />
            </Button>
        </div>);
    }

    let backButton;

    if (current === 1 || current === 2) {
        backButton = (<div className="TicketsPage__buttonDiv">
            <Button onClick={onBack} className="TicketsPage__button">
                <Icon type="arrow-left" />
                Back
        </Button>
        </div>);
    }



    let componentToShow;
    if (current === 0) {
        componentToShow = <TicketsList ticketTypes={ticketTypes} organization={data.organization}
            location={`${data.city}, ${data.country}`} onTicket={onTicket} totalTicketPrice={totalTicketPrice} />
    } else if (current === 1) {
        componentToShow = <BillingInformation />
    } else if (current === 2){
        componentToShow = <OrderDetails />
    }

    return (
        <div className="TicketsPage">
            <div className="TicketsPage__ticketsImage">
                <TicketsImage imageUrl={data.image} title={data.name} subTitle={data.dates} />
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