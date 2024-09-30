import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

const ForgetPassword = () => {

    let emailRef=useRef();
    const [msg, setmsg] = useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        let obj={
            email:emailRef.current.value
        }
        let res=await axios.post('https://twitterbackend-3w1y.onrender.com/users/forget-password',obj)
        let data=res.data
        console.log(data)
        setmsg(data.msg)

    }

  return (
    <div>
        {msg? <h1>{msg}</h1>: <form action=''>
            <label htmlFor="">Enter your email</label>
            <input ref={emailRef} type="email" name="" id="" />
            <button onClick={handleSubmit}>submit</button>
            </form>}

            {msg && <Link to='/login' className='btn btn-success'>Login</Link>}
    </div>
  )
}

export default ForgetPassword
