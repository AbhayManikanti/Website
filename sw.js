// Service Worker for Abhay Manikanti Portfolio
// Version: 1.0.0

const CACHE_NAME = 'abhay-portfolio-v1';
const STATIC_CACHE_NAME = 'abhay-static-v1';
const DYNAMIC_CACHE_NAME = 'abhay-dynamic-v1';

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/styles.css',
  '/src/script.js',
  '/ico.png',
  '/src/project1.jpeg',
  '/src/project2.png',
  '/bloodmoon.png',
  '/Abhay Sreenath Manikanti - Artificial Intelligence Intern Resume.pdf',
  '/Advanced Certification in Data Science and AI from IIT Madras.pdf',
  '/IIT Roorkee AI:ML Certificate.pdf',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js'
];

// Network-first resources (for dynamic content)
const NETWORK_FIRST_URLS = [
  '/api/',
  'https://fastapi-backend-925151288978.asia-southeast1.run.app/'
];

// Cache-first resources (for static assets)
const CACHE_FIRST_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
  /\.(?:css|js)$/,
  /\.(?:pdf)$/,
  /fonts\.googleapis\.com/,
  /cdnjs\.cloudflare\.com/
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static assets...');
        return cache.addAll(STATIC_ASSETS.map(url => {
          // Handle relative URLs properly
          return new Request(url, { cache: 'no-cache' });
        }));
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting(); // Force activation of new SW
      })
      .catch(error => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        const deletePromises = cacheNames.map(cacheName => {
          // Delete old caches
          if (cacheName !== STATIC_CACHE_NAME && 
              cacheName !== DYNAMIC_CACHE_NAME && 
              cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        });
        
        return Promise.all(deletePromises);
      })
      .then(() => {
        console.log('[SW] Old caches cleaned up');
        return self.clients.claim(); // Take control of all clients
      })
      .catch(error => {
        console.error('[SW] Failed to activate service worker:', error);
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip Chrome extensions and other protocols
  if (!request.url.startsWith('http')) {
    return;
  }
  
  event.respondWith(handleFetch(request, url));
});

async function handleFetch(request, url) {
  try {
    // Strategy 1: Network first for API calls and dynamic content
    if (isNetworkFirst(url)) {
      return await networkFirst(request);
    }
    
    // Strategy 2: Cache first for static assets
    if (isCacheFirst(url)) {
      return await cacheFirst(request);
    }
    
    // Strategy 3: Stale while revalidate for HTML pages
    if (isHTMLPage(request)) {
      return await staleWhileRevalidate(request);
    }
    
    // Default: Network first
    return await networkFirst(request);
    
  } catch (error) {
    console.error('[SW] Fetch error:', error);
    return await handleFetchError(request, error);
  }
}

// Check if URL should use network-first strategy
function isNetworkFirst(url) {
  return NETWORK_FIRST_URLS.some(pattern => url.href.includes(pattern));
}

// Check if URL should use cache-first strategy
function isCacheFirst(url) {
  return CACHE_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname));
}

// Check if request is for HTML page
function isHTMLPage(request) {
  return request.headers.get('accept')?.includes('text/html');
}

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request.clone(), networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving from cache (network failed):', request.url);
      return cachedResponse;
    }
    throw error;
  }
}

// Cache first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    console.log('[SW] Serving from cache:', request.url);
    return cachedResponse;
  }
  
  // Not in cache, fetch and cache
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request.clone(), networkResponse.clone());
      console.log('[SW] Cached new asset:', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Failed to fetch asset:', request.url, error);
    throw error;
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  // Always try to fetch in background
  const fetchPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.ok) {
        const cache = caches.open(DYNAMIC_CACHE_NAME);
        cache.then(c => c.put(request.clone(), networkResponse.clone()));
      }
      return networkResponse;
    })
    .catch(error => {
      console.warn('[SW] Background fetch failed:', request.url, error);
    });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    console.log('[SW] Serving from cache (stale):', request.url);
    return cachedResponse;
  }
  
  // Wait for network if no cache
  return await fetchPromise;
}

// Handle fetch errors with appropriate fallbacks
async function handleFetchError(request, error) {
  console.error('[SW] Fetch failed:', request.url, error);
  
  // Try to serve from cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    console.log('[SW] Serving cached fallback:', request.url);
    return cachedResponse;
  }
  
  // Provide offline page for HTML requests
  if (isHTMLPage(request)) {
    const offlineResponse = await caches.match('/');
    if (offlineResponse) {
      return offlineResponse;
    }
  }
  
  // Return generic offline response
  return new Response(
    JSON.stringify({
      error: 'Network unavailable',
      message: 'This content is not available offline',
      timestamp: new Date().toISOString()
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    }
  );
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  console.log('[SW] Handling background sync...');
  // Implement background sync logic here if needed
  // For example: sync form submissions, analytics, etc.
}

// Push notification handling
self.addEventListener('push', event => {
  console.log('[SW] Push notification received');
  
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'New update available',
      icon: '/ico.png',
      badge: '/ico.png',
      tag: data.tag || 'default',
      data: data.data || {}
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Abhay Portfolio', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked');
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

// Message handling (for communication with main thread)
self.addEventListener('message', event => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;
      case 'GET_CACHE_SIZE':
        getCacheSize().then(size => {
          event.ports[0].postMessage({ cacheSize: size });
        });
        break;
      case 'CLEAR_CACHE':
        clearAllCaches().then(() => {
          event.ports[0].postMessage({ success: true });
        });
        break;
      default:
        console.warn('[SW] Unknown message type:', event.data.type);
    }
  }
});

// Utility function to get cache size
async function getCacheSize() {
  let totalSize = 0;
  const cacheNames = await caches.keys();
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }
  
  return totalSize;
}

// Utility function to clear all caches
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  const deletePromises = cacheNames.map(name => caches.delete(name));
  await Promise.all(deletePromises);
  console.log('[SW] All caches cleared');
}

// Error handling for unhandled promise rejections
self.addEventListener('error', event => {
  console.error('[SW] Global error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
});

console.log('[SW] Service worker script loaded');