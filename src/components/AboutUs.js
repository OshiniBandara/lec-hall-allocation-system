import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='aboutus'>
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
         This is Lecture Hall Management System of Faculty of Applied Sciences. 
        </p>
        <p className='footer-subscription-text'>
          Sabaragamuwa University of Sri Lanka
        </p>
        
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>The University</h2>
            <Link to='/About'>About Us</Link>
            <a href = 'https://www.sab.ac.lk/vision-mission'>Vision & Mission</a>
            <a href='https://www.sab.ac.lk/history'>History</a>
            <a href='https://www.sab.ac.lk/chancellor'>Chancellor</a>
            <a href='https://www.sab.ac.lk/overview'>Overview</a>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <a href='https://www.sab.ac.lk/contact'>Contact</a>
            <a href='https://www.sab.ac.lk/online-video-tutorials'>Support</a>
            <a href='https://www.sab.ac.lk/crkd/susl-journal-about'>Publications</a>
            <a href='https://www.sab.ac.lk/center-for-computer-studies'>Centers</a>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Departments</h2>
            <a href='https://www.sab.ac.lk/app/physical-sciences-and-technologies'>PST</a>
            <a href='https://www.sab.ac.lk/app/food-science-and-technology'>FST</a>
            <a href='https://www.sab.ac.lk/app/natural-resources'>NR</a>
            <a href='https://www.sab.ac.lk/app/sport-sciences-and-physical-education'>Sport</a>
          </div>
          <div class='footer-link-items'>
            <h2>Social Media</h2>
            <a href='https://www.linkedin.com/school/sabaragamuwa-university/'>LinkedIn</a>
            <a href='https://web.facebook.com/susl.official?_rdc=1&_rdr'>Facebook</a>
            <a href='https://www.youtube.com/channel/UCr6N1fR_Lb9ftvHwqCsadSg'>Youtube</a>
            <a href='https://twitter.com/susl_official'>Twitter</a>
          </div>
        </div>
      </div>
      {/* <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <a href='/' className='social-logo'>
              SUSL
              <i class='fab fa-typo3' />
            </a>
          </div>
          <small class='website-rights'>SUSL © 2024</small>
          <div class='social-icons'>
            <a href
              class='social-icon-link facebook'
              to='https://web.facebook.com/susl.official?_rdc=1&_rdr'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </a>
            <a href
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </a>
            <a href
              class='social-icon-link youtube'
              to='https://www.youtube.com/channel/UCr6N1fR_Lb9ftvHwqCsadSg'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </a>
            <a href
              class='social-icon-link twitter'
              to='https://twitter.com/susl_official'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </a>
            <a href
              class='social-icon-link twitter'
              to='https://www.linkedin.com/school/sabaragamuwa-university/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </a>
          </div>
        </div>
      </section> */}
    </div>
    </div>
  );
}

export default Footer;