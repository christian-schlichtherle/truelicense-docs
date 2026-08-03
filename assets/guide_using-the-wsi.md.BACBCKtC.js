import{_ as s,o as a,c as e,a2 as t}from"./chunks/framework.Cxtv3Pj-.js";const u=JSON.parse('{"title":"Using The WSI","description":"","frontmatter":{},"headers":[],"relativePath":"guide/using-the-wsi.md","filePath":"guide/using-the-wsi.md","lastUpdated":1785720919000}'),p={name:"guide/using-the-wsi.md"};function l(i,n,o,c,h,r){return a(),e("div",null,[...n[0]||(n[0]=[t(`<h1 id="using-the-wsi" tabindex="-1">Using The WSI <a class="header-anchor" href="#using-the-wsi" aria-label="Permalink to &quot;Using The WSI&quot;">​</a></h1><p>The Key Manager Service module in your generated project implements a Web Service Interface (WSI) for license key management on the consumer side.</p><h2 id="starting-the-wsi" tabindex="-1">Starting The WSI <a class="header-anchor" href="#starting-the-wsi" aria-label="Permalink to &quot;Starting The WSI&quot;">​</a></h2><p>The Key Manager Service module is designed to be embedded in a WAR file which gets deployed to a Servlet container like <a href="https://tomcat.apache.org" target="_blank" rel="noreferrer">Apache Tomcat</a>. Therefore, this module does not provide a standalone JAR. For testing purposes, there is a main class which runs a simple HTTP server with the embedded WSI. You can start it using the following command:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mvnw</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./mvnw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clean</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> verify</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> keymgr-service/target/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">-keymgr-service-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">-standalone.jar</span></span></code></pre></div><h2 id="installing-a-license-key" tabindex="-1">Installing A License Key <a class="header-anchor" href="#installing-a-license-key" aria-label="Permalink to &quot;Installing A License Key&quot;">​</a></h2><p>Once the server is running, you can install the license key which you have generated when <a href="./using-the-cli">using the CLI</a> like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ curl -v localhost:9998/license --data-binary @product.lic -H &#39;Content-Type: application/octet-stream&#39;</span></span>
<span class="line"><span>*   Trying 127.0.0.1...</span></span>
<span class="line"><span>* TCP_NODELAY set</span></span>
<span class="line"><span>* Connected to localhost (127.0.0.1) port 9998 (#0)</span></span>
<span class="line"><span>&gt; POST /license HTTP/1.1</span></span>
<span class="line"><span>&gt; Host: localhost:9998</span></span>
<span class="line"><span>&gt; User-Agent: curl/7.64.1</span></span>
<span class="line"><span>&gt; Accept: */*</span></span>
<span class="line"><span>&gt; Content-Type: application/octet-stream</span></span>
<span class="line"><span>&gt; Content-Length: 349</span></span>
<span class="line"><span>&gt; </span></span>
<span class="line"><span>* upload completely sent off: 349 out of 349 bytes</span></span>
<span class="line"><span>&lt; HTTP/1.1 303 See Other</span></span>
<span class="line"><span>&lt; Location: http://localhost:9998/license</span></span>
<span class="line"><span>&lt; Content-Length: 0</span></span>
<span class="line"><span>&lt; </span></span>
<span class="line"><span>* Connection #0 to host localhost left intact</span></span>
<span class="line"><span>* Closing connection 0</span></span></code></pre></div><p>Note that <code>@product.lic</code> references the license key file which has been previously generated.</p><p>The server responds with the status code 303 and a new location to indicate that the operation succeeded and that the client can now load the license key at the specified location.</p><h2 id="loading-the-license-key" tabindex="-1">Loading The License Key <a class="header-anchor" href="#loading-the-license-key" aria-label="Permalink to &quot;Loading The License Key&quot;">​</a></h2><p>You can load the installed license key using:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ curl -v localhost:9998/license</span></span>
<span class="line"><span>*   Trying 127.0.0.1...</span></span>
<span class="line"><span>* TCP_NODELAY set</span></span>
<span class="line"><span>* Connected to localhost (127.0.0.1) port 9998 (#0)</span></span>
<span class="line"><span>&gt; GET /license HTTP/1.1</span></span>
<span class="line"><span>&gt; Host: localhost:9998</span></span>
<span class="line"><span>&gt; User-Agent: curl/7.64.1</span></span>
<span class="line"><span>&gt; Accept: */*</span></span>
<span class="line"><span>&gt; </span></span>
<span class="line"><span>&lt; HTTP/1.1 200 OK</span></span>
<span class="line"><span>&lt; Content-Type: application/json</span></span>
<span class="line"><span>&lt; Content-Length: 153</span></span>
<span class="line"><span>&lt; </span></span>
<span class="line"><span>* Connection #0 to host localhost left intact</span></span>
<span class="line"><span>{&quot;license&quot;:{&quot;consumerAmount&quot;:1,&quot;consumerType&quot;:&quot;User&quot;,&quot;holder&quot;:&quot;CN=Unknown&quot;,&quot;issued&quot;:1590520369673,&quot;issuer&quot;:&quot;CN=Company Inc.&quot;,&quot;subject&quot;:&quot;StarGazer 2020&quot;}}* Closing connection 0</span></span></code></pre></div><p>The server responds with the status code 200 and a JSON encoding of the license bean which is encoded in the installed license key.</p><p>If no license key is installed, then the server responds with the status code 404 and an exception message:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ curl -v localhost:9998/license</span></span>
<span class="line"><span>*   Trying 127.0.0.1...</span></span>
<span class="line"><span>* TCP_NODELAY set</span></span>
<span class="line"><span>* Connected to localhost (127.0.0.1) port 9998 (#0)</span></span>
<span class="line"><span>&gt; GET /license HTTP/1.1</span></span>
<span class="line"><span>&gt; Host: localhost:9998</span></span>
<span class="line"><span>&gt; User-Agent: curl/7.64.1</span></span>
<span class="line"><span>&gt; Accept: */*</span></span>
<span class="line"><span>&gt; </span></span>
<span class="line"><span>&lt; HTTP/1.1 404 Not Found</span></span>
<span class="line"><span>&lt; Content-Type: text/plain</span></span>
<span class="line"><span>&lt; Content-Length: 168</span></span>
<span class="line"><span>&lt; </span></span>
<span class="line"><span>* Connection #0 to host localhost left intact</span></span>
<span class="line"><span>global.namespace.fun.io.api.NoContentException: Cannot locate the key &quot;StarGazer 2020&quot; in the user preferences node for the absolute path &quot;/com/company/product/keymgr&quot;.* Closing connection 0</span></span></code></pre></div><h2 id="verifying-the-license-key" tabindex="-1">Verifying The License Key <a class="header-anchor" href="#verifying-the-license-key" aria-label="Permalink to &quot;Verifying The License Key&quot;">​</a></h2><p>You can verify the installed license key using:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ curl -v localhost:9998/license?verify=true</span></span>
<span class="line"><span>*   Trying 127.0.0.1...</span></span>
<span class="line"><span>* TCP_NODELAY set</span></span>
<span class="line"><span>* Connected to localhost (127.0.0.1) port 9998 (#0)</span></span>
<span class="line"><span>&gt; GET /license?verify=true HTTP/1.1</span></span>
<span class="line"><span>&gt; Host: localhost:9998</span></span>
<span class="line"><span>&gt; User-Agent: curl/7.64.1</span></span>
<span class="line"><span>&gt; Accept: */*</span></span>
<span class="line"><span>&gt; </span></span>
<span class="line"><span>&lt; HTTP/1.1 200 OK</span></span>
<span class="line"><span>&lt; Content-Type: application/json</span></span>
<span class="line"><span>&lt; Content-Length: 153</span></span>
<span class="line"><span>&lt; </span></span>
<span class="line"><span>* Connection #0 to host localhost left intact</span></span>
<span class="line"><span>{&quot;license&quot;:{&quot;consumerAmount&quot;:1,&quot;consumerType&quot;:&quot;User&quot;,&quot;holder&quot;:&quot;CN=Unknown&quot;,&quot;issued&quot;:1590520369673,&quot;issuer&quot;:&quot;CN=Company Inc.&quot;,&quot;subject&quot;:&quot;StarGazer 2020&quot;}}* Closing connection 0</span></span></code></pre></div><p>The server responds with the status code 200 and a JSON encoding of the license bean which is encoded in the installed license key.</p><p>If no license key is installed, then the server responds with the status code 404 and an exception message:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ curl -v localhost:9998/license?verify=true</span></span>
<span class="line"><span>*   Trying 127.0.0.1...</span></span>
<span class="line"><span>* TCP_NODELAY set</span></span>
<span class="line"><span>* Connected to localhost (127.0.0.1) port 9998 (#0)</span></span>
<span class="line"><span>&gt; GET /license?verify=true HTTP/1.1</span></span>
<span class="line"><span>&gt; Host: localhost:9998</span></span>
<span class="line"><span>&gt; User-Agent: curl/7.64.1</span></span>
<span class="line"><span>&gt; Accept: */*</span></span>
<span class="line"><span>&gt; </span></span>
<span class="line"><span>&lt; HTTP/1.1 404 Not Found</span></span>
<span class="line"><span>&lt; Content-Type: text/plain</span></span>
<span class="line"><span>&lt; Content-Length: 168</span></span>
<span class="line"><span>&lt; </span></span>
<span class="line"><span>* Connection #0 to host localhost left intact</span></span>
<span class="line"><span>global.namespace.fun.io.api.NoContentException: Cannot locate the key &quot;StarGazer 2020&quot; in the user preferences node for the absolute path &quot;/com/company/product/keymgr&quot;.* Closing connection 0</span></span></code></pre></div><p>If a license key is installed, but the encoded license bean is invalid, then the server responds with the status code 402 and an exception message:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ curl -v localhost:9998/license?verify=true</span></span>
<span class="line"><span>*   Trying 127.0.0.1...</span></span>
<span class="line"><span>* TCP_NODELAY set</span></span>
<span class="line"><span>* Connected to localhost (127.0.0.1) port 9998 (#0)</span></span>
<span class="line"><span>&gt; GET /license?verify=true HTTP/1.1</span></span>
<span class="line"><span>&gt; Host: localhost:9998</span></span>
<span class="line"><span>&gt; User-Agent: curl/7.64.1</span></span>
<span class="line"><span>&gt; Accept: */*</span></span>
<span class="line"><span>&gt; </span></span>
<span class="line"><span>&lt; HTTP/1.1 402 Payment Required</span></span>
<span class="line"><span>&lt; Content-Type: text/plain</span></span>
<span class="line"><span>&lt; Content-Length: 100</span></span>
<span class="line"><span>&lt; </span></span>
<span class="line"><span>* Connection #0 to host localhost left intact</span></span>
<span class="line"><span>License validity period has expired at Wednesday, 20 May 2020 21:36:12 Central European Summer Time.* Closing connection 0</span></span></code></pre></div><h2 id="uninstalling-the-license-key" tabindex="-1">Uninstalling The License Key <a class="header-anchor" href="#uninstalling-the-license-key" aria-label="Permalink to &quot;Uninstalling The License Key&quot;">​</a></h2><p>You can uninstall the license key using:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ curl -v localhost:9998/license -X DELETE</span></span>
<span class="line"><span>*   Trying 127.0.0.1...</span></span>
<span class="line"><span>* TCP_NODELAY set</span></span>
<span class="line"><span>* Connected to localhost (127.0.0.1) port 9998 (#0)</span></span>
<span class="line"><span>&gt; DELETE /license HTTP/1.1</span></span>
<span class="line"><span>&gt; Host: localhost:9998</span></span>
<span class="line"><span>&gt; User-Agent: curl/7.64.1</span></span>
<span class="line"><span>&gt; Accept: */*</span></span>
<span class="line"><span>&gt; </span></span>
<span class="line"><span>&lt; HTTP/1.1 204 No Content</span></span>
<span class="line"><span>&lt; </span></span>
<span class="line"><span>* Connection #0 to host localhost left intact</span></span>
<span class="line"><span>* Closing connection 0</span></span></code></pre></div><p>The server responds with the status code 204 to indicate that the operation succeeded with an empty response entity.</p><p>If no license key is installed or only an auto-generated FTP license key is installed, then the server responds with the status code 404 and an exception message:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ curl -v localhost:9998/license -X DELETE</span></span>
<span class="line"><span>*   Trying 127.0.0.1...</span></span>
<span class="line"><span>* TCP_NODELAY set</span></span>
<span class="line"><span>* Connected to localhost (127.0.0.1) port 9998 (#0)</span></span>
<span class="line"><span>&gt; DELETE /license HTTP/1.1</span></span>
<span class="line"><span>&gt; Host: localhost:9998</span></span>
<span class="line"><span>&gt; User-Agent: curl/7.64.1</span></span>
<span class="line"><span>&gt; Accept: */*</span></span>
<span class="line"><span>&gt; </span></span>
<span class="line"><span>&lt; HTTP/1.1 404 Not Found</span></span>
<span class="line"><span>&lt; Content-Type: text/plain</span></span>
<span class="line"><span>&lt; Content-Length: 168</span></span>
<span class="line"><span>&lt; </span></span>
<span class="line"><span>* Connection #0 to host localhost left intact</span></span>
<span class="line"><span>global.namespace.fun.io.api.NoContentException: Cannot locate the key &quot;StarGazer 2020&quot; in the user preferences node for the absolute path &quot;/com/company/product/keymgr&quot;.* Closing connection 0</span></span></code></pre></div>`,30)])])}const g=s(p,[["render",l]]);export{u as __pageData,g as default};
