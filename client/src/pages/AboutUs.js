import React from 'react';
import '../App.css';
import CardItem from '../components/CardItem';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <>
    <div className='cards'>
      <h1>About Us</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/team.jpg'
              text='Meet the team'
              path='/meet-the-team'
            />
            <CardItem
              src='images/phone.jpg'
              text='How it works'
              path='/how-it-works'
            />
             <CardItem
              src='images/cogs.jpg'
              text='Download user manual'
              path='/user-manual' // **Download link here**
            />
          </ul>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default AboutUs;