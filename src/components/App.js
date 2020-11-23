import React from 'react';
import '../css/App.css';
import MessageContainer from "./MessageContainer";

function App() {
    return (
        <div className={'App'}>
            <h1>Message Feed</h1>
            <MessageContainer/>
        </div>
    );
}

export default App;