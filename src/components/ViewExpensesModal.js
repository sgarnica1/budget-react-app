import React from "react";
import { Modal, Button, Stack } from "react-bootstrap";
import {
  useBudgets,
  UNCATEGORIZED_BUDGET_ID,
} from "../contexts/BudgetsContext";

import { currencyFormatter } from "../utils";

function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.id === budgetId);

  const expenses = getBudgetExpenses(budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <section className={"d-flex gap-2"}>
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budgetId);
                  handleClose();
                }}
              >
                Delete
              </Button>
            )}
          </section>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="d-flex flex-column gap-3">
          {expenses.map((expense) => (
            <Stack
              direction="horizontal"
              gap="2"
              key={expense.id + expense.description}
            >
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                size="small"
                variant="outline-danger"
                onClick={() => {
                  deleteExpense(expense.id);
                  handleClose();
                }}
              >
                &times;
              </Button>
            </Stack>
          ))}
        </section>
      </Modal.Body>
    </Modal>
  );
}

export { ViewExpensesModal };
