import React from "react";
import { Modal } from "react-bootstrap";
import QRCode from "qrcode.react";

const QrModal = (props) => {
  const { modalShow, hideModal, modalAddr } = props;
  return (
    <Modal
      show={modalShow}
      onHide={hideModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalAddr.startsWith("n")
            ? "Faucet return address"
            : "Donation address"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <QRCode value={modalAddr} />
          <p className="donate_addr">{modalAddr}</p>
          <i className="fa fa-thumbs-o-up" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={() => hideModal()}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default QrModal;
