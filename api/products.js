// Hardcoded product data
const products = [
    {
        id: 1,
        name: "Apple iPhone 13",
        price: 999,
        image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=300&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Samsung Galaxy S22",
        price: 799,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop"
    },
    {
        id: 3,
        name: "MacBook Pro 14",
        price: 1999,
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop"
    },
    {
        id: 4,
        name: "iPad Air",
        price: 599,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop"
    },
    {
        id: 5,
        name: "AirPods Pro",
        price: 249,
        image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=300&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Apple Watch Series 8",
        price: 399,
        image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=300&h=300&fit=crop"
    },
    {
        id: 7,
        name: "Sony WH-1000XM4",
        price: 349,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
    },
    {
        id: 8,
        name: "Dell XPS 13",
        price: 1299,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop"
    },
    {
        id: 9,
        name: "Nintendo Switch",
        price: 299,
        image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=300&h=300&fit=crop"
    },
    {
        id: 10,
        name: "Canon EOS R5",
        price: 3899,
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop"
    },
    {
        id: 11,
        name: "Tesla Model 3 Key Card",
        price: 25,
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&h=300&fit=crop"
    },
    {
        id: 12,
        name: "Bose QuietComfort 35",
        price: 299,
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop"
    },
    {
        id: 13,
        name: "Google Pixel 7",
        price: 599,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop"
    },
    {
        id: 14,
        name: "Surface Pro 9",
        price: 999,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop"
    },
    {
        id: 15,
        name: "Kindle Paperwhite",
        price: 139,
        image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=300&fit=crop"
    }
];

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        // Simulate a small delay
        setTimeout(() => {
            res.status(200).json({
                success: true,
                data: products
            });
        }, 500);
    } else {
        res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }
}
