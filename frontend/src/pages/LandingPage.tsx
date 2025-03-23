const LandingPage = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-dark bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_6rem]">
      <div className="max-w-5xl mx-auto text-center mt-44">
        <h1 className="text-4xl md:text-6xl font-bold text-neutral">
          Take{" "}
          <span className="font-light text-warning drop-shadow-[0px_0px_20px_rgba(230,126,34,0.8)]">
            control
          </span>{" "}
          of Your Finances
        </h1>
        <p className="italic text-xl text-neutral mt-6 font-light">
          Plan, save, and spend wisely with our easy-to-use expense tracker.
        </p>
        <button className="mt-14 py-4 px-8 text-lg font-medium text-neutral bg-secondary rounded-4xl hover:drop-shadow-[0px_0px_8px_rgba(39,174,96,0.8)] active:drop-shadow-none active:bg-[#208049] transition duration-200">
          Get Started Now!
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
