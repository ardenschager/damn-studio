// ============================================
// DAMN Logo - Individual Dots Configuration
// ============================================

// ⚙️ EASY CONFIG: Change animation style here!
// Set to 'flutter' (converge from all sides) or 'percolate' (bubble in)
// You can also edit logo-config.json if running on a server
const ANIMATION_STYLE = 'flutter'; // 'flutter' or 'percolate'

// Dot positions extracted from damn.svg (viewBox: 328 x 104)
// Normalized to percentage for responsive scaling
// 38 dots total spelling "DAMN"
const DOT_POSITIONS = [
  { x: 53, y: 15 },   // 1
  { x: 53, y: 33 },   // 2
  { x: 34, y: 33 },   // 3
  { x: 53, y: 52 },   // 4
  { x: 127, y: 52 },  // 5
  { x: 164, y: 52 },  // 6
  { x: 201, y: 52 },  // 7
  { x: 239, y: 52 },  // 8
  { x: 276, y: 52 },  // 9
  { x: 276, y: 33 },  // 10
  { x: 295, y: 33 },  // 11
  { x: 220, y: 33 },  // 12
  { x: 183, y: 33 },  // 13
  { x: 164, y: 33 },  // 14
  { x: 109, y: 33 },  // 15
  { x: 90, y: 33 },   // 16
  { x: 90, y: 70 },   // 17
  { x: 109, y: 70 },  // 18
  { x: 90, y: 89 },   // 19
  { x: 313, y: 52 },  // 20
  { x: 15, y: 52 },   // 21
  { x: 53, y: 70 },   // 22
  { x: 127, y: 70 },  // 23
  { x: 164, y: 70 },  // 24
  { x: 201, y: 70 },  // 25
  { x: 239, y: 70 },  // 26
  { x: 276, y: 70 },  // 27
  { x: 313, y: 70 },  // 28
  { x: 15, y: 70 },   // 29
  { x: 34, y: 89 },   // 30
  { x: 53, y: 89 },   // 31
  { x: 127, y: 89 },  // 32
  { x: 164, y: 89 },  // 33
  { x: 201, y: 89 },  // 34
  { x: 239, y: 89 },  // 35
  { x: 276, y: 89 },  // 36
  { x: 313, y: 89 },  // 37
];

// Constants for the SVG dimensions
const SVG_WIDTH = 328;
const SVG_HEIGHT = 104;

// Logo configuration (will be loaded from JSON or use constant above)
let logoConfig = {
  animation: {
    style: ANIMATION_STYLE // Use the constant defined at top of file
  },
  interaction: {
    enableMouseRepulsion: true,
    centerRadius: 400,
    centerForce: 25,
    cornerRadius: 200,
    cornerForce: 15
  }
};

// State
let dotElements = [];
let mousePos = { x: 0, y: 0 };
let isInCorner = false;

// Load configuration (only when running on a server, not file://)
async function loadLogoConfig() {
  // Skip fetch if running locally via file://
  if (window.location.protocol === 'file:') {
    console.log('Running locally, using default logo config');
    return;
  }

  try {
    const response = await fetch('logo-config.json');
    const config = await response.json();
    logoConfig = { ...logoConfig, ...config }; // Merge with defaults
    console.log('Logo config loaded from JSON:', logoConfig);
  } catch (error) {
    console.warn('Could not load logo-config.json, using defaults:', error);
  }
}

// Initialize the dot logo
async function initializeDotLogo() {
  console.log('🔵 initializeDotLogo() called');

  // Load config first (if available)
  await loadLogoConfig();

  const logoContainer = document.getElementById('dotLogo');
  if (!logoContainer) {
    console.error('❌ Logo container #dotLogo not found');
    return;
  }

  console.log('✅ Logo container found, creating', DOT_POSITIONS.length, 'dots');

  // Create each dot - SIMPLE, NO ANIMATIONS YET
  DOT_POSITIONS.forEach((pos, index) => {
    const dotDiv = document.createElement('div');
    dotDiv.className = 'dot';
    dotDiv.dataset.index = index;

    // Convert SVG coordinates to percentages
    const dotSizePercent = 9.146;
    dotDiv.style.left = `${(pos.x / SVG_WIDTH) * 100 - (dotSizePercent / 2)}%`;
    dotDiv.style.top = `${(pos.y / SVG_HEIGHT) * 100 - (dotSizePercent / 2)}%`;

    // IMPORTANT: Make dots visible immediately for debugging
    dotDiv.style.opacity = '1';

    // Create inline SVG
    dotDiv.innerHTML = `
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill="#000"/>
      </svg>
    `;

    logoContainer.appendChild(dotDiv);
    dotElements.push(dotDiv);

    console.log(`Dot ${index}: left=${dotDiv.style.left}, top=${dotDiv.style.top}`);
  });

  console.log('✅ Created', dotElements.length, 'dot elements - ALL VISIBLE');

  // Setup mouse interaction
  setupMouseInteraction();
  console.log('✅ Logo initialization complete!');
}

// Percolate animation (bubble in from random positions)
function animatePercolate(dotDiv, index) {
  const delay = (Math.random() * 0.8) + (index * 0.015);
  const startY = Math.random() * 100 - 50;
  const startX = Math.random() * 40 - 20;

  gsap.fromTo(dotDiv,
    {
      opacity: 0,
      scale: 0,
      x: startX,
      y: startY,
    },
    {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      duration: 1.2,
      delay: delay,
      ease: 'elastic.out(1, 0.6)',
    }
  );
}

// Flutter animation (converging from all directions)
function animateFlutter(dotDiv, index) {
  const delay = (Math.random() * 0.6) + (index * 0.012);

  // Random angle from 0 to 360 degrees
  const angle = Math.random() * Math.PI * 2;
  // Random distance from center (200-500px)
  const distance = Math.random() * 300 + 200;

  // Calculate start position based on angle
  const startX = Math.cos(angle) * distance;
  const startY = Math.sin(angle) * distance;

  // Random rotation for flutter effect
  const startRotation = (Math.random() - 0.5) * 60;

  gsap.fromTo(dotDiv,
    {
      opacity: 0,
      scale: 0.2,
      x: startX,
      y: startY,
      rotation: startRotation,
    },
    {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
      duration: 2.0,
      delay: delay,
      ease: 'power2.out',
    }
  );
}

// Mouse interaction setup
function setupMouseInteraction() {
  const logoContainer = document.querySelector('.logo-container');

  // Track mouse position globally
  document.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  });

  // Animate dots based on mouse position
  gsap.ticker.add(updateDotsOnMouse);
}

// Update dots based on mouse position
function updateDotsOnMouse() {
  const logoContainer = document.querySelector('.logo-container');
  if (!logoContainer || !logoConfig.interaction.enableMouseRepulsion) return;

  // Get config values
  const maxDistance = isInCorner ? logoConfig.interaction.cornerRadius : logoConfig.interaction.centerRadius;
  const maxForce = isInCorner ? logoConfig.interaction.cornerForce : logoConfig.interaction.centerForce;

  dotElements.forEach((dot) => {
    const dotRect = dot.getBoundingClientRect();
    const dotCenterX = dotRect.left + dotRect.width / 2;
    const dotCenterY = dotRect.top + dotRect.height / 2;

    // Calculate distance from mouse to this specific dot
    const dx = mousePos.x - dotCenterX;
    const dy = mousePos.y - dotCenterY;
    const dotDistance = Math.sqrt(dx * dx + dy * dy);

    // Apply repulsion force (dots move away from cursor)
    // No harsh cutoff - smooth falloff based on distance
    if (dotDistance < maxDistance) {
      // Smooth falloff: force decreases as distance increases
      const forceFactor = 1 - (dotDistance / maxDistance);
      const force = forceFactor * maxForce;
      const angle = Math.atan2(dy, dx);
      const offsetX = -Math.cos(angle) * force;
      const offsetY = -Math.sin(angle) * force;

      gsap.to(dot, {
        x: offsetX,
        y: offsetY,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: true
      });
    } else {
      // Return to original position with elastic bounce
      gsap.to(dot, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
        overwrite: true
      });
    }
  });
}

// Function to update corner state (called from main.js during scroll)
function setLogoInCorner(inCorner) {
  isInCorner = inCorner;
}

// Export for use in main.js
window.setLogoInCorner = setLogoInCorner;

// Call this function when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDotLogo);
} else {
  initializeDotLogo();
}
