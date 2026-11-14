// Offline cache for Astro Health Check. Change CACHE (e.g. astro-health-v2) whenever you update any file.
var CACHE="astro-health-v2";
var FILES=["./","./index.html","./manifest.json","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==CACHE}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(hit){return hit||fetch(e.request).then(function(r){var cp=r.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp)});return r}).catch(function(){return caches.match("./index.html")})}))});
