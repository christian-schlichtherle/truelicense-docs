# Example Configurations

This page shows some example configurations which you can use when generating your project.
For a complete list of properties, please check the [Configuration Properties](/reference/config-properties.md) page.

## Baseline

This is the baseline for the following examples.
It configures a software product with only one edition and no free trial period.

``` bash
mvn archetype:generate --batch-mode \
    -DarchetypeGroupId='global.namespace.truelicense-maven-archetype' \
    -DarchetypeArtifactId='truelicense-maven-archetype' \
    -DarchetypeVersion='4.0.3' \
    -DartifactId='baseline' \
    -Dcompany='Company Inc.' \
    -DgroupId='com.company.product' \
    -Dpassword='unsafe2020' \
    -Dsubject='StarGazer 2020' \
    -Dversion='1.0-SNAPSHOT'
```

## Free Trial Period

The following example adds the properties [freeTrialPeriod](/reference/config-properties.md#freetrialperiod) and
[ftpSecretMarkerClass](/reference/config-properties.md#ftpsecretmarkerclass) to the baseline configuration in order to
configure a free trial period of thirty days.
For a production project, please change the property `ftpSecretMarkerClass` because it’s obviously not secret anymore.

``` bash{7,8}
mvn archetype:generate --batch-mode \
    -DarchetypeGroupId='global.namespace.truelicense-maven-archetype' \
    -DarchetypeArtifactId='truelicense-maven-archetype' \
    -DarchetypeVersion='4.0.3' \
    -DartifactId='freeTrialPeriod' \
    -Dcompany='Company Inc.' \
    -DfreeTrialPeriod='30' \
    -DftpSecretMarkerClass='sun.security.provider.Sun' \
    -DgroupId='com.company.product' \
    -Dpassword='unsafe2020' \
    -Dsubject='StarGazer 2020' \
    -Dversion='1.0-SNAPSHOT'
```

## Multiple Editions

With _multiple editions_, you can partition your software product into different feature sets and assign a **different
type of license key** to each feature set.
This enables you to sell different feature sets at different price points.

Another use case is to offer a free trial period on the condition that a user has to register for it.
You can embed the user registration data into an FTP license key and hand it out for free.
Other than that, there is no difference between FTP license keys and regular license keys.
Just like an [automatic free trial period](#free-trial-period), this enables you to restrict certain features to regular
license keys.

The following example adds the property [editions](/reference/config-properties.md#editions) to the baseline
configuration in order to manage separate license keys for a Standard Edition and an Enterprise Edition of the software
product.
Note that due to the given ordering, the Enterprise Edition is a superset of the Standard Edition.

``` bash{7}
mvn archetype:generate --batch-mode \
    -DarchetypeGroupId='global.namespace.truelicense-maven-archetype' \
    -DarchetypeArtifactId='truelicense-maven-archetype' \
    -DarchetypeVersion='4.0.3' \
    -DartifactId='multipleProductEditions' \
    -Dcompany='Company Inc.' \
    -Deditions='enterprise standard' \
    -DgroupId='com.company.product' \
    -Dpassword='unsafe2020' \
    -Dsubject='StarGazer 2020' \
    -Dversion='1.0-SNAPSHOT'
```

## Hide Uninstall Action

The following example adds the property [hideUninstallAction](/reference/config-properties.md#hideuninstallaction) to
the baseline configuration in order to remove the "Uninstall the installed license key" action from the licensing wizard dialog.

``` bash{8}
mvn archetype:generate --batch-mode \
    -DarchetypeGroupId='global.namespace.truelicense-maven-archetype' \
    -DarchetypeArtifactId='truelicense-maven-archetype' \
    -DarchetypeVersion='4.0.3' \
    -DartifactId='hideUninstallAction' \
    -Dcompany='Company Inc.' \
    -DgroupId='com.company.product' \
    -DhideUninstallAction='true' \
    -Dpassword='unsafe2020' \
    -Dsubject='StarGazer 2020' \
    -Dversion='1.0-SNAPSHOT'
```

## Disable License Wizard

The following example adds the property [disableWizard](/reference/config-properties.md#disablewizard) to the baseline
configuration in order to completely remove the license wizard dialog from the generated code.

``` bash{7}
mvn archetype:generate --batch-mode \
    -DarchetypeGroupId='global.namespace.truelicense-maven-archetype' \
    -DarchetypeArtifactId='truelicense-maven-archetype' \
    -DarchetypeVersion='4.0.3' \
    -DartifactId='disableWizard' \
    -Dcompany='Company Inc.' \
    -DdisableWizard='true' \
    -DgroupId='com.company.product' \
    -Dpassword='unsafe2020' \
    -Dsubject='StarGazer 2020' \
    -Dversion='1.0-SNAPSHOT'
```

## Custom License Management Authorization

The following example adds the properties [keyGenAuthorization](/reference/config-properties.md#keygenauthorization)
and [keyMgrAuthorization](/reference/config-properties.md#keymgrauthorization) to the baseline configuration in order to
implement a custom license authorization.

``` bash{8,9}
mvn archetype:generate --batch-mode \
    -DarchetypeGroupId='global.namespace.truelicense-maven-archetype' \
    -DarchetypeArtifactId='truelicense-maven-archetype' \
    -DarchetypeVersion='4.0.3' \
    -DartifactId='customAuthorization' \
    -Dcompany='Company Inc.' \
    -DgroupId='com.company.product' \
    -DkeyGenAuthorization='global.namespace.truelicense.api.LicenseManagementAuthorization.ALL' \
    -DkeyMgrAuthorization='global.namespace.truelicense.api.LicenseManagementAuthorization.ALL' \
    -Dpassword='unsafe2020' \
    -Dsubject='StarGazer 2020' \
    -Dversion='1.0-SNAPSHOT'
```

## Custom License Validation

The following example adds the properties [keyGenValidation](/reference/config-properties.md#keygenvalidation) and
[keyMgrValidation](/reference/config-properties.md#keymgrvalidation) to the baseline configuration in order to decorate
the default license validation function in the Key Generator and Key Manager modules.

``` bash{8,9}
mvn archetype:generate --batch-mode \
    -DarchetypeGroupId='global.namespace.truelicense-maven-archetype' \
    -DarchetypeArtifactId='truelicense-maven-archetype' \
    -DarchetypeVersion='4.0.3' \
    -DartifactId='customValidation' \
    -Dcompany='Company Inc.' \
    -DgroupId='com.company.product' \
    -DkeyGenValidation='new com.company.product.keygen.Main.NoLicenseValidation()' \
    -DkeyMgrValidation='new com.company.product.keygen.Main.NoLicenseValidation()' \
    -Dpassword='unsafe2020' \
    -Dsubject='StarGazer 2020' \
    -Dversion='1.0-SNAPSHOT'
```

## Custom Clock

The following example adds the property [keyMgrClock](/reference/config-properties.md#keymgrclock) to the baseline
configuration in order to replace the system clock with a custom implementation.

``` bash{8}
mvn archetype:generate --batch-mode \
    -DarchetypeGroupId='global.namespace.truelicense-maven-archetype' \
    -DarchetypeArtifactId='truelicense-maven-archetype' \
    -DarchetypeVersion='4.0.3' \
    -DartifactId='customClock' \
    -Dcompany='Company Inc.' \
    -DgroupId='com.company.product' \
    -DkeyMgrClock='java.time.Clock.systemDefaultZone()' \
    -Dpassword='unsafe2020' \
    -Dsubject='StarGazer 2020' \
    -Dversion='1.0-SNAPSHOT'
```

## V2/XML License Key Format

The following example adds the property [licenseKeyFormat](/reference/config-properties.md#licensekeyformat) to the
baseline configuration in order to use the V2/XML license key format and replace the dependency on the Jackson JSON
Processor with the JAXB API and runtime.
Note that this also changes the defaults for the [keyStoreType](/reference/config-properties.md#keystoretype) and
[pbeAlgorithm](/reference/config-properties.md#pbealgorithm).

``` bash{8}
mvn archetype:generate --batch-mode \
    -DarchetypeGroupId='global.namespace.truelicense-maven-archetype' \
    -DarchetypeArtifactId='truelicense-maven-archetype' \
    -DarchetypeVersion='4.0.3' \
    -DartifactId='v2XmlLicenseKeyFormat' \
    -Dcompany='Company Inc.' \
    -DgroupId='com.company.product' \
    -DlicenseKeyFormat='V2/XML' \
    -Dpassword='unsafe2020' \
    -Dsubject='StarGazer 2020' \
    -Dversion='1.0-SNAPSHOT'
```
