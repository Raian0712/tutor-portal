import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton="true">
            <Modal.Title id="contained-modal-title-vcenter">
             {props.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.message}
        </Modal.Body>
        <Modal.Footer>
                <Button onClick={props.onHide}>{props.buttonText}</Button>
        </Modal.Footer>
        </Modal>
    );
  }

export default CustomModal;