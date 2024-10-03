import React, { useRef, useState } from 'react'
import { Button, Modal } from "antd";
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
} from "mdb-react-ui-kit";
import {Avatar, CardHeader,IconButton} from '@mui/material'
import {red} from '@mui/material/colors'

import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';



const AddComment = (props) => {
    let name= props.ele.userId.name
    console.log(name[0])
    let commentRef = useRef();
    const submitCommentHandler = async(postId) => {
        console.log(postId)
        let obj = {
            text: commentRef.current.value
        }
        let res = await fetch(`https://twitterbackend-3w1y.onrender.com/posts/addComment/${postId}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': props.token
            },
            body: JSON.stringify(obj)
        })
        let data = await res.json();
        console.log(data)
        commentRef.current.value = '';
        props.getAllData()
    }


    const handleDeleteComment=async(postId,commentId)=>{
        console.log(postId)
        console.log(commentId)

        let res= await axios.delete(`https://twitterbackend-3w1y.onrender.com/posts/deletecomment/${postId}/${commentId}`)
        console.log(res.data)
        props.getAllData()
    }

    return (
        <>

            <Modal title="Comments..." open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>

                <MDBContainer className="" style={{ maxWidth: "1000px" }}>
                    <MDBRow className="justify-content-center">
                        <MDBCol>
                            <MDBCard className="shadow-0 border" style={{ backgroundColor: "#f0f2f5" }}>
                                <MDBCardBody>
                                    <div className='d-flex gap-1 mb-4 '>
                                        <MDBInput ref={commentRef}   placeholder="add comment..." />
                                        <button className='btn btn-success ' onClick={() => submitCommentHandler(props.ele._id)}>send</button>
                                    </div>

                                    {
                                        props.ele.comments.map((item) => {
                                            return <MDBCard className="mb-4" >
                                                <MDBCardBody>
                                                    <p>{item.text}</p>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='d-flex flex-row align-items-center'>
                                                            <CardHeader
                                                            avatar={
                                                                <Avatar sx={{ bgcolor: red[500]}} arial-label="recipe">
                                                                    {item.user.name[0]}
                                                                </Avatar>
                                                            } 
                                                            />
                                                            <p className="small mb-0 ms-2"> {item.user.name}</p>
                                                        </div>
                                                        <div className='d-flex flex-row align-items-center'>
                                                            {/* <p className="small text-muted mb-0">Upvote?</p> */}
                                                            {/* <MDBIcon
                                                                far
                                                                icon="thumbs-up mx-2 fa-xs text-black"
                                                                style={{ marginTop: "-0.16rem" }}
                                                            /> */}
                                                            <RiDeleteBin6Line onClick={()=>handleDeleteComment(props.ele._id,item._id)} size={20} style={{cursor:'pointer'}} />
                                                            {/* <p className="small text-muted mb-0">3</p> */}
                                                        </div>
                                                    </div>
                                                </MDBCardBody>
                                            </MDBCard>
                                        })
                                    }
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer >
            </Modal >
        </>
    )
}

export default AddComment;
