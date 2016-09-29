---
layout: default
title:  Install for All-in-One Environment
---

As a system administrator, you are responsible for deployment of CA Release Automation to your environment. Perform an all-in-one installation to provide a proof of concept, a sandbox test environment, or a small production environment. An all-in-one installation also provides the flexibility to install an Execution Server on the same platform as a Management Server.

In most production environments, we recommend that you distribute the server components for maximum performance. Even in an all-in-one installation, we recommend that you install the database on a separate system.

> Important! For the initial login, the default superuser credentials are user name superuser with password suser. We recommend that you change this password immediately after installation.

## Verify the Prerequisites
To ensure a successful installation, verify that your system meets the prerequisites. For more information, see Installation Prerequisites.

> Note: For an all-in-one installation, Microsoft SQL Server is supported only if you install CA Release Automation on a Windows platform.

The following ports are open:

* 61616
* 61617

## Install CA Release Automation
To create a complete CA Release Automation environment on a single computer, perform an all-in-one installation.

Follow these steps:

1. Locate and run the installation file for your operating system:

   * Windows

     nolio_server_windows-x64_<version>_<build>.exe

   * Linux

     nolio_server_linux-x64_<version>_<build>.sh
1. Follow the Setup wizard through the installation. Select Complete Installation.

   The wizard installs all CA Release Automation components.

## Configure the Service to Restart
To enable the server services to restart automatically on Linux platforms when a root user did not install the server, update the host startup scripts. Configure each server component that a root user did not install.

> Note: Execute the scripts from the Release Automation root folder and by the user that owns the CA Release Automation system.

Follow these steps:

1. (Optional) To start Management Server service with a user other than root, locate nolio_server.sh in the CA Release Automation root folder:

   1. Open the shell file.
   1. Search for RUN_AS_USER=.
   1. Update to RUN_AS_USER=<MYUSER>.

   > Important! The user requires write, execute, and read permissions on the CA Release Automation root folder.

1. At the Command prompt, run the following command as a root user:

   ```
   ./nolio_server.sh install
   ```

The command enables the Management Server service to start automatically when the host reboots.