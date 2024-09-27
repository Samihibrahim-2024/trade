const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // استيراد مكتبة CORS
const app = express();
const port = 3000;

// ضع هنا مفتاح الـ API الخاص بك
const API_KEY = '7tBZyGqwxjxHLkX6CAqvnDgUJPLttm';  // استبدلها بمفتاح الـ API الخاص بك

app.use(cors({
    origin: 'https://pusdt.io' // اسم المجال الذي تريد السماح له
}));

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
        
        // إعادة البيانات كما هي بدلاً من إعادة التوجيه
        res.json(data);

    } catch (error) {
        console.error('Error fetching API:', error);
        res.status(500).json({ error: 'Failed to fetch rates' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});
