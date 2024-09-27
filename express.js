const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// ضع هنا مفتاح الـ API الخاص بك
const API_KEY = '7tBZyGqwxjxHLkX6CAqvnDgUJPLttm';  // استبدلها بمفتاح الـ API الخاص بك

app.use(express.json());

app.post('/api/new_rate', async (req, res) => {
    const { ticker_from, network_from, ticker_to, network_to, amount_from } = req.body;

    // بناء الرابط المطلوب للـ API
    const apiUrl = `https://trocador.app/api/new_rate?ticker_from=${ticker_from}&network_from=${network_from}&ticker_to=${ticker_to}&network_to=${network_to}&amount_from=${amount_from}`;

    try {
        // طلب البيانات من الـ API باستخدام GET
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY, // نضع الـ API Key في الترويسة
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();

        // التحقق مما إذا كان هناك trade_id في الاستجابة
        if (data.trade_id) {
            // إعادة توجيه المستخدم إلى صفحة الدفع باستخدام trade_id
            const paymentUrl = `https://trocador.app/checkout/${data.trade_id}`;
            res.redirect(paymentUrl);
        } else {
            // عرض البيانات إذا لم يكن هناك trade_id
            res.json(data);
        }

    } catch (error) {
        console.error('Error fetching API:', error);
        res.status(500).json({ error: 'Failed to fetch rates' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});
