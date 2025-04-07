import React from "react";
import "./RetroHeader.css"; // Import the styles

const RetroHeader = () => {
  return (
    <div className="retro-header">
      <div className="header-content">
        <div className="text-info">
          <p><strong>Title -</strong> Retro</p>
          <p><strong>Date -</strong> 15-07-2024</p>
          <p><strong>Time -</strong> 9:12pm</p>
          <p><strong>Poster -</strong> Everyday</p>
          <p><strong>Designer -</strong> Muhtashem</p>
        </div>
        <h1 className="retro-title">retro</h1>
      </div>
      <div className="background-image">
        <img src="/your-image.jpg" alt="Retro Background" />
      </div>
      <p className="poster-no">Poster No <br /> 081/182</p>
      <p className="tagline">Take a Trip to the Past, Retro Style</p>
    </div>
  );
};

export default RetroHeader;
