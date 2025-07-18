import React, { useState } from 'react';
import API from '../../../utils/api';

const PaymentButton = ({ isValid, dirty, isLoading, formData, validateForm, setFieldTouched }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePayment = async () => {
        try {
            Object.keys(formData).forEach(field => {
                setFieldTouched(field, true, false);
            });

            const errors = await validateForm();

            if (Object.keys(errors).length > 0) {
                return;
            }

            setLoading(true);
            setError(null);

            const { data } = await API.generateSignature(formData);

            const wayforpay = new window.Wayforpay();

            wayforpay.run({
                    merchantAccount: data.merchantAccount,
                    merchantDomainName: data.merchantDomainName,
                    merchantTransactionSecureType: 'AUTO',
                    merchantSignature: data.signature,
                    orderReference: data.orderReference, //номер замовлення з БД
                    orderDate: data.orderDate,
                    amount: data.amount,
                    currency: data.currency,
                    productName: [data.productNames],
                    productPrice: [data.productPrices],
                    productCount: [data.productCounts],
                    straightWidget: true,
                    clientEmail: 'user@example.com',
                    language: 'UA',
                },
                // 1. Успішна оплата (Approved)
                async (response) => {
                    try {
                        await API.updateStatus({
                            ...response,
                            transactionStatus: response.transactionStatus || 'Approved',
                            wfpReasonCode: response.reasonCode,
                            wfpReason: response.reason
                        });
                        console.log('Успішний платіж:', response);
                    } catch (error) {
                        console.error('Помилка оновлення статусу:', error);
                    }
                },
                // 2. Відмова (Declined)
                async (response) => {
                    await API.updateStatus({
                        ...response,
                        transactionStatus: response.transactionStatus || 'Declined',
                        wfpReasonCode: response.reasonCode,
                        wfpReason: response.reason
                    });
                    setError(response.reason || 'Платіж відхилено');
                },
                // 3. Обробка (InProcessing/Pending)
                async (response) => {
                    try {
                        await API.updateStatus({
                            ...response,
                            transactionStatus: response.transactionStatus || 'InProcessing',
                            wfpReasonCode: response.reasonCode,
                            wfpReason: response.reason
                        });
                        console.log('Платіж в обробці:', response);
                    } catch (error) {
                        console.error('Помилка оновлення статусу:', error);
                    }
                });

        } catch (error) {
            setError('Сталася помилка при спробі оплати');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-container text-center">
            <div
                onClick={handlePayment}
                className={`btn btn-base btn-default orange ${isValid && dirty ? 'ready' : 'disabled'}`}
                disabled={!(isValid && dirty) || isLoading}
            >
                Оплатити
            </div>
            {error && <div className="payment-error">{error}</div>}
        </div>
    );
};

export default PaymentButton;
