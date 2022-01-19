import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";

function AddExpenseModal({ showModal, setShowModal, defaultBudgetId }) {
  const descriptionRef = React.useRef();
  const amountRef = React.useRef();
  const budgetIdRef = React.useRef();
  const { addExpense, budgets } = useBudgets();

  function handleSubmit(event) {
    event.preventDefault();

    const expense = {
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    };

    addExpense(expense.description, expense.amount, expense.budgetId);
    handleClose();
  }

  function handleClose() {
    setShowModal(false);
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option key={UNCATEGORIZED_BUDGET_ID} value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
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

export { AddExpenseModal };
