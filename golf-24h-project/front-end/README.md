# Golf 24 VR Golf Interface

A modern Vue.js 3 interface for the Golf 24 VR Golf booking system, built with a modular component architecture.

## 🏗️ **Architecture Overview**

The project is organized into reusable components following Vue.js best practices:

### **Components Structure**
```
src/
├── components/           # Reusable UI components
│   ├── Header.vue       # Navigation and logo
│   ├── HeroSection.vue  # Main VR Golf introduction
│   ├── BookingStatus.vue # Interactive calendar
│   ├── BookingSpace.vue # Contact information
│   ├── ActivityList.vue # Services and activities
│   └── Footer.vue       # Footer with additional info
├── pages/               # Page components
│   └── HomePage.vue     # Main page using all components
├── types/               # TypeScript interfaces
│   └── components.ts    # Component type definitions
└── stores/              # State management (Pinia)
```

## ✨ **Features**

- **Modular Design**: Each section is a separate, reusable component
- **TypeScript Support**: Full type safety with custom interfaces
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Interactive Calendar**: Visual booking status display with color-coded availability
- **Modern UI**: Beautiful gradients, shadows, and hover effects
- **Event Handling**: Proper component communication with emit/event system
- **Navigation**: Smooth scrolling navigation between sections
- **Contact Information**: Easy access to contact details and booking information

## 🎯 **Component Details**

### **Header Component**
- Logo and navigation menu
- Sticky positioning with gradient background
- Responsive mobile navigation

### **Hero Section**
- Main VR Golf introduction
- Call-to-action button with hover effects
- Gradient background and modern typography

### **Booking Status**
- Interactive calendar for August 2025
- Color-coded availability (red=booked, green=available)
- Click handlers for day selection
- Legend for status explanation

### **Booking Space**
- Contact information display
- Interactive email and phone buttons
- Professional styling with hover effects

### **Activity List**
- Service offerings with pricing
- Interactive cards with hover animations
- Price and duration information
- Call-to-action buttons

### **Footer**
- Extended contact information
- Business hours
- Professional layout with grid system

## 🛠️ **Technology Stack**

- **Vue.js 3**: Composition API with TypeScript
- **Vite**: Fast build tool and development server
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Pinia**: State management (ready for future enhancements)
- **TypeScript**: Full type safety and better development experience

## 🚀 **Getting Started**

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## 🔧 **Development**

### **Component Communication**
Components communicate through Vue's emit system:
- `@booking` - Hero section booking button
- `@day-click` - Calendar day selection
- `@email-click` - Contact email action
- `@phone-click` - Contact phone action
- `@activity-click` - Activity selection

### **Adding New Components**
1. Create component in `src/components/`
2. Add TypeScript interfaces in `src/types/`
3. Import and use in `HomePage.vue`
4. Handle events in the parent component

## 📱 **Responsive Design**

- **Desktop**: Full layout with all features
- **Tablet**: Optimized grid layouts
- **Mobile**: Stacked layouts with touch-friendly interactions

## 🎨 **Design Features**

- **Color Scheme**: Golf-themed greens and professional styling
- **Typography**: Chinese-friendly fonts with proper fallbacks
- **Animations**: Smooth hover effects and transitions
- **Accessibility**: Proper contrast ratios and interactive elements

## 🔮 **Future Enhancements**

- Real-time booking system integration
- User authentication and profiles
- Advanced calendar navigation
- Booking form integration
- Payment processing
- Multi-language support
- Component testing with Vitest
- Storybook for component documentation

## 📦 **Build for Production**

```bash
npm run build
```

## 📄 **License**

©2025 Copyright | All Rights Reserved
