---
sidebarDepth: 2
---

# Project Structure

## Layout

When using the TrueLicense Maven Archetype, the following directory tree gets created:

```
.
├── .gitignore
├── .hgignore
├── .mvn
│   └── wrapper
│       ├── MavenWrapperDownloader.java
│       ├── maven-wrapper.jar
│       └── maven-wrapper.properties
├── build.log
├── keygen
│   ├── pom.xml
│   └── src
│       ├── main
│       │   ├── filtered
│       │   │   └── com
│       │   │       └── company
│       │   │           └── product
│       │   │               └── keygen
│       │   │                   └── Main.properties
│       │   ├── java
│       │   │   └── com
│       │   │       └── company
│       │   │           └── product
│       │   │               └── keygen
│       │   │                   ├── LicenseManager.java.vtl
│       │   │                   └── Main.java.vtl
│       │   └── resources
│       │       └── private.ks
│       └── test
│           └── java
│               └── com
│                   └── company
│                       └── product
│                           └── keygen
│                               └── MainIT.java.vtl
├── keymgr
│   ├── pom.xml
│   └── src
│       ├── main
│       │   ├── filtered
│       │   │   └── com
│       │   │       └── company
│       │   │           └── product
│       │   │               └── keymgr
│       │   │                   └── Main.properties
│       │   ├── java
│       │   │   └── com
│       │   │       └── company
│       │   │           └── product
│       │   │               └── keymgr
│       │   │                   ├── LicenseManager.java.vtl
│       │   │                   └── Main.java.vtl
│       │   └── resources
│       │       └── public.ks
│       └── test
│           └── java
│               └── com
│                   └── company
│                       └── product
│                           └── keymgr
│                               ├── LicenseManagerIT.java.vtl
│                               └── MainIT.java.vtl
├── keymgr-service
│   ├── pom.xml
│   └── src
│       └── main
│           └── java
│               └── com
│                   └── company
│                       └── product
│                           └── keymgr
│                               └── service
│                                   └── Main.java.vtl
├── mvnw
├── mvnw.cmd
└── pom.xml
```

::: tip

In this example, the property `package` is set to `com.company.product`.

:::

::: tip

You need to make the `mvnw*` executable if you want to use the Maven wrapper.
On Linux (or macOS), execute the following command:

``` bash
chmod +x mvnw
```

:::

::: tip

The next thing you should do is to [setup a version control system](setting-up-a-vcs.md) for the project.

:::

## Explanation

In the following lists, the pattern `**` refers to any valid directory path name, whereas `*` refers to any substring of
a single path name element:

### General

**`**/pom.xml`**

:   These files are [Apache Maven](https://maven.apache.org)
    [POM](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html)s.
    Each module has its own POM to define how Maven should build and eventually deploy it.

    &nbsp;

**`**/*.java.vtl`**

:   These files are [Apache Velocity](https://velocity.apache.org) templates for generating Java source files.
    When generating sources, the TrueLicense Maven Plugin merges each template with the Maven properties into a Java
    source file.

### Top Level

**`pom.xml`**

:   This file defines the values of the [configuration properties](/reference/config-properties.md) for use by the other
    POM files.
    These properties define the algorithms and parameters used by the generated code to implement the licensing schema
    for your software product.
    
    For most of these properties, you can simply edit their values and re-run the build.
    However, some properties control the dependencies required by the build system or some other part of it.
    **If you want to change any of these properties, you need to regenerate the project and copy the keystore files
    over from the old project to the new project - see below.**

### Key Generator

**`keygen/`**

:   This directory defines the module for exposing an API and a CLI to generate license keys.
    You can use the CLI of this module to generate license keys. 

    **This module needs to be kept under lock and key - never distribute it!**

**`keygen/src/main/java/com/company/product/keygen/LicenseManager.java.vtl`**

:   This file implements the vendor part of your licensing schema for use within your license key generator.

**`keygen/src/main/resources/private.ks`**

:   This keystore file contains the private key entry used to generate regular license keys.
    The exact name of its path depends on the value of the property
    [privateKeyStoreFile](/reference/config-properties.md#privatekeystorefile).

    When a project gets created this file doesn't exist yet!
    Maven will automatically create it upon the first build.
    **When regenerating your project, you need to copy this file into the new project or otherwise you cannot generate
    new license keys for older versions of your software product!**

### Key Manager

**`keymgr/`**

:   This directory defines the module for exposing an API, a CLI and a GUI to consume license keys.
    Your software product uses the API of this module for installing, loading, verifying or uninstalling license keys.
    
    **When adding this module as a dependency to your software product, you need to generate a standalone JAR and
    obfuscate it in order to prevent your software product from being vulnerable to an attack where the classes in the
    TrueLicense Core module would be replaced with a stub!**

**`keymgr/pom.xml`**

:   This POM contains a sample configuration for ProGuard which is used for obfuscating the standalone JAR with the
    command line interface (and the Licensing Wizard GUI unless its
    [disabled](/reference/config-properties.md#disablewizard)) of this module.

**`keymgr/src/main/java/com/company/product/keymgr/LicenseManager.java.vtl`**

:   This file implements the consumer part of your licensing schema for use within your software product.

**`keymgr/src/main/resources/public.ks`**

:   This keystore file contains the trusted certificate entry used to consume regular license keys.
    If you have configured a [Free Trial Period](example-configurations.md#free-trial-period) for your software
    product, then it also contains the private key entry used to generate FTP license keys.
    The exact name of its path depends on the value of the properties
    [publicKeyStoreFile](/reference/config-properties.md#publickeystorefile) and
    [ftpKeyStoreFile](/reference/config-properties.md#ftpkeystorefile), respectively.

    When a project gets created this file doesn't exist yet!
    Maven will automatically create it upon the first build.
    **When regenerating your project, you need to copy this file into the new project or otherwise existing regular
    license keys and FTP license keys for your software product get invalidated!**

### Key Manager Service

**`keymgrsrv/`**

:   This directory defines the module for exposing a Web Service Interface (WSI) to consume license keys.
    You can ignore this module if you don’t want to expose a WSI for consuming license keys.

    &nbsp;

*[API]: Application Programming Interface
*[CLI]: Command Line Interface
*[GUI]: Graphical User Interface
*[JAR]: Java ARchive
*[JRE]: Java Runtime Environment
*[JVM]: Java Virtual Machine
*[ReST]: Representational State Transfer
*[VCS]: Version Control System
*[WSI]: Web Service Interface
