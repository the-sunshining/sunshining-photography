/*
 *
 *  SunBible
 *  Copyright 2020 The SunShining All rights reserved.
 *
 */

const version = "0.1.00";
const cacheName = 'img-${version}';
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/sunshining-photography/',
        '/sunshining-photography/img/sun_01.jpg',
])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});