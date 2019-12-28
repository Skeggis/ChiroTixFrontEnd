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
import { Collapse } from 'react-collapse'

import './Events.scss'
export default function Events(props) {

  const {
    eventRows,
    setEventRows,
    size,
    events,
    setEvents,
  } = props
console.log(events[0])
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
    let tempEvents = JSON.parse(JSON.stringify(events))
    while (tempEvents.length) myRows.push(tempEvents.splice(0, numEvents));
    setEventRows(myRows)
  }, [size, events])


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
    <div className='events'>
      {eventRows.map((row, i) => (
        <Fragment>
          <Row gutter={[24, 32]}>
            {row.map((event, j) => (
              <Fragment>
                {event.id && (
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
                )}
              </Fragment>
            ))}
            <Col span={24}>

              {/* <div style={{ height: eventIsOpen && selectedEvent.eventRowNumber === i ? 450 : 0, position: 'relative' }} className='events__descriptionItem'> */}
              <Collapse isOpened={selectedEvent.eventRowNumber === i}>
                <div style={{ position: 'relative', height: 450 }}>
                  {row.map((event, j) => (
                    <div style={{ height: '100%', width: '100%', position: selectedEvent.id === event.id && eventIsOpen ? 'absolute' : 'absolute', display: selectedEvent.id === event.id && eventIsOpen ? '' : '', top: 0, left: 0, overflow: 'hidden', zIndex: selectedEvent.id === event.id && eventIsOpen ? 10: 0 }}>

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
                </div>
              </Collapse>
              {/* </div> */}
            </Col>


          </Row>

        </Fragment>
      ))}
    </div>
  )
}