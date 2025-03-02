'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Settings, Send, ArrowLeft, ChefHat, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PromptPage() {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const userName = 'Md. Atiqul Islam'; // Replace with dynamic user data if available
  const textareaRef = useRef(null);
  const [isAtTop, setIsAtTop] = useState(false);
  const router = useRouter();

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    
    // Simulate API call to your LLM
    setTimeout(() => {
      setResponse({
        title: "Pasta Carbonara",
        description: "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
        ingredients: [
          "350g spaghetti",
          "150g pancetta or guanciale, diced",
          "3 large eggs",
          "50g Pecorino Romano, grated",
          "50g Parmigiano Reggiano, grated",
          "Freshly ground black pepper",
          "Salt to taste"
        ],
        instructions: [
          "Bring a large pot of salted water to boil and cook pasta according to package instructions until al dente.",
          "While pasta cooks, heat a large skillet over medium heat and cook the pancetta until crispy, about 5-7 minutes.",
          "In a bowl, whisk together eggs, grated cheeses, and plenty of black pepper.",
          "Reserve 1/2 cup of pasta water, then drain pasta and immediately add to the skillet with pancetta.",
          "Remove skillet from heat, and quickly stir in the egg and cheese mixture, tossing constantly to create a creamy sauce.",
          "Add a splash of reserved pasta water if needed to loosen the sauce.",
          "Serve immediately with extra grated cheese and black pepper on top."
        ],
        tips: [
          "The heat from the pasta cooks the eggs, but be careful not to scramble them.",
          "Traditional carbonara doesn't include cream - the creaminess comes from the eggs and cheese.",
          "For authentic flavor, use guanciale instead of pancetta if available."
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  // Handle Enter key as submit
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Prevent default newline, treat as submit
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea while typing and manage scrollbar visibility
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 480; // Maximum height before scrollbar appears
      const newHeight = Math.min(scrollHeight, maxHeight);

      // Apply height and scrollbar logic
      textareaRef.current.style.height = `${newHeight}px`;

      // Show scrollbar only if content exceeds maxHeight
      if (scrollHeight > maxHeight) {
        textareaRef.current.classList.add('overflow-auto');
        textareaRef.current.classList.remove('overflow-hidden');
      } else {
        textareaRef.current.classList.add('overflow-hidden');
        textareaRef.current.classList.remove('overflow-auto');
      }
    }
  }, [prompt]);

  const containerRef = useRef(null); // Reference for scrolling

  const handleScroll = () => {
    if (!containerRef.current) return;

    containerRef.current.scrollTo({
      top: isAtTop ? containerRef.current.scrollHeight : 0,
      behavior: 'smooth',
    });

    setIsAtTop(!isAtTop); // Toggle state
  };

  const handleBack = () => {
    router.push('/');
  };

  // Function buttons/icons below the input
  const functionButtons = [
    { icon: '🔍', label: 'Rice' },
    { icon: '💡', label: 'Chicken' },
    { icon: '🧠', label: 'Egg' },
  ];

  const functionButtons2 = [
    { icon: '📊', label: 'BEEF KACCHI' },
    { icon: '🖼️', label: 'Egg Fried Rice' },
    { icon: '💻', label: 'Chicken Fry' },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

      <div className="z-10 w-full max-w-3xl px-4 py-8">
        <button 
          onClick={handleBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </button>

        <div className="flex items-center justify-center mb-8">
          <ChefHat className="h-10 w-10 text-teal-400 mr-3" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            CookbotAI
          </h1>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Good afternoon, {userName}.
        </h1>

        <div className="relative mb-6">
          <form onSubmit={handleSubmit} className="w-full">
            <div ref={containerRef} className="relative">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={handlePromptChange}
                onKeyPress={handleKeyPress} // Handle Enter key
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="What do you want to know?"
                className="w-full p-3 bg-gray-800 text-white border-t-[1px] border-r-[1px] border-l-[1px] border-b-[0px] border-gray-700 rounded-tl-2xl rounded-tr-2xl resize-none overflow-hidden scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                style={{
                  minHeight: '48px', // Initial height
                  maxHeight: '480px', // Maximum height before scrollbar
                  boxShadow: isFocused
                    ? '0 0 10px rgba(100, 200, 255, 0.6), 0 0 20px rgba(100, 200, 255, 0.4)' // Subtle light glow
                    : 'none',
                  transition: 'box-shadow 0.3s ease', // Smooth transition for shadow
                  paddingRight: '40px', // Reduced padding to allow text closer to buttons (adjust as needed)
                  paddingBottom: '40px', // Extra padding for bottom buttons
                  width: '100%', // Ensure full width
                }}
              />
              {/* Upward Arrow Icon (remains in top-right) */}
              <button
                type="button"
                className="absolute top-2 right-5 text-white text-xl bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-600 transition-colors"
                onClick={handleScroll}
                aria-label={isAtTop ? "Scroll to bottom" : "Scroll to top"}
              >
                {isAtTop ? "↓" : "↑"}
              </button>

              {/* Textarea bottom design */}
              <div className='flex justify-between border border-t-[0px] border-r-[1px] border-l-[1px] border-b-[1px] border-gray-700 bg-gray-800 mt-0 rounded-bl-2xl rounded-br-2xl p-3'
                style={{
                  boxShadow: isFocused
                    ? '0 0 10px rgba(100, 200, 255, 0.6), 0 0 20px rgba(100, 200, 255, 0.4)' // Subtle light glow
                    : 'none',
                  transition: 'box-shadow 0.3s ease', // Smooth transition for shadow
                  width: '100%', // Ensure full width
                }}>
                <div className='flex space-y-2 p-2'>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {functionButtons.map((button, index) => (
                      <button
                        key={index}
                        className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors text-sm flex items-center gap-2"
                        onClick={() => setPrompt(prev => prev + ' ' + button.label)}
                      >
                        {button.icon} {button.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2 p-2 order-2">
                  <button
                    type="button"
                    className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                    aria-label="Microphone"
                  >
                    <Mic size={16} />
                  </button>
                  <button
                    type="button"
                    className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                    aria-label="Settings"
                  >
                    <Settings size={16} />
                  </button>
                  <button
                    type="submit"
                    className="p-2 bg-teal-500 rounded-full hover:bg-teal-600 transition-colors"
                    aria-label="Send"
                    disabled={!prompt.trim() || isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="flex justify-center gap-4 mt-4 mb-8 flex-wrap">
            {functionButtons2.map((button, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors text-sm flex items-center gap-2"
                onClick={() => setPrompt(prev => prev + ' ' + button.label)}
              >
                {button.icon} {button.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-10 w-10 text-teal-400 animate-spin mb-4" />
            <p className="text-gray-400">Cooking up the perfect recipe...</p>
          </div>
        )}

        {response && !isLoading && (
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700 animate-fadeIn">
            <h3 className="text-2xl font-bold text-teal-400 mb-2">{response.title}</h3>
            <p className="text-gray-300 mb-6">{response.description}</p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-white border-b border-gray-700 pb-2">Ingredients</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                {response.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-white border-b border-gray-700 pb-2">Instructions</h4>
              <ol className="list-decimal pl-5 space-y-3 text-gray-300">
                {response.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white border-b border-gray-700 pb-2">Chef's Tips</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                {response.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        /* Custom scrollbar styling to match your screenshot (only visible when needed) */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-gray-600 {
          scrollbar-color: #4a5568 #1a202c;
        }
        .scrollbar-track-gray-800 {
          scrollbar-color: #1a202c #4a5568;
        }
      `}</style>
    </div>
  );
}