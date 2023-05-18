import React from 'react';
import '../CSS/InstPlans.css';

const FirstPayment = ({ plans, gem }) => {
  const cal = () => {
    let fpay = 0;

    let price = gem.price;
    let initial = plans.initialPayment;

    fpay = (price * initial) / 100;

    localStorage.setItem('TamountInfo', fpay);

    return fpay;
  };

  return <p className="gem-detail-txt"> Payment : ${plans && gem && cal()} </p>;
};

export default FirstPayment;
