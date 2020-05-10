# Directory Tree

## Overview

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
│           ├── java
│           │   └── com
│           │       └── company
│           │           └── product
│           │               └── keymgr
│           │                   ├── LicenseManagerIT.java.vtl
│           │                   └── MainIT.java.vtl
│           └── resources
├── keymgr-service
│   ├── pom.xml
│   └── src
│       ├── main
│       │   └── java
│       │       └── com
│       │           └── company
│       │               └── product
│       │                   └── keymgr
│       │                       └── service
│       │                           └── Main.java.vtl
│       └── test
│           └── java
│               └── com
│                   └── company
│                       └── product
├── mvnw
├── mvnw.cmd
└── pom.xml
```

::: tip

In this example, the property `package` is set to `com.company.product`.

:::

## Structure

In the following definitions, the pattern `**` refers to any valid directory path name, whereas `*` refers to any
substring of any single path name element:

**`**/pom.xml`**
:   These are the Maven [POM](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html) files for the
    various modules in the project.

**`pom.xml`**
:   The POM file in the top-level directory configures the defaults for use by the other POM files.
    For example, it contains a section with properties which configure the algorithms and parameters used by the
    generated licensing schema classes.

**`**/*.java.vtl`**
:   These are Apache Velocity template files for generating Java source files.
    When generating sources, the TrueLicense Maven Plugin merges each template file with the Maven properties into a
    Java source file.

**`keygen/`**
:   This directory defines the module for exposing an API and a CLI to generate license keys.
    You can use the CLI of this module to generate license keys. 

    **This module needs to be kept under lock and key - never distribute it!**

**`keygen/src/main/java/com/company/product/keygen/LicenseManager.java.vtl`**
:   This file defines the part of the licensing schema for use within the license key generator.

**`keymgr/`**
:   This directory defines the module for exposing an API, a CLI and a GUI to consume license keys.
    Your software product uses the API of this module for installing, loading, verifying or uninstalling license keys.
    
    The module provides a configuration for ProGuard which is used when generating the standalone JAR of this module.
    
    **You need to obfuscate this module and its dependencies in order to prevent your software product from being
    vulnerable to an attack where the classes in the TrueLicense Core module would be replaced with a stub!**

**`keymgr/src/main/java/com/company/product/keymgr/LicenseManager.java.vtl`**
:   This file defines the part of the licensing schema for use within your software product.

**`keymgrsrv/`**
:   This directory defines the module for exposing a ReST-based WSI to consume license keys.
    You can ignore this module if you don’t want to expose a ReST-based WSI for consuming license keys.

*[API]: Application Programming Interface
*[CLI]: Command Line Interface
*[GUI]: Graphical User Interface
*[JAR]: Java ARchive
*[JRE]: Java Runtime Environment
*[JVM]: Java Virtual Machine
*[ReST]: Representational State Transfer
*[VCS]: Version Control System
*[WSI]: Web Service Interface
