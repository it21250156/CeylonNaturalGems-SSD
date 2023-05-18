import React from 'react';
import '../CSS/InstPlans.css';

const MonthlyPayment = ({ plans, gem }) => {
  const cal = () => {
    let mpay = 0;
    let fpay = 0;

    let price = gem.price;
    let initial = plans.initialPayment;
    let months = plans.months;

    fpay = (price * initial) / 100;

    mpay = (price - fpay) / months - 1;

    return mpay;
  };

  return (
    <p className="gem-detail-txt">
      Amount to be paid per month : ${plans && gem && cal()}
    </p>
  );
};

export default MonthlyPayment;
