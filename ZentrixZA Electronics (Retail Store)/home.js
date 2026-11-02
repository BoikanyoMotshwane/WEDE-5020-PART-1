
"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const promotionalTitle = document.getElementById("promotional-title");
    
    const promotionText = document.getElementById("promotionText");

    const nextPromotion = document.getElementById("nextPromotion");

      if (
        !promotionTitle ||
        !promotionText ||
        !nextPromotion
    ) {
        return;
    }
      
       const promotions = [
        {
            title: "Quality Technology at Great Prices",
            text: "Explore our latest electronic products and home appliances."
        },
        {
            title: "Upgrade Your Device Today",
            text: "Discover smartphones, laptops, tablets and accessories."
        },
        {
            title: "Reliable Home Appliances",
            text: "Find televisions, fridges, air fryers and more."
        },
        {
            title: "Professional Repair Services",
            text: "Contact us for honest and reliable electronic repairs."
        }
    ];

    let currentPromotion = 0;

    function showPromotion() {
        const promotion = promotions[currentPromotion];

        promotionTitle.textContent = promotion.title;
        promotionText.textContent = promotion.text;
    }
     
     nextPromotion.addEventListener("click", function () {
        currentPromotion++;

        if (currentPromotion >= promotions.length) {
            currentPromotion = 0;
        }

        showPromotion();
    });

    setInterval(function () {
        currentPromotion++;

        if (currentPromotion >= promotions.length) {
            currentPromotion = 0;
        }

        showPromotion();
         }, 5000);

    showPromotion();
});