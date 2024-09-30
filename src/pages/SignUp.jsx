import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';


const SignUp = () => {

    let navigate=useNavigate();

    const [obj, setobj] = useState({
        name:"",
        email:"",
        password:""
    });

    const handleChange=(e)=>{
        let value=e.target.value;
        setobj({...obj,[e.target.name]:e.target.value})
        
    }

    const handleSubmit= async(e)=>{
        e.preventDefault()
        if(!obj.name || !obj.email || !obj.password){
            return alert('please fill all the feilds')
        }
        console.log(obj)

        let res = await axios.post('https://twitterbackend-3w1y.onrender.com/users/create', obj)
        console.log(res.data)
        if(res.data.success){
            toast.success(res.data.msg,{position:"top-center"})
            navigate('/login')
        }
        else{
            toast.error(res.data.msg,{position:'top-center'})
        }
    }


    return (
        <div>

            <form  className='w-50 m-auto bg-warning p-3 mt-5'>
                <h2 className='text-center my-3'>Blog sign up page</h2>
                <div className="mb-3 ' ">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" onChange={handleChange} name="name" className="form-control" id="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 ' ">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={handleChange} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={handleChange} name="password" className="form-control" id="exampleInputPassword1" />
                </div>
                
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                <p className='text-center'>Already have an account ?  <Link to={'/login'}>Login</Link></p>
            </form>


        </div>
    )
}

export default SignUp
