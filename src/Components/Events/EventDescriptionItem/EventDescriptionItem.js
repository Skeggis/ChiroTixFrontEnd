import React from 'react'
import './EventDescriptionItem.scss'

import {
  Button
} from 'antd'
import { Animated } from 'react-animated-css'


export default function EventDescriptionItem(props) {
  const {
    event,
    animate,
    animationInDirection,
    animationOutDirection
  } = props

  let imageTextAnimationIn = animationInDirection === 'right' ? 'fadeInRight' : 'fadeInLeft'
  let imageTextAnimationOut = animationOutDirection === 'right' ? 'fadeOutRight' : 'fadeOutLeft'

  let descriptionAnimationIn
  if (animationInDirection === 'down') {
    descriptionAnimationIn = 'fadeInDown'
  } else {
    descriptionAnimationIn = animationInDirection === 'right' ? 'fadeInRight' : 'fadeInLeft'
  }

  let descriptionAnimationOut
  if (animationOutDirection === 'up') {
    descriptionAnimationOut = 'fadeOutUp'
  } else {
    descriptionAnimationOut = animationOutDirection === 'right' ? 'fadeOutRight' : 'fadeOutLeft'
  }

  return (
    <div className='eventDescItem'>
      <div className='eventDescItem__imageWrapper'>
        <img
          alt={event.name}
          src={event.image}
          className='eventDescItem__image'
        />
        <div className='eventDescItem__imageText'>
          <Animated isVisible={animate} animateOnMount={false} animationIn={imageTextAnimationIn} animationOut={imageTextAnimationOut} animationDuration={300} animationInDelay={100}>
            <h1 style={{ marginBottom: 0 }}>{event.name}</h1>
          </Animated>
          <Animated isVisible={animate} animateOnMount={false} animationIn={imageTextAnimationIn} animationOut={imageTextAnimationOut} animationDuration={300} animationInDelay={180}>
            <p style={{ fontSize: 18 }}>{`${event.city}, ${event.country}`}</p>
          </Animated>
        </div>
      </div>
      <div className='eventDescItem__contentWrapper'>
        <div style={{ overflow: 'hidden' }}>
          <Animated isVisible={animate} animateOnMount={true} animationIn={descriptionAnimationIn} animationOut={descriptionAnimationOut} animationDuration={300} animationInDelay={100}>
            <h1>Description</h1>
          </Animated>
          <Animated isVisible={animate} animateOnMount={true} animationIn={descriptionAnimationIn} animationOut={descriptionAnimationOut} animationDuration={300} animationInDelay={140}>
            <p>{event.shortDescription}</p>
          </Animated>
          <Animated isVisible={animate} animateOnMount={true} animationIn={descriptionAnimationIn} animationOut={descriptionAnimationOut} animationDuration={300} animationInDelay={180}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <h2 style={{ fontSize: 24 }}>Price: <span style={{ fontSize: 20, marginLeft: 5, fontWeight: 400 }}>{`${Number(event.minPrice).toFixed(2)} - ${Number(event.maxPrice).toFixed(2)}$`}</span></h2>
              <h2 style={{ fontSize: 24 }}>CE Credits: <span style={{ fontSize: 20, marginLeft: 5, fontWeight: 400 }}>{event.CECredits}</span></h2>
            </div>
          </Animated>
        </div>

        <Animated isVisible={animate} animateOnMount={true} animationIn={descriptionAnimationIn} animationOut={descriptionAnimationOut} animationDuration={300} animationInDelay={220}>
          <div className='eventDescItem__actionsWrapper'>
            <Button size='large' style={{ marginRight: 10 }}>More</Button>
            <Button size='large'>Tickets</Button>
          </div>
        </Animated>
      </div>

    </div>
  )
}