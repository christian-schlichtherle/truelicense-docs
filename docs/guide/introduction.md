# Introduction 

## About TrueLicense

[TrueLicense](https://github.com/christian-schlichtherle/truelicense) is an open source engine for license management on
the JVM.
Due to its functional and modular design, it scales from simple to complex licensing schemas.

TrueLicense features various interfaces for managing free trial periods, subscriptions, multiple editions,
internationalization and more.

TrueLicense is designed with security in mind:
Your intellectual property gets protected by digitally signing the license keys and obfuscating the string constants as
well as the byte code of your software.
The privacy of your customers gets protected by encrypting the license keys.
The API lets you configure all the cryptographic standards implemented by the security providers which are installed in
the JRE.

TrueLicense requires a JRE, version 1.8 or later.

## About The TrueLicense Maven Archetype

The [TrueLicense Maven Archetype](https://github.com/christian-schlichtherle/truelicense-maven-archetype) is a
[Maven Archetype](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html) for generating licensing
schemas.
The Maven archetype generates a project containing separate modules for vending and consuming license keys.
You can customize the project for your software product without writing code by
[configuring its properties](/reference/config-properties.md).

### Features

+ Generate a licensing schema without writing code.
+ Customize the licensing schema by configuring a set of properties.
+ Configure a free trial period for your users, called _FTP_.
+ Sell different types of license keys for different feature sets of your software product, called _editions_.
+ Encode custom properties into license keys using JSON or XML.
+ Generate an API for vending and consuming license keys.
+ Generate a CLI for vending and consuming license keys.
+ Generate a GUI for consuming license keys.
+ Generate a ReST-based WSI for consuming license keys.
+ Use the TrueLicense Maven Plugin to obfuscate string constants.
+ Assemble all dependencies into a standalone JAR.
+ Use ProGuard to obfuscate the standalone JAR into a guarded JAR.
+ Use Git or Mercurial as your VCS. 

## License

Before version 4, TrueLicense and the TrueLicense Maven Archetype were covered by the GNU Affero General Public License,
Version 3.
Since version 4,
TrueLicense is covered by the
[Apache License 2.0](https://github.com/christian-schlichtherle/truelicense/blob/master/LICENSE),
and the TrueLicense Maven Archetype is covered by the
[MIT License](https://github.com/christian-schlichtherle/truelicense-maven-archetype/blob/master/LICENSE).

*[API]: Application Programming Interface
*[CLI]: Command Line Interface
*[FTP]: Free Trial Period
*[GNU]: GNU's Not Unix
*[GUI]: Graphical User Interface
*[JAR]: Java ARchive
*[JRE]: Java Runtime Environment
*[JVM]: Java Virtual Machine
*[ReST]: Representational State Transfer
*[VCS]: Version Control System
*[WSI]: Web Service Interface
