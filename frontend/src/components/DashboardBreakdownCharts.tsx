import BreakdownChart from "./BreakdownChart";
import { getChartDataByType } from "../utils/getChartDataByType";
import { expenseCategories, incomeCategories } from "../data/defautCategories";
import { useTransactionStore } from "../store/transactionStore";

const DashboardBreakdownCharts = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  const incomeChartData = getChartDataByType(
    transactions,
    incomeCategories,
    "income"
  );
  const expenseChartData = getChartDataByType(
    transactions,
    expenseCategories,
    "expense"
  );

  return (
    <div className="w-full h-auto md:flex gap-2 space-y-2">
      <div className="md:w-1/2 w-full h-140 p-3 bg-lighterDark rounded-md mt-2 md:mt-0">
        <h1 className="text-xl text-neutral-500 font-semibold ml-2">
          Income Breakdown
        </h1>
        <BreakdownChart {...incomeChartData} />
      </div>
      <div className="md:w-1/2 w-full h-140 p-3 bg-lighterDark rounded-md">
        <h1 className="text-xl text-neutral-500 font-semibold ml-2">
          Expense Breakdown
        </h1>
        <BreakdownChart {...expenseChartData} />
      </div>
    </div>
  );
};

export default DashboardBreakdownCharts;
