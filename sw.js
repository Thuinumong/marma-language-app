// Marma Language - offline-first service worker.
// Bump VERSION whenever you upload a new index.html so phones pick up the update.
const VERSION='marma-v4';
const CORE=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
const FONT_HOSTS=['fonts.googleapis.com','fonts.gstatic.com'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSION).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(!/^https?:$/.test(url.protocol))return;
  const sameOrigin=url.origin===self.location.origin, isFont=FONT_HOSTS.includes(url.hostname);
  if(!sameOrigin&&!isFont)return; // never cache API calls (e.g. Supabase) - they go straight to the network
  // Pages: try network first (so updates show), fall back to the saved copy when offline
  if(req.mode==='navigate'){
    e.respondWith(fetch(req).then(r=>{const cp=r.clone();caches.open(VERSION).then(c=>c.put('./index.html',cp));return r})
      .catch(()=>caches.match('./index.html').then(r=>r||caches.match('./'))));
    return;
  }
  // Everything else: use the saved copy at once, refresh it in the background
  e.respondWith(caches.match(req).then(hit=>{
    const net=fetch(req).then(r=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(VERSION).then(c=>c.put(req,cp))}return r}).catch(()=>hit);
    return hit||net;
  }));
});
