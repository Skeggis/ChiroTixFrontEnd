import React, { useState } from 'react'
import PaymentForm from './PaymentForm/PaymentForm'
import './PaymentStep.scss'

export default function PaymentStep(props) {
  const {
    ticketTypes,
    totalTicketPrice,
    buyTickets
  } = props

  const [insuranceSelected, setInsuranceSelected] = useState(false)


  return (
    <div className='paymentStep'>
      <div style={{ width: '60%', margin: 'auto' }}>
        <h3>Order Summary</h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>

          <table style={{ width: '80%', borderCollapse: 'collapse' }}>
            <thead>
            <tr>
              <th>Ticket</th>
              <th className='paymentStep__rightAlign'>Price</th>
              <th className='paymentStep__rightAlign'>Amount</th>
              <th className='paymentStep__rightAlign'>Total</th>
            </tr>
            </thead>
            <tbody>
            {ticketTypes.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.name}</td>
                <td className='paymentStep__rightAlign'>{`${ticket.price}$`}</td>
                <td className='paymentStep__rightAlign'>{ticket.amount}</td>
                <td className='paymentStep__rightAlign'>{`${ticket.amount * ticket.price}$`}</td>
              </tr>
            ))}

            <tr style={{ height: 10 }}></tr>
            <tr style={{ borderTop: '1px dashed black' }}><td colSpan='4'></td></tr>
            <tr style={{ height: 10 }}></tr>

            <tr>
              <th>Insurance</th>
              <td className='paymentStep__rightAlign'>35$</td>
              <td className='paymentStep__rightAlign'>{insuranceSelected ? '1' : '0'}</td>
              <td className='paymentStep__rightAlign'>{insuranceSelected ? '35' : '0'}$</td>
            </tr>

            <tr style={{ height: 10 }}></tr>


            <tr >
              <th className='orderDetails__rightAlign' colSpan='4'>{totalTicketPrice}$</th>
            </tr>
            </tbody>
          </table>
        </div>


        <div style={{width: '60%', margin: 'auto', marginTop: 50,}}>
          <PaymentForm setInsuranceSelected={setInsuranceSelected} insuranceSelected={insuranceSelected} buyTickets={buyTickets}/>
        </div>


      </div>
    </div>
  )
}