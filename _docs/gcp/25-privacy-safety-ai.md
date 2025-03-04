---
title: | 
        **Responsible AI for Developers: Privacy & Safety** <br>
        ![Google Cloud Compute](https://img.shields.io/badge/google--cloud-compute--engine-blue)
        ![Nginx](https://img.shields.io/badge/nginx-web--server-green)
        ![Debian VM](https://img.shields.io/badge/debian-virtual--machine-red)
        ![Node.js](https://img.shields.io/badge/node.js-runtime--environment-brightgreen)
        ![Linux](https://img.shields.io/badge/linux-operating--system-black)

permalink: /docs/gcp/privacy-safety-ai/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-03-01T21:36:18-04:00
toc: true

---

---

Lab Course [Link](https://www.cloudskillsboost.google/course_templates/1036)

<hr style="height: 5px; background-color: black; border: none;">

## **1. OVERVIEW OF AI PRIVACY**


{% include video id="Jhrv1aqzBFc" provider="youtube" %}

<hr style="height: 5px; background-color: black; border: none;">

## **2. PRIVACY IN TRAINING DATA: DE-IDENTIFICATION TECHNIQUES**


{% include video id="u7q_rqepj88" provider="youtube" %}


<hr style="height: 5px; background-color: black; border: none;">

## **3. PRIVACY IN TRAINING DATA: RANDOMIZATION TECHNIQUES**


{% include video id="2I07r046N0U" provider="youtube" %}


<hr style="height: 5px; background-color: black; border: none;">

## **4. PRIVACY IN MACHINE LEARNING TRAINING: DP-SGD**


{% include video id="L8NxHH2_5TY" provider="youtube" %}

<hr style="height: 5px; background-color: black; border: none;">

## **5. PRIVACY IN MACHINE LEARNING TRAINING: FEDERATED LEARNING**


{% include video id="hhig8z3IfHg" provider="youtube" %}


<hr style="height: 5px; background-color: black; border: none;">

## **6. SYSTEM SECURITY ON GOOGLE CLOUD**


{% include video id="5n4aydIGThM" provider="youtube" %}


<hr style="height: 5px; background-color: black; border: none;">

## **7. SYSTEM SECURITY ON GEN AI**


{% include video id="Jhj4RB1-AUo" provider="youtube" %}


<hr style="height: 5px; background-color: black; border: none;">

## **8. LAB: DIFFERENTIAL PRIVACY IN MACHINE LEARNING WITH TENSORFLOW PRIVACY**


{% include video id="iJLI24StZvo" provider="youtube" %}


<hr style="height: 5px; background-color: black; border: none;">


## **9. DIFFERENTIAL PRIVACY IN MACHINE LEARNING WITH TENSORFLOW PRIVACY (GSP9997)**


### **Overview**

This lab helps you learn how to use differential privacy in machine learning using TensorFlow Privacy.

#### Learning objectives

1. Wrap existing optimizers into their differentially private counterparts using TensorFlow Privacy.
2. Practice checking hyperparameters introduced by differentially private machine learning.
3. Measure the privacy guarantee provided using analysis tools included in TensorFlow Privacy.


### **Task 0. Setup and requirements**
---

For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

1. Sign in to Qwiklabs using an **incognito window**.
2. Note the lab's access time (for example, `1:15:00`), and make sure you can finish within that time. 
    There is no pause feature. You can restart if needed, but you have to start at the beginning.

3. When ready, click **Start lab**.
4. Note your lab credentials (**Username** and **Password**). You will use them to sign in to the Google Cloud Console.
5. Click **Open Google Console**.
6. Click **Use another account** and copy/paste credentials for **this** lab into the prompts. 
    If you use other credentials, you'll receive errors or **incur charges**.

7. Accept the terms and skip the recovery resource page.

**Note:** Do not click **End Lab** unless you have finished the lab or want to restart it. This clears your work and removes the project.
{:.notice--info}


#### Enable the Notebooks API

1. In the Google Cloud Console, on the **Navigation menu**, click **APIs & Services > Library**.
2. Search for **Notebooks API** and press ENTER.
3. Click on the **Notebooks API** result, and if the API is not enabled, click **Enable**.


#### Enable the Vertex AI API

1. In the Google Cloud Console, on the **Navigation menu**, click **Vertex AI > Dashboard**.
2. Click **ENABLE ALL RECOMMENDED APIS**.


### **Task 1. Open Vertex AI Workbench instance**
---

1. In the Google Cloud Console, on the **Navigation Menu**, click **Vertex AI > Workbench**.
2. On the **Instance** page, click **CREATE NEW**.
3. Please use the default zone and region: `zone placeholder` `region placeholder`. Leave the remaining settings as they are and then click **Create**. The new VM will take 2-3 minutes to start.
4. Click **Open JupyterLab**. A JupyterLab window will open in a new tab.


### **Task 2. Clone a course repo within your Vertex AI Workbench instance**
---

To clone the notebook in your JupyterLab instance:

1. In JupyterLab, open a new terminal window.
2. At the command-line prompt, run the following command:

    ```bash
    git clone https://github.com/GoogleCloudPlatform/asl-ml-immersion.git
    cd asl-ml-immersion
    export PATH=$PATH:~/.local/bin
    make install
    ```

3. To confirm that you have cloned the repository, double-click on the `asl-ml-immersion` directory and ensure that you can see its contents. The files for all the Jupyter notebook-based labs throughout this course are available in this directory.


### **Task 3. Implement Differential Privacy with TensorFlow Privacy**
---

1. In the notebook interface, navigate to **asl-ml-immersion > notebooks > responsible_ai > privacy > solutions** and open **privacy_dpsgd.ipynb**.
2. In the notebook interface, click **Edit > Clear All Outputs**.
3. Carefully read through the notebook instructions and run through the notebook.

**Tip**: To run the current cell, click the cell and press SHIFT+ENTER. Other cell commands are listed in the notebook UI under **Run**.
{:.notice--info}




<hr style="height: 5px; background-color: black; border: none;">


## **10. OVERVIEW AI SAFETY**

{% include video id="vpCFcCJv1XI" provider="youtube" %}


<hr style="height: 5px; background-color: black; border: none;">

## **11. SAFETY EVALUATION**

{% include video id="G9CFaxOXYZ0" provider="youtube" %}


<hr style="height: 5px; background-color: black; border: none;">

## **12. HARMS EVALUATION**

{% include video id="OcrK0RpsIXA" provider="youtube" %}


<hr style="height: 5px; background-color: black; border: none;">

## **13. MODEL TRAINING FOR SAFETY: RLHF**

{% include video id="gW6JP2f9DIg" provider="youtube" %}


<hr style="height: 5px; background-color: black; border: none;">

## **14. SAFETY IN GOOGLE CLOUD GENAI**

{% include video id="SApdKkUj1Ok" provider="youtube" %}


<hr style="height: 5px; background-color: black; border: none;">

## **15. LAB: SAFEGUARDING WITH VERTEX AI GEMINI API**

{% include video id="p71KNl_lMw4" provider="youtube" %}


<hr style="height: 5px; background-color: black; border: none;">

## **16. SAFEGUARDING WITH VERTEX AI GEMINI API (GSP9996)**

### **Overview**

This lab shows you how to inspect the safety ratings returned from the Vertex AI Gemini API and how to set a safety threshold to filter responses.

#### Learning objectives

1. Call the Vertex AI Gemini API and inspect safety ratings of the responses
2. Define a threshold for filtering safety ratings according to your needs


### **Task 0. Setup and requirements**
---

For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

1. Sign in to Qwiklabs using an **incognito window**.
2. Note the lab's access time (for example, `1:15:00`), and make sure you can finish within that time. 
    There is no pause feature. You can restart if needed, but you have to start at the beginning.
3. When ready, click **Start lab**.
4. Note your lab credentials (**Username** and **Password**). You will use them to sign in to the Google Cloud Console.
5. Click **Open Google Console**.
6. Click **Use another account** and copy/paste credentials for **this** lab into the prompts. 
    If you use other credentials, you'll receive errors or **incur charges**.
7. Accept the terms and skip the recovery resource page.

**Note:** Do not click **End Lab** unless you have finished the lab or want to restart it. This clears your work and removes the project.
{:.notice--info}


#### Enable the Notebooks API

1. In the Google Cloud Console, on the **Navigation menu**, click **APIs & Services > Library**.
2. Search for **Notebooks API** and press ENTER.
3. Click on the **Notebooks API** result, and if the API is not enabled, click **Enable**.


#### Enable the Vertex AI API

1. In the Google Cloud Console, on the **Navigation menu**, click **Vertex AI > Dashboard**.
2. Click **ENABLE ALL RECOMMENDED APIS**.


### **Task 1. Open Vertex AI Workbench instance**
---

1. In the Google Cloud Console, on the **Navigation Menu**, click **Vertex AI > Workbench**.
2. On the **Instance** page, click **CREATE NEW**.
3. Please use the default zone and region: `zone placeholder` `region placeholder`. Leave the remaining settings as they are and then click **Create**. The new VM will take 2-3 minutes to start.
4. Click **Open JupyterLab**. A JupyterLab window will open in a new tab.


### **Task 2. Clone a course repo within your Vertex AI Workbench instance**
---

To clone the notebook in your JupyterLab instance:

1. In JupyterLab, open a new terminal window.
2. At the command-line prompt, run the following command:

    ```bash
    git clone https://github.com/GoogleCloudPlatform/asl-ml-immersion.git
    cd asl-ml-immersion
    export PATH=$PATH:~/.local/bin
    make install
    ```

3. To confirm that you have cloned the repository, double-click on the `asl-ml-immersion` directory and ensure that you can see its contents. The files for all the Jupyter notebook-based labs throughout this course are available in this directory.


### **Task 3. Safeguard with Gemini API**
---

1. In the notebook interface, navigate to **asl-ml-immersion > notebooks > responsible_ai > safety > solutions** and open **gemini_safety_ratings.ipynb**.
2. In the notebook interface, click **Edit > Clear All Outputs**.
3. Carefully read through the notebook instructions and run through the notebook.

**Tip**: To run the current cell, click the cell and press SHIFT+ENTER. Other cell commands are listed in the notebook UI under **Run**.
{:.notice--info}



<hr style="height: 5px; background-color: black; border: none;">

## **17. QUIZ**


























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