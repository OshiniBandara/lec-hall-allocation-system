import React from 'react';
import { Link } from 'react-router-dom';

function CardItemSign(props) {
  return (
    <>
      <li className='cards__item1'>
        <Link className='cards__item1__link' to={props.path}>
          <figure className='cards__item1__pic-wrap' data-category={props.label}>
            <img
              className='cards__item1__img'
              alt={props.text} 
              src={props.src}
            />
          </figure>
          <div className='cards__item1__info'>
            <h5 className='cards__item1__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItemSign;
