---
title: | 
        How to Collect PE Packages DS8880 <br>
        ![IELTS](https://img.shields.io/badge/IELTS-language-red)  
        ![Grammar](https://img.shields.io/badge/Grammar-checking-blue)  
        ![Advanced](https://img.shields.io/badge/Advanced-learning-purple)  

permalink: /docs/ds8k/collect-pepkages/
excerpt: "How to quickly install and setup Minimal Mistakes for use with GitHub Pages."
last_modified_at: 2025-03-23T21:36:18-04:00
redirect_from:
  - /theme-setup/
# toc: true
---

## How to Collect PE-Packages DS8880 

1. Open HMC DS8880
2. Select `SF Image #1` 
   - then select `Perform Data Collection on Demand` on the tasks below 
   - Select `General PE Package`
   - Select `New General PE Package`
   - Don't forget to un-check `Auto Offload`
   - Select all list and sub-packages 
   - Make sure all file left behind then you can click `Offload`
   - If Collect Data completed, then you can click `OK` and `Cancel`
3. Back to the HMC GUi and select `Serviceable Event`
   - Select `OK` with all option `ALL`
   - New Reference Code for latest event will appear on the Serviceable Event
   - Select the latest Event and Select `Manage Problem Data`
   - Just select 1 file and click `Offload to Media`
   - Select `Copy PE Package to USB (flash drive)` or `SDHC Card`
   - Make sure all of the PE Package Contents copied to the drive (use your laptop to see the files)