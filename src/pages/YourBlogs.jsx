import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdDelete } from "react-icons/md";

const YourBlogs = () => {

    let ctx= useContext(UserContext)
    const [blogs, setblogs] = useState([]);

    let getBlogs=async()=>{
        let res=await axios.get('https://twitterbackend-3w1y.onrender.com/posts/getSingleUser',{
            headers:{
                'Authorization':ctx.details.token
            }
        })
        console.log(res.data.data)
        setblogs(res.data.data)
    }


    useEffect(()=>{
        getBlogs()
    },[])

    const handleDelete=async(ans)=>{
        console.log(ans._id)
        let res=await axios.delete(`https://twitterbackend-3w1y.onrender.com/posts/delete/${ans._id}`)
        let data=res.data
        if(data.success){
            toast.success(data.msg)
            getBlogs()
        }
        else{
        toast.error(data.msg)}
    }


  return (
    <div className='row m-0 p-0 justify-content-center gap-2 mt-3'>
        {
            blogs.map((ele)=>{
                return <div className="card" style={{ width: '18rem' }}>
                {
                    ele.file.split('/')[4]==='image' ?  <img src={ele.file} className="card-img-top" alt="..." /> : <video controls src={ele.file}></video>
                 }
                <div className="card-body">
                    <h5 className="card-title">{ele.title}</h5>
                    <p className="card-text">{ele.description}</p>
                    <Link to="#" className="btn btn-primary">View full blog</Link>

                    <MdDelete onClick={()=>handleDelete(ele )}   color='red' className='delIcon' size={25} />
                </div>
            </div>

            })
        }
    </div>
  )
}

export default YourBlogs
