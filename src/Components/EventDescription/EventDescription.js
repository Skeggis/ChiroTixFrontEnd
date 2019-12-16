import React from 'react'
import { Typography, Row, Col, List, Tag } from 'antd'

import './EventDescription.scss'

function EventDescription({description='', speakers=[], tags=[]}) {
    return (
        <div>
            <div className="EventDescription__longDescriptionDiv">
                <Typography.Title level={3}>Description:</Typography.Title>
                <Typography.Text>{description}</Typography.Text>
            </div>
            <div className="EventDescription__speakersDiv">
                <Typography.Title>Speakers:</Typography.Title>
                <List >
                    {speakers.map(speaker => <List.Item>
                        <Typography.Title level={4}>
                            {speaker.name}
                        </Typography.Title>

                    </List.Item>
                    )
                    }
                </List>
            </div>

            <div className="EventDescription__tagsDiv">
                <Row>
                    <Col>
                        <Typography.Text>Tags:</Typography.Text>
                    </Col>
                </Row>

                <Row className="EventDescription__tags">
                    {tags.map(tag =>
                        <Tag color="#108ee9">{tag.tag}</Tag>
                    )
                    }
                </Row>

            </div>
        </div>

    );
}

export default EventDescription