import React, { useState, useEffect } from 'react'
import './EventItem.scss'
import {
  Divider,
  Button
} from 'antd'
import { Animated } from "react-animated-css";


export default function EventItem(props) {
  const {
    event,
    eventIsOpen,
    setEventIsOpen,
    selectedEvent,
    setSelectedEvent,
    eventRowNumber,
    setOldRowNumber,
    eventColNumber,
    setOldColNumber,
    setEventWasClosed
  } = props

  const [isHovering, setIsHovering] = useState(false)

  function handleMouseEnter() {
    setIsHovering(true)
  }

  function handleMouseLeave() {
    setIsHovering(false)
  }

  function handleEventClick(event) {
    setOldRowNumber(selectedEvent.eventRowNumber)
    setOldColNumber(selectedEvent.eventColNumber)

    if (selectedEvent.id === event.id) {
      if (eventIsOpen) {
        setSelectedEvent({ id: -1 })
        setEventWasClosed(false)
        setOldRowNumber(-1)
      } else {
        event.eventRowNumber = eventRowNumber
        event.eventColNumber = eventColNumber
        setSelectedEvent(event)
        setEventWasClosed(true)
      }
      console.log('her')
      setEventIsOpen(!eventIsOpen)
    } else {
      console.log('her2')
      setEventIsOpen(true)
      if (selectedEvent.id === -1) {

        setEventWasClosed(true)
      } else {
        setEventWasClosed(false)
      }
      event.eventRowNumber = eventRowNumber
      event.eventColNumber = eventColNumber
      setSelectedEvent(event)
    }

  }

  const [textDisplay, setTextDisplay] = useState('flex')
  const [buttonsDisplay, setButtonsDisplay] = useState('none')

  useEffect(() => {
    if (isHovering) {
      setTimeout(() => {
        setTextDisplay('none')
      }, 300)

      setButtonsDisplay('flex')
    }
  }, [isHovering])

  const selected = selectedEvent.id === event.id
  const cardHover = selected || isHovering ? 'eventItem-hovering' : ''

  return (
    <div className={`eventItem ${cardHover}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}

      onClick={() => handleEventClick(event)}
    >
      <div className='eventItem__imageContainer'>
        <img
          src={event.image}
          className={`eventItem__image ${(isHovering || selected) && 'eventItem__image-hovering'}`}
          alt={event.name}
        />

        <div style={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <div className='eventItem__imageContent' style={{ margin: '10px 10px 0 10px', display: 'flex', justifyContent: 'space-between', }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Animated animateOnMount={false} isVisible={isHovering || selected} animationIn='fadeInLeft' animationOut='fadeOutLeft' animationInDuration={300} animationOutDuration={300}>
                <h3 style={{ margin: 0, fontSize: 20 }}>{event.city}</h3>
              </Animated>
              <Animated animateOnMount={false} isVisible={isHovering || selected} animationIn='fadeInLeft' animationOut='fadeOutLeft' animationInDelay={80} animationInDuration={300} animationOutDuration={300}>
                <p style={{ padding: 0, fontSize: 16, color: 'black' }}>{event.country}</p>
              </Animated>
            </div>
            <div>
              <Animated animateOnMount={false} isVisible={isHovering ||selected} animationIn='fadeInRight' animationOut='fadeOutRight' animationInDuration={300} animationOutDuration={300}>
                <h3>{event.organization}</h3>
              </Animated>
            </div>
          </div>
        </div>
        <div className='eventItem__contentWrapper'>
          <div style={{ position: 'relative', width: '100%', height: 80 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', display: 'flex', width: '100%' }}>
              <Animated isVisible={!isHovering} animateOnMount={false} animationOut='fadeOutLeft' animationIn='fadeInLeft' animationInDuration={300} animationOutDuration={300}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', }}>
                  <h1 style={{ margin: 0, color: 'white' }}>{event.name}</h1>
                  <p style={{ color: 'white', fontSize: 16, margin: 0 }}>{event.date}</p>
                </div>

              </Animated>
            </div>
            <div style={{ position: 'absolute', top: 0, left: 0, height: 80, width: '100%' }}>
              <Animated style={{ height: '100%' }} isVisible={isHovering} animateOnMount={false} animationOut='fadeOutRight' animationIn='fadeInRight' animationInDuration={300} animationOutDuration={300}>
                <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Button size='large' style={{ color: 'white', marginRight: 30, backgroundColor: 'rgba(157, 141, 241, 0.7)', }}>More</Button>
                  <Button size='large' style={{ color: 'white', backgroundColor: 'rgba(157, 141, 241, 0.7)', }}>Tickets</Button>
                </div>
              </Animated>
            </div>
          </div>
        </div>

      </div>

      {/* <div style={{ margin: 10 }}>
        <h2 style={{ marginBottom: 0 }}>{event.name}</h2>
        <h3 style={{ padding: 0, marginTop: 0 }}>{event.organization}</h3>
      </div> */}
      {/* <Divider style={{ marginBottom: 0 }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', margin: 10 }}>
        <Button>More</Button>
        <Button style={{ marginLeft: 5 }}>Tickets</Button>
      </div> */}
    </div>
  )
}