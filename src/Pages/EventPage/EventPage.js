import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Typography, Row, Col, Button, List, Tag } from 'antd'

import BigAd from '../../Components/BigAd/BigAd'
import MainInfoBar from '../../Components/MainInfoBar/MainInfoBar'
import EventDescription from '../../Components/EventDescription/EventDescription'
import ShareButtons from '../../Components/ShareButtons/ShareButtons'

import './EventPage.scss'

function EventPage(props) {
    const url = "visir.is"
    const event = {
        name: "Chiropraktik 101",
        date: new Date(),
        shortdescription: "Mjög svo kúl sjitt",
        longdescription: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        image: 'https://defaultcustomheadersdata.files.wordpress.com/2016/07/beach1.jpg?resize=960,250',
        latitude: 15.2,
        longitude: 39.4,
        startsellingtime: new Date('2015-03-25T12:00:00-06:30'),
        organization: "ICPA",
        CEcredits: 2,
        priceRange: "5,000$-10,000$",
        speakers: [{ name: "Þórður Ágústsson" }, { name: "Róbert Ingi" }, { name: "Vignir Þór" }],
        tags: [{ tag: "Trigger point" }, { tag: "babies" }, { tag: "Hands on" }]
    }
    return (
        <div className="EventPage">

            <BigAd image={event.image} title={event.name} minorTitle={event.organization} />

            <MainInfoBar priceRange={event.priceRange} dates={event.date.toDateString()} CEcredits={event.CEcredits} />

            <div className="EventPage__page">
                <EventDescription description={event.longdescription} speakers={event.speakers} tags={event.tags} />

                <div className="EventPage__shareButtons">
                    <ShareButtons url={url} />
                </div>


                <div className="EventPage__gmaps">
                    <iframe title="massi" className="EventPage__iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1789.6759986433394!2d-21.90691108388139!3d64.11145742580317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48d60caaf8eb043d%3A0xf3846a65cb2f18b0!2sFannborg%202%2C%20K%C3%B3pavogur!5e1!3m2!1sen!2sis!4v1576517501262!5m2!1sen!2sis" ></iframe>
                </div>



            </div>



        </div>
    );
}

const mapStateToProps = (state) => ({
    // game: state.socketState.game,
    // loading: state.socketState.loading,
    // connected: state.socketState.connected
})

const mapDispatchToProps = (dispatch) => ({
    // getCourt: (tournamentID, courtID) => dispatch(getCourt(tournamentID, courtID))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);