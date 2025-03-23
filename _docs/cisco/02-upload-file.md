---
title: | 
        How to use Filezilla Server to Copy file <br>
        ![IELTS](https://img.shields.io/badge/IELTS-language-red) ![Grammar](https://img.shields.io/badge/Grammar-checking-blue) ![Advanced](https://img.shields.io/badge/Advanced-learning-purple)  

permalink: /docs/cisco/upload-file/
excerpt: "How to quickly install and setup Minimal Mistakes for use with GitHub Pages."
last_modified_at: 2025-03-23T21:36:18-04:00
redirect_from:
  - /theme-setup/
# toc: true
---

1. Open Filezilla Server > `Create Filezilla FTP Server`
   
   ```bash
   IP: 127.0.0.1
   Port: 14148
   Password: -
   ```

2. Create user on Filezilla Server
   - Server > Configure > Right Management > Users
   - Available Users > New : `miftah`
   - General > Credentials : `Do not require password to login` 
   - Mount Point
     - Virtual: `/`
     - Native: `C:\Users\ZZ00TH749\Desktop\Test IBM`
     - Access Mode: Read+Write
   - Apply & OK
3. Test connectivity on the Windows
   - Open CMD and check `ipconfig` > IPv4: `192.168.28.246`
   - Open new Windows > type: `ftp://192.168.28.246`
     - User: `miftah`
     - Password: blank
4. Login to Linux or Cisco 
   - Linux
      
      ```bash
      $ ftp 192.168.28.246
      > bin
      > dir
      > get Capture1.img
      > exit
      $ ls
      Capture1.img
      ```
      
   - Cisco IOS
    
      ```bash
      copy ftp://miftah:<pass>@192.168.28.246/Capture1.img bootflash:Capture1.img
      ```
   - AIX 
    
      ```bash
      $ ftp 192.168.28.246
      > bin
      > dir
      > get Capture1.img
      > exit
      $ ls
      Capture1.img
      ```