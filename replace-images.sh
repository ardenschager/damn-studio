#!/bin/bash

# Replace original images with optimized versions
# Creates backups of originals in assets/originals/

echo "Backing up original images..."

# Create backup directory
mkdir -p assets/originals
mkdir -p assets/originals/headshots

# Backup original images
echo "Creating backups..."
cp assets/img01.jpg assets/originals/
cp assets/img02.jpg assets/originals/
cp assets/img03.jpg assets/originals/
cp assets/damn_logo.png assets/originals/
cp assets/headshots/daniel.jpg assets/originals/headshots/
cp assets/headshots/nicole_fox.jpg assets/originals/headshots/
cp assets/headshots/matias.JPG assets/originals/headshots/
cp assets/headshots/arden.jpg assets/originals/headshots/

echo "Replacing with optimized versions..."

# Replace with optimized versions
cp assets/optimized/img01.jpg assets/
cp assets/optimized/img02.jpg assets/
cp assets/optimized/img03.jpg assets/
cp assets/optimized/headshots/daniel.jpg assets/headshots/
cp assets/optimized/headshots/nicole_fox.jpg assets/headshots/
cp assets/optimized/headshots/matias.jpg assets/headshots/matias.JPG
cp assets/optimized/headshots/arden.jpg assets/headshots/

echo ""
echo "✓ Complete!"
echo ""
echo "Original images backed up to: assets/originals/"
echo "Optimized images now in use"
echo ""
echo "Before: 65M"
echo "After:  2.7M"
echo "Savings: 96% reduction in image size"
