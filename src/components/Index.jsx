import React, { useState } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { addFile } from '../redux/action';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { FILE_SIZE_LIMIT, UPLOAD_SIZE_LIMIT, SUPPORTED_FILES } from '../env';
import { Redirect } from 'react-router';
import ReactLoading from 'react-loading';
import { MdFileUpload } from 'react-icons/md';

export function Index({ addFile, files }) {
    const [state, setState] = useState({
        redirect: false,
        loading: false,
        image: {},
        showMsg: false,
        msg: {
            type: null,
            content: null
        },
        uploaded: null
    });

    const imageOnChange = event => {
        // Creates a random 7 digits identifier
        const createIdentifier = () => {
            const chars = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
            let id = "";
            for (let i = 0; i < 7; i++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return String(id);
        }

        const file = event.target.files[0];
        const name = file.name;
        const extension = "." + name.split('.').pop();
        const identifier = SUPPORTED_FILES.indexOf(extension) + createIdentifier();

        setState({
            ...state,
            image: {
                file,
                name,
                extension,
                identifier
            },
            showMsg: false,
            uploaded: null
        });
    };

    const onImageUpload = () => {
        // Choosing a file is required
        if (!state.image.file) {
            setState({
                ...state,
                showMsg: true,
                msg: {
                    type: "error",
                    content: "Error! Choose a file to continue."
                },
                uploaded: false
            });
            return;
        }
        // Bigger than size limit is not allowed
        else if (state.image.file.size > UPLOAD_SIZE_LIMIT) {
            setState({
                ...state,
                showMsg: true,
                msg: {
                    type: "error",
                    content: "Error! Files have a " + FILE_SIZE_LIMIT + "MB size limit."
                },
                uploaded: false
            });
            return;
        }
        //Unsupported files are not allowed
        else if (SUPPORTED_FILES.indexOf(state.image.extension) < 0) {
            setState({
                ...state,
                showMsg: true,
                msg: {
                    type: "error",
                    content: "Error! " + state.image.extension + " is not a supported extension file."
                },
                uploaded: false
            });
            return;
        }
        else {
            setState({
                ...state,
                loading: true
            });
            return Axios({
                method: 'put',
                url: 'https://ny.storage.bunnycdn.com/imagictk2/' + state.image.identifier + state.image.extension,
                data: state.image.file,
                headers: {
                    'AccessKey': '5b2823bf-5e61-4870-af017cdf6cc8-3a9d-4ca2'
                }
            })
                .then(() => {
                    setState({
                        ...state,
                        loading: false,
                        showMsg: true,
                        msg: {
                            type: "success",
                            content: "Yeah! File uploaded succesfully. Redirecting..."
                        },
                        uploaded: true
                    });
                    let uploadedFiles = {
                        filename: state.image.filename,
                        name: state.image.name,
                        extension: state.image.extension,
                        identifier: state.image.identifier
                    };
                    const data = uploadedFiles;
                    addFile(data);
                    setTimeout(() => setState({ redirect: true }), 3000)
                })
                .catch(() => {
                    setState({
                        ...state,
                        loading: false,
                        showMsg: true,
                        msg: {
                            type: "error",
                            content: "Ups, something gone wrong! Please try again."
                        },
                        uploaded: false
                    });
                })
        }
    }

    return state.redirect ? (<Redirect to={"/success/" + files.files[files.filesUploaded - 1].identifier} />)
        : (
            <Container>
                <Row className="d-flex justify-content-center m-0 mt-5" style={{ width: "100%" }}>
                    <Col className="text-center col-auto p-4">
                        <MdFileUpload style={{ color: "#fb5d14" }} size={80} />
                        <h1 style={{ fontSize: "2rem" }}>Upload image</h1>
                        {state.loading && <Alert className="d-flex justify-content-center"><ReactLoading type="spinningBubbles" color="#fb5d14" height={40} width={40} /></Alert>}
                        {state.uploaded && <Alert className="d-flex justify-content-center p-0"><img src="/images/check-circle.svg" style={{ width: "2.5rem" }} /></Alert>}
                        {state.uploaded === false && <Alert className="d-flex justify-content-center p-0"><img src="/images/times-circle.svg" style={{ width: "2.5rem" }} /></Alert>}
                        {state.showMsg && <Alert className={state.msg.type === "error" ? "alert alert-danger" : "alert alert-success"}>{state.msg.content}</Alert>}
                        <Form className="text-left mt-2">
                            <Form.Group>
                                <Form.File id="exampleFormControlFile1" onChange={imageOnChange} label="Choose an image" accept=".png, .jpeg, .svg, .svg+xml, .jpg, .pdf, .gif, .webp, .heif, .heic"></Form.File>
                            </Form.Group>
                        </Form>
                        <Button style={{ backgroundColor: "#fb5d14" }} onClick={() => onImageUpload()}>Upload!</Button>
                    </Col>
                </Row>
            </Container >
        )
}

function mapStateToProps(state) {
    return {
        files: state
    };
};

function mapDispatchToProps(dispatch) {
    return {
        addFile: (data) => dispatch(addFile(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);