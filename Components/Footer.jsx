import React from "react";

const Footer = () => {
  const productList = ["Market", "ERC20 Token", "Donation"];
  const contactList = [
    "supportcrypto@gmail.com",
    "info@example.com",
    "contact us",
  ];
  const usefulLink = ["Home", "About us", "Company Bio"];

  return (
    <footer className="text-center text-white backgroundMain lg:text-left">
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Crypto King
            </h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
              dolores? Cumque mollitia asperiores possimus labore deleniti
              quidem, dolor libero laborum vel at nobis quo quisquam repellendus
              ipsum velit perspiciatis repellat.
            </p>
          </div>
          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Products
            </h6>
            {productList.map((el, i) => (
              <p className="mb-4" key={i}>
                <a href="#">{el}</a>
              </p>
            ))}
          </div>
          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Useful Links
            </h6>
            {usefulLink.map((el, i) => (
              <p className="mb-4" key={i}>
                <a href="#">{el}</a>
              </p>
            ))}
          </div>
          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            {contactList.map((el, i) => (
              <p className="mb-4" key={i}>
                <a href="#">{el}</a>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="backgroundMain  p-6 text-center ">
        <span> &copy; 2025 Copyright: </span>
        <a
          className="font-semibold"
          href="https://exchange-proxy-mihir.work-mihirkate.workers.dev/api/v1/klines?symbol=PEPE_USDC&interval=1h&startTime=1737156600&endTime=1737259200"
        >
          Crypto King
        </a>
      </div>
    </footer>
  );
};

export default Footer;
