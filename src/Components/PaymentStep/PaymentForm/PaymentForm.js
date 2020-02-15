import React, { useEffect, useState, Fragment, useRef, createRef } from 'react'
import { Form, Icon, Input, Button, Checkbox, Modal, Divider, notification } from 'antd';
import makeAsyncScriptLoader from "react-async-script";

import './PaymentForm.scss'
import Loader from '../../Loader/Loader';


function PaymentForm(props) {
  const {
    getFieldDecorator
  } = props.form;

  const {
    buyTickets,
    insuranceSelected,
    submitCardLoading,
    setInsuranceSelected,
    totalPrice
  } = props



  const paypalRef = useRef()
  const [paypalLoading, setPaypalLoading] = useState(true)


  async function loadButtons() {

    window.paypal.Buttons({
      onInit: function (data, actions) {
        actions.disable()
        function initButtons(event) {
          if (event.target.checked) {
            actions.enable();
          } else {
            actions.disable();
          }
        }
        document.querySelector('#termscheckbox').addEventListener('change', (event) => initButtons(event));
      },
      onClick: function (data, actions) {
        if (!document.querySelector('#termscheckbox').checked) {
          props.form.validateFields(['agreement'], (error, values) => { })
        } 
        //possibly verify insurance selection
      },
      createOrder: function (data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: totalPrice
            }
          }]
        });
      },
      onApprove: function (data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function (details) {
          // This function shows a transaction success message to your buyer.
          alert('Transaction completed by ' + details.payer.name.given_name);
          buyTickets({ method: 'paypal', orderId: data.orderID })
        });
      },
      onError: function (err) {
        console.log(err)
      }
    }).render(document.getElementById('paypalButtonContainer'))
  }

  useEffect(() => {

    async function fetchData() {
      const existingScript = document.getElementById('paypalScript');
      // var element = document.getElementById('paypalButtonContainer'),
      //   clone = element.cloneNode(true);

      // element.parentNode.replaceChild(clone, element);
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.paypal.com/sdk/js?client-id=AdmeHDdVieCtGNml2iCNsWqGaWyPW_puc4XIPUifsXXHWXSU8ynPbbLAL5rTgh9rtvnAkztDsHQlZsGw&disable-funding=credit,card,venmo,sepa,bancontact,eps,giropay,ideal,mybank,p24,sofort';
        script.id = 'paypalScript';
        document.body.appendChild(script);

        script.onload = () => {
          loadButtons()
          setPaypalLoading(false)
        };
      }




      if (existingScript) {
        var list = document.getElementById("paypalButtonContainer");
        if (list.hasChildNodes()) {
          list.removeChild(list.childNodes[0]);
        }
        // document.getElementById('paypalButtonContainer').removeEventListener('change', testFunc)
        await loadButtons()
        setPaypalLoading(false)
      }
    }
    fetchData()



  }, [insuranceSelected])

  const [card, setCard] = useState({ value: '', triedToSubmit: false })
  const [date, setDate] = useState({ value: '', triedToSubmit: false })
  const [insuranceDialogOpen, setInsuranceDialogOpen] = useState(false)
  const [termsDialogOpen, setTermsDialogOpen] = useState(false)
  const [verifyInsuranceOpen, setVerifyInsuranceOpen] = useState(false)

  function cc_format(value) {
    console.log(value)
    if (!/\d/.test(value)) {
      return
    }
    let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    let matches = v.match(/\d{4,16}/g);
    let match = matches && matches[0] || ''
    let parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
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
    if (/\s\s/.test(input)) input = input.substr(0, 2)
    var values = input.split('/').map(function (v) {
      return v.replace(/\D/g, '')
    });
    if (values[0]) values[0] = checkValue(values[0], 12);
    //if (values[1]) values[1] = checkValue(values[1], 31);
    var output = values.map(function (v, i) {
      return v.length === 2 && i < 2 ? v + ' / ' : v;
    });
    const newValue = output.join('').substr(0, 7);

    return newValue
  }


  function showError(title, message) {
    notification.error({
      message: title,
      description: message,
      placement: 'bottomLeft'
    })
  }


  function getBorgunToken(insuranceVerifiedValue) {
    const expMonth = date.split('/')[0].trim()
    const expYear = date.split('/')[1].trim()
    const pan = card.value.replace('-', '')
    const verifyCard = { cvc: props.form.getFieldValue('cvc') }

    window.BAPIjs.getToken({ pan, expMonth, expYear, verifyCard }, (result, data) => {
      if (result.statusCode === 201) {
        buyTickets({ method: 'borgun', token: data.Token, insurance: insuranceVerifiedValue })
      } else if (result.statusCode === 401) {
        showError('Error processing payment', 'The payment could not be processed. Try again later.')
      } else if (result.statusCode) {
        showError('Error processing payment', `${result.statusCode} - ${result.message}`)
      } else {
        showError('Error processing payment', `Unable to connect to server ${result.message}`)
      }
    })

  }


  function handleSubmit(insuranceVerified = false, insuranceVerifiedValue = insuranceSelected) {
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
        if (!insuranceSelected && !insuranceVerified) {
          setVerifyInsuranceOpen(true)
          return
        }
        buyTickets(values, insuranceVerifiedValue)
        // getBorgunToken(insuranceVerifiedValue)


      }
    });
  };



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

  function handleToggleInsuranceDialog() {
    setInsuranceDialogOpen(prev => !prev)
  }

  function handleToggleTermsDialog(event) {
    event.preventDefault()
    setTermsDialogOpen(prev => !prev)
  }

  function handleVerifyInsurance(verify, event) {
    console.log('neinie')
    if (verify) {
      setInsuranceSelected(true)
      setVerifyInsuranceOpen(false)
      handleSubmit(true, verify)

    } else {
      setVerifyInsuranceOpen(false)
      handleSubmit(true, verify)
    }
  }


  return (
    <Fragment>
      <Modal zIndex={1000000}
        title={'Terms & conditions'}
        visible={termsDialogOpen}
        onOk={() => setTermsDialogOpen(false)}
        onCancel={() => setTermsDialogOpen(false)}
        centerd
        footer={[<Button onClick={() => setTermsDialogOpen(false)}>Ok</Button>]}
      >
        <p>Some information about terms and conditions here</p>
      </Modal>
      <Modal zIndex={1000000}
        title={'Are you sure?'}
        visible={verifyInsuranceOpen}
        footer={null}
        centered
      >
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <h2>Would you like insurance?</h2>
          <p style={{ marginBottom: 20 }}>Insurance costs 35$ and without it you are not elligable for a full refund</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30, flexWrap: 'wrap' }}>
            <Button style={{ marginTop: 5 }} onClick={(event) => handleVerifyInsurance(false, event)}>No, I don't want insurance</Button>
            <div style={{ width: 20 }}></div>
            <Button style={{ marginTop: 5 }} onClick={(event) => handleVerifyInsurance(true, event)}>Yes, I want insurance</Button>
          </div>
        </div>


      </Modal>

      <div className='paymentForm'>
        <Form onSubmit={(e) => handleSubmit(true)} >

          <Form.Item style={{ marginBottom: 10 }}
            validateStatus={card.validateStatus}
            help={card.errorMsg}
          >

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
              {getFieldDecorator('cvc', {
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

          <Form.Item style={{ marginTop: 5, textAlign: 'right' }} labelAlign='right'>
            {getFieldDecorator('agreement', {
              rules: [
                {
                  required: true, message: 'Please agree to the terms and conditions'
                },
              ],
            })(
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Checkbox id='termscheckbox' style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', fontSize: 16 }}> I have read the  <a onClick={handleToggleTermsDialog} style={{ margin: 0 }}>terms and conditions</a></Checkbox>

              </div>
          ,
            )}
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button htmlType='submit' size='large' loading={submitCardLoading}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
        <Divider style={{ marginBottom: 50, color: 'black' }}>Or</Divider>
        <div style={{ width: '100%', textAlign: 'center', margin: 'auto' }}>
          {(paypalLoading || submitCardLoading) && (
            <Loader />
          )}
          <div
            style={{ width: '80%', margin: 'auto' }}
            ref={paypalRef}
            id='paypalButtonContainer'
          />
        </div>
        <div style={{ width: '100%', textAlign: 'center' }}>

          {/* <PayPalButton
            style={{ width: '100%' }}
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
          /> */}
        </div>
      </div>
    </Fragment>
  );
}


const WrappedPaymentForm = Form.create({ name: 'normal_login' })(PaymentForm);

export default WrappedPaymentForm
