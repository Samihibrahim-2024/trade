const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = 3000;

// ضع هنا مفتاح الـ API الخاص بك
const API_KEY = '7tBZyGqwxjxHLkX6CAqvnDgUJPLttm';  // استبدلها بمفتاح الـ API الخاص بك

app.use(cors({
    origin: 'https://pusdt.io' // اسم المجال الذي تريد السماح له
}));

app.use(express.json());

// مسار الـ API
app.get('/api/new_rate', async (req, res) => {
    const { ticker_from, network_from, ticker_to, network_to, amount_from } = req.query;

    // بناء الرابط المطلوب للـ API مع المعلمات
    const urlWithParams = `https://trocador.app/api/new_rate?ticker_from=${encodeURIComponent(ticker_from)}&network_from=${encodeURIComponent(network_from)}&ticker_to=${encodeURIComponent(ticker_to)}&network_to=${encodeURIComponent(network_to)}&amount_from=${encodeURIComponent(amount_from)}`;

    try {
        // طلب البيانات من الـ API باستخدام GET
        const response = await fetch(urlWithParams, {
            method: 'GET',
            headers: {
                'API-KEY': API_KEY // نضع الـ API Key في الترويسة
            }
        });

        if (!response.ok) {
            // إذا لم تكن الاستجابة ناجحة، ارجع خطأ مفصل
            const errorData = await response.json();
            console.error('Error fetching API:', errorData);
            return res.status(response.status).json({ error: errorData.message || 'Failed to fetch rates' });
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
