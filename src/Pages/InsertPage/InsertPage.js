import React, { useState, useEffect } from 'react'
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  DatePicker,
  Select,
  InputNumber,
  Upload,
  message,
  notification
} from 'antd';
import axios from 'axios'

const { RangePicker } = DatePicker
const { Option } = Select

function InsertPage(props) {

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message
    });
  };

  const { getFieldDecorator, validateFields } = props.form;

  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState({})
  const [availableCities, setAvailableCities] = useState([])
  const [selectedDates, setSelectedDates] = useState([])
  const [selectedSellingTime, setSelectedSellingTime] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedOrganizations, setSelectedOrganizations] = useState([])

  const [tickets, setTickets] = useState([{
    name: '',
    amount: 0,
    price: 0
  }])

  function addTicket() {
    console.log('asdf')
    const newTickets = JSON.parse(JSON.stringify(tickets))
    newTickets.push({ name: '', amount: 0, price: 0 })
    setTickets(newTickets)
  }

  function removeTicket() {
    const newTickets = JSON.parse(JSON.stringify(tickets))
    newTickets.pop()
    setTickets(newTickets)
  }

  function handleChangeTicket(i, event, name) {
    console.log(i)
    console.log(event)

    if (event) {
      const value = event.target ? event.target.value : event
      const oldState = JSON.parse(JSON.stringify(tickets))
      oldState[i] = {
        ...oldState[i],
        [name]: value
      }
      setTickets(oldState)
    }
    console.log('Her')
  }

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/insertValues`)
      console.log(result)
      setValues(result.data)
      setAvailableCities(result.data.cities)
      setLoading(false)
    }
    fetchData()
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    validateFields((err, values) => {
      console.log(values)

      if (!err) {
        async function uploadEvent() {
          var formData = new FormData();
          console.log(selectedImage)
          formData.append("image", selectedImage.originFileObj);
          const result = await axios.post(`${process.env.REACT_APP_SERVER_URL}/eventImage`, formData, {
            headers: {
              'Content-type': 'multipart/form-data'
            }
          })
          console.log(result)
          const imageUrl = result.data.secure_url

          const myOrganization = parseInt(selectedOrganizations[0]) ? { id: parseInt(selectedOrganizations[0]) } : { name: selectedOrganizations[0] }
          console.log(values.speakers)

          const mySpeakers = values.speakers.map(sp => parseInt(sp) ? { id: parseInt(sp) } : { name: sp })
          console.log(mySpeakers)
          const eventResult = await axios.post(`${process.env.REACT_APP_SERVER_URL}/events`, {
            data: {
              name: values.name,
              organization: myOrganization,
              startDate: selectedDates[0],
              endDate: selectedDates[1],
              startSellingTime: selectedSellingTime[0],
              finishSellingTime: selectedSellingTime[1],
              shortDescription: values.shortDescription,
              longDescription: values.longDescription,
              cityId: parseInt(values.city),
              longitude: values.longitude,
              latitude: values.latitude,
              category: parseInt(values.category),
              CECredits: values.CECredits,
              tags: values.tags.map(tag => parseInt(tag)),
              tickets: tickets,
              image: imageUrl,
              speakers: mySpeakers
            }
          })
          console.log(eventResult)
          if(eventResult.data.success){
              openNotificationWithIcon('success', 'Success', 'Successfully inserted event')
          }
        }
        uploadEvent()
      }
    });
  }

  function handleCountryChange(value) {
    const newCities = values.cities.filter(c => c.id === parseInt(value))
    setAvailableCities(newCities)
  }

  function handleOrganizationChange(value) {
    if (value.length > 1) {
      setSelectedOrganizations([value[1]])
    } else {
      setSelectedOrganizations(value)
    }
  }
  console.log(selectedOrganizations)
  const uploadProps = {
    name: 'image',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        console.log(info.file)
        setSelectedImage(info.file)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  if (loading) { return null }
  return (
    <Form onSubmit={handleSubmit} style={{ width: '50%', margin: 'auto', marginTop: 50 }}>
      <div style={{ display: 'flex' }}>
        <Form.Item style={{ width: '50%' }}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Insert event name' }],
          })(
            <Input
              placeholder="Name"
            />,
          )}
        </Form.Item>
        <div style={{ width: 10 }}></div>
        <Form.Item style={{ width: '50%' }}>
          {/* {getFieldDecorator('organization', {
            rules: [{ required: true, message: 'Insert Organization' }],
          })( */}
          <Select
            mode='tags'
            placeholder="Organization"
            onChange={handleOrganizationChange}
            value={selectedOrganizations}
          >
            {values.organizations.map(org => (
              <Option key={org.id} value={`${org.id}`}>{org.name}</Option>
            ))}
          </Select>
          {/* )} */}
        </Form.Item>

      </div>

      <Form.Item label='Date of event'>
        <RangePicker
          onChange={(date, dateString) => setSelectedDates(dateString)}
          onFocus={e => e.preventDefault()}
          onBlur={e => e.preventDefault()}
        />
      </Form.Item>

      <Form.Item label='Selling time of event'>
        <RangePicker
          showTime={{ format: 'HH' }}
          format="YYYY-MM-DD HH"
          placeholder={['Start Time', 'End Time']}
          onChange={(date, dateString) => { setSelectedSellingTime(date) }}
        />
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('shortDescription', {
          rules: [{ required: true, message: 'Insert event name' }],
        })(
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }}
            placeholder="Short description"
          />,
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('longDescription', {
          rules: [{ required: true, message: 'Insert event name' }],
        })(
          <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }}
            placeholder="Long description"
          />,
        )}
      </Form.Item>

      <div style={{ display: 'flex' }}>
        <Form.Item style={{ width: '100%' }}>
          {getFieldDecorator('country', {
            rules: [{ required: true, message: 'Insert event name' }],
          })(
            <Select
              showSearch
              placeholder="Country"
              onChange={handleCountryChange}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {values.countries.map(country => (
                <Option value={`${country.id}`} key={country.id}>{country.name}</Option>
              ))}
            </Select>,
          )}
        </Form.Item>

        <div style={{ width: 10 }}></div>

        <Form.Item style={{ width: '100%' }}>
          {getFieldDecorator('city', {
            rules: [{ required: true, message: 'Insert event name' }],
          })(
            <Select
              placeholder="City"
              showSearch
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {availableCities.map(city => (
                <Option value={`${city.id}`} key={city.id}>{city.name}</Option>
              ))}
            </Select>,
          )}
        </Form.Item>

      </div>

      <div style={{ display: 'flex' }}>
        <Form.Item style={{ width: '100%' }}>
          {getFieldDecorator('longitude', {
            rules: [{ required: true, message: 'Insert event name' }],
          })(
            <Input placeholder='Longitude' />
          )}
        </Form.Item>

        <div style={{ width: 10 }}></div>

        <Form.Item style={{ width: '100%' }}>
          {getFieldDecorator('latitude', {
            rules: [{ required: true, message: 'Insert event name' }],
          })(
            <Input placeholder='Latitude' />
          )}
        </Form.Item>

      </div>

      <div style={{ display: 'flex' }}>
        <Form.Item style={{ width: '100%' }}>
          {getFieldDecorator('category', {
            rules: [{ required: true, message: 'Insert event name' }],
          })(
            <Select placeholder='Category'>
              {values.categories.map(tag => (
                <Option key={tag.id} value={`${tag.id}`}>{tag.name}</Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item style={{ width: '100%' }}>
          {getFieldDecorator('CECredits', {
            rules: [{ required: true, message: 'Insert event name' }],
          })(
            <InputNumber placeholder={'CE Credits'} style={{ width: '100%' }} />
          )}
        </Form.Item>

        <Form.Item style={{ width: '100%' }}>
          {getFieldDecorator('tags', {
            rules: [{ required: true, message: 'Insert event name' }],
          })(
            <Select mode='tags' placeholder='Tags'>
              {values.tags.map(tag => (
                <Option key={tag.id} value={`${tag.id}`}>{tag.name}</Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item style={{ width: '100%' }}>
          {getFieldDecorator('speakers', {
            rules: [{ required: true, message: 'Insert event name' }],
          })(
            <Select mode='tags' placeholder='Speakers'>
              {values.speakers.map(speaker => (
                <Option key={speaker.id} value={`${speaker.id}`}>{speaker.name}</Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item>
          <Upload {...uploadProps}>
            <Button>
              <Icon type="upload" /> Click to Upload
           </Button>
          </Upload>
        </Form.Item>
      </div>


      <h4>Tickets</h4>
      {tickets.map((ticket, i) => (
        <Form.Item lable={`Ticket: ${i}`} style={{ marginBottom: 5 }}>
          <div style={{ display: 'flex' }}>
            <Input style={{ width: '50%' }} placeholder='Name' value={ticket.name} onChange={(event) => handleChangeTicket(i, event, 'name')} />
            <InputNumber placeholder='Price' onChange={(event) => handleChangeTicket(i, event, 'price')} />
            <InputNumber placeholder='Amount' onChange={(event) => handleChangeTicket(i, event, 'amount')} />
          </div>
        </Form.Item>
      ))}
      <Form.Item>
        <div style={{ display: 'flex' }}>
          <Button onClick={addTicket} style={{ marginRight: 5 }}>
            <Icon type='plus'></Icon>
          </Button>
          {tickets.length > 1 && (
            <Button onClick={removeTicket}>
              <Icon type='minus'></Icon>
            </Button>
          )}
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
          </Button>
      </Form.Item>
    </Form>
  )
}


export default Form.create({ name: 'normal_login' })(InsertPage);
