import React from 'react'
import {Row, Col, Typography} from 'antd'
import {
    FacebookIcon, FacebookShareButton,
    TwitterIcon, TwitterShareButton,
    WhatsappIcon, WhatsappShareButton,
    EmailIcon, EmailShareButton,
    PinterestIcon, PinterestShareButton
} from 'react-share'

import './ShareButtons.scss'

function ShareButtons({url=''}){
    return (
        <div className="ShareButtons__shareDiv">
                <Row>
                    <Col span={2}>
                        <FacebookShareButton url={url} className="ShareButtons__shareButton">
                            <FacebookIcon size={32} round={true} className="ShareButtons__pointer"/>
                            <Typography.Text className="ShareButtons__shareText ShareButtons__pointer" >Share</Typography.Text>
                        </FacebookShareButton>

                    </Col>
                    <Col span={2}>
                        <TwitterShareButton url={url} className="ShareButtons__shareButton">
                            <TwitterIcon size={32} round={true} className="ShareButtons__pointer"/>
                            <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">Tweet</Typography.Text>
                        </TwitterShareButton>
                    </Col>
                    <Col span={2}>
                        <WhatsappShareButton url={url} className="ShareButtons__shareButton">
                            <WhatsappIcon size={32} round={true} className="ShareButtons__pointer"/>
                            <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">WhatsApp</Typography.Text>
                        </WhatsappShareButton>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={2}>
                        <PinterestShareButton url={url} className="ShareButtons__shareButton">
                            <PinterestIcon size={32} round={true} className="ShareButtons__pointer"/>
                            <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">Pinterest</Typography.Text>
                        </PinterestShareButton>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={2}>
                        <EmailShareButton url={url} className="ShareButtons__shareButton">
                            <EmailIcon size={32} round={true} className="ShareButtons__pointer"/>
                            <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">Send</Typography.Text>
                        </EmailShareButton>
                    </Col>
                    
                </Row>
            </div>
    );
}

export default ShareButtons