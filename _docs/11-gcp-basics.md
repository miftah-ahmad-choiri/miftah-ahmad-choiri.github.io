---
title: | 
        **The Basics of Google Cloude Compute** <br>
        NGINX
        Linux-ubuntu
        GCP

permalink: /docs/gcp-basics/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-02-23T21:36:18-04:00
toc: true
---

## **Create a Virtual Machine**
### Overview
Compute Engine allows you to create virtual machines (VMs) that run different operating systems, including multiple flavors of Linux (Debian, Ubuntu, Suse, Red Hat, CoreOS) and Windows Server, on Google infrastructure. You can run thousands of virtual CPUs on a system that is designed to be fast and to offer strong consistency of performance.

In this hands-on lab, you create VM instances of various machine types using the Google Cloud console and the gcloud command line in Cloud Shell. You also learn how to connect an NGINX web server to your VM.

Although you can easily copy and paste commands from the lab to the appropriate place, it is recommended that you type the commands yourself to reinforce your understanding of the core concepts.

#### Objectives

In this lab, you learn how to perform the following tasks:
- Create a VM with the Cloud console.
- Create a VM with the gcloud command line.
- Deploy a web server and connect it to a VM.

#### Prerequisites

Familiarity with standard Linux text editors such as `vim`, `emacs`, or `nano`.

### Setup and Requirements

**Note**: Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.
{: .notice--danger}

**Note**: Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.
{: .notice--danger}


#### How to start your lab and sign in to the Google Cloud Console

1. Click the Start Lab button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
   - The Open Google Cloud console button
   - Time remaining
   - The temporary credentials that you must use for this lab
   - Other information, if needed, to step through this lab

2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    The lab spins up resources, and then opens another tab that shows the Sign in page.

    *__Tip__*: Arrange the tabs in separate windows, side-by-side.

    **Note:** If you see the Choose an account dialog, click Use Another Account.
    {:.notice--info}

3. If necessary, copy the Username below and paste it into the Sign in dialog.

    ```bash
    "Username"
    ```

    You can also find the Username in the Lab Details pane.

4. Click **Next**.

5. Copy the **Password** below and paste it into the **Welcome** dialog.
  
    ```bash
    "Password"
    ```
    You can also find the Password in the Lab Details pane.

6. Click **Next**.

    **Important**: You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    {:.notice--info}

    **Note**: Using your own Google Cloud account for this lab may incur extra charges.
    {:.notice--danger}

7. Click through the subsequent pages:

     - Accept the terms and conditions.
     - Do not add recovery options or two-factor authentication (because this is a temporary account).
     - Do not sign up for free trials.

    After a few moments, the Google Cloud console opens in this tab.

    **Note:** To access Google Cloud products and services, click the Navigation menu or type the service or product name in the Search field.
    ![info1](/assets/images/gcp/info1.png)
    {: .notice--info}


#### Active Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.

2. Click through the following windows:
   - Continue through the Cloud Shell information window.
   - Authorize Cloud Shell to use your credentials to make Google Cloud API calls.

    When you are connected, you are already authenticated, and the project is set to your **Project_ID**, `PROJECT_ID`. The output contains a line that declares the **Project_ID** for this session:

    ```txt
    Your Cloud Platform project in this session is set to "PROJECT_ID"
    ```
    {:.no-copy .terminal .notice--info}
  
    gcloud is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    ```bash
    gcloud auth list
    ```

4. Click Authorize.

    **Output:**
    ```txt
    ACTIVE: *
    ACCOUNT: "ACCOUNT"

    To set the active account, run:
      $ gcloud config set account `ACCOUNT`
    ```
    {:.no-copy .terminal .notice--info}


5. (Optional) You can list the project ID with this command:
  
    ```bash
    gcloud config list project
    ```

    **Output:**
    ```txt
    [core]
    project = "PROJECT_ID"
    ```
    {:.no-copy .terminal .notice--info}
  
    **Note:** For full documentation of gcloud, in Google Cloud, refer to the [gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).
    {:.notice--info}

#### Understanding Regions and Zones

Certain Compute Engine resources live in regions or zones. A region is a specific geographical location where you can run your resources. Each region has one or more zones. For example, the us-central1 region denotes a region in the Central United States that has zones `us-central1-a`, `us-central1-b`, `us-central1-`c, and `us-central1-f`.

| Regions        | Zones                                                 |
|---------------|------------------------------------------------------|
| Western US    | us-west1-a, us-west1-b                               |
| Central US    | us-central1-a, us-central1-b, us-central1-d, us-central1-f |
| Eastern US    | us-east1-b, us-east1-c, us-east1-d                   |
| Western Europe| europe-west1-b, europe-west1-c, europe-west1-d       |
| Eastern Asia  | asia-east1-a, asia-east1-b, asia-east1-c             |

Resources that live in a zone are referred to as zonal resources. Virtual machine Instances and persistent disks live in a zone. To attach a persistent disk to a virtual machine instance, both resources must be in the same zone. Similarly, if you want to assign a static IP address to an instance, the instance must be in the same region as the static IP.


#### Set the region and zone

1. Run the following command to set the project region for this lab:
  
    ```bash
    gcloud config set compute/region REGION
    ```

2. To create a variable for region, run the following command:

    ```bash
    export REGION=REGION
    ```

3. Run the following command to create a variable for the zone:
  
    ```bash
    export ZONE=Zone
    ```

Learn more from the Regions and zones documentation.

**Note**: When you run gcloud on your own machine, the config settings are persisted across sessions. But in Cloud Shell, you need to set this for every new session or reconnection.
{:.notice--info}

### Task1. Create a New Instance from the Cloud Console

In this section, you create new predefined machine types with Compute Engine from the Cloud console.

1. In the **Cloud console**, on the **Navigation menu** (☰), click **Compute Engine** > **VM Instances**.

    This may take a minute to initialize for the first time.

2. To create a new instance, click Create Instance.

3. In the Machine configuration:

    Enter the values for the following fields:

    | Field         | Value       | Additional Information |
    |--------------|------------|--------------------------|
    | Name         | gcelab     | Name for the VM instance |
    | Region       | <REGION>   | For more information about regions, see the Compute Engine guide, [Regions and Zones](https://cloud.google.com/compute/docs/regions-zones). |
    | Zone         | <ZONE>     | **Note:** Remember the zone that you selected to use later. For more information about zones, see the Compute Engine guide, [Regions and Zones](https://cloud.google.com/compute/docs/regions-zones). |
    | Series       | E2 |         |
    | Machine Type | e2-medium  | This is an e2-medium, 2-CPU, 4GB RAM instance. Several machine types are available, ranging from micro instance types to 32-core/208GB RAM instance types. For more information, see the Compute Engine guide, [About machine families](https://cloud.google.com/compute/docs/machine-types). |

    **Note:** A new project has a default resource quota , which may limit the number of CPU cores. You can request more when you work on projects outside this lab.
    {:.notice--info}

4. Click **OS and storage**.

    Click **Change** to begin configuring your boot disk and select the values for:
       - **Operating system**: Debian
       - **Version**: Debian GNU/Linux 11 (bullseye)
       - **Boot disk type**: Balanced persistent disk
       - **Size**: 10 GB
  
    Several images are available, including Debian, Ubuntu, CoreOS, and premium images such as Red Hat Enterprise Linux and Windows Server. For more information, see the [Operating System documentation.](https://cloud.google.com/compute/docs/images)

1. Click **Networking**.
    - **Firewall**: Allow HTTP traffic

    Select this option in order to access a web server that you install later.

    **Note**: This automatically creates a firewall rule to allow HTTP traffic on port 80.
    {:.notice--info}

6. Once all sections are configured, scroll down and click Create to launch your new virtual machine instance.

    It should take about a minute for the VM, `gcelab`, to be created. After `gcelab` is created, the **VM Instances** page lists it in the VM instances list.

7. To use SSH to connect to the VM, click **SSH** to the right of the instance name, `gcelab`.

    This launches an SSH client directly from your browser.

    **Note**: Learn more about how to use SSH to connect to an instance from the Compute Engine guide, [Connect to Linux VMs using Google tools](https://cloud.google.com/compute/docs/instances/connecting-to-instance).
    {:.notice--info}

### Task2. Install an NGINX Web Server

Now you install an NGINX web server, one of the most popular web servers in the world, to connect your VM to something.

1. Run the following command to update the OS:

    ```bash
    sudo apt-get update
    ```

    **Expected output**:
    ```txt
    Get:1 file:/etc/apt/mirrors/debian.list Mirrorlist [30 B]
    Get:5 file:/etc/apt/mirrors/debian-security.list Mirrorlist [39 B]
    Get:7 https://packages.cloud.google.com/apt google-compute-engine-bookworm-stable InRelease [1321 B]
    Get:2 https://deb.debian.org/debian bookworm InRelease [151 kB]                         
    Get:3 https://deb.debian.org/debian bookworm-updates InRelease [55.4 kB]
    Get:4 https://deb.debian.org/debian bookworm-backports InRelease [59.0 kB]
    Hit:8 https://packages.cloud.google.com/apt cloud-sdk-bookworm InRelease
    Hit:6 https://deb.debian.org/debian-security bookworm-security InRelease
    Fetched 267 kB in 1s (274 kB/s)
    Reading package lists... Done
    ```
    {:.no-copy .terminal .notice--info}

2. Run the following command to install NGINX:

    ```bash
    sudo apt-get install -y nginx
    ```
  
    **Expected output:**
    ```txt
    Reading package lists... Done
    Building dependency tree
    Reading state information... Done
    The following NEW packages will be installed:
    ...
    ```

3. Run the following command to confirm that NGINX is running:
  
    ```bash
    ps auwx | grep nginx
    ```

    **Expected output:**
    ```txt
    root      2330  0.0  0.0 159532  1628 ?        Ss   14:06   0:00 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
    www-data  2331  0.0  0.0 159864  3204 ?        S    14:06   0:00 nginx: worker process
    www-data  2332  0.0  0.0 159864  3204 ?        S    14:06   0:00 nginx: worker process
    root      2342  0.0  0.0  12780   988 pts/0    S+   14:07   0:00 grep nginx
    ```
    {:.no-copy .terminal .notice--info}

4. To see the web page, return to the Cloud console and click the **External IP** link in the row for your machine, or add the **External IP** value to [http://EXTERNAL_IP/](http://EXTERNAL_IP/) in a new browser window or tab.

    A default web page should open that says: **Welcome to nginx!**


### Task3. Create a new instance with gcloud

Instead of using the Cloud console to create a VM instance, use the command line tool gcloud, which is pre-installed in [Google Cloud Shell](https://cloud.google.com/developer-shell/#how_do_i_get_started). Cloud Shell is an interactive shell environment for Google Cloud loaded with all the development tools you need (gcloud, git, and others) and offers a persistent 5-GB home directory.

**Note:** If you want to try this on your own machine, read the [gcloud command line tool guide](https://cloud.google.com/sdk/gcloud/).
{:.notice--info}

1. In Cloud Shell, run the following gcloud command to create a new VM instance from the command line:
  
    ```bash
    gcloud compute instances create gcelab2 --machine-type e2-medium --zone=$ZONE
    ```

    **Expected output:**
    ```txt
        Created [...gcelab2].
        NAME: gcelab2
        ZONE: Zone
        MACHINE_TYPE: e2-medium
        PREEMPTIBLE:
        INTERNAL_IP: 10.128.0.3
        EXTERNAL_IP: 34.136.51.150
        STATUS: RUNNING
    ```
    {:.no-copy .terminal .notice--info}

    The new instance has these default values:
       - The [Debian 11 (bullseye)](https://cloud.google.com/compute/docs/images#debian) image.
       - The e2-medium [machine type](https://cloud.google.com/compute/docs/machine-types).
       - A root persistent disk with the same name as the instance; the disk is automatically attached to the instance.

    When working in your own project, you can specify a custom machine type.

1. To see all the defaults, run the following command:

    ```bash
    gcloud compute instances create --help
    ```

    **Note:** You can set the default region and zones that gcloud uses if you are always working within one region/zone and you don't want to append the --zone flag every time.
    To do this, run these commands:
    {:notice--info}

    ```bash
    gcloud config set compute/zone ...

    gcloud config set compute/region ...
    ```

3. To exit help, press **CTRL+C**.

4. In the Cloud console, on the **Navigation menu**, click **Compute Engine** > **VM instances**. Or if you still had the VM instances page open, just click **Refresh**. Your two new instances should be listed.

5. You can also use SSH to connect to your instance via `gcloud`. Make sure to add your zone, or omit the `--zone` flag if you've set the option globally:
  
    ```bash
    gcloud compute ssh gcelab2 --zone=Zone
    ```

6. Enter **Y** to continue.

    ```txt
    Do you want to continue? (Y/n)
    ```
    {:no-copy .terminal}

7. Press **Enter** through the passphrase section to leave the passphrase empty.
  
    ```txt
    Generating public/private rsa key pair.
    Enter passphrase (empty for no passphrase)
    ```
    {:no-copy .terminal}

8. After connecting, disconnect from SSH by exiting from the remote shell with the command that follows:
  
    ```bash
    exit
    ```

### Task4. Test your knowledge

Test your knowledge about Google Cloud by taking the quiz. (Please select multiple correct options if necessary.)

Through which of the following ways can you create a VM instance in Compute Engine?
  - The gcloud command line tool
  - The Cloud console



### Congratulations!

Compute Engine is the foundation of Google Cloud's infrastructure as a service. You created a VM with Compute Engine and can now map your existing server infrastructure, load balancers, and network topology to Google Cloud.
{: .notice--success}

---

## **Creating a Presistent Disk**

### Overview

Compute Engine lets you create and run virtual machines on Google infrastructure. You can create virtual machines running different operating systems, including multiple flavors of Linux (Debian, Ubuntu, Suse, Red Hat, CoreOS) and Windows Server!

Compute Engine provides persistent disks for use as the primary storage for your virtual machine instances. Like physical hard drives, persistent disks exist independently of the rest of your machine – if a virtual machine instance is deleted, the attached persistent disk continues to retain its data and can be attached to another instance.

**Note:** There are 2 types of persistent disks: Standard persistent disk & SSD Persistent disk
{:.notice--info}

Learn more about the differences in [Storage Option](https://cloud.google.com/compute/docs/disks/#pdspecs). Each type of persistent disks will have different capacity limits. Read more in the [Persistent Disk documentation](https://cloud.google.com/compute/docs/disks/persistent-disks#pdlimits).
{:.notice--info}

In this hands-on lab, you'll learn how to create a persistent disk and attach it to a virtual machine.


#### Objectives

- Create a new VM instance and attach a persistent disk
- Format and mount a persistent disk

#### Prerequisites

- Familiarity with standard Linux text editors such as `vim`, `emacs` or `nano` will be helpful

### Setup and Requirements

**Note**: Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.
{: .notice--danger}

**Note**: Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.
{: .notice--danger}

#### How to start your lab and sign in to Google Cloud Console


1. Click the Start Lab button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
   - The Open Google Cloud console button
   - Time remaining
   - The temporary credentials that you must use for this lab
   - Other information, if needed, to step through this lab

2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).

    The lab spins up resources, and then opens another tab that shows the Sign in page.

    *__Tip__*: Arrange the tabs in separate windows, side-by-side.

    **Note:** If you see the Choose an account dialog, click Use Another Account.
    {:.notice--info}

3. If necessary, copy the Username below and paste it into the Sign in dialog.

    ```bash
    "Username"
    ```

    You can also find the Username in the Lab Details pane.

4. Click **Next**.

5. Copy the **Password** below and paste it into the **Welcome** dialog.
  
    ```bash
    "Password"
    ```
    You can also find the Password in the Lab Details pane.

6. Click **Next**.

    **Important**: You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    {:.notice--info}

    **Note**: Using your own Google Cloud account for this lab may incur extra charges.
    {:.notice--danger}

7. Click through the subsequent pages:

     - Accept the terms and conditions.
     - Do not add recovery options or two-factor authentication (because this is a temporary account).
     - Do not sign up for free trials.

    After a few moments, the Google Cloud console opens in this tab.

    **Note:** To access Google Cloud products and services, click the Navigation menu or type the service or product name in the Search field.
    ![info1](/assets/images/gcp/info1.png)
    {: .notice--info}

#### Active Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.

2. Click through the following windows:
   - Continue through the Cloud Shell information window.
   - Authorize Cloud Shell to use your credentials to make Google Cloud API calls.

    When you are connected, you are already authenticated, and the project is set to your **Project_ID**, `PROJECT_ID`. The output contains a line that declares the **Project_ID** for this session:

    ```txt
    Your Cloud Platform project in this session is set to "PROJECT_ID"
    ```
    {:.no-copy .terminal .notice--info}
  
    gcloud is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    ```bash
    gcloud auth list
    ```

4. Click Authorize.

    **Output:**
    ```txt
    ACTIVE: *
    ACCOUNT: "ACCOUNT"

    To set the active account, run:
      $ gcloud config set account `ACCOUNT`
    ```
    {:.no-copy .terminal .notice--info}


5. (Optional) You can list the project ID with this command:
  
    ```bash
    gcloud config list project
    ```

    **Output:**
    ```txt
    [core]
    project = "PROJECT_ID"
    ```
    {:.no-copy .terminal .notice--info}
  
    **Note:** For full documentation of gcloud, in Google Cloud, refer to the [gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).
    {:.notice--info}


#### Set the region and zone

1. Run the following command to set the project region for this lab:
  
    ```bash
    gcloud config set compute/region REGION
    ```

2. To create a variable for region, run the following command:

    ```bash
    export REGION=REGION
    ```

3. Run the following command to create a variable for the zone:
  
    ```bash
    export ZONE=Zone
    ```

Learn more from the Regions and zones documentation.

**Note**: When you run gcloud on your own machine, the config settings are persisted across sessions. But in Cloud Shell, you need to set this for every new session or reconnection.
{:.notice--info}


### Task1. Create new instance

First, create a Compute Engine virtual machine instance that has only a boot disk.

**Note:** You can learn more by creating a virtual machine instance in a different lab, or refer to the Compute Engine documentation.
{:.notice--info}

1. In Cloud Shell command line, use the gcloud command to create a new virtual machine instance named gcelab:

    ```bash
    gcloud compute instances create gcelab --zone $ZONE --machine-type e2-standard-2
    ```

    **Example Output:**
    ```txt
    Created [...].
    NAME       ZONE           MACHINE_TYPE  PREEMPTIBLE INTERNAL_IP EXTERNAL_IP    STATUS
    gcelab     Zone e2-standard-2             10.240.X.X  X.X.X.X        RUNNING
    ```
    {:.no-copy .terminal .notice--info}

    The newly created virtual machine instance will have a default 10 GB persistent disk as the boot disk.

### Task2. Create a new persistent disk

**Note:** Because you want to attach this disk to the virtual machine instance you created in the previous step, the zone must be the same.
{:.notice--info}

1. Still in the Cloud Shell command line, use the following command to create a new disk named mydisk:
  
    ```bash
    gcloud compute disks create mydisk --size=200GB \
    --zone $ZONE
    ```

    **Output:**
    ```txt
    NAME   ZONE          SIZE_GB TYPE        STATUS
    mydisk Zone 200      pd-standard READY
    ```
    {:.no-copy .terminal .notice--info}

### Task3. Attaching a disk

#### Attaching the persistent disk

You can attach a disk to a running virtual machine. Attach the new disk (`mydisk`) to the virtual machine instance you just created (`gcelab`).

1. Use the following command to attach the disk:
    ```bash
    gcloud compute instances attach-disk gcelab --disk mydisk --zone $ZONE
    ```

    **Output:**
  
    ```txt
    Updated [https://www.googleapis.com/compute/v1/projects/qwiklabs-gcp-d12e3215bb368ac5/zones/Zone/instances/gcelab].
    ```
    {:.no-copy .terminal .notice--info}
    That's it!

#### Finding the presistent disk in virtual machine

The persistent disk is now available as a block device in the virtual machine instance. Let's take a look.

1. SSH into the virtual machine:

    ```bash
    gcloud compute ssh gcelab --zone $ZONE
    ```

    **Output:**
  
    ```txt
    WARNING: The public SSH key file for gcloud does not exist.
    WARNING: The private SSH key file for gcloud does not exist.
    WARNING: You do not have an SSH key for gcloud.
    WARNING: SSH keygen will be executed to generate a key.
    This tool needs to create the directory
    [/home/gcpstaging8246_student/.ssh] before being able to generate SSH keys.
    Do you want to continue (Y/n)?  y
    ```
    {: .no-copy .terminal}
  
2. At the prompt, enter Y to continue.

3. When prompted for an RSA key pair passphrase, press ENTER for no passphrase, and then press ENTER again to confirm no passphrase.
  
    **Output:**
    ```txt
    Generating public/private rsa key pair.
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    Your identification has been saved in /home/gcpstaging8246_student/.ssh/google_compute_engine.
    Your public key has been saved in /home/gcpstaging8246_student/.ssh/google_compute_engine.pub.
    The key fingerprint is: 6c:04:bf:29:95:0d:93:bc:fe:00:2c:85:86:f8:7a:53 gcpstaging8246_student@cs-6000-devshell-vm-dbb9559d-4412-4801-ad8c-bdaf885541a9
    The key's randomart image is:
    +---[RSA 2048]----+
    | . . ...o.       |
    |. . o .oo=       |
    | . . o  =..      |
    |  . E o+.o       |
    | . . ..oS        |
    |. o    oo        |
    | . .     o       |
    |          .      |
    |                 |
    +-----------------+
    Updating project ssh metadata...\Updated [https://www.googleapis.com/compute/v1/projects/qwiklabs-gcp-d12e3215bb368ac5].
    Updating project ssh metadata...done.
    Waiting for SSH key to propagate.
    Warning: Permanently added 'compute.7714273689800906026' (ECDSA) to the list of known hosts.
    Linux gcelab 4.9.0-4-amd64 #1 SMP Debian 4.9.51-1 (2017-09-28) x86_64
    The programs included with the Debian GNU/Linux system are free software;
    the exact distribution terms for each program are described in the individual files in /usr/share/doc/*/copyright.
    Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent permitted by applicable law.
    ```
    {:.no-copy .terminal}

4. Now find the disk device by listing the disk devices in `/dev/disk/by-id/.`:

    ```bash
    ls -l /dev/disk/by-id/
    ```
  
    **Output:**
    ```txt
    lrwxrwxrwx 1 root root  9 Feb 27 02:24 google-persistent-disk-0 -> ../../sda
    lrwxrwxrwx 1 root root 10 Feb 27 02:24 google-persistent-disk-0-part1 -> ../../sda1
    lrwxrwxrwx 1 root root  9 Feb 27 02:25 google-persistent-disk-1 -> ../../sdb
    lrwxrwxrwx 1 root root  9 Feb 27 02:24 scsi-0Google_PersistentDisk_persistent-disk-0 -> ../../sda
    lrwxrwxrwx 1 root root 10 Feb 27 02:24 scsi-0Google_PersistentDisk_persistent-disk-0-part1 -> ../../sda1
    lrwxrwxrwx 1 root root  9 Feb 27 02:25 scsi-0Google_PersistentDisk_persistent-disk-1 -> ../../sdb
    ```

    You found the file, the default name is:

    ```bash
    scsi-0Google_PersistentDisk_persistent-disk-1.
    ```
    {:.no-copy}

    **Note:** If you want a different device name, when you attach the disk, you would specify the device-name parameter. For example, to specify a device name, when you attach the disk you would use the command:
    `gcloud compute instances attach-disk gcelab --disk mydisk --device-name <YOUR_DEVICE_NAME> --zone $ZONE`
    {:.notice--info}

#### Formatting and mounting the presistent disk

Once you find the block device, you can partition the disk, format it, and then mount it using the following Linux utilities:
  - `mkfs`: creates a filesystem
  - `mount`: attaches to a filesystem

1. Make a mount point:

    ```bash
    sudo mkdir /mnt/mydisk
    ```

2. Next, format the disk with a single ext4 filesystem using the [`mkfs`](http://manpages.ubuntu.com/manpages/xenial/man8/mkfs.8.html) tool. This command deletes all data from the specified disk:
    ```bash
    sudo mkfs.ext4 -F -E lazy_itable_init=0,lazy_journal_init=0,discard /dev/disk/by-id/scsi-0Google_PersistentDisk_persistent-disk-1
    ```

    **Last lines of the output:**
  
    ```txt
    Allocating group tables: done
    Writing inode tables: done
    Creating journal (262144 blocks): done
    Writing superblocks and filesystem accounting information: done
    ```

3. Now use the [`mount`](http://manpages.ubuntu.com/manpages/xenial/man8/mount.8.html) tool to mount the disk to the instance with the `discard` option enabled:
  
    ```bash
    sudo mount -o discard,defaults /dev/disk/by-id/scsi-0Google_PersistentDisk_persistent-disk-1 /mnt/mydisk
    ```
    That's it!


#### Automatically mount the disk on restart

By default the disk will not be remounted if your virtual machine restarts. To make sure the disk is remounted on restart, you need to add an entry into /etc/fstab.

1. Open `/etc/fstab` in nano to edit:

    ```bash
    sudo nano /etc/fstab
    ```

    Add the following below the line that starts with "`UUID=...`":
  
    ```bash
    /dev/disk/by-id/scsi-0Google_PersistentDisk_persistent-disk-1 /mnt/mydisk ext4 defaults 1 1
    ```

    `/etc/fstab` content should look like this:

    ```bash
    # /etc/fstab: static file system information
    UUID=12adc097-f36f-46f9-b377-b2a30cdf422f / ext4 rw,discard,errors=remount-ro,x-systemd.growfs 0 1
    UUID=3A31-89F9 /boot/efi vfat defaults 0 0
    /dev/disk/by-id/scsi-0Google_PersistentDisk_persistent-disk-1 /mnt/mydisk ext4 defaults 1 1
    ```

3. Save and exit nano by pressing **CTRL+O**, **ENTER**, **CTRL+X**, in that order.

### Task4. Test your knowledge

Test your knowledge about Google cloud Platform by taking this quiz.

Can you prevent the destruction of an attached persistent disk when the instance is deleted?
- Yes, use the **`–keep-disks`** option with the **`gcloud compute instances delete`** command
- No, attached persistent disks are always associated with the lifetime of the instance
- Yes, deselect the option **`Delete boot disk when instance is deleted`** when creating an instance

For migrating data from a persistent disk to another region, reorder the following steps in which they should be performed:
1. Attach disk
2. Create disk
3. Create snapshot
4. Create instance
5. Unmount file system(s)

Choose the correct order
- (2, 3, 1, 4, 5)
- (4, 1, 2, 3, 5)
- (5, 3, 2, 4, 1)
- (1, 3, 2, 4, 5)

### Task5. Local SSDs

Compute Engine can also attach local SSDs. Local SSDs are physically attached to the server hosting the virtual machine instance to which they are mounted. This tight coupling offers superior performance, with very high input/output operations per second (IOPS) and very low latency compared to persistent disks.

Local SSD performance offers:
- Less than 1 ms of latency
- Up to 680,000 read IOPs and 360,000 write IOPs

These performance gains require certain trade-offs in availability, durability, and flexibility. Because of these trade-offs, local SSD storage is not automatically replicated and all data can be lost in the event of a host error or a user configuration error that makes the disk unreachable. Users must take extra precautions to backup their data.

This lab does not cover local SSDs.
- To maximize the local SSD performance, you'll need to use a special Linux image that supports NVMe. You can learn more about local SSDs in the [Local SSD documentation](https://cloud.google.com/compute/docs/disks/local-ssd#create_a_local_ssd).

### Congratulations!

You've learned how to create, find, and attach persistent disks to a virtual machine instance and the key difference between persistent disks and local SSDs. You can use persistent disks to setup and configure your database servers.
{:.notice--success}

----

## **Hosting a Web App on Google Cloud using Compute Engine**

### Overview

There are many ways to deploy web sites within Google Cloud. Each solution offers different features, capabilities, and levels of control. Compute Engine offers a deep level of control over the infrastructure used to run a web site, but also requires a little more operational management compared to solutions like Google Kubernetes Engines (GKE), App Engine, or others. With Compute Engine, you have fine-grained control of aspects of the infrastructure, including the virtual machines, load balancers, and more.

In this lab you will deploy a sample application, the "Fancy Store" ecommerce website, to show how a website can be deployed and scaled easily with Compute Engine.

#### Objectives

In this lab you learn how to:
- Create [Compute Engine instances](https://cloud.google.com/compute/docs/instances/)
- Create [instance templates](https://cloud.google.com/compute/docs/instance-templates/) from source instances
- Create [managed instance groups](https://cloud.google.com/compute/docs/instance-groups/)
- Create and test [managed instance group health checks](https://cloud.google.com/compute/docs/instance-groups/autohealing-instances-in-migs)
- Create HTTP(S) [Load Balancers](https://cloud.google.com/load-balancing/)
- Create [load balancer health checks](https://cloud.google.com/load-balancing/docs/health-checks)
- Use a [Content Delivery Network (CDN)](https://cloud.google.com/cdn/) for Caching

At the end of the lab, you will have instances inside managed instance groups to provide autohealing, load balancing, autoscaling, and rolling updates for your website.

### Setup and Requirements

**Note**: Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.
{: .notice--danger}

**Note**: Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.
{: .notice--danger}

#### How to start your lab and sign in to Google Cloud Console

1. Click the Start Lab button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
   - The Open Google Cloud console button
   - Time remaining
   - The temporary credentials that you must use for this lab
   - Other information, if needed, to step through this lab

2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).

    The lab spins up resources, and then opens another tab that shows the Sign in page.

    *__Tip__*: Arrange the tabs in separate windows, side-by-side.

    **Note:** If you see the Choose an account dialog, click Use Another Account.
    {:.notice--info}

3. If necessary, copy the Username below and paste it into the Sign in dialog.

    ```bash
    "Username"
    ```

    You can also find the Username in the Lab Details pane.

4. Click **Next**.

5. Copy the **Password** below and paste it into the **Welcome** dialog.
  
    ```bash
    "Password"
    ```
    You can also find the Password in the Lab Details pane.

6. Click **Next**.

    **Important**: You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    {:.notice--info}

    **Note**: Using your own Google Cloud account for this lab may incur extra charges.
    {:.notice--danger}

7. Click through the subsequent pages:

     - Accept the terms and conditions.
     - Do not add recovery options or two-factor authentication (because this is a temporary account).
     - Do not sign up for free trials.

    After a few moments, the Google Cloud console opens in this tab.

    **Note:** To access Google Cloud products and services, click the Navigation menu or type the service or product name in the Search field.
    ![info1](/assets/images/gcp/info1.png)
    {: .notice--info}

#### Active Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.

2. Click through the following windows:
   - Continue through the Cloud Shell information window.
   - Authorize Cloud Shell to use your credentials to make Google Cloud API calls.

    When you are connected, you are already authenticated, and the project is set to your **Project_ID**, `PROJECT_ID`. The output contains a line that declares the **Project_ID** for this session:

    ```txt
    Your Cloud Platform project in this session is set to "PROJECT_ID"
    ```
    {:.no-copy .terminal .notice--info}
  
    gcloud is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    ```bash
    gcloud auth list
    ```

4. Click Authorize.

    **Output:**
    ```txt
    ACTIVE: *
    ACCOUNT: "ACCOUNT"

    To set the active account, run:
      $ gcloud config set account `ACCOUNT`
    ```
    {:.no-copy .terminal .notice--info}


5. (Optional) You can list the project ID with this command:
  
    ```bash
    gcloud config list project
    ```

    **Output:**
    ```txt
    [core]
    project = "PROJECT_ID"
    ```
    {:.no-copy .terminal .notice--info}
  
    **Note:** For full documentation of gcloud, in Google Cloud, refer to the [gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).
    {:.notice--info}


#### Set the region and zone

1. Run the following command to set the project region for this lab:
  
    ```bash
    gcloud config set compute/region REGION
    ```

2. To create a variable for region, run the following command:

    ```bash
    export REGION=REGION
    ```

3. Run the following command to create a variable for the zone:
  
    ```bash
    export ZONE=Zone
    ```

Learn more from the Regions and zones documentation.

**Note**: When you run gcloud on your own machine, the config settings are persisted across sessions. But in Cloud Shell, you need to set this for every new session or reconnection.
{:.notice--info}

### Task1. Enable Compute Engine API

- Enable the [Compute Engine API](https://console.cloud.google.com/flows/enableapi?apiid=compute) by executing the following:
  
    ```bash
    gcloud services enable compute.googleapis.com
    ```

### Task2. Create Cloud Storage Bucket

You will use a Cloud Storage bucket to house your built code as well as your startup scripts.
- From Cloud Shell, execute the following to create a new Cloud Storage bucket:
    ```bash
    gsutil mb gs://fancy-store-$DEVSHELL_PROJECT_ID
    ```

    **Note**: Use of the $DEVSHELL_PROJECT_ID environment variable within Cloud Shell is to help ensure the names of objects are unique. Since all Project IDs within Google Cloud must be unique, appending the Project ID should make other names unique as well.
    {:.notice--info}


### Task3. Clone Source repository
Use the existing Fancy Store ecommerce website based on the monolith-to-microservices repository as the basis for your website.

Clone the source code so you can focus on the aspects of deploying to Compute Engine. Later on in this lab, you will perform a small update to the code to demonstrate the simplicity of updating on Compute Engine.

1. Clone the source code and then navigate to the `monolith-to-microservices` directory:

    ```bash
    git clone https://github.com/googlecodelabs/monolith-to-microservices.git
    ```
  
    ```bash
    cd ~/monolith-to-microservices
    ```

2. Run the initial build of the code to allow the application to run locally:

    ```bash
    ./setup.sh
    ```

    It will take a few minutes for this script to finish.

3. Once completed, ensure Cloud Shell is running a compatible nodeJS version with the following command:
  
    ```bash
    nvm install --lts
    ```

4. Next, run the following to test the application, switch to the `microservices` directory, and start the web server:
  
    ```bash
    cd microservices
    npm start
    ```

    You should see the following output:

    ```txt
    Products microservice listening on port 8082!
    Frontend microservice listening on port 8080!
    Orders microservice listening on port 8081!
    ```
    {:.notice--info}

5. Preview your application by clicking the **web preview icon** then selecting **Preview on port 8080**.
    ![img1](/assets/images/gcp/gsp662/1.png)

    This opens a new window where you can see the frontend of Fancy Store.

    **Note:** Within the Preview option, you should be able to see the Frontend; however, the Products and Orders functions will not work, as those services are not yet exposed.
    {:.notice--info}

6. Close this window after viewing the website and then press **CTRL+C** in the terminal window to stop the web server process.


### Task4. Create compute engine instances

Now it's time to start deploying some Compute Engine instances!

In the following steps you will:
1. Create a startup script to configure instances.
2. Clone source code and upload it to Cloud Storage.
3. Deploy a Compute Engine instance to host the backend microservices.
4. Reconfigure the frontend code to utilize the backend microservices instance.
5. Deploy a Compute Engine instance to host the frontend microservice.
6. Configure the network to allow communication.

#### Create the Startup Script

A startup script will be used to instruct the instance what to do each time it is started. This way, the instances are automatically configured.

1. In Cloud Shell, run the following command to create a file called `startup-script.sh`:
    ```bash
    touch ~/monolith-to-microservices/startup-script.sh
    ```
2. Click **Open Editor** in the Cloud Shell ribbon to open the Code Editor.
    ![img1](/assets/images/gcp/gsp662/2.png)

3. Navigate to the `monolith-to-microservices` folder.
4. Add the following code to the `startup-script.sh` file:

    ```bash
    #!/bin/bash
   
    # Install logging monitor
    curl -s "https://storage.googleapis.com/signals-agents/logging/google-fluentd-install.sh" | bash
    service google-fluentd restart &
   
    # Install dependencies
    apt-get update
    apt-get install -yq ca-certificates git build-essential supervisor psmisc
   
    # Install Node.js
    mkdir /opt/nodejs
    curl https://nodejs.org/dist/v16.14.0/node-v16.14.0-linux-x64.tar.gz | tar xvzf - -C /opt/nodejs --strip-components=1
    ln -s /opt/nodejs/bin/node /usr/bin/node
    ln -s /opt/nodejs/bin/npm /usr/bin/npm
   
    # Get the application source code from Cloud Storage
    mkdir /fancy-store
    gsutil -m cp -r gs://fancy-store-[DEVSHELL_PROJECT_ID]/monolith-to-microservices/microservices/* /fancy-store/
   
    # Install app dependencies
    cd /fancy-store/
    npm install
   
    # Create a nodeapp user
    useradd -m -d /home/nodeapp nodeapp
    chown -R nodeapp:nodeapp /opt/app
   
    # Configure Supervisor to run the app
    cat >/etc/supervisor/conf.d/node-app.conf << EOF
    [program:nodeapp]
    directory=/fancy-store
    command=npm start
    autostart=true
    autorestart=true
    user=nodeapp
    environment=HOME="/home/nodeapp",USER="nodeapp",NODE_ENV="production"
    stdout_logfile=syslog
    stderr_logfile=syslog
    EOF
   
    supervisorctl reread
    supervisorctl update
    ```

5. Find the text `[DEVSHELL_PROJECT_ID]` in the file and replace it with your Project ID: `Project ID`
    The line of code within `startup-script.sh` should now resemble:
  
    ```bash
    gs://fancy-store-Project ID/monolith-to-microservices/microservices/* /fancy-store/
    ```

6. **Save** the `startup-script.sh` file, but do not close it yet.
7. Look at the bottom right of Cloud Shell Code Editor, and ensure "`End of Line Sequence`" is set to "`LF`" and not "`CRLF`".
    ![img1](/assets/images/gcp/gsp662/3.png)

      - If this is set to **CRLF**, click **CRLF** and then select **LF** in the drop down.
      - If this is already set to **LF**, then leave as is.

8. Close the startup-script.sh file.

9. Return to Cloud Shell Terminal and run the following to copy the startup-script.sh file into your bucket:
  
    ```bash
    gsutil cp ~/monolith-to-microservices/startup-script.sh gs://fancy-store-$DEVSHELL_PROJECT_ID
    ```

    It will now be accessible at: [https://storage.googleapis.com/[BUCKET_NAME]/startup-script.sh](https://storage.googleapis.com/[BUCKET_NAME]/startup-script.sh).

    [BUCKET_NAME] represents the name of the Cloud Storage bucket. This will only be viewable by authorized users and service accounts by default, therefor inaccessible through a web browser. Compute Engine instances will automatically be able to access this through their service account.

    The startup script performs the following tasks:
      - Installs the Logging agent. The agent automatically collects logs from syslog.
      - Installs Node.js and Supervisor. Supervisor runs the app as a daemon.
      - Clones the app's source code from Cloud Storage Bucket and installs dependencies.
      - Configures Supervisor to run the app. Supervisor makes sure the app is restarted if it exits unexpectedly or is stopped by an admin or process. It also sends the app's stdout and stderr to syslog for the Logging agent to collect.

#### Copy Code into Cloud Storage Bucket

When instances launch, they pull code from the Cloud Storage bucket, so you can store some configuration variables within the .env file of the code.

**Note:** You could also code this to pull environment variables from elsewhere, but for demonstration purposes, this is a simple method to handle configuration. In production, environment variables would likely be stored outside of the code.
{:notice--info}

1. Copy the cloned code into your bucket:

    ```sh
    cd ~
    rm -rf monolith-to-microservices/*/node_modules
    gsutil -m cp -r monolith-to-microservices gs://fancy-store-$DEVSHELL_PROJECT_ID/
    ```

    **Note:** The node_modules dependencies directories are deleted to ensure the copy is as fast and efficient as possible. These are recreated on the instances when they start up.
  {:.notice--info}


#### Deploy the Backend Instance

The first instance to be deployed will be the backend instance which will house the Orders and Products microservices.

**Note:** In a production environment, you may want to separate each microservice into their own instance and instance group to allow them to scale independently. For demonstration purposes, both backend microservices (Orders & Products) will reside on the same instance and instance group.
{:.notice--info}

   - Execute the following command to create an `e2-standard-2` instance that is configured to use the startup script. It is tagged as a backend instance so you can apply specific firewall rules to it later:

  ```sh
  gcloud compute instances create backend \
      --zone=$ZONE \
      --machine-type=e2-standard-2 \
      --tags=backend \
      --metadata=startup-script-url=https://storage.googleapis.com/fancy-store-$DEVSHELL_PROJECT_ID/startup-script.sh
  ```


#### Configure Connection to Backend

Before you deploy the frontend of the application, you need to update the configuration to point to the backend you just deployed.

1. Retrieve the external IP address of the backend with the following command, look under the `EXTERNAL_IP` tab for the backend instance:
  
    ```bash
    gcloud compute instances list
    ```

    Example output:

    ```txt
    NAME: backend
    ZONE: zone
    MACHINE_TYPE: e2-standard-2
    PREEMPTIBLE: 
    INTERNAL_IP: 10.142.0.2
    EXTERNAL_IP: 35.237.245.193
    STATUS: RUNNING
    ```
    {:.notice--info}

2. **Copy the External IP** for the backend.

3. In the Cloud Shell Explorer, navigate to `monolith-to-microservices` > `react-app`.

4. In the Code Editor, select **View** > **Toggle Hidden Files** in order to see the `.env` file.

    In the next step, you edit the `.env` file to point to the External IP of the backend. **[BACKEND_ADDRESS]** represents the External IP address of the backend instance determined from the above `gcloud` command.

5. In the `.env` file, replace localhost with your **[BACKEND_ADDRESS]**:
  
    ```bash
    REACT_APP_ORDERS_URL=http://[BACKEND_ADDRESS]:8081/api/orders
    REACT_APP_PRODUCTS_URL=http://[BACKEND_ADDRESS]:8082/api/products
    ```

6. **Save** the file.

7. In Cloud Shell, run the following to rebuild `react-app`, which will update the frontend code:
  
    ```bash
    cd ~/monolith-to-microservices/react-app
    npm install && npm run-script build
    ```

8. Then copy the application code into the Cloud Storage bucket:

    ```bash
    cd ~
    rm -rf monolith-to-microservices/*/node_modules
    gsutil -m cp -r monolith-to-microservices gs://fancy-store-$DEVSHELL_PROJECT_ID/
    ```


#### Deploy the Frontend Instance

Now that the code is configured, deploy the frontend instance.

  - Execute the following to deploy the frontend instance with a similar command as before. This instance is tagged as frontend for firewall purposes:

    ```bash
    gcloud compute instances create frontend \
        --zone=$ZONE \
        --machine-type=e2-standard-2 \
        --tags=frontend \
        --metadata=startup-script-url=https://storage.googleapis.com/fancy-store-$DEVSHELL_PROJECT_ID/startup-script.sh
    ```

    **Note:** The deployment command and startup script is used with both the frontend and backend instances for simplicity, and because the code is configured to launch all microservices by default. As a result, all microservices run on both the frontend and backend in this sample. In a production environment you'd only run the microservices you need on each component.
    {:.notice--info}

#### Configure the Network

1. Create firewall rules to allow access to port 8080 for the frontend, and ports 8081-8082 for the backend. These firewall commands use the tags assigned during instance creation for application:
  
    ```bash
    gcloud compute firewall-rules create fw-fe \
        --allow tcp:8080 \
        --target-tags=frontend
    ```

    ```bash
    gcloud compute firewall-rules create fw-be \
        --allow tcp:8081-8082 \
        --target-tags=backend
    ```

    The website should now be fully functional.

2. In order to navigate to the external IP of the frontend, you need to know the address. Run the following and look for the EXTERNAL_IP of the frontend instance:
  
    ```bash
    gcloud compute instances list
    ```

    **Example output:**

    ```txt
    NAME: backend
    ZONE: us-central1-f
    MACHINE_TYPE: e2-standard-2
    PREEMPTIBLE:
    INTERNAL_IP: 10.128.0.2
    EXTERNAL_IP: 34.27.178.79
    STATUS: RUNNING

    NAME: frontend
    ZONE: us-central1-f
    MACHINE_TYPE: e2-standard-2
    PREEMPTIBLE:
    INTERNAL_IP: 10.128.0.3
    EXTERNAL_IP: 34.172.241.242
    STATUS: RUNNING
    ```
    {:.notice--info}
  
    It may take a couple minutes for the instance to start and be configured.

3. Wait 3 minutes and then open a new browser tab and browse to [http://[FRONTEND_ADDRESS]:8080](http://[FRONTEND_ADDRESS]:8080) to access the website, where **[FRONTEND_ADDRESS]** is the frontend EXTERNAL_IP determined above.

4. Try navigating to the **Products** and **Orders** pages; these should now work.

    ![img1](/assets/images/gcp/gsp662/4.png)




### Task5. Create managed instance groups

To allow the application to scale, managed instance groups will be created and will use the frontend and backend instances as Instance Templates.

A **managed instance group (MIG)** contains identical instances that you can manage as a single entity in a single zone. Managed instance groups maintain high availability of your apps by proactively keeping your instances available, that is, in the **RUNNING** state. You will be using managed instance groups for your frontend and backend instances to provide **autohealing, load balancing, autoscaling, and rolling updates**.

#### Create Instance Template from Source Instance

Before you can create a managed instance group, you have to first create an **instance template** that will be the foundation for the group. Instance templates allow you to define the machine type, boot disk image or container image, network, and other instance properties to use when creating new VM instances. You can use instance templates to create instances in a managed instance group or even to create individual instances.

To create the instance template, use the existing instances you created previously.

1. Stop Both Instances:
  
    ```bash
    gcloud compute instances stop frontend --zone=$ZONE
    ```
    ```bash
    gcloud compute instances stop backend --zone=$ZONE
    ```

2. Create the Instance Template from Each of the Source Instances:
  
    ```bash
    gcloud compute instance-templates create fancy-fe \
        --source-instance-zone=$ZONE \
        --source-instance=frontend

    gcloud compute instance-templates create fancy-be \
        --source-instance-zone=$ZONE \
        --source-instance=backend
    ```

3. Confirm the Instance Templates Were Created:
  
    ```bash
    gcloud compute instance-templates list
    ```

    Example Output:
  
    ```
    NAME: fancy-be
    MACHINE_TYPE: e2-standard-2
    PREEMPTIBLE: 
    CREATION_TIMESTAMP: 2023-07-25T14:52:21.933-07:00

    NAME: fancy-fe
    MACHINE_TYPE: e2-standard-2
    PREEMPTIBLE: 
    CREATION_TIMESTAMP: 2023-07-25T14:52:15.442-07:00
    ```

4. With the instance templates created, delete the backend VM to save resource space:
  
    ```bash
    gcloud compute instances delete backend --zone=$ZONE
    ```

5. Type `y` when prompted.

    Normally, you could delete the frontend VM as well, but you will use it to update the instance template later in the lab.

#### Create Managed Instance Group

1. Next, create two managed instance groups, one for the frontend and one for the backend:
  
    ```bash
    gcloud compute instance-groups managed create fancy-fe-mig \
        --zone=$ZONE \
        --base-instance-name fancy-fe \
        --size 2 \
        --template fancy-fe
    ```
    ```bash
    gcloud compute instance-groups managed create fancy-be-mig \
        --zone=$ZONE \
        --base-instance-name fancy-be \
        --size 2 \
        --template fancy-be
    ```

    These managed instance groups will use the instance templates and are configured for **two instances each** within each group to start. The instances are automatically named based on the **base-instance-name** specified with random characters appended.

2. For your application, the **frontend microservice** runs on port `8080`, and the **backend microservice** runs on port `8081` for orders and port `8082` for products:
    ```bash
    gcloud compute instance-groups set-named-ports fancy-fe-mig \
        --zone=$ZONE \
        --named-ports frontend:8080
    ```
    ```bash
    gcloud compute instance-groups set-named-ports fancy-be-mig \
        --zone=$ZONE \
        --named-ports orders:8081,products:8082
    ```

    Since these are **non-standard ports**, you specify **named ports** to identify these. Named ports are `key:value` pair metadata representing the service name and the port that it's running on. Named ports can be assigned to an instance group, which indicates that the service is available on all instances in the group. This information is used by the **HTTP Load Balancing** service that will be configured later.

#### Configure Autohealing

To improve the availability of the application itself and to verify it is responding, configure an **autohealing policy** for the managed instance groups.

An autohealing policy relies on an **application-based health check** to verify that an app is responding as expected. Checking that an app responds is more precise than simply verifying that an instance is in a **RUNNING** state, which is the default behavior.

**Note:** Separate health checks for load balancing and for autohealing will be used. **Health checks for load balancing** can and should be **more aggressive** because these health checks determine whether an instance receives user traffic. **Health checking for autohealing** should be **more conservative** than a load balancing health check, as it causes Compute Engine to proactively replace failing instances.
{:.notice--info}

1. Create a Health Check for Autohealing. Create a health check that repairs the instance if it returns **"unhealthy"** **3 consecutive times** for the frontend and backend:

    ```bash
    gcloud compute health-checks create http fancy-fe-hc \
        --port 8080 \
        --check-interval 30s \
        --healthy-threshold 1 \
        --timeout 10s \
        --unhealthy-threshold 3
    ```

    ```bash
    gcloud compute health-checks create http fancy-be-hc \
        --port 8081 \
        --request-path=/api/orders \
        --check-interval 30s \
        --healthy-threshold 1 \
        --timeout 10s \
        --unhealthy-threshold 3
    ```

2. Create a Firewall Rule to Allow Health Check Probes

    ```bash
    gcloud compute firewall-rules create allow-health-check \
        --allow tcp:8080-8081 \
        --source-ranges 130.211.0.0/22,35.191.0.0/16 \
        --network default
    ```

3. Apply the Health Checks to Their Respective Services

    ```bash
    gcloud compute instance-groups managed update fancy-fe-mig \
        --zone=$ZONE \
        --health-check fancy-fe-hc \
        --initial-delay 300
    ```
    ```bash
    gcloud compute instance-groups managed update fancy-be-mig \
        --zone=$ZONE \
        --health-check fancy-be-hc \
        --initial-delay 300
    ```

    **Note:** It can take **15 minutes** before autohealing begins monitoring instances in the group.
    {:.notice--info}  

4. Continue with the lab to allow some time for autohealing to monitor the instances in the group. You will simulate a failure to test the autohealing at the end of the lab.

### Task6. Create load balancers

To complement your managed instance groups, use HTTP(S) Load Balancers to serve traffic to the frontend and backend microservices, and use mappings to send traffic to the proper backend services based on pathing rules. This exposes a single load balanced IP for all services.

You can learn more about the Load Balancing options on Google Cloud: [Overview of Load Balancing](https://cloud.google.com/load-balancing/docs/load-balancing-overview).

#### Create HTTP(S) load balancer

Google Cloud offers many different types of load balancers. For this lab you use an HTTP(S) Load Balancer for your traffic. An HTTP load balancer is structured as follows:

1. A forwarding rule directs incoming requests to a target HTTP proxy.
2. The target HTTP proxy checks each request against a URL map to determine the appropriate backend service for the request.
3. The backend service directs each request to an appropriate backend based on serving capacity, zone, and instance health of its attached backends. The health of each backend instance is verified using an HTTP health check. If the backend service is configured to use an HTTPS or HTTP/2 health check, the request will be encrypted on its way to the backend instance.
4. Sessions between the load balancer and the instance can use the HTTP, HTTPS, or HTTP/2 protocol. If you use HTTPS or HTTP/2, each instance in the backend services must have an SSL certificate.

**Note:** For demonstration purposes in order to avoid SSL certificate complexity, use HTTP instead of HTTPS. For production, it is recommended to use HTTPS for encryption wherever possible.
{:notice--info}

1. Create health checks that will be used to determine which instances are capable of serving traffic for each service:

    ```bash
    gcloud compute http-health-checks create fancy-fe-frontend-hc \
      --request-path / \
      --port 8080
    ```
    ```bash
    gcloud compute http-health-checks create fancy-be-orders-hc \
      --request-path /api/orders \
      --port 8081
    ```
    ```bash
    gcloud compute http-health-checks create fancy-be-products-hc \
      --request-path /api/products \
      --port 8082
    ```

    **Note:** These health checks are for the load balancer, and only handle directing traffic from the load balancer; they do not cause the managed instance groups to recreate instances.
    {:.notice--info}

2. Create backend services that are the target for load-balanced traffic. The backend services will use the health checks and named ports you created:

    ```bash
    gcloud compute backend-services create fancy-fe-frontend \
      --http-health-checks fancy-fe-frontend-hc \
      --port-name frontend \
      --global
    ```
    ```bash
    gcloud compute backend-services create fancy-be-orders \
      --http-health-checks fancy-be-orders-hc \
      --port-name orders \
      --global
    ```
    ```bash
    gcloud compute backend-services create fancy-be-products \
      --http-health-checks fancy-be-products-hc \
      --port-name products \
      --global
    ```

3. Add the Load Balancer's [backend services](https://cloud.google.com/load-balancing/docs/backend-service):

    ```bash
    gcloud compute backend-services add-backend fancy-fe-frontend \
      --instance-group-zone=$ZONE \
      --instance-group fancy-fe-mig \
      --global
    ```
    ```bash
    gcloud compute backend-services add-backend fancy-be-orders \
      --instance-group-zone=$ZONE \
      --instance-group fancy-be-mig \
      --global
    ```
    ```bash
    gcloud compute backend-services add-backend fancy-be-products \
      --instance-group-zone=$ZONE \
      --instance-group fancy-be-mig \
      --global
    ```

4. Create a URL map. The URL map defines which URLs are directed to which backend services:

    ```bash
    gcloud compute url-maps create fancy-map \
      --default-service fancy-fe-frontend
    ```

5. Create a path matcher to allow the `/api/orders` and `/api/products` paths to route to their respective services:

    ```bash
    gcloud compute url-maps add-path-matcher fancy-map \
      --default-service fancy-fe-frontend \
      --path-matcher-name orders \
      --path-rules "/api/orders=fancy-be-orders,/api/products=fancy-be-products"
    ```

6. Create the proxy which ties to the URL map:

    ```bash
    gcloud compute target-http-proxies create fancy-proxy \
      --url-map fancy-map
    ```

7. Create a global forwarding rule that ties a public IP address and port to the proxy:

    ```sh
    gcloud compute forwarding-rules create fancy-http-rule \
      --global \
      --target-http-proxy fancy-proxy \
      --ports 80
    ```

#### Update the configuration

Now that you have a new static IP address, update the code on the frontend to point to this new address instead of the ephemeral address used earlier that pointed to the backend instance.

1. In Cloud Shell, change to the `react-app` folder which houses the `.env` file that holds the configuration:

    ```bash
    cd ~/monolith-to-microservices/react-app/
    ```

2. Find the IP address for the Load Balancer:

    ```bash
    gcloud compute forwarding-rules list --global
    ```

    **Example output:**

    ```
    NAME: fancy-http-rule
    REGION:
    IP_ADDRESS: 34.111.203.235
    IP_PROTOCOL: TCP
    TARGET: fancy-proxy
    ```

3. Return to the Cloud Shell Editor and edit the `.env` file again to point to the Public IP of Load Balancer. `[LB_IP]` represents the External IP address of the backend instance determined above.

    ```bash
    REACT_APP_ORDERS_URL=http://[LB_IP]/api/orders
    REACT_APP_PRODUCTS_URL=http://[LB_IP]/api/products
    ```

    **Note:** The ports are removed in the new address because the load balancer is configured to handle this forwarding for you.
    {:.notice--info}

4. **Save** the file.

5. Rebuild `react-app`, which will update the frontend code:

    ```bash
    cd ~/monolith-to-microservices/react-app
    npm install && npm run-script build
    ```

6. Copy the application code into your bucket:

    ```bash
    cd ~
    rm -rf monolith-to-microservices/*/node_modules
    gsutil -m cp -r monolith-to-microservices gs://fancy-store-$DEVSHELL_PROJECT_ID/
    ```

#### Update the Frontend Instances

Now that there is new code and configuration, you want the frontend instances within the managed instance group to pull the new code.

Since your instances pull the code at startup, you can issue a rolling restart command:

  ```bash
  gcloud compute instance-groups managed rolling-action replace fancy-fe-mig \
      --zone=$ZONE \
      --max-unavailable 100%
  ```

  **Note:** In this example of a rolling replace, you specifically state that all machines can be replaced immediately through the `--max-unavailable` parameter. Without this parameter, the command would keep an instance alive while restarting others to ensure availability. For testing purposes, you specify to replace all immediately for speed.
    {:.notice--info}

#### Test the website

1. Wait 3 minutes after issuing the rolling-action replace command in order to give the instances time to be processed, and then check the status of the managed instance group. Run the following to confirm the service is listed as **HEALTHY**:

    ```bash
    watch -n 2 gcloud compute backend-services get-health fancy-fe-frontend --global
    ```

2. Wait until the 2 services are listed as HEALTHY.

    **Example output:**

    ```txt
    backend: https://www.googleapis.com/compute/v1/projects/my-gce-codelab/zones/us-central1-a/instanceGroups/fancy-fe-mig
    status:
    healthStatus:

     - healthState: HEALTHY
      instance: https://www.googleapis.com/compute/v1/projects/my-gce-codelab/zones/us-central1-a/instances/fancy-fe-x151
      ipAddress: 10.128.0.7
      port: 8080
     - healthState: HEALTHY
      instance: https://www.googleapis.com/compute/v1/projects/my-gce-codelab/zones/us-central1-a/instances/fancy-fe-cgrt
      ipAddress: 10.128.0.11
      port: 8080
      kind: compute#backendServiceGroupHealth
    ```
    {:.notice--info}

    **Note:** If one instance encounters an issue and is `UNHEALTHY`, it should automatically be repaired. Wait for this to happen.
    {:.notice--info}

    If neither instance enters a `HEALTHY` state after waiting a little while, something is wrong with the setup of the frontend instances that accessing them on port `8080` doesn't work. Test this by browsing to the instances directly on port `8080`.
    {:.notice--info}

1. Once both items appear as `HEALTHY` on the list, exit the watch command by pressing `CTRL+C`.

    **Note:** The application will be accessible via `http://[LB_IP]` where `[LB_IP]` is the `IP_ADDRESS` specified for the Load Balancer, which can be found with the following command:
    {:.notice--info}

    ```bash
    gcloud compute forwarding-rules list --global
    ```
    You'll be checking the application later in the lab.



### Task7. Scaling Compute Engine

So far, you have created two managed instance groups with two instances each. This configuration is fully functional but remains static regardless of load. Next, you create an autoscaling policy based on utilization to automatically scale each managed instance group.

#### Automatically Resize by Utilization

- To create the autoscaling policy, execute the following:

    ```bash
    gcloud compute instance-groups managed set-autoscaling \
      fancy-fe-mig \
      --zone=$ZONE \
      --max-num-replicas 2 \
      --target-load-balancing-utilization 0.60
    ```

    ```sh
    gcloud compute instance-groups managed set-autoscaling \
      fancy-be-mig \
      --zone=$ZONE \
      --max-num-replicas 2 \
      --target-load-balancing-utilization 0.60
    ```

    These commands create an autoscaler on the managed instance groups that automatically adds instances when utilization is above 60% utilization and removes instances when the load balancer is below 60% utilization.

#### Enable Content Delivery Network

Another feature that can help with scaling is to enable a Content Delivery Network (CDN) service, which provides caching for the frontend.
- Execute the following command on the frontend service:

    ```bash
    gcloud compute backend-services update fancy-fe-frontend \
        --enable-cdn --global
    ```

    When a user requests content from the HTTP(S) load balancer, the request arrives at a Google Front End (GFE), which first looks in the Cloud CDN cache for a response to the user's request. If the GFE finds a cached response, the GFE sends the cached response to the user. This is called a **cache hit**.

    If the GFE can't find a cached response for the request, the GFE makes a request directly to the backend. If the response to this request is cacheable, the GFE stores the response in the Cloud CDN cache so that the cache can be used for subsequent requests.


### Task8. Update the Website

#### Updating instance template

Existing instance templates are not editable; however, since your instances are stateless and all configuration is done through the startup script, you only need to change the instance template if you want to change the template settings. Now you're going to make a simple change to use a larger machine type and push that out.

Complete the following steps to:
- Update the frontend instance, which acts as the basis for the instance template. During the update, put a file on the updated version of the instance template's image, then update the instance template, roll out the new template, and then confirm the file exists on the managed instance group instances.
- Modify the machine type of your instance template, by switching from the `e2-standard-2` machine type to `e2-small`.


Modify the machine type:

1. Run the following command to modify the machine type of the frontend instance:

    ```bash
    gcloud compute instances set-machine-type frontend \
      --zone=$ZONE \
      --machine-type e2-small
    ```

2. Create the new Instance Template
    ```bash
    gcloud compute instance-templates create fancy-fe-new \
        --region=$REGION \
        --source-instance=frontend \
        --source-instance-zone=$ZONE
    ```

3. Roll out the updated instance template to the Managed Instance Group
    ```bash
    gcloud compute instance-groups managed rolling-action start-update fancy-fe-mig \
      --zone=$ZONE \
      --version template=fancy-fe-new
    ```

4. Wait 3 minutes, and then run the following to monitor the status of the update:

    ```bash
    watch -n 2 gcloud compute instance-groups managed list-instances fancy-fe-mig \
    --zone=$ZONE
    ```

    This will take a few moments.

    Once you have at least 1 instance in the following condition:

      - **STATUS**: RUNNING
      - **ACTION** set to None
      - **INSTANCE_TEMPLATE**: the new template name (`fancy-fe-new`)

5. Copy the name of one of the machines listed for use in the next command.

6. Press `CTRL+C` to exit the watch process.

7. Run the following to see if the virtual machine is using the new machine type (`e2-small`), where `[VM_NAME]` is the newly created instance:

    ```bash
    gcloud compute instances describe [VM_NAME] --zone=$ZONE | grep machineType
    ```

    Expected example output:
  
    ```txt
    machineType: https://www.googleapis.com/compute/v1/projects/project-name/zones/us-central1-f/machineTypes/e2-small
    ```
    {:.notice--info}

#### Make changes to the website

**Scenario:** Your marketing team has asked you to change the homepage for your site. They think it should be more informative about who your company is and what you actually sell.

**Task:** Add some text to the homepage to make the marketing team happy! It looks like one of the developers has already created the changes with the file name `index.js.new`. You can just copy this file to `index.js` and the changes should be reflected.

1. Run the following commands to copy the updated file to the correct file name:
   
    ```bash
    cd ~/monolith-to-microservices/react-app/src/pages/Home
    mv index.js.new index.js
    ```

2. Print the file contents to verify the changes:

    ```bash
    cat ~/monolith-to-microservices/react-app/src/pages/Home/index.js
    ```

    The resulting code should look like this:
    ```javascript
    /*
    Copyright 2019 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    */
    import React from "react";
    import { Box, Paper, Typography } from "@mui/material";

    export default function Home() {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <Paper
            elevation={3}
            sx={{
              width: "800px",
              margin: "0 auto",
              padding: (theme) => theme.spacing(3, 2),
            }}
          >
            <Typography variant="h5">Welcome to the Fancy Store!</Typography>
            <br />
            <Typography variant="body1">
              Take a look at our wide variety of products.
            </Typography>
          </Paper>
        </Box>
      );
    }
    ```
    You updated the React components, but you need to build the React app to generate the static files.

3. Build the React app, Run the following command to build the React app and copy it into the monolith public directory:

    ```bash
    cd ~/monolith-to-microservices/react-app
    npm install && npm run-script build
    ```

4. Then re-push this code to the bucket:

    ```bash
    cd ~
    rm -rf monolith-to-microservices/*/node_modules
    gsutil -m cp -r monolith-to-microservices gs://fancy-store-$DEVSHELL_PROJECT_ID/
    ```

#### Push changes with rolling replacements

1. Now force all instances to be replaced to pull the update:

    ```bash
    gcloud compute instance-groups managed rolling-action replace fancy-fe-mig \
      --zone=$ZONE \
      --max-unavailable=100%
    ```

    **Note:** In this example of a rolling replace, you specifically state that all machines can be replaced immediately through the --max-unavailable parameter. Without this parameter, the command would keep an instance alive while replacing others. For testing purposes, you specify to replace all immediately for speed. In production, leaving a buffer would allow the website to continue serving the website while updating.
    {:.notice--info}

2. Update the website, Wait 3 minutes after issuing the `rolling-action replace` command to give the instances time to be processed, and then check the status of the managed instance group. Run the following to confirm the service is listed as **HEALTHY**:

    ```bash
    watch -n 2 gcloud compute backend-services get-health fancy-fe-frontend --global
    ```

    **Example output:**
    ```bash
    backend: https://www.googleapis.com/compute/v1/projects/my-gce-codelab/zones/us-central1-a/instanceGroups/fancy-fe-mig
    status:
    healthStatus:

     - healthState: HEALTHY
      instance: https://www.googleapis.com/compute/v1/projects/my-gce-codelab/zones/us-central1-a/instances/fancy-fe-x151
      ipAddress: 10.128.0.7
      port: 8080
     - healthState: HEALTHY
      instance: https://www.googleapis.com/compute/v1/projects/my-gce-codelab/zones/us-central1-a/instances/fancy-fe-cgrt
      ipAddress: 10.128.0.11
      port: 8080
      kind: compute#backendServiceGroupHealth
    ```

1. Once items appear in the list with **HEALTHY** status, exit the watch command by pressing `CTRL+C`.

2. Browse to the website via `http://[LB_IP]`, where `[LB_IP]` is the IP address specified for the Load Balancer, which can be found with the following command:

    ```bash
    gcloud compute forwarding-rules list --global
    ```

    The new website changes should now be visible.

#### Simulate failure
In order to confirm the health check works, log in to an instance and stop the services.

1. Find an instance name:
  
    ```bash
    gcloud compute instance-groups list-instances fancy-fe-mig --zone=$ZONE
    ```

2. Copy an instance name, then run the following to secure shell into the instance, where INSTANCE_NAME is one of the instances from the list:
  
    ```bash
    gcloud compute ssh [INSTANCE_NAME] --zone=$ZONE
    ```

3. Type in "y" to confirm, and press **Enter** twice to not use a password.

4. Within the instance, use `supervisorctl` to stop the application:
  
    ```bash
    sudo supervisorctl stop nodeapp; sudo killall node
    ```

    **Exit the instance:**
    ```bash
    exit
    ```

6. Monitor the repair operations:
  
    ```bash
    watch -n 2 gcloud compute operations list --filter='operationType~compute.instances.repair.*'
    ```

    This will take a few minutes to complete.

    Look for the following example output:

    ```
    NAME                                                  TYPE                                       TARGET                                 HTTP_STATUS  STATUS  TIMESTAMP
    repair-1568314034627-5925f90ee238d-fe645bf0-7becce15  compute.instances.repair.recreateInstance  us-central1-a/instances/fancy-fe-1vqq  200          DONE    2019-09-12T11:47:14.627-07:00
    ```

    The managed instance group recreated the instance to repair it.

7. You can also go to **Navigation menu** > **Compute Engine** > **VM instances** to monitor through the console.

### Congratulations!

You successfully deployed, scaled, and updated your website on Compute Engine. You are now experienced with Compute Engine, Managed Instance Groups, Load Balancers, and Health Checks!
{:.notice--success}

----

## **The Basics of Google Cloud Compute: Challenge Lab**

### Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!


### Setup

**Note**: Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.
{: .notice--danger}

**Note**: Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.
{: .notice--danger}

### Challenge Scenario

You recently started a new role as a Cloud Architect. One of your responsibilities is to build and operate web applications using Google Cloud.

#### Your challenge

Your manager asked you to build a website to provide products and orders information. You are not asked to write code or scripts as it is another team's responsibility. Your job is to build infrastructure for the web application using Google Cloud. Here are the requirements:

- Create a new Cloud Storage bucket to store files.
- Create and attach a persistent disk to a Compute Engine virtual machine (VM) instance.
- Use Compute Engine to host a web application using a NGINX web server.

Some standards you should follow:

- Create all resources in the Region region and Zone zone, unless otherwise directed.

Each task is described in detail below, good luck!

### Task1. Create a Cloud Storage Bucket

Your team has requested a new Cloud Storage bucket, so they can store their built code and startup scripts.

- Create a bucket named **`PROJECT_ID-bucket`** (US multi-region).

### Task2. Create and attach a persistent disk to a Compute Engine Instance

1. Create a Compute Engine Instance  

Create a new Compute Engine instance named **my-instance** with the following configuration:

| Property         | Value                                |
|-----------------|--------------------------------------|
| **Series**      | E2                                   |
| **Machine Type** | e2-medium                            |
| **Boot Disk Type** | New balanced persistent disk      |
| **Boot Disk Size** | 10 GB                             |
| **Boot Disk Image** | Debian GNU/Linux 11 (bullseye)  |
| **Firewall Rules** | Enable **Allow HTTP traffic**      |

2. Create a new persistent disk named **mydisk** with a size of **200GB**.

3. Attach the **mydisk** persistent disk to the **my-instance** Compute Engine instance.


### Task3. Install a NGINX web server

For this task, SSH into the Compute Engine instance, and install a NGINX web server. Here's a reminder of the general steps:

1. Update the OS.
2. Install NGINX.
3. Confirm that NGINX is running.

To test the web application, return to the Cloud Console, and click the External IP link in the row for your machine name. Or, add the External IP value to [http://EXTERNAL_IP/](http://EXTERNAL_IP/) in a new browser window or tab.

A default web page should open with the message "**Welcome to nginx!**".

### Congratulations!