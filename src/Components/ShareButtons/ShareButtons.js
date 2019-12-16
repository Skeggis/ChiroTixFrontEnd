import React from 'react'
import {Row, Col, Typography} from 'antd'
import {
    FacebookIcon, FacebookShareButton,
    TwitterIcon, TwitterShareButton,
    WhatsappIcon, WhatsappShareButton,
    RedditIcon, RedditShareButton,
    TumblrIcon, TumblrShareButton,
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
                    <Col span={2}>
                        <RedditShareButton url={url} className="ShareButtons__shareButton">
                            <RedditIcon size={32} round={true} className="ShareButtons__pointer"/>
                            <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">Reddit</Typography.Text>
                        </RedditShareButton>
                    </Col>
                    <Col span={2}>
                        <TumblrShareButton url={url} className="ShareButtons__shareButton">
                            <TumblrIcon size={32} round={true} className="ShareButtons__pointer"/>
                            <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">Tumblr</Typography.Text>
                        </TumblrShareButton>
                    </Col>
                    <Col span={2}>
                        <EmailShareButton url={url} className="ShareButtons__shareButton">
                            <EmailIcon size={32} round={true} className="ShareButtons__pointer"/>
                            <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">Send</Typography.Text>
                        </EmailShareButton>
                    </Col>
                    <Col span={2}>
                        <PinterestShareButton url={url} className="ShareButtons__shareButton">
                            <PinterestIcon size={32} round={true} className="ShareButtons__pointer"/>
                            <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">Pinterest</Typography.Text>
                        </PinterestShareButton>
                    </Col>
                </Row>
            </div>
    );
}

export default ShareButtons