# OAuth Provider Setup Guide

This guide explains how to set up Google, Facebook, and Apple OAuth providers for the Todoist clone application.

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id

# Facebook OAuth
NEXT_PUBLIC_FACEBOOK_APP_ID=your-facebook-app-id

# Apple OAuth
NEXT_PUBLIC_APPLE_CLIENT_ID=your.apple.client.id
NEXT_PUBLIC_APPLE_REDIRECT_URI=http://localhost:3000
```

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an "OAuth 2.0 Client ID"
5. Set the application type to "Web application"
6. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
7. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
8. Copy the Client ID and add it to your `.env.local` file

## Facebook OAuth Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select an existing one
3. Add the "Facebook Login" product to your app
4. Go to "Facebook Login" > "Settings"
5. Add your domain to "Valid OAuth Redirect URIs":
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
6. Copy the App ID and add it to your `.env.local` file
7. Make sure your app is in "Development" mode for testing
8. **Note**: The app requests `public_profile` permission, which automatically includes email access

## Apple OAuth Setup

1. Go to [Apple Developer](https://developer.apple.com/)
2. Create a new App ID or select an existing one
3. Enable "Sign In with Apple" capability
4. Create a Services ID for web authentication
5. Configure the Services ID:
   - Add your domain to "Domains and Subdomains"
   - Add redirect URLs:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
6. Copy the Services ID and add it to your `.env.local` file as `NEXT_PUBLIC_APPLE_CLIENT_ID`

## Features Implemented

### 🔐 Authentication Providers

- **Google OAuth**: Full implementation with user info fetching
- **Facebook OAuth**: Complete setup with profile data retrieval
- **Apple OAuth**: Sign in with Apple integration

### 🎯 Key Features

- **Unified Social Auth Hook**: Single interface for all providers
- **Loading States**: Visual feedback during authentication
- **Error Handling**: Proper error management for each provider
- **Persistent Storage**: User data persists across sessions
- **Type Safety**: Full TypeScript support

### 🔧 Technical Implementation

- **Dynamic SDK Loading**: SDKs are loaded only when needed
- **Configuration Management**: Centralized OAuth settings
- **Promise-based API**: Consistent async/await interface
- **Route Protection**: Automatic redirects for authenticated users

## Usage

The social login buttons are automatically available on both login and signup pages. Users can:

1. Click any social login button
2. Complete the OAuth flow in a popup
3. Get automatically redirected to the main app
4. Stay logged in across browser sessions

## Security Considerations

- All OAuth flows use popup windows (no page redirects)
- Access tokens are stored securely in localStorage
- User data is validated before storage
- Proper error handling prevents data leaks
- Environment variables keep sensitive data secure

## Troubleshooting

### Common Issues

1. **"Invalid Client ID" errors**: Check your environment variables
2. **Popup blocked**: Ensure popups are allowed for your domain
3. **Redirect URI mismatch**: Verify your OAuth provider settings
4. **CORS errors**: Check your domain configuration in OAuth providers
5. **Facebook "Invalid Scopes" error**: The app uses `public_profile` which automatically includes email access

### Development vs Production

- Use `http://localhost:3000` for development
- Use your production domain for live deployment
- Update OAuth provider settings accordingly
- Test all providers in both environments

## Next Steps

1. Set up your OAuth provider accounts
2. Add the environment variables
3. Test each provider individually
4. Deploy with production settings
5. Monitor authentication flows in production
