// キャッシュ名を定義
const CACHE_NAME = 'v1';

// キャッシュするリソースを指定
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

// インストール処理
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache:', error);
      })
  );
});

// リソースフェッチ時のキャッシュロジック
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュがあればキャッシュから返す
        if (response) {
          return response;
        }
        // なければネットワークからフェッチ
        return fetch(event.request);
      })
  );
});

// アクティブになった際の既存のキャッシュをクリーンアップする
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
