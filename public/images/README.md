# DogCatPaw Images

This directory contains static images for the DogCatPaw frontend application.

## Hero Section Background

To use the HeroSection component, place your hero background image here:

### Required Image
- **Path**: `/public/images/hero-bg.jpg`
- **Recommended Size**: 1321 x 713 pixels (aspect ratio 1321/713)
- **Format**: JPG, PNG, or WebP
- **File Size**: < 500KB (optimized for web)

### Image Specifications
The background image will be displayed with the following properties:
- **Opacity**: 0.75
- **Background Position**: -74.213px 0px (desktop), centered (mobile)
- **Background Size**: 105.618% 110.013%
- **Overlay Color**: Light gray (rgb(211, 211, 211))

## Responsive Behavior

### Desktop (1024px+)
- Height: 713px
- Background position: -74.213px 0px
- Full aspect ratio maintained

### Tablet (768px - 1023px)
- Minimum height: 500px
- Background position: -37px 0px
- Adjusted for smaller screens

### Mobile (< 768px)
- Minimum height: 400px
- Background position: center
- Optimized for mobile viewing

## Image Optimization Tips

1. **Use WebP format** for better compression
2. **Compress images** before uploading
3. **Use descriptive alt text** for accessibility
4. **Consider lazy loading** for below-the-fold images

## Example Usage

```tsx
import { HeroSectionCentered } from '@/components/layout/HeroSection';

<HeroSectionCentered
  backgroundImage="/images/hero-bg.jpg"
  height={713}
  backgroundOpacity={0.75}
  overlayColor="rgb(211, 211, 211)"
>
  <h1>Your Hero Title</h1>
</HeroSectionCentered>
```

## Directory Structure

```
/public/images/
├── hero-bg.jpg          # Main hero background
├── logo.png             # DogCatPaw logo
├── pets/                # Pet images
├── features/            # Feature section icons
└── README.md            # This file
```

## Adding Custom Background Images

You can override the default background image by passing a custom path:

```tsx
<HeroSectionCentered
  backgroundImage="/images/custom-hero.jpg"
  // ... other props
/>
```

## Supported Formats

- JPG/JPEG
- PNG
- WebP (recommended)
- SVG (for icons and logos)
