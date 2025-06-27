import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import HomePage from '../pages/Dashboard';
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';
import Layout from '../components/Layout';
import TransactionsPage from '../pages/TransactionsPage';
import NotFoundPage from '../pages/NotFoundPage';
import BudgetPage from '../pages/BudgetsPage';

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/transactions" element={<TransactionsPage />} /> 
          <Route path="/budgets" element={<BudgetPage />} />
        </Route>

        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
