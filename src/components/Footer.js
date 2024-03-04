import React from "react";
import { IoCall, IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div className="outer-footer">
      <div className="footer-section">
        <div className="footer-details">
          <p>
            <FaLocationDot />
            Hyderabad
          </p>
          <p>
            <IoCall />
            +91 9059778895
          </p>
          <p>
            <IoMail /> sahithallam5030@gmail.com
          </p>
        </div>
        <div className="footer-about">
          <h5>About the website</h5>
          <p>
            Shopping Hub is your premier destination for curated trends in
            fashion, tech, and home essentials. We strive to redefine your
            shopping experience, offering a seamless blend of style and
            convenience. Discover excellence with us.
          </p>
          <div className="footer-icons">
            <span className="footer-icon">
              <FaLinkedin />
            </span>
            <span className="footer-icon">
              <FaGithub />
            </span>
            <span className="footer-icon">
              <FaInstagram />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
