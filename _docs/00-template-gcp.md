---
title: | 
        **The Basics of Google Cloude Compute** <br>
        ![Google Cloud Compute](https://img.shields.io/badge/google--cloud-compute--engine-blue)
        ![Nginx](https://img.shields.io/badge/nginx-web--server-green)
        ![Debian VM](https://img.shields.io/badge/debian-virtual--machine-red)
        ![Node.js](https://img.shields.io/badge/node.js-runtime--environment-brightgreen)
        ![Linux](https://img.shields.io/badge/linux-operating--system-black)

permalink: 
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-02-23T21:36:18-04:00
toc: true
sidebar:
  - title: "Find Your Guideline"
    image: "/assets/pictures/4.gif"
    image_alt: "image"
    text: "The wise guide does not give the right answers, but leads you to the right questions."
---

## **It Speaks! Create Synthetic Speech Using Text-to-Speech (GSP222)**

### Overview

The Text-to-Speech API lets you create audio files of machine-generated, or synthetic, human speech. You provide the content as text or [Speech Synthesis Markup Language (SSML)](https://www.w3.org/TR/speech-synthesis/), specify a voice (a unique 'speaker' of a language with a distinctive tone and accent), and configure the output; the Text-to-Speech API returns to you the content that you sent as spoken word, audio data, delivered by the voice that you specified.

In this lab you will create a series of audio files using the Text-to-Speech API, then listen to them to compare the differences.

#### Objectives

In this lab you use the Text-to-Speech API to do the following:
- Create a series of audio files
- Listen and compare audio files
- Configure audio output

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

Learn more from the Regions and zones documentation.


**Note**: When you run gcloud on your own machine, the config settings are persisted across sessions. But in Cloud Shell, you need to set this for every new session or reconnection.
{:.notice--info}

---

### Task1. 

---

### Task2. 

---

### Task3. 

---

### Task4. 

---

### Task5. 

---

### Task6. 

---

### Task7. 

---

### Congratulations!

---

## **Translate Text with the Cloud Translation API (GSP049)** 

### Overview

The Cloud Translation API uses Google’s neural machine translation technology to instantly translate texts into more than one hundred languages.

In this lab you use the API to translate text and detect what language the text is using.

#### Objectives

In this lab you use the Text-to-Speech API to do the following:
- Create a Cloud Translation API request and call the API with curl
- Translate text
- Use the Premium Edition
- Detecting language

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
    export REGION=REGION
    gcloud config set compute/region $REGION
    ```

Learn more from the Regions and zones documentation.


**Note**: When you run gcloud on your own machine, the config settings are persisted across sessions. But in Cloud Shell, you need to set this for every new session or reconnection.
{:.notice--info}

---

### Task1. 

---

### Task2. 

---

### Task3. 

---

### Congratulations!

---

## **Translate Text with the Cloud Translation API (GSP049)** 

### Overview

The Speech-to-Text API lets you transcribe audio speech files to text files in over 80 languages.

In this lab you send an audio file to the Speech API for transcription.

#### Objectives

In this lab you use the Speech-to-Text API to do the following:
- Creating a Speech-to-Text API request and calling the API with curl
- Calling the Speech-to-Text API with audio files in a different language

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


### Task1. 

---

### Task2. 

---

### Task3. 

---

### Task4. 

---

### Congratulations!

---

## **Cloud Speech API 3 Ways: Challenge Lab (ARC132)**

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

You are starting your career as a junior cloud architect. In this role, you have been assigned to work on a team project that requires you to use the Cloud Speech API services in Google Cloud.

You are expected to have the skills and knowledge to complete the tasks that follow.

#### Your challenge

For this challenge, you are required to transcribe speech to text in different languages using the Cloud Speech API.

You need to:
- Create synthetic speech from text using the Text-to-Speech API.
- Create an API key.
- Perform speech to text transcription with the Cloud Speech API.
- Translate text with the Cloud Translation API.
- Detect a language with the Cloud Translation API.

For this challenge lab, a virtual machine (VM) instance named `Instance name` has been configured for you to complete tasks 2 through 5.

Each task is described in detail below, good luck!























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