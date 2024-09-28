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
app.use(express.urlencoded({ extended: true }));

// مسار الـ API الجديد للتعامل مع التحويلات
app.get('/api/new_bridge', async (req, res) => {
    const { ticker_from, ticker_to, network_from, network_to, amount_from, address } = req.query;

    // بناء الرابط المطلوب للـ API
    const apiUrl = `https://trocador.app/api/new_bridge?ticker_from=${ticker_from}&ticker_to=${ticker_to}&network_from=${network_from}&network_to=${network_to}&amount_from=${amount_from}&address=${address}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'API-KEY': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // إعادة البيانات كما هي
        res.json(data);

    } catch (error) {
        console.error('Error fetching API:', error);
        res.status(500).json({ error: 'Failed to fetch rates' });
    }
});

// بدء تشغيل الخادم
app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});
