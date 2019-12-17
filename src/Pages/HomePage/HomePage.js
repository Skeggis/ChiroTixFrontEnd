import React, {Fragment} from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Events from '../../Components/Events/Events'

export default function HomePage(props){

  return (
    <div style={{width: '100%'}}>
      <div style={{width: '50%', margin: 'auto', marginTop: 30}}>
        <SearchBar/>
      </div>
        <Events/>
    </div>
  )
}