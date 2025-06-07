import { Transaction, Category } from '../types';

interface Props {
  transaction: Transaction;
  category: Category | undefined;
  onClick?: () => void;
}

const TransactionListItem = ({ transaction, category, onClick }: Props) => {
  const amount = Number(transaction.amount);
  const date = new Date(transaction.date);

  return (
    <li
      key={transaction.id}
      onClick={onClick}
      className={`h-24 px-8 flex justify-between items-center bg-lighterDark  p-3 rounded-md hover:scale-102 cursor-pointer transition-transform duration-200 transform`}
    >
      <div className="h-full flex flex-col justify-center">
        <p className="text-neutral font-semibold text-xl">{category?.name || 'No Category'}</p>
        <p className="text-lg text-neutral-500 font-semibold">
          {isNaN(date.getTime())
            ? 'Invalid date'
            : date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
        </p>
      </div>
      <div
        className={`text-2xl font-semibold ${
          transaction.type === 'income' ? 'text-secondary' : 'text-rose-700'
        }`}
      >
        {transaction.type === 'income' ? '+ ' : '- '}₹{isNaN(amount) ? '0.00' : amount.toFixed(2)}
      </div>
    </li>
  );
};

export default TransactionListItem;
