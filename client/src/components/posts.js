import React, { Component } from 'react'

export class posts extends Component {
    render() {
        const logout=()=>{
            localStorage.removeItem('cool-jwt')
            this.props.history.push('/login')
        }
        return (
            <div>
                <button onClick={logout}>logout</button>
            </div>
        )
    }
}

export default posts
