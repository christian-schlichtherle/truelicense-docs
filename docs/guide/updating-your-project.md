---
sidebarDepth: 2
---

# Updating Your Project

This page shows you how to update your project _after_ you have put it into production for selling license keys.

::: tip

If you have not put your project into production yet, then you can safely skip this page.
If you just want to change some [configuration properties](/reference/config-properties.md), then you can simply
[regenerate your project](getting-started.md#generating-a-project).

:::

## Overview

In the top-level directory of your generated project, the file `pom.xml` contains an XML element named `properties`:

``` xml
<project [...]>
    <properties>
        [...]
    </properties>
</project>
```

This element gets populated when you [generate your project](getting-started.md#generating-a-project).
Its contents are a list of XML elements of the form `<name>value</name>`.
Each element defines a property `name` and `value`.
These properties get used for code generation, e.g. there is a property named `subject` whose value defines the name of
your software product - see below.

::: danger

Changing the property values in the file `pom.xml` may break compatibility with existing license keys!
If you have not already done so, then please [set-up a VCS](setting-up-a-vcs.md) for your project or otherwise make sure
to have some backup before proceeding.

:::

## Limiting License Key Validity

Let’s assume you want to limit the validity of the license keys for your software product to a particular version number
range, e.g. the same major version number.
Then you should include this version number range, e.g. the major version number 1, in the value of the property named
`subject`:

``` xml
<subject>Product 1</subject>
```

Later, when you want to publish a new major version number release, e.g. major version number 2, then all you need to do
in order to invalidate all previously generated license keys is to update the property value accordingly:

``` xml
<subject>Product 2</subject>
```

It does not matter how you format the version number range in the licensing subject because the validation function
simply compares the complete string.
So if you like, you could also set the property value to `Product 1.x` or `Product 2.x` instead of `Product 1` or
`Product 2`, respectively.
If TrueLicense finds an old license key installed then a `global.namespace.truelicense.api.LicenseValidationException`
[gets thrown by the API](using-the-api.md#verifying-the-license-key).

## Adding An Edition

### Adding The Name

Let’s assume you want to add another edition to your software product so that you can upsell a different type of
license key for some new features.
The value of the property named `editions` defines a comma separated list of edition names, ordered from feature
superset to subset.
Each name must be a valid Java identifier and should be camelCased with the initial character being lowercase.

The name `ftp` is reserved for an auto-generated free trial period.
If you didn’t define a value for this property when generating your project, then the default value is `standard`:

``` xml
<editions>standard</editions>
```

You can simply add the name of the new edition to this list (mind the sorting order from feature superset to subset).

For example, if you want to sell a higher-priced Enterprise Edition as a superset of the existing Standard Edition,
then you need to insert the name of the enterprise edition _before_ the name of the standard edition:

``` xml
<editions>enterprise standard</editions>
```

On the other hand, if you want to sell a lower-priced Lite Edition as a subset of the existing Standard Edition,
then you need to append the name of the lite edition _after_ the name of the standard edition:

``` xml
<editions>standard lite</editions>
```

### Adding The Keystore Password

For each edition, there needs to be a password for accessing the individual private key for signing the license keys.
If you don’t configure this password, then it defaults to the password for verifying the integrity of the private key
store, which defaults to the password set when generating your project.
You don’t need to change this password at all, but if you want to, then you can do so by adding a property named
`${edition}KeyEntryPassword`, where you need to replace `${edition}` with the name of the new edition.
For example, you can add a password for an edition named `enterprise` like this:

``` xml
<enterpriseKeyEntryPassword>[...]</enterpriseKeyEntryPassword>
```

For accessing the entry in the keystore its name needs to be configured, too.
This could simply be the name of the edition, like so:

``` xml
<enterpriseKeyEntryAlias>enterprise</enterpriseKeyEntryAlias>
```

### Adding The Encryption Password

For each edition, there needs to be a password for encrypting and decrypting the license keys.
If you don’t configure this password, then it defaults to the password set when generating your project.
Again, you don’t need to change this password, but if you want to, then you can do so by adding a property named
`${edition}PbePassword`, where you need to replace `${edition}` with the name of the new edition again.
For example, you can add a password for an edition named `enterprise` like this:

``` xml
<enterprisePbePassword>[...]</enterprisePbePassword>
```

### Amending The Keystores

Next, the private and public key stores need to get updated so that they contain a new entry for the new edition.
This is done automatically when you are building your project for the very first time.
However, when another edition gets added later, this needs to be done manually.
You can do it like this:

``` bash
export JAVA_HOME=$(/usr/libexec/java_home -v 1.8) # on macOS only
chmod +x mvnw
./mvnw generate-resources \
    -Pgenerate-private-key-store \
    -Pgenerate-public-key-store \
    -Deditions=${edition}
```

… where you need to replace `${edition}` with the name of the new feature set.
For example, you can update the keystores for an edition named `enterprise` like this:

``` bash
export JAVA_HOME=$(/usr/libexec/java_home -v 1.8) # on macOS only
chmod +x mvnw
./mvnw generate-resources \
    -Pgenerate-private-key-store \
    -Pgenerate-public-key-store \
    -Deditions=enterprise
```

## Upgrading Your Project

Let’s assume you want to upgrade your project to benefit from the latest improvements in TrueLicense.
In this case, you need to generate a new project and customize it so that it’s fully compatible with existing license
keys, i.e. it must be possible to share the same license keys between the old and the new project.

### Generating Your New Project

First you need to [generate a new project](getting-started.md#generating-a-project) and set the values of the properties
as explained below.

#### Upgrading From Before TrueLicense Maven Archetype 2.4

If the old project was generated using the TrueLicense Maven Archetype before version 2.4, then you need to set the
values of the following properties as follows:

`password`

:   Enter the value produced by the obfuscated string field `PBE_PASSWORD` in the class `**.keymgr.LicensingSchema$Lazy`.

`freeTrialPeriod`

:   Enter the value of the field `FTP_DAYS` in the same class.

`ftpKeyStoreFile`

:   Enter `ftp.ks`.

`ftpSecretMarkerClass`

:   Enter the parameter value of the last call to the method `.storeInUserNode([...])` in the same class, but without
    the `.class` suffix, e.g. `sun.security.provider.Sun`.

`licenseKeyFormat`

:   Search for the expression matching the pattern `new *ManagementContext(SUBJECT)` in the same class and select the
    value as follows:

    + For `new V1LicenseManagementContext(SUBJECT)`, enter `V1`.
    + For `new V2XmlLicenseManagementContext(SUBJECT)`, enter `V2/XML`.
    + For `new V2JsonLicenseManagementContext(SUBJECT)`, enter `V2/JSON` (default).

`subject`

:   Enter the value of the field `SUBJECT` in the same class.

`package`

:   Enter the part of the package name before the `keymgr` element in the same class.

`preferencesType`

:   Search for the expression matching the pattern `storeIn*Node(LicensingSchema.class)` and select the value as
    follows:

    + For `storeInSystemNode(LicensingSchema.class)`, enter `system`.
    + For `storeInUserNode(LicensingSchema.class)`, enter `user`.

#### Upgrading From TrueLicense Maven Archetype 2.4 Or Later

If the old project was generated using the TrueLicense Maven Archetype version 2.4 or later, then you need to ensure
that the values of the following properties are equal:

+ `editions`
+ `freeTrialPeriod`
+ `ftpKeyStoreFile`
+ `ftpSecretMarkerClass`
+ `keyStoreType`
+ `licenseKeyFormat`
+ `password`
+ `pbeAlgorithm`
+ `preferencesType`
+ `privateKeyStoreFile`
+ `publicKeyStoreFile`
+ `subject`

### Copying Keystores

Copy the following files from the old project to the new project:

+ `keygen/src/main/resources/${privateKeyStoreFile}`
+ `keymgr/src/main/resources/${ftpKeyStoreFile}`
+ `keymgr/src/main/resources/${publicKeyStoreFile}`

### Customizing Properties

The file `pom.xml` contains a set of properties with the following name patterns:

+ `*Alias`
+ `*Password`
+ `*Type`

… where `*` matches any prefix.
Please check the comments for each of these properties in the file and edit their values to match the configuration of
the old project.
If the old project was generated using the TrueLicense Maven Archetype before version 2.4, then its generally necessary
to change the value of the properties named `*Alias` to `mykey`, which was the default name for a private key entry
or a trusted certificate entry generated by the Java keytool.

### Building Your project

You are now set for [building your project](building-your-project.md) again.
