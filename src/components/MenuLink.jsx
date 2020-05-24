import React from 'react';
import { Link, matchPath, withRouter } from 'react-router-dom';

const MenuLink = ({ route, location }) => {
    const isActive = matchPath(location.pathname, route) !== null;

    return(
        <div className={"menuLink" + (isActive ? ' active' : '')}>
            <Link to={route.linkPath || route.path}>{route.name}</Link>
        </div>
    );
}

export default withRouter(MenuLink);