import React from 'react'

import BigAd from '../../Components/BigAd/BigAd'
import MainInfoBar from '../../Components/MainInfoBar/MainInfoBar'
import EventDescription from '../../Components/EventDescription/EventDescription'
import ShareButtons from '../../Components/ShareButtons/ShareButtons'

import './EventPage.scss'

function EventPage(props) {
    const url = "visir.is"
    const event = {
        name: "Chiropraktik 101",
        date: "16.09.19 - 17.09.19",
        shortdescription: "Mjög svo kúl sjitt",
        longdescription: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        image: '../../../tempImg.jpg',
        latitude: 15.2,
        longitude: 39.4,
        startsellingtime: new Date('2015-03-25T12:00:00-06:30'),
        organization: "ICPA",
        country:"Germany",
        city: "Berlin",
        CEcredits: 2,
        priceRange: "2,160 - 3,190 $",
        speakers: [{ name: "Þórður Ágústsson", image:'https://scontent.frkv3-1.fna.fbcdn.net/v/t31.0-1/c0.0.60.60a/p60x60/10658710_10201503392705500_1739679584724004174_o.jpg?_nc_cat=104&_nc_ohc=OoqBFquZEwEAQl6tJ0zL4zpfi-wzbFRUXDiGZKubGfZm_s-jmi2fK1KMQ&_nc_ht=scontent.frkv3-1.fna&oh=44c64fd729d2918f060b04a4bf98c26b&oe=5EAF1CF8' }, 
        { name: "Róbert Ingi", image:'https://scontent.frkv3-1.fna.fbcdn.net/v/t31.0-1/c0.8.60.60a/p60x60/14289933_1171408029549142_3744193122298237561_o.jpg?_nc_cat=104&_nc_ohc=MjoYJnORmqsAQnFqjVwM53vxwezDpTeAlHtJk4b7z31tcaBfchIvATzyA&_nc_ht=scontent.frkv3-1.fna&oh=32e16084d53dd8e48a8872203ec1fa6d&oe=5E6B8FFF' },
         { name: "Vignir Þór", image:'https://scontent.frkv3-1.fna.fbcdn.net/v/t1.0-1/p60x60/68633267_10221008642586189_9050091452448636928_o.jpg?_nc_cat=110&_nc_ohc=8GZNPx1hfdMAQkO9UyJHnOgyUfXY71rF7YAd1kTFW1FPoyriVr_9p_8Tw&_nc_ht=scontent.frkv3-1.fna&oh=a4dac3aa6b534d38219c84c0dafdefe9&oe=5EABE798' }],
        tags: [{ tag: "Trigger point" }, { tag: "babies" }, { tag: "Hands on" }]
    }
    return (
        <div className="EventPage">

            <BigAd image={event.image} title={event.name} minorTitle={event.organization} subTitle={`${event.city}, ${event.country}`} />

            <MainInfoBar priceRange={event.priceRange} dates={event.date} />

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

export default EventPage;