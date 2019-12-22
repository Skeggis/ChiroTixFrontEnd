import React, { Fragment, useState } from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Events from '../../Components/Events/Events'
import { useMedia } from 'react-use'


export default function HomePage(props) {
  const xs = useMedia('(min-width: 0px) and (max-width: 575px)')
  const sm = useMedia('(min-width: 576px) and (max-width: 767px)')
  const md = useMedia('(min-width: 768px) and (max-width: 991px)')
  const lg = useMedia('(min-width: 992px) and (max-width: 1199px)')
  const xl = useMedia('(min-width: 1200px) and (max-width: 1599px)')
  const xxl = useMedia('(min-width: 1600px)')
  const [eventRows, setEventRows] = useState([[]])

  let size
if(xs){size = 'xs'}
if(sm){size = 'sm'}
if(md){size = 'md'}
if(lg){size = 'lg'}
if(xl){size = 'xl'}
if(xxl){size = 'xxl'}

  return (
    <div style={{ width: '100%' }}>
      <div style={{ width: '50%', margin: 'auto', marginTop: 30 }}>
        <SearchBar />
      </div>
      <div style={{margin: 'auto', marginTop: 50, padding: '0px 30px', maxWidth: 2400,}}>
        <Events
          eventRows={eventRows}
          setEventRows={setEventRows}
          size={size}
        />
      </div>

    </div>
  )
}