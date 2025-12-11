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
    initialWidth: 1000,         // px - starting logo size (2x bigger!)
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
    img: "assets/mit-museum.jpg",
    description: "Daniel designed this exhibit highlighting MIT's legacy of invention through a reconfigurable display of hundreds of artifacts.",
    artist: "Daniel Toretsky",
    credits: "Exhibit Design – Studio Joseph, Interactive Media – Bluecadet, Graphic Design – Pentagram, Lighting Design – Tillotson, Fabrication – Kubik Maltbie"
  },
  {
    name: "Inter NYC",
    img: "assets/inter-nyc.jpg",
    description: "Matías developed this installation inviting visitors to interact with cosmic portals using gesture-controlled technology.",
    artist: "Matías Piña",
    credits: "Collaboration – Tiago Aragona"
  },
  {
    name: "AMNH",
    img: "assets/amnh.jpg",
    description: "Nicole designed this immersive exhibition inviting visitors to encounter life-size sharks through games, models, and interactive media.",
    artist: "Nicole Fox",
    credits: "Exhibit Design – American Museum of Natural History Exhibitions, Photo – Denis Finnin"
  },
  {
    name: "Grey Area",
    img: "assets/grey-area.jpg",
    description: "Arden coded this digital installation immersing viewers in a luminous dialogue with imagined bioluminescent life forms.",
    artist: "Arden Schager",
    credits: "Installation Design – Gray Area Foundation for the Arts, Coding – three.js"
  },
  {
    name: "Microsoft Garage",
    img: "assets/microsoft-garage.jpg",
    description: "Matías built this interactive installation where visitors navigate AI-generated landscapes from Chile and Argentina, exploring how extraction and transformation erase cultural specificity.",
    artist: "Matías Piña",
    credits: "Collaboration – Tiago Aragona, Parsons School of Design MFA Thesis"
  }
];
