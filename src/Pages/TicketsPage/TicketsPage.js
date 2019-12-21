import React, { useState } from 'react'
import { Button, Icon } from 'antd'

import TicketsImage from '../../Components/TicketsImage/TicketsImage'
import TicketsSteps from '../../Components/TicketsSteps/TicketsSteps'

import TicketsList from '../../Components/TicketsList/TicketsList'
import BillingInformation from '../../Components/BillingInformation/BillingInformation'
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
    const [current, setCurrent] = useState(0);
    const [ticketTypes, setTicketTypes] = useState(data.ticketTypes || []);
    const [totalTicketPrice, setTotalTicketPrice] = useState(1)

    let onNexStep = newCurrent => {
        setCurrent(newCurrent)
    };



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

    let componentToShow;
    if(current === 0){
        componentToShow = <TicketsList ticketTypes={ticketTypes} organization={data.organization}
        location={`${data.city}, ${data.country}`} onTicket={onTicket} totalTicketPrice={totalTicketPrice} />
    } else if(current === 1){
        componentToShow = <BillingInformation />
    }

    return (
        <div className="TicketsPage">
            <div className="TicketsPage__ticketsImage">
                <TicketsImage imageUrl={data.image} title={data.name} subTitle={data.dates} />
            </div>
            <div className="TicketsPage__page">
                <div className="TicketsPage__ticketsSteps">
                    <TicketsSteps current={current} onNextStep={onNexStep}  />
                </div>
                <div >
                    {componentToShow}
                </div>
            </div>

            <div className="TicketsPage__buttonDiv">
                <Button className="TicketsPage__button">
                    Find tickets
                <Icon type="arrow-right" />
                </Button>
            </div>

        </div>

    );
}

export default TicketsPage