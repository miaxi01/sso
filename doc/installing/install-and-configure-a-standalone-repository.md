---
layout: default
title:  Install and Configure a Standalone Repository
---

As a system administrator, you are responsible for installation and maintenance of CA Release Automation. The repository is an integral part of CA Release Automation. The repository stores action packs and artifacts. By default, the repository is installed as part of the Management Server. Install a standalone repository in any of the following situations:

* Your Management Server has limited space and you require more space for the repository.
* You want to ensure that a large repository does not affect the Management Server
* You want to provide a backup of your data if the Management Server fails.

A standalone repository is also required for high availability environments. For more information, see Install to Provide High Availability.

## Verify the Prerequisites
The following are prerequisites to install a standalone repository:

* The repository platform must be a 64-bit system.
* The Repository requires 2 GB of free disk space in the installation partition.
* Confirm that you have sufficient free disk space for file storage requirements.
  > Note: We recommend at least 100 GB.

CA Release Automation supports the following platforms for the standalone repository:

* Windows 2003 R2
* Windows 2008 Windows 2008 R2
* Windows 2012 and 2012 R2
* Red Hat Enterprise Linux 5.2 to 6.5
* CentOS Enterprise OS 5.2 to 6.5
* Ubuntu Server 11, 12, 13
* SUSE Linux Enterprise Server 10, 11
* Oracle Linux 5 Update 6

By default, the CA Release Automation Repository uses the following ports:

* Communication with Release Automation Center - 8080
* Secured - 8443
* Shutdown - 8005
* AJP - 8009

## Install the Repository
Use one of the following options to install the repository:

### Install the Repository on a GUI Platform
On a GUI platform, use the wizard to install the repository.

> Important! On Linux servers, before the installation, grant "a+x" permissions to the following command:

```
nolio_repository_Linux-x64/Solaris_<version>_<build>.sh
```

Follow these steps:

1. Download and run the binary file.
   The CA Release Automation Repository wizard opens.
1. Follow the instructions in the wizard.
1. To specify the ports that the repository uses, select Custom Installation.
   The wizard installs the repository.

### Install the Repository through CLI
On non-GUI platforms, install the repository through the CLI.

Follow these steps:

1. Transfer the installation binary to the target server.
1. Grant "a+x" permission to the installation file:

   ```
   chmod a+x nolio_repository_<OS>_<version>_<build>.sh
   ```

1. Execute the installation file:

   ```
   ./nolio_repository_<OS>_<version>_<build>.sh -c
   ```

1. Follow the instructions on the screen.

   The repository is installed.

## Configure the Repository to Restart
Valid on Linux

To use the repository on a Linux server, set the server to start automatically.

Follow these steps:

1. Open nolio_server.sh.
1. Find the #RUN_AS_USER=root entry.
1. Uncomment the line and add the name of the user who owns the CA Release Automation Repository installation.
1. Save and close the file.
1. Connect as the ROOT user, and run the following script from the CA Release Automation Repository root folder:

   ```
   ./nolio_repo.sh install
   ```

   Whenever the server reboots, the CA Release Automation Repository service starts with the specified user.

   > Note: You do not need to restart the server.

## Configure CA Release Automation to Work with a Standalone Repository
To enable communication with the standalone repository, configure the Management Server. For high availability deployments, configure the repository for both Management Servers.

Follow these steps:

1. If the Management Server is running, execute the following command on the server:

   ```
   ./nolio_server.sh stop
   ```

   The CA Release Automation Center Management Server service stops.

1. (Optional) Back up the nolio-repo.properties file on the Center server under RA_Home/conf folder to a location outside the CA Release Automation installation.

   > Note: If you configure the repository as part of the installation, the backup is not required.

1. Open the nolio-repo.properties file on the CA Release Automation Center server under RA_Home/conf folder.
1. Update the hostname and port.

   For example:
   ```
   hostname=<HOSTNAME>
   port=<_PORT>
   ```

   * HOSTNAME

     Specifies the host where the repository is installed.

   * PORT

     Specifies the default or configured port.

1. Execute the following command:

   ```
   ./nolio_server.sh start
   ```

   The Management Server service starts. Communication with the repository is enabled.

## Validate the Connection to the Repository
To verify the connection with the repository, perform a repository connectivity test.

Follow these steps:

1. In Release Operations Center, create a local artifact that references a local file on the retrieval Agent of the artifact.

   > Note: To save an artifact to the repository, specify an artifact version. For more information about creating artifacts, see Manage Artifacts and Artifact Packages in Deployment Automation.

1. Select Store artifact in local repository.
1. Click Save.
1. Reopen the artifact.
1. Verify that the artifact was saved to the repository.

   If the artifact saved to the repository, the following text appears:

   This artifact is stored and used from the repository.