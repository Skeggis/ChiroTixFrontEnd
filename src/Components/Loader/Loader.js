import React from 'react'
import './Loader.scss'

export default function Loader() {

  return (
    <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}>
    <div class="sk-chase">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>
    </div>
  )
}