import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

    const [login, setLogin] = useState({
        username : "",
        password : ""
    })


    let handleLogin = async () =>{
        toast.loading("Login Feature")
    }

    // console.log(login)

    return (
        <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={(event)=>{
                setLogin({...login, username : event.target.value})
            }} placeholder='Enter Your username or email...' />
            <br />
            <label htmlFor="password">password</label>
            <input type="password" id="password"  onChange={(event)=>{
                setLogin({...login, password : event.target.value})
            }}  placeholder='Enter Your password...' />
            <br />
            <button onClick={handleLogin}>Login</button>
            <hr />
            Not have an account? <Link to="/signup">Register Now</Link>
        </div>
    )
}

export default Login