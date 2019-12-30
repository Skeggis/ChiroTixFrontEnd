import React, { Fragment } from 'react'

import './TicketsImage.scss'
import Loader from '../Loader/Loader'

function TicketsImage({ imageUrl = '', title = '', subTitle = '', timer = 0, showTimer = false, loading = false }) {
    let time = "00:00"
    if (timer !== 0) {
        let minutes = parseInt(timer / 60000)
        let seconds = parseInt((timer % 60000) / 1000)
        if (minutes < 10) { time = `0${minutes}:` }
        else { time = minutes + ":" }
        if (seconds < 10) { time += `0${seconds}` }
        else { time += seconds }
    }

    let timerDiv;
    if (showTimer) {
        timerDiv = (
            <div className='TicketsImage__timer'>{time}</div>
        );
    }

    return (
        <Fragment>

            <div className="TicketsImage">
                <div className='TicketsImage__test'>

                    <div className='TicketsImage__defaultImage' style={{ backgroundImage: `url(${imageUrl})` }} >
                {timerDiv}
                    </div>
                </div>
                <div className="TicketsImage__content">
                    {loading ? (
                        <div>
                            <Loader />
                        </div>
                    ) : (
                            <Fragment>

                                <h1 className="TicketsImage__eventName">
                                    {title}
                                </h1>
                                <h3 className="TicketsImage__date">
                                    {subTitle}
                                </h3>
                            </Fragment>
                        )}
                </div>
            </div>
        </Fragment>
    );
}

export default TicketsImage