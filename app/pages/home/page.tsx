"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans bg-white text-brand-dark overflow-x-hidden min-h-screen pb-20">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center" data-purpose="main-nav">
        <div className="flex items-center space-x-1">
          <span className="text-2xl font-bold text-gray-800">M</span>
          <span className="text-2xl font-bold text-brand-orange">C</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a className="text-brand-orange font-medium" href="#">Home</a>
          <Link className="text-brand-gray font-medium hover:text-brand-orange transition-colors" href="/pages/personal-information">Apply</Link>
          <a className="text-brand-gray font-medium hover:text-brand-orange transition-colors" href="#">My applications</a>
          <a className="text-brand-gray font-medium hover:text-brand-orange transition-colors" href="#">Admission offers</a>
        </div>
        
        {/* Nav Actions */}
        <div className="flex items-center space-x-4">
          <button aria-label="Notifications" className="relative p-1 text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-brand-orange rounded-full border-2 border-white"></span>
          </button>
          <button aria-label="User Profile" className="p-1 text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 pt-12 pb-24" data-purpose="hero-section">
        <div className="flex flex-col lg:flex-row items-center relative">
          {/* Hero Text */}
          <div className="w-full lg:w-1/2 z-10 lg:pr-12 mb-12 lg:mb-0 relative">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-gray-600 uppercase">
              Your <span className="text-brand-orange">Learning</span><br/>
              <span className="bg-white py-1 px-2 -ml-2 rounded-lg shadow-sm">Journey Begins</span><br/>
              Here.
            </h1>
          </div>
          
          {/* Hero Image */}
          <div className="w-full lg:w-1/2 relative lg:absolute lg:right-0 lg:-top-8">
            <div 
              className="rounded-[2.5rem] overflow-hidden shadow-xl min-h-[400px] lg:min-h-[500px] relative" 
               >
              <Image 
                alt="Student smiling and walking on campus" 
                className="object-cover object-center" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO9g7shJ8SNRajnfMAiTlkFzIkZDUlS9L1TeCWO6PTu04bJDg-TwkvDCzqZsNXKjtc2Pt8kstE_rj0UPBTdFgf_3I3Mvc7xMKCklSRh6jVUixzY430ScPPFocJ-Y3e8uRJM8bQQBq7VV9WxeOJT7CPrW77kZ-xrUN-4x_F2-SmprxAKHQcOzsgHrnG2fjgN19TIbnTbiia4yu8VBXoB4b8Tg3T1PA2K0Nk2kEf28u744VfDvUBis1G"
                fill
                unoptimized
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20 mt-10 md:mt-20 lg:mt-32" data-purpose="features-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Title and Image */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-12 leading-tight">
              Trusted by thousands<br/>of Malawians
            </h2>
            <div className="rounded-3xl overflow-hidden shadow-lg h-[400px] md:h-[500px] lg:h-[600px] relative">
              <Image 
                alt="Students studying in a classroom" 
                className="object-cover object-center" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6anSkyCJTL6l54wg1XMV-N_DAKSnbPbJtlWafV-MMtrbTyvm6UZrUAWyxGl_p4zTzMIQ4QnIawtNJakG3l2YksZWJLkIjmM_a5pKrNQ8wA2GJd491gaI3mbAD5_JhnBCBW-WIlMSt3TT7wGNEs2myp79krBqk5e0KlypLl7CYc9AFEFUWj-Qvkg2B0T6-DqDtH7NgDPdzRJxr_bKgRuwM_8LezbkFIWiX9lwmDu5XzXbtfdJodn0Q"
                fill
                unoptimized
              />
            </div>
          </div>
          
          {/* Right Column: Interactive Cards */}
          <div className="relative pl-4 sm:pl-8 border-l-2 border-transparent lg:border-gray-200 py-4 flex flex-col gap-10">
            {/* Active indicator line (Desktop only) */}
            <div className="hidden lg:block absolute left-[-2px] top-4 h-24 w-1 bg-gray-800 rounded-full"></div>
            
            {/* Card 1: Explore Programs */}
            <div className="relative w-full max-w-md mr-auto lg:ml-auto">
              <div className="border border-gray-200 bg-white p-6 rounded-3xl rounded-br-none shadow-sm relative z-10 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 011.875 1.875v11.25a1.875 1.875 0 01-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V6.375c0-1.036.84-1.875 1.875-1.875z" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Explore our undergraduate<br className="hidden sm:block" />programs.</h3>
                  <p className="text-sm text-gray-600">Explore from a vast amount of programs<br className="hidden sm:block" />that we offer</p>
                </div>
              </div>
              <button className="absolute -bottom-10 right-0 border border-gray-200 bg-white py-2 px-6 rounded-full rounded-tl-none shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center  group z-0">
                <svg className="w-6 h-6 text-gray-600 group-hover:translate-x-1 transition-transform " fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
            
            {/* Card 2: How to apply */}
            <div className="relative w-full max-w-md mr-auto lg:ml-auto mt-4">
              <div className="border border-gray-200 bg-white p-6 rounded-3xl rounded-br-none shadow-sm relative z-10 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-xl">
                    ?
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 pt-1">How to apply</h3>
                  <p className="text-sm text-gray-600">A guide, how to apply any program</p>
                </div>
              </div>
              <button className="absolute -bottom-10 right-0 border border-gray-200 bg-white py-2 px-6 rounded-full rounded-tl-none shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center group z-0">
                <svg className="w-6 h-6 text-gray-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
            
            {/* Card 3: Payments */}
            <div className="relative w-full max-w-md mr-auto lg:ml-auto mt-4">
              <div className="border border-gray-200 bg-white p-6 rounded-3xl rounded-br-none shadow-sm relative z-10 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 pt-1">Payments</h3>
                  <p className="text-sm text-gray-600">Explore various ways of processing<br className="hidden sm:block" />payments</p>
                </div>
              </div>
              <button className="absolute -bottom-10 right-0 border border-gray-200 bg-white py-2 px-6 rounded-full rounded-tl-none shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center group z-0">
                <svg className="w-6 h-6 text-gray-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
