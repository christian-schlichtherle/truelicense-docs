## Building The Project

You can rebuild the project using the following command:

``` bash
export JAVA_HOME=$(/usr/libexec/java_home -v 11) # on macOS only
chmod +x mvnw
./mvnw clean verify -Pintegration-test
```

The parameter `-Pintegration-test` triggers the integration tests.

## Build Artifacts

Building the sample project produces the following artifacts - listed in alphabetic order:

`keygen/src/main/resources/${privateKeyStoreFile}`

:   The private key store - see below.

    &nbsp;

`keygen/target/${artifactId}-keygen-${version}-standalone.jar`

:   This is the standalone JAR for the Key Generator module.
    It is generated by bundling the regular JAR with all its dependency JARs.
    This is convenient to use on the command line because you just have to add this JAR to the class path.
    **You should never distribute this JAR!**

`keygen/target/${artifactId}-keygen-${version}.jar`

:   This is the regular JAR for the Key Generator module.
    This JAR has dependencies on other JARs as specified in the Maven
    [POM](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html) for this module.
    **You should never distribute this JAR!**

`keymgr/src/main/resources/${ftpKeyStoreFile}`

:   The FTP key store - see below.

`keymgr/src/main/resources/${publicKeyStoreFile}`

:   The public key store - see below.

`keymgr/target/${artifactId}-keymgr-${version}-guarded.jar`

:   This is the obfuscated standalone JAR for the Key Manager module.
    It is generated from the standalone JAR by obfuscating its byte code.
    This improves the security by making attacks on the byte code pretty hard - but not impossible.
    **This is the only JAR which is intended for distribution.**

`keymgr/target/${artifactId}-keymgr-${version}-standalone.jar`

:   This is the standalone JAR for the Key Manager module.
    It is generated by bundling the regular JAR with all its dependency JARs.
    This is convenient to use on the command line because you just have to add this JAR to the class path.
    **You should not distribute this JAR without additional obfuscation.**

`keymgr/target/${artifactId}-keymgr-${version}.jar`

:   This is the regular JAR for the Key Manager module.
    This JAR has dependencies on other JARs as specified in the Maven POM for this module.
    **You should not distribute this JAR without additional obfuscation.**

`keymgrsrv/target/${artifactId}-keymgrsrv-${version}.jar`

:   This is the regular JAR for the Key Manager Service module.
    This JAR has dependencies on other JARs as specified in the Maven POM for this module.
    **You should not distribute this JAR.**

### Generated Keystore Files

When you run the build for the first time, the following keystore files get generated:

+ `keygen/src/main/resources/${privateKeyStoreFile}`
+ `keymgr/src/main/resources/${ftpKeyStoreFile}`
+ `keymgr/src/main/resources/${publicKeyStoreFile}`

You can use the following command to inspect the entries in the generated key store files:

``` bash
$ keytool -list -v -protected -keystore ${keyStorePath} -storetype ${keyStoreType}
```

… where you need to replace `${keyStorePath}` with the respective path of the keystore file and `${keyStoreType}` with
the keystore type which is configured in the parent POM file `pom.xml`, e.g. `JCEKS`, `JKS` or `PKCS12`.

The output of this command will show you a lot of metadata information:
The distinguished name of the key pair owner and issuer, the validity period of the certificate etc.
However, TrueLicense only reads the key, its digital signature algorithm and its signature - all other metadata gets
ignored.