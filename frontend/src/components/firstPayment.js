import React from 'react';

const FirstPayment = ({ plans , gem }) => {
    const cal = () => {
        let fpay=0;

        let price = gem.price;
        let initial = plans.initialPayment;
    
        fpay = (price * initial) / 100;

        localStorage.setItem('TamountInfo', fpay);
    
        return fpay;
    };

    return(
        <p> Payment : ${plans && gem && cal()} </p>
    );
    

}

export default FirstPayment