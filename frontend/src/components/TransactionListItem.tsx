import { Trash2 } from 'lucide-react';
import { Transaction, Category } from '../types';
import Twemoji from 'react-twemoji';

interface Props {
  transaction: Transaction;
  category: Category | undefined;
  onClick?: () => void;
  onDelete?: () => void; // ✅ add this
}

const TransactionListItem = ({ transaction, category, onClick, onDelete }: Props) => {
  const amount = Number(transaction.amount);
  const date = new Date(transaction.date);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      onDelete?.()
    }
  };

  return (
    <li
      key={transaction.id}
      onClick={onClick}
      className="h-24 px-8 flex justify-between items-center bg-lighterDark  p-3 rounded-md hover:scale-102 cursor-pointer transition-transform duration-200 transform"
    >
      <div className="h-full flex items-center justify-center gap-6">
        <Twemoji options={{ className: '' }}>
          <span className="w-10 h-10 inline-block">{category?.emoji}</span>
        </Twemoji>
        <div className="flex flex-col justify-center">
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
      </div>
      <div className="flex items-center gap-8">
        <div
          className={`text-2xl font-semibold ${
            transaction.type === 'income' ? 'text-secondary' : 'text-rose-700'
          }`}
        >
          {transaction.type === 'income' ? '+ ' : '- '}₹{isNaN(amount) ? '0.00' : amount.toFixed(2)}
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation(); // prevent parent click (e.g., opening modal)
            handleDelete();
          }}
          className="h-14 flex justify-center items-center px-3 mx-3 cursor-pointer border rounded-md border-rose-700 text-rose-700 hover:bg-rose-700 hover:text-neutral transition-colors duration-200"
        >
          <Trash2 size={32} />
        </div>
      </div>
    </li>
  );
};

export default TransactionListItem;
