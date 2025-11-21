# DAMN Studio Website

## Project Overview

DAMN is an NYC-based creative collective creating immersive environments. This website showcases their work and team, featuring interactive animations and scroll-based experiences.

The site works at the intersections of spatial design, illustration, custom fabrication, graphic design, and interactive media.

## Technical Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Animations**: GSAP (GreenSock Animation Platform) with ScrollTrigger
- **Smooth Scrolling**: Lenis
- **Typography**: DM Sans (Google Fonts)

## Project Structure

- `index.html` - Main HTML structure
- `style.css` - All styling and animations
- `main.js` - Core JavaScript functionality and scroll animations
- `config.js` - Project data configuration (clients, projects)
- `utils.js` - Utility functions
- `assets/` - Images, logos, and other media assets

## Key Features

1. **Animated Logo Introduction**: DAMN logo with reveal animation
2. **About Section**: Introductory text about the collective
3. **Interactive Spotlight**: Scroll-triggered preview system showing client work
4. **Team Profiles**: Grid showcasing team members with headshots and bios
5. **Call to Action**: Contact section encouraging collaboration

## Team Members

- **Daniel Toretski** - Creative Direction
- **Nicole Fox** - Illustration and Design
- **Matías Piña** - Interactive Media
- **Arden Schager** - Software and Sound

## Feedback from Nicole - Action Items

### High Priority

- [x] **Logo opening animation**: Make it twice as big and enhance animation
  - Logo now starts at 1000px (2x the previous 500px)
  - Individual SVG dots (37 total) with exact positions from damn.svg
  - **Two animation styles** (configurable via `logo-config.json`):
    - **Flutter** (default): Dots drift in gently from above like falling leaves with rotation
    - **Percolate**: Dots bubble in from random positions with elastic bounce
  - Interactive mouse repulsion effect - dots move away from cursor with smooth falloff
  - Scales down to same final size on scroll (dots scale proportionally)
  - Subtle mouse interaction maintained even when logo is in corner
  - Easy configuration via `logo-config.json` for animation style and interaction parameters
- [x] **Fix Daniel's name spelling**: Currently misspelled in the code
  - Fixed to "Daniel Toretsky" in index.html:69
- [ ] **Responsive design**: Site is not currently reactive/responsive
- [ ] **Typography consistency**: Ensure type matches PDF branding materials

### Design Enhancements

- [ ] **Black circle tension**: Reconsider the black circle element - creates suspense but people can't focus on two things at once
- [ ] **Chapter structure**: Organize site into three distinct chapters:
  1. Logo (playful, fun)
  2. Text scrolling section
  3. Work showcase
  4. About us (black bg, white text, no lines around circle)

### Navigation & Interaction

- [ ] **Menu bar**: Add clear navigation system
- [ ] **Work page interaction**: Decide how users interact with projects
  - Consider grid or assembly layout
  - Maintain flashy aesthetic
  - Show everything on work page
- [ ] **Call to action**: Add explicit CTA earlier in the experience
  - Consider using dot motif as interactive CTA element

### Content

- [ ] **Proper crediting**: Ensure all work is properly credited
- [ ] **Skills section**: Clearly communicate what services are offered
- [ ] **Black dots motif**: Explore using black dots by themselves as a design element

### Current Strengths

- Text scrolling is good size
- Flashy aesthetic is well-received
- Typography is appropriately sized

## Development Notes

### Git Commit Protocol

**IMPORTANT**: After every significant change or feature implementation:
1. Test the changes work correctly
2. Commit with `git add -A && git commit -m "descriptive message"`
3. This creates restore points if something breaks

### Logo Configuration

The animated DAMN logo can be customized via `logo-config.json`:

```json
{
  "animation": {
    "style": "flutter"  // Options: "flutter" or "percolate"
  },
  "interaction": {
    "enableMouseRepulsion": true,
    "centerRadius": 400,      // Interaction radius when logo is centered (px)
    "centerForce": 25,        // Repulsion force when centered
    "cornerRadius": 200,      // Interaction radius when in corner (px)
    "cornerForce": 15         // Repulsion force when in corner
  }
}
```

**Animation Styles:**
- **flutter** (default) - Dots converge from all directions around the screen, creating a "multiplicity" effect with gentle rotation
- **percolate** - Dots bubble in from random positions with elastic bounce

### Animation Performance

- Images are preloaded for better performance
- GSAP ScrollTrigger used for scroll-based animations
- Lenis provides smooth scrolling experience
- Dots scale proportionally with logo size to maintain composition

### Image Optimization

- Use `optimize-images.sh` script for image optimization
- Use `replace-images.sh` script for batch image updates

## Contact

Email: hello@damnstudio.com
