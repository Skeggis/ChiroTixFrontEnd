import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'

export default function Header(props) {
  const {
    eventPage,
    organization
  } = props

  if (eventPage) {
    return (
      <div className='header--eventPage'>
        <Link to='/' >
          <h2 style={{ color: 'white', margin: 0, marginLeft: 20, }}>ChiroTix</h2>
        </Link>
    <h2 style={{ color: 'white', margin: 0, marginRight: 20, }}>{organization}</h2>

      </div>
    )
  } else {
    return (
      <div className='header'>
        <Link to='/' >
          <h2 style={{ color: 'white', margin: 0, marginLeft: 20, }}>ChiroTix</h2>
        </Link>
      </div>
    )
  }
}