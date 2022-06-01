import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import {Button} from '../components/Button'

const SignUpCards = () => {
  return (
    <div className='cards'>
      <h1>Sign up</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/roadsideassistance.jpg'
              text='Sign Up as Assistance Professional'
              path='/signup-ap'
            />
            <CardItem
              src='images/motorist.jpg'
              text='Sign Up as Motorist'
              path='/signup-motorist'
            />
          </ul>
        </div>
        <Button 
          linkto='/login'
          buttonStyle='btn--filled' 
          buttonSize='btn--large'>
          Have an account? Log in
        </Button>
      </div>
    </div>
  );
}

export default SignUpCards;
