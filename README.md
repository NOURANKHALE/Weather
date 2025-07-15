# Weather App 🌤️

A modern, responsive weather application built with Next.js 15, TypeScript, and Redux Toolkit. Features real-time weather data, internationalization (i18n), advanced theming, persistent state, and a beautiful UI with enhanced performance and user experience.

## ✨ Features

- **🌍 Real-time Weather Data** - Get current weather and forecasts for any city
- **📍 Geolocation Support** - Automatic location detection with graceful permission dialog
- **🗺️ Interactive Maps** - Visual weather data on maps with multi-tab support
- **🌪️ Advanced Wind Visualization** - Interactive wind direction and speed pie chart with animated needle
- **🔀 Sortable Forecast Grid** - Drag-and-drop daily forecast cards, persistent order via localStorage
- **🌐 Internationalization & RTL** - Support for English (LTR) and Arabic (RTL), with full UI direction support
- **🌙 Dark/Light Theme** - Advanced theming with oklch color and CSS custom properties
- **♿ Accessibility** - Focus-visible outlines, color contrast, and keyboard navigation
- **📱 Responsive Design** - Works perfectly on all devices
- **⚡ Performance Optimized** - Fast loading with API caching and persistent Redux state
- **🔍 Search History** - Remember your recent searches with debounced search and persistent history
- **🛡️ Error Handling** - Graceful error handling and recovery
- **💾 Data Persistence** - Search history, card order, and location preferences saved locally with type safety

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # Internationalized routes (en, ar, ...)
│   │   ├── forecast/       # Forecast page
│   │   ├── map/            # Map page
│   │   ├── shared/         # Shared components (Header, etc.)
│   │   └── ...
│   ├── globals.css         # Global styles, theming, accessibility
│   ├── layout.tsx          # Root layout
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui components (Button, Card, Sidebar, etc.)
│   ├── AppSidebar.tsx      # Sidebar navigation
│   ├── SortableGrid.tsx    # Drag-and-drop grid
│   ├── ModeToggle.tsx      # Theme switcher
│   └── ...                 # Custom components
├── features/               # Feature-based modules
│   ├── weather/            # Weather functionality (slices, services,components,utils)
│   ├── search/             # Search functionality (slices, hooks, components)
│   ├── map/                # Map functionality (slices, hooks, components)
│   └── forecast/           # Forecast functionality (components, hooks)
├── hooks/                  # Custom React hooks
├── i18n/                   # Internationalization config and helpers
├── lib/                    # Providers, utilities, and configurations
│   ├── Providers.tsx       # Redux provider and other context providers
│   ├── utils/              # Utility functions (api, storage, text)
│   └── Utils.ts            # General utilities
├── constants/              # Application constants
│   └── Constants.ts        # App-wide constants
├── store/                  # Redux store configuration (with redux-persist)
│   └── Store.tsx           # Store setup
└── messages/               # Translation files (en.json, ar.json)
```

### Key Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **State Management**: Redux Toolkit + redux-persist
- **Styling**: Tailwind CSS + shadcn/ui + oklch color
- **Internationalization**: next-intl
- **Maps**: Leaflet + React Leaflet
- **Drag & Drop**: dnd-kit
- **Charts**: recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React + React Icons

## 🎯 Key Improvements

- **Persistent Redux State**: All main slices (weather, search, map) are persisted for seamless user experience.
- **Type-Safe Local Storage**: Custom utility for robust, type-safe, error-resilient localStorage management.
- **Sortable Forecast Grid**: Users can reorder daily forecast cards via drag-and-drop, with persistent order.
- **Advanced Wind Visualization**: Interactive wind direction and speed pie chart with animated needle.
- **Location Permission Dialog**: Graceful handling of geolocation permissions.
- **Multi-Tab Map View**: Map page supports multiple tabs for different weather/map data views.
- **Accessibility**: Focus-visible outlines, color contrast, and keyboard navigation.
- **Enhanced Theming**: Uses CSS custom properties and oklch color for advanced light/dark theming.
- **RTL Support**: Full right-to-left support for Arabic, including UI direction and translations.

## 🔧 Configuration

### Environment Variables

```env
# Required
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key

# Optional
NEXT_PUBLIC_APP_NAME=Weather App
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

### API Configuration

The app uses OpenWeatherMap API for weather data. Configure the API in `src/constants/Constants.ts`:

```typescript
export const API_CONFIG = {
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000, // 10 seconds
  retryAttempts: 3,
  cacheTime: 5 * 60 * 1000, // 5 minutes
};
```

## 📱 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Internationalization

The app supports multiple languages:

- **English** (`en`) - Default
- **Arabic** (`ar`) - RTL support

### Adding New Languages

1. Add locale to `src/i18n/routing.ts`
2. Create translation files in `messages/`
3. Update `src/constants/Constants.ts`

## 🎨 Theming & Accessibility

- **Light/Dark Theme**: Toggle with ModeToggle, powered by CSS custom properties and oklch color.
- **Accessible UI**: Focus-visible outlines, color contrast, keyboard navigation, and ARIA best practices.
- **RTL Support**: Full right-to-left support for Arabic, including UI direction and translations.

## 📊 Performance & Persistence

- **API Response Caching**: 5-minute TTL for weather data
- **Persistent Redux State**: All main slices are persisted with redux-persist
- **Type-Safe Local Storage**: Custom utility for robust, type-safe, error-resilient localStorage management
- **Persistent Card Order**: SortableGrid and weather/forecast cards remember user order
- **Search History**: Persistent localStorage for user preferences

## 🔍 Search & Forecast Features

- **Debounced Search**: 500ms delay to prevent excessive API calls
- **Search History**: Quick access to recent searches, persistent across sessions
- **Sortable Forecast Grid**: Drag-and-drop daily forecast cards, persistent order
- **Advanced Wind Visualization**: Interactive wind direction and speed pie chart with animated needle

## 🛡️ Error Handling

- **Network Errors**: Graceful handling of connection issues
- **Rate Limiting**: User-friendly messages for API limits
- **Invalid Input**: Clear error messages for invalid city names
- **Retry Logic**: Automatic retry for transient failures
- **Error Boundaries**: Prevents app crashes
- **Loading States**: Clear feedback during operations
- **Fallback Content**: Graceful degradation when data unavailable

## 📦 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [dnd-kit](https://dndkit.com/) for drag-and-drop
- [recharts](https://recharts.org/) for charts

## 📞 Support

If you have any questions or need help:

- Create an issue on GitHub
- Check the documentation
