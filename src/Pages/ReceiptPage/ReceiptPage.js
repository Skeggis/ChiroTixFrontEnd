import React, { useEffect, useState } from 'react'
import OrderDetails from '../../Components/OrderDetails/OrderDetails'
import axios from 'axios'

export default function ReceiptPage(props) {

  const [orderDetails, setOrderDetails] = useState({})
  const [loading, setLoading] = useState(true)

  const {
    match
  } = props

  useEffect(() => {
    async function fetchData(){
      const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/orders/${match.params.orderId}`)
      console.log(result)
      if(!result.data.success){
        //TODO handle
        setLoading(false)
        return
      }
      setOrderDetails(result.data.orderDetails)
      setLoading(false)
    }
    fetchData()
  }, [])


  if (loading) { return null }
  return (
    <div style={{marginTop: 30}}>
      <OrderDetails orderDetails={orderDetails} />
    </div>
  )
}