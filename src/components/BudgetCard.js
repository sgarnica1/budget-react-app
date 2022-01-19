import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormatter } from "../utils";

function BudgetCard({
  name,
  amount,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
}) {
  const classNames = [];

  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <h5 className="me-2 fw-normal">{name}</h5>
          <p className="d-flex align-items-baseline  mb-0">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </p>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpensesClick}>
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}

export { BudgetCard };
