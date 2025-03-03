---
title: | 
        **Explore Generative AI with the Vertex AI Gemini API** <br>
        ![Google Cloud Compute](https://img.shields.io/badge/google--cloud-compute--engine-blue)
        ![Nginx](https://img.shields.io/badge/nginx-web--server-green)
        ![Debian VM](https://img.shields.io/badge/debian-virtual--machine-red)
        ![Node.js](https://img.shields.io/badge/node.js-runtime--environment-brightgreen)
        ![Linux](https://img.shields.io/badge/linux-operating--system-black)

permalink: /docs/gen-ai-with-gemini-api/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-02-23T21:36:18-04:00
toc: true
sidebar:
  - title: "Find Your Guideline"
    image: "/assets/pictures/4.gif"
    image_alt: "image"
    text: "The wise guide does not give the right answers, but leads you to the right questions."
---

## **Getting Started with the Gemini API in Vertex AI (GSP1209)**

### Overview

This lab provides a hands-on introduction to using the Gemini API within Vertex AI. You'll leverage the Vertex AI SDK for Python to interact with the powerful Gemini 1.5 Pro model, exploring its capabilities through a variety of tasks. These tasks include generating text from different input types (text prompts, images, and videos), as well as experimenting with various features and configuration options to fine-tune your results. This experience will equip you with the essential skills to effectively utilize the Gemini API for diverse generative AI applications.

#### Gemini

[Gemini](https://deepmind.google/technologies/gemini/) is a family of powerful generative AI models developed by Google DeepMind, capable of understanding and generating various forms of content, including text, code, images, audio, and video.

**Gemini API in Vertex AI**
The Gemini API in Vertex AI provides a unified interface for interacting with Gemini models. This allows developers to easily integrate these powerful AI capabilities into their applications. For the most up-to-date details and specific features of the latest versions, please refer to the official [Gemini documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models#gemini-models).

**Gemini Models**
- [Gemini Pro](https://deepmind.google/technologies/gemini/pro/): Designed for complex reasoning, including:
    - Analyzing and summarizing large amounts of information.
    - Sophisticated cross-modal reasoning (across text, code, images, etc.).
    - Effective problem-solving with complex codebases.
- [Gemini Flash](https://deepmind.google/technologies/gemini/flash/): Optimized for speed and efficiency, offering:
    - Sub-second response times and high throughput.
    - High quality at a lower cost for a wide range of tasks.
    - Enhanced multimodal capabilities, including improved spatial understanding, new output modalities (text, audio, images), and native tool use (Google Search, code execution, and third-party functions).

#### Prerequisites

Before starting this lab, you should be familiar with:
- Basic Python programming.
- General API concepts.
- Running Python code in a Jupyter notebook on [Vertex AI Workbench](https://cloud.google.com/vertex-ai/docs/workbench/introduction).

#### Objectives

In this lab, you will learn how to:
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

---

### Task 1. Open the notebook in Vertex AI Workbench

1. In the Google Cloud console, on the Navigation menu (Navigation menu icon), click **Vertex AI > Workbench**.

2. Find the `Workbench instance name` instance and click on the **Open JupyterLab** button.

The JupyterLab interface for your Workbench instance opens in a new browser tab.

---

### Task 2. Set up the notebook

1. Open the `notebook name` file.

2. In the **Select Kernel** dialog, choose **Python 3** from the list of available kernels.

3. Run through the **Getting Started** and the **Import libraries** sections of the notebook.

For **Project ID**, use `Project ID`, and for **Location**, use `Region`.

**Note:** You can skip any notebook cells that are noted **Colab only**. If you experience a `429` response from any of the notebook cell executions, wait 1 minute before running the cell again to proceed.
{:.notice--info}

In the following sections, you will run through the notebook cells to see how to use the **Gemini API** in **Vertex AI**.

---

### Task 3. Use the Gemini 1.5 Pro model

The **Gemini 1.5 Pro** (`gemini-1.5-pro`) model is designed to handle natural language tasks, multi-turn text and code chat, and code generation. In this task, run through the notebook cells to see how to use the Gemini 1.5 Pro model to generate text from text prompts.

#### Generate text from text prompts

Send a text prompt to the model using the `generate_content` method. The `generate_content` method can handle a wide variety of use cases, including multi-turn chat and multimodal input, depending on what the underlying model supports.

- Run through the **Generate text from text prompts** section of the notebook.


#### Streaming

By default, the model returns a response after completing the entire generation process. You can also stream the response as it is being generated, and the model will return chunks of the response as soon as they are generated.

- Run through the **Streaming** section of the notebook.


#### Try your own prompts

- Run through the **Try your own prompts** section of the notebook.


#### Safety filters

The Gemini API provides **safety filters** that you can adjust across multiple filter categories to restrict or allow certain types of content. You can use these filters to adjust what's appropriate for your use case. See the **[Configure safety filters](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-filters)** page for details.

When you make a request to Gemini, the content is analyzed and assigned a safety rating. You can inspect the safety ratings of the generated content by printing out the model responses, as in this example:

- Run through the **Safety filters** section of the notebook.


#### Test chat prompts

The Gemini API supports natural **multi-turn conversations** and is ideal for text tasks that require back-and-forth interactions. The following examples show how the model responds during a multi-turn conversation.

- Run through the **Test chat prompts** section of the notebook.


---

### Task 4. Generate text from a multimodal prompt

**Gemini 1.5 Pro** (`gemini-1.5-pro`) is a multimodal model that supports multimodal prompts. You can include **text, image(s), and video** in your prompt requests and get text or code responses.

#### Generate text from local image and text

- Run through the **Generate text from local image and text** section of the notebook.


#### Generate text from text and image prompts

- Run through the **Generate text from text & image(s)** section of the notebook.


#### Combining multiple images and text prompts for few-shot prompting

- Run through the **Combining multiple images and text prompts for few-shot prompting** section of the notebook.


#### Generate text from a video file

- Run through the **Generate text from a video file** section of the notebook.


#### Direct analysis of publicly available web media

- Run through the **Direct analysis of publicly available web media** section of the notebook.


---

### Congratulations!

In this lab, you delved into the utilization of the **Gemini API in Vertex AI** along with the **Vertex AI SDK for Python** to interact with the **Gemini 1.5 Pro** (`gemini-1.5-pro`) model. Through these exercises, you gained practical insights into the capabilities of the Gemini API in Vertex AI and its seamless integration with the Python SDK.


---

## **Multimodality with Gemini (GSP1210)** 

### Overview

This lab introduces you to Gemini, a family of multimodal generative AI models developed by Google. You'll use the Gemini API to explore how Gemini Flash can understand and generate responses based on text, images, and video.

Gemini's multimodal capabilities enable it to:

Analyze images: Detect objects, understand user interfaces, interpret diagrams, and compare visual similarities and differences.
Process videos: Generate descriptions, extract tags and highlights, and answer questions about video content.
You'll experiment with these features through hands-on tasks using the Gemini API in Vertex AI.

#### Gemini

[Gemini](https://deepmind.google/technologies/gemini/) is a family of powerful generative AI models developed by Google DeepMind, capable of understanding and generating various forms of content, including text, code, images, audio, and video.

**Gemini API in Vertex AI**
The Gemini API in Vertex AI provides a unified interface for interacting with Gemini models. This allows developers to easily integrate these powerful AI capabilities into their applications. For the most up-to-date details and specific features of the latest versions, please refer to the official [Gemini documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models#gemini-models).

**Gemini Models**
- [Gemini Pro](https://deepmind.google/technologies/gemini/pro/): Designed for complex reasoning, including:
    - Analyzing and summarizing large amounts of information.
    - Sophisticated cross-modal reasoning (across text, code, images, etc.).
    - Effective problem-solving with complex codebases.
- [Gemini Flash](https://deepmind.google/technologies/gemini/flash/): Optimized for speed and efficiency, offering:
    - Sub-second response times and high throughput.
    - High quality at a lower cost for a wide range of tasks.
    - Enhanced multimodal capabilities, including improved spatial understanding, new output modalities (text, audio, images), and native tool use (Google Search, code execution, and third-party functions).

#### Prerequisites

Before starting this lab, you should be familiar with:
- Basic Python programming.
- General API concepts.
- Running Python code in a Jupyter notebook on [Vertex AI Workbench](https://cloud.google.com/vertex-ai/docs/workbench/introduction).


#### Objectives

In this lab, you will:

- Interact with the Gemini API in Vertex AI.
- Use the Gemini Flash model to analyze images and videos.
- Provide Gemini with text, image, and video prompts to generate informative responses.
- Explore practical applications of Gemini's multimodal capabilities.

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


---

### Task 1. Open the notebook in Vertex AI Workbench

1 In the Google Cloud console, on the Navigation menu, click **Vertex AI > Workbench**.

2. Find the `Workbench instance name` instance and click on the **Open JupyterLab** button.

The JupyterLab interface for your Workbench instance opens in a new browser tab.

---

### Task 2. Set up the notebook

1. Open the `notebook name` file.

2. In the **Select Kernel** dialog, choose **Python 3** from the list of available kernels.

3. Run through the **Getting Started** and the **Import libraries** sections of the notebook.

   - For **Project ID**, use `Project ID`, and for **Location**, use `Region`.

**Note:** You can skip any notebook cells that are noted **Colab only**. If you experience a `429` response from any of the notebook cell executions, wait 1 minute before running the cell again to proceed.
{:.notice--info}

---

### Task 3. Use the Gemini Flash model

**Gemini Flash** (`gemini-1.5-flash`) is a multimodal model that supports multimodal prompts. You can include text, image(s), and video in your prompt requests and get text or code responses.

In this task, run through the notebook cells to see how to use the Gemini Flash model. Return here to check your progress as you complete the objectives.

#### Image understanding across multiple images

One of the capabilities of Gemini is being able to reason across multiple images. In this example, you will use Gemini to calculate the total cost of groceries using an image of fruits and a price list.

Run through the **Image understanding across multiple images** section of the notebook.


#### Understanding Screens and Interfaces

Gemini can also extract information from appliance screens, UIs, screenshots, icons, and layouts. In this example, you will use Gemini to extract information from a stove to help a user navigate the UI and respond in different languages:

Run through the **Understanding Screens and Interfaces** section of the notebook.

#### Understanding entity relationships in technical diagrams

Gemini has multimodal capabilities that enable it to understand diagrams and take actionable steps, such as optimization or code generation. In this example, you will see how Gemini can decipher an entity relationship (ER) diagram, understand the relationships between tables, identify requirements for optimization in a specific environment like **BigQuery**, and even generate corresponding code.

Run through the **Understanding entity relationships in technical diagrams** section of the notebook.

#### Recommendations based on multiple images

Gemini is capable of image comparison and providing recommendations. This may be useful in industries like e-commerce and retail. In this example, you will use Gemini to recommend which pair of glasses would be better suited to an oval-shaped face.

Run through the **Recommendations based on multiple images** section of the notebook.


#### Similarity/Differences

Gemini can compare images and identify similarities or differences between objects. In this example, you will use Gemini to compare two images of the same location and identify the differences between them.

Run through the **Similarity/Differences** section of the notebook.


#### Generating a video description

Gemini can generate a description of a video. In this example, you will use Gemini to generate a description of a video of a **Mediterranean sea coast**.

Run through the **Generating a video description** section of the notebook.


#### Extracting tags of objects throughout the video

Gemini can also extract tags throughout a video. In this example, you will use Gemini to extract tags of objects throughout a video of a photo shoot and generate hashtags.

Run through the **Extracting tags of objects throughout the video** section of the notebook.


#### Asking more questions about a video

Gemini can answer questions about a video. In this example, you will use Gemini to answer questions about the video and return a JSON response.

Run through the **Asking more questions about a video** section of the notebook.


#### Retrieving extra information beyond the video

Gemini can also retrieve extra information beyond the video. In this example, you will use Gemini to retrieve extra information about the video, such as asking specific questions about a train route.

Run through the **Retrieving extra information beyond the video** section of the notebook.

----


### Congratulations!

You have now completed the lab! In this lab, you learned how to use the **Gemini API** in **Vertex AI** to generate text from text and image(s) prompts.

---

## **Introduction to Function Calling with Gemini (GSP1227)** 

### Overview

Function calling lets developers create a description of a function in their code, then pass that description to a language model in a request. The response from the model includes the name of a function that matches the description and the arguments to call it with.

Function calling is similar to Vertex AI Extensions in that they both generate information about functions. The difference between them is that function calling returns JSON data with the name of a function and the arguments to use in your code, whereas Vertex AI Extensions returns the function and calls it for you.

#### Gemini

[Gemini](https://deepmind.google/technologies/gemini/) is a family of powerful generative AI models developed by Google DeepMind, capable of understanding and generating various forms of content, including text, code, images, audio, and video.

**Gemini API in Vertex AI**
The Gemini API in Vertex AI provides a unified interface for interacting with Gemini models. This allows developers to easily integrate these powerful AI capabilities into their applications. For the most up-to-date details and specific features of the latest versions, please refer to the official [Gemini documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models#gemini-models).

**Gemini Models**
- [Gemini Pro](https://deepmind.google/technologies/gemini/pro/): Designed for complex reasoning, including:
    - Analyzing and summarizing large amounts of information.
    - Sophisticated cross-modal reasoning (across text, code, images, etc.).
    - Effective problem-solving with complex codebases.
- [Gemini Flash](https://deepmind.google/technologies/gemini/flash/): Optimized for speed and efficiency, offering:
    - Sub-second response times and high throughput.
    - High quality at a lower cost for a wide range of tasks.
    - Enhanced multimodal capabilities, including improved spatial understanding, new output modalities (text, audio, images), and native tool use (Google Search, code execution, and third-party functions).

#### Prerequisites

Before starting this lab, you should be familiar with:
- Basic Python programming.
- General API concepts.
- Running Python code in a Jupyter notebook on [Vertex AI Workbench](https://cloud.google.com/vertex-ai/docs/workbench/introduction).

#### Objectives

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

---


### Task 1. Open the notebook in Vertex AI Workbench

1. In the Google Cloud console, on the Navigation menu, click **Vertex AI > Workbench**.

2. Find the `Workbench instance name` instance and click on the **Open JupyterLab** button.

The JupyterLab interface for your Workbench instance opens in a new browser tab.

---

### Task 2. Set up the notebook

1. Open the `notebook name` file.

2. In the **Select Kernel** dialog, choose **Python 3** from the list of available kernels.

3. Run through the **Getting Started** and the **Import libraries** sections of the notebook.

For **Project ID**, use `Project ID`, and for **Location**, use `Region`.

**Note:** You can skip any notebook cells that are noted **Colab only**. If you experience a `429` response from any of the notebook cell executions, wait 1 minute before running the cell again to proceed.
{:.notice--info}

In the following sections, you will run through the notebook cells to see how to use the Gemini API in Vertex AI with the Vertex AI SDK for Python.


---

### Task 3. Using function calling for structured Google Store queries

When working with a generative text model, it can be difficult to coerce the LLM to give consistent responses in a structured format such as JSON. **Function calling** makes it easy to work with LLMs via prompts and unstructured inputs, and have the LLM return a structured response that can be used to call an external function.

You can think of function calling as a way to get structured output from user prompts and function definitions, use that structured output to make an API request to an external system, then return the function response to the LLM to generate a response to the user. In other words, function calling in Gemini extracts structured parameters from unstructured text or messages from users. In this example, you'll use function calling along with the chat modality in the Gemini model to help customers get information about products in the **Google Store**.

1. In this task, run through the notebook cells to see how to use the Gemini model to help customers get information about products in the **Google Store**.

---

### Task 4. Using function calling to geocode addresses with a maps API

In this example, you'll use the text modality in the Gemini API to define a function that takes multiple parameters as inputs. You'll use the function call response to then make a live API call to convert an address to latitude and longitude coordinates.

1. In this task, run through the notebook cells to see how to use the **Gemini Pro** model to generate a function call to geocode an address.

Here we used the **[OpenStreetMap Nominatim API](https://nominatim.openstreetmap.org/ui/search.html)** to geocode an address to make it easy to use and learn in this notebook. If you're working with large amounts of maps or geolocation data, you can use the **[Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding)**.


---

### Task 5. Using function calling for entity extraction

In the previous examples, you made use of the entity extraction functionality within **Gemini Function Calling** so that you could pass the resulting parameters to a REST API or client library. However, you might want to only perform the entity extraction step with **Gemini Function Calling** and stop there without actually calling an API. You can think of this functionality as a convenient way to transform unstructured text data into structured fields.

In this example, you'll build a **log extractor** that takes raw log data and transforms it into structured data with details about error messages.

1. In this task, run through the notebook cells to see how to use the **Gemini Pro** model to generate function calls to extract entities from log data.

---

### Congratulations!

Congratulations! In this lab, you learned how to use the **Gemini API** in **Vertex AI** to generate function calls from text prompts. You used the **Gemini Pro** model to generate function calls to help customers get information about products in the **Google Store**, geocode addresses, and extract entities from log data.

---

## **Explore Generative AI with the Gemini API in Vertex AI: Challenge Lab (GSP515)**

### Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Explore Generative AI with the Gemini API in Vertex AI](https://www.cloudskillsboost.google/course_templates/959) course. Are you ready for the challenge?

#### Topics tested

- Generate text using Gemini
- Create a function call using Gemini
- Describe video contents using Gemini


### Setup

**Note**: Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.
{: .notice--danger}

**Note**: Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.
{: .notice--danger}

### Challenge Scenario

As a developer at a pioneering startup specializing in AI-driven video content analysis, you're tasked with harnessing Gemini's cutting-edge capabilities to elevate the platform's functionality. Your mission is to implement three pivotal features using Gemini's APIs: text generation, function calls, and video content analysis.

Your long-term objective is to enhance the platform's capabilities, enabling it to automatically generate coherent and polished text, execute specific actions or commands, and describe video contents using Gemini's state-of-the-art AI capabilities. Your goal for today is to implement demos of these features using Gemini's APIs, ensuring they meet the expected standards before deploying them to production.

Your success in this challenge will not only advance the platform's functionality but also demonstrate your proficiency in leveraging Gemini's state-of-the-art AI capabilities to address real-world problems in the realm of video content analysis. Are you ready to take on the challenge?

----

### Task 1. Generate text using Gemini

In this section, you are tasked with calling the Gemini API via Cloud Shell to confirm your understanding of how to make API calls.

1. Open Cloud Shell and install the following Python dependencies for this task:
    
    ```sh
    pip3 install --upgrade --user google-cloud-aiplatform
    ```

2. Run the following command to set environment variables required:
    
    ```sh
    PROJECT_ID="Filled in at lab startup."
    LOCATION="Filled in at lab startup."
    API_ENDPOINT=${LOCATION}-aiplatform.googleapis.com
    MODEL_ID="gemini-1.0-pro"
    ```

3. Enable the APIs required to call Gemini APIs via Cloud Console.

    **Hint:** You can perform this step in Cloud Console in the **Vertex AI** section of the UI.
    {:.notice--info}


4. Call the `gemini-1.0-pro` LLM via `curl` in Cloud Shell. Use the following documentation to assist you in properly writing the `curl` command: **Send Chat Prompts to Gemini**. Ask the following question:
    
    ```bash
    Why is the sky blue?
    ```


---

### Task 2. Open the notebook in Vertex AI Workbench

1. In the **Google Cloud console**, on the Navigation menu, click **Vertex AI > Workbench**.

2. Find the `Workbench instance name` and click on the **Open JupyterLab** button.

The JupyterLab interface for your Workbench instance opens in a new browser tab.

---

### Task 3. Create a function call using Gemini

1. Click on the notebook name file.

2. In the **Select Kernel** dialog, choose **Python 3** from the list of available kernels.

3. Complete the missing parts of each cell to progress to the next section. These will be denoted with `INSERT` and an instruction to complete.


    **Note:** You can skip any notebook cells that are noted **Colab only**.
    {:.notice--info}

    **Note:** Ensure you can see the **weather-related data** in the response that is printed.
    {:.notice--info}

---

### Task 4. Describe video contents using Gemini

In this section, you are tasked with completing the Python code in the cells of a Jupyter notebook that leverage the **Gemini LLM** to describe the contents of a video.

1. Remain in **Vertex AI Workbench** and proceed to the cell with the comment `# Task 4`.

2. Complete the required sections of the notebook **notebook name** under **Task 4**.


---

### Congratulations!

Throughout this challenge, you've demonstrated your adeptness in leveraging **Gemini APIs** to generate text, create function calls, and describe video contents. Your work ensured that these features met the expected standards before deployment to production.

































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