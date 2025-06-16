import BreakdownChart from './BreakdownChart';
import { getChartDataByType } from '../utils/getChartDataByType';
import { expenseCategories, incomeCategories } from '../data/defaultCategories';
import { useTransactionStore } from '../store/useTransactionStore';

const DashboardBreakdownCharts = () => {
  const { transactions, selectedMonth } = useTransactionStore();
  const incomeChartData = getChartDataByType(
    transactions,
    incomeCategories,
    'income',
    selectedMonth,
  );

  const expenseChartData = getChartDataByType(
    transactions,
    expenseCategories,
    'expense',
    selectedMonth,
  );

  return (
    <div className="w-full h-auto md:flex gap-4 space-y-2">
      <div className="md:w-1/2 w-full h-160 p-3 bg-lighterDark rounded-md mt-2 md:mt-0">
        <h1 className="text-xl text-neutral-500 font-semibold ml-2">Income Breakdown</h1>
        {incomeChartData.data.length === 0 ? (
          <p className="h-full flex justify-center items-center text-xl font-semibold text-center text-neutral-500">
            No data available. Add transactions.
          </p>
        ) : (
          <BreakdownChart {...incomeChartData} />
        )}
      </div>
      <div className="md:w-1/2 w-full h-160 p-3 bg-lighterDark rounded-md">
        <h1 className="text-xl text-neutral-500 font-semibold ml-2">Expense Breakdown</h1>
        {expenseChartData.data.length === 0 ? (
          <p className="h-full flex justify-center items-center text-xl font-semibold text-center text-neutral-500">
            No data available. Add transactions.
          </p>
        ) : (
          <BreakdownChart {...expenseChartData} />
        )}
      </div>
    </div>
  );
};

export default DashboardBreakdownCharts;
