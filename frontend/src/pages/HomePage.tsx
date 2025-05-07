import { useAuthStore } from "../store/useAuth";
import Navbar from "../components/Navbar";
import PieChart from "../components/PieChart";
import AddTransactionButton from "../components/AddTransactionButton";
import { useState } from "react";

const HomePage = () => {
  const { user } = useAuthStore();
  if (!user) {
    return <h1>No user detected</h1>;
  }

  const [timePeriod, setTimePeriod] = useState("");

  return (
    <>
      <Navbar />
      <main className="pt-7 px-12">
        <h1 className="text-neutral text-5xl font-bold mt-10">
          Hello, {`${user.name}`}
        </h1>
        <div className="md:flex md:items-baseline md:gap-2 mt-2">
          <p className="text-neutral text-md italic">
            Here's your financial summary for{" "}
          </p>
          <select
            value={timePeriod}
            className="w-auto p-1 pl-2 rounded-md bg-lightDark border text-md italic mt-2"
            onChange={(e) => {
              setTimePeriod(e.target.value)
            }}
          >
            <option value={""} disabled hidden>
              Select Time Period
            </option>
            <option value={"weekly"}>this week</option>
            <option value={"monthly"}>this month</option>
            <option value={"yearly"}>this year</option>
          </select>
        </div>

        <div className="h-auto w-full rounded-lg bg-lightDark mt-12 p-5">
          <div className="w-full h-auto bg-lighterDark rounded-md">
            <p className="p-3 text-2xl font-bold text-neutral text-center">
              Total Balance : 2000
            </p>
          </div>
          <div className="md:flex md:gap-4">
            <div className="bg-lighterDark rounded-md h-auto w-full mt-4">
              <p className="p-3 text-2xl font-bold text-neutral text-center">
                Total Income : 2000
              </p>
            </div>
            <div className="bg-lighterDark rounded-md h-auto w-full mt-4">
              <p className="p-3 text-2xl font-bold text-neutral text-center">
                Total Expense : 2000
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <PieChart
              title="Income Breakdown"
              data={[
                { label: "Salary", value: 1200, color: "#00f1a1" },
                { label: "Freelance", value: 500, color: "#00c3ff" },
                { label: "Other", value: 300, color: "#00e500" },
              ]}
            />
            <PieChart
              title="Expense Breakdown"
              data={[
                { label: "Food", value: 600, color: "#ff5961" },
                { label: "Rent", value: 800, color: "#ffbd00" },
                { label: "Other", value: 200, color: "#ff00ee" },
              ]}
            />
          </div>
        </div>
        <AddTransactionButton />
      </main>
    </>
  );
};

export default HomePage;
