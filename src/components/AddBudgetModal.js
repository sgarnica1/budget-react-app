import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetsContext";

function AddBudgetModal({ showModal, setShowModal }) {
  const nameRef = React.useRef();
  const maxRef = React.useRef();
  const { addBudget } = useBudgets();

  function handleSubmit(event) {
    event.preventDefault();

    const budget = {
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    }

    addBudget(budget.name, budget.max);
    handleClose();
  }

  function handleClose() {
    setShowModal(false);
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export { AddBudgetModal };
