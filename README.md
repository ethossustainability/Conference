# Conference Networking PWA

A Progressive Web App (PWA) for conference networking that allows attendees to create digital business cards, scan QR codes to exchange contact information, view conference schedules, and access conference information.

## Features

- **Google OAuth Login** - Secure authentication using Google Sign-In
- **Digital Business Cards** - Create and customize your personal business card
- **QR Code Scanning** - Scan QR codes to instantly receive other attendees' business cards
- **QR Code Generation** - Generate QR codes to share your business card
- **Contact Management** - View and manage all collected business cards
- **Conference Schedule** - View all conference events and sessions
- **Conference Information** - Access WiFi credentials, contact information, and more
- **Progressive Web App** - Installable on mobile devices
- **Offline Support** - Service worker for offline functionality

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Conference
```

2. Install dependencies:
```bash
npm install
```

3. Set up Google OAuth (Optional):
   - Create a project in the [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Google Identity Services API
   - Create OAuth 2.0 credentials
   - Configure authorized JavaScript origins:
     - `http://localhost:3000` (development)
     - `http://localhost:5173` (Vite default, if different)
     - Your production domain URL
   - Configure OAuth consent screen with scopes:
     - `openid`
     - `https://www.googleapis.com/auth/userinfo.email`
     - `https://www.googleapis.com/auth/userinfo.profile`
   - Create a `.env.local` file in the root directory (or `.env`):
   ```
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```
   - **Important:** Restart the dev server after creating/updating the `.env.local` file
   
   **Note:** If you don't set up Google OAuth, the app will use a demo login mode for development.

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory. You can preview it with:

```bash
npm run preview
```

## Usage

### For Conference Organizers

1. **Customize Conference Information**: Edit `src/pages/Info.jsx` to update conference details, WiFi credentials, and contact information.

2. **Update Schedule**: Edit `src/pages/Schedule.jsx` to add or modify conference schedule events.

3. **Generate QR Code for App**: Create a QR code that points to your deployed app URL so attendees can easily access it.

### For Attendees

1. **Scan the Conference QR Code**: Use your phone's camera or a QR scanner to open the web app.

2. **Sign In**: Log in with your Google account (or use demo login if not configured).

3. **Create Your Card**: Fill out your business card information on the "My Card" page.

4. **Share Your Card**: Use the generated QR code to share your contact information with others.

5. **Scan Others' Cards**: Use the "Scan" page to scan QR codes from other attendees.

6. **View Collected Cards**: Access all your collected contacts in the "Cards" page.

7. **Check Schedule**: View the conference schedule and event details.

8. **Access Info**: Get WiFi credentials, contact information, and other conference details.

## PWA Installation

### Mobile (iOS)
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"

### Mobile (Android)
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Select "Install app" or "Add to Home screen"

## Project Structure

```
Conference/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navigation.jsx
│   │   └── Navigation.css
│   ├── contexts/         # React contexts
│   │   └── AuthContext.jsx
│   ├── pages/           # Page components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── BusinessCard.jsx
│   │   ├── ScanCard.jsx
│   │   ├── MyCards.jsx
│   │   ├── Schedule.jsx
│   │   └── Info.jsx
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html
├── vite.config.js       # Vite configuration
└── package.json
```

## Technologies Used

- **React 18** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Vite PWA Plugin** - PWA support with service workers
- **html5-qrcode** - QR code scanning library
- **qrcode.react** - QR code generation library

## Browser Support

- Chrome/Edge (Android)
- Firefox (Android)
- Safari (iOS 11.3+)

## Security Notes

- In production, always verify JWT tokens on the backend
- The current implementation uses client-side token decoding for demo purposes
- Store sensitive data securely and use HTTPS in production
- Consider implementing backend API for production use

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

