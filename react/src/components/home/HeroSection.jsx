import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero-section_container">
      <div className="hero-content">
        <div className="hero-motto">Decide Together</div>
        <div className="hero-text">Make decisions together effortlessly</div>
        <div className="hero-btns_container">
          <Link to="/poll/new">
            <button>Create Poll</button>
          </Link>
          <Link to="/browse">
            <button>Browse Polls</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
