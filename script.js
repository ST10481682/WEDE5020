/* ======================================================
   KAT'S FLORAL BLOSSOM BOUQUET - PART 3 JAVASCRIPT
   Features: navigation, forms, search/sort, lightbox,
   accordions, map, social sharing and DOM enhancements.
====================================================== */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // 1. Highlight the current page in the navigation.
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("nav a[href]").forEach(function (link) {
        if (link.getAttribute("href") === currentPage) {
            link.setAttribute("aria-current", "page");
        }
    });

    // 2. Update the footer year automatically.
    const yearElement = document.getElementById("currentYear");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // 3. Prevent selecting a date in the past on the enquiry form.
    const eventDate = document.getElementById("eventDate");
    if (eventDate) {
        const today = new Date();
        const localToday = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0")
        ].join("-");
        eventDate.min = localToday;
    }

    // 4. Search and sort the existing bouquet gallery without changing its images.
    const bouquetGallery = document.getElementById("bouquetGallery");
    const bouquetSearch = document.getElementById("bouquetSearch");
    const bouquetSort = document.getElementById("bouquetSort");
    const bouquetResults = document.getElementById("bouquetResults");

    if (bouquetGallery) {
        const originalImages = Array.from(bouquetGallery.querySelectorAll("img"));

        function updateBouquets() {
            const term = bouquetSearch ? bouquetSearch.value.trim().toLowerCase() : "";
            const sortMode = bouquetSort ? bouquetSort.value : "default";
            let visibleCount = 0;

            const sortedImages = originalImages.slice();
            if (sortMode === "az") {
                sortedImages.sort((a, b) => (a.alt || "").localeCompare(b.alt || ""));
            } else if (sortMode === "za") {
                sortedImages.sort((a, b) => (b.alt || "").localeCompare(a.alt || ""));
            }

            sortedImages.forEach(function (img) {
                const searchableText = ((img.alt || "") + " " + (img.getAttribute("src") || "")).toLowerCase();
                const matches = searchableText.includes(term);
                img.classList.toggle("is-filtered-out", !matches);
                img.setAttribute("aria-hidden", String(!matches));
                if (matches) visibleCount += 1;
                bouquetGallery.appendChild(img);
            });

            if (bouquetResults) {
                bouquetResults.textContent = visibleCount === 0
                    ? "No bouquets match your search. Try another description."
                    : `Showing ${visibleCount} of ${originalImages.length} bouquets.`;
            }
        }

        if (bouquetSearch) bouquetSearch.addEventListener("input", updateBouquets);
        if (bouquetSort) bouquetSort.addEventListener("change", updateBouquets);
        updateBouquets();
    }

    // 5. Accessible image gallery lightbox for all site gallery images.
    const galleryImages = Array.from(document.querySelectorAll(".image-gallery img"));
    if (galleryImages.length) {
        const overlay = document.createElement("div");
        overlay.className = "lightbox-overlay";
        overlay.hidden = true;
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", "Image gallery viewer");
        overlay.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" type="button" aria-label="Close image viewer">&times;</button>
                <button class="lightbox-previous" type="button" aria-label="Previous image">&#8249;</button>
                <img class="lightbox-image" src="" alt="">
                <button class="lightbox-next" type="button" aria-label="Next image">&#8250;</button>
                <p class="lightbox-caption"></p>
            </div>`;
        document.body.appendChild(overlay);

        const lightboxImage = overlay.querySelector(".lightbox-image");
        const lightboxCaption = overlay.querySelector(".lightbox-caption");
        const closeButton = overlay.querySelector(".lightbox-close");
        let activeImageIndex = 0;
        let lastFocusedElement = null;

        function showImage(index) {
            activeImageIndex = (index + galleryImages.length) % galleryImages.length;
            const sourceImage = galleryImages[activeImageIndex];
            lightboxImage.src = sourceImage.currentSrc || sourceImage.src;
            lightboxImage.alt = sourceImage.alt || "Flower arrangement";
            lightboxCaption.textContent = sourceImage.alt || "Flower arrangement";
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
            if (lastFocusedElement) lastFocusedElement.focus();
        }

        galleryImages.forEach(function (img, index) {
            img.tabIndex = 0;
            img.setAttribute("role", "button");
            img.setAttribute("aria-label", `Enlarge image: ${img.alt || "Flower arrangement"}`);
            img.addEventListener("click", () => openLightbox(index));
            img.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openLightbox(index);
                }
            });
        });

        closeButton.addEventListener("click", closeLightbox);
        overlay.querySelector(".lightbox-previous").addEventListener("click", () => showImage(activeImageIndex - 1));
        overlay.querySelector(".lightbox-next").addEventListener("click", () => showImage(activeImageIndex + 1));
        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) closeLightbox();
        });
        document.addEventListener("keydown", function (event) {
            if (overlay.hidden) return;
            if (event.key === "Escape") closeLightbox();
            if (event.key === "ArrowLeft") showImage(activeImageIndex - 1);
            if (event.key === "ArrowRight") showImage(activeImageIndex + 1);
        });
    }

    // 6. Native details/summary accordions are keyboard accessible by default.
    // Add an enhancement so opening one FAQ closes the others in the same group.
    const faqItems = Array.from(document.querySelectorAll(".services-faq .faq-item"));
    faqItems.forEach(function (item) {
        item.addEventListener("toggle", function () {
            if (item.open) {
                faqItems.forEach(function (otherItem) {
                    if (otherItem !== item) otherItem.open = false;
                });
            }
        });
    });

    // 7. AJAX form submission for Netlify Forms, with HTML5 and custom validation.
    const forms = [
        document.getElementById("enquiryForm"),
        document.getElementById("contactForm")
    ].filter(Boolean);

    forms.forEach(function (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const responseBox = form.querySelector(".form-response");
            const submitButton = form.querySelector('button[type="submit"]');

            if (!form.checkValidity()) {
                form.reportValidity();
                if (responseBox) {
                    responseBox.className = "form-response error";
                    responseBox.textContent = "Please check the highlighted fields and complete the form correctly.";
                }
                return;
            }

            // Extra phone validation: allow South African/international punctuation, require 7-20 characters.
            const phoneInput = form.querySelector('input[type="tel"]');
            if (phoneInput) {
                const phone = phoneInput.value.trim();
                const phonePattern = /^[0-9+() -]{7,20}$/;
                const digitCount = phone.replace(/\D/g, "").length;
                if (!phonePattern.test(phone) || digitCount < 7 || digitCount > 15) {
                    phoneInput.setCustomValidity("Enter a valid phone number containing 7 to 15 digits.");
                    phoneInput.reportValidity();
                    phoneInput.setCustomValidity("");
                    if (responseBox) {
                        responseBox.className = "form-response error";
                        responseBox.textContent = "Please enter a valid contact number.";
                    }
                    return;
                }
            }

            if (eventDate && eventDate.value && eventDate.value < eventDate.min) {
                eventDate.setCustomValidity("Please choose today or a future date.");
                eventDate.reportValidity();
                eventDate.setCustomValidity("");
                return;
            }

            // The form can be validated locally, but only a deployed form endpoint can receive it.
            const isLocalPreview = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
            if (isLocalPreview) {
                if (responseBox) {
                    responseBox.className = "form-response success";
                    responseBox.textContent = "Your form passed validation. To send and store submissions, deploy this website on Netlify and enable Netlify Forms.";
                }
                return;
            }

            const originalButtonText = submitButton ? submitButton.textContent : "";
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Sending...";
            }
            if (responseBox) {
                responseBox.className = "form-response";
                responseBox.textContent = "";
            }

            try {
                const formData = new FormData(form);
                if (!formData.has("form-name")) {
                    formData.append("form-name", form.getAttribute("name") || form.id);
                }
                const encodedData = new URLSearchParams();
                formData.forEach(function (value, key) {
                    encodedData.append(key, value);
                });

                const response = await fetch(form.getAttribute("action") || "/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: encodedData.toString()
                });
                if (!response.ok) throw new Error(`The form endpoint returned ${response.status}.`);

                if (responseBox) {
                    responseBox.className = "form-response success";
                    if (form.id === "enquiryForm") {
                        const name = form.querySelector("#enquiryName").value.trim();
                        const type = form.querySelector("#enquiryType").value;
                        const budget = form.querySelector("#budget").value;
                        const date = form.querySelector("#eventDate").value;
                        let details = `Thank you, ${name}. Your ${type.toLowerCase()} enquiry has been received.`;
                        if (budget) details += ` Your selected budget is ${budget}.`;
                        if (date) details += ` Your requested date is ${date}.`;
                        details += " We will contact you to confirm availability, pricing and the next steps.";
                        responseBox.textContent = details;
                    } else {
                        responseBox.textContent = "Thank you. Your message has been received, and we will get back to you using the contact details provided.";
                    }
                    form.reset();
                    if (eventDate) eventDate.min = new Date().toISOString().slice(0, 10);
                }
            } catch (error) {
                console.error("Form submission error:", error);
                if (responseBox) {
                    responseBox.className = "form-response error";
                    responseBox.textContent = "Sorry, your message could not be submitted. Please try again or contact us at info@katsfloral.co.za.";
                }
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
            }
        });
    });

    // 8. Leaflet map: approximate Nelspruit city-area marker, not a street-level shop pin.
    const mapElement = document.getElementById("businessMap");
    if (mapElement && window.L) {
        const map = L.map(mapElement).setView([-25.4753, 30.9694], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker([-25.4753, 30.9694]).addTo(map)
            .bindPopup("Nelspruit area – approximate location, not a confirmed shop address.")
            .openPopup();
        setTimeout(() => map.invalidateSize(), 150);
    } else if (mapElement) {
        mapElement.textContent = "The map could not load. Please check your internet connection. The business serves the Nelspruit area.";
    }

    // 9. Social sharing uses the actual deployed page URL at the time of sharing.
    const pageUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent("Discover Kat's Floral Blossom Bouquet in Nelspruit.");
    const facebookShare = document.getElementById("facebookShare");
    const whatsappShare = document.getElementById("whatsappShare");
    if (facebookShare) facebookShare.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    if (whatsappShare) whatsappShare.href = `https://wa.me/?text=${shareText}%20${pageUrl}`;

    // 10. Reveal page sections as the visitor scrolls; gracefully fall back if unsupported.
    const revealTargets = document.querySelectorAll("main > section, main > .page-cta");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        revealTargets.forEach(function (element) {
            element.classList.add("reveal-on-scroll");
            revealObserver.observe(element);
        });
    }

    // 11. Smooth in-page links, respecting reduced-motion preferences.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener("click", function (event) {
                const target = document.querySelector(link.getAttribute("href"));
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        });
    }
});
