import { useAuthStore } from "../store/useAuth";
import { useTransactionStore } from "../store/transactionStore";

const HomePage = () => {
  const { user } = useAuthStore();
  const { transactions } = useTransactionStore();
  if (!user) {
    return <h1>No user detected</h1>;
  }

  return (
    <>
      <h1 className="text-neutral text-5xl font-bold">
        Hello, {`${user.name}`}
      </h1>
    </>
  );
};

export default HomePage;
