import React, { useEffect, useState, Fragment } from 'react'
import { Form, Icon, Input, Button, Checkbox, Modal, Divider } from 'antd';
import {PayPalButton} from 'react-paypal-button-v2'

import './PaymentForm.scss'


function PaymentForm(props) {
  const { 
  getFieldDecorator
} = props.form;

  const [card, setCard] = useState({ value: '', triedToSubmit: false })
  const [date, setDate] = useState({ value: '', triedToSubmit: false })
  const [insuranceDialogOpen, setInsuranceDialogOpen] = useState(false)

  function cc_format(value) {
    let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    let matches = v.match(/\d{4,16}/g);
    let match = matches && matches[0] || ''
    let parts = []

    for (let i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }

    if (parts.length) {
        return parts.join('-')
    } else {
        return value
    }
}

  function checkValue(str, max) {
    if (str.charAt(0) !== '0' || str === '00') {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
    };
    return str;
  };
  
  function insert(value) {
    let input = value;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    if(/\s\s/.test(input)) input = input.substr(0, 2)
    var values = input.split('/').map(function(v) {
      return v.replace(/\D/g, '')
    });
    if (values[0]) values[0] = checkValue(values[0], 12);
    //if (values[1]) values[1] = checkValue(values[1], 31);
    var output = values.map(function(v, i) {
      return v.length == 2 && i < 2 ? v + ' / ' : v;
    });
    const newValue = output.join('').substr(0, 7);

    return newValue
  }
  

  

  function handleSubmit(e) {
    e.preventDefault();
    let error = false
    if (date.value.length === 0) {
      error = true
      setDate({
        validateStatus: 'error',
        errorMsg: 'Insert expiration date',
        triedToSubmit: true,
        value: date.value,
      })
    }

    if (card.value.length === 0) {
      error = true
      setCard({
        validateStatus: 'error',
        errorMsg: 'Insert card number',
        triedToSubmit: true,
        value: card.value
      })
    }

    props.form.validateFields((err, values) => {
      if (!err && !error) {

        console.log('Received values of form: ', values);
      }
    });
  };

  function handleCheckChange() {
    props.setInsuranceSelected(old => !old)
  }

  function handleCardChange(event) {
   
    const newValue = cc_format(event.target.value)

    if (card.triedToSubmit) {
      if (event.target.value.length === 0) {
        console.log('nei')
        setCard(old => {
          return {
            validateStatus: 'error',
            errorMsg: 'Insert card number',
            value: newValue,
            triedToSubmit: true
          }
        })
      } else {
        setCard({
          validateStatus: 'success',
          errorMsg: null,
          value: newValue,
          triedToSubmit: true
        })
      }
    } else {
      setCard(prev => {
        return {
          ...prev,
          value: newValue,
        }
      })
    }
  }

  function handleDateChange(event) {
    const newValue = insert(event.target.value)
    if (date.triedToSubmit) {
      if (event.target.value.length === 0) {
        setDate({
          validateStatus: 'error',
          errorMsg: 'Insert expiration date',
          value: newValue,
          triedToSubmit: true
        })
      }
      setDate({
        validateStatus: 'success',
        errorMsg: null,
        value: newValue,
        triedToSubmit: true
      })
    } else {
      setDate(old => {
        return {
          ...old,
          value: newValue,
        }
      })
    }
  }

  function handleToggleInsuranceDialog(){
    setInsuranceDialogOpen(prev => !prev)
  }

  return (
    <Fragment>
      <Modal
        title={'Insurance information'}
        visible={insuranceDialogOpen}
        onOk={() => setInsuranceDialogOpen(false)}  
        onCancel={() => setInsuranceDialogOpen(false)}
        footer={[<Button onClick={() => setInsuranceDialogOpen(false)}>Ok</Button>]}
      >
        <p>Some information about insurance here</p>
      </Modal>
    <Form onSubmit={handleSubmit}>
      <Form.Item style={{ marginBottom: 10 }}
        help={'Without insurance you can not expect a full refund'}
      >
        {getFieldDecorator('insurance', {
          valuePropName: 'checked',
          initialValue: false
        })(<div style={{  display: 'flex', alignItems: 'center' }}>
          <Checkbox onChange={handleCheckChange} style={{ fontSize: 16 }} size='large'>Insurance</Checkbox>
          <Icon type='question-circle-o' style={{marginLeft: 10, fontSize: 16}} onClick={handleToggleInsuranceDialog}/>
        </div>
        )}
      </Form.Item>
      <Form.Item style={{ marginBottom: 10 }}
        validateStatus={card.validateStatus}
        help={card.errorMsg}
      >
        {/* {getFieldDecorator('card', {
          rules: [{ required: true, message: 'Enter card number' }],
        })( */}
        <Input
          value={card.value}
          onChange={handleCardChange}
          className='paymentForm__card'
          size='large'
          prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Card number"
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 10 }}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Enter name on card' }],
        })(
          <Input
            size='large'
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Name"
          />,
        )}
      </Form.Item>
      <div style={{ display: 'flex', }}>
        <Form.Item style={{ width: '100%' }}
          validateStatus={date.validateStatus}
          help={date.errorMsg}
        >
          <Input
            value={date.value}
            onChange={handleDateChange}
            className='paymentForm__date'
            size='large'
            prefix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='MM/YY'
          />

        </Form.Item>
        <div style={{ width: 10 }}></div>
        <Form.Item style={{ width: '100%' }}>
          {getFieldDecorator('cvv', {
            rules: [{ required: true, message: 'Enter security code' }],
          })(
            <Input
              maxLength={3}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              size='large'
              placeholder="Security code"
            />,
          )}
        </Form.Item>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item>
          <Button htmlType='submit' size='large'>
            Submit
              </Button>
        </Form.Item>
      </div>
    </Form>
    <Divider style={{marginBottom: 50, color: 'black'}}>Or</Divider>
    <PayPalButton
        amount="0.01"
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
 
          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderID: data.orderID
            })
          });
        }}
      />
    </Fragment>
  );
}


const WrappedPaymentForm = Form.create({ name: 'normal_login' })(PaymentForm);

export default WrappedPaymentForm

