import React, { Component } from 'react'
import {getJwt} from '../helpers/jwt'
import Axios from 'axios'
import {withRouter} from 'react-router-dom'

class AuthenticatedComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            user:""
        }
    }
    componentDidMount(){
        const jwt= getJwt()
        if(!jwt){
            this.props.history.push('/login')
        }
        Axios.get('http://localhost:3001/api/posts',{headers:{Authorization:`${jwt}`}}).then(res=>this.setState({
            user:res.data
        })).catch(err=>{
            localStorage.removeItem('cool-jwt')
            this.props.history.push('/login')
        })

    }
    render() {
        if(this.user===""){
            return <div>Loading..</div>
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(AuthenticatedComponent)
