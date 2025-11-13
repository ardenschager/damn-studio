// ============================================
// DAMN Studio Scroll Animation - Main Script
// ============================================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// DOM Elements & State
// ============================================
let elements = {};
let state = {
  currentActiveIndex: 0,
  lenis: null,
  titleElements: null
};

// ============================================
// Initialization
// ============================================
function initializeDOMElements() {
  elements = {
    titlesContainer: document.querySelector('.spotlight-titles'),
    previewImg: document.querySelector('.preview-img img'),
    previewTitle: document.querySelector('.preview-title'),
    previewDescription: document.querySelector('.preview-description'),
    logoContainer: document.querySelector('.logo-container'),
    animatedLogo: document.querySelector('.animated-logo'),
    previewContainer: document.querySelector('.preview-container')
  };
}

function initializeSmoothScrolling() {
  state.lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
  });

  state.lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    state.lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Add custom snap behavior for spotlight section
  let scrollStopTimer = null;
  let lastVelocity = 0;

  state.lenis.on('scroll', (e) => {
    lastVelocity = Math.abs(e.velocity);

    // Clear existing timer
    if (scrollStopTimer) {
      clearTimeout(scrollStopTimer);
    }

    // Set timer to detect when scrolling has stopped
    scrollStopTimer = setTimeout(() => {
      // Check if we're in the spotlight section
      const spotlightSection = document.querySelector('.spotlight');
      const rect = spotlightSection.getBoundingClientRect();

      // Only snap if spotlight is visible and velocity is low
      if (rect.top <= 0 && rect.bottom > window.innerHeight && lastVelocity < 0.1) {
        snapToNearestVenue();
      }
    }, 150);
  });
}

// Snap to nearest venue function
function snapToNearestVenue() {
  const scrollTriggers = ScrollTrigger.getAll();
  const spotlightTrigger = scrollTriggers.find(st => st.vars.trigger === '.spotlight');

  if (!spotlightTrigger) return;

  const progress = spotlightTrigger.progress;
  const snapInterval = 1 / SPOTLIGHT_ITEMS.length;
  const targetProgress = Math.round(progress / snapInterval) * snapInterval;

  // Calculate target scroll position
  const scrollStart = spotlightTrigger.start;
  const scrollEnd = spotlightTrigger.end;
  const scrollRange = scrollEnd - scrollStart;
  const targetScroll = scrollStart + (targetProgress * scrollRange);

  // Smoothly scroll to target
  state.lenis.scrollTo(targetScroll, {
    duration: 0.5,
    easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  });
}

// ============================================
// Title Animation
// ============================================
function createTitleElements() {
  SPOTLIGHT_ITEMS.forEach((item) => {
    const titleElement = document.createElement('h1');
    titleElement.textContent = item.name;
    elements.titlesContainer.appendChild(titleElement);
  });
  
  state.titleElements = elements.titlesContainer.querySelectorAll('h1');
}

function createSpotlightAnimation() {
  // Check if mobile - use simpler animation
  if (isMobile() && CONFIG.mobile.disableBezierAnimation) {
    createMobileSpotlightAnimation();
    return;
  }
  
  const containerWidth = window.innerWidth * 0.5;
  const containerHeight = window.innerHeight;
  const arcStartX = containerWidth - CONFIG.animation.arcStartOffsetX;
  const arcEndX = arcStartX;
  const arcStartY = containerHeight + CONFIG.animation.arcStartOffsetY;
  const arcEndY = -CONFIG.animation.arcEndOffsetY;
  const arcControlPointX = arcStartX - CONFIG.animation.arcRadius;
  const arcControlPointY = containerHeight / 2;

  ScrollTrigger.create({
    trigger: '.spotlight',
    start: 'top top',
    end: () => {
      // Calculate end based on when last item completes its animation
      // Multiply by 1.5 to control scroll speed (lower = faster scroll, less distance)
      const lastItemStart = (SPOTLIGHT_ITEMS.length - 1) * CONFIG.animation.gap;
      const lastItemEnd = lastItemStart + CONFIG.animation.speed;
      const scrollHeight = window.innerHeight * (lastItemEnd + CONFIG.animation.sectionExtension) * 1.5;
      return `+=${scrollHeight}px`;
    },
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      
      // Handle circle morph animation (happens in first 15% of scroll)
      handleCircleMorph(progress);
      let activeIndex = -1;
      let closestDistance = Infinity;

      // Animate titles along Bezier curve
      state.titleElements.forEach((title, index) => {
        const titleProgress = getProgressState(index, progress, CONFIG.animation.gap, CONFIG.animation.speed);

        if (titleProgress >= 0 && titleProgress <= 1) {
          const pos = getBezierPosition(
            titleProgress, 
            arcStartX, arcStartY, 
            arcControlPointX, arcControlPointY, 
            arcEndX, arcEndY
          );
          
          gsap.set(title, {
            x: pos.x,
            y: pos.y,
            opacity: 1,
          });

          const distanceFromCenter = Math.abs(0.5 - titleProgress);
          if (distanceFromCenter < closestDistance) {
            closestDistance = distanceFromCenter;
            activeIndex = index;
          }
        } else {
          gsap.set(title, { opacity: 0 });
        }
      });

      // Update preview content and handle exit
      if (activeIndex !== -1) {
        updatePreviewPane(activeIndex);
        // Highlight the active title
        state.titleElements.forEach((title, idx) => {
          if (idx === activeIndex) {
            title.classList.add('active');
          } else {
            title.classList.remove('active');
          }
        });
      }
      handlePreviewExit(progress);
    }
  });
}

// ============================================
// Mobile Spotlight Animation (Simplified)
// ============================================
function createMobileSpotlightAnimation() {
  // Hide the desktop preview container on mobile
  const previewContainer = document.querySelector('.preview-container');
  if (previewContainer) {
    previewContainer.style.display = 'none';
  }
  
  // On mobile, create a simple stacked scroll experience
  // Each project item gets its own scroll section
  const spotlight = document.querySelector('.spotlight');
  const container = document.createElement('div');
  container.className = 'mobile-projects-container';
  
  SPOTLIGHT_ITEMS.forEach((item, index) => {
    const projectSection = document.createElement('div');
    projectSection.className = 'mobile-project-item';
    projectSection.innerHTML = `
      <div class="mobile-project-content">
        <div class="mobile-project-img">
          <img src="${item.img}" alt="${item.name} project" />
        </div>
        <div class="mobile-project-info">
          <h2 class="mobile-project-title">${item.name}</h2>
          <p class="mobile-project-description">${item.description}</p>
        </div>
      </div>
    `;
    
    container.appendChild(projectSection);
    
    // Simple fade-in animation for each project
    gsap.fromTo(projectSection,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: projectSection,
          start: 'top 85%',
          end: 'top 60%',
          scrub: 1,
        }
      }
    );
  });
  
  // Append all projects to spotlight
  spotlight.appendChild(container);
}

// ============================================
// Circle Morph Animation
// ============================================
function handleCircleMorph(progress) {
  const previewImg = document.querySelector('.preview-img');
  const previewText = document.querySelector('.preview-text');
  const previewContainer = document.querySelector('.preview-container');
  
  // ENTRY TIMING: Adjust these values to control when entry animation happens
  // entryMorphStart: When to start (0 = immediately, negative = before spotlight pins)
  // entryMorphDuration: How long the entry lasts (0.25 = 25% of scroll)
  const entryMorphStart = -0.15; // Start well before spotlight section pins
  const entryMorphDuration = 0.3;
  const entryMorphProgress = progress >= entryMorphStart
    ? Math.min((progress - entryMorphStart) / entryMorphDuration, 1)
    : 0;

  // Calculate when last spotlight item completes
  const lastItemEndProgress = (SPOTLIGHT_ITEMS.length - 1) * CONFIG.animation.gap + CONFIG.animation.speed;

  // EXIT TIMING: Adjust these values to control when exit animation happens
  // exitMorphStart: Offset from last item end (negative = earlier, 0 = right after)
  // exitMorphDuration: How long the exit lasts
  const exitMorphStart = lastItemEndProgress - 0.15; // Start well before last item completes
  const exitMorphDuration = 0.35;
  const exitMorphProgress = progress >= exitMorphStart ?
    Math.min((progress - exitMorphStart) / exitMorphDuration, 1) : 0;
  
  // Handle exit animation (reverse of entry)
  if (exitMorphProgress > 0) {
    handleCircleExit(exitMorphProgress, previewImg, previewText, previewContainer);
    return;
  }
  
  // Phase 1: Circle entry and positioning (0 to 0.5 of morph, extended from 0.4)
  if (entryMorphProgress <= 0.5) {
    const entryProgress = entryMorphProgress / 0.5;

    // Simple right-to-left movement
    // Start position: right edge of container
    // End position: centered in preview-container
    const startX = (window.innerWidth * 0.5) - 100; // Start from right edge
    const endX = 0; // End at center
    const endY = 0; // Stays vertically centered

    // Smooth cubic easing for more deliberate movement
    const t = entryProgress;
    const eased = t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2; // Ease in-out cubic (slower, smoother)

    const currentX = startX + (endX - startX) * eased;
    const currentY = endY;

    gsap.set(previewContainer, {
      y: currentY,
      x: currentX
    });

    // Keep as circle
    // Fade in the black circle as it flies in from the right
    // Circle fades in from 0% to 20% of entry animation
    let circleFrameOpacity = 0;
    if (entryProgress > 0) {
      circleFrameOpacity = Math.min(entryProgress / 0.2, 1);
    }

    gsap.set(previewImg, {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      opacity: circleFrameOpacity
    });

    // Image and text stay hidden
    gsap.set(previewImg.querySelector('img'), { opacity: 0 });
    gsap.set(previewText, { opacity: 0 });
    
  }
  // Phase 2: Circle locked, morph to rectangle (0.5 to 1.0 of morph, adjusted from 0.4)
  else {
    const morphShapeProgress = (entryMorphProgress - 0.5) / 0.5;
    
    // Lock position at center
    gsap.set(previewContainer, {
      y: 0,
      x: 0
    });
    
    // Morph dimensions
    const startWidth = 100;
    const startHeight = 100;
    const endWidth = 600;
    const endHeight = 400;
    
    const currentWidth = gsap.utils.interpolate(startWidth, endWidth, morphShapeProgress);
    const currentHeight = gsap.utils.interpolate(startHeight, endHeight, morphShapeProgress);
    
    // Morph border radius (50% to 10px)
    const currentBorderRadius = gsap.utils.interpolate(50, 1.67, morphShapeProgress); // 10px / 600px * 100 = 1.67%
    
    gsap.set(previewImg, {
      width: `${currentWidth}px`,
      height: `${currentHeight}px`,
      borderRadius: `${currentBorderRadius}%`
    });
    
    // Reveal image as shape morphs and scale it to match container
    const imageOpacity = morphShapeProgress;
    gsap.set(previewImg.querySelector('img'), { 
      opacity: imageOpacity,
      width: `${currentWidth}px`,
      height: `${currentHeight}px`,
      borderRadius: `${currentBorderRadius}%`
    });
    
    // Show text after morph completes
    if (entryMorphProgress >= 0.95) {
      const textOpacity = (entryMorphProgress - 0.95) / 0.05;
      gsap.set(previewText, { opacity: textOpacity });
    } else {
      gsap.set(previewText, { opacity: 0 });
    }
  }
}

// ============================================
// Circle Exit Animation (Reverse)
// ============================================
function handleCircleExit(exitProgress, previewImg, previewText, previewContainer) {
  // Phase 1: Fade out text and morph rectangle back to circle (0 to 0.6)
  if (exitProgress <= 0.6) {
    const morphShapeProgress = exitProgress / 0.6;
    
    // Keep position centered
    gsap.set(previewContainer, {
      y: 0,
      x: 0
    });
    
    // Fade out text immediately
    const textOpacity = 1 - (morphShapeProgress * 2); // Fade out faster
    gsap.set(previewText, { opacity: Math.max(0, textOpacity) });
    
    // Reverse morph: rectangle back to circle
    const startWidth = 600;
    const startHeight = 400;
    const endWidth = 100;
    const endHeight = 100;
    
    const currentWidth = gsap.utils.interpolate(startWidth, endWidth, morphShapeProgress);
    const currentHeight = gsap.utils.interpolate(startHeight, endHeight, morphShapeProgress);
    
    // Reverse border radius (1.67% back to 50%)
    const currentBorderRadius = gsap.utils.interpolate(1.67, 50, morphShapeProgress);
    
    gsap.set(previewImg, {
      width: `${currentWidth}px`,
      height: `${currentHeight}px`,
      borderRadius: `${currentBorderRadius}%`
    });
    
    // Fade out image as shape morphs back and scale it down
    const imageOpacity = 1 - morphShapeProgress;
    gsap.set(previewImg.querySelector('img'), { 
      opacity: imageOpacity,
      width: `${currentWidth}px`,
      height: `${currentHeight}px`,
      borderRadius: `${currentBorderRadius}%`
    });
  }
  // Phase 2: Move circle right and exit (0.5 to 1.0, extended from 0.6)
  else {
    const exitMoveProgress = (exitProgress - 0.5) / 0.5;

    // Simple left-to-right exit
    const startX = 0; // Start at center
    const endX = (window.innerWidth * 0.5) - 100; // Exit to right edge
    const endY = 0; // Stay vertically centered

    // Smooth cubic easing for more deliberate movement
    const t = exitMoveProgress;
    const eased = t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2; // Ease in-out cubic (slower, smoother)

    const currentX = startX + (endX - startX) * eased;
    const currentY = endY;

    gsap.set(previewContainer, {
      y: currentY,
      x: currentX
    });
    
    // Stay as circle
    gsap.set(previewImg, {
      width: '100px',
      height: '100px',
      borderRadius: '50%'
    });
    
    // Keep everything hidden
    gsap.set(previewImg.querySelector('img'), { opacity: 0 });
    gsap.set(previewText, { opacity: 0 });
  }
}

// ============================================
// Preview Pane
// ============================================
function updatePreviewPane(activeIndex) {
  if (activeIndex !== -1 && activeIndex !== state.currentActiveIndex) {
    const item = SPOTLIGHT_ITEMS[activeIndex];
    
    // Check if image is already loaded/cached
    const isImageCached = elements.previewImg.src.endsWith(item.img);
    
    if (isImageCached) {
      // Image is already showing, no need to transition
      elements.previewTitle.textContent = item.name;
      elements.previewDescription.textContent = item.description;
      state.currentActiveIndex = activeIndex;
      return;
    }
    
    // Fade transition with immediate image swap (no wait for onComplete)
    gsap.to(elements.previewImg, {
      opacity: 0,
      duration: CONFIG.transitions.imageFade,
      onComplete: () => {
        // Update content
        elements.previewTitle.textContent = item.name;
        elements.previewDescription.textContent = item.description;
        
        // Swap image and fade in immediately (image should be in browser cache)
        elements.previewImg.src = item.img;
        elements.previewImg.alt = `${item.name} project preview`;
        
        // Fade in immediately without waiting for load event (images are preloaded)
        gsap.to(elements.previewImg, {
          opacity: 1,
          duration: CONFIG.transitions.imageFade
        });
      }
    });
    
    state.currentActiveIndex = activeIndex;
  }
}

function handlePreviewExit(progress) {
  const lastItemProgress = getProgressState(
    SPOTLIGHT_ITEMS.length - 1, 
    progress, 
    CONFIG.animation.gap, 
    CONFIG.animation.speed
  );
  
  // Simply keep the preview in place - let the natural unpin handle the exit
  if (lastItemProgress > 1.0) {
    // Optional: Add a subtle fade as it starts to exit
    const exitProgress = Math.min((lastItemProgress - 1.0) / 0.2, 1);
    gsap.set(elements.previewContainer, { 
      opacity: 1 - (exitProgress * 0.3) // Subtle fade to 70% opacity
    });
  } else {
    // Default state - fully visible
    gsap.set(elements.previewContainer, { 
      opacity: 1 
    });
  }
}

// ============================================
// About Intro Animation
// ============================================
function createAboutIntroAnimation() {
  const textElements = document.querySelectorAll('.about-intro-text');
  
  textElements.forEach((text, index) => {
    // Single timeline controlling both fade in and fade out
    gsap.timeline({
      scrollTrigger: {
        trigger: text,
        start: 'top 80%',
        end: 'top -20%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          if (progress < 0.3) {
            // Fade in phase (0 to 0.3)
            const fadeInProgress = progress / 0.3;
            gsap.set(text, { opacity: fadeInProgress });
          } else if (progress < 0.6) {
            // Fully visible phase (0.3 to 0.6)
            gsap.set(text, { opacity: 1 });
          } else {
            // Fade out phase (0.6 to 1.0)
            const fadeOutProgress = (progress - 0.6) / 0.4;
            gsap.set(text, { opacity: 1 - fadeOutProgress });
          }
        }
      }
    });
  });
}

// Section Headline Animation
// ============================================
function createSectionHeadlineAnimation() {
  const headlineText = document.querySelector('.section-headline-text');
  
  if (headlineText) {
    // Single timeline controlling both fade in and fade out
    gsap.timeline({
      scrollTrigger: {
        trigger: headlineText,
        start: 'top 80%',
        end: 'top -20%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          if (progress < 0.3) {
            // Fade in phase (0 to 0.3)
            const fadeInProgress = progress / 0.3;
            gsap.set(headlineText, { opacity: fadeInProgress });
          } else if (progress < 0.6) {
            // Fully visible phase (0.3 to 0.6)
            gsap.set(headlineText, { opacity: 1 });
          } else {
            // Fade out phase (0.6 to 1.0)
            const fadeOutProgress = (progress - 0.6) / 0.4;
            gsap.set(headlineText, { opacity: 1 - fadeOutProgress });
          }
        }
      }
    });
  }
}

// Spotlight Animation

// ============================================
// Logo Animation
// ============================================
function initializeLogoAnimation() {
  const initialLogoWidth = CONFIG.logo.initialWidth;
  const finalLogoWidth = getResponsiveValue(
    CONFIG.logo.finalWidthDesktop, 
    CONFIG.logo.finalWidthMobile,
    CONFIG.logo.finalWidthTablet
  );
  
  // Check if page was refreshed while scrolled down
  const scrollY = window.scrollY;
  const isScrolled = scrollY > 0;
  
  if (isScrolled) {
    // Skip CSS animation and immediately position logo correctly
    gsap.set(elements.logoContainer, { 
      clearProps: 'animation',
      opacity: 1
    });
    handleLogoRefreshState(initialLogoWidth, finalLogoWidth);
    createLogoScrollAnimation(initialLogoWidth, finalLogoWidth);
  } else {
    // Normal page load at top - play CSS animation then enable ScrollTrigger
    window.addEventListener('load', () => {
      setTimeout(() => {
        // Clear CSS animation and set to center
        gsap.set(elements.logoContainer, { 
          clearProps: 'animation',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 1
        });
        
        // Create scroll-triggered animation
        createLogoScrollAnimation(initialLogoWidth, finalLogoWidth);
        
      }, CONFIG.logo.cssAnimationDuration);
    });
  }
}

function handleLogoRefreshState(initialLogoWidth, finalLogoWidth) {
  const scrollY = window.scrollY;
  
  if (scrollY > 0) {
    const introElement = document.querySelector('.intro');
    const aboutIntroElement = document.querySelector('.about-intro');
    const windowHeight = window.innerHeight;
    
    const introBottom = introElement.offsetTop + introElement.offsetHeight;
    const aboutIntroTop = aboutIntroElement.offsetTop;
    const triggerStart = introBottom - windowHeight;
    const triggerEnd = aboutIntroTop + (windowHeight * 0.6);
    
    if (scrollY >= triggerStart && scrollY <= triggerEnd) {
      // Within animation zone - apply progress-based position
      const progress = (scrollY - triggerStart) / (triggerEnd - triggerStart);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      applyLogoProgress(clampedProgress, initialLogoWidth, finalLogoWidth);
    } else if (scrollY > triggerEnd) {
      // Past animation zone - lock to final state
      setLogoFinalState(finalLogoWidth);
    } else {
      // Before trigger start - reset to center
      gsap.set(elements.logoContainer, {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 1
      });
      gsap.set(elements.animatedLogo, {
        width: initialLogoWidth + 'px'
      });
    }
  }
}

function createLogoScrollAnimation(initialLogoWidth, finalLogoWidth) {
  // Single ScrollTrigger that handles the entire logo animation
  // Triggers immediately when user starts scrolling from intro
  const trigger = ScrollTrigger.create({
    id: 'logoAnimation',
    trigger: '.intro',
    start: 'bottom bottom',
    end: () => {
      // End when about-intro section is 40% from top
      const aboutIntroTop = document.querySelector('.about-intro').offsetTop;
      const windowHeight = window.innerHeight;
      return `+=${aboutIntroTop + (windowHeight * 0.6)}`;
    },
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      const clampedProgress = Math.max(0, Math.min(1, progress));
      
      // Always apply progress-based animation (allows reversing)
      applyLogoProgress(clampedProgress, initialLogoWidth, finalLogoWidth);
    },
    onLeaveBack: () => {
      // Ensure logo returns to center when scrolling back above trigger
      gsap.set(elements.logoContainer, {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 1
      });
      gsap.set(elements.animatedLogo, {
        width: initialLogoWidth + 'px'
      });
    }
  });
  
  return trigger;
}

function applyLogoProgress(progress, initialWidth, finalWidth) {
  const currentWidth = gsap.utils.interpolate(initialWidth, finalWidth, progress);
  
  // Clear the CSS animation so it doesn't interfere with GSAP
  if (progress > 0) {
    elements.logoContainer.style.animation = 'none';
  }
  
  // Calculate final position in pixels (2rem)
  const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const finalLeftPx = 2 * remInPx;
  const finalTopPx = 2 * remInPx;
  
  // Interpolate the translate percentage from -50% (centered) to 0% (no offset)
  const translatePercent = gsap.utils.interpolate(-50, 0, progress);
  
  // For positioning: start at 50% and end at the pixel value
  const leftValue = gsap.utils.interpolate(50, 0, progress);
  const topValue = gsap.utils.interpolate(50, 0, progress);
  
  // Calculate the pixel offset needed
  // At progress 0: left is 50% with -50% xPercent, so we're centered
  // At progress 1: left is 0% with 0% xPercent, plus we need finalLeftPx offset
  const xOffset = gsap.utils.interpolate(0, finalLeftPx, progress);
  const yOffset = gsap.utils.interpolate(0, finalTopPx, progress);
  
  gsap.set(elements.logoContainer, {
    left: `${leftValue}%`,
    top: `${topValue}%`,
    xPercent: translatePercent,
    yPercent: translatePercent,
    x: xOffset,
    y: yOffset,
    opacity: 1
  });
  
  gsap.set(elements.animatedLogo, {
    width: `${currentWidth}px`
  });
}

function setLogoFinalState(initialWidth, finalWidth) {
  gsap.set(elements.logoContainer, {
    left: CONFIG.logo.finalPosition.left,
    top: CONFIG.logo.finalPosition.top,
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    transformOrigin: '0% 0%',
    opacity: 1
  });
  gsap.set(elements.animatedLogo, {
    width: `${finalWidth}px`
  });
}

// ============================================
// Main Initialization
// ============================================
function init() {
  initializeDOMElements();
  initializeSmoothScrolling();
  createTitleElements();
  
  // Set initial preview content and hide it (animation will reveal it)
  if (SPOTLIGHT_ITEMS.length > 0) {
    const firstItem = SPOTLIGHT_ITEMS[0];
    elements.previewImg.src = firstItem.img;
    elements.previewImg.alt = `${firstItem.name} project preview`;
    elements.previewTitle.textContent = firstItem.name;
    elements.previewDescription.textContent = firstItem.description;
    
    // Set initial hidden state - will be revealed by animation
    const circleSize = 100;
    const startY = window.innerHeight - circleSize - 20;
    const startX = (window.innerWidth * 0.5) - circleSize - 20;
    
    gsap.set(elements.previewContainer, {
      y: startY,
      x: startX
    });
    
    gsap.set(elements.previewImg, {
      width: '100px',
      height: '100px',
      borderRadius: '50%'
    });
    
    gsap.set(elements.previewImg.querySelector('img'), { opacity: 0 });
    gsap.set(document.querySelector('.preview-text'), { opacity: 0 });
  }
  
  // Create animations immediately (don't block on image preload)
  createAboutIntroAnimation();
  createSectionHeadlineAnimation();
  createSpotlightAnimation();
  initializeLogoAnimation();
  
  // Aggressively preload and cache images by creating hidden img elements
  // This ensures images are in browser cache and ready for instant display
  const imageCache = document.createElement('div');
  imageCache.style.cssText = 'position: absolute; left: -9999px; visibility: hidden; width: 1px; height: 1px; overflow: hidden;';
  SPOTLIGHT_ITEMS.forEach(item => {
    const img = document.createElement('img');
    img.src = item.img;
    img.loading = 'eager'; // Prioritize loading
    img.style.cssText = 'position: absolute; width: 1px; height: 1px;';
    imageCache.appendChild(img);
  });
  document.body.appendChild(imageCache);
  
  // Also run the Promise-based preload for logging
  preloadImages(SPOTLIGHT_ITEMS).then(() => {
    console.log('Images preloaded and cached');
  });
  
  // Handle window resize
  window.addEventListener('resize', debounce(() => {
    ScrollTrigger.refresh();
  }, 250));
  
  // Section headline is now part of spotlight and stays pinned
  // No fade animation needed - it stays visible throughout the spotlight section
}

// Start the application
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
