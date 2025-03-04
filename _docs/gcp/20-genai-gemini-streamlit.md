---
title: | 
        **Secure Software Delivery** <br>
        ![Google Cloud Compute](https://img.shields.io/badge/google--cloud-compute--engine-blue)
        ![Nginx](https://img.shields.io/badge/nginx-web--server-green)
        ![Debian VM](https://img.shields.io/badge/debian-virtual--machine-red)
        ![Node.js](https://img.shields.io/badge/node.js-runtime--environment-brightgreen)
        ![Linux](https://img.shields.io/badge/linux-operating--system-black)

permalink: /docs/gcp/genai-gemini-streamlit/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-03-01T21:36:18-04:00
toc: true

---

---

Lab Course [Link](https://www.cloudskillsboost.google/course_templates/978)

<hr style="height: 5px; background-color: black; border: none;">

## **1. GETTING STARTED WITH THE GEMINI API IN VERTEX AI WITH CURL (GSP1228)**

### **Overview**

In this lab, you learn how to use the Gemini API in Vertex AI with cURL commands to interact with the Gemini 1.5 Pro (`gemini-1.5-pro`) model. You will learn how to generate text from a prompt, add model parameters, chat, and generate text from images and video.

#### Gemini

[Gemini](https://deepmind.google/technologies/gemini/) is a family of powerful generative AI models developed by Google DeepMind, capable of understanding and generating various forms of content, including text, code, images, audio, and video.


- **Gemini API in Vertex AI**
    
    The Gemini API in Vertex AI provides a unified interface for interacting with Gemini models. This allows developers to easily integrate these powerful AI capabilities into their applications. For the most up-to-date details and specific features of the latest versions, please refer to the official [Gemini documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models#gemini-models).


- **Gemini Models**

    * **[Gemini Pro](https://deepmind.google/technologies/gemini/pro/)**: Designed for complex reasoning, including:
        * Analyzing and summarizing large amounts of information.
        * Sophisticated cross-modal reasoning (across text, code, images, etc.).
        * Effective problem-solving with complex codebases.
    * **[Gemini Flash](https://deepmind.google/technologies/gemini/flash/)**: Optimized for speed and efficiency, offering:
        * Sub-second response times and high throughput.
        * High quality at a lower cost for a wide range of tasks.
        * Enhanced multimodal capabilities, including improved spatial understanding, new output modalities (text, audio, images), and native tool use (Google Search, code execution, and third-party functions).

#### Prerequisites

Before starting this lab, you should be familiar with:

* Basic Python programming.
* General API concepts.
* Running Python code in a Jupyter notebook on [Vertex AI Workbench](https://cloud.google.com/vertex-ai/docs/workbench/introduction).


### **Objectives**

In this lab, you will learn how to perform the following tasks:

* Install the Python SDK
* Use the Gemini API in Vertex AI to interact with each model
* Use the Gemini 1.5 Pro (`gemini-1.5-pro`) model to generate text from image(s), text prompts and video

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

### **Task 1. Open the notebook in Vertex AI Workbench**
---

1. In the Google Cloud console, on the **Navigation menu**, click **Vertex AI > Workbench**.

2. Find the `Workbench instance name` instance and click on the **Open JupyterLab** button.

    The JupyterLab interface for your Workbench instance opens in a new browser tab.


### **Task 2. Set up the notebook**
---

1. Open the `notebook name` file.
2. In the **Select Kernel** dialog, choose **Python 3** from the list of available kernels.
3. Run through the **Getting Started** and the **Import libraries** sections of the notebook.
    * For **Project ID**, use `Project ID`, and for **Location**, use `Region`.

**Note:** You can skip any notebook cells that are noted *Colab only*. If you experience a 429 response from any of the notebook cell executions, wait 1 minute before running the cell again to proceed.
{:.notice--info}

In the following sections, you will run through the notebook cells to see how to use the Gemini API in Vertex AI with cURL commands to interact with the Gemini 1.5 Pro (`gemini-1.5-pro`) model.


### **Task 3. Use the Gemini Pro Model**
--- 

Gemini 1.5 Pro (`gemini-1.5-pro`) model is tailored for natural language tasks such as classification, summarization, extraction, and writing. In this task, you will learn how to use the Gemini 1.5 Pro to generate text from a prompt.

1. In this task, run through the notebook cells to see how to use the Gemini Pro model to generate text from a text prompt.

**Note:** Save the notebook file before clicking on the **Check my progress** button for every task.
{:.notice--danger}


### **Task 4. Multimodal input**
--- 

The Gemini 1.5 Pro (`gemini-1.5-pro`) is a multimodal model that supports adding images and videos in text or chat prompts for a text response.

1. In this task, run through the notebook cells to see how to use the Gemini 1.5 Pro model to generate text from an image from a local file, an image from Google Cloud Storage, and a video file.


### **Congratulations!**
---

Congratulations! In this lab, you have successfully learned how to use the Gemini API in Vertex AI with cURL commands to interact with the Gemini 1.5 Pro (`gemini-1.5-pro`) model to generate text, add model parameters, chat, generate text from a local image, generate text from an image on Google Cloud Storage and generate text from a video file.


<hr style="height: 5px; background-color: black; border: none;">

## **2. INTRODUCTION TO FUNCTION CALLING WITH GEMINI (GSP1227)**

### **Overview**

Function calling lets developers create a description of a function in their code, then pass that description to a language model in a request. The response from the model includes the name of a function that matches the description and the arguments to call it with.

Function calling is similar to Vertex AI Extensions in that they both generate information about functions. The difference between them is that function calling returns JSON data with the name of a function and the arguments to use in your code, whereas Vertex AI Extensions returns the function and calls it for you.

#### Gemini

[Gemini](https://deepmind.google/technologies/gemini/) is a family of powerful generative AI models developed by Google DeepMind, capable of understanding and generating various forms of content, including text, code, images, audio, and video.


- **Gemini API in Vertex AI**
    
    The Gemini API in Vertex AI provides a unified interface for interacting with Gemini models. This allows developers to easily integrate these powerful AI capabilities into their applications. For the most up-to-date details and specific features of the latest versions, please refer to the official [Gemini documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models#gemini-models).


- **Gemini Models**

    * **[Gemini Pro](https://deepmind.google/technologies/gemini/pro/)**: Designed for complex reasoning, including:
        * Analyzing and summarizing large amounts of information.
        * Sophisticated cross-modal reasoning (across text, code, images, etc.).
        * Effective problem-solving with complex codebases.
    * **[Gemini Flash](https://deepmind.google/technologies/gemini/flash/)**: Optimized for speed and efficiency, offering:
        * Sub-second response times and high throughput.
        * High quality at a lower cost for a wide range of tasks.
        * Enhanced multimodal capabilities, including improved spatial understanding, new output modalities (text, audio, images), and native tool use (Google Search, code execution, and third-party functions).

#### Prerequisites

Before starting this lab, you should be familiar with:

* Basic Python programming.
* General API concepts.
* Running Python code in a Jupyter notebook on [Vertex AI Workbench](https://cloud.google.com/vertex-ai/docs/workbench/introduction).


#### **Objectives**

In this lab, you learn how to:

- Install the Vertex AI SDK for Python.
- Use the Gemini API in Vertex AI to interact with the Gemini 1.5 Pro (`gemini-1.5-pro`) model:
    - Generate function calls from a text prompt to help customers get information about products in the Google Store.
    - Generate function calls from a text prompt and call an external API to geocode addresses.
    - Generate function calls from a text prompt to extract entities from log data.

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


### **Task 1. Open the notebook in Vertex AI Workbench**
---

1. In the Google Cloud console, on the **Navigation menu**, click **Vertex AI > Workbench**.
2. Find the `Workbench instance name` instance and click on the **Open JupyterLab** button.

    The JupyterLab interface for your Workbench instance opens in a new browser tab.


### **Task 2. Set up the notebook**
---

1. Open the `notebook name` file.
2. In the **Select Kernel** dialog, choose **Python 3** from the list of available kernels.
3. Run through the **Getting Started** and the **Import libraries** sections of the notebook.
    * For **Project ID**, use `Project ID`, and for **Location**, use `Region`.

**Note:** You can skip any notebook cells that are noted *Colab only*. If you experience a 429 response from any of the notebook cell executions, wait 1 minute before running the cell again to proceed.
{:.notice--info}

In the following sections, you will run through the notebook cells to see how to use the Gemini API in Vertex AI with the Vertex AI SDK for Python.


### **Task 3. Using function calling for structured Google Store queries**
--- 

When working with a generative text model, it can be difficult to coerce the LLM to give consistent responses in a structured format such as JSON. Function calling makes it easy to work with LLMs via prompts and unstructured inputs, and have the LLM return a structured response that can be used to call an external function.

You can think of function calling as a way to get structured output from user prompts and function definitions, use that structured output to make an API request to an external system, then return the function response to the LLM to generate a response to the user. In other words, function calling in Gemini extracts structured parameters from unstructured text or messages from users. In this example, you'll use function calling along with the chat modality in the Gemini model to help customers get information about products in the Google Store.

1. In this task, run through the notebook cells to see how to use the Gemini model to help customers get information about products in the Google Store.


### **Task 4. Using function calling to geocode addresses with a maps API**
---

In this example, you'll use the text modality in the Gemini API to define a function that takes multiple parameters as inputs. You'll use the function call response to then make a live API call to convert an address to latitude and longitude coordinates.

1. In this task, run through the notebook cells to see how to use the Gemini Pro model to generate a function call to geocode an address.

Here we used the [OpenStreetMap Nominatim API](https://nominatim.openstreetmap.org/ui/search.html) to geocode an address to make it easy to use and learn in this notebook. If you're working with large amounts of maps or geolocation data, you can use the [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding).
{:.notice--info}


### **Task 5. Using function calling for entity extraction**
---

In the previous examples, you made use of the entity extraction functionality within Gemini Function Calling so that you could pass the resulting parameters to a REST API or client library. However, you might want to only perform the entity extraction step with Gemini Function Calling and stop there without actually calling an API. You can think of this functionality as a convenient way to transform unstructured text data into structured fields.

In this example, you'll build a log extractor that takes raw log data and transforms it into structured data with details about error messages.

1. In this task, run through the notebook cells to see how to use the Gemini Pro model to generate function calls to extract entities from log data.


### **Congratulations!**
---

Congratulations! In this lab, you learned how to use the Gemini API in Vertex AI to generate function calls from text prompts. You used the Gemini Pro model to generate function calls to help customers get information about products in the Google Store, geocode addresses, and extract entities from log data.



<hr style="height: 5px; background-color: black; border: none;">

## **3. GETTING STARTED WITH THE GEMINI API IN VERTEX AI (GSP1209)**

### **Overview**

This lab provides a hands-on introduction to using the Gemini API within Vertex AI. You'll leverage the Vertex AI SDK for Python to interact with the powerful Gemini 1.5 Pro model, exploring its capabilities through a variety of tasks. These tasks include generating text from different input types (text prompts, images, and videos), as well as experimenting with various features and configuration options to fine-tune your results. This experience will equip you with the essential skills to effectively utilize the Gemini API for diverse generative AI applications.

#### Gemini

[Gemini](https://deepmind.google/technologies/gemini/) is a family of powerful generative AI models developed by Google DeepMind, capable of understanding and generating various forms of content, including text, code, images, audio, and video.


- **Gemini API in Vertex AI**
    
    The Gemini API in Vertex AI provides a unified interface for interacting with Gemini models. This allows developers to easily integrate these powerful AI capabilities into their applications. For the most up-to-date details and specific features of the latest versions, please refer to the official [Gemini documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models#gemini-models).


- **Gemini Models**

    * **[Gemini Pro](https://deepmind.google/technologies/gemini/pro/)**: Designed for complex reasoning, including:
        * Analyzing and summarizing large amounts of information.
        * Sophisticated cross-modal reasoning (across text, code, images, etc.).
        * Effective problem-solving with complex codebases.
    * **[Gemini Flash](https://deepmind.google/technologies/gemini/flash/)**: Optimized for speed and efficiency, offering:
        * Sub-second response times and high throughput.
        * High quality at a lower cost for a wide range of tasks.
        * Enhanced multimodal capabilities, including improved spatial understanding, new output modalities (text, audio, images), and native tool use (Google Search, code execution, and third-party functions).

#### Prerequisites

Before starting this lab, you should be familiar with:

* Basic Python programming.
* General API concepts.
* Running Python code in a Jupyter notebook on [Vertex AI Workbench](https://cloud.google.com/vertex-ai/docs/workbench/introduction).


#### **Objectives**

In this lab, you learn how to:

- Use the Gemini API in Vertex AI with the Vertex AI SDK for Python.
- Interact with the Gemini 1.5 Pro (gemini-1.5-pro) model.
- Generate text from a text prompt.
- Explore various features and configuration options.
- Generate text from an image and a text prompt.
- Generate text from a video and a text prompt.

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


### **Task 1. Open the notebook in Vertex AI Workbench**
---

1. In the Google Cloud console, on the **Navigation menu**, click **Vertex AI > Workbench**.
2. Find the `Workbench instance name` instance and click on the **Open JupyterLab** button.

    The JupyterLab interface for your Workbench instance opens in a new browser tab.


### **Task 2. Set up the notebook**
---

1. Open the `notebook name` file.
2. In the **Select Kernel** dialog, choose **Python 3** from the list of available kernels.
3. Run through the **Getting Started** and the **Import libraries** sections of the notebook.
    * For **Project ID**, use `Project ID`, and for **Location**, use `Region`.

**Note:** You can skip any notebook cells that are noted *Colab only*. If you experience a 429 response from any of the notebook cell executions, wait 1 minute before running the cell again to proceed.
{:.notice--info}

In the following sections, you will run through the notebook cells to see how to use the Gemini API in Vertex AI.


### **Task 3. Use the Gemini 1.5 Pro model**
---

The Gemini 1.5 Pro (`gemini-1.5-pro`) model is designed to handle natural language tasks, multi-turn text and code chat, and code generation. In this task, run through the notebook cells to see how to use the Gemini 1.5 Pro model to generate text from text prompts.


#### Generate text from text prompts

Send a text prompt to the model using the `generate_content` method. The `generate_content` method can handle a wide variety of use cases, including multi-turn chat and multimodal input, depending on what the underlying model supports.


#### Streaming

By default, the model returns a response after completing the entire generation process. You can also stream the response as it is being generated, and the model will return chunks of the response as soon as they are generated.



#### Try your own prompts

* Run through the **Try your own prompts** section of the notebook.


#### Safety filters

The Gemini API provides safety filters that you can adjust across multiple filter categories to restrict or allow certain types of content. You can use these filters to adjust what's appropriate for your use case. See the [Configure safety filters](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-filters) page for details.

When you make a request to Gemini, the content is analyzed and assigned a safety rating. You can inspect the safety ratings of the generated content by printing out the model responses, as in this example:

* Run through the **Safety filters** section of the notebook.


#### Test chat prompts

The Gemini API supports natural multi-turn conversations and is ideal for text tasks that require back-and-forth interactions. The following examples show how the model responds during a multi-turn conversation.

* Run through the **Test chat prompts** section of the notebook.


### **Task 4. Generate text from a multimodal prompt**
---

Gemini 1.5 Pro (`gemini-1.5-pro`) is a multimodal model that supports multimodal prompts. You can include text, image(s), and video in your prompt requests and get text or code responses.


#### Generate text from local image and text

* Run through the **Generate text from local image and text** section of the notebook.


#### Generate text from text and image prompts

* Run through the **Generate text from text & image(s)** section of the notebook.


#### Combining multiple images and text prompts for few-shot prompting

* Run through the **Combining multiple images and text prompts for few-shot prompting** section of the notebook.

#### Generate text from a video file

* Run through the **Generate text from a video file** section of the notebook.


#### Direct analysis of publicly available web media

* Run through the **Direct analysis of publicly available web media** section of the notebook.


### **Congratulations!**
---

In this lab, you delved into the utilization of the Gemini API in Vertex AI along with the Vertex AI SDK for Python to interact with the Gemini 1.5 Pro (`gemini-1.5-pro`) model. Through these exercises, you gained practical insights into the capabilities of the Gemini API in Vertex AI and its seamless integration with the Python SDK.


<hr style="height: 5px; background-color: black; border: none;">

## **4. UTILIZE THE STREAMLIT FRAMEWORK WITH CLOUD RUN AND THE GEMINI API IN VERTEX AI (GSP1229)**

### **Overview**

In this lab, you will learn how to build a generative AI application using the Gemini API in Vertex AI and deploying it on Cloud Run. You'll use the Streamlit framework to create an interactive interface for generating stories.

The lab involves running the application locally in Cloud Shell to test its functionality and then deploying it to Cloud Run for scalable serving. You'll gain practical experience integrating Gemini with a user interface and leveraging Cloud Run for efficient deployment.

#### Gemini

[Gemini](https://deepmind.google/technologies/gemini/) is a family of powerful generative AI models developed by Google DeepMind, capable of understanding and generating various forms of content, including text, code, images, audio, and video.


- **Gemini API in Vertex AI**
    
    The Gemini API in Vertex AI provides a unified interface for interacting with Gemini models. This allows developers to easily integrate these powerful AI capabilities into their applications. For the most up-to-date details and specific features of the latest versions, please refer to the official [Gemini documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models#gemini-models).


- **Gemini Models**

    * **[Gemini Pro](https://deepmind.google/technologies/gemini/pro/)**: Designed for complex reasoning, including:
        * Analyzing and summarizing large amounts of information.
        * Sophisticated cross-modal reasoning (across text, code, images, etc.).
        * Effective problem-solving with complex codebases.
    * **[Gemini Flash](https://deepmind.google/technologies/gemini/flash/)**: Optimized for speed and efficiency, offering:
        * Sub-second response times and high throughput.
        * High quality at a lower cost for a wide range of tasks.
        * Enhanced multimodal capabilities, including improved spatial understanding, new output modalities (text, audio, images), and native tool use (Google Search, code execution, and third-party functions).

#### Prerequisites

Before starting this lab, you should be familiar with:

* Basic Python programming.
* General API concepts.
* Running Python code in a Jupyter notebook on [Vertex AI Workbench](https://cloud.google.com/vertex-ai/docs/workbench/introduction).


#### **Objectives**

In this lab, you learn how to:

- Integrate Gemini API in Vertex AI with applications
- Build and deploy the developed sample application on Google Cloud Run
- Use the Streamlit framework to build a Cloud Run application

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


### **Task 1. Run the Application Locally (in Cloud Shell)**
---

In this section, you will run the Streamlit application locally in Cloud Shell.

#### Clone the Repository

1. Open a new Cloud Shell terminal by clicking on the Cloud Shell icon in the top right corner of the Cloud console.
2. Run the following commands to clone the repo and navigate to `gemini-streamlit-cloudrun` directory in Cloud Shell using the following commands.

    ```bash
    git clone https://github.com/GoogleCloudPlatform/generative-ai.git --depth=1
    ```

    ```bash
    cd generative-ai/gemini/sample-apps/gemini-streamlit-cloudrun
    ```

    To run the Streamlit Application, you will need to perform some additional steps.

#### Run the application

1. Setup the Python virtual environment and install the dependencies:

    ```bash
    python3 -m venv gemini-streamlit
    source gemini-streamlit/bin/activate
    pip install -r requirements.txt
    ```

2. Your application requires access to two environment variables:

      * `GOOGLE_CLOUD_PROJECT` : This the Google Cloud project ID.
      * `GOOGLE_CLOUD_REGION` : This is the region in which you are deploying your Cloud Run app. For e.g. `us-central1`.

    These variables are needed since the Vertex AI initialization needs the Google Cloud project ID and the region. The specific code line from the `app.py` function is shown here: `vertexai.init(project=PROJECT_ID, location=LOCATION)`

    In Cloud Shell, execute the following commands:

    ```bash
    GOOGLE_CLOUD_PROJECT='Project ID'
    GOOGLE_CLOUD_REGION='Region'
    ```

3. To run the application locally, execute the following command.

    ```bash
    streamlit run app.py \
      --browser.serverAddress=localhost \
      --server.enableCORS=false \
      --server.enableXsrfProtection=false \
      --server.port 8080
    ```

    **Output:**


    ```bash
    Collecting usage statistics. To deactivate, set browser.gatherUsageStats to False.

    You can now view your Streamlit app in your browser.

    URL: http://localhost:8080

    ```

4. The application will startup and you will be provided a URL to the application. Click the link to view the application in the browser or use Cloud Shell's web preview function to launch the preview page.
5. Adjust the parameters for the story generation and click **Generate my story**.
6. Navigate back to Cloud Shell and **"AUTHORIZE" the application to access the Gemini API** when prompted. Once you have authorized the application, you can navigate back to the application to see the response.

    **Note:** The application will prompt the Gemini API in Vertex AI and display the responses. In order for this to work, after selecting **Generate my story** you will **need to navigate back to Cloud Shell to authorize the application** to access the Gemini API.
    {:.notice--info}

    ![alt_text](images/image1.png "image_tooltip")


7. After you have finished testing the application, you can stop the application by entering **Ctrl** + **C** in Cloud Shell.


### **Task 2. Build and Deploy the Application to Cloud Run**
---

In this section, you will deploy the Streamlit Application in Cloud Run.

You will now build the Docker image for the application and push it to Artifact Registry. To do this, you will need one environment variable set that will point to the Artifact Registry name. The commands below will create this Artifact Registry repository for you.

**Note: **This step will take several minutes to complete.
{:.notice--info}


1. In Cloud Shell, execute the following command:

    ```bash
    AR_REPO='gemini-repo'
    SERVICE_NAME='gemini-streamlit-app' 
    gcloud artifacts repositories create "$AR_REPO" --location="$GOOGLE_CLOUD_REGION" --repository-format=Docker
    gcloud builds submit --tag "$GOOGLE_CLOUD_REGION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/$AR_REPO/$SERVICE_NAME"
    ```

    **Output:**

    ```bash
    DONE
    --------------------------------------------------------------------------------
    ID                                    CREATE_TIME                DURATION  SOURCE                                                                                                     IMAGES                                                                                              STATUS
    a601ffd1-c282-43d2-942c-53cc13f43bf2  2023-12-18T11:37:30+00:00  2M29S     gs://qwiklabs-gcp-00-eb090e9513e8_cloudbuild/source/1702899440.87287-549e1a0cc5644b3c9535ff57f4a63d02.tgz  us-central1-docker.pkg.dev/qwiklabs-gcp-00-eb090e9513e8/gemini-repo/gemini-streamlit-app (+1 more)  SUCCESS

    ```

2. The final step is to deploy the service in Cloud Run with the image that we had built and had pushed to the Artifact Registry in the previous step.

    ```bash
    gcloud run deploy "$SERVICE_NAME" \
      --port=8080 \
      --image="$GOOGLE_CLOUD_REGION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/$AR_REPO/$SERVICE_NAME" \
      --allow-unauthenticated \
      --region=$GOOGLE_CLOUD_REGION \
      --platform=managed  \
      --project=$GOOGLE_CLOUD_PROJECT \
      --set-env-vars=GOOGLE_CLOUD_PROJECT=$GOOGLE_CLOUD_PROJECT,GOOGLE_CLOUD_REGION=$GOOGLE_CLOUD_REGION
    ```

    On successful deployment, you will be provided a URL to the Cloud Run service. You can visit that in the browser to view the Cloud Run application that you just deployed.

    **Output:**

    ```bash
    ⠼ Deploying new service... Done.

    ✓ Deploying new service... Done.

    Done.  
    Service [gemini-streamlit-app] revision [gemini-streamlit-app-00001-srg] has been deployed and is serving 100 percent of traffic. Service URL: https://gemini-streamlit-app-hc2gb6hsia-uc.a.run.app
    ```


    Choose the functionality that you would like to check out and the application will prompt the Gemini API in Vertex AI and display the responses.


    ![alt_text](images/image2.png "image_tooltip")


### **Congratulations!**
---

Congratulations! In this lab, you have learned how to integrate Gemini API in Vertex AI with applications and build and deploy the developed sample application on Google Cloud Run.


<hr style="height: 5px; background-color: black; border: none;">

## **5. DEVELOP GENAI APPS WITH GEMINI AND STREAMLIT: CHALLENGE LAB (GSP517)**

### **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who enrolled in the [GenAI application development with Gemini and Streamlit](https://www.cloudskillsboost.google/course_templates/978) course. Are you ready for the challenge?


### **Setup and requirements**


#### Before you click the Start Lab button

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.
{:.notice--info}


**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.
{:.notice--info}


### **Challenge scenario**

You onboarded at Cymbal Health just a few months ago. Cymbal Health is an established health network in East Central Minnesota dedicated to reimagining and transforming the way that healthcare can be delivered. Cymbal Health connects care and coverage under one health plan to make it easier for patients to receive high quality care at an affordable cost.

As a value added service, Cymbal Health is interested in improving customer Healthy Living and Wellness, with tips, and advice within apps. One particular area they want to focus on is improving customer nutrition.


![alt_text](images/image1.png "image_tooltip")

By harnessing the power of the Gemini Pro, a multimodal model for generating text, audio, images, and video, Cymbal Health can build applications that generate meal recommendations for its customers.

As an example, your team has been working to create a AI-Based Chef app, that generates recipes based upon customer cuisine preferences, dietary restrictions, food allergies, and what they typically have in their homes or can purchase at a grocery store. Your job is to build, test and deploy a Proof Of Concept (POC) for this Chef app built on the Gemini pro model, Streamlit framework, and Cloud Run. As part of this POC, they have a list of tasks they would like to see you do in an allotted period of time in a sandbox environment.


#### Your challenge

Your tasks include the following:

* Use cURL to test a prompt with the API.
* Write Streamlit framework and prompt Python code to complete `chef.py`.
* Test the application.
* Modify the Dockerfile and push the Docker image to the Artifact Registry.
* Deploy the application to Cloud Run and test.


### **Task 1. Use cURL to test a prompt with the API**
---

Before you can begin to create the Chef app in Vertex AI, you should test connectivity with the Gemini API.

1. In the Google Cloud console, on the **Navigation menu**, click **Vertex AI > Workbench**.
2. Find the `Workbench instance name` instance and click on the **Open JupyterLab** button.
    The JupyterLab interface for your Workbench instance opens in a new browser tab.

3. From the left hand menu, modify `prompt.ipynb` to include your project_ID and region within cell 3. You can get these in the left panel of the lab instructions.
4. From the left hand menu, modify `prompt.ipynb` to use the following prompt with cURL within cell 5, by replacing the existing prompt.
   
   ```bash
   I am a Chef.  I need to create Japanese recipes for customers who want low sodium meals. However, I do not want to include recipes that use ingredients associated with a peanuts food allergy. I have ahi tuna, fresh ginger, and edamame in my kitchen and other ingredients. The customer wine preference is red. Please provide some for meal recommendations. For each recommendation include preparation instructions, time to prepare and the recipe title at the beginning of the response. Then include the wine paring for each recommendation. At the end of the recommendation provide the calories associated with the meal and the nutritional facts.
   ```

5. Run all cells and observe the results.
6. Save `prompt.ipynb`.


### **Task 2. Write Streamlit framework and prompt Python code to complete chef.py**
---

For this task you will clone a GitHub repo, and download the `chef.py` file. Then you will add Streamlit framework code in the `chef.py` file for the wine preference, to complete the user interface for the application. You will also include a custom Gemini prompt (similar to the one in task 1), but this one includes variables.

1. Using Cloud Shell clone the repo below from the default directory.
   
    ```bash
    git clone https://github.com/GoogleCloudPlatform/generative-ai.git
    ```

2. Navigate to the `gemini-streamlit-cloudrun` directory.
    
    ```bash
    cd generative-ai/gemini/sample-apps/gemini-streamlit-cloudrun
    ```

    **Important:** All work in this challenge lab should be done within this directory. If you do not download the `chef.py` file here and make changes to it here, it will not be able to access the Streamlit framework. You will also not be able to test it in Cloud Shell (Task 3), or build the docker container (Task 4), and deploy then test it Cloud Run (Task 5).
    {:.notice--info}


3.  Download the `chef.py` file using the following command.
    
    ```bash
    gsutil cp gs://spls/gsp517/chef.py .
    ```

4.  Open the chef.py file in the Cloud Shell Editor and review the code.
    
    **Note:** The chef.py file already includes the Streamlit framework user interface code for the cuisine, dietary_preference, allergy, ingredient_1, ingredient_2, and ingredient_3 variables. Review this interface code before completing the next step.
    {:.notice--info}

5.  Add Streamlit framework radio button option for the wine variable. Include options for Red, White and None.

6. Save the `chef.py` file.
7. Add the new Gemini prompt below in Python code.


    ```bash
    prompt = f"""I am a Chef.  I need to create {cuisine} \n
    recipes for customers who want {dietary_preference} meals. \n
    However, don't include recipes that use ingredients with the customer's {allergy} allergy. \n
    I have {ingredient_1}, \n
    {ingredient_2}, \n
    and {ingredient_3} \n
    in my kitchen and other ingredients. \n
    The customer's wine preference is {wine} \n
    Please provide some for meal recommendations.
    For each recommendation include preparation instructions,
    time to prepare
    and the recipe title at the beginning of the response.
    Then include the wine paring for each recommendation.
    At the end of the recommendation provide the calories associated with the meal
    and the nutritional facts.

    ```

8.  Save the `chef.py` file.

    Once you are satisfied with the Gemini prompt code you added in `chef.py`, upload the file to **<code>set at lab start</code>-generative-ai** bucket by running below command in your cloud shell. On cloud console, click **Open terminal** to open the session in the Cloud Shell.


    ```bash
    gcloud storage cp chef.py gs://set at lab start-generative-ai/
    ```

    **Note:** Make sure to run above command after making any changes in the `chef.py` file. So that the updated `chef.py` file is present in the bucket.
    {:.notice--info}


### **Task 3. Test the application**
----

For this task you will use the terminal in Cloud Shell to run and test your application.

Make sure your are still in this path, `generative-ai/gemini/sample-apps/gemini-streamlit-cloudrun`.

1. Setup the python virtual environment and install the dependencies.
2. Set environment variables for PROJECT (as your Project ID) and REGION (as the region you are using in the lab environment).
3. Run the `chef.py` application and test it.

    Once you tested the application in Cloud Shell and confirmed it is performing as designed, without errors, verify the objective.


### **Task 4. Modify the Dockerfile and push image to the Artifact Registry**
---

In this task you modify the sample `Dockerfile` to use your `chef.py` file and push the Docker image to the Artifact Registry.

**Important:** Before completing the steps in this task we recommend you set environment variables for PROJECT (as your Project ID) and REGION (as the region you are using in the lab environment) as you did in a previous task.
{:.notice--info}

1. Use the Cloud Shell editor to modify the Dockerfile to use `chef.py`, then save the file.

2. In Cloud Shell set the following environment variables.

    | Variable      | Value               |
    |--------------|----------------------|
    | AR_REPO      | 'chef-repo'          |
    | SERVICE_NAME | 'chef-streamlit-app' |


    **Note:** We recommend you combine this command and the following two commands as a single command, as the process to create the Artifact Registry and submit the build to Cloud Build, takes approximately 8 minutes.
    {:.notice--info}

3. Create the Artifact Registry repository with the `gcloud artifacts repositories create` command and the following parameters.


    | Parameter           | Value      |
    |---------------------|-----------|
    | repo name          | $AR_REPO  |
    | location           | $REGION   |
    | repository format | Docker    |


4. Submit the build with the `gcloud builds submit` command and the following parameters.

    | Parameter | Value |
    |-----------|----------------------------------------------------------|
    | tag       | "$REGION-docker.pkg.dev/$PROJECT/$AR_REPO/$SERVICE_NAME" |


5. Wait for the command to complete.


### **Task 5. Deploy the application to Cloud Run and test**
---

In this task you deploy the application (as a Docker Artifact) to Cloud Run and then test the application as running from the Cloud Run service endpoint.

1. In Cloud Shell deploy the application (as a Docker Artifact), using `gcloud run deploy` command and the following parameter values:

    | Parameter     | Value                                                               |
    |--------------|---------------------------------------------------------------------|
    | port         | 8080                                                                |
    | image        | "$REGION-docker.pkg.dev/$PROJECT/$AR_REPO/$SERVICE_NAME"           |
    | flag         | --allow-unauthenticated                                            |
    | region       | REGION                                                              |
    | platform     | managed                                                             |
    | project      | PROJECT                                                             |
    | set-env-vars | PROJECT=$PROJECT,REGION=$REGION                                    |

   
    **Note:** You may see a prompt asking "Do you want enable these APIs to continue (this will take a few minutes)?" If you do, select Y for yes.
    {:.notice--info}

    The deployment will take a few minutes to complete and you will be provided a URL to the Cloud Run service. You can visit that in the browser to view the Cloud Run application that you just deployed.

2. Test the application with the link provided.


### **Congratulations!**
---

By completing this challenge lab, you verified your skills with GenAI application development with Gemini and how you can apply these to AI based chef application.































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