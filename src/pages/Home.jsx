import React, { useContext, useRef, useState } from 'react'
import AllUserPost from "../components/AllUserPost";
import UserContext from '../context/UserContext';
import axios from 'axios';

const Home = () => {

  let ctx=useContext(UserContext);

  const [clicked, setclicked] = useState(false);

  const [files, setfiles] = useState("");
  let titleRef = useRef();
  let descriptionRef = useRef()

  const handleInputChanger=(e)=>{
    let value=e.target.files[0]
    console.log(value)
    setfiles(value)
  }

  const handleSubmit=async(e)=>{

    // method 2 using cloudinary to upload any file

    e.preventDefault();

    let formData=new FormData();
    formData.append('file',files);
    formData.append('upload_preset','social')   // social is my cloudinary upload_preset name

    let data=await axios.post('https://api.cloudinary.com/v1_1/dq73mor6p/upload',formData)   //"dq73mor6p"is my cloudinary name
    console.log(data.data.secure_url)

    let obj={
            title:titleRef.current.value,
            description:descriptionRef.current.value,
            file:data.data.secure_url
          }

          let res= await axios.post('https://twitterbackend-3w1y.onrender.com/posts/create',obj,{
                  headers:{
                    'Authorization':ctx.details.token
                  }
                });
                console.log(res.data)
                setclicked(false)
  }

  // const handleSubmit=(e)=>{

// method 1

  //   e.preventDefault()

  //   let reader=new FileReader();
  //   reader.readAsDataURL(files);

  //   reader.onload=async()=>{
  //     console.log(reader.result)

  //     let obj={
  //       title:titleRef.current.value,
  //       description:descriptionRef.current.value,
  //       file:reader.result
  //     }
  //     console.log(obj)
  //     let res= await axios.post('https://twitterbackend-3w1y.onrender.com/posts/create',obj,{
  //       headers:{
  //         'Authorization':ctx.details.token
  //       }
  //     });
  //     let data=res.data
  //     console.log(data)
  //     setclicked(false)
  //   }

  //   reader.onerror=()=>{
  //     console.log(reader.error)
  //   }
  // }



  return (
    <div className='row m-0 p-0 mt-2'>
      <div className='col-1'>
        <button onClick={()=>setclicked(true)} className='btn btn-info'> create</button>
      </div>
      <div className='col-11'>
        <AllUserPost clicked={clicked} />
      </div>

      {
        clicked && <div className='form'>
        <button onClick={()=>setclicked(false)} type="button" class="btn-close bg-white btnCloseForm" aria-label="Close"></button>

        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className=" form-label">Title</label>
            <input ref={titleRef} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
            <div className="form-floating">
              <textarea ref={descriptionRef} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"  />
              <label htmlFor="floatingTextarea">Description</label>
            </div>
          </div>


          <div className="mb-3">
          <label className="form-label" htmlFor="formFileSm">Upload Image/video</label>
            <input onChange={handleInputChanger} type="file" className="form-control form-control-sm" id="formFileSm" />
          </div>

          <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div> 
      }

    </div>
  )
}

export default Home
