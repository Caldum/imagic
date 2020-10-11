import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SUPPORTED_FILES, HOST_URL } from '../env';
import Error404 from './Error404';
import { Container, Row, Col } from 'react-bootstrap';
import Axios from 'axios';

export default function ImageDetails() {
    const { identifier } = useParams();
    const extensionIdentifier = identifier.charAt(0);
    const extension = SUPPORTED_FILES[extensionIdentifier];

    const [state, setState] = useState({
        redirect: false,
        imgUrl: null
    });

    Axios({
        method: 'get',
        // Avoid CORS
        url: 'https://cors-anywhere.herokuapp.com/' + HOST_URL + identifier + extension
    })
        .then(res => {
            const IMG_URL = res.config.url;
            setState({
                ...state,
                imgUrl: IMG_URL
            });
        })
        .catch(() => {
            setState({
                ...state,
                redirect: true
            });
        })

    return state.redirect || extension === ".pdf" || extension === ".heic" || extension === ".heif" ? <Error404 /> : (
        <Container className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgb(25,25,25)", padding: "5rem" }}>
            <Row>
                <Col>
                    <img src={state.imgUrl} style={{ maxWidth: "50rem", height: "auto" }} />
                </Col>
            </Row>
        </Container>
    )
}