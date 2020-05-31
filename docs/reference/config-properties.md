---
sidebarDepth: 2
---

# Configuration Properties

Following is the list of configuration properties for generating a project from the TrueLicense Maven Archetype in 
alphabetic order.
Please check the [Example Configurations](/guide/example-configurations.md) page to see how to apply these properties.

::: tip

Property names and values are case-sensitive.

:::

::: warning

If you want to change the value of these properties,
then it’s generally necessary to **regenerate the project** from the TrueLicense Maven Archetype.

:::

::: danger

Even if all their property values are equal, the license keys of any two generated projects will not be compatible
unless both projects **also share the following key store files** (see below for default values):

+ `keygen/src/main/resources/${privateKeyStoreFile}`
+ `keymgr/src/main/resources/${ftpKeyStoreFile}`
+ `keymgr/src/main/resources/${publicKeyStoreFile}`

:::

## Required Properties

### `artifactId`

**Description**

:   The Maven artifact ID of the root
    [POM](http://maven.apache.org/guides/introduction/introduction-to-the-pom.html)
    for the generated project.
    This could match the name of your software product, e.g. `product`, or be generic, e.g. `license`.

    &nbsp;

**Type**

:   A Maven artifact ID must not contain spaces and should consist of only lower-case characters - see
    [Maven Coordinates](https://maven.apache.org/pom.html#Maven_Coordinates).

### `company`

**Description**

:   The display name of your company, e.g. `Company Inc.`.

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

### `groupId`

**Description**

:   The Maven group ID for the generated project.
    This could be the reversed domain name for your company plus the name of the software product.

    &nbsp;

**Type**

:   A Maven group ID must not contain spaces and should consist of only lower-case characters - see
    [Maven Coordinates](https://maven.apache.org/pom.html#Maven_Coordinates).

### `password`

**Description**

:   The common password for accessing keystores and encrypting license keys.

    &nbsp;

**Type**

:   A string of at least eight characters which must contain letters and digits.
    You should consider this to be the bare minimum.
    Choosing a longer password with additional punctuation characters significantly improves the security level of your
    licensing schema.

### `subject`

**Description**

:   The license management subject.
    The value of this property gets stored in the generated license keys and is used for validation.
    A `global.namespace.truelicense.api.LicenseValidationException` gets thrown if the validation fails.
    It's best practice including the name of your software product, and a version number range for which the license
    keys are valid, e.g. `Product 1` or `Product 1.X`.
    The license validation step compares the entire string, so the version number format doesn't matter.
    If you want to obsolete existing license keys in a future release then all you need to do is to change the value of
    this property, e.g. to `Product 2` or `Product 2.X`.

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

### `version`

**Description**

:   The Maven version for the generated project.
    This should match the version of your software product.

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

## Optional Properties

### `artifactName`

**Description**

:   The display name of the parent POM for the generated  project.
    This could be the name of your software product, e.g. `Product`, or be generic, e.g. `License`.

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

**Default Value**

:   `-`

### `customClasspathScope`

**Description**

:   Declares the scope of the class path for the custom classes referenced by the properties with the name pattern
    `*Class`.

    &nbsp;

**Type**

:   Enter `compile` to declare that custom classes are available on the class path at compile time.
    The advantage is that the classes can be safely included in the byte code obfuscation process.
    The disadvantage is that the classes need to be known at compile time so that manual editing of the dependencies in
    the generated POM files for the Key Generator or Key Manager module may be necessary.

    Enter `runtime` to declare that custom classes are available on the class path at runtime only.
    The advantage is that the classes don't need to be known at compile time so that manual editing of the generated POM
    files should not be necessary.
    The disadvantage is that the classes need to be generally excluded from the byte code obfuscation process, e.g. for
    the Key Manager module.
    This is considered to be a security leak and therefore should be generally avoided.
    However, this is not true for [ProGuard](https://www.guardsquare.com/en/products/proguard):
    TrueLicense generates code for dynamic class loading which is correctly recognized and obfuscated by ProGuard so
    that it's safe to use this option with ProGuard.

**Default Value**

:   `compile`

### `disableWizard`

**Description**

:   Whether the Swing wizard dialog in the Key Manager module should be disabled or not.
    Enter `true` to remove the dependency on the TrueLicense Swing module and reduce the code size.

    &nbsp;

**Type**

:   [boolean](https://www.w3.org/TR/xmlschema-2/#boolean)

**Default Value**

:   `false`

### `editions`

**Description**

:   A space separated list of edition names, ordered from supersets to subsets, e.g. `enterprise standard`.
    Each name must be a valid Java identifier name and should be camel-cased with a lower-case initial character.
    The names `edition` and `ftp` are reserved for internal use.

    &nbsp;

**Type**

:   A space separated list of valid identifiers in the Java language.

**Default Value**

:   `standard`

### `freeTrialPeriod`

**Description**

:   The number of days for an auto-generated Free Trial Period (FTP).
    Needs to be a non-negative integer, e.g. `30`.
    Specify `0` to disable the auto-generation of FTP license keys.

    &nbsp;

**Type**

:   [nonNegativeInteger](https://www.w3.org/TR/xmlschema-2/#nonNegativeInteger)

**Default Value**

:   `0`

### `ftpKeyStoreFile`

**Description**

:   The path of the FTP keystore file in the Key Manager module relative to the base path
    `keymgr/src/main/resources/`.
    This property gets ignored if the property [freeTrialPeriod](#freetrialperiod) is set to `0`.
    Otherwise, if this property is set to `-`, then it gets overridden by the property [publicKeyStoreFile](#publickeystorefile).

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

**Default Value**

:   `-`

### `ftpSecretMarkerClass`

**Description**

:   A fully qualified binary class name which declares the user or system preferences node to use for storing the
    auto-generated FTP license key.
    This property gets ignored if the property [freeTrialPeriod](#freetrialperiod) is set to `0`.
    Otherwise, the **package name** of the referenced class needs to be **kept secret** because removing the
    FTP license key from the preferences' node triggers the auto-generation of another FTP license key!
    The named class gets dynamically loaded at run time, so it doesn't have to be on the compile-time class path of the
    Key Manager module.

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

**Default Value**

:   `-`

### `hideUninstallAction`

**Description**

:   Whether the Swing wizard dialog in the Key Manager module should hide the action for uninstalling the license key or
    not.

    &nbsp;

**Type**

:   [boolean](https://www.w3.org/TR/xmlschema-2/#boolean)

**Default Value**

:   `false`

### `keyGenAuthorization`

**Description**

:   An expression of the type `global.namespace.truelicense.api.LicenseManagementAuthorization` for use in the Key 
    Generator module.
    Enter `-` to use no license authorization.

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

**Default Value**

:   `-`

### `keyGenValidation`

**Description**

:   An expression of the type `global.namespace.truelicense.api.LicenseValidation` for use in the Key Generator module.
    Enter `-` to use only the built-in license validation function.

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

**Default Value**

:   `-`

### `keyGenValidationComposition`

**Description**

:   Selects the composition strategy for license validation functions in the Key Generator module.
    This property gets ignored if the property [keyGenValidation](#keygenvalidation) is set to `-`.

    &nbsp;

**Type**

:   Enter `override` to apply only the custom function.
    Enter `decorate` to apply both the custom function and the built-in function.

**Default Value**

:   `decorate`

### `keyMgrAuthorization`

**Description**

:   An expression of the type `global.namespace.truelicense.api.LicenseManagementAuthorization` for use in the Key 
    Manager module.
    Enter `-` to use no license authorization.

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

**Default Value**

:   `-`

### `keyMgrClock`

**Description**

:   An expression of the type `java.time.Clock` for use in the Key Manager module.
    Enter `-` to use the system clock.

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

**Default Value**

:   `-`

### `keyMgrValidation`

**Description**

:   An expression of the type `global.namespace.truelicense.api.LicenseValidation` for use in the Key Manager module.
    Enter `-` to use only the built-in license validation function.

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

**Default Value**

:   `-`

### `keyMgrValidationComposition`

**Description**

:   Selects the composition strategy for license validation functions in the Key Manager module.
    This property gets ignored if the property [keyMgrValidation](#keymgrvalidation) is set to `-`.

    &nbsp;

**Type**

:   Enter `override` to apply only the custom function.
    Enter `decorate` to apply both the custom function and the built-in function.

**Default Value**

:   `decorate`

### `keyPairAlgorithm`

**Description**

:   The algorithm to use when generating key pairs in the keystore files on the first build.
    This property gets ignored if the keystore files already exist.
    The algorithm needs to be implemented by some security provider which is installed in the JRE.

    &nbsp;

**Type**

:   The name of a
    [`KeyPairGenerator` algorithm](https://docs.oracle.com/en/java/javase/14/docs/specs/security/standard-names.html#keypairgenerator-algorithms): 

    + `DiffieHellman`
    + `DSA`
    + `EC`
    + `RSA`
    + `RSASSA-PSS`
    + `X25519` (requires Java 11 or later)
    + `X448` (requires Java 11 or later)
    + `XDH` (requires Java 11 or later)

**Default Value**

:   `DSA`

### `keyPairSize`

**Description**

:   The key size in bits when generating key pairs in the keystore files at the first build.
    This property gets ignored if the keystore files already exist.
    Otherwise, if it's `0`, then the property gets overridden by the keytool.
    Otherwise, the bit size needs to correspond to the property [keyPairAlgorithm](#keypairalgorithm)
    and be implemented by some security provider which is installed in the JRE.

    &nbsp;

**Type**

:   [nonNegativeInteger](https://www.w3.org/TR/xmlschema-2/#nonNegativeInteger)

**Default Value**

:   `0`

### `keyStoreType`

**Description**

:   The default keystore type.
    The type needs to be implemented by some security provider which is installed in the JRE.

    &nbsp;

**Type**

:   The name of a
    [`KeyStore` type](https://docs.oracle.com/en/java/javase/14/docs/specs/security/standard-names.html#keystore-types): 

    + `DKS`
    + `JCEKS`
    + `JKS`
    + `PKCS11`
    + `PKCS12`

**Default Value**

:   If the property [licenseKeyFormat](#licensekeyformat) is set to `V1`, then this property gets set to `JKS`,
    or else if the property [licenseKeyFormat](#licensekeyformat) starts with `V2/`, then it gets set to `JCEKS`,
    or else to `PKCS12`.

### `licenseKeyFormat`

**Description**

:   The format of the license keys.
    Enter `V4` to benefit from the latest cryptographic standards.
    It was introduced in TrueLicense 4 and depends on the Jackson JSON Processor.
    Enter `V2/JSON` only if you need to retain compatibility with this license key format.
    It was introduced in TrueLicense 2 and depends on the Jackson JSON Processor.
    Enter `V2/XML` only if you need to retain compatibility with this license key format.
    It was introduced in TrueLicense 2 and depends on the JAXB API and runtime.
    Enter `V1` only if you need to retain compatibility with this license key format.
    It was introduced in TrueLicense 1.

    &nbsp;

**Type**

:   One of:

    + `V1`
    + `V2/XML`
    + `V2/JSON`
    + `V4`

**Default Value**

:   `V4`

### `package`

**Description**

:   The base package name of the generated project.
    It's best practice evaluating the expression `${groupId}` or `${groupId}.${artifactId}` if this results in a valid
    package name.

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

**Default Value**

:   The value of the property [groupId](#groupid).

### `pbeAlgorithm`

**Description**

:   The algorithm for the password based encryption.
    The algorithm needs to be implemented by some security provider which is installed in the JRE.

**Type**

:   The name of a
    [`Cipher` algorithm](https://docs.oracle.com/en/java/javase/14/docs/specs/security/standard-names.html#cipher-algorithm-names): 

    + `PBEWithMD5AndDES`
    + `PBEWithMD5AndTripleDES`
    + `PBEWithSHA1AndDESede`
    + `PBEWithSHA1AndRC2_40`
    + `PBEWithSHA1AndRC2_128`
    + `PBEWithSHA1AndRC4_40`
    + `PBEWithSHA1AndRC4_128`
    + `PBEWithHmacSHA1AndAES_128`
    + `PBEWithHmacSHA224AndAES_128`
    + `PBEWithHmacSHA256AndAES_128`
    + `PBEWithHmacSHA384AndAES_128`
    + `PBEWithHmacSHA512AndAES_128`
    + `PBEWithHmacSHA1AndAES_256`
    + `PBEWithHmacSHA224AndAES_256`
    + `PBEWithHmacSHA256AndAES_256`
    + `PBEWithHmacSHA384AndAES_256`
    + `PBEWithHmacSHA512AndAES_256`

**Default Value**

:   If the property [licenseKeyFormat](#licensekeyformat) is set to `V1`, then this property gets set to
    `PBEWithMD5AndDES`, or else if the property [licenseKeyFormat](#licensekeyformat) starts with `V2/`, then it gets
     set to `PBEWithSHA1AndDESede`, or else to `PBEWithHmacSHA256AndAES_128`.

### `preferencesType`

**Description**

:   The type of the preferences nodes where to install license keys.
    Note that `system` generally requires the JVM to be run with administrator privileges or otherwise a
    `java.util.prefs.BackingStoreException` may get thrown by the generated integration tests.

    &nbsp;

**Type**

:   One of:

    + `system`
    + `user`

**Default Value**

:   `user`

### `privateKeyStoreFile`

**Description**

:   The path of the private keystore file in the Key Generator module relative to the base path
    `keygen/src/main/resources/`.

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

**Default Value**

:   `private.ks`

### `publicKeyStoreFile`

**Description**

:   The path of the public keystore file in the Key Manager module relative to the base path
    `keymgr/src/main/resources/`.

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

**Default Value**

:   `public.ks`

### `signatureAlgorithm`

**Description**

:   The algorithm to use when signing a generated key pair in a keystore file at the first build.
    This property gets ignored if the keystore file already exists.
    The signature algorithm needs to correspond to the property [keyPairAlgorithm](#keypairalgorithm) and be implemented
    by some security provider which is installed in the JRE.

    &nbsp;

**Type**

:   The name of a
    [`Signature` algorithm](https://docs.oracle.com/en/java/javase/14/docs/specs/security/standard-names.html#signature-algorithms): 

    + `NONEwithDSA`
    + `SHA1withDSA`
    + `SHA224withDSA`
    + `SHA256withDSA`
    + `SHA384withDSA`
    + `SHA512withDSA`
    + `SHA3-224withDSA`
    + `SHA3-256withDSA`
    + `SHA3-384withDSA`
    + `SHA3-512withDSA`
    + `NONEwithDSAinP1363Format`
    + `SHA1withDSAinP1363Format`
    + `SHA224withDSAinP1363Format`
    + `SHA256withDSAinP1363Format`
    + `NONEwithECDSA`
    + `SHA1withECDSA`
    + `SHA224withECDSA`
    + `SHA256withECDSA`
    + `SHA384withECDSA`
    + `SHA512withECDSA`
    + `SHA3-224withECDSA`
    + `SHA3-256withECDSA`
    + `SHA3-384withECDSA`
    + `SHA3-512withECDSA`
    + `NONEwithECDSAinP1363Format`
    + `SHA1withECDSAinP1363Format`
    + `SHA224withECDSAinP1363Format`
    + `SHA256withECDSAinP1363Format`
    + `SHA384withECDSAinP1363Format`
    + `SHA512withECDSAinP1363Format`
    + `NONEwithRSA`
    + `MD2withRSA`
    + `MD5withRSA`
    + `SHA1withRSA`
    + `SHA224withRSA`
    + `SHA256withRSA`
    + `SHA384withRSA`
    + `SHA512withRSA`
    + `SHA512/224withRSA`
    + `SHA512/256withRSA`
    + `SHA3-224withRSA`
    + `SHA3-256withRSA`
    + `SHA3-384withRSA`
    + `SHA3-512withRSA`
    + `RSASSA-PSS`

**Default Value**

:   The property value gets determined by the keytool.

### `trueLicenseVersion`

**Description**

:   The TrueLicense version to use.

    &nbsp;

**Type**

:   [token](https://www.w3.org/TR/xmlschema-2/#token)

**Default Value**

:   The version of the latest release as of the release date of the TrueLicense Maven Archetype.

### `verboseCli`

**Description**

:   Whether the command line interface (CLI) should write debugging information to the standard error stream by default
    or not.

    &nbsp;

**Type**

:   [boolean](https://www.w3.org/TR/xmlschema-2/#boolean)

**Default Value**

:   `false`
