import { useEffect } from 'react';

const WelcomeScreen = () => {
  useEffect(() => {
    // শুধু theme এবং font class যোগ করো, overflow/h-screen এখন wrapper এ
    document.body.classList.add(
      'bg-background-light',
      'dark:bg-background-dark',
      'font-display',
      'transition-colors',
      'duration-300'
    );

    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <div className="relative  w-full flex flex-col overflow-auto">
      {/* Background blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-leaf-dark/10 dark:bg-leaf-dark/30 rounded-full blur-3xl z-0 pointer-events-none" />

      {/* Top shapes */}
      <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-gradient-to-br from-[#1E1B4B] to-[#4C1D95] rounded-br-[100px] rounded-tl-[50px] -rotate-12 shadow-lg animate-float" />
        <div className="absolute top-20 -left-16 w-56 h-56 bg-gradient-to-tr from-[#BE185D] to-[#D946EF] rounded-tr-[100px] rounded-bl-[50px] rotate-45 opacity-80 animate-float-delayed" />
        <div className="absolute top-10 left-20 w-40 h-64 bg-gradient-to-b from-[#2DD4BF] to-[#0EA5E9] rounded-t-full shadow-xl -rotate-[30deg]">
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/20 -translate-x-1/2" />
        </div>
      </div>

      {/* Bottom shapes */}
      <div className="absolute bottom-0 right-0 w-full h-1/3 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-tl from-[#5B21B6] to-[#7C3AED] rounded-tl-[120px] rounded-br-[40px] rotate-12 shadow-lg" />
        <div className="absolute bottom-20 -right-12 w-48 h-48 bg-gradient-to-bl from-[#EC4899] to-[#db2777] rounded-full scale-x-50 rotate-45 animate-float" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-8 pb-12 pt-20">
        <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30">
          <span className="text-xs font-bold tracking-widest text-secondary uppercase block mb-2">
            Nature Inspired
          </span>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            WELCOME
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-6">
            Lorem ipsum dolor sit amet, consectetuer.
          </p>

          <h3 className="text-lg font-semibold text-secondary uppercase tracking-wider mb-2">
            Lorem Ipsum
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            ultrices velit id velit vestibulum tincidunt.
          </p>

          <button className="w-full bg-primary hover:bg-fuchsia-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/30 transition transform hover:-translate-y-1 active:scale-95 flex justify-center gap-2">
            <span>EXPLORE NOW</span>
            <span className="material-icons text-sm">arrow_forward</span>
          </button>

          <div className="mt-8 flex justify-center gap-6 text-gray-400 dark:text-gray-500">
            {['facebook', 'alternate_email', 'ondemand_video', 'share'].map(
              (icon) => (
                <span
                  key={icon}
                  className="material-icons cursor-pointer hover:text-primary transition"
                >
                  {icon}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
