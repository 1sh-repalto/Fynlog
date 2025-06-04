import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck, TrendingUp, Sparkles, PieChart, Calendar } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="max-w-5xl mx-auto text-center mt-44 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-neutral">
          Take{' '}
          <span className="font-light text-warning drop-shadow-[0px_0px_20px_rgba(230,126,34,0.8)]">
            control
          </span>{' '}
          of Your Finances
        </h1>
        <p className="italic text-xl text-neutral mt-6 font-light">
          Plan, save, and spend wisely with our easy-to-use expense tracker.
        </p>
        <button
          onClick={() => navigate('/auth')}
          className="mt-14 py-4 px-8 text-lg font-medium text-neutral bg-secondary rounded-4xl hover:drop-shadow-[0px_0px_8px_rgba(39,174,96,0.8)] active:drop-shadow-none active:bg-[#208049] transition duration-200"
        >
          Get Started Now!
        </button>
      </div>

      {/* Example Dashboard Preview Section */}
      <div className="mt-24 flex justify-center px-4">
        <div className="bg-muted rounded-xl border border-border shadow-lg overflow-hidden max-w-5xl w-full">
          <div className="bg-muted px-4 py-2 flex items-center space-x-2 border-b border-border">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
          </div>
          <div className="bg-background p-6">
            <img
              src="/images/dashboard-preview.png"
              alt="Dashboard Preview"
              className="rounded-lg w-full h-auto shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="mt-32 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-neutral mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-muted p-6 rounded-xl flex flex-col items-center">
            <TrendingUp className="text-green-400 mb-4" size={36} />
            <h3 className="text-xl font-medium text-neutral">Smart Tracking</h3>
            <p className="text-muted-foreground mt-2">
              Automatically categorize your expenses and visualize spending patterns.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-xl flex flex-col items-center">
            <ShieldCheck className="text-blue-400 mb-4" size={36} />
            <h3 className="text-xl font-medium text-neutral">Secure Data</h3>
            <p className="text-muted-foreground mt-2">
              Your financial data is encrypted and securely stored.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-xl flex flex-col items-center">
            <CheckCircle className="text-yellow-400 mb-4" size={36} />
            <h3 className="text-xl font-medium text-neutral">Goal Planning</h3>
            <p className="text-muted-foreground mt-2">
              Set savings goals and track your progress effortlessly.
            </p>
          </div>
        </div>
      </div>

      {/* More Benefits Section */}
      <div className="mt-28 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-neutral mb-12">More Tools to Empower You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-muted p-6 rounded-xl flex flex-col items-center">
            <PieChart className="text-purple-400 mb-4" size={36} />
            <h3 className="text-xl font-medium text-neutral">Visual Reports</h3>
            <p className="text-muted-foreground mt-2">
              Get intuitive pie charts and graphs for better decision-making.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-xl flex flex-col items-center">
            <Calendar className="text-pink-400 mb-4" size={36} />
            <h3 className="text-xl font-medium text-neutral">Bill Reminders</h3>
            <p className="text-muted-foreground mt-2">
              Never miss a due date again with customizable alerts.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-xl flex flex-col items-center">
            <Sparkles className="text-indigo-400 mb-4" size={36} />
            <h3 className="text-xl font-medium text-neutral">Clean Interface</h3>
            <p className="text-muted-foreground mt-2">
              Minimal and user-friendly design focused on what matters.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="mt-32 text-center">
        <h3 className="text-2xl font-semibold text-neutral">
          Ready to take control of your finances?
        </h3>
        <button
          onClick={() => navigate('/auth')}
          className="mt-6 py-3 px-6 text-lg font-medium text-neutral bg-secondary rounded-3xl hover:drop-shadow-[0px_0px_6px_rgba(39,174,96,0.8)] active:drop-shadow-none active:bg-[#208049] transition duration-200"
        >
          Create Your Free Account
        </button>
      </div>

      <footer className="mt-32 bg-lightDark border-t-4 border-neutral-700 py-12 px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} FinanceTracker. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
