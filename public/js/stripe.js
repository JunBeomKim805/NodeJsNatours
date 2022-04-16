import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async tourId => {
  try {
    const stripe = Stripe(
      'pk_test_51KoHm9I18Lz1Eq1ircMgMr3nbP2UrXST4jNuEG9E6UlfL21fqNFV9W0hO3VurkMREiX6mXJxzngHYaqVl6kZeCTN00jPTbGtYG'
    );
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
