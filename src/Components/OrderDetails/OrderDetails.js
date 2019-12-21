import React from 'react'
import {
  Icon
} from 'antd'

export default function OrderDetails(props) {
  const order = {
    no: '23456526372',

  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>

    <div style={{ width: '60%', display: 'flex', alignItems: 'center', flexDirection: 'column', backgroundColor: 'white', borderRadius: 10 }}>
      <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ margin: 20, fontSize: 60 }} />
      <h1 style={{ fontWeight: 400 }}>We've received your order</h1>
  <h2 style={{fontSize: 18, fontWeight: 400}}>Order id: <span style={{fontWeight: 500}}>{order.no}</span></h2>

    </div>
    </div>
  )
}