import React, {Component} from 'react';
import '../css/CommentForm.css'

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            comment: ''
        }
    }

    handleNameChange = (e) => {
        this.setState({name: e.target.value})
    }

    handleMessageChange = (e) => {
        this.setState({comment: e.target.value})
    }

    handleSubmit = (e) => {
        const {name, comment} = this.state
        e.preventDefault();
        fetch("/createComment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, comment }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        this.setState({
            name: '',
            comment: ''
        })
    }

    render() {
        const {name, comment} = this.state
        return (
                <div className={'container'}>
                <form onSubmit={this.handleSubmit}>
                    <div>
                    <label className={'label'}>
                        Name
                        <input type={'text'} value={name} onChange={this.handleNameChange} required={'required'} />
                    </label>
                    </div>
                    <div>
                    <label className={'label'}>
                        Comment
                        <textarea value={comment} onChange={this.handleMessageChange} required={'required'}></textarea>
                    </label>
                    </div>
                    <button type={'submit'}>Submit</button>
                </form>
                </div>
        );
    }
}

export default CommentForm;