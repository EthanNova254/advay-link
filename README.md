# Advay Link - Smart URL Shortener with Discovery

A Cloudflare Worker-based URL shortener that shows relevant Payhip books before redirecting to the original link.

## Features

- **Smart Book Matching**: Uses AI to match URLs with relevant books
- **15-Second Discovery**: Shows books before redirecting
- **100% Ethical**: Clear buttons, auto-redirect, no iframes
- **Admin Panel**: Protected area to manage books
- **API Access**: Create links programmatically
- **Mobile Responsive**: Works on all screen sizes

## Setup Instructions

### 1. Prerequisites
- Node.js and npm installed
- Cloudflare account
- Wrangler CLI: `npm install -g wrangler`

### 2. Configure Cloudflare Worker
```bash
# Login to Cloudflare
wrangler login

# Create KV namespace
wrangler kv:namespace create "URL_STORE"

# Update wrangler.toml with your KV namespace ID
