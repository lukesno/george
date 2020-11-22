import React, { useState } from 'react';
import Main from './Main.js';
import Modal from 'react-bootstrap/Modal';

const Failure = () => {

    const [show, setModalVisible] = useState(true);

    const handleClose = () => {
        window.location.href = "http://localhost:3000/main";
        setModalVisible(false);
    }

    return (
        <div className="successDiv">
            <Main/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Fialed</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Please try again later</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Failure;