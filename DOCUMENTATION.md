# Creath Art Marketplace - Codebase Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Database Schema](#database-schema)
6. [API Documentation](#api-documentation)
7. [Components Documentation](#components-documentation)
8. [Actions Documentation](#actions-documentation)
9. [Authentication & Authorization](#authentication--authorization)
10. [Email Templates](#email-templates)
11. [Blockchain Integration](#blockchain-integration)
12. [Deployment](#deployment)
13. [Development Guidelines](#development-guidelines)

## Project Overview

Creath Art Marketplace is a blockchain-powered NFT marketplace that allows artists to showcase, mint, and sell their digital artworks. The platform combines traditional web technologies with Web3 functionality to create a seamless experience for both artists and collectors.

### Key Features
- User authentication and profile management
- Artwork upload and management
- NFT minting and trading
- Exhibition management
- Wallet integration (Particle Network)
- Payment processing (Flutterwave, Wallet payments)
- Email notifications
- Admin panel for content management

## Architecture

The application follows a modern Next.js architecture with:
- **Frontend**: Next.js 14 with App Router
- **Backend**: Next.js API routes and Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **Blockchain**: Ethereum/Optimism integration
- **File Storage**: Cloudinary for images, IPFS for metadata
- **Email**: Resend for transactional emails

## Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Formik + Yup**: Form handling and validation
- **React Toastify**: Notifications

### Backend
- **Prisma**: Database ORM
- **PostgreSQL**: Primary database
- **JWT**: Authentication tokens
- **Resend**: Email service
- **Cloudinary**: Image hosting

### Blockchain
- **Ethers.js**: Ethereum interaction
- **Particle Network**: Wallet connection
- **Smart Contracts**: NFT minting and marketplace

### Payment
- **Flutterwave**: Fiat payments
- **Crypto Wallets**: Direct blockchain payments

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── (admin)/                  # Admin panel routes
│   ├── (main)/                   # Main application routes
│   ├── api/                      # API routes
│   └── providers/                # Web3 and other providers
├── actions/                      # Server actions
├── components/                   # Reusable components
│   ├── email-templates/          # Email templates
│   └── ui/                       # UI components
├── lib/                          # Utility libraries
│   ├── schemas/                  # Validation schemas
│   └── helpers/                  # Helper functions
├── prisma/                       # Database schema and migrations
└── public/                       # Static assets
```

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

### Core Models
- **User**: User accounts and profiles
- **Admin**: Administrative accounts
- **Art**: Individual artworks
- **Exhibition**: Art exhibitions
- **ExhibitionArt**: Artworks within exhibitions
- **Category**: Artwork categories
- **Blog**: Blog posts

### Interaction Models
- **Likes**: User likes on artworks
- **Flags**: User reports on content
- **Notification**: System notifications
- **CollectibleLikes/Flags**: Interactions with collectibles

### Enums
- **PROFILETYPE**: GALLERY, ARTIST
- **ROLE**: SUPERADMIN, ADMIN
- **NOTIFTYPE**: BUYS, UPLOADS, FLAGS

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - Email verification
- `POST /api/auth/forgot-password` - Password reset

### Blockchain Endpoints
- `POST /api/mintExhibition` - Mint NFT for exhibition artwork
- `POST /api/transfer` - Transfer NFT ownership

## Components Documentation

### Layout Components
- **Header**: Main navigation component
- **Sidebar**: Admin panel navigation
- **Footer**: Site footer

### Form Components
- **Input**: Reusable input component
- **TextArea**: Multi-line text input
- **Button**: Styled button component
- **SelectComp**: Dropdown selection component

### Feature Components
- **VerifyButton**: NFT purchase functionality
- **EnquireButton**: Inquiry form modal
- **BridgeComponent**: Cross-chain bridge integration
- **GetNft**: NFT transfer interface

## Actions Documentation

### Authentication Actions (`actions/auth.ts`)
- `createUser()`: User registration
- `userSignin()`: User authentication
- `verifyOtp()`: Email verification
- `resendOtp()`: Resend verification code
- `forgotPassword()`: Password reset initiation
- `resetPassword()`: Password reset completion

### User Actions (`actions/current.ts`)
- `getProfile()`: Fetch user profile with artworks and collections
- `updateProfile()`: Update user profile information
- `updateWalletAddress()`: Update user's wallet address
- `uploadArtWork()`: Upload new artwork
- `getAllUserLikes()`: Fetch user's liked artworks
- `getAllUserFlags()`: Fetch user's flagged content

### Art Actions (`actions/art.ts`)
- `getArtworks()`: Fetch paginated artworks
- `getArtwork()`: Fetch single artwork details
- `likeArtwork()`: Toggle artwork like
- `flagArtwork()`: Report artwork
- `updateArtCollected()`: Mark artwork as collected

### Exhibition Actions (`actions/exhibitions.ts`)
- `getExhibitions()`: Fetch exhibitions list
- `getExhibition()`: Fetch single exhibition
- `getExhibitionArtworks()`: Fetch artworks in exhibition

### Admin Actions (`actions/admin/`)
- Exhibition management
- Artwork approval
- User management
- Content moderation

## Authentication & Authorization

### User Authentication
- JWT-based authentication
- Email verification required
- Password reset functionality
- Wallet address linking

### Admin Authentication
- Separate admin authentication system
- Role-based access control (ADMIN, SUPERADMIN)
- Protected admin routes

### Session Management
- HTTP-only cookies for token storage
- Automatic token refresh
- Secure session handling

## Email Templates

### User Communications
- **OTP**: Email verification codes
- **UserWelcome**: Welcome message for new users
- **ArtSuccess**: Artwork upload confirmation
- **ArtPurchase**: Purchase confirmation
- **ArtistCollectedEmail**: Notification when artwork is collected

### Template Structure
All email templates are React components using:
- Consistent branding
- Responsive design
- Clear call-to-action buttons
- Professional styling

## Blockchain Integration

### Smart Contracts
- **NFT Contract**: ERC-721 for artwork tokens
- **Marketplace Contract**: Trading functionality
- **Mock USDC**: Test token for payments

### Web3 Features
- Wallet connection via Particle Network
- NFT minting and transfers
- Crypto payments
- Cross-chain bridging (Socket.tech/LiFi)

### Contract Addresses
- Marketplace: `0x013b6f5a3fF3A3259d832b89C6C0adaabe59f8C6`
- Creath NFT: `0x4DF3Fbf82df684A16E12e0ff3683E6888e51B994`
- Mock USDC: `0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85`

## Development Guidelines

### Code Style
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Consistent naming conventions
- Comprehensive error handling

### Component Guidelines
- Functional components with hooks
- Props interface definitions
- Proper error boundaries
- Loading states for async operations

### Database Guidelines
- Prisma migrations for schema changes
- Proper foreign key relationships
- Soft deletes where appropriate
- Indexing for performance

### Security Best Practices
- Input validation with Yup schemas
- SQL injection prevention via Prisma
- XSS protection
- Secure authentication flows
- Environment variable management

---

*This documentation is a living document and should be updated as the codebase evolves.*