// @flow
import React from 'react'

type Props = {
    title: string,
    caption: string,
    icon: string, // img path
};

const Card = (props: Props) => {
    return (
        <div className="card">
            <div className="card-content">
                <span className="card-title">{props.title}</span>
                <i className="large material-icons">{props.icon}</i>
                <p>{props.caption}</p>
            </div>
        </div>
    )
}

export default Card

