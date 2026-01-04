import { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import confetti from 'canvas-confetti';

const WelcomeScreen = () => {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
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

  // 🎆🎈 Fireworks + Balloon Effect
  const handleExplore = () => {
    // Firework burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
    });

    // Balloon floating
    confetti({
      particleCount: 40,
      angle: 90,
      spread: 55,
      startVelocity: 30,
      gravity: 0.6,
      scalar: 1.2,
      origin: { y: 1 },
      colors: ['#E42127', '#29CEC1', '#351E6F', '#FFD700'],
    });
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col overflow-hidden">
      {/* ================= Background blobs ================= */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-leaf-dark/10 dark:bg-leaf-dark/30 rounded-full blur-3xl z-0 pointer-events-none" />

      {/* ================= Top shapes ================= */}
      <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-gradient-to-br from-[#1E1B4B] to-[#4C1D95] rounded-br-[100px] rounded-tl-[50px] -rotate-12 shadow-lg animate-float" />
        <div className="absolute top-20 -left-16 w-56 h-56 bg-[#E42127] rounded-tr-[100px] rounded-bl-[50px] rotate-45 opacity-80 animate-float-delayed" />
        <div className="absolute top-10 left-20 w-40 h-64 bg-gradient-to-b from-[#2DD4BF] to-[#0EA5E9] rounded-t-full shadow-xl -rotate-[30deg]" />
      </div>

      {/* ================= Bottom shapes ================= */}
      <div className="absolute bottom-0 right-0 w-full h-1/3 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-tl from-[#5B21B6] to-[#7C3AED] rounded-tl-[120px] rounded-br-[40px] rotate-12 shadow-lg" />
        <div className="absolute bottom-20 -right-12 w-48 h-48 bg-[#E42127] rounded-full scale-x-50 rotate-45 animate-float" />
      </div>

      {/* ================= Content ================= */}
      <div className="relative z-10 flex flex-col justify-end h-full px-8 pb-12 pt-20">
        <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30">

          {user?.photoURL && (
            <div className="flex justify-center mb-4">
              <img
                src={user.photoURL}
                alt="User"
                className="w-16 h-16 rounded-full border-2 border-red-500 shadow-lg"
              />
            </div>
          )}

          <span className="text-xs font-bold tracking-widest text-[#351E6F] uppercase block mb-2">
            Nature Inspired
          </span>

          <h1 className="text-4xl font-bold text-[#29CEC1] mb-2">
            {user ? `WELCOME, ${user.displayName || 'User'}` : 'WELCOME'}
          </h1>

          <p className="text-sm italic mb-6">
            {user
              ? `Logged in as ${user.email}`
              : 'Please login to explore personalized features'}
          </p>

          <h3 className="text-lg font-semibold text-[#351E6F] uppercase tracking-wider mb-2">
            Who I Am
          </h3>

          <p className="text-sm mb-8">
            I am a passionate car enthusiast who loves exploring new places. My
            goal is to make travel easy, enjoyable, and stress-free for
            everyone.
          </p>

          <button
            onClick={handleExplore}
            className="w-full bg-red-600 text-black hover:bg-black hover:text-white transition duration-300 font-semibold py-4 px-6 rounded-xl shadow-lg transform hover:-translate-y-1 active:scale-95"
          >
            EXPLORE NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
