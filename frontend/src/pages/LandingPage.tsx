import { useNavigate } from 'react-router-dom';
import { Ban, BarChart3, HandHeart } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="max-w-5xl mx-auto text-center mt-44 px-4">
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
          className="mt-14 py-4 px-8 text-lg font-semibold text-neutral bg-secondary rounded-4xl hover:drop-shadow-[0px_0px_8px_rgba(39,174,96,0.8)] active:drop-shadow-none active:bg-[#208049] transition duration-200"
        >
          Get Started Now !
        </button>
      </div>

      {/* Why Choose Us Section */}
      <section className="mt-24 px-4 py-20 bg-base-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-lightDark p-8 rounded-2xl border border-neutral-700">
              <BarChart3
                className="mx-auto text-sky-400 mb-4"
                size={42}
              />
              <h3 className="text-xl font-semibold text-neutral mb-2">Insightful Visuals</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track spending trends and gain insights with visual reports.
              </p>
            </div>

            <div className="bg-lightDark p-8 rounded-2xl border border-neutral-700">
              <Ban
                className="mx-auto text-rose-500 mb-4"
                size={42}
              />
              <h3 className="text-xl font-semibold text-neutral mb-2">No Ads</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enjoy a clean, distraction-free experience without any ads.
              </p>
            </div>

            <div className="bg-lightDark p-8 rounded-2xl border border-neutral-700">
              <HandHeart
                className="mx-auto text-emerald-500 mb-4"
                size={42}
              />
              <h3 className="text-xl font-semibold text-neutral mb-2">Made with Passion</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A personal project crafted with care for everyday users.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-lightDark border-t-4 border-neutral-700 py-12 px-4 text-center text-sm text-muted-foreground">
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
