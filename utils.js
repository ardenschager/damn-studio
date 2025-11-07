// ============================================
// Utility Functions
// ============================================

// Calculate Bezier curve position
function getBezierPosition(t, startX, startY, controlX, controlY, endX, endY) {
  const x = (1 - t) * (1 - t) * startX +
            2 * (1 - t) * t * controlX +
            t * t * endX;
  const y = (1 - t) * (1 - t) * startY +
            2 * (1 - t) * t * controlY +
            t * t * endY;
  return { x, y };
}

// Calculate progress state for animations
function getProgressState(index, overallProgress, gap, speed) {
  const startTime = index * gap;
  const endTime = startTime + speed;

  if (overallProgress < startTime) return -1;
  if (overallProgress > endTime) return 2;

  return (overallProgress - startTime) / speed;
}

// Check if device is mobile
function isMobile() {
  return window.innerWidth < CONFIG.breakpoints.mobile;
}

// Check if device is tablet
function isTablet() {
  return window.innerWidth >= CONFIG.breakpoints.mobile && 
         window.innerWidth < CONFIG.breakpoints.tablet;
}

// Preload images with Promise support
function preloadImages(items) {
  const imagePromises = items.map((item) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => {
        console.warn(`Failed to preload image: ${item.img}`);
        resolve(); // Resolve even on error to not block
      };
      img.src = item.img;
    });
  });
  
  return Promise.all(imagePromises);
}

// Debounce function for resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Get responsive value based on screen size
function getResponsiveValue(desktopValue, mobileValue, tabletValue = null) {
  if (isMobile()) return mobileValue;
  if (tabletValue !== null && isTablet()) return tabletValue;
  return desktopValue;
}
