// pages/api/utils.js

import crypto from 'crypto';

export function verifySignature(order_id, razorpay_payment_id, razorpay_signature, key_secret) {
    const generated_signature = crypto.createHmac('sha256', key_secret)
        .update(order_id + "|" + razorpay_payment_id)
        .digest('hex');

    return generated_signature === razorpay_signature;
}
