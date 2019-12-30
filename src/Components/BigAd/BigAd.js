import React, { useState, useEffect } from 'react'
import './BigAd.scss'
import { Skeleton } from 'antd'
import Loader from '../Loader/Loader'
import Header from '../../Components/Header/Header'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function BigAd({ image = '', title = '', minorTitle = '', subTitle = '', loading = true, mainInfoBarHeight = 0 }) {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const height = windowDimensions.height - mainInfoBarHeight

    if (loading) {
        return (
            <div className='BigAd' style={{ height }}>
                <div style={{ height: '100%' }}>
                <div style={{position: 'absolute', top: 0, left: 0, width: '100%'}}>
                <Header eventPage />
                </div>
                    <Loader />
                </div>

            </div>
        )
    }
    return (
        <div className='BigAd' style={{ backgroundImage: `url('${image}')`, height }} >
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