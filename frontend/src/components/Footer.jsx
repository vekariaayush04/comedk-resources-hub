import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 fixed bottom-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-semibold">All Rights Reserved &copy; ComedSark</h1>
        <nav className="flex">
          <ul className="flex">
            <li className="mx-4">
              <Link to="/about">About</Link>
            </li>
            <li className="mx-4">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="mx-4">
              <Link to="/policy">Privacy Policy</Link>
            </li>
          </ul>
          <ul className="flex">
            <li className="mx-2">
              <a href="" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
            </li>
            <li className="mx-2">
              <a href="" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
            </li>
            <li className="mx-2">
              <a href="" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

