import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import LandingPage from '../pages/LandingPage';
import Layout from '../components/Layout';
import TransactionsPage from '../pages/TransactionsPage';
import NotFoundPage from '../pages/NotFoundPage';
import BudgetPage from '../pages/BudgetsPage';
import LoginForm from '../pages/LoginForm';
import SignupForm from '../pages/SignupForm';
import Dashboard from '../pages/Dashboard';

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionsPage />} /> 
          <Route path="/budgets" element={<BudgetPage />} />
        </Route>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
