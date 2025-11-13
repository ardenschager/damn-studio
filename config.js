// ============================================
// Configuration & Constants
// ============================================

const CONFIG = {
  // Animation settings
  animation: {
    gap: 0.12,
    speed: 0.3,
    arcRadius: 500,
    // Bezier curve positioning offsets
    arcStartOffsetX: 200,     // Distance from right edge of container
    arcStartOffsetY: 200,     // Distance below viewport
    arcEndOffsetY: 200,       // Distance above viewport
    // Spotlight section extension
    sectionExtension: 0.0,    // Extra scroll height after last item (multiplied by viewport height)
    // Headline fade threshold
    headlineFadeStart: 0.05,  // Progress at which headline starts fading
    headlineFadeEnd: 100      // Pixels of scroll before headline fully fades
  },
  
  // Spotlight section spacing (in vh units)
  spotlight: {
    headlineTop: 15,          // Distance from top of spotlight to headline
    titlesTop: 30             // Distance from top of spotlight to animated titles
  },
  
  // Logo settings
  logo: {
    cssAnimationDuration: 1200, // ms
    initialWidth: 550,          // px - starting logo size
    finalWidthDesktop: 135,     // px
    finalWidthTablet: 110,      // px
    finalWidthMobile: 90,       // px
    finalPosition: {
      left: '2rem',  // rem units to match team-grid padding
      top: '2rem'    // rem units
    }
  },
  
  // Responsive breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    smallMobile: 480
  },
  
  // Mobile optimization
  mobile: {
    disableBezierAnimation: true,  // Disable complex Bezier animations on mobile
    stackLayout: true,              // Use vertical stack layout instead of side-by-side
    simplifyAnimations: true        // Use simpler fade animations
  },
  
  // Transitions
  transitions: {
    imageFade: 0.2, // seconds
    previewExit: 0.3 // Match the duration used in handlePreviewExit
  }
};

// Project data
const SPOTLIGHT_ITEMS = [
  {
    name: "MIT Museum",
    img: "assets/img01.jpg",
    description: "A stunning visual exploration of modern architecture.",
  },
  {
    name: "Inter NYC",
    img: "assets/img02.jpg",
    description: "An interactive data visualization for a leading tech company.",
  },
  {
    name: "AMNH",
    img: "assets/img03.jpg",
    description: "A bold and immersive brand experience for a fashion label.",
  },
  {
    name: "BRIC",
    img: "assets/img02.jpg", // Reusing img02 for now
    description: "A minimalist and elegant e-commerce platform.",
  },
  {
    name: "Grey Area",
    img: "assets/img03.jpg", // Reusing img03 for now
    description: "A playful and engaging campaign for a new mobile app.",
  }
];
