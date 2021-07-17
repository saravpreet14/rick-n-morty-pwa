!function(){"use strict";var e={913:function(){try{self["workbox:core:6.1.5"]&&_()}catch(e){}},550:function(){try{self["workbox:expiration:6.1.5"]&&_()}catch(e){}},977:function(){try{self["workbox:precaching:6.1.5"]&&_()}catch(e){}},80:function(){try{self["workbox:routing:6.1.5"]&&_()}catch(e){}},873:function(){try{self["workbox:strategies:6.1.5"]&&_()}catch(e){}}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}},i=!0;try{e[n](r,r.exports,s),i=!1}finally{i&&delete t[n]}return r.exports}!function(){s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const n=new Set;const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},r=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||r(a.precache),c=e=>e||r(a.runtime);function o(e,t){const s=new URL(e);for(const n of t)s.searchParams.delete(n);return s.href}let h;function l(e){e.then((()=>{}))}class u{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise(((e,t)=>{let s=!1;setTimeout((()=>{s=!0,t(new Error("The open request was blocked and timed out"))}),this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"===typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}})),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map((e=>e.key))}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:a,includeKeys:r=!1}={}){return await this.transaction([e],"readonly",((i,c)=>{const o=i.objectStore(e),h=t?o.index(t):o,l=[],u=h.openCursor(s,n);u.onsuccess=()=>{const e=u.result;e?(l.push(r?e:e.value),a&&l.length>=a?c(l):e.continue()):c(l)}}))}async transaction(e,t,s){return await this.open(),await new Promise(((n,a)=>{const r=this._db.transaction(e,t);r.onabort=()=>a(r.error),r.oncomplete=()=>n(),s(r,(e=>n(e)))}))}async _call(e,t,s,...n){return await this.transaction([t],s,((s,a)=>{const r=s.objectStore(t),i=r[e].apply(r,n);i.onsuccess=()=>a(i.result)}))}close(){this._db&&(this._db.close(),this._db=null)}}u.prototype.OPEN_TIMEOUT=2e3;const d={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[s,$]of Object.entries(d))for(const e of $)e in IDBObjectStore.prototype&&(u.prototype[e]=async function(t,...n){return await this._call(e,t,s,...n)});class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const f=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");function w(e){return new Promise((t=>setTimeout(t,e)))}function g(e,t){const s=t();return e.waitUntil(s),s}async function m(e,s){let n=null;if(e.url){n=new URL(e.url).origin}if(n!==self.location.origin)throw new t("cross-origin-copy-response",{origin:n});const a=e.clone(),r={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},i=s?s(r):r,c=function(){if(void 0===h){const t=new Response("");if("body"in t)try{new Response(t.body),h=!0}catch(e){h=!1}h=!1}return h}()?a.body:await a.blob();return new Response(c,i)}s(550);const y="cache-entries",_=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class x{constructor(e){this._cacheName=e,this._db=new u("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore(y,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise(((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}}))})(this._cacheName)}async setTimestamp(e,t){const s={url:e=_(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put(y,s)}async getTimestamp(e){return(await this._db.get(y,this._getId(e))).timestamp}async expireEntries(e,t){const s=await this._db.transaction(y,"readwrite",((s,n)=>{const a=s.objectStore(y).index("timestamp").openCursor(null,"prev"),r=[];let i=0;a.onsuccess=()=>{const s=a.result;if(s){const n=s.value;n.cacheName===this._cacheName&&(e&&n.timestamp<e||t&&i>=t?r.push(s.value):i++),s.continue()}else n(r)}})),n=[];for(const a of s)await this._db.delete(y,a.id),n.push(a.url);return n}_getId(e){return this._cacheName+"|"+_(e)}}class v{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new x(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const n of t)await s.delete(n,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,l(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class R{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),r=this._getCacheExpiration(s);l(r.expireEntries());const i=r.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(c){0}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),n.add(t))}_getCacheExpiration(e){if(e===c())throw new t("expire-custom-caches-only");let s=this._cacheExpirations.get(e);return s||(s=new v(e,this._config),this._cacheExpirations.set(e,s)),s}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}s(873);function b(e){return"string"===typeof e?new Request(e):e}class T{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let n=b(e);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const a=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(i){throw new t("plugin-error-request-will-fetch",{thrownError:i})}const r=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(c){throw a&&await this.runCallbacks("fetchDidFail",{error:c,event:s,originalRequest:a.clone(),request:r.clone()}),c}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=b(e);let s;const{cacheName:n,matchOptions:a}=this._strategy,r=await this.getCacheKey(t,"read"),i={...a,cacheName:n};s=await caches.match(r,i);for(const c of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await c({cacheName:n,matchOptions:a,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,s){const a=b(e);await w(0);const r=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:f(r.url)});const i=await this._ensureResponseSafeToCache(s);if(!i)return!1;const{cacheName:c,matchOptions:h}=this._strategy,l=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),d=u?await async function(e,t,s,n){const a=o(t.url,s);if(t.url===a)return e.match(t,n);const r={...n,ignoreSearch:!0},i=await e.keys(t,r);for(const c of i)if(a===o(c.url,s))return e.match(c,n)}(l,r.clone(),["__WB_REVISION__"],h):null;try{await l.put(r,u?i.clone():i)}catch(p){throw"QuotaExceededError"===p.name&&await async function(){for(const e of n)await e()}(),p}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:c,oldResponse:d,newResponse:i.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=b(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"===typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const a={...n,state:s};return t[e](a)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve()}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const n of this.iterateCallbacks("cacheWillUpdate"))if(t=await n({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class C{constructor(e={}){this.cacheName=c(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"===typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,a=new T(this,{event:t,request:s,params:n}),r=this._getResponse(a,s,t);return[r,this._awaitComplete(r,a,s,t)]}async _getResponse(e,s,n){let a;await e.runCallbacks("handlerWillStart",{event:n,request:s});try{if(a=await this._handle(s,e),!a||"error"===a.type)throw new t("no-response",{url:s.url})}catch(r){for(const t of e.iterateCallbacks("handlerDidError"))if(a=await t({error:r,event:n,request:s}),a)break;if(!a)throw r}for(const t of e.iterateCallbacks("handlerWillRespond"))a=await t({event:n,request:s,response:a});return a}async _awaitComplete(e,t,s,n){let a,r;try{a=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:a}),await t.doneWaiting()}catch(i){r=i}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:a,error:r}),t.destroy(),r)throw r}}const E={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class q extends C{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(E),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,s){const n=[];const a=[];let r;if(this._networkTimeoutSeconds){const{id:t,promise:i}=this._getTimeoutPromise({request:e,logs:n,handler:s});r=t,a.push(i)}const i=this._getNetworkPromise({timeoutId:r,request:e,logs:n,handler:s});a.push(i);const c=await s.waitUntil((async()=>await s.waitUntil(Promise.race(a))||await i)());if(!c)throw new t("no-response",{url:e.url});return c}_getTimeoutPromise({request:e,logs:t,handler:s}){let n;return{promise:new Promise((t=>{n=setTimeout((async()=>{t(await s.cacheMatch(e))}),1e3*this._networkTimeoutSeconds)})),id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,handler:n}){let a,r;try{r=await n.fetchAndCachePut(t)}catch(i){a=i}return e&&clearTimeout(e),!a&&r||(r=await n.cacheMatch(t)),r}}class k extends C{constructor(e){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(E)}async _handle(e,s){const n=s.fetchAndCachePut(e).catch((()=>{}));let a,r=await s.cacheMatch(e);if(r)0;else{0;try{r=await n}catch(i){a=i}}if(!r)throw new t("no-response",{url:e.url,error:a});return r}}s(80);const U=e=>e&&"object"===typeof e?e:{handle:e};class N{constructor(e,t,s="GET"){this.handler=U(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=U(e)}}class L extends N{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class S{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((t=>{"string"===typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const n=s.origin===location.origin,{params:a,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return void 0;let o;try{o=i.handle({url:s,request:e,event:t,params:a})}catch(l){o=Promise.reject(l)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async n=>{if(h){0;try{return await h.handle({url:s,request:e,event:t,params:a})}catch(r){n=r}}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw n}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const a=this._routes.get(s.method)||[];for(const r of a){let a;const i=r.match({url:e,sameOrigin:t,request:s,event:n});if(i)return a=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"===typeof i)&&(a=void 0),{route:r,params:a}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,U(e))}setCatchHandler(e){this._catchHandler=U(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let A;const P=()=>(A||(A=new S,A.addFetchListener(),A.addCacheListener()),A);function K(e,s,n){let a;if("string"===typeof e){const t=new URL(e,location.href);0;a=new N((({url:e})=>e.href===t.href),s,n)}else if(e instanceof RegExp)a=new L(e,s,n);else if("function"===typeof e)a=new N(e,s,n);else{if(!(e instanceof N))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}return P().registerRoute(a),a}s(977);function M(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"===typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(n,location.href),r=new URL(n,location.href);return a.searchParams.set("__WB_REVISION__",s),{cacheKey:a.href,url:r.href}}class O{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class D{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=t&&t.cacheKey||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s):e},this._precacheController=e}}class W extends C{constructor(e={}){e.cacheName=i(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(W.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let n;if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return n=await s.fetch(e),n}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const n=await s.fetch(e);if(!(await s.cachePut(e,n.clone())))throw new t("bad-precaching-response",{url:e.url,status:n.status});return n}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==W.copyRedirectedCacheableResponsesPlugin&&(n===W.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(W.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}W.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},W.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await m(e):e};class I{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new W({cacheName:i(e),plugins:[...t,new D({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const n of e){"string"===typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:a}=M(n),r="string"!==typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:e});if("string"!==typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(a,e),this._urlsToCacheModes.set(a,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return g(e,(async()=>{const t=new O;this.strategy.plugins.push(t);for(const[a,r]of this._urlsToCacheKeys){const t=this._cacheKeysToIntegrities.get(r),s=this._urlsToCacheModes.get(a),n=new Request(a,{integrity:t,cache:s,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:r},request:n,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return g(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params={cacheKey:s,...t.params},this.strategy.handle(t))}}let H;const j=()=>(H||(H=new I),H);class F extends N{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const e of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:a}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(e);if(t)return{cacheKey:t}}}),e.strategy)}}function B(e){return j().matchPrecache(e)}self.skipWaiting(),self.addEventListener("activate",(()=>self.clients.claim()));var G=[{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/A69N72LqWY-wpFSt-fGke/_buildManifest.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/A69N72LqWY-wpFSt-fGke/_ssgManifest.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/282-fa71c83354373d6249fd.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/4-9422674bdde7a151f2a0.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/48-6318ac88ded8d4233ded.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/615-490a9cfe785ade4f4bc1.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/640-bc2f2fa5334c9ded1b13.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/732-53a059e14bf7208178f4.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/framework-2191d16384373197bc0a.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/main-8c8cd71c826a9652a935.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/pages/_app-0af4e1cb2e141834a8cd.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/pages/_error-94ed2348718d59e1af9b.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/pages/auth-175f4392439ff124825c.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/pages/character/%5Bid%5D-ee99987584e74e661565.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/pages/characters-0afcd1133001d0545c9c.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/pages/episode/%5Bid%5D-8352bdcf6113812d9bbe.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/pages/fallback-9d06a31f1a3a27fe8f29.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/pages/index-b875e6a59005cac4ae81.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/chunks/webpack-61095c13c5984b221292.js'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/css/15206cc75687a8586754.css'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/css/79776c297e9d7cbc3a63.css'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/css/8649a0af00263937f3b1.css'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/css/896960a89df132db2c3d.css'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/css/91ee2faa3fa61159b104.css'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/css/c23c3b298fdaa1dd68d2.css'},{'revision':'A69N72LqWY-wpFSt-fGke','url':'/_next/static/css/efd754edc9819730e5e0.css'},{'revision':'8a631cc66260c07dc82d8c8029e6498c','url':'/favicon.ico'},{'revision':'d810573f980e737f608321af2736d828','url':'/icons/logo192.png'},{'revision':'cbf274a30f6a5fd752adc05e2a640780','url':'/icons/logo384.png'},{'revision':'0fa6a52dddb05d485faa7e50ad09e1a1','url':'/icons/logo512.png'},{'revision':'50581957536222798fee62a8192b1756','url':'/icons/maskable.png'},{'revision':'561d5140f834479089ba5155574a8226','url':'/logout.svg'},{'revision':'5f5008772db7ed1c49c5cd28c2fffbd8','url':'/manifest.json'},{'revision':'a85c99e37b4c62082254c7bbe8d40b16','url':'/rickMorty.svg'},{'revision':'4b4f1876502eb6721764637fe5c41702','url':'/vercel.svg'}];G.push({url:"/fallback",revision:"1234567890"}),function(e,t){!function(e){j().precache(e)}(e),function(e){const t=j();K(new F(t,e))}(t)}(G),self.addEventListener("activate",(e=>{const t=i();e.waitUntil((async(e,t="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e));return await Promise.all(s.map((e=>self.caches.delete(e)))),s})(t).then((e=>{})))})),K("/",new q({cacheName:"start-url",plugins:[new R({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),K(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new class extends C{async _handle(e,s){let n,a=await s.cacheMatch(e);if(a)0;else{0;try{a=await s.fetchAndCachePut(e)}catch(r){n=r}0}if(!a)throw new t("no-response",{url:e.url,error:n});return a}}({cacheName:"google-fonts",plugins:[new R({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),K(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new k({cacheName:"static-font-assets",plugins:[new R({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),K(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new class extends C{constructor(e={}){super(e),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,s){let n,a;try{const t=[s.fetch(e)];if(this._networkTimeoutSeconds){const e=w(1e3*this._networkTimeoutSeconds);t.push(e)}if(a=await Promise.race(t),!a)throw new Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`)}catch(r){n=r}if(!a)throw new t("no-response",{url:e.url,error:n});return a}}({plugins:[new R({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),K(/\.(?:js)$/i,new k({cacheName:"static-js-assets",plugins:[new R({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),K(/\.(?:css|less)$/i,new k({cacheName:"static-style-assets",plugins:[new R({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),K(/\.(?:json|xml|csv)$/i,new q({cacheName:"static-data-assets",plugins:[new R({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),K(/\/api\/.*$/i,new q({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new R({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),K(/.*/i,new q({cacheName:"others",networkTimeoutSeconds:10,plugins:[new R({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET");var Q;Q=new k({}),P().setDefaultHandler(Q),function(e){P().setCatchHandler(e)}((function(e){var t=e.event;if("only-if-cached"!==t.request.cache||"same-origin"===t.request.mode)switch(t.request.destination){case"document":return B("/fallback");case"image":return B("/static/images/fallback.png");case"font":default:return Response.error()}}))}()}();