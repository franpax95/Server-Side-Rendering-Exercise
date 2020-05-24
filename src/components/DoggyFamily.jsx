import React from 'react';
import { renderRoutes } from 'react-router-config';
import MenuLink from './MenuLink';

export default ({ route }) => {
    return (
        <>
            <p>
                <img src="/static/doggyfamily.jpg" alt="doggyfamily" style={{ maxWidth: "40vw" }}/>
            </p>
            <div>
                {route.routes.map(route => (
                    <MenuLink route={route} />
                ))}
            </div>
            {renderRoutes(route.routes)}
        </>
    );
}