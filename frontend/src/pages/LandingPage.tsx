import { useNavigate } from 'react-router-dom';
import { Ban, BarChart3, HandHeart } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="max-w-5xl mx-auto text-center mt-54 px-4">
        <h1 className="text-4xl md:text-6xl font-semibold text-neutral">
          Take{' '}
          <span className="font-light text-warning drop-shadow-[0px_0px_25px_rgba(230,126,34,1)]">
            Control
          </span>{' '}
          of Your Finances
        </h1>
        <p className="italic text-xl text-neutral mt-6 font-light">
          Plan, save, and spend wisely with our easy-to-use expense tracker.
        </p>
        <button
          onClick={() => navigate('/auth')}
          className="mt-14 py-4 px-8 text-lg font-semibold text-neutral bg-secondary rounded-4xl hover:drop-shadow-[0px_0px_8px_rgba(39,174,96,0.8)] active:drop-shadow-none active:bg-[#208049] transition duration-200 cursor-pointer"
        >
          Get Started Now !
        </button>
      </div>

      <div className="mt-44">
        <h1 className="text-4xl font-bold ml-26 mb-5">Financial insights at a glance</h1>
        <p className='text-lg ml-26 mb-15 italic'>Track income, expenses, and trends with structured, easy-to-read visualizations.</p>
        <div className="relative h-100 w-full px-6 max-w-7xl mx-auto space-y-8">
          <div className="absolute left-5 rounded-xl overflow-hidden bg-lightDark border border-neutral-500 max-w-5xl mx-auto">
            <div className="flex items-center justify-between px-4 py-2 bg-lighterDark border-b border-neutral-500">
              <div className="flex space-x-2 py-1">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div></div>
            </div>
            <img
              src="/images/bar-chart.png"
              alt="Bar Chart"
              className="w-full h-auto object-contain bg-lighterDark"
            />
          </div>

          <div className="absolute w-100 right-5 -top-25 z-1 rounded-xl overflow-hidden bg-lightDark border border-neutral-500 max-w-5xl mx-auto">
            <div className="flex items-center justify-between px-4 py-2 bg-lighterDark border-b border-neutral-500">
              <div className="flex space-x-2 py-1">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div></div>
            </div>
            <img
              src="/images/income-chart.png"
              alt="Bar Chart"
              className="w-full h-auto object-contain bg-lighterDark"
            />
          </div>

          <div className="absolute w-100 right-58 -bottom-35 rounded-xl overflow-hidden bg-lightDark border border-neutral-500 max-w-5xl mx-auto">
            <div className="flex items-center justify-between px-4 py-2 bg-lighterDark border-b border-neutral-500">
              <div className="flex space-x-2 py-1">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div></div>
            </div>
            <img
              src="/images/expense-chart.png"
              alt="Bar Chart"
              className="w-full h-auto object-contain bg-lighterDark"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="mt-74 mb-25 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-lightDark p-8 rounded-2xl border border-neutral-700">
              <BarChart3 className="mx-auto text-sky-400 mb-4" size={42} />
              <h3 className="text-xl font-semibold text-neutral mb-2">Insightful Visuals</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track spending trends and gain insights with visual reports.
              </p>
            </div>

            <div className="bg-lightDark p-8 rounded-2xl border border-neutral-700">
              <Ban className="mx-auto text-rose-500 mb-4" size={42} />
              <h3 className="text-xl font-semibold text-neutral mb-2">No Ads</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enjoy a clean, distraction-free experience without any ads.
              </p>
            </div>

            <div className="bg-lightDark p-8 rounded-2xl border border-neutral-700">
              <HandHeart className="mx-auto text-emerald-500 mb-4" size={42} />
              <h3 className="text-xl font-semibold text-neutral mb-2">Made with Passion</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A personal project crafted with care for everyday users.
              </p>
            </div>
          </div>
        </div>
      </section>

    <footer className="bg-dark border-t-3 border-neutral-700 py-12 px-6 text-sm text-muted-foreground">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
        {/* Left Side */}
        <div className="text-center md:text-left">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} <span className="font-semibold text-white">FinanceTracker</span>. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/1sh-repalto/finance-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub size={32} />
          </a>
          <a
            href="https://www.linkedin.com/in/repalto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaLinkedin size={32} />
          </a>
        </div>
      </div>
    </footer>
    </>
  );
};

export default LandingPage;
