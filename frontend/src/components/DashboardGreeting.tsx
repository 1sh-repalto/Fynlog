import Twemoji from 'react-twemoji';
import { useAuthStore } from '../store/useAuth';

const DashboardGreeting = () => {
  const { user } = useAuthStore();
  const name = user ? user.name : 'User';
  return (
    <div className='flex items-center gap-4 mt-10'>
      <Twemoji options={{ className: '' }}>
        <span className="w-12 h-12 inline-block">👋</span>
      </Twemoji>
      <h1 className="text-neutral text-5xl font-bold">Welcome, {`${name}`}</h1>
    </div>
  );
};

export default DashboardGreeting;
