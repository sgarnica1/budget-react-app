import { BudgetCard } from "./BudgetCard";
import {
  useBudgets,
  UNCATEGORIZED_BUDGET_ID,
} from "../contexts/BudgetsContext";

function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();

  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null;

  return (
    <BudgetCard
      amount={amount}
      gray
      name="Uncategorized"
      {...props}
    />
  );
}

export { UncategorizedBudgetCard };
