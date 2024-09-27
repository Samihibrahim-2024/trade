const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

// إعداد المنفذ
const PORT = 3000;

// استخدام CORS بشكل عام مع تخصيص الأصل
app.use(cors({
    origin: 'https://pusdt.io' // اسم المجال الذي تريد السماح له
}));

// التعامل مع البيانات المرسلة في النموذج
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مسار الـ API الوكيل
app.get('/api/new_rate', async (req, res) => {
    const apiUrl = 'https://trocador.app/api/new_rate';

    // الحصول على المعلمات من استعلام URL
    const { ticker_from, network_from, ticker_to, network_to, amount_from } = req.query;

    // بناء URL مع المعلمات المعدلة
    const urlWithParams = `${apiUrl}?ticker_from=${encodeURIComponent(ticker_from)}&ticker_to=${encodeURIComponent(ticker_to)}&network_from=${encodeURIComponent(network_from)}&network_to=${encodeURIComponent(network_to)}&amount_from=${encodeURIComponent(amount_from)}`;

  
    try {
        const response = await fetch(urlWithParams, {
            method: 'GET',
            headers: {
                'API-KEY': '7tBZyGqwxjxHLkX6CAqvnDgUJPLttm'
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
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
