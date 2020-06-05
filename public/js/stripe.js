/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_Mi9wi3pJebfBF5KATEvaNtvM00UWIoxNvB');

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/booking/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    // console.log(err);
    showAlert('error', err);
  }
};
