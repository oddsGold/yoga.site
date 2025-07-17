import React, { useState } from 'react';
import API from "../../../utils/api";

const PaymentButton = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Статичні дані з БД (можна отримувати через API)
    const paymentData = {
        productName: "Доступ до презентації",
        amount: 500, // Сума в гривнях
        currency: "UAH",
        productCount: 1,
        product_id: 1
    };

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        try {
            // 1. Створюємо платіж на бекенді
            const response = await API.createWayForPayPayment(paymentData);
            console.log(response.data);

            // 2. Перенаправляємо на сторінку оплати WayForPay
            if (response.data.paymentUrl) {
                window.location.href = response.data.paymentUrl;
            } else {
                throw new Error('Не отримано URL для оплати');
            }
        } catch (err) {
            setError(err.message || 'Помилка при створенні платежу');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-container">
            <div className="payment-summary">
                <h3>{paymentData.productName}</h3>
                <p>Сума: {paymentData.amount} {paymentData.currency}</p>
            </div>

            <button
                onClick={handlePayment}
                disabled={loading}
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
            >
                {loading ? 'Обробка...' : 'Оплатити'}
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default PaymentButton;
