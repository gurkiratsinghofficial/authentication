import React, { Component } from 'react'
import axios from 'axios'

class login extends Component {
        constructor() {
            super();
            this.state = {
            email: '',
            password: '',
            };
        }

        changeHandler = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        }
        loginHandler = (e) => {
            e.preventDefault();
            const {email,password} = this.state;
            //console.log(email)
            axios.post('http://localhost:3001/api/user/login', {email,password})
            .then((result) => {
                localStorage.setItem("cool-jwt",result.data)
                this.props.history.push('/posts')
            })
            .catch(err=>{
                console.log('Error while logging in');
            })
        }  
    render() {
        // eslint-disable-next-line
        const {email,password} = this.state;
        return (
            <div>
                <form onSubmit={this.loginHandler} autoComplete="off">
                    <h1>
                        EMAIL : 
                        <input type="text" name="email" onChange={this.changeHandler} placeolder="enter EMAIL"/><br/>
                        PASSWORD : 
                        <input type="password" name="password" onChange={this.changeHandler} placeolder="enter PASSWORD"/><br/>
                        <button type="submit">LOG IN</button>
                    </h1>
                </form>
            </div>
        )
    }
}

export default login
