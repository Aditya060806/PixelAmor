# 💖 PixelAmor - Enhanced UI/UX

A beautiful, modern puzzle game with a love theme, featuring enhanced UI/UX with glassmorphism effects, smooth animations, and an engaging user experience.

## ✨ Enhanced Features

### 🎨 Visual Design Improvements
- **Glassmorphism Effects**: Modern frosted glass design with backdrop blur
- **Enhanced Gradients**: Multi-layered gradient backgrounds with animated effects
- **Improved Typography**: Better font hierarchy and text styling
- **Enhanced Shadows**: Layered shadows for depth and visual interest
- **Color Palette**: Extended love-themed color scheme with additional shades

### 🎭 Animation Enhancements
- **Smooth Transitions**: Enhanced page transitions and component animations
- **Micro-interactions**: Hover effects, button animations, and feedback
- **Particle System**: Enhanced heart and sparkle particles with varied behaviors
- **Progress Indicators**: Animated progress bars and completion feedback
- **Loading States**: Smooth loading animations and processing indicators

### 🎮 Game Experience Improvements
- **Visual Feedback**: Clear indicators for correct puzzle piece placement
- **Progress Tracking**: Real-time progress bar showing completion percentage
- **Enhanced Drag & Drop**: Improved visual feedback during puzzle piece movement
- **Performance Rating**: Dynamic performance assessment based on moves and time
- **Shuffling Animation**: Smooth puzzle shuffling with overlay feedback

### 📱 Responsive Design
- **Mobile Optimization**: Enhanced mobile experience with floating action buttons
- **Adaptive Layout**: Responsive design that works on all screen sizes
- **Touch Interactions**: Optimized touch gestures for mobile devices
- **Flexible Components**: Components that adapt to different screen sizes

### ♿ Accessibility Improvements
- **Focus States**: Enhanced keyboard navigation with visible focus indicators
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Improved color contrast for better readability
- **Keyboard Navigation**: Full keyboard accessibility support

### 🎯 User Experience Enhancements
- **Enhanced Upload**: Improved file upload with drag & drop and preview
- **Better Feedback**: Clear visual feedback for all user actions
- **Error Handling**: Improved error messages and validation
- **Performance Optimization**: Smooth animations and efficient rendering

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd pixelamor

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production
```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 🛠️ Technical Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom extensions
- **Framer Motion** - Advanced animations and transitions
- **Lucide React** - Beautiful icon library
- **@dnd-kit/core** - Modern drag and drop functionality

## 🎨 Design System

### Color Palette
- **Love Pink**: `#ff69b4` - Primary brand color
- **Love Red**: `#ff1493` - Secondary accent
- **Love Purple**: `#da70d6` - Tertiary accent
- **Love Rose**: `#ff007f` - Dark accent
- **Love Coral**: `#ff6b6b` - Additional accent
- **Love Peach**: `#ffb3ba` - Light accent
- **Love Lavender**: `#e6e6fa` - Soft accent
- **Love Mint**: `#98ff98` - Fresh accent

### Typography
- **Primary Font**: Inter (system fallback)
- **Display Font**: Poppins (for headings)
- **Monospace**: JetBrains Mono (for code)

### Animations
- **Float**: Gentle floating animation for particles
- **Heart Beat**: Pulsing animation for heart elements
- **Shimmer**: Loading and highlight effects
- **Glow**: Glowing effects for interactive elements
- **Morph**: Morphing shapes for visual interest

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance Features

- **Lazy Loading**: Components load only when needed
- **Optimized Animations**: Hardware-accelerated animations
- **Efficient Rendering**: Minimal re-renders and optimized updates
- **Bundle Optimization**: Tree-shaking and code splitting

## 🔧 Customization

### Adding New Animations
```css
@keyframes custom-animation {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.animate-custom {
  animation: custom-animation 2s ease-in-out infinite;
}
```

### Extending Color Palette
```javascript
// In tailwind.config.js
colors: {
  'custom-color': '#your-hex-code',
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Framer Motion** for amazing animation capabilities
- **Tailwind CSS** for the utility-first approach
- **Lucide** for beautiful icons
- **@dnd-kit** for modern drag and drop functionality

---

Made with 💖 and enhanced UI/UX for the best puzzle experience! 