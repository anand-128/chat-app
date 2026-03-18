import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {

    const [signup, setSignup] = useState({
        uname : "",
        uemail : "",
        umobile : "",
        pass : "",
        cpass : ""
    })

    let handleChange = (event) =>{
        setSignup({...signup, [event.target.name] : event.target.value})
    }

    let handleSignup = async () =>{
        toast.info("Ready to Implement")
    }

    return (
        <div>
            <label htmlFor="uname">Your Name</label>
            <input onChange={handleChange} name="uname" type="text" id="uname" placeholder='Enter Your name' />
            <br />
            <label htmlFor="uemail">Your Email</label>
            <input onChange={handleChange} name="uemail" type="email" id="uemail" placeholder='Enter Your email' />
            <br />
            <label htmlFor="umobile">Your Phone no.</label>
            <input onChange={handleChange} name="umobile" type="number" id="umobile" placeholder='Enter Your phone no.' />
            <br />
            <label htmlFor="pass">Your Password</label>
            <input onChange={handleChange} name="pass" type="password" id="pass" placeholder='Enter Your Password..' />
            <br />
            <label htmlFor="cpass">Your Confirm Password</label>
            <input onChange={handleChange} name="cpass" type="password" id="cpass" placeholder='Enter Your Confirm Password..' />
            <br />

            <button onClick={handleSignup}>Register Now</button>
            <hr />
            Already have an account ? <Link to="/login">Login Now</Link>
        </div>
    )
}

export default Signup