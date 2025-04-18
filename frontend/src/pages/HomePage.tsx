import { useAuthStore } from "../store/useAuth";
import { useTransactionStore } from "../store/transactionStore";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const { user } = useAuthStore();
  const { transactions } = useTransactionStore();
  if (!user) {
    return <h1>No user detected</h1>;
  }

  return (
    <>
    <Navbar />
      <h1 className="text-neutral text-5xl font-bold mt-10">
        Hello, {`${user.name}`}
      </h1>
    </>
  );
};

export default HomePage;
