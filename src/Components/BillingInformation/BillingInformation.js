import React, { useState } from 'react'

import './BillingInformation.scss'

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
  } from 'antd';
  
  const { Option } = Select;
  const AutoCompleteOption = AutoComplete.Option;
  
  const residences = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

function BillingInformation(props){

      const [confirmDirty, setConfirmDirty] = useState(false)
      const [autoCompleteResult, setAutoCompleteResult] = useState([])
    
      let handleSubmit = e => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
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
    
      let handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
          autoCompleteResult = [];
        } else {
          autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        setAutoCompleteResult(autoCompleteResult)
      };
        const { getFieldDecorator } = props.form;
    
        const formItemLayout = {
          labelCol: {
            // xs: { span: 12 },
            sm: { span: 4 },
          },
          wrapperCol: {
            // xs: { span: 12 },
            sm: { span:  8 },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            // xs: {
            //   span: 12,
            //   offset: 0,
            // },
            sm: {
              span: 8,
              offset: 4,
            },
          },
        };
        const prefixSelector = getFieldDecorator('prefix', {
          initialValue: '86',
        })(
          <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>,
        );
    
        const websiteOptions = autoCompleteResult.map(website => (
          <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
    
        return (
          <Form {...formItemLayout} onSubmit={handleSubmit}>
              <Form.Item label="First Name">
              {getFieldDecorator('firstName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your first name!',
                  },
                ],
              })(<Input.name />)}
            </Form.Item>
            <Form.Item label="Last Name">
              {getFieldDecorator('lastName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your last name!',
                  },
                ],
              })(<Input.name />)}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
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
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Confirm Email" >
              {getFieldDecorator('confirmEmail', {
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
              })(<Input onBlur={handleConfirmBlur}/>)}
            </Form.Item>
            <Form.Item label="Habitual Residence">
              {getFieldDecorator('residence', {
                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                rules: [
                  { type: 'array', required: true, message: 'Please select your habitual residence!' },
                ],
              })(<Cascader options={residences} />)}
            </Form.Item>
            <Form.Item label="Phone Number">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item label="Website">
              {getFieldDecorator('website', {
                rules: [{ required: true, message: 'Please input website!' }],
              })(
                <AutoComplete
                  dataSource={websiteOptions}
                  onChange={handleWebsiteChange}
                  placeholder="website"
                >
                  <Input />
                </AutoComplete>,
              )}
            </Form.Item>
            <Form.Item label="Captcha" extra="We must make sure that your are a human.">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator('captcha', {
                    rules: [{ required: true, message: 'Please input the captcha you got!' }],
                  })(<Input />)}
                </Col>
                <Col span={12}>
                  <Button>Get captcha</Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        );
}

export default Form.create({ name: 'register' })(BillingInformation);
