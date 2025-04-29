'use client';

import { useState } from 'react';
import { Menu, X, Moon, Sun, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-10 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">LILY.TECH</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="hover:text-blue-500 transition">Home</a>
              <a href="#" className="hover:text-blue-500 transition">Journey</a>
              <a href="#" className="hover:text-blue-500 transition">Projects</a>
              <a href="#" className="hover:text-blue-500 transition">Learning</a>
              <a href="#" className="hover:text-blue-500 transition">Contact</a>
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-800 transition">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            
            <div className="md:hidden flex items-center">
              <button onClick={toggleDarkMode} className="p-2 mr-2 rounded-full hover:bg-gray-800 transition">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={toggleMobileMenu} className="p-2 rounded-full hover:bg-gray-800 transition">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition">Home</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition">Journey</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition">Projects</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition">Learning</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition">Contact</a>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero section */}
      <main className="pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center">
            <div className="md:w-2/3 md:pr-8">
              <div className={`inline-block px-3 py-1 rounded-md text-sm font-medium mb-4 ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
                Chemical Engineer → Blockchain Developer
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Hi, I'm Lily.<br />Learning to Code & Build</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-80">I'm transitioning from chemical engineering to blockchain development, exploring Ethereum and Solidity.</p>
              <div className="flex space-x-4">
                <a href="#projects" className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium transition`}>My Projects</a>
                <a href="#journey" className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} font-medium transition`}>My Journey</a>
              </div>
            </div>
            <div className="md:w-1/3 mt-8 md:mt-0 flex justify-center">
              <div className={`w-48 h-48 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center overflow-hidden`}>
                <span className="text-6xl">👩‍🔬</span>
              </div>
            </div>
          </div>
          
          {/* Learning journey section */}
          <section id="journey" className="mt-24">
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold">My Learning Journey</h2>
              <div className={`flex-grow ml-4 h-px ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
            </div>
            
            <div className={`relative border-l-2 ${darkMode ? 'border-gray-800' : 'border-gray-200'} pl-8 ml-4 space-y-12`}>
              <div>
                <div className={`absolute -left-3 w-6 h-6 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center`}>
                  <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2020 - 2022</div>
                <h3 className="text-xl font-bold mt-1 mb-2">Chemical Engineering Career</h3>
                <p className="opacity-80">Worked as a process engineer focusing on optimization and efficiency. Developed problem-solving skills and analytical thinking.</p>
              </div>
              
              <div>
                <div className={`absolute -left-3 w-6 h-6 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center`}>
                  <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2023</div>
                <h3 className="text-xl font-bold mt-1 mb-2">Programming Fundamentals</h3>
                <p className="opacity-80">Started learning web development basics. Completed online courses in HTML, CSS, JavaScript, and React fundamentals.</p>
              </div>
              
              <div>
                <div className={`absolute -left-3 w-6 h-6 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center`}>
                  <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2024 - Present</div>
                <h3 className="text-xl font-bold mt-1 mb-2">Blockchain Development</h3>
                <p className="opacity-80">Discovered blockchain technology and began specializing in Ethereum development. Learning Solidity and building DApps.</p>
              </div>
            </div>
          </section>
          
          {/* Skills section */}
          <section className="mt-24">
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold">Skills I'm Learning</h2>
              <div className={`flex-grow ml-4 h-px ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'JavaScript', level: 'Intermediate', icon: '🚀' },
                { name: 'React', level: 'Beginner', icon: '⚛️' },
                { name: 'Solidity', level: 'Learning', icon: '🔗' },
                { name: 'Next.js', level: 'Beginner', icon: '📱' },
                { name: 'Ethereum', level: 'Learning', icon: '💎' },
                { name: 'Web3.js', level: 'Beginner', icon: '🌐' },
                { name: 'Git', level: 'Intermediate', icon: '📂' },
                { name: 'Chemical Engineering', level: 'Expert', icon: '🧪' }
              ].map((skill, index) => (
                <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} transition`}>
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">{skill.icon}</span>
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <div className={`inline-block px-2 py-1 text-xs rounded-full ${
                    skill.level === 'Expert' 
                      ? (darkMode ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                      : skill.level === 'Intermediate'
                        ? (darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800')
                        : skill.level === 'Beginner'
                          ? (darkMode ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-100 text-yellow-800')
                          : (darkMode ? 'bg-purple-900 text-purple-100' : 'bg-purple-100 text-purple-800')
                  }`}>
                    {skill.level}
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Projects section */}
          <section id="projects" className="mt-24">
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold">Learning Projects</h2>
              <div className={`flex-grow ml-4 h-px ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Simple Ethereum Token',
                  description: 'My first Solidity project - an ERC-20 token implementation with basic functionality.',
                  tags: ['Solidity', 'ERC-20', 'Ethereum'],
                  emoji: '🪙'
                },
                {
                  title: 'Blockchain Explorer',
                  description: 'A simple web app to explore Ethereum blockchain data and transactions.',
                  tags: ['React', 'Web3.js', 'API'],
                  emoji: '🔍'
                }
              ].map((project, index) => (
                <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-lg transition hover:scale-[1.02]`}>
                  <div className={`h-48 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                    <span className="text-5xl">{project.emoji}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <div className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
                        Learning Project
                      </div>
                    </div>
                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className={`px-2 py-1 text-xs rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <h3 className="text-xl font-bold mb-3">Looking to Learn and Collaborate</h3>
              <p className="mb-4">I'm at the beginning of my development journey and eager to learn through real projects. If you're looking for a motivated beginner with a chemical engineering background, I'd love to collaborate!</p>
              <a href="#contact" className="inline-block px-4 py-2 bg-white text-blue-700 rounded-lg font-medium transition hover:bg-gray-100">
                Get in Touch
              </a>
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'} py-12`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-bold text-xl">LILY.TECH</span>
              <p className="mt-2">From chemical formulas to code blocks.</p>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full hover:bg-gray-700 transition">
                <Github size={20} />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-gray-700 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-gray-700 transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-gray-700 transition">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
            <p>&copy; {new Date().getFullYear()} Lily Wang. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
