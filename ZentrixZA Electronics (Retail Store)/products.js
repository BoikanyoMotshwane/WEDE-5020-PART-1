"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const productInput =
        document.getElementById("productName");

    if (!productInput) {
        return;
    }

    const parameters =
        new URLSearchParams(window.location.search);

    const selectedProduct =
        parameters.get("product");

    if (selectedProduct) {
        productInput.value = selectedProduct;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const productCards = Array.from(
        document.querySelectorAll(".card")
    );

    const productSearch = document.getElementById("productSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const priceSort = document.getElementById("priceSort");
    const noProductsMessage =
        document.getElementById("noProductsMessage");

    function getProductName(card) {
        const heading = card.querySelector("h3");
        return heading ? heading.textContent.trim().toLowerCase() : "";
    }

    function getProductPrice(card) {
        const priceElement = card.querySelector(".price");

        if (!priceElement) {
            return 0;
        }

        return Number(
            priceElement.textContent
                .replace("R", "")
                .replace(/\s/g, "")
                .replace(",", "")
        );
    }

    function filterAndSortProducts() {
        const searchText = productSearch.value.trim().toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedSort = priceSort.value;

        let visibleProducts = productCards.filter(function (card) {
            const productName = getProductName(card);
            const productCategory = card.dataset.category;

            const matchesSearch =
                productName.includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                productCategory === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        if (selectedSort === "low-high") {
            visibleProducts.sort(function (firstCard, secondCard) {
                return getProductPrice(firstCard) -
                    getProductPrice(secondCard);
            });
        }

        if (selectedSort === "high-low") {
            visibleProducts.sort(function (firstCard, secondCard) {
                return getProductPrice(secondCard) -
                    getProductPrice(firstCard);
            });
        }

        productCards.forEach(function (card) {
            card.style.display = "none";
        });

        visibleProducts.forEach(function (card) {
            card.style.display = "block";
        });

        noProductsMessage.hidden = visibleProducts.length !== 0;
    }

    
function selectProduct(productName, productPrice) {
    // Store the selected product information.
    sessionStorage.setItem("selectedProduct", productName);
    sessionStorage.setItem("selectedPrice", productPrice);

    // Redirect to the Enquiries page with product details.
    const params = new URLSearchParams({
        product: productName,
        price: productPrice
    });

    window.location.href = "Enquiries.html?" + params.toString();
}

    productSearch.addEventListener(
        "input",
        filterAndSortProducts
    );

    categoryFilter.addEventListener(
        "change",
        filterAndSortProducts
    );

    priceSort.addEventListener(
        "change",
        filterAndSortProducts
    );

    filterAndSortProducts();

    const lightbox = document.getElementById("productLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

const productImages = document.querySelectorAll(".card img");
const productGrid = document.getElementById("allProducts");



productImages.forEach(function (image) {
    image.addEventListener("click", function () {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.hidden = false;
    });
});

closeLightbox.addEventListener("click", function () {
    lightbox.hidden = true;
});

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        lightbox.hidden = true;
    }

function selectProduct(productName, productPrice) {
    const notification =
        document.getElementById("selectionNotification");

    if (!notification) {
        return;
    }

    const formattedPrice =
        new Intl.NumberFormat("en-ZA", {
            style: "currency",
            currency: "ZAR"
        }).format(productPrice);

    notification.textContent =
        `${productName} has been selected for purchase. ` +
        `Price: ${formattedPrice}`;

    notification.hidden = false;

    notification.classList.remove("show");

    // Force the browser to restart the animation.

    document.addEventListener("DOMContentLoaded", function () {
    const productInput =
        document.getElementById("productName");

    if (!productInput) {
        return;
    }

    const parameters =
        new URLSearchParams(window.location.search);

    const selectedProduct =
        parameters.get("product");

    if (selectedProduct) {
        productInput.value = selectedProduct;
    }
});

    void notification.offsetWidth;

    notification.classList.add("show");

    window.clearTimeout(
        window.selectionNotificationTimer
    );

    window.selectionNotificationTimer =
        window.setTimeout(function () {
            notification.hidden = true;
            notification.classList.remove("show");
        }, 4000);
}

function selectProduct(productName, productPrice) {
    const notification =
        document.getElementById("selectionNotification");

    const message =
        document.getElementById("selectedProductMessage");

    const enquiryLink =
        document.getElementById("continueToEnquiry");

    if (!notification || !message || !enquiryLink) {
        return;
    }

    const formattedPrice =
        new Intl.NumberFormat("en-ZA", {
            style: "currency",
            currency: "ZAR"
        }).format(productPrice);

    message.textContent =
        `${productName} selected. Price: ${formattedPrice}`;

    const productParameter =
        encodeURIComponent(productName);

    enquiryLink.href =
        `Enquiries.html?product=${productParameter}`;

    notification.hidden = false;
}
"use strict";

window.selectProduct = function (productName, productPrice) {
    const notification =
        document.getElementById("selectionNotification");

    const message =
        document.getElementById("selectedProductMessage");

    if (!notification || !message) {
        console.error(
            "The notification elements were not found."
        );
        return;
    }

    const formattedPrice =
        new Intl.NumberFormat("en-ZA", {
            style: "currency",
            currency: "ZAR"
        }).format(productPrice);

    message.textContent =
        `${productName} has been selected for purchase. ` +
        `Price: ${formattedPrice}`;

    notification.hidden = false;

    window.clearTimeout(
        window.selectionNotificationTimer
    );

    window.selectionNotificationTimer =
        window.setTimeout(function () {
            notification.hidden = true;
        }, 4000);
};

});


});

