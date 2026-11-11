
export const recipes = [
    {
        id: 1,
        name: "Vegetable Biryani",
        category: "Indian",
        time: 40,
        preparationTime: 15,
        difficulty: "Medium",
        cuisine: "Indian",
        description: "A delicious and aromatic vegetable biryani prepared with basmati rice, fresh vegetables and traditional spices.",
        image: "🍚",
        servings: 2,

        ingredients: [
            { name: "Basmati Rice", quantity: 1, unit: "cup" },
            { name: "Mixed Vegetables", quantity: 1, unit: "cup" },
            { name: "Onion", quantity: 1, unit: "medium" },
            { name: "Tomato", quantity: 1, unit: "medium" },
            { name: "Biryani Masala", quantity: 1, unit: "tsp" },
            { name: "Oil", quantity: 2, unit: "tbsp" }
        ],

        instructions: [
            "Wash the basmati rice and soak it for 20 minutes.",
            "Heat oil in a cooking pan and add sliced onions.",
            "Add tomatoes, mixed vegetables and biryani masala.",
            "Add the soaked rice and required water.",
            "Cook until the rice is soft and fully cooked.",
            "Serve hot with raita."
        ]
    },

    {
        id: 2,
        name: "Masala Dosa",
        category: "South Indian",
        time: 30,
        preparationTime: 15,
        difficulty: "Easy",
        cuisine: "South Indian",
        description: "A crispy South Indian dosa filled with delicious spiced potato masala, served with chutney and sambar.",
        image: "🥞",
        servings: 2,

        ingredients: [
            { name: "Dosa Batter", quantity: 2, unit: "cups" },
            { name: "Potatoes", quantity: 2, unit: "medium" },
            { name: "Onion", quantity: 1, unit: "medium" },
            { name: "Mustard Seeds", quantity: 0.5, unit: "tsp" },
            { name: "Oil", quantity: 2, unit: "tbsp" }
        ],

        instructions: [
            "Boil the potatoes and mash them.",
            "Heat oil and add mustard seeds and chopped onions.",
            "Add mashed potatoes and mix well.",
            "Heat a dosa pan and spread the batter in a circle.",
            "Add the potato masala and fold the dosa.",
            "Serve hot with chutney and sambar."
        ]
    },

    {
        id: 3,
        name: "Chocolate Cake",
        category: "Dessert",
        time: 50,
        preparationTime: 15,
        difficulty: "Medium",
        cuisine: "International",
        description: "A soft and moist chocolate cake made with flour, cocoa powder, sugar and milk. Perfect for dessert lovers.",
        image: "🍰",
        servings: 4,

        ingredients: [
            { name: "All-purpose Flour", quantity: 1, unit: "cup" },
            { name: "Sugar", quantity: 1, unit: "cup" },
            { name: "Cocoa Powder", quantity: 0.5, unit: "cup" },
            { name: "Milk", quantity: 1, unit: "cup" },
            { name: "Baking Powder", quantity: 1, unit: "tsp" }
        ],

        instructions: [
            "Preheat the oven to 180°C.",
            "Mix flour, sugar, cocoa powder and baking powder.",
            "Add milk and mix until the batter is smooth.",
            "Pour the batter into a greased cake tin.",
            "Bake until a toothpick inserted in the centre comes out clean.",
            "Allow the cake to cool before serving."
        ]
    },

    {
        id: 4,
        name: "Paneer Butter Masala",
        category: "Indian",
        time: 35,
        preparationTime: 15,
        difficulty: "Medium",
        cuisine: "North Indian",
        description: "A rich and creamy Indian curry prepared with soft paneer cubes, butter, cream and aromatic spices.",
        image: "🍛",
        servings: 2,

        ingredients: [
            { name: "Paneer", quantity: 200, unit: "g" },
            { name: "Tomatoes", quantity: 2, unit: "medium" },
            { name: "Butter", quantity: 2, unit: "tbsp" },
            { name: "Cream", quantity: 2, unit: "tbsp" },
            { name: "Garam Masala", quantity: 1, unit: "tsp" }
        ],

        instructions: [
            "Cut paneer into small cubes.",
            "Prepare a tomato-based gravy with spices.",
            "Add butter and cook the gravy.",
            "Add paneer cubes and simmer for a few minutes.",
            "Add cream and garam masala.",
            "Serve hot with roti or rice."
        ]
    },

    {
        id: 5,
        name: "Idli Sambar",
        category: "South Indian",
        time: 25,
        preparationTime: 10,
        difficulty: "Easy",
        cuisine: "South Indian",
        description: "A traditional South Indian breakfast made with soft steamed idlis and flavorful homemade vegetable sambar.",
        image: "🥘",
        servings: 2,

        ingredients: [
            { name: "Idli Batter", quantity: 2, unit: "cups" },
            { name: "Toor Dal", quantity: 0.5, unit: "cup" },
            { name: "Mixed Vegetables", quantity: 1, unit: "cup" },
            { name: "Sambar Powder", quantity: 1, unit: "tbsp" }
        ],

        instructions: [
            "Pour idli batter into greased idli moulds.",
            "Steam until the idlis are cooked.",
            "Cook toor dal until soft.",
            "Add vegetables and sambar powder to the dal.",
            "Simmer until the vegetables are cooked.",
            "Serve hot idlis with sambar."
        ]
    },

    {
        id: 6,
        name: "Fruit Salad",
        category: "Dessert",
        time: 15,
        preparationTime: 10,
        difficulty: "Easy",
        cuisine: "International",
        description: "A refreshing and healthy fruit salad prepared with fresh seasonal fruits and a touch of honey.",
        image: "🥗",
        servings: 2,

        ingredients: [
            { name: "Apple", quantity: 1, unit: "piece" },
            { name: "Banana", quantity: 1, unit: "piece" },
            { name: "Grapes", quantity: 1, unit: "cup" },
            { name: "Honey", quantity: 1, unit: "tbsp" }
        ],

        instructions: [
            "Wash all the fruits properly.",
            "Peel and chop the fruits into small pieces.",
            "Add all the fruits to a bowl.",
            "Add honey and mix gently.",
            "Serve fresh."
        ]
    }
];
