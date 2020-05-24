import React from 'react';
import { useParams } from 'react-router';

export default () => {
    const { color } = useParams();
    console.log('DogsColor: ' + color);

    return(
        <p>
            ...and I am <strong>{color}</strong>!
        </p>
    );
}