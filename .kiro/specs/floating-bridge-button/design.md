# Floating Bridge Button Design

## Overview

The floating bridge button will be implemented as a globally available component that provides quick access to cross-chain bridging functionality. It will consist of a circular floating action button (FAB) that triggers a modal containing the LiFi bridge widget. The design emphasizes accessibility, performance, and seamless integration with the existing application architecture.

## Architecture

### Component Structure
```
FloatingBridgeButton (Main Component)
├── BridgeFloatingButton (Circular FAB)
├── BridgeModal (Modal Container)
│   ├── Modal Overlay
│   ├── Modal Content
│   │   ├── Modal Header
│   │   ├── LiFi Widget Container
│   │   └── Modal Footer
│   └── Close Button
└── Bridge Icon (SVG Component)
```

### Integration Points
- **Global Layout**: Integrated into the main layout component to appear on all pages
- **Particle Network**: Uses existing wallet connection state from `@particle-network/authkit`
- **LiFi Widget**: Leverages the existing LiFi widget configuration
- **State Management**: Uses React state for modal visibility and connection status
- **Styling**: Integrates with existing Tailwind CSS classes and design system

## Components and Interfaces

### 1. FloatingBridgeButton Component

**Purpose**: Main orchestrator component that manages the floating button and modal state.

**Props Interface**:
```typescript
interface FloatingBridgeButtonProps {
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  offset?: {
    x: number;
    y: number;
  };
  disabled?: boolean;
}
```

**Key Features**:
- Manages modal open/close state
- Handles wallet connection status
- Provides error handling for bridge operations
- Implements keyboard navigation support

### 2. BridgeFloatingButton Component

**Purpose**: The actual circular floating button with icon.

**Props Interface**:
```typescript
interface BridgeFloatingButtonProps {
  onClick: () => void;
  isConnected: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}
```

**Styling Specifications**:
- **Size**: 56px x 56px (standard FAB size)
- **Border Radius**: 50% (perfect circle)
- **Background**: Gradient from primary blue to secondary blue
- **Shadow**: `0 4px 12px rgba(59, 130, 246, 0.3)`
- **Hover Effect**: Scale to 1.05, enhanced shadow
- **Active Effect**: Scale to 0.95
- **Icon Size**: 24px x 24px, centered

### 3. BridgeModal Component

**Purpose**: Modal container for the LiFi bridge widget.

**Props Interface**:
```typescript
interface BridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress?: string;
  chainId?: number;
}
```

**Modal Specifications**:
- **Overlay**: Semi-transparent black background (rgba(0, 0, 0, 0.5))
- **Content**: White background, rounded corners (12px), max-width 600px
- **Animation**: Fade in/out with scale effect
- **Mobile**: Full-screen on mobile devices
- **Z-index**: 9999 to ensure it appears above all content

### 4. Bridge Icon Component

**Purpose**: SVG icon representing bridge/swap functionality.

**Icon Design**:
- Custom SVG icon with bridge/swap arrows
- Scalable vector format
- Optimized for 24px display size
- Accessible with proper aria-labels

## Data Models

### Bridge State Model
```typescript
interface BridgeState {
  isModalOpen: boolean;
  isConnected: boolean;
  walletAddress: string | null;
  chainId: number | null;
  isLoading: boolean;
  error: string | null;
}
```

### Widget Configuration Model
```typescript
interface FloatingBridgeConfig {
  integrator: string;
  fromChain?: number;
  toChain?: number;
  toAddress?: Address;
  defaultTokens?: {
    from?: string;
    to?: string;
  };
}
```

## Error Handling

### Error Scenarios and Responses

1. **Wallet Not Connected**
   - Display connection prompt in modal
   - Provide clear call-to-action to connect wallet
   - Integrate with existing Particle Network connection flow

2. **Network Issues**
   - Show loading states during network requests
   - Display retry options for failed operations
   - Provide informative error messages

3. **Bridge Transaction Failures**
   - Capture and display LiFi widget errors
   - Provide transaction status updates
   - Offer support links for complex issues

4. **Modal Loading Failures**
   - Implement fallback UI if LiFi widget fails to load
   - Provide alternative bridge options or links
   - Log errors for debugging

### Error UI Components
- Toast notifications for quick feedback
- In-modal error states with retry options
- Loading skeletons during widget initialization

## Testing Strategy

### Unit Testing
- **Component Rendering**: Test all components render correctly
- **State Management**: Verify modal open/close functionality
- **Props Handling**: Test all prop combinations and edge cases
- **Event Handling**: Test click, keyboard, and focus events

### Integration Testing
- **Wallet Integration**: Test with connected/disconnected states
- **LiFi Widget**: Test widget loading and configuration
- **Modal Behavior**: Test modal interactions and accessibility
- **Responsive Design**: Test across different screen sizes

### E2E Testing
- **User Flows**: Test complete bridge transaction flows
- **Cross-browser**: Test on major browsers
- **Mobile Testing**: Test touch interactions and mobile layouts
- **Accessibility**: Test with screen readers and keyboard navigation

### Performance Testing
- **Load Time**: Measure component initialization time
- **Memory Usage**: Monitor for memory leaks during modal operations
- **Bundle Size**: Ensure minimal impact on app bundle size
- **Lazy Loading**: Verify LiFi widget lazy loading works correctly

## Implementation Phases

### Phase 1: Core Button Component
- Create FloatingBridgeButton component
- Implement basic modal functionality
- Add positioning and styling
- Integrate with existing wallet state

### Phase 2: Bridge Integration
- Integrate LiFi widget into modal
- Configure widget with wallet data
- Implement error handling
- Add loading states

### Phase 3: Polish and Accessibility
- Add animations and transitions
- Implement keyboard navigation
- Add screen reader support
- Optimize for mobile devices

### Phase 4: Testing and Optimization
- Comprehensive testing suite
- Performance optimization
- Cross-browser compatibility
- Documentation and examples

## Technical Considerations

### Performance Optimizations
- **Lazy Loading**: LiFi widget loaded only when modal opens
- **Memoization**: Use React.memo for expensive re-renders
- **Event Delegation**: Efficient event handling for global button
- **Bundle Splitting**: Separate bridge functionality into its own chunk

### Accessibility Features
- **ARIA Labels**: Comprehensive labeling for screen readers
- **Focus Management**: Proper focus trapping in modal
- **Keyboard Navigation**: Full keyboard support
- **High Contrast**: Ensure visibility in high contrast modes

### Mobile Considerations
- **Touch Targets**: Minimum 44px touch target size
- **Safe Areas**: Respect device safe areas and notches
- **Gesture Support**: Support swipe-to-close on mobile
- **Viewport Handling**: Handle virtual keyboard appearance

### Browser Compatibility
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Polyfills**: Include necessary polyfills for older browsers
- **Graceful Degradation**: Fallback for unsupported features
- **Testing Matrix**: Comprehensive cross-browser testing