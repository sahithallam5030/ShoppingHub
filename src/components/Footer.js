import React from "react";
import { IoCall, IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div className="outer-footer">
      <div className="footer-section container">
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
          <h5>About the company</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
            eligendi. Eius fugiat maiores iure unde iusto cupiditate! Corrupti
            nam illum laudantium quae. Sed expedita natus tenetur, adipisci
            assumenda quia? Expedita?
          </p>
          <div className="footer-icons">
            <span className="footer-icon"><FaLinkedin/></span><span className="footer-icon"><FaGithub/></span><span className="footer-icon"><FaInstagram/></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
