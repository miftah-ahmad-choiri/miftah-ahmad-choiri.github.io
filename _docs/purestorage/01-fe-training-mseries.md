---
title: | 
        FE Training M Series <br>
        ![IELTS](https://img.shields.io/badge/IELTS-language-red)  
        ![Grammar](https://img.shields.io/badge/Grammar-checking-blue)  
        ![Advanced](https://img.shields.io/badge/Advanced-learning-purple)  

permalink: /docs/purestorage/fe-training-mseries/
excerpt: "How to quickly install and setup Minimal Mistakes for use with GitHub Pages."
last_modified_at: 2025-03-23T21:36:18-04:00
redirect_from:
  - /theme-setup/
toc: true
---

----

## BASICS COMMANDS
---

### Run health commands

```bash
puredrive list        # list all disk status
purearray list --controller # list all controller status
purehw list           # list all hardware status
puremessage list      # list all health message status
```

### Commonly used commands

```bash
pureadm               # display current status of puresystem
purearray             # manage connection between arrays
pureboot              # shutdown and restart commands for a controller
purefirmware          # used to upgrade FW to the latest
purehost              # Display host-wide I/O performance info
purehw                # Display info about the controller visual identification of flashArray hw component
pureinstall           # will suppresss specific alerts related to doing purity upgrades
purenetwork           # manage the ethernet or bond interfaces used to connect a FlashArray to an administrative network
purenursery           # preserving Array_IDS
pureport              # manages an array's host connection ports
puresaswwnrecycle     # power cycling the drive slot or the entire enclosure
puresetup             # A series of setup command
puresnmp              # manages connections to SNMP managers
puretune              # tunable are set using the puretune command
pureversion           # lists the version of purity running 
```

## GUIDEBOOK

### FlashArray//M and //XR1 Cabling Guide

<iframe src="/assets/images/purestorage/mseries/1.pdf" width="100%" height="1000px">
</iframe>

### FlashArray//M Service Guide

<iframe src="/assets/images/purestorage/mseries/2.pdf" width="100%" height="1000px">
</iframe>

### FA-420 SAS Cable Replacement Guide

<iframe src="/assets/images/purestorage/mseries/3.pdf" width="100%" height="1000px">
</iframe>

## VIDEO HARDWARE REPLACEMENT

### Replace Bazel

### Replace Cabling

### Replace Chassis

### Replace Controller

### Replace Fans

### Replace FlashModule

### Replace NVRAM Blanks

### Replace NVRAM

### Replace Optical Transceiver

### Replace Power Cord

### Replace Power Supply Module

### Replace Power Supply Units

### Replace Rails










<!-- Scroll to Top Button -->
<button onclick="scrollToTop()" id="scrollToTopBtn" title="Go to top">㐃</button>

<style>
  /* Style for the button */
  #scrollToTopBtn {
    display: none; /* Hidden by default */
    position: fixed; /* Fixed/sticky position */
    bottom: 20px; /* Place the button at the bottom of the page */
    right: 20px; /* Place the button 20px from the right */
    z-index: 99; /* Make sure it does not overlap */
    border: none; /* Remove borders */
    outline: none; /* Remove outline */
    background-color: #555; /* Set a background color */
    color: white; /* Text color */
    cursor: pointer; /* Add a mouse pointer on hover */
    padding: 20px; /* Some padding */
    border-radius: 20px; /* Rounded corners */
    font-size: 15px; /* Increase font size */
  }
  #scrollToTopBtn:hover {
    background-color: #111; /* Darker background on hover */
  }
</style>

<script defer>
  // Show the button when scrolling down
  window.onscroll = function() {
    let btn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  // Scroll to top function
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>