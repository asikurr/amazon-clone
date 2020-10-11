import React from 'react';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOut from './CheckOut';
import SimpleForm from './SimpleForm';

const stripePromise = loadStripe('pk_test_FfAOm8Pl0nHG7lorvQjdnMuH008kblWMmd');

const PaymentProcess = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            {/* <CheckOut/> */}
            <SimpleForm handlePayment={handlePayment} />
       </Elements>
    );
};

export default PaymentProcess;