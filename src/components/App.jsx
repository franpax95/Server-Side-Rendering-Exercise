import React, { useEffect } from 'react';

import { renderRoutes } from 'react-router-config';
import routes from '../routes';
import MenuLink from './MenuLink';

import { connect } from 'react-redux';
import { ageIncrement, ageDecrement, setAge, fetchFriends } from '../reducers/person';

const App = ({ 
    name, 
    age, 
    ageIncrement, 
    ageDecrement, 
    setAge,
    fetchFriends,
    friends,
    isLoading
}) => {
    useEffect(() => { 
        setAge(35) 
    }, []);

    useEffect(() => {
        if(!friends.length) fetchFriends();
    }, [friends]);


    const env = __isClientSide__ ? 'client' : 'server';

    return(
        <>
            <img 
                src="/static/doggyfamily.jpg" 
                alt="doggyfamily" 
                style={{ maxWidth: "20vw" }}
            />
            <p>Hello {name}, from {env}!</p>
            <p>Your age is: {age}</p>
            <p>
                <button onClick={ageDecrement}>Younger</button>
                <button onClick={ageIncrement}>Older</button>
                <button onClick={() => setAge(50)}>age = 50</button>
            </p>
            <p>Is fetching: {(isLoading) ? 'Yes, please wait...' : 'No'}</p>
            <p>Friends: {friends.join(', ')}</p>

            <div>
                {routes.map(route => (
                    <MenuLink route={route} />
                ))}
            </div>

            {renderRoutes(routes)}
        </>
    );
}

const mapStateToProps = state => ({
    name: state.person.name,
    age: state.person.age,
    friends: state.person.friends.data,
    isLoading: state.person.friends.isLoading
});

const mapDispatchToProps = {
    ageIncrement,
    ageDecrement,
    setAge,
    fetchFriends
}

export default connect(mapStateToProps, mapDispatchToProps)(App);