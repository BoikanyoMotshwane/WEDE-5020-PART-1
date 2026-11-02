
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const tabButtons =
        document.querySelectorAll(".about-tab");

    const aboutSections =
        document.querySelectorAll(".about-section");

    tabButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedSection =
                button.dataset.section;

            tabButtons.forEach(function (tab) {
                tab.classList.remove("active");
            });

            aboutSections.forEach(function (section) {
                section.classList.remove("active");
            });

            button.classList.add("active");

            const sectionToShow =
                document.getElementById(selectedSection);

            if (sectionToShow) {
                sectionToShow.classList.add("active");
            }
        });
    });

    const businessYears =
        document.getElementById("businessYears");

    if (businessYears) {
        const currentYear = new Date().getFullYear();
        const foundedYear = 1998;
        const yearsOperating = currentYear - foundedYear;

        businessYears.textContent =
            `ZentrixZA Electronics has been operating ` +
            `for approximately ${yearsOperating} years.`;
    }

    const lightbox =
    document.getElementById("imageLightbox");

    const largeAboutImage =
    document.getElementById("largeAboutImage");

    const closeImageLightbox =
    document.getElementById("closeImageLightbox");

    const lightboxTriggers =
    document.querySelectorAll(".lightbox-trigger");

    lightboxTriggers.forEach(function (image) {
    image.addEventListener("click", function () {
        largeAboutImage.src = image.src;
        largeAboutImage.alt = image.alt;
        lightbox.hidden = false;
    });
});

 thumbnails.forEach(thumb => {
  thumb.addEventListener('click', () => {

    const fullSizeUrl = thumb.getAttribute('data-fullsrc');
    
    lightboxImg.src = fullSizeUrl;
    
 
    lightbox.classList.add('active');
  });
});


closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
});


lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }

});
if (closeImageLightbox) {
    closeImageLightbox.addEventListener("click", function () {
        lightbox.hidden = true;
    });
}

if (lightbox) {
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.hidden = true;
        }
    });
}

   const mapElement =
    document.getElementById("companyMap");

if (mapElement && typeof L !== "undefined") {
    const map = L.map("companyMap").setView(
        [-26.2041, 28.0473],
        5
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);

    L.marker([51.5074, -0.1278])
        .addTo(map)
        .bindPopup(
            "ZentrixZA Electronics - United Kingdom"
        );

    L.marker([-26.2041, 28.0473])
        .addTo(map)
        .bindPopup(
            "ZentrixZA Electronics - Johannesburg"
        );
}

});
