import { useAuthStore } from '../store/useAuth';

const DashboardGreeting = () => {
  const { user } = useAuthStore();
  const name = user ? user.name : "User";
  return (
    <>
      <h1 className="text-neutral text-5xl font-bold mt-10">Welcome, {`${name}`}</h1>
    </>
  );
};

export default DashboardGreeting;
