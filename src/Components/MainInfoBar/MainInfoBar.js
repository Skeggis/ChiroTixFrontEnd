import React, { useRef, useEffect, useState } from 'react'
import { Typography, Row, Col, Button } from 'antd'
import ScrollDownButton from '../ScrollDownButton/ScrollDownButton'
import './MainInfoBar.scss'

function MainInfoBar(props) {

    const {
        priceRange,
        dates,
        handleBuyTickets,
        setHeight,
        handleScroll,
        down
    } = props

    const ref = useRef(null)


    useEffect(() => {
        setHeight(ref.current.clientHeight)
    })
    return (


        <div ref={ref} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: 1600, }} className='MainInfoBar MainInfoBar--sticky'>
            {/* <div style={{ display: 'flex', margin: '0 80px'}}> */}
            {/* <div style={{ display: 'flex',flexGrow: '1', justifyContent: 'flex-start', marginLeft: 50 }}> */}

            <div style={{display: 'flex', justifyContent: 'center', width: '100%',flexWrap: 'wrap'}}>

                <div className="MainInfoBar__colDiv" style={{ marginRight: 30, }}>

                    <div className="MainInfoBar__nameDiv">
                        <h2 style={{ fontSize: '24px' }}>
                            Price
                             </h2>
                    </div>
                    <div className="MainInfoBar__valueDiv">
                        <h3 style={{ fontSize: '20px' }}>
                            {priceRange}
                        </h3>
                    </div>

                </div>
                <div className="MainInfoBar__colDiv" style={{ marginRight: 0 }}>
                    <div className="MainInfoBar__nameDiv">
                        <h2 style={{ fontSize: '24px' }}>
                            Dates
                         </h2>
                    </div>

                    <div className="MainInfoBar__valueDiv">
                        <h3 style={{ fontSize: '20px' }}>
                            {dates}
                        </h3>
                    </div>

                </div>

            </div>
            <div style={{ marginRight: 0 }}>
                <ScrollDownButton handleClick={handleScroll} down={down} />
            </div>

            {/* </div> */}

            <div className=' MainInfoBar__buttonDiv' style={{justifyContent: 'flex-end',width: '100%',  }}>
                <Button onClick={handleBuyTickets} className="MainInfoBar__button" style={{ backgroundColor: "#6D8791", borderColor: "#6D8791", fontSize: "20px", fontWeight: "400", color: "white", marginRight: 150 }} >Tickets</Button>
            </div>
        </div>
    );
}

export default MainInfoBar