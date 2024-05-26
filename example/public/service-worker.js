"use strict";

self.addEventListener('install', event => {
console.log('Service Worker installing.');
event.waitUntil(self.skipWaiting());
// Add caching logic here
});

self.addEventListener('activate', event => {
console.log('Service Worker activating.');
event.waitUntil(self.clients.claim());

returnList('users').then(response => {
response.json().then(users => {
console.log('list of users', users);
});
});
// Add cache cleanup logic here
});

const headers = {
'Content-Type': 'application/json'
};

self.addEventListener('fetch', event => {
const url = new URL(event.request.url);

// Dynamically generated routes
const registeredRoutes = ["/users", "/products", "/cart", ];
console.log('Fetching:', event.request.url);

if (registeredRoutes.some(route => url.pathname.startsWith(route))) {
const { id, path, entityName, entityId, length } = getSegments(url);
if (length === 2) {
event.respondWith(returnList(path));
} else if (length === 3) {
event.respondWith(findItem(path, null, null, id));
} else if (length === 4) {
event.respondWith(findItem(path, entityName, entityId));
} else if (length === 5) {
event.respondWith(findItem(path, entityName, entityId, id));
}
}
});

self.addEventListener('message', event => {
if (event.data.action === 'skipWaiting') {
self.skipWaiting();
}
});

function findItem(path, entityName, entityId, id) {
return fetch(`demo-data/${path}.json`)
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
let items;
if (entityName && id) {
items = data.filter(item => item[entityName] == entityId && item.id == id);
return jsonResponse(JSON.stringify(items), headers);
}
if (entityName) {
items = data.find(item => item.id == entityId)[entityName];
if (!items) {
return returnList(entityName)
.then(response => response.json())
.then(result => {
return result.filter(i => i[path.slice(0, -1) + "Id"] == entityId);
})
.then(filteredItems => jsonResponse(JSON.stringify(filteredItems), headers));
}
return jsonResponse(JSON.stringify(items), headers);
}
if (id) {
items = data.filter(item => item.id == id);
return jsonResponse(JSON.stringify(items), headers);
}
})
.catch(error => {
console.error('Fetching error:', error);
return new Response(JSON.stringify({ error: 'Data not found' }), {
headers: { 'Content-Type': 'application/json' }
});
});
}

function getSegments(url) {
const segments = url.pathname.split('/');
if (segments.length === 5) {
const id = segments[4];
const path = segments[3];
const entityName = segments[1].slice(0, -1) + "Id";
const entityId = segments[2];
return { id, path, entityName, entityId, length: segments.length };
}
if (segments.length === 4) {
const entityName = segments[3];
const entityId = segments[2];
const path = segments[1];
return { path, entityId, entityName, length: segments.length };
}
if (segments.length === 3) {
const id = segments[2];
const path = segments[1];
return { id, path, length: segments.length };
}
if (segments.length === 2) {
const path = segments[1];
return { path, length: segments.length };
}
}

function returnList(path) {
return fetch(`demo-data/${path}.json`)
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
return jsonResponse(JSON.stringify(data), headers);
})
.catch(error => {
console.error('Fetching error:', error);
return new Response(JSON.stringify({ error: 'Data not found' }), {
headers: { 'Content-Type': 'application/json' }
});
});
}

function jsonResponse(json, headers) {
const blob = new Blob([json], { type: 'application/json' });
return new Response(blob, { headers });
}

