import React from 'react'
import './Header.scss'
import {Link} from 'react-router-dom'

export default function Header(props) {

  return (
    <div className='header'>
      <Link to='/' >
        <h2 style={{color: 'white', margin: 0, marginLeft: 20,}}>ChiroTix</h2>
      </Link>
    </div>
  )
}