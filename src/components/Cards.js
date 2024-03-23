import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
        <ul className='cards__items'>
            <CardItem
              src='images/admin.jpg'
              text='Admin Sign In'
              label='Admin'
              path='/AdminLoginIn'
            />
            <CardItem
              src='images/lec.png'
              text='Lecturer Sign In'
              label='Lecturer'
              path='/LecturerLoginIn'
            />
             <CardItem
              src='images/student.jpg'
              text='Student Sign In'
              label='Student'
              path='/StudentLoginIn'
            />
          </ul>
          </div>
        </div>

          <h1>Check Your Time Tables!</h1>
          <div className='cards__container'>
           <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/7.jpg'
              text='Physical Sciences and Technology Department'
              label='PST'
              path='/PST_TT'
            />
            <CardItem
              src='images/3.jpg'
              text='Food Sciences and Technology Department'
              label='FST'
              path='/FST_TT'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/5.jpg'
              text='Natural Resources Department'
              label='NR'
              path='/NR_TT'
            />
            <CardItem
              src='images/4.jpg'
              text='Sport Sciences and Physical Education Department'
              label='SS & PE'
              path='/Sport_TT'
            />
            {/* <CardItem
              src='images/3.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Adrenaline'
              path='/sign-up'
            /> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;