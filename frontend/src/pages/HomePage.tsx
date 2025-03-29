import { useAuth } from '../context/AuthContext';
import { useTransaction } from '../context/TransactionContext';

const HomePage = () => {
  const { user } = useAuth();
  const { transactions } = useTransaction();
  if(!user){
    return <h1>No user detected</h1>
  }

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-dark bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_6rem]">
      <h1 className="text-neutral text-5xl font-montserrat font-bold">Hello, {`${user.name}`}</h1>
    </div>
  )
}

export default HomePage;