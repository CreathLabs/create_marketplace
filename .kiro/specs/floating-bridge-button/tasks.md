# Implementation Plan

- [x] 1. Transform BridgeComponent into a floating circular button



  - Modify the existing BridgeComponent to render as a circular floating button instead of inline content
  - Position the button fixed in bottom-right corner with proper z-index and margins
  - Add bridge/swap icon (arrows or bridge symbol) in the center of the circular button
  - Style button with gradient background, shadow, and hover/focus effects
  - Make button size responsive (larger on desktop, appropriate for touch on mobile)
  - _Requirements: 1.1, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 5.1, 5.2, 5.3_

- [ ] 2. Add modal functionality to BridgeComponent
  - Modify BridgeComponent to show/hide a modal when the floating button is clicked
  - Create modal overlay with semi-transparent background
  - Move the existing LiFi widget into the modal content area
  - Add modal header with title and close button
  - Implement click-outside-to-close and ESC key to close modal
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 3. Keep existing wallet connection logic in BridgeComponent
  - Maintain the current connected-only restriction for showing the floating button
  - Keep existing wallet connection handling logic unchanged
  - Ensure floating button only appears when user is connected (as currently implemented)
  - _Requirements: 4.2, 4.3_

- [ ] 4. Add basic accessibility to BridgeComponent
  - Add proper ARIA labels to floating button and modal
  - Ensure modal can be closed with ESC key
  - _Requirements: 7.2_

- [ ] 5. Make BridgeComponent responsive
  - Adjust floating button size for different screen sizes
  - Optimize modal layout for mobile devices (full-screen or appropriate sizing)
  - Ensure touch interactions work properly on mobile
  - Test button positioning doesn't interfere with mobile navigation
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 6. Add loading and error states to BridgeComponent
  - Add loading spinner to floating button when modal is opening
  - Implement error handling for LiFi widget loading failures
  - Show appropriate loading states within the modal
  - Add retry functionality for failed bridge operations
  - _Requirements: 6.1, 6.2, 6.4, 6.5_