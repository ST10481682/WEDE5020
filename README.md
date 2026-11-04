# Kat's Floral Blossom Bouquet

## Website overview
Kat's Floral Blossom Bouquet is a flower-shop website showcasing handcrafted bouquets, floral services and arrangements for birthdays, anniversaries, graduations and weddings. The website provides contact and enquiry forms for visitors interested in the Nelspruit service area.

## Website pages
- `index.html` — Home page and flower-shop introduction.
- `about.html` — Business introduction, mission and reasons to choose the shop.
- `services.html` — Bouquet design, gift add-ons, delivery, custom arrangements and interactive FAQs.
- `bouquets.html` — Bouquet information, searchable gallery and sorting controls.
- `occasions.html` — Birthday, anniversary, graduation and wedding flowers.
- `contact.html` — Contact details, general-message form, WhatsApp contact, approximate Nelspruit map and social sharing.
- `enquiry.html` — Product/service, event, volunteering and sponsorship enquiry form.

## Technologies
- HTML5 semantic elements and native form validation.
- CSS3 responsive layout, transitions, focus states and reduced-motion support.
- Vanilla JavaScript for DOM interaction, validation, AJAX submission, gallery lightbox, search, sorting and dynamic page features.
- Leaflet and OpenStreetMap for the approximate Nelspruit-area map.
- Netlify Forms for static form processing when the site is deployed on Netlify.

## Part 2 feedback corrections recorded
The following corrections were applied based on the lecturer feedback shared for Part 2:
- Added/maintained semantic `<main>` elements and consistent footer sections across the website pages.
- Ensured the home page has the primary heading `Kat's Floral Blossom Bouquet`.
- Ensured the Contact page has a primary `<h1>` heading.
- Maintained a logical heading hierarchy and removed the incomplete short Enquiries page supplied in the ZIP by replacing it with a complete page.
- Kept the Services content in semantic list elements rather than decorative asterisk paragraphs.
- Added a consistent seven-page navigation menu, including Services and Enquiries links, across all pages.
- Retained the existing image files and their paths to avoid broken references; improved image alternative text where present and added lazy loading.

## Part 3 functionality implemented
### JavaScript and interactive features
- Current-page navigation highlighting and automatic footer year.
- Search of the bouquet gallery by image description/file reference, with A–Z and Z–A sorting.
- Accessible lightbox gallery with previous/next controls, Escape-key closing and keyboard activation.
- FAQ accordion on the Services page using accessible HTML `<details>` and `<summary>` elements, enhanced so one answer opens at a time.
- Scroll-reveal transitions with reduced-motion preference support.
- Smooth in-page navigation where applicable.
- Leaflet map showing the approximate Nelspruit area. The marker is deliberately approximate and must not be represented as a verified street address.
- Facebook and WhatsApp share links that use the deployed page URL.

### Forms
- `enquiry.html` has a dedicated product/service enquiry form, including bouquet/event type, required date, estimated budget, volunteering and sponsorship options, contact details and additional requirements.
- `contact.html` has a separate general-message form with name, email, phone number, message type and full message.
- Both forms use HTML5 required fields, email input validation, phone patterns, length limits, visible status/error messages and a honeypot field.
- JavaScript performs additional phone/date checks and submits the form asynchronously using `fetch` and URL-encoded form data.
- The enquiry success response repeats the enquiry type and, when supplied, the chosen budget and required date, and explains that availability and final pricing will be confirmed.
- Netlify form handling is configured in the HTML. Actual receipt of submissions requires deployment to Netlify with Forms enabled. A local Live Server test checks validation only and does not send/store a real submission.

## SEO work
- Added unique page titles, descriptions and keyword phrases for the flower shop and its Nelspruit service area.
- Added Open Graph metadata for social sharing.
- Maintained one primary H1 per page and logical section headings.
- Added descriptive image alternative text where needed, retained working image paths and enabled lazy loading/async decoding.
- Added internal navigation and contextual links between relevant pages.
- Added an approximate local map and Local SEO content for Nelspruit.
- Added `robots.txt` and `sitemap.xml` templates.
- Added a Netlify `_headers` file with common browser security headers and a Content Security Policy for the site's own assets, Leaflet and OpenStreetMap tiles.
- Reduced unnecessary image loading by using `loading="lazy"` and `decoding="async"`.

## Important publishing steps still required
1. Replace `YOUR-DEPLOYED-DOMAIN` in `sitemap.xml` and `robots.txt` with the actual public website URL after deployment. Sitemap entries must use the real absolute URLs.
2. Deploy to Netlify if you want the included Netlify Forms integration to receive messages. In the Netlify dashboard, confirm Forms is enabled and submit one test from the deployed website.
3. If using GitHub Pages instead of Netlify, connect a separate form-processing service and update the form submission endpoint; GitHub Pages does not process Netlify Forms.
4. Confirm that the displayed telephone/WhatsApp number and business address are the correct business details before publishing. The supplied ZIP contains `123 Blossom Street` and `072 123 4567`; these were retained from the supplied project and have not been independently verified.
5. The map is an approximate Nelspruit city-area marker, not a confirmed shop pin. Update it only when the correct public business location is confirmed.
6. Add real social profile links and seek genuine local backlinks (for example, a business directory or partner website). Backlinks cannot be created by editing this static website alone. Do not buy or fabricate backlinks.
7. Add image credits in the acknowledgements section if any photographs are not original. The ZIP did not provide image ownership/source details.
8. The supplied ZIP did not contain the separate full website proposal document. Add it to the repository if it is part of the submission requirements.

## Running and testing locally
1. Open the extracted project folder in Visual Studio Code.
2. Install the Live Server extension if it is not already installed.
3. Open `index.html` and choose **Open with Live Server**.
4. Test every navigation link and check that all images load.
5. On `bouquets.html`, search for words appearing in image descriptions (for example, `beautiful`, `colourful` or `fresh`) and test both sorting options.
6. On gallery pages, click an image to open the lightbox. Test the close button, previous/next buttons and Escape key.
7. On `services.html`, open and close the FAQ questions.
8. On `contact.html`, check that the map loads when an internet connection is available.
9. On both forms, test empty required fields, invalid email, invalid phone, short message and a valid completed form. On localhost, the page reports that validation passed; it does not send a real message.
10. After Netlify deployment, submit test forms and verify that the submissions appear in the Netlify Forms dashboard.

## GitHub repository workflow (to be completed by the student)
The local files are prepared, but no GitHub repository has been accessed or changed by this work. After reviewing the project:
1. Commit the Part 2 and Part 3 changes with descriptive messages.
2. Push the commits to the remote repository.
3. Confirm the repository contains all HTML pages, `css`, `img`, `script.js`, `robots.txt`, `sitemap.xml`, `_headers` and this README.
4. Submit the GitHub repository URL on the Learning Management System.

## Contact details currently displayed in the supplied project
- Location: Nelspruit, 1200 (the supplied Contact page also states `123 Blossom Street`; verify before publishing).
- Email: info@katsfloral.co.za
- Phone shown in the supplied project: 072 123 4567 (verify before publishing).

## Changelog
### Part 3 - Functionality and SEO
- Replaced the empty JavaScript file with a complete JavaScript implementation for navigation state, automatic copyright year, date restrictions, bouquet search/sorting, image lightbox, FAQ accordion enhancement, form validation, AJAX submission, map initialisation, social sharing and scroll-reveal interactions.
- Rebuilt `enquiry.html` as a complete semantic page with all seven navigation links, SEO metadata, a full enquiry form, date, budget, enquiry category, contact details, Netlify form attributes, honeypot spam field and accessible response area.
- Updated `contact.html` with a separate general-message form, message-type selector, contact validation attributes, Netlify form configuration and accessible response area.
- Added AJAX form handling with validation feedback, success/error messages and an enquiry-specific response describing the selected enquiry type, budget/date where supplied, and confirmation of pricing/availability as the next step.
- Added bouquet search and sorting controls while retaining the original bouquet photographs and file paths.
- Added an accessible image lightbox to the existing image galleries without changing the original image files.
- Added an interactive FAQ accordion to the Services page.
- Added a Leaflet/OpenStreetMap map with an approximate Nelspruit area marker; it is clearly labelled as approximate rather than a verified street location.
- Added social sharing links for Facebook and WhatsApp.
- Added unique keyword phrases, descriptions and Open Graph metadata across the seven HTML pages.
- Added lazy image loading, asynchronous image decoding, keyboard focus styles and reduced-motion support.
- Created `robots.txt`, a sitemap template and Netlify security headers. The sitemap and robots sitemap directive must be updated with the final deployed domain.
- Updated this README with Part 3 implementation details, testing steps, references and remaining publishing requirements.

### Part 2 feedback corrections
- Ensured all seven HTML pages use semantic main content and consistent footer structures.
- Ensured the home page primary heading is `Kat's Floral Blossom Bouquet` and the Contact page has a primary H1.
- Replaced the incomplete Enquiries page from the supplied ZIP with a complete form page.
- Ensured the navigation links consistently include Home, About, Services, Bouquets, Occasions, Contact and Enquiries.
- Retained image filenames and file paths to avoid breaking existing image references; added lazy loading and descriptive alt text where appropriate.
- Preserved the existing cream, blush-pink, rose and sage visual theme and the supplied photographs.

## References
- MDN Web Docs. (n.d.). *HTML forms: Form validation*. https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
- MDN Web Docs. (n.d.). *Using the Fetch API*. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- MDN Web Docs. (n.d.). *Intersection Observer API*. https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- Google Search Central. (n.d.). *SEO Starter Guide*. https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central. (n.d.). *Build and submit a sitemap*. https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Leaflet. (n.d.). *Leaflet documentation*. https://leafletjs.com/reference.html
- OpenStreetMap. (n.d.). *Copyright and attribution*. https://www.openstreetmap.org/copyright
- Netlify. (n.d.). *Forms setup*. https://docs.netlify.com/forms/setup/
- Netlify. (n.d.). *Submissions and notifications*. https://docs.netlify.com/forms/submissions/
- Sitemaps.org. (n.d.). *Sitemaps XML format*. https://www.sitemaps.org/protocol.html
- Robots Exclusion Protocol. (n.d.). *RFC 9309*. https://www.rfc-editor.org/rfc/rfc9309
