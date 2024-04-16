import React from 'react';
import './CardSign.css';
import CardItemSign from './CardItemSign';

function SignPage() {
  return (
    <div className='cards1'>
      <div className='cards__container1'>
        <div className='cards__wrapper1'>
        <ul className='cards__items1'>
            <CardItemSign
              src='images/admin.jpg'
              text='Admin Sign Up'
              label='Admin'
              path='/AdminSign'
            />
            </ul>
            <ul className='cards__items1'>
            <CardItemSign
              src='images/lec.png'
              text='Lecturer Sign Up'
              label='Lecturer'
              path='/LecturerSign'
            />
             </ul>
            <ul className='cards__items1'>
             <CardItemSign
              src='images/student.jpg'
              text='Student Sign Up'
              label='Student'
              path='/StudentSign'
            />
          </ul>
          </div>
        </div>

         
        </div>
   
  );
}

export default SignPage;