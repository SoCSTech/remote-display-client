import $ from 'jquery'
import React from "react";
import QRCode from 'qrcode.react';

export default class TwitterSlide extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidUpdate()
    {
        $(".twitter-feed").html("");
        twttr?.widgets.load();
    }

    componentDidMount()
    {
        twttr?.widgets.load()

        // Twitter Overrides -----------------------------------------------------------------------------
        $('.twitter-feed').delegate('#twitter-widget-0', 'DOMSubtreeModified propertychange', function () {
            customizeTweetMedia();
        });

        var customizeTweetMedia = function () {
            // CSS Overrides
            $('.twitter-feed').find('.twitter-timeline').contents().find('.timeline-Tweet-media').css('display', 'none');
            $('.twitter-feed').find('.twitter-timeline').contents().find('.timeline-TweetList li:nth-child(even)').css('background-color', '#181818');
            $('.twitter-feed').find('.twitter-timeline').contents().find('span.TweetAuthor-avatar.Identity-avatar').remove();
            $('.twitter-feed').find('.twitter-timeline').contents().find('span.TweetAuthor-screenName').css('font-size', '16px');
            $('.twitter-feed').find('.twitter-timeline').contents().find('p.timeline-tweet-text').css('font-size', '16px');
            $('.twitter-feed').find('.twitter-timeline').contents().find('p.timeline-tweet-text').css('line-height', '1.5');
            $('.twitter-feed').find('.twitter-timeline').contents().find('ul.timeline-tweet-actions').css('display', 'none');

            // Call the function on dynamic updates in addition to page load
            $('.twitter-feed').find('.twitter-timeline').contents().find('.timeline-TweetList').bind('DOMSubtreeModified propertychange', function () {
                customizeTweetMedia(this);
            });
        }
    }

    render()
    {
        return <div className="twitter-slide container">
            <div className="left">
                <img src={this.props.data.avatar}/>
                <h1>{this.props.data.title}</h1>
                <h2>{this.props.data.handle}</h2>
                <QRCode value={`https://twitter/${this.props.data.handle}/`} bgColor="transparent" fgColor="#ffffff" />
            </div>
            <div className="twitter-feed">
                <a className="twitter-timeline" href={this.props.data.url} data-theme="dark" data-chrome="noheader nofooter noborders noscrollbar transparent" data-width="1200">Tweets by UoLCompSci</a>
            </div>
        </div>
    }
}