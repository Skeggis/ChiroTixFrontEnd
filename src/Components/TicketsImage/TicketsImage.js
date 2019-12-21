import React from 'react'

import './TicketsImage.scss'

function TicketsImage({ imageUrl = '', title='', subTitle='' }) {
    return (
        <div className="TicketsImage">
            <div className='TicketsImage__defaultImage' style={{ backgroundImage: `url('${imageUrl}')` }}></div>
            <div className="TicketsImage__content">
                <h1 className="TicketsImage__eventName">
                    {title}
                </h1>
                <h3 className="TicketsImage__date">
                    {subTitle}
                </h3>
            </div>
        </div>
    );
}

export default TicketsImage