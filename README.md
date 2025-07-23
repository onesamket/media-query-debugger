# media-query-debugger

[![npm version](https://badge.fury.io/js/media-query-debugger.svg)](https://badge.fury.io/js/media-query-debugger)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Advanced media query debugger and responsive design testing tool for React applications. Features device mockups, real-time media query monitoring, and comprehensive debugging tools.

## ✨ Features

- 🔍 **Real-time Media Query Detection** - Live monitoring of active breakpoints and media queries
- 📱 **Device Mockups** - Realistic device frames with live site rendering
- 🎯 **Visual Debugging Tools** - Grid overlays, rulers, and measurement tools
- ⚡ **Performance Optimized** - Lightweight with minimal bundle impact
- 🎨 **Customizable** - Configurable breakpoints, devices, and themes
- ⌨️ **Keyboard Shortcuts** - Quick access with customizable hotkeys
- 🌙 **Dark/Light Theme** - Built-in theme support
- 📦 **TypeScript Ready** - Full TypeScript support with type definitions

## 🚀 Installation

```bash
npm install media-query-debugger
# or
yarn add media-query-debugger
# or
pnpm add media-query-debugger
```

## 📖 Quick Start

### Basic Usage

```tsx
import { MediaQueryDebugger } from 'media-query-debugger'
import 'media-query-debugger/styles'

function App() {
  return (
    <div>
      {/* Your app content */}
      <MediaQueryDebugger />
    </div>
  )
}
```

### With Custom Configuration

```tsx
import { MediaQueryDebugger } from 'media-query-debugger'

const customBreakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
}

function App() {
  return (
    <div>
      <MediaQueryDebugger
        breakpoints={customBreakpoints}
        position="top-right"
        theme="dark"
        defaultOpen={false}
        onBreakpointChange={(breakpoint) => {
          console.log('Current breakpoint:', breakpoint)
        }}
        enableKeyboardShortcuts={true}
      />
    </div>
  )
}
```

## 🎛️ API Reference

### MediaQueryDebugger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `breakpoints` | `BreakpointConfig` | Tailwind defaults | Custom breakpoint configuration |
| `devices` | `Device[]` | Built-in devices | Custom device presets |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | Debugger position |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'dark'` | Theme configuration |
| `defaultOpen` | `boolean` | `false` | Whether to show debugger by default |
| `onBreakpointChange` | `(breakpoint: string) => void` | - | Callback when breakpoint changes |
| `onViewportChange` | `(viewport: ViewportInfo) => void` | - | Callback when viewport changes |
| `enableKeyboardShortcuts` | `boolean` | `true` | Enable keyboard shortcuts |

### Hooks

#### useMediaQuery

```tsx
import { useMediaQuery } from 'media-query-debugger'

function MyComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  return (
    <div>
      {isMobile ? 'Mobile View' : 'Desktop View'}
    </div>
  )
}
```

#### useViewport

```tsx
import { useViewport } from 'media-query-debugger'

function MyComponent() {
  const viewport = useViewport()
  
  return (
    <div>
      Current size: {viewport.width} × {viewport.height}
    </div>
  )
}
```

#### useBreakpoint

```tsx
import { useBreakpoint } from 'media-query-debugger'

function MyComponent() {
  const { current, isAbove, isBelow } = useBreakpoint()
  
  return (
    <div>
      <p>Current: {current}</p>
      <p>Above md: {isAbove('md') ? 'Yes' : 'No'}</p>
      <p>Below lg: {isBelow('lg') ? 'Yes' : 'No'}</p>
    </div>
  )
}
```

## 🎨 Styling

The package includes default styles that work with Tailwind CSS. Import the styles in your main CSS file or component:

```css
@import 'media-query-debugger/styles';
```

### Custom Styling

You can override the default styles by targeting the component classes:

```css
.media-query-debugger {
  /* Custom styles */
}
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + Shift + D` | Toggle debugger |
| `Escape` | Close debugger |

## 🔧 Advanced Usage

### Custom Device Presets

```tsx
const customDevices = [
  {
    name: 'Custom Mobile',
    width: 375,
    height: 812,
    category: 'mobile' as const,
    pixelRatio: 3,
    userAgent: 'Custom',
  },
  // ... more devices
]

<MediaQueryDebugger devices={customDevices} />
```

### Integration with Design Systems

```tsx
// With Chakra UI
import { ChakraProvider } from '@chakra-ui'
import { MediaQueryDebugger } from 'media-query-debugger'

function App() {
  return (
    <ChakraProvider>
      <YourApp />
      <MediaQueryDebugger 
        breakpoints={{
          base: 0,
          sm: 480,
          md: 768,
          lg: 992,
          xl: 1280,
        }}
      />
    </ChakraProvider>
  )
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.
