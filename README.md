# Kat's Floral Blossom Bouquet

## Website Overview

Kat's Floral Blossom Bouquet is a flower-shop website showcasing handcrafted bouquets, floral services and arrangements for birthdays, anniversaries, graduations and weddings.

The website provides visitors with information about the business, its floral services, available bouquets and special occasion arrangements. Visitors can also use the contact and enquiry forms to express their interest in the services offered in the Nelspruit area.

## Website Pages

The website consists of seven HTML pages:

- `index.html` – Home page introducing Kat's Floral Blossom Bouquet.
- `about.html` – Business introduction, mission and reasons to choose the shop.
- `services.html` – Floral services, gift add-ons, delivery, custom arrangements and interactive FAQs.
- `bouquets.html` – Bouquet information, searchable image gallery and sorting controls.
- `occasions.html` – Floral arrangements for birthdays, anniversaries, graduations and weddings.
- `contact.html` – Contact information, general contact form, WhatsApp contact, approximate Nelspruit map and social sharing.
- `enquiry.html` – Product and service enquiry form, including event, volunteering and sponsorship enquiries.

## Technologies Used

The website was developed using:

- **HTML5:** Semantic elements, structured content and native form validation.
- **CSS3:** Responsive layouts, styling, transitions, focus states and reduced-motion support.
- **JavaScript:** Navigation highlighting, form validation, image lightbox, bouquet search and sorting, FAQ interactions and other dynamic features.
- **Leaflet:** Interactive map functionality.
- **OpenStreetMap:** Map tiles and geographical information.
- **GitHub:** Source-code repository and version control.
- **GitHub Pages:** Free static website hosting and publishing.

## Part 2 Lecturer Feedback Corrections

The following improvements were made based on the lecturer's Part 2 feedback:

- Added semantic `<main>` elements to organise the main content across the website pages.
- Maintained consistent footer sections.
- Ensured the home page has the primary heading "Kat's Floral Blossom Bouquet".
- Ensured the Contact page has a primary `<h1>` heading.
- Improved the heading hierarchy across the website.
- Removed empty heading elements from the Bouquets page.
- Replaced decorative asterisk paragraphs on the Services page with semantic HTML lists.
- Added a consistent seven-page navigation menu.
- Included the Enquiries link in the navigation menu.
- Retained the existing image files and filenames to avoid broken image references.
- Improved image alternative text where necessary.
- Added lazy loading to images where appropriate.

## Part 3 Functionality Implemented

### JavaScript Features

The following interactive features were implemented:

1. **Navigation highlighting:** Automatically identifies and highlights the current page in the navigation menu.

2. **Automatic footer year:** Updates the copyright year automatically.

3. **Date validation:** Prevents visitors from selecting past dates on the enquiry form.

4. **Bouquet search:** Allows visitors to search the existing bouquet gallery using image descriptions and filenames.

5. **Bouquet sorting:** Allows visitors to sort bouquets alphabetically from A-Z and Z-A.

6. **Image lightbox:** Allows visitors to enlarge gallery images.

7. **Lightbox navigation:** Includes previous and next buttons, a close button and Escape-key functionality.

8. **FAQ accordion:** Allows visitors to expand and collapse frequently asked questions on the Services page.

9. **Form validation:** Uses HTML5 validation and additional JavaScript checks for contact information and dates.

10. **Interactive map:** Displays an approximate Nelspruit location using Leaflet and OpenStreetMap.

11. **Social sharing:** Provides Facebook and WhatsApp sharing links.

12. **Scroll animations:** Reveals website sections as visitors scroll down the page.

13. **Smooth scrolling:** Improves navigation between sections of the website.

### Forms

Two separate forms are available:

**1. Contact Form**

The Contact page includes a general-message form where visitors can provide:

- Full name.
- Email address.
- Contact number.
- Message type.
- Message.

**2. Enquiry Form**

The Enquiries page includes a form for visitors interested in:

- Bouquet and floral services.
- Event arrangements.
- Required event dates.
- Estimated budgets.
- Volunteering.
- Sponsorship.
- Additional requirements.

Both forms include required fields and validation to help visitors provide accurate information.

The JavaScript uses the `mailto` function to prepare an email addressed to:

`info@katsfloral.co.za`

The visitor's default email application must be configured to send the prepared message.

**Important:** GitHub Pages does not provide built-in form processing. The current forms do not automatically store submissions or send emails in the background. An external form-processing service would be required for automatic online submissions.

## Search Engine Optimisation (SEO)

SEO improvements were included to help search engines understand the website.

These improvements include:

- Unique page titles.
- Meta descriptions.
- Relevant keywords.
- Open Graph metadata for social sharing.
- Semantic HTML structure.
- Logical heading hierarchy.
- Descriptive image alternative text.
- Internal navigation links.
- Lazy loading and asynchronous image decoding.
- Local SEO content relating to Nelspruit.
- `robots.txt` file.
- `sitemap.xml` file.

These improvements support search engine accessibility and indexing. They do not guarantee a particular Google ranking or immediate appearance in search results.

## Website Security

Security-related documentation was included in the project.

The intended security configuration covers:

- X-Content-Type-Options.
- Referrer-Policy.
- X-Frame-Options
