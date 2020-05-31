---
sidebarDepth: 2
---

# Using The CLI

Your generated project provides an internationalized Command Line Interface (CLI) for the Key Generator and the Key
Manager modules.
The CLI gets implemented in the main classes `${package}.keygen.Main` and `${package}.keymgr.Main`, respectively.

## Using The Key Generator CLI

### Overview

If you run the standalone JAR of the Key Generator module without parameters, it prints usage instructions:

```
$ java -jar keygen/target/*-keygen-*-standalone.jar
Usage:

	Main <command> [<options>] [<parameters>]

where <command> is one of (case is ignored):

	help		print usage instructions for a command
	version		print version information
	generate	generates a license key

```

You can get help for a particular command by using the `help` command.
These are the usage instructions for the `generate` command:

```
$ java -jar keygen/target/*-keygen-*-standalone.jar help generate
Usage:

	generate [[-key]  <license-key-path>   ] |
	         [-input  <input-license-path> ] |
	         [-output <output-license-path>] |
	         [-edition <edition>] |
	         [-verbose <boolean>]

Generates a license key and prints its license bean to standard output. If a
<license-key-path> is specified, then the generated license key gets saved to
the file identified by this path.

If an <input-license-path> is specified, then the license bean gets decoded
from the file identified by this path and transformed into the license key.
Specifying a dash (-) causes the standard input stream to be used instead of a
file. If no <input-license-path> is specified, then a default license bean gets
created and transformed into the license key.

If an <output-license-path> is specified, then the license bean gets encoded to
the file identified by this path for subsequent editing and input to this
command. Specifying a dash (-) causes the standard output stream to be used
instead of a file.

If more than edition has been configured in the licensing schema, then a
<edition> must be specified on the command line.

By default, this command does not write debugging information to the standard
error stream. You can override the default behavior by specifying
`-verbose true` or `-verbose false`.
```

### Generating A License Key

#### Using Default Properties

You can generate a license key with default properties as follows:

```
$ java -jar keygen/target/*-keygen-*-standalone.jar generate product.lic -verbose true
global.namespace.truelicense.v4.V4License@ce3c1e26[subject="StarGazer 2020", holder="CN=Unknown", issuer="CN=Company Inc.", issued=Sat May 23 18:46:11 CEST 2020, notBefore=null, notAfter=null, consumerType="User", consumerAmount=1, info=null]
```

This command creates and initializes a new license bean, encodes it into a license key and writes the result into the 
file `product.lic`.

If the property `${verboseCli}` is set to `true` when generating your project, then a brief representation of the
encoded license bean gets printed to the standard error stream by default.
You can override this by specifying `-verbose true` or `-version false`.

#### Supporting Multiple Editions

If your software product requires supporting multiple editions, then you need to specify the `-edition` option on the
command line.
For example, you can generate a license key for an edition named `standard` like this:

```
$ java -jar keygen/target/*-keygen-*-standalone.jar generate product.lic -verbose true -edition standard
global.namespace.truelicense.v4.V4License@9628f7d5[subject="StarGazer 2020", holder="CN=Unknown", issuer="CN=Company Inc.", issued=Sat May 23 18:49:29 CEST 2020, notBefore=null, notAfter=null, consumerType="User", consumerAmount=1, info=null]
```
 
For brevity, only one edition is assumed in the remainder of this page, so this option is not specified again.

#### Property Input

You can specify the `-input` parameter in order to read a template license bean from a file or the standard input
stream.
The input syntax needs to conform to the configured license key format.
For example, if the license key format is V4, then you can decode a license bean with the `holder` and `term`
properties from the standard input stream in JSON format and generate a V4 license key from it like this:

```
$ echo '{ "holder": "CN=Christian Schlichtherle", "term": 365 }' | \
    java -jar keygen/target/*-keygen-*-standalone.jar generate product.lic -verbose true -input -
global.namespace.truelicense.v4.V4License@752005ff[subject="StarGazer 2020", holder="CN=Christian Schlichtherle", issuer="CN=Company Inc.", issued=Sat May 23 18:55:08 CEST 2020, notBefore=Sat May 23 18:55:08 CEST 2020, notAfter=Sun May 23 18:55:08 CEST 2021, consumerType="User", consumerAmount=1, info=null]
```

Please refer to the Javadoc for the interface `global.namespace.truelicense.api.License` for a list of all properties.

#### Property Output

You can specify the `-output` parameter in order to write the encoded license bean to a file or the standard output
stream.
The output syntax conforms to the configured license key format.
For example, if the license key format is V4, then you can decode a license bean with the `issuer` property from
the standard input stream in JSON format, generate a V4 license key from it and print the encoded license bean to
the standard output stream like this:

```
$ echo '{ "issuer": "CN=Christian Schlichtherle" }' | \
    java -jar keygen/target/*-keygen-*-standalone.jar generate product.lic -verbose false -input - -output -
{"consumerAmount":1,"consumerType":"User","holder":"CN=Unknown","issued":1590253080694,"issuer":"CN=Christian Schlichtherle","subject":"StarGazer 2020"}
```

#### Custom Properties

Besides the predefined properties, you can also store custom properties in a license bean.
To facilitate this, the `License` interface defines a property with the name `extra` and the type `java.lang.Object`.
To store an object into this property, its type needs to be supported by the codec of the respective license key format,
i.e. JSON or XML.
Both codecs support `java.util.Map` without customization.
For example, if the license key format is V4, then you can provide a map with the custom properties named `foo` and
`bar` like this:

```
$ echo '{ "extra": { "foo": 1, "bar": "baz" } }' | \
    java -jar keygen/target/*-keygen-*-standalone.jar generate product.lic -verbose false -input - -output -
{"consumerAmount":1,"consumerType":"User","extra":{"foo":1,"bar":"baz"},"holder":"CN=Unknown","issued":1590253228724,"issuer":"CN=Company Inc.","subject":"StarGazer 2020"}
```

TrueLicense never discloses the property `extra` to users, so you can store any private information in it.
If you want to share some additional information with the user, then you can use the property with the name `info` and
the type `java.lang.String` instead.

## Using The Key Manager CLI

### Overview

Just like the standalone JAR of the Key Generator module, if you run the guarded JAR or the standalone JAR of the Key
Manager module without parameters, it prints usage instructions:

```
$ java -jar keymgr/target/*-keymgr-*-guarded.jar
Usage:

	Main <command> [<options>] [<parameters>]

where <command> is one of (case is ignored):

	help		print usage instructions for a command
	version		print version information
	install		installs a license key
	load		loads and prints the installed license key
	verify		verifies the installed license key
	uninstall	Uninstalls the license key
	wizard		starts the licensing wizard

```

You can get help for a particular command by using the `help` command.
These are the usage instructions for the `install` command:

```
$ java -jar keymgr/target/*-keymgr-*-guarded.jar help install
Usage:

	install <license-key-path>

Loads and installs the regular license key from the file identified by
<license-key-path>.
```

::: tip

The following examples use the `keymgr-*-standalone.jar`, i.e. the unobfuscated JAR to produce readable output.
Try these commands with the `keymgr-*-guarded.jar` and notice the difference for yourself.

:::

### Installing A License Key

You can install a license key as follows:

```
$ java -jar keymgr/target/*-keymgr-*-standalone.jar install product.lic
```

Note that there is no output unless there is an error, in which case an exception gets printed.

### Loading The License Key

You can load the installed license key as follows:

```
$ java -jar keymgr/target/*-keymgr-*-standalone.jar load
global.namespace.truelicense.v4.V4License@9a7e2266[subject="StarGazer 2020", holder="CN=Unknown", issuer="CN=Company Inc.", issued=Sat May 23 19:00:28 CEST 2020, notBefore=null, notAfter=null, consumerType="User", consumerAmount=1, info=null]
```

A brief representation of the encoded license bean gets written to the standard output stream.

If no license key is installed, then a `global.namespace.truelicense.api.LicenseManagementException` gets thrown instead

```
$ java -jar keymgr/target/*-keymgr-*-standalone.jar load
global.namespace.truelicense.api.LicenseManagementException: global.namespace.fun.io.api.NoContentException: Cannot locate the key "StarGazer 2020" in the user preferences node for the absolute path "/com/company/product/keymgr".
	at global.namespace.truelicense.core.TrueLicenseManagementContext.callChecked(TrueLicenseManagementContext.java:83)
	at global.namespace.truelicense.core.TrueLicenseManagementContext.access$800(TrueLicenseManagementContext.java:37)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.load(TrueLicenseManagementContext.java:758)
	at com.company.product.keymgr.LicenseManager.load(LicenseManager.java:94)
	at com.company.product.keymgr.Main$5.run(Main.java:54)
	at com.company.product.keymgr.Main.process(Main.java:120)
	at com.company.product.keymgr.Main.processAndHandleExceptions(Main.java:102)
	at com.company.product.keymgr.Main.main(Main.java:96)
Caused by: global.namespace.fun.io.api.NoContentException: Cannot locate the key "StarGazer 2020" in the user preferences node for the absolute path "/com/company/product/keymgr".
	at global.namespace.fun.io.bios.PreferencesStore.content(PreferencesStore.java:80)
	at global.namespace.fun.io.api.Store.content(Store.java:76)
	at global.namespace.fun.io.bios.PreferencesStore.lambda$input$0(PreferencesStore.java:43)
	at global.namespace.fun.io.api.Socket.lambda$map$0(Socket.java:136)
	at global.namespace.fun.io.api.Socket.lambda$map$0(Socket.java:136)
	at global.namespace.fun.io.api.Socket.lambda$map$0(Socket.java:136)
	at global.namespace.fun.io.api.Socket.lambda$map$0(Socket.java:136)
	at global.namespace.truelicense.core.Filters$1.lambda$input$1(Filters.java:51)
	at global.namespace.fun.io.api.Socket.apply(Socket.java:123)
	at global.namespace.fun.io.jackson.JsonCodec$1.decode(JsonCodec.java:44)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.repositoryModel(TrueLicenseManagementContext.java:810)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.repositoryController(TrueLicenseManagementContext.java:804)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.authenticate(TrueLicenseManagementContext.java:800)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$CachingLicenseManager.authenticate(TrueLicenseManagementContext.java:673)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.decodeLicense(TrueLicenseManagementContext.java:796)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.lambda$load$2(TrueLicenseManagementContext.java:760)
	at global.namespace.truelicense.core.TrueLicenseManagementContext.callChecked(TrueLicenseManagementContext.java:79)
	... 7 more
```

### Verifying The License Key

You can verify the installed license key using:

```
$ java -jar keymgr/target/*-keymgr-*-standalone.jar verify
```

Note that there is no output in case of success.
If no license key is installed however, then a `global.namespace.truelicense.api.LicenseManagementException` gets thrown
instead:

```
$ java -jar keymgr/target/*-keymgr-*-standalone.jar verify
global.namespace.truelicense.api.LicenseManagementException: global.namespace.fun.io.api.NoContentException: Cannot locate the key "StarGazer 2020" in the user preferences node for the absolute path "/com/company/product/keymgr".
	at global.namespace.truelicense.core.TrueLicenseManagementContext.callChecked(TrueLicenseManagementContext.java:83)
	at global.namespace.truelicense.core.TrueLicenseManagementContext.access$800(TrueLicenseManagementContext.java:37)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.verify(TrueLicenseManagementContext.java:766)
	at com.company.product.keymgr.LicenseManager.verify(LicenseManager.java:99)
	at com.company.product.keymgr.Main$6.run(Main.java:59)
	at com.company.product.keymgr.Main.process(Main.java:120)
	at com.company.product.keymgr.Main.processAndHandleExceptions(Main.java:102)
	at com.company.product.keymgr.Main.main(Main.java:96)
Caused by: global.namespace.fun.io.api.NoContentException: Cannot locate the key "StarGazer 2020" in the user preferences node for the absolute path "/com/company/product/keymgr".
	at global.namespace.fun.io.bios.PreferencesStore.content(PreferencesStore.java:80)
	at global.namespace.fun.io.api.Store.content(Store.java:76)
	at global.namespace.fun.io.bios.PreferencesStore.lambda$input$0(PreferencesStore.java:43)
	at global.namespace.fun.io.api.Socket.lambda$map$0(Socket.java:136)
	at global.namespace.fun.io.api.Socket.lambda$map$0(Socket.java:136)
	at global.namespace.fun.io.api.Socket.lambda$map$0(Socket.java:136)
	at global.namespace.fun.io.api.Socket.lambda$map$0(Socket.java:136)
	at global.namespace.truelicense.core.Filters$1.lambda$input$1(Filters.java:51)
	at global.namespace.fun.io.api.Socket.apply(Socket.java:123)
	at global.namespace.fun.io.jackson.JsonCodec$1.decode(JsonCodec.java:44)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.repositoryModel(TrueLicenseManagementContext.java:810)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.repositoryController(TrueLicenseManagementContext.java:804)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.authenticate(TrueLicenseManagementContext.java:800)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$CachingLicenseManager.authenticate(TrueLicenseManagementContext.java:673)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.decodeLicense(TrueLicenseManagementContext.java:796)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$CachingLicenseManager.validate(TrueLicenseManagementContext.java:662)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.lambda$verify$3(TrueLicenseManagementContext.java:768)
	at global.namespace.truelicense.core.TrueLicenseManagementContext.callChecked(TrueLicenseManagementContext.java:79)
	... 7 more
```

If a license key is installed, but the encoded license bean is invalid, then a
`global.namespace.truelicense.api.LicenseValidationException` gets thrown instead:

```
$ java -jar keymgr/target/*-keymgr-*-standalone.jar verify
global.namespace.truelicense.api.LicenseValidationException: License validity period has expired at Sunday, 17 May 2020 19:31:26 Central European Summer Time.
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseValidation.validate(TrueLicenseManagementContext.java:908)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$CachingLicenseManager.validate(TrueLicenseManagementContext.java:665)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.lambda$verify$3(TrueLicenseManagementContext.java:768)
	at global.namespace.truelicense.core.TrueLicenseManagementContext.callChecked(TrueLicenseManagementContext.java:79)
	at global.namespace.truelicense.core.TrueLicenseManagementContext.access$800(TrueLicenseManagementContext.java:37)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.verify(TrueLicenseManagementContext.java:766)
	at com.company.product.keymgr.LicenseManager.verify(LicenseManager.java:99)
	at com.company.product.keymgr.Main$6.run(Main.java:59)
	at com.company.product.keymgr.Main.process(Main.java:120)
	at com.company.product.keymgr.Main.processAndHandleExceptions(Main.java:102)
	at com.company.product.keymgr.Main.main(Main.java:96)
```

### Uninstalling The License Key

You can uninstall the license key using:

```
$ java -jar keymgr/target/*-keymgr-*-standalone.jar uninstall
```

Note that there is no output unless there is an error, in which case an exception gets printed.

If no license key is installed or only an auto-generated FTP license key is installed, then a
`global.namespace.truelicense.api.LicenseManagementException` gets thrown instead:

```
$ java -jar *-keymgr/target/*-keymgr-*-standalone.jar uninstall
global.namespace.truelicense.api.LicenseManagementException: global.namespace.fun.io.api.NoContentException: Cannot locate the key "StarGazer 2020" in the user preferences node for the absolute path "/com/company/product/keymgr".
	at global.namespace.truelicense.core.TrueLicenseManagementContext.callChecked(TrueLicenseManagementContext.java:83)
	at global.namespace.truelicense.core.TrueLicenseManagementContext.access$800(TrueLicenseManagementContext.java:37)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.uninstall(TrueLicenseManagementContext.java:775)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$CachingLicenseManager.uninstall(TrueLicenseManagementContext.java:651)
	at com.company.product.keymgr.LicenseManager.uninstall(LicenseManager.java:104)
	at com.company.product.keymgr.Main$7.run(Main.java:64)
	at com.company.product.keymgr.Main.process(Main.java:120)
	at com.company.product.keymgr.Main.processAndHandleExceptions(Main.java:102)
	at com.company.product.keymgr.Main.main(Main.java:96)
Caused by: global.namespace.fun.io.api.NoContentException: Cannot locate the key "StarGazer 2020" in the user preferences node for the absolute path "/com/company/product/keymgr".
	at global.namespace.fun.io.bios.PreferencesStore.content(PreferencesStore.java:80)
	at global.namespace.fun.io.api.Store.content(Store.java:76)
	at global.namespace.fun.io.bios.PreferencesStore.lambda$input$0(PreferencesStore.java:43)
	at global.namespace.fun.io.api.Socket.lambda$map$0(Socket.java:136)
	at global.namespace.fun.io.api.Socket.lambda$map$0(Socket.java:136)
	at global.namespace.fun.io.api.Socket.lambda$map$0(Socket.java:136)
	at global.namespace.fun.io.api.Socket.lambda$map$0(Socket.java:136)
	at global.namespace.truelicense.core.Filters$1.lambda$input$1(Filters.java:51)
	at global.namespace.fun.io.api.Socket.apply(Socket.java:123)
	at global.namespace.fun.io.jackson.JsonCodec$1.decode(JsonCodec.java:44)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.repositoryModel(TrueLicenseManagementContext.java:810)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.repositoryController(TrueLicenseManagementContext.java:804)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.authenticate(TrueLicenseManagementContext.java:800)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$CachingLicenseManager.authenticate(TrueLicenseManagementContext.java:673)
	at global.namespace.truelicense.core.TrueLicenseManagementContext$TrueLicenseManagerParameters$TrueLicenseManager.lambda$uninstall$4(TrueLicenseManagementContext.java:781)
	at global.namespace.truelicense.core.TrueLicenseManagementContext.callChecked(TrueLicenseManagementContext.java:79)
	... 8 more
```
