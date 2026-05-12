/* ══════════════════════════════════════════════════
   FÊNIX — Service Worker v2.4
   Estratégia: Cache First + Network Fallback
   O app funciona 100% offline após primeira visita
══════════════════════════════════════════════════ */

const CACHE_NAME = 'fenix-v2.4';

// Recursos externos que serão cacheados na instalação
const RESOURCES_TO_CACHE = [
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

/* ── INSTALL: cacheia todos os recursos ── */
self.addEventListener('install', event => {
    console.log('[SW] Instalando Fênix v2.4...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Cacheando recursos essenciais');
                // Cacheia recursos locais obrigatoriamente
                return cache.addAll(['./index.html', './manifest.json'])
                    .then(() => {
                        // Cacheia recursos externos com tolerância a falha
                        const externas = RESOURCES_TO_CACHE.filter(r => r.startsWith('http'));
                        return Promise.allSettled(
                            externas.map(url =>
                                fetch(url)
                                    .then(res => cache.put(url, res))
                                    .catch(() => console.warn('[SW] Recurso externo não cacheado:', url))
                            )
                        );
                    });
            })
            .then(() => self.skipWaiting())
    );
});

/* ── ACTIVATE: limpa caches antigos ── */
self.addEventListener('activate', event => {
    console.log('[SW] Ativando Fênix v2.4...');
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => {
                        console.log('[SW] Removendo cache antigo:', name);
                        return caches.delete(name);
                    })
            )
        ).then(() => self.clients.claim())
    );
});

/* ── FETCH: Cache First, Network Fallback ── */
self.addEventListener('fetch', event => {
    // Ignora requisições não-GET e chrome-extension
    if (event.request.method !== 'GET') return;
    if (event.request.url.startsWith('chrome-extension')) return;

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    // Retorna do cache e atualiza em background
                    const fetchPromise = fetch(event.request)
                        .then(networkResponse => {
                            if (networkResponse && networkResponse.status === 200) {
                                const responseToCache = networkResponse.clone();
                                caches.open(CACHE_NAME)
                                    .then(cache => cache.put(event.request, responseToCache));
                            }
                            return networkResponse;
                        })
                        .catch(() => {}); // silencia erros de rede
                    return cachedResponse;
                }

                // Não está no cache: busca na rede e cacheia
                return fetch(event.request)
                    .then(networkResponse => {
                        if (!networkResponse || networkResponse.status !== 200
                            || networkResponse.type === 'opaque') {
                            return networkResponse;
                        }
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, responseToCache));
                        return networkResponse;
                    })
                    .catch(() => {
                        // Offline e não está no cache: retorna página principal
                        return caches.match('./index.html');
                    });
            })
    );
});
