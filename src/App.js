import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { AddBudgetModal } from "./components/AddBudgetModal";
import { AddExpenseModal } from "./components/AddExpenseModal";
import { ViewExpensesModal } from "./components/ViewExpensesModal";
import { BudgetCard } from "./components/BudgetCard";
import { UncategorizedBudgetCard } from "./components/UncategorizedBudgetCard";
import { TotalBudgetCard } from "./components/TotalBudgetCard";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./contexts/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = React.useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = React.useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] =
    React.useState();
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] =
    React.useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <React.Fragment>
      <Container className="my-4">
        <section direction="horizontal" gap="2" className="mb-4 d-flex gap-2">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </section>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              ></BudgetCard>
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </section>
      </Container>
      <AddBudgetModal
        showModal={showAddBudgetModal}
        setShowModal={setShowAddBudgetModal}
      />
      <AddExpenseModal
        defaultBudgetId={addExpenseModalBudgetId}
        showModal={showAddExpenseModal}
        setShowModal={setShowAddExpenseModal}
      />

      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </React.Fragment>
  );
}

export { App };
