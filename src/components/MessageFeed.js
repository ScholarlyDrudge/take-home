import React, {Component} from 'react';
import Message from "./Message";

class MessageFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            e: null,
            isLoaded: false,
            messages: []
        };
    }

    getMessages(){
        fetch("/getComments")
            .then(r => r.json())
            .then(
                (r) => {
                    this.setState({
                        isLoaded: true,
                        messages: r.reverse()
                    });
                },
                (e) => {
                    this.setState({
                        isLoaded: true,
                        e: e
                    });
                }
            )
    }

    componentDidMount() {
        this.getMessages()

        this.interval = setInterval(() => {
            this.getMessages()
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const { e, isLoaded, messages } = this.state;
        if (e) {
            return <div>Error: {e.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {messages.map(message => (
                        <Message message={message} key={message.id}/>
                    ))}
                </div>
            );
        }
    }
}

export default MessageFeed;