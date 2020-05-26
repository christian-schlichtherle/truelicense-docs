# Using The WSI

The Key Manager Service module in your generated project implements a Web Service Interface (WSI) for license key
management on the consumer side.

## Starting The WSI

The Key Manager Service module is designed to be embedded in a WAR file which gets deployed to a Servlet container like
[Apache Tomcat](https://tomcat.apache.org).
Therefore, this module does not provide a standalone JAR.
For testing purposes, there is a main class which runs a simple HTTP server with the embedded WSI.
You can start it using the following command:

``` bash
export JAVA_HOME=$(/usr/libexec/java_home -v 11) # on macOS only
chmod +x mvnw
./mvnw clean verify
java -jar keymgr-service/target/*-keymgr-service-*-standalone.jar
```

## Installing A License Key

Once the server is running, you can install the license key which you have generated when
[using the CLI](using-the-cli.html) like this:

```
$ curl -v localhost:9998/license --data-binary @product.lic -H 'Content-Type: application/octet-stream'
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 9998 (#0)
> POST /license HTTP/1.1
> Host: localhost:9998
> User-Agent: curl/7.64.1
> Accept: */*
> Content-Type: application/octet-stream
> Content-Length: 349
> 
* upload completely sent off: 349 out of 349 bytes
< HTTP/1.1 303 See Other
< Location: http://localhost:9998/license
< Content-Length: 0
< 
* Connection #0 to host localhost left intact
* Closing connection 0
```

Note that `@product.lic` references the license key file which has been previously generated.

The server responds with the status code 303 and a new location to indicate that the operation succeeded and that the
client can now load the license key at the specified location.

## Loading The License Key

You can load the installed license key using:

```
$ curl -v localhost:9998/license
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 9998 (#0)
> GET /license HTTP/1.1
> Host: localhost:9998
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 200 OK
< Content-Type: application/json
< Content-Length: 153
< 
* Connection #0 to host localhost left intact
{"license":{"consumerAmount":1,"consumerType":"User","holder":"CN=Unknown","issued":1590520369673,"issuer":"CN=Company Inc.","subject":"StarGazer 2020"}}* Closing connection 0
```

The server responds with the status code 200 and a JSON encoding of the license bean which is encoded in the installed
license key.

If no license key is installed, then the server responds with the status code 404 and an exception message:

```
$ curl -v localhost:9998/license
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 9998 (#0)
> GET /license HTTP/1.1
> Host: localhost:9998
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 404 Not Found
< Content-Type: text/plain
< Content-Length: 168
< 
* Connection #0 to host localhost left intact
global.namespace.fun.io.api.NoContentException: Cannot locate the key "StarGazer 2020" in the user preferences node for the absolute path "/com/company/product/keymgr".* Closing connection 0
```

## Verifying The License Key

You can verify the installed license key using:

```
$ curl -v localhost:9998/license?verify=true
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 9998 (#0)
> GET /license?verify=true HTTP/1.1
> Host: localhost:9998
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 200 OK
< Content-Type: application/json
< Content-Length: 153
< 
* Connection #0 to host localhost left intact
{"license":{"consumerAmount":1,"consumerType":"User","holder":"CN=Unknown","issued":1590520369673,"issuer":"CN=Company Inc.","subject":"StarGazer 2020"}}* Closing connection 0
```

The server responds with the status code 200 and a JSON encoding of the license bean which is encoded in the installed
license key.

If no license key is installed, then the server responds with the status code 404 and an exception message:

```
$ curl -v localhost:9998/license?verify=true
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 9998 (#0)
> GET /license?verify=true HTTP/1.1
> Host: localhost:9998
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 404 Not Found
< Content-Type: text/plain
< Content-Length: 168
< 
* Connection #0 to host localhost left intact
global.namespace.fun.io.api.NoContentException: Cannot locate the key "StarGazer 2020" in the user preferences node for the absolute path "/com/company/product/keymgr".* Closing connection 0
```

If a license key is installed, but the encoded license bean is invalid, then the server responds with the status code
402 and an exception message:

```
$ curl -v localhost:9998/license?verify=true
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 9998 (#0)
> GET /license?verify=true HTTP/1.1
> Host: localhost:9998
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 402 Payment Required
< Content-Type: text/plain
< Content-Length: 100
< 
* Connection #0 to host localhost left intact
License validity period has expired at Wednesday, 20 May 2020 21:36:12 Central European Summer Time.* Closing connection 0
```

## Uninstalling The License Key

You can uninstall the license key using:

```
$ curl -v localhost:9998/license -X DELETE
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 9998 (#0)
> DELETE /license HTTP/1.1
> Host: localhost:9998
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 204 No Content
< 
* Connection #0 to host localhost left intact
* Closing connection 0
```

The server responds with the status code 204 to indicate that the operation succeeded with an empty response entity.

If no license key is installed or only an auto-generated FTP license key is installed, then the server responds with the
status code 404 and an exception message:

```
$ curl -v localhost:9998/license -X DELETE
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 9998 (#0)
> DELETE /license HTTP/1.1
> Host: localhost:9998
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 404 Not Found
< Content-Type: text/plain
< Content-Length: 168
< 
* Connection #0 to host localhost left intact
global.namespace.fun.io.api.NoContentException: Cannot locate the key "StarGazer 2020" in the user preferences node for the absolute path "/com/company/product/keymgr".* Closing connection 0
```
