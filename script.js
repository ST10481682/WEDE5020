/* ======================================================
   KAT'S FLORAL BLOSSOM BOUQUET - PART 3 JAVASCRIPT
   Features:
   1. Active navigation
   2. Automatic footer year
   3. Date validation
   4. Bouquet search and sorting
   5. Image gallery lightbox
   6. FAQ accordions
   7. Form validation and email submission
   8. Leaflet map
   9. Social sharing
   10. Scroll reveal animations
   11. Smooth scrolling
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    // 1. Highlight the current page in the navigation.

    let currentPage = window.location.pathname.split("/").pop();

    if (!currentPage) {
        currentPage = "index.html";
    }

    document.querySelectorAll("nav a[href]").forEach(function (link) {

        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.setAttribute("aria-current", "page");
        }

    });


    // 2. Update the footer year automatically.

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // 3. Prevent selecting a date in the past.

    const eventDate = document.getElementById("eventDate");

    function setMinimumDate() {

        const today = new Date();

        const localToday = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0")
        ].join("-");

        if (eventDate) {
            eventDate.min = localToday;
        }

    }

    setMinimumDate();


    // 4. Bouquet gallery search and sorting.

    const bouquetGallery = document.getElementById("bouquetGallery");
    const bouquetSearch = document.getElementById("bouquetSearch");
    const bouquetSort = document.getElementById("bouquetSort");
    const bouquetResults = document.getElementById("bouquetResults");

    if (bouquetGallery) {

        const originalImages = Array.from(
            bouquetGallery.querySelectorAll("img")
        );

        function updateBouquets() {

            const term = bouquetSearch
                ? bouquetSearch.value.trim().toLowerCase()
                : "";

            const sortMode = bouquetSort
                ? bouquetSort.value
                : "default";

            let visibleCount = 0;

            const sortedImages = originalImages.slice();

            if (sortMode === "az") {

                sortedImages.sort(function (a, b) {
                    return (a.alt || "").localeCompare(b.alt || "");
                });

            } else if (sortMode === "za") {

                sortedImages.sort(function (a, b) {
                    return (b.alt || "").localeCompare(a.alt || "");
                });

            }

            sortedImages.forEach(function (img) {

                const searchableText = (
                    (img.alt || "") + " " +
                    (img.getAttribute("src") || "")
                ).toLowerCase();

                const matches = searchableText.includes(term);

                img.classList.toggle("is-filtered-out", !matches);

                img.setAttribute("aria-hidden", String(!matches));

                if (matches) {
                    visibleCount++;
                }

                bouquetGallery.appendChild(img);

            });

            if (bouquetResults) {

                bouquetResults.textContent = visibleCount === 0
                    ? "No bouquets match your search. Try another description."
                    : `Showing ${visibleCount} of ${originalImages.length} bouquets.`;

            }

        }

        if (bouquetSearch) {
            bouquetSearch.addEventListener("input", updateBouquets);
        }

        if (bouquetSort) {
            bouquetSort.addEventListener("change", updateBouquets);
        }

        updateBouquets();

    }


    // 5. Accessible image gallery lightbox.

    const galleryImages = Array.from(
        document.querySelectorAll(".image-gallery img")
    );

    if (galleryImages.length > 0) {

        const overlay = document.createElement("div");

        overlay.className = "lightbox-overlay";
        overlay.hidden = true;

        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", "Image gallery viewer");

        overlay.innerHTML = `
            <div class="lightbox-content">

                <button class="lightbox-close"
                    type="button"
                    aria-label="Close image viewer">
                    &times;
                </button>

                <button class="lightbox-previous"
                    type="button"
                    aria-label="Previous image">
                    &#8249;
                </button>

                <img class="lightbox-image" src="" alt="">

                <button class="lightbox-next"
                    type="button"
                    aria-label="Next image">
                    &#8250;
                </button>

                <p class="lightbox-caption"></p>

            </div>
        `;

        document.body.appendChild(overlay);

        const lightboxImage = overlay.querySelector(".lightbox-image");
        const lightboxCaption = overlay.querySelector(".lightbox-caption");
        const closeButton = overlay.querySelector(".lightbox-close");
        const previousButton = overlay.querySelector(".lightbox-previous");
        const nextButton = overlay.querySelector(".lightbox-next");

        let activeImageIndex = 0;
        let lastFocusedElement = null;

        function showImage(index) {

            activeImageIndex =
                (index + galleryImages.length) % galleryImages.length;

            const sourceImage = galleryImages[activeImageIndex];

            lightboxImage.src =
                sourceImage.currentSrc || sourceImage.src;

            lightboxImage.alt =
                sourceImage.alt || "Flower arrangement";

            lightboxCaption.textContent =
                sourceImage.alt || "Flower arrangement";

        }

        function openLightbox(index) {

            lastFocusedElement = document.activeElement;

            showImage(index);

            overlay.hidden = false;

            document.body.style.overflow = "hidden";

            closeButton.focus();

        }

        function closeLightbox() {

            overlay.hidden = true;

            document.body.style.overflow = "";

            lightboxImage.removeAttribute("src");

            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }

        }

        galleryImages.forEach(function (img, index) {

            img.tabIndex = 0;

            img.setAttribute("role", "button");

            img.setAttribute(
                "aria-label",
                `Enlarge image: ${img.alt || "Flower arrangement"}`
            );

            img.addEventListener("click", function () {
                openLightbox(index);
            });

            img.addEventListener("keydown", function (event) {

                if (event.key === "Enter" || event.key === " ") {

                    event.preventDefault();

                    openLightbox(index);

                }

            });

        });

        closeButton.addEventListener("click", closeLightbox);

        previousButton.addEventListener("click", function () {
            showImage(activeImageIndex - 1);
        });

        nextButton.addEventListener("click", function () {
            showImage(activeImageIndex + 1);
        });

        overlay.addEventListener("click", function (event) {

            if (event.target === overlay) {
                closeLightbox();
            }

        });

        document.addEventListener("keydown", function (event) {

            if (overlay.hidden) {
                return;
            }

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowLeft") {
                showImage(activeImageIndex - 1);
            }

            if (event.key === "ArrowRight") {
                showImage(activeImageIndex + 1);
            }

        });

    }


    // 6. FAQ accordions.

    const faqItems = Array.from(
        document.querySelectorAll(".services-faq .faq-item")
    );

    faqItems.forEach(function (item) {

        item.addEventListener("toggle", function () {

            if (item.open) {

                faqItems.forEach(function (otherItem) {

                    if (otherItem !== item) {
                        otherItem.open = false;
                    }

                });

            }

        });

    });


    // 7. Form validation and email submission.
    // GitHub Pages does not provide a form-processing backend.
    // This uses the customer's default email application instead.

    const forms = [
        document.getElementById("enquiryForm"),
        document.getElementById("contactForm")
    ].filter(Boolean);

    forms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const responseBox = form.querySelector(".form-response");

            const submitButton = form.querySelector(
                'button[type="submit"]'
            );

            if (!form.checkValidity()) {

                form.reportValidity();

                if (responseBox) {

                    responseBox.className = "form-response error";

                    responseBox.textContent =
                        "Please complete all required fields correctly.";

                }

                return;

            }

            // Validate telephone number.

            const phoneInput = form.querySelector('input[type="tel"]');

            if (phoneInput) {

                const phone = phoneInput.value.trim();

                const phonePattern = /^[0-9+() -]{7,20}$/;

                const digitCount = phone.replace(/\D/g, "").length;

                if (
                    !phonePattern.test(phone) ||
                    digitCount < 7 ||
                    digitCount > 15
                ) {

                    phoneInput.setCustomValidity(
                        "Enter a valid phone number containing 7 to 15 digits."
                    );

                    phoneInput.reportValidity();

                    phoneInput.setCustomValidity("");

                    if (responseBox) {

                        responseBox.className = "form-response error";

                        responseBox.textContent =
                            "Please enter a valid contact number.";

                    }

                    return;

                }

            }

            // Validate event date.

            if (
                eventDate &&
                eventDate.value &&
                eventDate.value < eventDate.min
            ) {

                eventDate.setCustomValidity(
                    "Please choose today or a future date."
                );

                eventDate.reportValidity();

                eventDate.setCustomValidity("");

                return;

            }

            // Prepare email information.

            const formData = new FormData(form);

            const subject = form.id === "enquiryForm"
                ? "New Bouquet Enquiry - Kat's Floral Blossom Bouquet"
                : "New Website Contact Message - Kat's Floral Blossom Bouquet";

            let emailBody = "";

            formData.forEach(function (value, key) {

                emailBody += `${key}: ${value}\n`;

            });

            const emailLink =
                "mailto:info@katsfloral.co.za" +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(emailBody);

            if (responseBox) {

                responseBox.className = "form-response success";

                responseBox.textContent =
                    "Your information is ready. Your email application will open so you can send your message.";

            }

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent = "Opening email...";

            }

            // Open the visitor's default email application.

            window.location.href = emailLink;

            // Restore the submit button.

            setTimeout(function () {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent = "Send Message";

                }

            }, 2000);

        });

    });


    // 8. Leaflet map showing the Nelspruit area.

    const mapElement = document.getElementById("businessMap");

    if (mapElement && window.L) {

        const map = L.map(mapElement).setView(
            [-25.4753, 30.9694],
            13
        );

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 19,

                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'

            }
        ).addTo(map);

        L.marker([-25.4753, 30.9694])
            .addTo(map)
            .bindPopup(
                "Nelspruit area – approximate location, not a confirmed shop address."
            )
            .openPopup();

        setTimeout(function () {
            map.invalidateSize();
        }, 150);

    } else if (mapElement) {

        mapElement.textContent =
            "The map could not load. Please check your internet connection. The business serves the Nelspruit area.";

    }


    // 9. Social sharing.

    const pageUrl = encodeURIComponent(window.location.href);

    const shareText = encodeURIComponent(
        "Discover Kat's Floral Blossom Bouquet in Nelspruit."
    );

    const facebookShare = document.getElementById("facebookShare");

    const whatsappShare = document.getElementById("whatsappShare");

    if (facebookShare) {

        facebookShare.href =
            `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;

    }

    if (whatsappShare) {

        whatsappShare.href =
            `https://wa.me/?text=${shareText}%20${pageUrl}`;

    }


    // 10. Reveal sections when visitors scroll.

    const revealTargets = document.querySelectorAll(
        "main > section, main > .page-cta"
    );

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.08
            }

        );

        revealTargets.forEach(function (element) {

            element.classList.add("reveal-on-scroll");

            revealObserver.observe(element);

        });

    } else {

        revealTargets.forEach(function (element) {

            element.classList.add("is-visible");

        });

    }


    // 11. Smooth scrolling for in-page links.

    if (!reduceMotion) {

        document.querySelectorAll('a[href^="#"]').forEach(function (link) {

            link.addEventListener("click", function (event) {

                const targetId = link.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                const target = document.getElementById(
                    targetId.substring(1)
                );

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            });

        });

    }

});