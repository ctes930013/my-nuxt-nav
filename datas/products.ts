import type { Product } from '~/types/product'

export const productList: Product[] = [
    {
        id: 1,
        image: "https://youli-fruits.com/wp-content/uploads/2021/08/%E5%A5%97%E8%A2%8B%E8%91%A1%E8%90%84.jpg",
        banner: [
            "https://youli-fruits.com/wp-content/uploads/2021/08/%E5%A5%97%E8%A2%8B%E8%91%A1%E8%90%84.jpg",
            "https://youli-fruits.com/wp-content/uploads/2021/08/%E5%B7%A8%E5%B3%B0%E8%91%A1%E8%90%84.jpg"
        ],
        name: "葡萄",
        price: 100,
        quantity: 0,
        description: "熟成採收｜濃郁果香"
    },
    {
        id: 2,
        image: "https://youli-fruits.com/wp-content/uploads/2021/08/%E7%8E%89%E8%8D%B7%E5%8C%85%E8%8D%94%E6%9E%9D.jpg",
        banner: [
            "https://youli-fruits.com/wp-content/uploads/2021/08/%E7%8E%89%E8%8D%B7%E5%8C%85%E8%8D%94%E6%9E%9D.jpg",
            "https://youli-fruits.com/wp-content/uploads/2021/08/%E9%BB%91%E8%91%89%E8%8D%94%E6%9E%9D.jpg"
        ],
        name: "荔枝",
        price: 50,
        quantity: 0,
        description: "一年一次！季節限定"
    },
    {
        id: 3,
        image: "https://youli-fruits.com/wp-content/uploads/2021/08/%E5%B0%8F%E7%8E%89%E8%A5%BF%E7%93%9C.jpg",
        banner: [
            "https://youli-fruits.com/wp-content/uploads/2021/08/%E5%B0%8F%E7%8E%89%E8%A5%BF%E7%93%9C.jpg"
        ],
        name: "西瓜",
        price: 400,
        quantity: 0,
        description: "甜蜜蜜的好滋味「小玉西瓜」，夏日清涼必備！"
    },
    {
        id: 4,
        image: "https://youli-fruits.com/wp-content/uploads/2021/08/%E7%8E%89%E6%96%87%E8%8A%92%E6%9E%9C.jpg",
        banner: [
            "https://youli-fruits.com/wp-content/uploads/2021/07/%E5%8F%B0%E8%BE%B21%E8%99%9F.jpg",
            "https://youli-fruits.com/wp-content/uploads/2021/08/%E5%A4%8F%E9%9B%AA%E8%8A%92%E6%9E%9C.jpg",
            "https://youli-fruits.com/wp-content/uploads/2021/08/%E8%A5%BF%E6%96%BD%E8%8A%92%E6%9E%9C%E6%8B%B7%E8%B2%9D.jpg"
        ],
        name: "芒果",
        price: 80,
        quantity: 0,
        description: "新品種•甜度高"
    }
];