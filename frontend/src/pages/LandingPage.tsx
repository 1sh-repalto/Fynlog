import { useNavigate } from 'react-router-dom';
import { Ban, BarChart3, HandHeart, ArrowRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="container mx-auto text-center mt-44 px-4">
        <h1 className="text-4xl md:text-6xl font-semibold">
          Take{' '}
          <span className="font-light text-warning drop-shadow-[0_0_25px_rgba(230,126,34,1)]">
            Control
          </span>{' '}
          of Your Finances
        </h1>
        <p className="italic text-xl mt-6 font-light">
          Your everyday companion to track spending, gain insights, and manage finance.
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="flex items-center justify-center gap-2 mx-auto mt-12 py-3 px-6 rounded-4xl border border-secondary text-neutral bg-secondary text-lg font-medium hover:bg-secondary hover:text-neutral hover:drop-shadow-[0px_0px_8px_rgba(39,174,96,0.8)] active:drop-shadow-none active:bg-[#208049] transition duration-200"
        >
          Get Started Now
          <ArrowRight />
        </button>
      </div>

      {/* Chart Previews */}
      <div className="mt-44">
        <h1 className="text-4xl font-bold ml-26 mb-5">Financial insights at a glance</h1>
        <p className="text-lg ml-26 mb-15 italic">
          Track income, expenses, and trends with structured, easy-to-read visualizations.
        </p>
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

          <div className="absolute w-[28vw] right-[2vw] -top-[8vw] z-1 rounded-xl overflow-hidden bg-lightDark border border-neutral-500 max-w-5xl mx-auto">
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

          <div className="absolute w-[28vw] right-[16vw] md:-bottom-[10vw] rounded-xl overflow-hidden bg-lightDark border border-neutral-500 max-w-5xl mx-auto">
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
      <section className="md:mt-64 mt-24 mb-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                Icon: BarChart3,
                title: 'Insightful Visuals',
                text: 'Track spending trends and gain insights with visual reports.',
                color: 'text-sky-400',
              },
              {
                Icon: Ban,
                title: 'No Ads',
                text: 'Enjoy a clean, distraction-free experience without any ads.',
                color: 'text-rose-500',
              },
              {
                Icon: HandHeart,
                title: 'Made with Passion',
                text: 'A personal project crafted with care for everyday users.',
                color: 'text-emerald-500',
              },
            ].map(({ Icon, title, text, color }) => (
              <div
                key={title}
                className="bg-lightDark p-6 rounded-2xl border border-neutral-700 text-center"
              >
                <Icon size={42} className={`mx-auto mb-4 ${color}`} />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark border-t border-neutral-700 py-10 px-6 text-sm text-muted-foreground">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className='text-lg font-semibold text-neutral-500'>
              Made with ❤️ and ☕
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <p className='text-md font-semibold text-neutral-300'>Let's Connect : </p>
            <a
              href="https://github.com/1sh-repalto/finance-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/repalto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaLinkedin size={28} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
