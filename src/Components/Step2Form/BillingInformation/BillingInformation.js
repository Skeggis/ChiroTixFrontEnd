import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import './BillingInformation.scss'

import {
    Form,
    Input,
    Icon,
    Checkbox
  } from 'antd';

function BillingInformation(props){

      const [confirmDirty, setConfirmDirty] = useState(false)
      const { getFieldDecorator } = props.form;
      const {buyerInfo, setBuyerInfo} = props


      const formItemLayout = {
        labelCol: {
          // xs: { span: 12 },
          sm: { span: 5, offset:1 },
        },
        wrapperCol: {
          // xs: { span: 12 },
          sm: { span:  15 },
        },
      };
      
    
      const tailFormItemLayout = {
        wrapperCol: {
          // xs: {
          //   span: 12,
          //   offset: 0,
          // },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
    
      let handleConfirmBlur = e => {
        const { value } = e.target;
        setConfirmDirty( !!value )
      };
    
      let compareToEmail = (rule, value, callback) => {
        const { form } = props;
        if (value && value !== form.getFieldValue('email')) {
          callback('The emails that you entered are inconsistent!');
        } else {
          callback();
        }
      };
    
      let validateToConfirmEmail = (rule, value, callback) => {
        const { form } = props;
        if (value && confirmDirty) {
            console.log("confirm")
          form.validateFields(['confirmEmail'], { force: true });
        }
        callback();
      };

      let updateState = (e,field) => {
        let newBuyer = JSON.parse(JSON.stringify(buyerInfo))
        if(field === 'phone'){newBuyer[field] = e}
        else{newBuyer[field]= e.target.value}
        setBuyerInfo(newBuyer)
      }
    
        
    
        return (
            <div className="BillingInformation">
                <div className="BillingInformation__buyerInformationDiv">
                    <div></div>
                <h2 className="BillingInformation__buyerInformation">Buyer Information</h2>
                </div>
                
                
            <Form.Item {...formItemLayout} label="Full Name">
            {getFieldDecorator('name', {
              initialValue:buyerInfo.name,
                rules: [
                  {
                    required: true,
                    message: 'Please input your name!',
                    whitespace:true
                  },
                ],
              })(<Input onChange={(e) => {updateState(e,'name')}}/>)}
              {/* <Row>
                <Col span={11}>
                {getFieldDecorator('firstName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your first name!',
                  },
                ],
              })(<Input.name placeholder="First Name"/>)}
                </Col>
                <Col span={1}></Col>
                <Col span={11}>
                {getFieldDecorator('lastName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your last name!',
                  },
                ],
              })(<Input.name placeholder="Last Name"/>)}
                </Col>
              </Row> */}
              
            </Form.Item>
            <Form.Item {...formItemLayout} label="E-mail">
              {getFieldDecorator('email',{
                initialValue:buyerInfo.email,
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                  {
                    validator: validateToConfirmEmail,
                  }
                ],
              })(<Input onChange={(e) => {updateState(e,'email')}}/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Confirm Email" >
              {getFieldDecorator('confirmEmail',{
                initialValue:buyerInfo.confirmEmail,
                rules: [
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    validator: compareToEmail,
                  },
                ],
              })(<Input onBlur={handleConfirmBlur} onChange={(e) => {updateState(e,'confirmEmail')}}/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Phone Number">
              {getFieldDecorator('phone',{
                initialValue:buyerInfo.phone,
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(<PhoneInput
                country={'is'}
                value={props.form.getFieldValue('phone')}
                onChange={(e) => {updateState(e,'phone')}}
              />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Address">
              {getFieldDecorator('address',{
                initialValue:buyerInfo.address,
                rules: [
                  { type: 'string', required: true, message: 'Please input your address!' },
                ],
              })(<Input onChange={(e) => {updateState(e,'address')}}/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="City">
              {getFieldDecorator('city',{
                initialValue:buyerInfo.city,
                rules: [
                  { type: 'string', required: true, message: 'Please input your city!' },
                ],
              })(<Input onChange={(e) => {updateState(e,'city')}}/>)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="State">
              {getFieldDecorator('state', {
                initialValue:buyerInfo.state,
                rules: [
                  { type: 'string', required: true, message: 'Please input your state!' },
                ],
              })(<Input onChange={(e) => {updateState(e,'state')}}/>)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="Zip Code">
              {getFieldDecorator('zipCode', {
                initialValue:buyerInfo.zipCode,
                rules: [
                  { type: 'string', required: true, message: 'Please input your zip code!' },
                ],
              })(<Input onChange={(e) => {updateState(e,'zipCode')}}/>)}
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement',{
                initialValue:buyerInfo.agreement,
                valuePropName: 'checked',rules: [
                    { validator: async (rule, value, callback) => {
                            let newBuyerInfo = JSON.parse(JSON.stringify(buyerInfo))
                            newBuyerInfo.agreement = value
                            setBuyerInfo(newBuyerInfo)
                            if(value){callback()}
                            else{callback("Fail")}
                    }, message: 'Please agree to the agreement!', type:"boolean" },
                  ],
              })(
                <Checkbox>
                  I have read the <a href="">agreement <Icon type="file-text" /></a> 
                </Checkbox>,
              )}
            </Form.Item>
            </div>
          
        );
}

export default BillingInformation;
