import React from 'react';

export default () => {
    const env = __isClientSide__ ? 'client' : 'server';

    return (
        <>
            <div>Hello from {env}!! This is for the SSR guide.</div>
            <img src="/static/doggyfamily.jpg" alt="doggyfamily" />
        </>
    );
}