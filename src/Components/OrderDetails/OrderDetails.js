import React, { Fragment } from 'react'
import {
  Icon,
  Divider
} from 'antd'
import './OrderDetails.scss'

export default function OrderDetails(props) {
  const {
    totalTicketPrice,
    ticketTypes
  } = props

  const order = {
    no: '23456526372',

  }

  return (
    <div className='orderDetails'>
      <div className='orderDetails__container'>
        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" className='orderDetails__success' />
        <h1 style={{ fontWeight: 400 }}>We've received your order</h1>
        <h2 style={{ fontSize: 18, fontWeight: 400 }}>Order id: <span style={{ fontWeight: 500 }}>{order.no}</span></h2>

        <Divider />




        <div style={{ width: '100%', padding: '0 20px', }}>
          <h3>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>

            <table style={{ width: '80%' }}>
              <tr>
                <th>Ticket</th>
                <th className='orderDetails__rightAlign'>Price</th>
                <th className='orderDetails__rightAlign'>Amount</th>
                <th className='orderDetails__rightAlign'>Total</th>
              </tr>
              {ticketTypes.map(ticket => (
                <Fragment>
                  {ticket.amount > 0 && (
                    <tr>
                      <td>{ticket.name}</td>
                      <td className='orderDetails__rightAlign'>{`${ticket.price}$`}</td>
                      <td className='orderDetails__rightAlign'>{ticket.amount}</td>
                      <td className='orderDetails__rightAlign'>{`${ticket.amount * ticket.price}$`}</td>
                    </tr>
                  )}
                </Fragment>
              ))}
              <tr style={{ height: 10 }}></tr>
              <tr >
                <th className='orderDetails__rightAlign' colSpan='4'>{totalTicketPrice}$</th>
              </tr>
            </table>
          </div>
        </div>

        <Divider />
        <div style={{ width: '100%', padding: '0 20px' }}>
          <h3>Payment Information</h3>
          <div style={{ display: 'flex', width: '100%' }}>

            <div className='orderDetails__detailBlock'>
              <h4>Credit card:</h4>
              <p>Card number: <sup>************</sup>-7721</p>
              <p>Expiry date: 03/2022</p>
              <p>Amount: {totalTicketPrice}$</p>
            </div>

            <div className='orderDetails__detailBlock'>
              <h4>Billing Address:</h4>
              <p>Róbert Ingi Huldarsson</p>
              <p>Álfaberg 24</p>
              <p>221, Hafnarfjörður</p>
              <p>Iceland</p>
            </div>
          </div>
        </div>



        <div className='orderDetails__usInfo'>
          <p>ChiroTix</p>
          <p>Álfaberg 24</p>
          <p>221, Hafnarfjörður</p>
          <p>240697-3789</p>
        </div>
      </div>
    </div>
  )
}