export const products = [
  {
    id: 1,
    title: "Premium Thekua (8 Pcs)",
    price: 399,
    oldPrice: 499, // Added based on discount logic
    description: "Authentic taste made with Wheat flour, Sugar, Ghee, Cashews, Almonds, and Love.",
    tag: "Best Seller",
    // Extracted from your PDF [cite: 4, 6]
    ingredients: ["Pure Ghee", "Cashews", "Almonds", "Suji"], 
    nutrition: {
      energy: "250 Kcal",
      protein: "5g",
      carbs: "60g",
      fat: "32g"
    },
    images: [
      "/assets/thekua01.jpeg",
      "/assets/thekua03.jpeg"
    ]
  },
  {
    id: 2,
    title: "Premium Thekua (15 Pcs)",
    price: 599,
    oldPrice: 799,
    description: "The perfect family pack. Loaded with dry fruits and traditional flavor.",
    tag: "Family Value Pack",
    // Extracted from your PDF [cite: 26, 28]
    ingredients: ["Pure Ghee", "Cashews", "Almonds", "Milk"],
    nutrition: {
      energy: "250 Kcal",
      protein: "5g",
      carbs: "60g",
      fat: "32g"
    },
    images: [
      "/assets/thekua02.jpeg",
      "/assets/thekua03.jpeg"
    ]
  }
];