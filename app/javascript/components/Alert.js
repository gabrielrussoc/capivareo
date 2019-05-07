// @flow
import React from 'react'

type Props = {
    text: string
}

const Alert = (props: Props) => {
    return (
        <blockquote>
            {props.text}
        </blockquote>
    );
}

export default Alert