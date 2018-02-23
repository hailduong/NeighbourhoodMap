const staticCacheName = "myCache";

self.addEventListener('install', (event) => {
	console.log('Install Service Worker');
	event.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			return cache.addAll([
				"/",
				"/css/bootstrap.css",
				"/css/animate.min.css",
				"/css/theme.css",
				"/js/jquery.slim.min.js",
				"/js/bootstrap.bundle.js",
				"/js/App.js"
			])
		})
	)
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request, {ignoreSearch: true}).then((response) => {
			return response || fetch(event.request)
		})
	)
});