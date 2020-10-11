import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Error404 from './Error404';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import { PUBLIC_URL, HOST_URL, SUPPORTED_FILES } from '../env';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export function Success({ files }) {
    const { identifier } = useParams();
    const extensionIdentifier = identifier.charAt(0);
    const extension = SUPPORTED_FILES[extensionIdentifier];
    const file = files.find(item => item.identifier === identifier);

    const [state, setState] = useState({
        showMsg: false,
        msg: null
    });

    const copiedToClipboard = () => {
        setState({
            ...state,
            showMsg: true,
            msg: "Link copied to the clipboard!"
        })
    }

    return !files.length ? (<Error404 />) : (
        <Container>
            <Row className="d-flex justify-content-center m-0 mt-5" style={{ width: "100%", height: "auto" }}>
                <Col className="text-center col-auto p-4">
                    <h1>Your file is ready!</h1>
                    {state.showMsg && <Alert onClick={() => setState({ ...state, showMsg: false })} className="alert alert-success">{state.msg}</Alert>}
                    <Form className="text-left mt-2">
                        {(extension !== ".pdf" && extension !== ".heic" && extension !== ".heif") && (<Form.Group>
                            <Form.Label className="mr-2">Viewer link</Form.Label>
                            <CopyToClipboard text={PUBLIC_URL + "/" + identifier}>
                                <HiOutlineClipboardCopy onClick={() => copiedToClipboard()} size={20} style={{ color: "#fb5d14", cursor: "pointer", marginTop: "-.4rem" }} />
                            </CopyToClipboard>
                            <Form.Control type="text" style={{ backgroundColor: "#fb5d14", color: "white" }} readOnly disabled value={PUBLIC_URL + "/" + identifier} />
                        </Form.Group>)}
                        <Form.Group>
                            <Form.Label className="mr-2">Direct link</Form.Label>
                            <CopyToClipboard text={HOST_URL + identifier + file.extension}>
                                <HiOutlineClipboardCopy onClick={() => copiedToClipboard()} size={20} style={{ color: "#fb5d14", cursor: "pointer", marginTop: "-.4rem" }} />
                            </CopyToClipboard>
                            <Form.Control type="text" style={{ backgroundColor: "#fb5d14", color: "white" }} readOnly disabled value={HOST_URL + identifier + file.extension} />
                        </Form.Group>
                    </Form>

                </Col>
            </Row>
        </Container>
    )
}

function mapStateToProps(state) {
    return {
        files: state.files
    };
};

function mapDispatchToProps() {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Success);