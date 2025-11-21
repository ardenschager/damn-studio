// ============================================
// DAMN Animated Favicon - Letter Cycle
// ============================================

// Wrap in IIFE to avoid global scope conflicts with logo-dots.js
(function() {
  'use strict';

  // SVG dimensions from damn.svg
  const SVG_WIDTH = 328;
  const SVG_HEIGHT = 104;
  const DOT_RADIUS = 15;

  // Organize dots by letter based on x-coordinate ranges
  const LETTER_DOTS = {
    D: [
      { x: 15, y: 52 }, { x: 15, y: 70 },
      { x: 34, y: 33 }, { x: 34, y: 89 },
      { x: 53, y: 15 }, { x: 53, y: 33 }, { x: 53, y: 52 }, { x: 53, y: 70 }, { x: 53, y: 89 }
    ],
    A: [
      { x: 90, y: 33 }, { x: 90, y: 70 }, { x: 90, y: 89 },
      { x: 109, y: 33 }, { x: 109, y: 70 },
      { x: 127, y: 52 }, { x: 127, y: 70 }, { x: 127, y: 89 }
    ],
    M: [
      { x: 164, y: 33 }, { x: 164, y: 52 }, { x: 164, y: 70 }, { x: 164, y: 89 },
      { x: 183, y: 33 },
      { x: 201, y: 52 }, { x: 201, y: 70 }, { x: 201, y: 89 },
      { x: 220, y: 33 },
      { x: 239, y: 52 }, { x: 239, y: 70 }, { x: 239, y: 89 }
    ],
    N: [
      { x: 276, y: 33 }, { x: 276, y: 52 }, { x: 276, y: 70 }, { x: 276, y: 89 },
      { x: 295, y: 33 },
      { x: 313, y: 52 }, { x: 313, y: 70 }, { x: 313, y: 89 }
    ]
  };

  // Animation state
  let currentLetterIndex = 0;
  const letters = ['D', 'A', 'M', 'N'];
  const CYCLE_DURATION = 2000; // 2 seconds per letter for slow, sublime iteration

  // Create canvas for favicon
  function createFaviconCanvas() {
    const canvas = document.createElement('canvas');
    const size = 32; // Standard favicon size
    canvas.width = size;
    canvas.height = size;
    return canvas;
  }

  // Draw a single letter on the canvas
  function drawLetter(canvas, letterKey) {
    const ctx = canvas.getContext('2d');
    const size = canvas.width;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Get dots for this letter
    const dots = LETTER_DOTS[letterKey];

    // Calculate bounding box for this letter
    const minX = Math.min(...dots.map(d => d.x));
    const maxX = Math.max(...dots.map(d => d.x));
    const minY = Math.min(...dots.map(d => d.y));
    const maxY = Math.max(...dots.map(d => d.y));

    const letterWidth = maxX - minX + (DOT_RADIUS * 2);
    const letterHeight = maxY - minY + (DOT_RADIUS * 2);

    // Calculate scale to fit in canvas with some padding
    const padding = 4;
    const scaleX = (size - padding * 2) / letterWidth;
    const scaleY = (size - padding * 2) / letterHeight;
    const scale = Math.min(scaleX, scaleY);

    // Calculate offsets to center the letter
    const scaledWidth = letterWidth * scale;
    const scaledHeight = letterHeight * scale;
    const offsetX = (size - scaledWidth) / 2 - (minX * scale) + (DOT_RADIUS * scale);
    const offsetY = (size - scaledHeight) / 2 - (minY * scale) + (DOT_RADIUS * scale);

    // Draw dots
    ctx.fillStyle = '#000000'; // Black dots
    dots.forEach(dot => {
      const x = dot.x * scale + offsetX;
      const y = dot.y * scale + offsetY;
      const radius = DOT_RADIUS * scale;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Update the favicon
  function updateFavicon(canvas) {
    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/png');

    // Find or create favicon link element
    let link = document.querySelector("link[rel*='icon']");

    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      document.head.appendChild(link);
    }

    link.href = dataUrl;
  }

  // Animation loop
  function animateFavicon() {
    const canvas = createFaviconCanvas();

    function nextFrame() {
      // Get current letter
      const currentLetter = letters[currentLetterIndex];

      // Draw letter
      drawLetter(canvas, currentLetter);

      // Update favicon
      updateFavicon(canvas);

      // Move to next letter
      currentLetterIndex = (currentLetterIndex + 1) % letters.length;

      // Schedule next frame
      setTimeout(nextFrame, CYCLE_DURATION);
    }

    // Start animation
    nextFrame();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateFavicon);
  } else {
    animateFavicon();
  }
})(); // End IIFE
