import React, { useContext, useState } from "react";
import { CrowdFundingContext } from "../Context/CroudFunding"; // Fixed spelling
import { Logo, Menu } from "../Components/index";

const NavBar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuList = ["White Paper", "Project", "Donation", "Members"];

  return (
    <div className="backgroundMain">
      <div className="text-white px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="/"
              aria-label="Company"
              title="Company"
              className="inline-flex items-center mr-8"
            >
              <Logo color="text-white" />
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                Company
              </span>
            </a>
            <ul className="hidden lg:flex items-center space-x-8">
              {menuList.map((el, i) => (
                <li key={i}>
                  <a
                    href="/"
                    aria-label={el}
                    title={el}
                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                  >
                    {el}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {!currentAccount && (
            <ul className="hidden lg:flex items-center space-x-8">
              <li>
                <button
                  onClick={connectWallet}
                  className="inline-flex items-center justify-center h-12 px-6 
                  font-medium tracking-wide text-white transition duration-200 rounded shadow-md 
                  bg-purple-600 hover:bg-purple-800 focus:shadow-outline focus:outline-none"
                  aria-label="Connect Wallet"
                  title="Connect Wallet"
                >
                  Connect Wallet
                </button>
              </li>
            </ul>
          )}

          {/* Mobile Menu */}
          <div className="lg:hidden z-40">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu />
            </button>

            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <a
                      href="/"
                      aria-label="Company"
                      title="Company"
                      className="inline-flex items-center"
                    >
                      <Logo color="text-black" />
                      <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                        Company
                      </span>
                    </a>

                    <button
                      aria-label="Close menu"
                      title="Close menu"
                      className="p-2 -mt-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-500" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L10.6,12l-6.3,6.3
                            c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0L12,13.4l6.3,6.3c0.4,0.4,1,0.4,1.4,0s0.4-1,0-1.4L13.4,12l6.3-6.3
                            C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>

                  <nav>
                    <ul className="space-y-4">
                      {menuList.map((el, i) => (
                        <li key={i}>
                          <a
                            href="/"
                            aria-label={el}
                            title={el}
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-purple-600"
                          >
                            {el}
                          </a>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={connectWallet}
                          className="inline-flex items-center justify-center w-full h-12 px-6 
                          font-medium tracking-wide text-white transition duration-200 rounded shadow-md 
                          bg-purple-600 hover:bg-purple-800 focus:shadow-outline focus:outline-none"
                          aria-label="Connect Wallet"
                          title="Connect Wallet"
                        >
                          Connect Wallet
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
