import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
   
    const navigate = useNavigate();

    const openInNewTab = (url) => {
      window.open(url, '_blank', 'noreferrer');
    };

  return (
    <div className='hero-container'>
      <video src='/videos/SUSL.mp4' autoPlay loop muted />
      <h1>DISCOVER & SECURE</h1>
      <p>Allocate Your Lecture Space</p>

      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={() => navigate('/sign-up')}

        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={() => openInNewTab("https://www.youtube.com/watch?v=GvkPvJhNljs")}
>
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;