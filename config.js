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
    sectionExtension: 0.35,    // Extra scroll height after last item (multiplied by viewport height) - increased for exit animation
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
    description: "Developed spatial and interactive systems for exhibitions exploring MIT's history of innovation, from adaptive artifact displays to large-scale media installations.",
  },
  {
    name: "Inter NYC",
    img: "assets/img02.jpg",
    description: "Designed and developed interactive installations where visitors shape constellations and influence the life and death of stars through movement, transforming cosmic phenomena into responsive, participatory experiences.",
  },
  {
    name: "AMNH",
    img: "assets/img03.jpg",
    description: "Through exhibition design, visual identity, and spatial graphics, we've helped shape immersive experiences that connect visitors to stories of nature, culture, and technology with clarity and emotional depth.",
  },
  {
    name: "Grey Area",
    img: "assets/img03.jpg", // Reusing img03 for now
    description: "Created an immersive installation and web piece where visitors encounter bioluminescent beings communicating through shifting light patterns, transforming the uncertainty of translation into a space of curiosity and wonder.",
  },
  {
    name: "Microsoft Garage",
    img: "assets/img02.jpg", // Reusing img02 for now
    description: "Created an interactive installation where visitors explore shifting AI-generated landscapes that reflect on extraction, displacement, and the fading of cultural specificity through distance and transformation.",
  }
];
