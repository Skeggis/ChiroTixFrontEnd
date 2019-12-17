import React from 'react'
import {Typography, Row, Col} from 'antd'
import './BigAd.scss'

function BigAd({image='', title='', minorTitle=''}) {
    return (
        <div className='BigAd' style={{ backgroundImage: `url('${image}')` }}>
            
            <div className='BigAd__organizationTitleDiv'>
                <h1 className='BigAd__organizationTitle'>{minorTitle}</h1>
            </div>


            <div className="BigAd__eventTitleDiv">
                <h1 className='BigAd__eventTitle'>{title}</h1>
            </div>
        </div>
    );
}

export default BigAd