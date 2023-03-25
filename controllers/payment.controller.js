const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);

// POST /api/payment
const createPayment = async (req, res) => {
  try {
    const { amount, email, reference, callback_url } = req.body;

    // Create a payment request with Paystack
    let paymentRequest = await paystack.transaction.initialize({
      amount: amount * 100,
      email,
      reference,
      callback_url,
    });

    // Return the payment authorization URL to the client
    return res.status(200).json({ authorizationUrl: paymentRequest.data.authorization_url });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Issues"
    });
  }
};

// POST /api/payment/callback
const handleCallback = async (req, res, next) => {
  try {
    const { reference } = req.query;

    // Verify the payment with Paystack
    let paymentVerification = await paystack.transaction.verify(reference);

    // Handle the payment succeeded event
    if (paymentVerification.data.status === 'success') {
      // Do something with the payment verification data, e.g. update order status
      console.log('Payment succeeded:', paymentVerification.data);

      // Redirect the user to the success page
      return res.redirect('/success');
    }

    // Redirect the user to the error page
    return res.redirect('/error');
  } catch (err) {
    console.log(err);
    return res.status({
      message: "Server Issues"
    });
  }
};


module.exports = {
  createPayment,
  handleCallback,
};