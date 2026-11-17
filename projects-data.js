/* ============================================================
   PROJECT DATA  -  edit this file to add or change a project.
   The Projects section on the home page AND every project page
   (/projects/<slug>/) are built from this list.

   To add a project:
     1. add an object below
     2. copy a folder inside /projects (e.g. projects/brew-haven-campaign)
        to projects/<your-slug>/ and change the title/description in
        its index.html
     3. add the new page to sitemap.xml

   Links (url / github / demo / docs): leave as '' if they do not exist.
   Only links that are filled in are shown.
   Image paths are relative to the site root.
   ============================================================ */
window.PROJECTS = [
  {
    id: 'patience-brand-identity',
    slug: 'patience-brand-identity',
    name: 'Patience Fine Jewelry: Brand Identity',
    category: 'Graphic Design',
    type: 'Brand Identity',
    year: 2026,
    status: 'Completed',
    role: 'Brand & Graphic Designer',
    image: 'ceel-img/logo-icon.png',
    imageAlt: 'Patience Fine Jewelry lotus emblem',
    description: 'A lotus-based brand identity for a fine jewelry brand: logo, color palette, typography and lockups.',
    overview: 'A complete brand identity for Patience Fine Jewelry, a brand built around elegance, beauty, sophistication and timeless style. The lotus flower is the main symbol, representing purity, grace, patience and growth.',
    problem: 'A new jewelry brand needed a refined, recognizable identity that communicates trust and luxury and stays consistent on every material.',
    solution: 'A lotus emblem paired with elegant serif typography, plus a restrained palette of soft blue, dark navy, gold and light gray. The identity is presented as logo variations, a color palette, typefaces and a horizontal wordmark lockup.',
    features: [
      'Lotus emblem logo mark',
      'Logo on navy badge and horizontal / stacked lockups',
      'Color palette: #93B8DD, #2C3D4E, #C9A500, #DEDEDE',
      'Primary typeface Playfair Display, secondary Poltawski Nowy'
    ],
    technologies: ['Laptop', 'Photoshop', 'Color Palette', 'Brand Guidelines'],
    screenshots: [
      { src: 'ceel-img/logo-icon.png', alt: 'Patience lotus emblem' },
      { src: 'ceel-img/Badge-2.png', alt: 'Patience logo on navy badge' },
      { src: 'ceel-img/stacked-horizontal-logo.png', alt: 'Patience horizontal logo' },
      { src: 'ceel-img/Horizontal Logo.png', alt: 'Patience wide logo lockup' }
    ],
    caseStudy: 'designs',
    url: 'https://drive.google.com/drive/folders/1XxTMHJ-3GdIuVQQTKczmoKvfXdvCtXXk?usp=sharing', github: '', demo: '', docs: ''
  },
  {
    id: 'brew-haven-campaign',
    slug: 'brew-haven-campaign',
    name: 'Brew Haven: Pumpkin Spice Campaign',
    category: 'Graphic Design',
    type: 'Digital Marketing',
    year: 2026,
    status: 'Completed',
    role: 'Graphic Designer',
    image: 'ceel-img/Pumpkin-Spice-Latte-Splash.png',
    imageAlt: 'Pumpkin spice latte with whipped cream',
    description: 'A seasonal digital marketing campaign for a cozy coffee brand: banners, social post and ad layouts.',
    overview: 'Digital marketing graphics for Brew Haven, a coffee brand that promotes the cozy experience of enjoying coffee in autumn. The campaign highlights the Pumpkin Spice Latte.',
    problem: 'A coffee brand needed warm, attention-grabbing promotional graphics for its autumn drink across several digital platforms.',
    solution: 'A set of layouts built on warm orange, yellow, cream, brown and black, bold typography, product photography and the phrases "Cozy Season, Perfect Reason" and "Try It Today".',
    features: [
      'Landing page banner',
      'Social media post',
      'Dark ad banner',
      'Slim web / newsletter banner',
      'Consistent brand look across all layouts'
    ],
    technologies: ['Laptop','Photoshop', 'Social Media Graphics', 'Typography', 'Layout Design'],
    screenshots: [
      { src: 'ceel-img/Pumpkin-Spice-Latte-Splash.png', alt: 'Pumpkin spice latte hero' },
      { src: 'ceel-img/landing-page-banner.png', alt: 'Brew Haven landing page banner' },
      { src: 'ceel-img/social-media-post.png', alt: 'Brew Haven social media post' },
      { src: 'ceel-img/banner-ad.png', alt: 'Brew Haven dark ad banner' },
      { src: 'ceel-img/news-letter.png', alt: 'Brew Haven slim web banner' }
    ],
    caseStudy: 'marketing',
    url: 'https://drive.google.com/drive/folders/1QUGARmxFAgI4t717b6xb5XhyR6YTUQaE?usp=sharing', github: '', demo: '', docs: ''
  },
  {
    id: 'patience-grand-opening-poster',
    slug: 'patience-grand-opening-poster',
    name: 'Typography Brand Poster',
    category: 'Graphic Design',
    type: 'Poster Design',
    year: 2026,
    status: 'Completed',
    role: 'Graphic Designer',
    image: 'ceel-img/TypographyBrandPoster.png',
    imageAlt: 'Patience Fine Jewelry grand opening poster',
    description: 'A dark, gold-and-white typography poster announcing the grand opening of Patience Fine Jewelry.',
    overview: 'A typography-led poster that promotes the grand opening of Patience Fine Jewelry on September 16, 2026, using refined type, a minimalist layout and a dark color scheme with gold and white accents.',
    problem: 'The brand needed a premium-looking announcement that puts its name first and feels exclusive.',
    solution: 'The brand name is the focal point in elegant serif type. Gold text adds exclusivity, the dark background adds contrast, and the tagline "Where Patience Become Precious" reinforces the message.',
    features: [
      'Brand name as the main focal point',
      'Gold and white on dark for contrast',
      'Minimalist layout',
      'Tagline reinforcing the brand message'
    ],
    technologies: ['Laptop', 'Photoshop', 'Poster Design', 'Typography', 'Layout Design'],
    screenshots: [
      { src: 'ceel-img/TypographyBrandPoster.png', alt: 'Patience grand opening poster' }
    ],
    caseStudy: 'poster',
    url: 'https://drive.google.com/drive/folders/1Ij5mF1x5O1bRhupZI6ddjdt6hhbGSgCY?usp=sharing', github: '', demo: '', docs: ''
  },
  {
    id: 'pos-ecommerce-system',
    slug: 'pos-ecommerce-system',
    name: 'Integrated POS & E-Commerce System',
    category: 'Information System',
    type: 'Web Application',
    year: 2026,
    status: 'Completed',
    role: 'Full-Stack Developer (team of 3)',
    image: 'ceel-img/pos-system.png',
    imageAlt: '',
    description: 'One website serving staff, administrators and customers: point of sale, online ordering, reservations and sales reports.',
    overview: 'A course project at City College of Calamba: an integrated point-of-sale and e-commerce website with three role-based user levels (staff, administrator and customer) in a single platform.',
    problem: 'A small business needed one system for walk-in sales, online orders, stock and sales monitoring instead of separate tools.',
    solution: 'A single website with role-based access. Staff process sales and orders, administrators manage products, stock and reports, and customers browse, order, schedule pickup and leave reviews.',
    features: [
      'Walk-in point-of-sale with cash payment, totals and change',
      'Senior Citizen and PWD discounts applied after in-person ID check',
      'Online orders, reservations and scheduled pickup',
      'Order and payment status updates, digital receipts',
      'Product, price and stock management',
      'Sales reports and basic analytics',
      'Customer order tracking and product reviews'
    ],
    technologies: ['Laptop', 'Visual Studio', 'Point of Sale', 'E-Commerce', 'Role-Based Access'],
    screenshots: [
       { src: 'ceel-img/admin-staff-login_page.png'},
       { src: 'ceel-img/customer-login-page.png'},
       { src: 'ceel-img/customer-signup-page.png'},
       { src: 'ceel-img/admin-inventory.png'},
       { src: 'ceel-img/admin-sales-p1.png'},
       { src: 'ceel-img/customer-browsing-page-p2.png'},
       { src: 'ceel-img/customer-view-cart.png'},
       { src: 'ceel-img/staff-POS.png'}
    ],
    caseStudy: 'experience',
    url: '', github: 'https://github.com/Mouri4/liberty-ordering-system', demo: 'https://drive.google.com/file/d/1QyIvqbWAaVCkcL3uKqAYTLyV8_9VqaXO/view?usp=sharing', docs: ''
  }
];

/* ============================================================
   SOCIAL LINKS  -  paste your profile URLs between the quotes.
   Empty = the link stays hidden in the Contact section and footer
   (the round icons in the top menu keep their place either way).
   ============================================================ */
window.SOCIALS = {
  github: 'https://github.com/Mouri4',      // e.g. 'https://github.com/your-username'
  linkedin: 'https://www.linkedin.com/in/jhoncen-taulo-035631450?utm_source=share_via&utm_content=profile&utm_medium=member_android',    // e.g. 'https://www.linkedin.com/in/your-name'
  facebook: 'https://www.facebook.com/jhoncen.taulo/',
  instagram: 'https://www.instagram.com/jhncen.t/'
};

/* ============================================================
   ANALYTICS (optional, PDF section 23)  -  GoatCounter, free + cookie-free.
   1. Sign up at https://www.goatcounter.com and choose a site code (e.g. 'jhoncen').
   2. Paste only the code below. Leave '' to keep analytics OFF.
   ============================================================ */
window.ANALYTICS = { goatcounter: 'jhoncen' };