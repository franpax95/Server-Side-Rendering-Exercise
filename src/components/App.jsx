import React from 'react';
import { connect } from 'react-redux';
import { ageIncrement, ageDecrement, setAge } from '../reducers/person';

const App = ({ name, age, ageIncrement, ageDecrement, setAge }) => {
    const env = __isClientSide__ ? 'client' : 'server';

    return(
        <>
            <p>Hello {name}, from {env}!</p>
            <p>Your age is: {age}</p>
            <p>
                <button onClick={ageDecrement}>Younger</button>
                <button onClick={ageIncrement}>Older</button>
                <button onClick={() => setAge(50)}>age = 50</button>
            </p>
            <img 
                src="/static/doggyfamily.jpg" 
                alt="doggyfamily" 
                style={{ maxWidth: "20vw" }}
            />
        </>
    );
}

const mapStateToProps = state => ({
    name: state.person.name,
    age: state.person.age
});

const mapDispatchToProps = {
    ageIncrement,
    ageDecrement,
    setAge
}

export default connect(mapStateToProps, mapDispatchToProps)(App);