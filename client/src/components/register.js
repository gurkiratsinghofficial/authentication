import React, { Component } from 'react'
import axios from 'axios'

class register extends Component {
        constructor() {
            super();
            this.state = {
            name: '',
            email: '',
            password: '',
            };
        }

        changeHandler = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        }
        registerHandler = (e) => {
            e.preventDefault();
            console.log(this.state);

            const { name,email,password} = this.state;
            //console.log(name)
            axios.post('http://localhost:3001/api/user/register', { name,email,password})
            .then((result) => {
                console.log(result);
                this.props.history.push('/login')
            })
            .catch(err=>{
                console.log('Error while registering');
            })
        }  
    render() {
       // const { name,email,password} = this.state;
        return (
            <div>
                <form onSubmit={this.registerHandler} autoComplete="off">
                    <h1>
                        NAME : 
                        <input type="text" name="name" onChange={this.changeHandler} placeolder="enter NAME"/><br/>
                        EMAIL : 
                        <input type="text" name="email" onChange={this.changeHandler} placeolder="enter EMAIL"/><br/>
                        PASSWORD : 
                        <input type="password" name="password" onChange={this.changeHandler} placeolder="enter PASSWORD"/><br/>
                        <button type="submit">REGISTER</button>
                    </h1>
                </form>
            </div>
        )
    }
}

export default register
