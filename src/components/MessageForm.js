import React, {Component} from 'react';

class MessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            message: '',
            status: false,
            charLimit: 280
        }
    }

    handleNameChange = (e) => {
        this.setState({name: e.target.value, status: false})
    }

    handleMessageChange = (e) => {
        this.setState({message: e.target.value, status: false})
    }

    handleSubmit = (e) => {
        const {name, message} = this.state
        e.preventDefault();
        fetch("/createComment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, message }),
        })
            .then((r) => r.json())
            .then((d) => {
                this.setState({
                    name: '',
                    message: '',
                    status: 'Comment successfully submitted!'
                })
            })
            .catch((e) => {
                this.setState({
                    status: 'Comment submission failed, please try again.'
                })
            });
    }

    handleDelete = (e) => {
        e.preventDefault();
        fetch('/deleteComments', {
            method: 'DELETE'
        }).then(() => {
            this.setState({
                status: 'Comments deleted!'
            })
        })
            .catch((e) => {
            this.setState({
                status: 'Comments not deleted, try again.'
            })
        });
    }

    render() {
        const {name, message, status} = this.state
        return (
                <div className={'container'}>
                <form onSubmit={this.handleSubmit}>
                    {status ? (<h3>{status}</h3>):(<></>)}
                    <div>

                    <label className={'label'}>
                        Name
                        <input type={'text'} value={name} onChange={this.handleNameChange} required={'required'} maxLength={255}/>
                    </label>
                    </div>
                    <div>
                    <label className={'label'}>
                        Comment
                        <textarea value={message} onChange={this.handleMessageChange} required={'required'} maxLength={280}></textarea>
                        <h5>{`${message.length}/280`}</h5>
                    </label>
                    </div>
                    <button type={'submit'}>Submit</button>
                </form>
                    <button onClick={this.handleDelete}>Delete Comments</button>
                </div>
        );
    }
}

export default MessageForm;