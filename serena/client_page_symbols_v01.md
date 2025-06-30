# Client Folder Structure
client/
client/.gitignore
client/eslint.config.js
client/index.html
client/package-lock.json
client/package.json
client/postcss.config.js
client/README.md
client/tailwind.config.js
client/vite.config.js
client/public/
client/public/vite.svg
client/src/
client/src/App.jsx
client/src/index.css
client/src/main.jsx
client/src/assets/
client/src/components/
client/src/components/.gitkeep
client/src/components/AdminRoute.jsx
client/src/components/Input.jsx
client/src/components/MainLayout.jsx
client/src/components/ProtectedRoute.jsx
client/src/context/
client/src/context/.gitkeep
client/src/context/AuthContext.jsx
client/src/hooks/
client/src/hooks/.gitkeep
client/src/hooks/useAuth.jsx
client/src/pages/
client/src/pages/.gitkeep
client/src/pages/AdminPage.jsx
client/src/pages/DashboardPage.jsx
client/src/pages/ForgotPasswordPage.jsx
client/src/pages/HomePage.jsx
client/src/pages/LoginPage.jsx
client/src/pages/ProfilePage.jsx
client/src/pages/RegisterPage.jsx
client/src/pages/ResetPasswordPage.jsx
client/src/services/
client/src/services/authService.js
client/src/services/userService.js
client/src/utils/



# Client Page Components Symbols

## AdminPage.jsx
- **Component**: `AdminPage()`
- **State Variables**:
  - `users`: `useState([])` (User list)
  - `loading`: `useState(true)` (Data loading state)
  - `error`: `useState('')` (Error message)
- **Effects**:
  - `useEffect()`: Fetches users on component mount (Dependencies: [token])
- **JSX Structure**:
  - User management table with columns: Name, Email, Role, Provider

## DashboardPage.jsx
- **Component**: `DashboardPage()`
- **State Variables**: None
- **Event Handlers**:
  - `handleLogout()`: Logs out user and navigates to home
- **JSX Structure**:
  - User profile display
  - Edit Profile button
  - Admin Panel link (for admin users)
  - Logout button

## ForgotPasswordPage.jsx
- **Component**: `ForgotPasswordPage()`
- **State Variables**:
  - `email`: `useState('')` (User email)
  - `loading`: `useState(false)` (Submission state)
  - `submitted`: `useState(false)` (Success state)
- **Event Handlers**:
  - `handleSubmit(e)`: Sends password reset email
- **JSX Structure**:
  - Email input form
  - "Send Reset Link" button
  - Login page link

## HomePage.jsx
- **Component**: `HomePage()`
- **State Variables**:
  - `error`: `useState('')` (Login error)
- **Event Handlers**:
  - `handleGoogleSuccess(credentialResponse)`: Handles Google OAuth success
  - `handleGoogleError()`: Handles Google OAuth failure
- **JSX Structure**:
  - Background image with overlay
  - Google login button
  - Email login link
  - Registration link

## LoginPage.jsx
- **Component**: `LoginPage()`
- **State Variables**:
  - `formData`: `useState({email: '', password: ''})` (Login credentials)
  - `error`: `useState('')` (Login error)
  - `loading`: `useState(false)` (Submission state)
- **Event Handlers**:
  - `handleChange(e)`: Updates form data
  - `handleSubmit(e)`: Submits login form
  - `handleGoogleSuccess(credentialResponse)`: Handles Google OAuth
- **JSX Structure**:
  - Email/password form
  - Forgot password link
  - Google login button
  - Registration link

## ProfilePage.jsx
- **Component**: `ProfilePage()`
- **State Variables**:
  - `formData`: `useState({name: ''})` (Profile data)
  - `passwordData`: `useState({currentPassword: '', newPassword: '', confirmPassword: ''})`
  - `profileLoading`: `useState(false)` (Profile update state)
  - `passwordLoading`: `useState(false)` (Password update state)
  - `pictureLoading`: `useState(false)` (Image upload state)
- **Refs**:
  - `fileInputRef`: `useRef()` (Profile picture input)
- **Event Handlers**:
  - `handleChange(e)`: Updates form data
  - `handleProfileSubmit(e)`: Saves profile changes
  - `handlePasswordSubmit(e)`: Updates password
  - `handleFileChange(e)`: Uploads profile picture
- **JSX Structure**:
  - Profile picture upload area
  - Name/email form
  - Password change form (for email providers)
  - Back to Dashboard link

## RegisterPage.jsx
- **Component**: `RegisterPage()`
- **State Variables**:
  - `formData`: `useState({name: '', email: '', password: ''})` (Registration data)
  - `error`: `useState('')` (Registration error)
  - `loading`: `useState(false)` (Submission state)
- **Event Handlers**:
  - `handleChange(e)`: Updates form data
  - `handleSubmit(e)`: Submits registration form
- **JSX Structure**:
  - Name/email/password form
  - "Register" button
  - Login page link

## ResetPasswordPage.jsx
- **Component**: `ResetPasswordPage()`
- **State Variables**:
  - `password`: `useState('')` (New password)
  - `confirmPassword`: `useState('')` (Password confirmation)
  - `loading`: `useState(false)` (Submission state)
  - `success`: `useState(false)` (Success state)
- **Event Handlers**:
  - `handleSubmit(e)`: Resets password
- **JSX Structure**:
  - Password reset form
  - Success message after reset
  - Login page link