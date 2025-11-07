<<<<<<< HEAD
# DAMN Studio Website

A Node.js server for the DAMN Studio website.

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Start the production server:
```bash
npm start
```

The server will run on port 3000 by default, or the port specified in the `PORT` environment variable.

## Deployment

### DigitalOcean App Platform

1. Connect your GitHub repository
2. Set the run command to: `npm start`
3. Add your custom domain: `damnstudio.com`
4. Deploy!

### Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## Features

- ✅ Static file serving
- ✅ Security headers with Helmet
- ✅ Gzip compression
- ✅ Ready for multi-domain setup
- ✅ 404 handling
- ✅ Error handling
=======
# DAMN Studio Scroll Animation

A modern, scroll-driven portfolio website featuring smooth animations, Bézier curve transitions, and responsive design.
>>>>>>> 4720cb9 (Major update: Complete scroll animation portfolio redesign)

## Features

<<<<<<< HEAD
```
├── server.js              # Main Node.js server file
├── package.json           # Dependencies and scripts
├── .gitignore            # Git ignore rules
├── views/                # HTML templates
│   └── index.html        # Main website page
├── public/               # Static assets served by Express
│   ├── css/             # Stylesheets
│   │   └── style.css    # Main stylesheet
│   ├── js/              # Client-side JavaScript
│   │   └── script.js    # Main JavaScript file
│   └── assets/          # Images and media files
│       ├── img01.jpg    # Project images
│       ├── img02.jpg
│       └── img03.jpg
└── README.md            # Project documentation
```
=======
- **Smooth Scrolling**: Powered by Lenis for buttery-smooth scroll experience
- **Bézier Curve Animation**: Project titles animate along a curved path
- **Dynamic Preview Pane**: Updates in sync with active project
- **Animated Logo**: Starts large and centered, shrinks and pins to top-left on scroll
- **About Us Section**: Responsive team member cards with hover effects
- **Image Preloading**: All images are preloaded for smooth transitions
- **Responsive Design**: Optimized for desktop and mobile devices

## Project Structure

```plaintext
scroll_animation/
├── index.html          # Main HTML file
├── style.css           # All styles
├── main.js             # Main application logic
├── config.js           # Configuration and project data
├── utils.js            # Utility functions
├── README.md           # Project documentation
└── assets/             # Images and media
    ├── damn_logo.png   # DAMN Studio logo
    ├── img01-03.jpg    # Project preview images
    └── headshots/      # Team member photos
        ├── daniel.jpg
        ├── nicole_fox.jpg
        ├── matias.JPG
        └── arden.jpg
```

## Technologies Used

- **HTML5** & **CSS3**
- **JavaScript** (ES6+)
- **GSAP** (GreenSock Animation Platform)
- **ScrollTrigger** (GSAP Plugin)
- **Lenis** (Smooth scrolling library)

## Configuration

All configuration options are centralized in `config.js`:

- Animation timing and curves
- Logo animation settings
- Responsive breakpoints
- Transition durations
- Project data (titles, images, descriptions)

## Key Components

### 1. **Logo Animation**

- Starts centered at 500px width
- Fades in on load with smooth animation
- Shrinks to 120px (desktop) / 80px (mobile) on scroll
- Pins to top-left corner (4% left, 5% top)
- Smoothly returns to center when scrolling back up

### 2. **Project Showcase**

- Client headline appears at the top and fades out on scroll
- Titles animate along a Bézier curve path
- Active centered title is highlighted with bold styling
- Preview pane updates with active project
- Smooth image transitions with fade effects
- Preview pane naturally exits with the section

### 3. **About Us Section**

- Responsive grid layout (4 columns desktop, 2 tablet, 1 mobile)
- Team member cards with circular images
- Hover effects with lift and shadow
- Detailed descriptions for each team member

### 4. **Performance Optimizations**

- Image preloading with HTML `<link rel="preload">` tags
- JavaScript Promise-based image preloading
- Debounced resize handling
- Efficient scroll-triggered animations
- Hardware-accelerated transforms
- Smooth 60fps animations with GSAP

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

To run locally:

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Or serve with a local server: `python3 -m http.server 8000`

## Credits

Built for DAMN Studio by [Your Team]

## License

© 2024 DAMN Studio. All rights reserved.
>>>>>>> 4720cb9 (Major update: Complete scroll animation portfolio redesign)
