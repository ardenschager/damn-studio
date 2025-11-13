#!/bin/bash

# Image optimization script for DAMN Studio
# Uses macOS native 'sips' tool for image optimization

echo "Starting image optimization with sips..."

# Create optimized directory
mkdir -p assets/optimized
mkdir -p assets/optimized/headshots

# Function to optimize image
optimize_image() {
  local input=$1
  local output_jpg=$2
  local width=$3

  echo "Optimizing: $input"

  # Get original size
  original_size=$(du -h "$input" | cut -f1)

  # Resize image to specified width (maintains aspect ratio)
  # --setProperty format jpeg sets output format
  # --setProperty formatOptions 80 sets JPEG quality to 80%
  sips -Z "$width" --setProperty format jpeg --setProperty formatOptions 80 "$input" --out "$output_jpg" > /dev/null 2>&1

  # Get new size
  if [ -f "$output_jpg" ]; then
    jpg_size=$(du -h "$output_jpg" | cut -f1)
    echo "  $original_size -> $jpg_size"
  else
    echo "  ERROR: Failed to create $output_jpg"
  fi
}

echo ""
echo "=== Optimizing Main Project Images ==="
# Main project images - resize to 1920px wide
optimize_image "assets/img01.jpg" "assets/optimized/img01.jpg" 1920
optimize_image "assets/img02.jpg" "assets/optimized/img02.jpg" 1920
optimize_image "assets/img03.jpg" "assets/optimized/img03.jpg" 1920

echo ""
echo "=== Optimizing Headshot Images ==="
# Headshots - resize to 800px wide
optimize_image "assets/headshots/daniel.jpg" "assets/optimized/headshots/daniel.jpg" 800
optimize_image "assets/headshots/nicole_fox.jpg" "assets/optimized/headshots/nicole_fox.jpg" 800
optimize_image "assets/headshots/matias.JPG" "assets/optimized/headshots/matias.jpg" 800
optimize_image "assets/headshots/arden.jpg" "assets/optimized/headshots/arden.jpg" 800

echo ""
echo "=== Optimization Complete ==="
echo ""
echo "Directory sizes:"
echo "Original: $(du -sh assets/ | cut -f1)"
echo "Optimized: $(du -sh assets/optimized/ | cut -f1)"
echo ""
echo "✓ Images optimized and resized"
echo ""
echo "To backup originals and use optimized images:"
echo "  ./replace-images.sh"
