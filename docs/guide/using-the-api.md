---
sidebarDepth: 2
---

# Using the API

Your generated project provides an internationalized Application Programming Interface (API) for vending and consuming
license keys in the modules `keygen` (alias Key Generator) and `keymgr` (alias Key Manager) respectively.
This page walks you through the typical lifecycle of a license key using these modules.

::: tip

The generated classes in these modules depend on the TrueLicense API, among others. 
Source code and Javadoc for the TrueLicense API are available on
[Maven Central](https://search.maven.org/search?q=g:global.namespace.truelicense).

:::

## Using the Key Generator API

::: warning

The Key Generator module generates license keys for your software product without requiring authorization!
Therefore, you should keep this module under lock and key.
In particular, do not distribute it to users or the public.
The same concern applies to any derivative work which includes this module.

:::

### Setting Up the Class Path

#### With Maven

Using Maven is the recommended way to integrate the generated project into your software product.
Add the following dependency to the POM for your software product:

``` xml
<dependency>
    <groupId>${groupId}</groupId>
    <artifactId>${artifactId}-keygen</artifactId>
    <version>${version}</version>
</dependency>
```

Assuming the property values of the page [Getting Started](getting-started.md#generating-a-project), this would expand
to:

``` xml
<dependency>
    <groupId>com.company.product</groupId>
    <artifactId>stargazer-keygen</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

#### Without Maven

Without a build tool, you need to manually add the JARs of the project to the classpath of your software product.

You can add the standalone JAR `keygen/target/${artifactId}-keygen-${version}-standalone.jar` to the classpath.
This is convenient because the standalone JAR contains all transitive dependencies, so you only need to add this JAR to
the classpath.

If some dependencies bundled in the standalone JAR conflict with other dependencies of your software product however,
then you may need to add only selected JARs to the class path.
First, copy the runtime dependencies to the directory `keygen/target/dependency` using:

``` bash
$ export JAVA_HOME=$(/usr/libexec/java_home -v 1.8) # on macOS only
$ chmod +x mvnw
$ ./mvnw package dependency:copy-dependencies -DincludeScope=runtime --projects keygen
[...]
$ ls keygen/target/dependency
fun-io-api-2.3.0.jar             jackson-annotations-2.10.2.jar   truelicense-core-4.0.3.jar
fun-io-bios-2.3.0.jar            jackson-core-2.10.2.jar          truelicense-obfuscate-4.0.3.jar
fun-io-jackson-2.3.0.jar         jackson-databind-2.10.2.jar      truelicense-spi-4.0.3.jar
fun-io-spi-2.3.0.jar             truelicense-api-4.0.3.jar        truelicense-v4-4.0.3.jar
```

Now you can select each JAR which you want to add to the classpath from this directory.
Don’t forget to add the regular JAR `keygen/target/${artifactId}-keygen-${version}.jar` to the classpath, too.

### Introduction to the API

When building your project, the following classes get generated from a set of Apache Velocity template files - listed in
alphabetic order:

**`com.company.product.keygen.LicenseManager`**

:   The enumeration of the vendor license managers for your software product.
    The managers get named like each configured edition and ordered from superset to subset.
    Each manager gets configured with the algorithms and parameters for generating license keys for the respective
    edition.

    &nbsp;

**`com.company.product.keygen.Main`**

:   The command line interface for vending license keys.

The main entry point to the API is the enumeration class `LicenseManager`.
For example, if the project sets the property `editions` to `enterprise standard`, then this class looks as follows:

``` java
package com.company.product.keygen;

public enum LicenseManager implements VendorLicenseManager {

    enterprise { /*...*/ },
    standard { /*...*/ };

    /*...*/
}
```

For the following examples, it’s necessary to add the following imports:

``` java
import com.company.product.keygen.*;
import global.namespace.fun.io.api.*;
import global.namespace.truelicense.api.*;

import static global.namespace.fun.io.bios.BIOS.*;
```

### Generating a License Key

You can generate a license key using:

``` java
VendorLicenseManager manager = LicenseManager.${edition};
License input = manager.context().licenseFactory().license();
Sink sink = file("${license-key-path}");
License output = manager.generateKeyFrom(input).saveTo(sink).license();
```

… where `${edition}` expands to an edition of your software product and `${license-key-path}` expands to the path of the
license key file.
For a fully elaborated example, please have a look at the `Main` class.

::: tip

You can omit the last call to `license()` if you are not interested in a duplicate of the saved (output) license bean.

:::

### Working with Runtime Exceptions

The `VendorLicenseManager` interface may throw a `LicenseManagementException`, which extends `GeneralSecurityException`,
which in turn extends the checked `Exception`.
Working with checked exceptions may be cumbersome in contexts where a method gets constrained to only throw unchecked
exceptions, e.g. when implementing functional interfaces like `Runnable.run()`.
For cases like this there is an adapter method named `VendorLicenseManager.unchecked()`:
This method adapts a vendor license manager so that it may throw a
`UncheckedLicenseManagementException`, which extends the unchecked `RuntimeException` and simply wraps the original
`LicenseManagementException`.
Here’s the general usage pattern:

``` java
VendorLicenseManager checkedManager = LicenseManager.${edition};
UncheckedVendorLicenseManager uncheckedManager = checkedManager.unchecked();
License input = uncheckedManager.context().licenseFactory().license();
Sink sink = file("${license-key-path}");
License output = uncheckedManager.generateKeyFrom(input).saveTo(sink).license();
```

As you see, the call sequence is the same as in the previous example.
You can get back the original (checked) vendor license manager by calling:

``` java
UncheckedVendorLicenseManager uncheckedManager = ...;
VendorLicenseManager checkedManager = uncheckedManager.checked();
```

## Using the Key Manager API

### Setting Up the Class Path

#### With Maven

Using Maven is the recommended way to integrate the project into your software product.
Add the following dependency to the POM for your software product:

``` xml
<dependency>
    <groupId>${groupId}</groupId>
    <artifactId>${artifactId}-keymgr</artifactId>
    <version>${version}</version>
</dependency>
```

Assuming the property values of the page [Getting Started](getting-started.md#generating-a-project), this would expand
to:

``` xml
<dependency>
    <groupId>com.company.product</groupId>
    <artifactId>stargazer-keymgr</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

#### Without Maven

Without Maven, you need to manually add the JARs of the project to the classpath of your software product.

You can add the standalone JAR `keymgr/target/${artifactId}-keymgr-${version}-standalone.jar` to the classpath.
This is convenient because the standalone JAR contains all transitive dependencies, so you only need to add this JAR to
the classpath.

If some dependencies bundled in the standalone JAR conflict with other dependencies of your software product however,
then you may need to add only selected JARs to the class path.
First, copy the runtime dependencies to the directory `keymgr/target/dependency` using:

``` bash
$ export JAVA_HOME=$(/usr/libexec/java_home -v 1.8) # on macOS only
$ chmod +x mvnw
$ ./mvnw package dependency:copy-dependencies -DincludeScope=runtime --projects keymgr --also-make
[...]
$ ls keymgr/target/dependency
fun-io-api-2.3.0.jar             jackson-core-2.10.2.jar          truelicense-spi-4.0.3.jar
fun-io-bios-2.3.0.jar            jackson-databind-2.10.2.jar      truelicense-swing-4.0.3.jar
fun-io-jackson-2.3.0.jar         truelicense-api-4.0.3.jar        truelicense-ui-4.0.3.jar
fun-io-spi-2.3.0.jar             truelicense-core-4.0.3.jar       truelicense-v4-4.0.3.jar
jackson-annotations-2.10.2.jar   truelicense-obfuscate-4.0.3.jar
```

Now you can select each JAR which you want to add to the classpath from this directory.
Don’t forget to add the regular JAR `keymgr/target/${artifactId}-keymgr-${version}.jar` to the classpath, too.

### Introduction to the API

When building your project, the following classes get generated from a set of Apache Velocity template files - listed in
alphabetic order:

**`com.company.product.keymgr.LicenseManager`**

:   The enumeration of the consumer license managers for your software product.
    The managers get named like each configured edition and ordered from superset to subset, including an optional FTP.
    Each manager gets configured with the algorithms and parameters for installing, loading, verifying and uninstalling
    license keys for the respective edition.
    
    &nbsp;

**`com.company.product.keymgr.Main`**

:   The command line interface for consuming license keys.

The main entry point to the API is the enumeration class `LicenseManager`.
xFor example, if the project sets the properties `editions` and `freeTrialPeriod` to `enterprise standard` and `30`
respectively, then this class looks as follows:

``` java
package com.company.product.keymgr;

public enum LicenseManager implements ConsumerLicenseManager {

    enterprise { /*...*/ },
    standard { /*...*/ },
    ftp { /*...*/ };

    public static LicenseManager get() { return ftp; }

    /*...*/
}
```

Consumer license managers get arranged in a chain of responsibility, ordered from feature subset to feature superset
(which is the reverse order of the items in the enumeration class `LicenseManager`):
When installing, loading, verifying or uninstalling a license key, each operation gets tried using the parent manager
first.
If the operation succeeds using the parent manager then the processing stops, otherwise the operation gets retried using
the child manager.
This repeats recursively until the operation either succeeds using some manager or no more managers are available,
in which case a `LicenseManagementException` gets thrown.

This design allows you to use the API for installing, loading, verifying and uninstalling license keys without knowing
for which edition a license key has been generated.
To facilitate this, the `LicenseManager` class provides the `get()` method which returns the first manager in the
configured chain-of-responsibility.

For the following examples, it’s necessary to add the following imports:

``` java
import com.company.product.keygen.*;
import global.namespace.fun.io.api.*;
import global.namespace.truelicense.api.*;

import static global.namespace.fun.io.bios.BIOS.*;
```

### Installing a License Key

You can install a license key using:

``` java
ConsumerLicenseManager manager = LicenseManager.get();
Source source = file("${license-key-path}");
manager.install(source);
```

… where `${license-key-path}` expands to the path of the license key file.

`ConsumerLicenseManager.install(Source)` recursively tries each consumer license manager until the given license key fits the
respective lock and saves it.
If the given file does not hold a license key for the lock of any license consumer manager, then a
`LicenseManagementException` gets thrown.

::: tip

Assuming the previous configuration, `LicenseManager.get()` is the same as `LicenseManager.ftp`.

:::

::: tip

It’s not necessary to know for which edition the license key has been generated.

:::

### Loading the License Key

You can load the installed license key using:

``` java
License bean = LicenseManager.get().load();
```

`ConsumerLicenseManager.load()` recursively tries each consumer license manager until an installed license key gets
found and returns a duplicate of its encoded license bean.
If there is no license key installed, then a `LicenseManagementException` gets thrown.

::: warning

This method does not validate the encoded license bean: For example, it’s term may have already expired.

:::

::: tip

It’s not necessary to know for which edition the installed license key has been generated.

:::

### Verifying the License Key

You can verify the installed license key using:

``` java
LicenseManager.get().verify();
```

You need to call this method before you want to access a licensed feature of your software product!

`ConsumerLicenseManager.verify()` recursively tries each consumer license manager until an installed license key gets
found which passes the validation function, too.
If there is no license key installed, then a `LicenseManagementException` gets thrown.
If there is a license key installed, but the encoded license bean is invalid, then a `LicenseValidationException` gets
thrown.

::: tip

Calling this method frequently ensures that your software product detects any license term expiration as soon as
possible.
You don’t need to worry about performance:
TrueLicense maintains a time sensitive cache in order to speed up subsequent processing.
For example, on an Intel i7 at 2.2 GHz, once there is a valid V2/JSON license key installed, you can get about 9.5
million successful license key verifications in a single thread!
Of course, this depends not only on the hardware, but also on the configuration of the licensing schema, so your mileage
may vary.

:::

#### Supporting Multiple Editions

The use case for verifying a license key is different from the use case for the other operations:
When installing, loading or uninstalling a license key, it’s not relevant for which edition a license key has been
generated.
The chain-of-responsibility pattern then ensures that these operations will succeed when calling them on
`LicenseManager.get()`, which is the first manager in the chain.

However, when verifying access to a feature, then you want to make sure that access gets granted if and only if there is
a valid license key installed for the respective edition or any of its supersets, but not its subsets.
To do this, you need to directly use the instances of the enumeration class `LicenseManager`.
For example, assuming the same definition of this class, the following code accepts a valid license key for the
enterprise edition only:

``` java
LicenseManager.enterprise.verify();
```

In contrast, the following code accepts a valid license key for the enterprise edition or the standard edition:

``` java
LicenseManager.standard.verify();
```

Last but not least, the following code accepts a valid license key for the enterprise edition or the standard edition or
the FTP edition:

``` java
LicenseManager.ftp.verify();
```

Note that modelling the FTP as an edition allows you to limit access to some features to registered customers only.
Employing this option is trivial:
Just call `ConsumerLicenseManager.verify()` on any license manager other than `LicenseManager.ftp`.

### Uninstalling the License Key

You can uninstall the license key using:

``` java
LicenseManager.get().uninstall();
```

`ConsumerLicenseManager.uninstall()` recursively tries each consumer license manager until an installed license key gets
found and deletes it.
If there is no license key installed or it's only an auto-generated FTP license key, then a `LicenseManagementException`
gets thrown.

::: tip

It’s not necessary to know for which edition the installed license key has been generated.

:::

### Working with Runtime-Exceptions

The `ConsumerLicenseManager` interface may throw a `LicenseManagementException`, which extends
`GeneralSecurityException`, which in turn extends the checked `Exception`.
Working with checked exceptions may be cumbersome in contexts where a method gets constrained to only throw unchecked
exceptions, e.g. when implementing functional interfaces like `Runnable.run()`.
For cases like this there is an adapter method named `ConsumerLicenseManager.unchecked()`:
This method adapts a consumer license manager so that it may throw an `UncheckedLicenseManagementException`, which
extends the unchecked `RuntimeException` and simply wraps the original `LicenseManagementException`.
Here’s the general usage pattern:

``` java
ConsumerLicenseManager checkedManager = LicenseManager.get();
UncheckedConsumerLicenseManager uncheckedManager = checkedManager.unchecked();
Source source = file("${license-key-path}");
uncheckedManager.install(source);
```

As you see, the call sequence is the same as in the previous example.
You can get back the original (checked) consumer license manager by calling:

``` java
UncheckedConsumerLicenseManager uncheckedManager = ...;
ConsumerLicenseManager checkedManager = uncheckedManager.checked();
```
