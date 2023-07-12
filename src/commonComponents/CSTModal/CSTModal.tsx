import React, { useState } from "react"

import Modal from "react-bootstrap/Modal"

interface CSTModalProps {
  title: any
  children: any
  footer: any
  closeButton?: boolean
  centered?: boolean
  show: boolean
  handleClose: () => void
}

const CSTModal = (props: CSTModalProps) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered={!!props.centered}>
      <Modal.Header
        closeButton={props.closeButton === undefined ? true : props.closeButton}
      >
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>{props.footer}</Modal.Footer>
    </Modal>
  )
}

export default CSTModal
