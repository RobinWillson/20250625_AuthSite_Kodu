# 20250625_AuthSite_Kodu
This is a site template for register/login with email or google account.

# Setting 

##### server > .env
```
# MongoDB Connection
MONGODB_CONNECTION_STRING=`MongoDB Connection Code`
PORT=5000

# Google OAuth Credentials
GOOGLE_CLIENT_ID=`Google OAuth 2.0 Client ID`
GOOGLE_CLIENT_SECRET=`Google OAuth 2.0 Client Secret`

# JWT Secret
SESSION_SECRET=`Session Secret`
JWT_SECRET=`JWT Secret`

# Client URL (for redirects)
CLIENT_URL=http://localhost:3000
```

##### Client > .env

```
VITE_GOOGLE_CLIENT_ID=`Google OAuth 2.0 Client ID`
```