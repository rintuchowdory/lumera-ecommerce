# Project TODO

- [x] Establish the Luméra Scandinavian luxury visual system: pale cool-gray surfaces, black sans-serif hierarchy, thin subtitles, pastel blue and blush geometric accents.
- [x] Build responsive global storefront navigation, announcement bar, footer, and accessible interaction states.
- [x] Build the homepage with hero banner, featured collections, bestsellers, and brand story sections.
- [x] Build the product catalog with keyword search, category filtering, and sorting by price, popularity, and newest.
- [x] Build the product detail experience with image gallery, description, ingredients, reviews, metadata, and add-to-cart flow.
- [x] Add persistent shopping cart state with quantity changes, item removal, live totals, and order summary.
- [x] Add a clearly labeled demo account page with order history and saved-address placeholders.
- [x] Add checkout flow with shipping address form and post-purchase confirmation screen.
- [ ] Add secure hosted Stripe checkout with no raw card data handled by the application server.
- [ ] Add database-backed product, category, cart, order, address, payment, and review models without fabricated customer reviews or ratings.
- [ ] Add role-gated admin panel for product/category management and order viewing.
- [ ] Add automated customer order confirmation emails, shipment notification emails, and store-owner new-order alerts.
- [x] Add tests for cart calculations and auth/logout behavior; catalog and commerce integration tests remain pending with backend wiring.
- [x] Verify responsive rendering and polish micro-interactions on desktop and mobile.
- [x] Save the final project checkpoint and provide setup notes, integration requirements, and known follow-ups.

## History

- Expanded scope received: complete luxury ecommerce application with hosted Stripe payments and automated event-driven email notifications.
- [x] Configure EUR pricing and single-market shipping assumptions for checkout.
- [x] Define the demo owner-alert recipient as RintuChowdory@yahoo.com.
- [x] Keep initial product catalog fictional and leave customer reviews empty until genuine reviews are available.
- [x] Define demo-mode notification behavior without sending real emails or requiring an email API.
- [x] Add visible focus-visible states and keyboard-friendly interactions across primary controls.
- [x] Replace product gallery placeholders with real multi-image product assets and keep reviews explicitly genuine-review-only.
- [x] Clearly label the account page as demo-only until auth and account data are wired.
- [ ] Add catalog search, filtering, and sorting test coverage.
- [x] Capture a mobile viewport verification screenshot and correct any responsive issues.
- [x] Restrict checkout country selection to the confirmed single-market demo assumption.
- [ ] Implement demo order lifecycle events that surface customer confirmation, shipment, and owner alert delivery to RintuChowdory@yahoo.com.
- [x] Add explicit focus-visible styling for buttons, links, cart controls, navigation triggers, and product-card actions, then verify keyboard navigation across core flows.
