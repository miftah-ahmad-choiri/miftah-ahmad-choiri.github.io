---
title: | 
        Collecting PEDBG from the HMC IBM💡
permalink: /docs/hmc/collect-pedbg/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-02-08T21:36:18-04:00
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-05-21T21:36:18-04:00
toc: true
---

## COLLECT PEDBG ENHANCED UI

This document describes how to collect diagnostic data from the HMC for problem determination.

### Section 1. Preparing to Collect the Data

Take this steps if you planning to collect PEDBG **Remotely**

1. Enable Remote Command Execution & Firewall Settings
    - Configure the HMC firewall to allow remote ssh connections
      ```bash
      Login to HMC UI 
          > Navigation area 
          > HMC Management 
          > Network settings 
          > LAN adapters
          > Edit 
          > Allow Secure Shell and click on Save.
      ```
    - Enable remote command execution
      ```bash
      Users and Security
          > Systems and Console Security
          > scroll down until you see Remote Control
          > click Enable Remote Command Execution through ssh.
      ```

2. Ensure a userID of `hscpe` with a task role of `hmcpe` exists on the HMC.

    The hscpe ID is not a built-in ID like `hscroot`, it must be created. To administer HMC users, you must be logged in as `hscroot` or a `hmcsuperadmin` user.

    - **Locally** (at the HMC): 
        ```bash
        Select Console Management 
            > Open a Restricted Shell terminal
        ```

    - **Remotely**: Open an ssh session (PuTTY) to the HMC.
      Determining whether the hscpe user ID exists and what roles are assigned to it.
      ```bash
      lshmcusr --filter "names=hscpe"
      ```
      ```bash
      name=hscpe,taskrole=hmcpe,description=Service,pwage=99999,resourcerole=
      ```
      If the hscpe user ID **does not exist**, you should receive the message No results were found. Creating the `hscpe` user ID:
      ```bash
      mkhmcusr -u hscpe -a hmcpe -d IBM Service
      ```
      When this command is run, you are prompted to enter a new password for the new user. Resetting a lost password:
      ```bash
      chhmcusr -u hscpe -t passwd
      ```

### Section 2. Collecting Data using PEDBG

1. Login as `hscpe`
2. Re-create the problem.
3. Collect pedbg

    **Note:** For problems involving managed servers managed by two HMCs, collect pedbg files from both HMCs.
    {:.notice--info}
  
    **Run PEDBG command**
    - If the support representative **did not specify the options** (*or for issues that need more than a few hours of historic data*) type the following:
      ```bash
      pedbg -c -q 4
      ```

    - If the problem was **re-created immediately** **before pedbg collection**, the "`-q 3`" option can typically be used, which results in a much smaller file:
      ```bash
      pedbg -c -q 3
      ```
    - If the support representative **requested dumps** from the managed system(s) and HMC data type the following to collect all dumps + all historic data:
      ```bash
      pedbg -c -q d4
      ```

### Section 3. Downloading & Transmitting Data from HMC

There are many ways the data can be sent to IBM. The following is a list of preferred methods, starting with the quickest and easiest method. The method used varies depending on the type of network access available to the HMC and the availability of media:

  - Use **removable media (USB flash drive)** to move the `pedbg` to another workstation with Internet access.
    1. Insert the formatted USB flash drive. For USB, wait several seconds for the USB device to be detected.
    2. Run the command: 
        ```bash
        pedbg -c -q 9
        ```
    3. Reply yes to the prompt "`Would you like to move .zip file to a DVD or other device?`"
    4. Enter the device name from the list when prompted.
    5. The device name is the mount point for the target device. For example, for the first USB flash drive its typically "`/media/sdb1`".
   
  - Use **SCP** or **FTP** to copy the `pedbg` file to another workstation with **Internet access**.
    - Example of copying the file to a PC or Mac using **standard scp** at the command line:
        ```bash
        scp hscpe@myhmc:/dump/HMClogs.HMClogsxxxxxxxxx.zip .
        ```
    - Example of copying the file to a PC using PuTTY pscp:
        ```bash
        "C:\Program Files\PuTTY\pscp" -scp hscpe@myhmc:/dump/HMClogs.cs6hmcb0312H04.zip c:\temp\
        ```

#### Case1: Problem copying dumps from HMC to usb by using pedbg

This document describes a problem with copying dumps from HMC to usb by using the command `pedbg -s -q 9`.

The command `pedbg -s -q 9` copies the collected dumps in `.zip` format to USB drive but instead it tries to delete dumps, example:
```bash
[hscpe@HMC66 ~] $ pedbg -s -q 9
# Warning, this operation deletes all existing system dumps on this HMC

Please type yes to continue
No dumps removed.
No files found or collected
[hscpe@HMC66 ~] $
```
**Resolving the Problem**

When you hit this issue, you can use the "`cpdump`" command instead to copy dump files to the USB drive. Example:
Copy dump files to a USB flash drive:
```bash
lsmediadev #(to obtain mount points)
mount /media/sdb1
cpdump -r usb -f "HMCSysdump.HMC66012120211425.zip" -d /media/sdb1
```

"**HMCSysdump.HMC66012120211425.zip**" to be replaced with the actual name of the file!

Alternatively you can run the following command, which collects not only logs contained in `pedbg -c -q 4` but all dumps available too (*don't forget to initiate dumps before this command*):
```bash
pedbg -c -q d4
```

Use the `pedbg -c -q 9` after the file is generated to copy it to an USB (*if you're using the second workaround*).

#### Case2: Using USB Flash Drive to Collect HMC PEDBG Data Larger than 4GB

Collecting HMC pedbg support data on an HMC with version V9 or V10 might generate a .zip file larger than **4GB**. The ordinary USB flash drive with partition format FAT32 or exFAT does NOT support a file larger than **4GB**. On the other hand, HMC does NOT recognize USB flash drives with NTFS partition format. This document provides a workaround for field engineers to collect HMC PEDBG data larger than **4GB**.

IBM field engineer can retrieve the HMC pedbg file with a FAT32 USB flash drive by the workaround in this document. We use command split to slice the large PEDBG file into smaller ones, which can be directly copied to a FAT32 USB flash drive.

**WORKAROUND**

1. Collect HMC PEDBG data. 
    - Log in HMC command line with user ID `hscpe`, run the command:
      ```bash
      pedbg -c -q4
      ```
    - If the `hscpe` user ID does not exist, create it by the following command with user `hscroot`:
      ```bash
      mkhmcusr -u hscpe -a hmcpe -d "HMC PE User"
      ```
    - If the `hscpe` user ID exists, but the password is forgotten, set a new password by the following command with user `hscroot`:
      ```bash
      chhmcusr -u hscpe -t passwd
      ```
    - When PEDBG log is successfully collected, the file name and directory are displayed on the screen. In the following example, the PEDBG log file is `HMClogs.hmc1.05291621.zip`, which is saved in directory `/dump`.
      ```bash
      ...omitted...
      copying pedbglogs to pedbg folder
          File /dump/HMClogs.hmc1.05291621.zip was created.
          Done at Sun May 29 16:32:36 CST 2022
      ```
    - Check the file size by command:
      ```bash
      ls -l /dump | grep HMClogs
      ```

2. Apply HMC Dynamic pesh password from IBM Remote Support 
    ```bash
    lshmc -v
    # Obtain 7-digit_HMC_SN

    pesh <7-digit_HMC_SN>
    # It is case-sensitive, use uppercase letters.
    # Input the pesh password provided by IBM Remote Support.

    su -
    # Run command 'su -' to get HMC’s root authority.
    ```
    - The default password of HMC user `root` is `passw0rd`.  If password is forgotten, reset it with user `hscroot` by the following command:
      ```bash
      chhmcusr -u root -t passwd
      ```

3. Run Command split to slice the PEDBG file into several small ones
    - In this example, the command is:
      ```bash
      split -b 2G /dump/HMClogs.hmc1.05291621.zip /dump/split_file
      ```
    - The above command splits the PEDBG file ‘`HMClogs.hmc1.05291621.zip`’ into several **2GB files**. The new files are named `split_fileaa`, `split_fileab`, `split_fileac`, and so on.
  
4. Plug USB flash drive into HMC's USB3.0 ports, and run command `lsmediadev` to verify the device name. In this example, the USB flash drive is recognized as `/dev/sdb1`, associated with mount point `/media/sdb1`.
        
    ```bash
    lsmediadev
    mount /dev/sdb1
    cp /dump/split_file* /media/sdb1/
    umount /dev/sdb1
    ```

5. Plug the USB flash drive into any laptop or workstation that has an internet connection. Upload all the files to IBM ECuRep Data Repository under your case number: [Link Upload Ecurep](https://www.secure.ecurep.ibm.com/app/upload_sf)

## REFERENCES

1. [HMC Enhanced View: Collecting PEDBG from the HMC](https://www.ibm.com/support/pages/hmc-enhanced-view-collecting-pedbg-hmc)
2. [Using USB Flash Drive to Collect HMC PEDBG Data Larger than 4GB](https://supportcontent.ibm.com/support/pages/using-usb-flash-drive-collect-hmc-pedbg-data-larger-4gb?check_logged_in=1)
3. [Problem copying dumps from HMC to usb by using pedbg](https://www.ibm.com/support/pages/problem-copying-dumps-hmc-usb-using-pedbg)















<!-- Scroll to Top Button -->
<script src="https://miftah-ahmad-choiri.github.io/assets/js/scroll-top.js" defer></script>
<link rel="stylesheet" href="{{ https://miftah-ahmad-choiri.github.io/assets/js/scroll-top.js' | relative_url }}">