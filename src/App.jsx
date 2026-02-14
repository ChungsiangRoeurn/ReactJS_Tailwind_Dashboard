import React, { useEffect, useState } from "react";

export default function ValentinesFlowers() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);
  const [clickedFlowers, setClickedFlowers] = useState([]);
  const [allFlowersClicked, setAllFlowersClicked] = useState(false);
  const [showNameReveal, setShowNameReveal] = useState(false);
  const [nameRevealed, setNameRevealed] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  const [currentWish, setCurrentWish] = useState(0);

  const romanticWishes = [
    {
      emoji: "🌹",
      wish: "Every moment with you feels like a beautiful dream I never want to wake up from",
      color: "from-red-400 to-pink-500",
    },
    {
      emoji: "💫",
      wish: "You are the brightest star in my sky, lighting up even my darkest days",
      color: "from-purple-400 to-blue-500",
    },
    {
      emoji: "💖",
      wish: "My heart beats faster every time I think of you, and I think of you all the time",
      color: "from-pink-400 to-rose-500",
    },
    {
      emoji: "🌸",
      wish: "Like flowers need sunshine, I need you to make my world beautiful",
      color: "from-orange-400 to-pink-500",
    },
    {
      emoji: "✨",
      wish: "You make ordinary moments extraordinary just by being you",
      color: "from-cyan-400 to-purple-500",
    },
    {
      emoji: "💝",
      wish: "I promise to cherish every smile, every laugh, and every moment we share together",
      color: "from-fuchsia-400 to-pink-500",
    },
  ];

  useEffect(() => {
    setIsLoaded(true);

    // Generate magical particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      color: ["#FFD700", "#FF69B4", "#87CEEB", "#98FB98", "#DDA0DD", "#F0E68C"][
        Math.floor(Math.random() * 6)
      ],
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    // Check if all 9 flowers have been clicked
    const uniqueClicks = new Set(clickedFlowers).size;
    if (uniqueClicks === 9 && !allFlowersClicked) {
      setAllFlowersClicked(true);
      setTimeout(() => {
        setShowNameReveal(true);
      }, 500);
    }
  }, [clickedFlowers, allFlowersClicked]);

  const handleFlowerClick = (index) => {
    // Add flower to clicked list if not already clicked
    if (!clickedFlowers.includes(index)) {
      setClickedFlowers([...clickedFlowers, index]);
    }
  };

  const handleRevealName = () => {
    setNameRevealed(true);
    // Start wishes after a short delay
    setTimeout(() => {
      setShowWishes(true);
    }, 2000);
  };

  const handleNextWish = () => {
    if (currentWish < romanticWishes.length - 1) {
      setCurrentWish(currentWish + 1);
    }
  };

  const getProgressText = () => {
    const uniqueClicks = new Set(clickedFlowers).size;
    if (uniqueClicks === 0) return "💡 Tap each flower to see magic!";
    if (uniqueClicks < 9) return `✨ ${uniqueClicks}/9 flowers discovered!`;
    return "🎉 All flowers bloomed!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient"></div>
      </div>

      {/* Magical particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float-sparkle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 10px ${particle.color}`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-geo"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + i * 2}s`,
            }}
          >
            <div className="w-16 h-16 border-2 border-white opacity-10 rotate-45 animate-spin-slow"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Title with glowing effect */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <h1
            className="text-6xl md:text-8xl font-bold mb-4 animate-glow-pulse"
            style={{
              fontFamily: "'Poppins', sans-serif",
              background:
                "linear-gradient(45deg, #FF6B9D, #C06C84, #F67280, #FFD93D, #6BCB77)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 30px rgba(255,107,157,0.5)",
              animation: "gradient-shift 3s ease infinite",
            }}
          >
            Happy Valentine's Day
          </h1>
          <p
            className="text-3xl md:text-4xl text-pink-300 animate-pulse-slow"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            ✨ To my dearest Pidoar ✨
          </p>
        </div>

        {/* Progress Indicator */}
        <div
          className={`mb-6 transition-all duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
            <p
              className="text-lg md:text-xl text-white font-medium"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {getProgressText()}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-3 w-64 h-2 bg-white/10 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 transition-all duration-500 ease-out"
              style={{
                width: `${(new Set(clickedFlowers).size / 9) * 100}%`,
                boxShadow: "0 0 10px rgba(255,255,255,0.5)",
              }}
            />
          </div>
        </div>

        {/* Flower Bouquet with glassmorphism vase */}
        <div className="relative inline-block">
          {/* Modern glassmorphism vase */}
          <div
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-48 backdrop-blur-xl bg-white/10 border border-white/20 rounded-t-3xl transition-all duration-1000 delay-500 shadow-2xl ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{
              clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-300/20 via-purple-300/20 to-pink-300/20 animate-shimmer"></div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-28 h-3 bg-white/30 rounded-full backdrop-blur-sm"></div>
            {/* Sparkles on vase */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-twinkle"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>

          {/* Flowers Container */}
          <div className="relative w-[500px] h-[450px]">
            {/* Rainbow colored flowers */}
            {[
              {
                color: "from-red-400 via-pink-500 to-red-600",
                pos: "left-1/2 top-32 -translate-x-1/2",
                size: "large",
                delay: 700,
                index: 0,
              },
              {
                color: "from-purple-400 via-pink-400 to-purple-600",
                pos: "left-20 top-44",
                size: "medium",
                delay: 900,
                rotate: "-15deg",
                index: 1,
              },
              {
                color: "from-orange-400 via-yellow-400 to-orange-600",
                pos: "right-20 top-44",
                size: "medium",
                delay: 1000,
                rotate: "15deg",
                index: 2,
              },
              {
                color: "from-blue-400 via-cyan-400 to-blue-600",
                pos: "left-32 top-24",
                size: "medium",
                delay: 800,
                rotate: "-25deg",
                index: 3,
              },
              {
                color: "from-green-400 via-emerald-400 to-green-600",
                pos: "right-32 top-24",
                size: "medium",
                delay: 1100,
                rotate: "25deg",
                index: 4,
              },
              {
                color: "from-fuchsia-400 via-purple-500 to-fuchsia-600",
                pos: "left-8 top-36",
                size: "small",
                delay: 1200,
                rotate: "-35deg",
                index: 5,
              },
              {
                color: "from-yellow-400 via-amber-400 to-yellow-600",
                pos: "right-8 top-36",
                size: "small",
                delay: 1300,
                rotate: "35deg",
                index: 6,
              },
              {
                color: "from-rose-400 via-pink-500 to-rose-600",
                pos: "left-1/2 top-20 -translate-x-1/2 -translate-x-16",
                size: "small",
                delay: 1400,
                index: 7,
              },
              {
                color: "from-indigo-400 via-blue-500 to-indigo-600",
                pos: "left-1/2 top-20 -translate-x-1/2 translate-x-16",
                size: "small",
                delay: 1500,
                index: 8,
              },
            ].map((flower) => {
              const isClicked = clickedFlowers.includes(flower.index);
              return (
                <div
                  key={flower.index}
                  className={`absolute ${flower.pos} transform transition-all duration-500 cursor-pointer ${
                    isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  } ${isClicked ? "scale-110" : "hover:scale-125"} ${
                    !isClicked ? "animate-bounce-gentle" : ""
                  }`}
                  style={{
                    transitionDelay: `${flower.delay}ms`,
                    transform: flower.rotate
                      ? `rotate(${flower.rotate})`
                      : undefined,
                    animationDelay: `${flower.index * 0.3}s`,
                  }}
                  onClick={() => handleFlowerClick(flower.index)}
                >
                  <Flower
                    color={flower.color}
                    size={flower.size}
                    isActive={isClicked}
                    isClicked={isClicked}
                  />
                  {/* Checkmark indicator when clicked */}
                  {isClicked && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                      <span className="text-white text-xl font-bold">✓</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Surprise Name Reveal Section */}
        <div
          className={`mt-16 transition-all duration-1000 delay-1600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {!showNameReveal ? (
            <div className="space-y-4">
              <p
                className="text-2xl md:text-3xl text-pink-200 italic"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                With all my love,
              </p>
              <p
                className="text-3xl md:text-4xl text-purple-200"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                From someone who dreams of you ♥
              </p>
              <p
                className="text-lg text-pink-300 mt-2 animate-pulse-slow"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                (Find all the flowers to discover who... 🌸✨)
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {!nameRevealed ? (
                <div className="animate-fade-in-up">
                  <p
                    className="text-2xl md:text-3xl text-pink-200 italic mb-4"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    🎁 You found all the flowers!
                  </p>
                  <button
                    onClick={handleRevealName}
                    className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full text-white text-xl font-bold shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 animate-pulse-button"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <span className="relative z-10">
                      Click for Your Surprise! 🎉
                    </span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient"></div>
                  </button>
                </div>
              ) : (
                <div className="animate-name-reveal space-y-4">
                  <p
                    className="text-2xl md:text-3xl text-pink-200 italic"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    With all my love,
                  </p>
                  <div className="relative inline-block">
                    <p
                      className="text-5xl md:text-7xl font-bold animate-rainbow-text relative z-10"
                      style={{
                        fontFamily: "'Pacifico', cursive",
                        background:
                          "linear-gradient(90deg, #FF6B9D, #C06C84, #F67280, #FFD93D, #6BCB77, #4ECDC4)",
                        backgroundSize: "200% 200%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Xiang Xiang ♥
                    </p>
                    {/* Sparkle effects around name */}
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-4 h-4 bg-yellow-300 rounded-full animate-sparkle-around"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-80px)`,
                          animationDelay: `${i * 0.1}s`,
                          boxShadow: "0 0 10px rgba(255,215,0,0.8)",
                        }}
                      />
                    ))}
                  </div>
                  <p
                    className="text-xl md:text-2xl text-purple-200 mt-6 animate-fade-in"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    💝 Forever yours 💝
                  </p>

                  {/* Romantic Wishes Section */}
                  {showWishes && (
                    <div className="mt-12 animate-fade-in-up">
                      <div className="max-w-2xl mx-auto">
                        {/* Wish Card */}
                        <div
                          className={`relative px-8 py-6 bg-gradient-to-br ${romanticWishes[currentWish].color} rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20 animate-wish-appear`}
                          key={currentWish}
                        >
                          {/* Floating hearts around wish */}
                          <div className="absolute -top-4 -left-4 text-4xl animate-float-gentle">
                            ❤️
                          </div>
                          <div
                            className="absolute -top-4 -right-4 text-4xl animate-float-gentle"
                            style={{ animationDelay: "0.5s" }}
                          >
                            💕
                          </div>
                          <div
                            className="absolute -bottom-4 left-1/4 text-3xl animate-float-gentle"
                            style={{ animationDelay: "1s" }}
                          >
                            💗
                          </div>
                          <div
                            className="absolute -bottom-4 right-1/4 text-3xl animate-float-gentle"
                            style={{ animationDelay: "1.5s" }}
                          >
                            💖
                          </div>

                          <div className="text-6xl mb-4 animate-bounce-subtle">
                            {romanticWishes[currentWish].emoji}
                          </div>
                          <p
                            className="text-xl md:text-2xl text-white font-medium leading-relaxed text-center"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            {romanticWishes[currentWish].wish}
                          </p>
                        </div>

                        {/* Progress dots */}
                        <div className="flex justify-center gap-2 mt-6">
                          {romanticWishes.map((_, idx) => (
                            <div
                              key={idx}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                idx === currentWish
                                  ? "bg-pink-400 scale-125"
                                  : idx < currentWish
                                    ? "bg-pink-300"
                                    : "bg-white/30"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Navigation */}
                        {currentWish < romanticWishes.length - 1 ? (
                          <button
                            onClick={handleNextWish}
                            className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white text-lg font-bold shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 animate-pulse-gentle"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            Read Next Message 💌
                          </button>
                        ) : (
                          <div className="mt-8 space-y-8">
                            {/* The Most Important Message */}
                            <div className="animate-fade-in-slow px-6 py-8 bg-gradient-to-br from-red-500 via-pink-500 to-rose-500 rounded-3xl shadow-2xl border-4 border-white/30 relative overflow-hidden">
                              {/* Animated hearts background */}
                              <div className="absolute inset-0 overflow-hidden">
                                {[...Array(15)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="absolute text-white/20 text-4xl animate-heart-float"
                                    style={{
                                      left: `${Math.random() * 100}%`,
                                      top: `${Math.random() * 100}%`,
                                      animationDelay: `${i * 0.3}s`,
                                      animationDuration: `${5 + Math.random() * 3}s`,
                                    }}
                                  >
                                    ♥
                                  </div>
                                ))}
                              </div>

                              <div className="relative z-10">
                                <div className="text-6xl mb-6 animate-heartbeat">
                                  💕
                                </div>
                                <p
                                  className="text-3xl md:text-5xl text-white font-bold leading-tight mb-4 animate-text-glow"
                                  style={{
                                    fontFamily: "'Pacifico', cursive",
                                    textShadow:
                                      "0 0 20px rgba(255,255,255,0.5)",
                                  }}
                                >
                                  Can we have a beautiful love together again
                                  BABY?
                                </p>
                                <div className="flex justify-center gap-4 mt-6">
                                  <span
                                    className="text-5xl animate-bounce-heart"
                                    style={{ animationDelay: "0s" }}
                                  >
                                    💖
                                  </span>
                                  <span
                                    className="text-5xl animate-bounce-heart"
                                    style={{ animationDelay: "0.2s" }}
                                  >
                                    💝
                                  </span>
                                  <span
                                    className="text-5xl animate-bounce-heart"
                                    style={{ animationDelay: "0.4s" }}
                                  >
                                    💗
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Secondary romantic message */}
                            <div
                              className="animate-fade-in"
                              style={{ animationDelay: "0.5s" }}
                            >
                              <p
                                className="text-3xl md:text-4xl text-pink-200 font-bold mb-4"
                                style={{ fontFamily: "'Pacifico', cursive" }}
                              >
                                Will you be mine? 🌹
                              </p>
                              <p
                                className="text-lg text-purple-200 italic"
                                style={{ fontFamily: "'Caveat', cursive" }}
                              >
                                Let these flowers bloom with our love story ✨
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700;900&family=Caveat:wght@700&family=Pacifico&display=swap");

        @keyframes float-sparkle {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes float-geo {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes glow-pulse {
          0%,
          100% {
            filter: drop-shadow(0 0 20px rgba(255, 107, 157, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(255, 107, 157, 0.8));
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes rainbow-text {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes name-reveal {
          0% {
            opacity: 0;
            transform: scale(0.5) rotateY(180deg);
          }
          50% {
            transform: scale(1.2) rotateY(0deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }

        @keyframes sparkle-around {
          0%,
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes pulse-button {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.8);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes wish-appear {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes float-gentle {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.1);
          }
        }

        @keyframes pulse-gentle {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 30px rgba(236, 72, 153, 0.6);
            transform: scale(1.02);
          }
        }

        @keyframes heart-float {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 0.4;
          }
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          10%,
          30% {
            transform: scale(1.2);
          }
          20%,
          40% {
            transform: scale(1);
          }
        }

        @keyframes text-glow {
          0%,
          100% {
            text-shadow:
              0 0 20px rgba(255, 255, 255, 0.5),
              0 0 40px rgba(255, 182, 193, 0.3);
          }
          50% {
            text-shadow:
              0 0 30px rgba(255, 255, 255, 0.8),
              0 0 60px rgba(255, 182, 193, 0.5);
          }
        }

        @keyframes bounce-heart {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }

        @keyframes fade-in-slow {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }

        .animate-float-sparkle {
          animation: float-sparkle linear infinite;
        }

        .animate-float-geo {
          animation: float-geo ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-rainbow-text {
          animation: rainbow-text 5s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-name-reveal {
          animation: name-reveal 1s ease-out;
        }

        .animate-sparkle-around {
          animation: sparkle-around 2s ease-in-out infinite;
        }

        .animate-pulse-button {
          animation: pulse-button 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-wish-appear {
          animation: wish-appear 0.8s ease-out;
        }

        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }

        .animate-heart-float {
          animation: heart-float ease-in-out infinite;
        }

        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }

        .animate-bounce-heart {
          animation: bounce-heart 1s ease-in-out infinite;
        }

        .animate-fade-in-slow {
          animation: fade-in-slow 1.5s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </div>
  );
}

function Flower({ color, size, isActive, isClicked }) {
  const sizes = {
    small: { petal: "w-6 h-10", center: "w-6 h-6" },
    medium: { petal: "w-8 h-14", center: "w-8 h-8" },
    large: { petal: "w-10 h-16", center: "w-10 h-10" },
  };

  const currentSize = sizes[size];

  return (
    <div
      className="relative inline-block transition-all duration-300"
      style={{
        animation: isClicked
          ? "sway 1.5s ease-in-out"
          : "sway 3s ease-in-out infinite",
        filter: isClicked
          ? "brightness(1.2) drop-shadow(0 0 15px rgba(255,255,255,0.5))"
          : "brightness(1)",
      }}
    >
      {/* Stem with gradient */}
      <div
        className="absolute left-1/2 top-full transform -translate-x-1/2 w-2 h-24 bg-gradient-to-b from-green-400 to-green-600 rounded-full shadow-lg"
        style={{ transformOrigin: "top" }}
      >
        {/* Animated Leaf 1 */}
        <div className="absolute left-0 top-8 w-6 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full transform -rotate-45 origin-top-right animate-leaf-sway"></div>
        {/* Animated Leaf 2 */}
        <div className="absolute right-0 top-16 w-6 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full transform rotate-45 origin-top-left animate-leaf-sway-reverse"></div>
      </div>

      {/* Petals with glow effect */}
      <div className="relative">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute ${currentSize.petal} bg-gradient-to-br ${color} rounded-full transition-all duration-300 ${
              isActive ? "animate-petal-burst" : ""
            }`}
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-${
                size === "large" ? "20" : size === "medium" ? "16" : "12"
              }px)`,
              transformOrigin: "center",
              filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
              boxShadow: isActive ? "0 0 20px rgba(255,255,255,0.8)" : "none",
              animationDelay: `${i * 0.05}s`,
            }}
          >
            {/* Inner petal shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full"></div>
          </div>
        ))}

        {/* Center with animated details */}
        <div
          className={`absolute ${currentSize.center} bg-gradient-radial from-yellow-200 via-yellow-400 to-yellow-600 rounded-full shadow-inner ${
            isActive ? "animate-pulse-fast" : "animate-center-pulse"
          }`}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow:
              "0 0 15px rgba(255, 215, 0, 0.6), inset 0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          {/* Animated center stamens */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-1.5 bg-gradient-to-t from-orange-600 to-yellow-400 rounded-full animate-stamen-dance"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-${
                  size === "large" ? "3" : "2"
                }px)`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}

          {/* Center glow */}
          <div className="absolute inset-0 rounded-full bg-yellow-300/50 animate-center-glow"></div>
        </div>

        {/* Sparkle effects when active */}
        {isActive && (
          <>
            {[...Array(8)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute w-2 h-2 bg-white rounded-full animate-sparkle-burst"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-${
                    size === "large" ? "40" : size === "medium" ? "30" : "25"
                  }px)`,
                  animationDelay: `${i * 0.05}s`,
                  boxShadow: "0 0 10px rgba(255,255,255,0.8)",
                }}
              />
            ))}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes sway {
          0%,
          100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(2deg);
          }
        }

        @keyframes leaf-sway {
          0%,
          100% {
            transform: rotate(-45deg) scale(1);
          }
          50% {
            transform: rotate(-50deg) scale(1.05);
          }
        }

        @keyframes leaf-sway-reverse {
          0%,
          100% {
            transform: rotate(45deg) scale(1);
          }
          50% {
            transform: rotate(50deg) scale(1.05);
          }
        }

        @keyframes center-pulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @keyframes center-glow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes stamen-dance {
          0%,
          100% {
            height: 1.5rem;
          }
          50% {
            height: 2rem;
          }
        }

        @keyframes petal-burst {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes sparkle-burst {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2);
          }
        }

        @keyframes pulse-fast {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
          }
        }

        .animate-leaf-sway {
          animation: leaf-sway 2s ease-in-out infinite;
        }

        .animate-leaf-sway-reverse {
          animation: leaf-sway-reverse 2s ease-in-out infinite;
        }

        .animate-center-pulse {
          animation: center-pulse 2s ease-in-out infinite;
        }

        .animate-center-glow {
          animation: center-glow 2s ease-in-out infinite;
        }

        .animate-stamen-dance {
          animation: stamen-dance 1.5s ease-in-out infinite;
        }

        .animate-petal-burst {
          animation: petal-burst 0.5s ease-out;
        }

        .animate-sparkle-burst {
          animation: sparkle-burst 0.8s ease-out forwards;
        }

        .animate-pulse-fast {
          animation: pulse-fast 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
