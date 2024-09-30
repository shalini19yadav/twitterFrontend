import React from 'react';
import { Button, Modal } from 'antd';

const ShowSingleBlog = (props) => {
    console.log(props.ele)
    let ele = props.ele

    return (
        <>
            {/* <Button type="primary" onClick={showLoading}>
        Open Modal
      </Button> */}
            <Modal
                title={<p>Loading Modal</p>}
                footer={
                    <Button type="primary" onClick={props.showLoading}>
                        Reload
                    </Button>
                }
                loading={props.loading}
                open={props.open}
                onCancel={() => props.setOpen(false)}
            >
                <div className="card mb-3" style={{ maxWidth: 540 }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            {
                                ele.file.split('/')[4] === 'image' ? 
                                    <img src={ele.file} className="img-fluid rounded-start" alt="..." />
                             :
                                    <video height={200} controls src={ele.file}></video>
                            }
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{ele.title}</h5>
                                <p className="card-text">{ele.description}</p>
                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
        </>
    );
};
export default ShowSingleBlog;