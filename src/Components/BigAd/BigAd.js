import React from 'react'
import './BigAd.scss'

function BigAd({ image = '', title = '', minorTitle = '', subTitle = '' }) {
    return (
        <div className='BigAd' style={{ backgroundImage: `url('${image}')` }}>

            <div className='BigAd__organizationTitleDiv'>
                <h1 className='BigAd__organizationTitle'>{minorTitle}</h1>
            </div>

            <div className="BigAd__flexDiv">
                <div className="BigAd__bannerDiv">
                    <div className="BigAd__eventTitleDiv">
                        <h1 className='BigAd__eventTitle'>{title}</h1>
                        <h3 className='BigAd__subTitle'>{subTitle}</h3>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default BigAd