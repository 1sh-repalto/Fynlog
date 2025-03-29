import { useAuth } from "../context/AuthContext";
import { useTransaction } from "../context/TransactionContext";

const HomePage = () => {
  const { user } = useAuth();
  const { transactions } = useTransaction();
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
