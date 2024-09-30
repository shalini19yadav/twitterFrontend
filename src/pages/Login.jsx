import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import UserContext from '../context/UserContext';

const Login = () => {

  let ctx=useContext(UserContext)
  console.log(ctx)
  let navigate=useNavigate()

  const [user, setuser] = useState({
    email:"",
    password:""
  });

  const handlechange=(e)=>{
    let value=e.target.value
    setuser({...user,[e.target.name]:e.target.value})
  }

  const handlesubmit=async(e)=>{
    e.preventDefault()
    console.log(user)
  
    let res=await axios.post('https://twitterbackend-3w1y.onrender.com/users/login',user)
    if(res.data.success){
      console.log(res.data)
      localStorage.setItem('socialDetails',JSON.stringify({login:true,token:res.data.token}))
      ctx.setdetails({login:true,token:res.data.token})
      toast.success(res.data.msg,{position:'top-center'})
      navigate('/')

    }
    else{
      toast.error(res.data.msg,{position:'top-center'})
    }

  }

  return (
    <div>

            <form  className='w-50 m-auto bg-warning p-3 mt-5'>
                <h2 className='text-center my-3'>Blog login page</h2>
                <div className="mb-3 ' ">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={handlechange} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={handlechange} name='password'  className="form-control" id="exampleInputPassword1" />
                </div>
                
                <button type="submit" onClick={handlesubmit} className="btn btn-primary">Submit</button>
                <p className='text-center'>Don't have an account ?  <Link to={'/signup'}>register</Link></p>
                <p className='text-center my-1'><Link to={'/forgetPassword'}>Forget Password?</Link></p>
            </form>


        </div>
  )
}

export default Login
