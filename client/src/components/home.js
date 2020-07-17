import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class home extends Component {
    render() {
        return (
            <div>
                
                <nav><h1>
                    <Link to="/login">LOG IN</Link>
                    <br/>
                    <Link to="/register">REGISTER</Link>
                </h1></nav>
            </div>
        )
    }
}

export default home
