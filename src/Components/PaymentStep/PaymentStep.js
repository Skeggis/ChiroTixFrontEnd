import React, { useState, Fragment } from 'react'
import PaymentForm from './PaymentForm/PaymentForm'
import './PaymentStep.scss'

import {
  Checkbox,
  Icon,
  Modal,
  Button
} from 'antd'

export default function PaymentStep(props) {
  const {
    ticketTypes,
    totalTicketPrice,
    buyTickets,
    insuranceSelected,
    setInsuranceSelected,
    submitCardLoading,
    insurancePercentage
  } = props


  const insurancePrice = Number((insurancePercentage * totalTicketPrice)).toFixed(2)
  const totalPrice = insuranceSelected ? Number(totalTicketPrice + Number(insurancePrice)).toFixed(2) : Number(totalTicketPrice).toFixed(2)

  const [insuranceDialogOpen ,setInsuranceDialogOpen] = useState(false)


  function handleCheckChange() {
    setInsuranceSelected(prev => !prev)
  }

  function handleToggleInsuranceDialog() {
    handleToggleInsuranceDialog(prev => !prev)
  }

  return (
    <Fragment>

      <Modal zIndex={1000000}
        title={'Insurance information'}
        visible={insuranceDialogOpen}
        onOk={() => setInsuranceDialogOpen(false)}
        onCancel={() => setInsuranceDialogOpen(false)}
        footer={[<Button onClick={() => setInsuranceDialogOpen(false)}>Ok</Button>]}
        centered
      >
        <p>Some information about insurance here</p>
      </Modal>
      <div className='paymentStep'>
        <div className='paymentStep__wrapper' style={{ width: '80%' }}>
          <h3>Order Summary</h3>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 20 }}>


            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
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
                  <Fragment>
                    {ticket.amount > 0 && (
                      <tr key={ticket.id}>
                        <td>{ticket.name}</td>
                        <td className='paymentStep__rightAlign'>{`${Number(ticket.price).toFixed(2)}$`}</td>
                        <td className='paymentStep__rightAlign'>{ticket.amount}</td>
                        <td className='paymentStep__rightAlign'>{`${Number(ticket.amount * ticket.price).toFixed(2)}$`}</td>
                      </tr>
                    )}
                  </Fragment>
                ))}

                <tr style={{ height: 10 }}></tr>
                <tr style={{ borderTop: '1px dashed black' }}><td colSpan='4'></td></tr>
                <tr style={{ height: 10 }}></tr>

                <tr>
                  <th>Insurance</th>
                  <td className='paymentStep__rightAlign'>{insurancePrice}$</td>
                  <td className='paymentStep__rightAlign'>{insuranceSelected ? '1' : '0'}</td>
                  <td className='paymentStep__rightAlign'>{insuranceSelected ? insurancePrice : '0.00'}$</td>
                </tr>

                <tr style={{ height: 10 }}></tr>


                <tr >
                  <th className='orderDetails__rightAlign' colSpan='4'>{totalPrice}$</th>
                </tr>
              </tbody>
            </table>

            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Checkbox checked={insuranceSelected} onChange={handleCheckChange} style={{ fontSize: 16,  }} size='large'>Insurance</Checkbox>
              <Icon type='question-circle-o' style={{ marginLeft: 10, fontSize: 16 }} onClick={handleToggleInsuranceDialog} />
            </div>
          </div>


          <div >
            <PaymentForm
              setInsuranceSelected={setInsuranceSelected}
              insuranceSelected={insuranceSelected}
              buyTickets={buyTickets}
              submitCardLoading={submitCardLoading}
              totalPrice={totalPrice}
            />
          </div>


        </div>
      </div>
    </Fragment>
  )
}