import React from 'react'
import { Typography, Row, Col, List, Tag } from 'antd'

import './EventDescription.scss'

function EventDescription({ description = '', speakers = [], tags = [] }) {

    let speakersItems = []
    for(let i = 0; i < 5; i++){
        speakers.forEach(speaker => 
            speakersItems.push(<div className="EventDescription__speakerDiv">
                    <a className="EventDescription__speakerDiv">
                        <img className="EventDescription__speakerImage" alt="" src={speaker.image} />
                        <h4>
                            {speaker.name}
                        </h4>
                    </a>
                </div>)
        )
    }
    return (
        <div className="EventDescription">
            <div className="EventDescription__descriptionDiv">
                <h3>
                    Description:
                </h3>
                <p className="EventDescription__description">
                    {description}
                </p>
                <Typography.Text></Typography.Text>
            </div>

            <h3>
                    Speakers:
            </h3>
            <div className="EventDescription__speakersDiv">
                {speakersItems}
                {/* {speakers.map(speaker => <div className="EventDescription__speakerDiv">
                    <div className="EventDescription__speakerDiv">
                        <img className="EventDescription__speakerImage" alt="" src={speaker.image} />
                        <h4>
                            {speaker.name}
                        </h4>
                    </div>
                </div>
                )
                } */}
            </div>

            <div className="EventDescription__tagsDiv">

                <div className="EventDescription_tags">
                    {tags.map(tag =>
                        <Tag color="#108ee9">{tag.tag}</Tag>
                    )
                    }
                </div>

            </div>
        </div>

    );
}

export default EventDescription