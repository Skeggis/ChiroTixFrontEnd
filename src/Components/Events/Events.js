import React, { Fragment, useEffect, useState } from 'react'
import {
  Row,
  Col,
  Card,
  Button,
  DatePicker,
} from 'antd'
import EventItem from './EventItem/EventItem'
import EventDescriptionItem from './EventDescriptionItem/EventDescriptionItem'
import { Animated } from 'react-animated-css'

import './Events.scss'
export default function Events(props) {

  const {
    eventRows,
    setEventRows,
    size,
  } = props

  const events = [
    {
      id: 1,
      name: 'ChiroTix Event',
      organization: 'ICPA',
      date: '24.06.20',
      city: 'Reykjavík',
      country: 'Iceland',
      image: 'https://www.comolakechiropractic.com/wp-content/uploads/2019/10/chiropractor-coquitlam-adjustment-1.jpg',
      credits: 3,
      shortDescription: 'is dustrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electroni',
      price: [599, 899]
    }, {
      id: 2,
      name: 'Test event',
      organization: 'ICPA',
      date: '24.06.20',
      city: 'Reykjavík',
      country: 'Iceland',
      image: 'https://www.comolakechiropractic.com/wp-content/uploads/2019/10/chiropractor-coquitlam-adjustment-1.jpg',
      credits: 3,
      shortDescription: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electroni',
      price: [599, 899]
    }, {
      id: 3,
      name: 'Test event',
      organization: 'ICPA',
      country: 'Iceland',
      date: '24.06.20',
      city: 'Reykjavík',
      image: 'https://www.comolakechiropractic.com/wp-content/uploads/2019/10/chiropractor-coquitlam-adjustment-1.jpg',
      credits: 3,
      shortDescription: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electroni',
      price: [599, 899]

    }, {
      id: 4,
      name: 'Test event',
      organization: 'ICPA',
      country: 'Iceland',
      date: '24.06.20',
      city: 'Reykjavík',
      image: 'https://www.comolakechiropractic.com/wp-content/uploads/2019/10/chiropractor-coquitlam-adjustment-1.jpg',
      credits: 3,
      shortDescription: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electroni',
      price: [599, 899]
    }, {
      id: 5,
      country: 'Iceland',
      name: 'Test event',
      organization: 'ICPA',
      date: '24.06.20',
      city: 'Reykjavík',
      image: 'https://www.comolakechiropractic.com/wp-content/uploads/2019/10/chiropractor-coquitlam-adjustment-1.jpg',
      credits: 3,
      shortDescription: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electroni',
      price: [599, 899]
    }
  ]

  useEffect(() => {
    let numEvents
    if (size === 'xs') {
      numEvents = 1
    } else if (size === 'sm') {
      numEvents = 1
    } else if (size === 'md') {
      numEvents = 2
    } else if (size === 'lg') {
      numEvents = 3
    } else if (size === 'xl') {
      numEvents = 3
    } else if (size === 'xxl') {
      numEvents = 4
    } else {
      numEvents = 4
    }

    var myRows = [];
    while (events.length) myRows.push(events.splice(0, numEvents));
    setEventRows(myRows)
  }, [size])

  const [selectedEvent, setSelectedEvent] = useState({ id: -1 })
  const [eventIsOpen, setEventIsOpen] = useState(false)
  const [eventRowNumber, setEventRowNumber] = useState(0)
  const [oldRowNumber, setOldRowNumber] = useState(-1)
  const [oldColNumber, setOldColNumber] = useState(-1)
  const [eventWasClosed, setEventWasClosed] = useState(true)




  let animationIn = selectedEvent.eventColNumber > oldColNumber ? 'fadeInLeft' : "fadeInRight"
  let animationInDirection = selectedEvent.eventColNumber > oldColNumber ? 'left' : 'right'
  if (eventWasClosed) {
    animationIn = 'fadeInDown'
    animationInDirection = 'down'
  }

  let animationOut = selectedEvent.eventColNumber < oldColNumber ? 'fadeOutLeft' : "fadeOutRight"
  let animationOutDirection = selectedEvent.eventColNumber < oldColNumber ? 'left' : 'right'

  if (eventWasClosed) {
    animationOut = 'fadeOutUp'
    animationOutDirection = 'up'
  }


  return (
    <Fragment>
      {eventRows.map((row, i) => (
        <Fragment>
          <Row gutter={[24, 32]}>
            {row.map((event, j) => (
              <Fragment>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                  <EventItem
                    event={event}
                    eventIsOpen={eventIsOpen}
                    setEventIsOpen={setEventIsOpen}
                    selectedEvent={selectedEvent}
                    setSelectedEvent={setSelectedEvent}
                    eventRowNumber={i}
                    setOldRowNumber={setOldRowNumber}
                    eventColNumber={j}
                    setOldColNumber={setOldColNumber}
                    setEventWasClosed={setEventWasClosed}
                  />
                </Col>
              </Fragment>
            ))}
            <Col span={24}>

              <div style={{ height: eventIsOpen && selectedEvent.eventRowNumber === i ? 450 : 0, position: 'relative' }} className='events__descriptionItem'>
                {/* <Collapse isOpen={selectedEvent.eventRowNumber === i}> */}
                {row.map((event, j) => (
                  <div style={{ height: '100%', position: selectedEvent.id === event.id && eventIsOpen ? 'absolute' : 'absolute', display: selectedEvent.id === event.id && eventIsOpen ? '' : '', top: 0, left: 0, overflow: 'hidden' }}>
                    <Animated
                      animateOnMount={false}
                      isVisible={selectedEvent.id === event.id && selectedEvent.eventRowNumber === i}
                      animationIn={selectedEvent.eventRowNumber !== oldRowNumber ? 'fadeInDown' : animationIn}
                      animationOut={selectedEvent.eventRowNumber !== oldRowNumber ? 'fadeOutUp' : animationOut}>
                      <EventDescriptionItem
                        event={event}
                        animate={selectedEvent.id === event.id}
                        animationInDirection={selectedEvent.eventRowNumber !== oldRowNumber ? 'down' : animationInDirection}
                        animationOutDirection={selectedEvent.eventRowNumber !== oldRowNumber ? 'up' : animationOutDirection}
                      />
                    </Animated>
                  </div>
                ))}
                {/* </Collapse> */}
              </div>
            </Col>


          </Row>

        </Fragment>
      ))}
    </Fragment>
  )
}