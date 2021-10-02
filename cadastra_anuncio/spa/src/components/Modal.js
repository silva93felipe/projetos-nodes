import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalAsk = (props) => {
  const {
    buttonLabel,
    className,
    title,
    info,
    onClick
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {info}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onClick}>Sim</Button>{' '}
          <Button color="secondary" onClick={toggle}>Não</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalAsk;