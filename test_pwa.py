#!/usr/bin/env python3
"""
PWA Test Server
A simple HTTP server to test Progressive Web App functionality including service workers.
Service workers require HTTPS or localhost to work properly.
"""

import http.server
import socketserver
import webbrowser
import threading
import time
from pathlib import Path

class PWAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=Path(__file__).parent, **kwargs)
    
    def end_headers(self):
        # Add headers required for PWA functionality
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        
        # Add security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-XSS-Protection', '1; mode=block')
        
        # Service Worker specific headers
        if self.path.endswith('.js'):
            self.send_header('Content-Type', 'application/javascript')
            if 'sw' in self.path:  # Service worker files
                self.send_header('Service-Worker-Allowed', '/')
        
        # Manifest file header
        if self.path.endswith('manifest.json'):
            self.send_header('Content-Type', 'application/manifest+json')
        
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom logging to highlight PWA-related requests
        message = format % args
        if any(keyword in message for keyword in ['sw.js', 'sw-simple.js', 'manifest.json']):
            print(f"🔧 PWA FILE: {message}")
        else:
            print(f"📄 {message}")

def test_pwa_features():
    """Print instructions for testing PWA features"""
    print("\n" + "="*60)
    print("🚀 PWA TESTING GUIDE")
    print("="*60)
    print("📱 To test PWA installation:")
    print("   1. Open Chrome/Edge browser")
    print("   2. Navigate to http://localhost:8000")
    print("   3. Open Developer Tools (F12)")
    print("   4. Go to 'Application' tab")
    print("   5. Check 'Service Workers' section")
    print("   6. Check 'Manifest' section")
    print("\n📲 To test installation:")
    print("   • Look for install button in address bar")
    print("   • Or use the install popup on the website")
    print("   • Test offline functionality after install")
    print("\n🔍 Service Worker Status:")
    print("   • Should show 'activated and running'")
    print("   • Check 'Cache Storage' for cached resources")
    print("\n🌐 PWA Features to Test:")
    print("   ✓ Offline functionality")
    print("   ✓ Install to home screen")
    print("   ✓ App-like experience")
    print("   ✓ Push notifications (if enabled)")
    print("   ✓ Background sync")
    print("\n⚠️  Note: Some PWA features require HTTPS in production")
    print("="*60)

def start_server():
    PORT = 8000
    
    try:
        with socketserver.TCPServer(("", PORT), PWAHandler) as httpd:
            print(f"🌟 PWA Test Server starting on http://localhost:{PORT}")
            print(f"📁 Serving directory: {Path.cwd()}")
            
            # Open browser after a short delay
            def open_browser():
                time.sleep(2)
                print(f"\n🌐 Opening browser to http://localhost:{PORT}")
                try:
                    webbrowser.open(f'http://localhost:{PORT}')
                except:
                    print("Could not automatically open browser")
            
            # Start browser opening in background
            browser_thread = threading.Thread(target=open_browser, daemon=True)
            browser_thread.start()
            
            # Show testing instructions
            test_pwa_features()
            
            print(f"\n🎯 Server running! Press Ctrl+C to stop...")
            print(f"🔗 URL: http://localhost:{PORT}")
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n👋 PWA Test Server stopped!")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {PORT} is already in use!")
            print("   Try closing other servers or use a different port")
        else:
            print(f"❌ Server error: {e}")

if __name__ == "__main__":
    print("🚀 PWA Test Server")
    print("=" * 40)
    
    # Check for required PWA files
    required_files = ['manifest.json', 'sw.js', 'index.html']
    missing_files = []
    
    for file in required_files:
        if not Path(file).exists():
            missing_files.append(file)
    
    if missing_files:
        print(f"⚠️  Warning: Missing PWA files: {missing_files}")
        print("   The PWA might not work correctly")
    else:
        print("✅ All required PWA files found!")
    
    start_server()