---
title: | 
        **Automate Data Capture at Scale with Document AI** <br>
        ![Google Cloud Compute](https://img.shields.io/badge/google--cloud-compute--engine-blue)
        ![Nginx](https://img.shields.io/badge/nginx-web--server-green)
        ![Debian VM](https://img.shields.io/badge/debian-virtual--machine-red)
        ![Node.js](https://img.shields.io/badge/node.js-runtime--environment-brightgreen)
        ![Linux](https://img.shields.io/badge/linux-operating--system-black)

permalink: /docs/automate-data-capture/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-02-23T21:36:18-04:00
toc: true
sidebar:
  - title: "Find Your Guideline"
    image: "/assets/pictures/4.gif"
    image_alt: "image"
    text: "The wise guide does not give the right answers, but leads you to the right questions."
---

## **Create and Test a Document AI Processor (GSP924)**

### Overview

The Document AI API is a document understanding solution that takes unstructured data, such as documents and emails, and makes the data easier to understand, analyze, and consume. With the general form processor used in this lab, you can extract key/value pairs from a simple document.

In this lab you will learn how to create document parsers using Document AI, submit documents for processing via Google Cloud using the Cloud console & command line, and use Python to make synchronous API calls.

#### Objectives

You will learn how to perform the following tasks:

- Create and test Document AI processor using the console.
- Test Document AI processors using the command line.
- Test Document AI synchronous API calls using Python.

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



---


### Task 1. Enable the Cloud Document AI API

In this task, you will enable the Document AI API and create and test a general form processor. The general form processor will process any type of document and extract all the text content it can identify in the document. It is not limited to printed text; it can handle handwritten text and text in any orientation, supports multiple languages, and understands how form data elements are related to each other so that you can extract key/value pairs for form fields that have text labels.

#### Enable the Cloud Document AI API

Before you can begin using Document AI, you must enable the API.

1. From the Navigation menu (Navigation menu icon), click **APIs & services > Library**.
2. Search for **Cloud Document AI API**, then click the **Enable** button to use the API in your Google Cloud project.
3. If the Cloud Document AI API is already enabled, you will see the **Manage** button, and you can continue with the rest of the lab.
4. Click **Check my progress** to verify the objectives.


### Task 2. Create and test a general form processor

Next, you will create a Document AI processor using the **Document AI Form Parser**.

#### Create a processor

1. In the console, from the Navigation menu (Navigation menu icon), click **Document AI > Overview**.
2. Click **Explore processors**.
3. Click **Create Processor** for **Form Parser**, which is a type of general processor.
4. Specify the processor name as `form-parser` and select the region **US (United States)** from the list.
5. Click **Create** to create the general form-parser processor.
6. This will create the processor and return to the processor details page that will display the **Processor ID**, status, and the prediction endpoint.
7. Make a note of the **Processor ID** as you will use it with `curl` to make a **POST** call to the API in a later task.

#### Download the sample form

In this task, you will download the sample form from Cloud Storage. In order to upload this form in the next task, you first need to download it to your local machine.

- Download the [`form.pdf`](https://storage.googleapis.com/cloud-training/document-ai/generic/form.pdf) file to your local machine.
- The file should download directly. If the file opens in your browser instead, then download the file using the file controls within your browser.
- The `form.pdf` file is a **HEALTH INTAKE FORM** with sample handwritten data.

#### Upload a form for Document AI processing

Next, you will upload the sample form you downloaded to your **form-parser** processor. It will then be analyzed, and the results displayed in the console.

1. On the **form-parser** page, click the **Upload Test Document** button. A dialog will pop up—select the file you downloaded in the previous task for uploading.
2. A progress bar will indicate the level of completion of the analysis process, and finally, the results will be displayed.
3. You will see that the general processor has captured the data on the form into a set of **key/value pairs**.
4. The **key/value pairs** parsed from the source document will be presented in the console.
5. The left-hand pane lists the data, and the right-hand pane highlights with blue rectangles the source locations in the parsed document.
6. Examine the output and compare the results with the source data.


In this task, you will test a **Document AI general form processor** by making API calls from the command line.

### Task 3. Set up the lab instance

In this section, you will set up the lab instance to use the **Document AI API**.

#### Connect to the lab VM instance using SSH

You will perform the remainder of the lab tasks in the **lab VM** called `document-ai-dev`.

1. From the Navigation menu (Navigation menu icon), click **Compute Engine > VM Instances**.
2. Click the **SSH** link for the VM Instance called `document-ai-dev`.


    You will need the **Document AI processor ID** of the processor you created in **Task 1** for this step.

3. If you did not save it, then in the **Cloud Console** tab:
   - Open the Navigation menu (Navigation menu icon).
   - Click **Document AI > Processors**.
   - Click the name of your processor to open the details page.
   - From here, you can copy the **Processor ID**.

4. In the SSH session, create an **environment variable** to contain the **Document AI processor ID**:

   ```bash
   export PROCESSOR_ID=[your processor id]
   ```

5. In the SSH session, confirm that the environment variable contains the **Document AI processor ID**:

   ```bash
   echo Your processor ID is: $PROCESSOR_ID
   ```

   This should print out the Processor ID similar to the following:

   ```bash
   Your processor ID is: 4897d834d2f4415d
   ```

#### Authenticate API requests

In order to make requests to the **Document AI API**, you need to provide a **valid credential**. In this task, you will create a **service account**, limit the permissions granted to that service account to those required for the lab, and then generate a **credential** for that account that can be used to authenticate **Document AI API** requests.

1. Set an environment variable with your **Project ID**, which you will use throughout this lab:

   ```bash
   export PROJECT_ID=$(gcloud config get-value core/project)
   ```

2. Create a new **service account** to access the **Document AI API**:

   ```bash
   export SA_NAME="document-ai-service-account"
   gcloud iam service-accounts create $SA_NAME --display-name $SA_NAME
   ```

3. Bind the **service account** to the [**`Document AI API user role`**](https://cloud.google.com/document-ai/docs/access-control/iam-roles):

   ```bash
   gcloud projects add-iam-policy-binding ${PROJECT_ID} \
     --member="serviceAccount:$SA_NAME@${PROJECT_ID}.iam.gserviceaccount.com" \
     --role="roles/documentai.apiUser"
   ```

4. Create the credentials that will be used to log in as your new **service account** and save them in a **JSON file** called `key.json` in your working directory:

   ```bash
   gcloud iam service-accounts keys create key.json \
     --iam-account $SA_NAME@${PROJECT_ID}.iam.gserviceaccount.com
   ```

5. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable:

   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="$PWD/key.json"
   ```

6. Check that the `GOOGLE_APPLICATION_CREDENTIALS` environment variable is set to the full path of the credentials JSON file:

   ```bash
   echo $GOOGLE_APPLICATION_CREDENTIALS
   ```

This environment variable is used by the gcloud command line tool to specify which credentials to use when executing commands. To read more about this form authentication, see the [Application Default Credentials guide](https://google.aip.dev/auth/4110).

#### Download the sample form to the VM instance

Now you can download a **sample form** and then **base64 encode** it for submission to the **Document AI API**.

```bash
gsutil cp gs://cloud-training/gsp924/health-intake-form.pdf .
```

Create a JSON request file for submitting the **base64 encoded** form for processing:

```bash
echo '{"inlineDocument": {"mimeType": "application/pdf","content": "' > temp.json
base64 health-intake-form.pdf >> temp.json
echo '"}}' >> temp.json
cat temp.json | tr -d \n > request.json
```

---

### Task 4. Make a Synchronous Process Document Request Using curl

In this task, you process the sample document by making a call to the synchronous Document AI API endpoint using `curl`.

Submit a Form for Processing via curl. The result will be stored in `output.json`:

```sh
export LOCATION="us"
export PROJECT_ID=$(gcloud config get-value core/project)
curl -X POST \
-H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
-H "Content-Type: application/json; charset=utf-8" \
-d @request.json \
https://${LOCATION}-documentai.googleapis.com/v1beta3/projects/${PROJECT_ID}/locations/${LOCATION}/processors/${PROCESSOR_ID}:process > output.json
```

Make sure your `output.json` file contains the results of the API call:

```sh
cat output.json
```

If you receive an authentication error, make sure you have set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to the credentials JSON file you created earlier. You may need to wait a few minutes for the IAM policy to propagate, so try again if you receive an error.

The access token for the Cloud IAM service account is generated on the fly and passed to the API using the `Authorization:` HTTP header. The response contains JSON formatted data that is saved to the file `output.json`.

#### Extract the Form Entities

Next, explore some of the information extracted from the sample form.

Extract the raw text detected in the document as follows:

```sh
sudo apt-get update
sudo apt-get install jq
cat output.json | jq -r ".document.text"
```

This lists all of the text detected in the uploaded document.

Extract the list of form fields detected by the form processor:

```sh
cat output.json | jq -r ".document.pages[].formFields"
```

This lists the object data for all of the form fields detected in the document. The `textAnchor.startIndex` and `textAnchor.endIndex` values for each form can be used to locate the names of the detected forms in the `document.text` field. The Python script that you will use in the next task will do this mapping for you.

The JSON file is quite large as it includes the base64 encoded source document as well as all of the detected text and document properties. You can explore the JSON file by opening the file in a text editor or by using a JSON query tool like `jq`.

Check that a document has been processed by the Document AI API.

---

### Task 5. Test a Document AI Form Processor Using the Python Client Libraries

Make a synchronous call to the Document AI API using the Python Document AI client libraries.

Now you will process a document using the synchronous endpoint. For processing large amounts of documents at a time, you can use the asynchronous API. To learn more about using the Document AI APIs, read [the guide](https://cloud.google.com/document-ai/docs/receipt-parser).

If you want to run Python scripts directly, you need to provide the appropriate credentials to those scripts so that they can make calls to the API using a service account that has been configured with the correct permissions. To read more about how to configure this form of authentication, see the [Authenticating as a service account](https://cloud.google.com/docs/authentication/getting-started) documentation.

#### Configure Your VM Instance to Use the Document AI Python Client

Now install the Python Google Cloud client libraries into the VM Instance.

Enter the following command in the SSH terminal shell to import the lab files into your VM Instance:

```sh
gsutil cp gs://cloud-training/gsp924/synchronous_doc_ai.py .
```

Enter the following command to install the Python client libraries required for Document AI and the other libraries required for this lab:

```sh
sudo apt install python3-pip
python3 -m pip install --upgrade google-cloud-documentai google-cloud-storage prettytable
```

You should see output indicating that the libraries have been installed successfully.

#### Review the Document AI API Python Code

Take a minute to review the Python code in the sample file. You can use an editor of your choice, such as `vi` or `nano`, to review the code in the SSH session or you can use the command from the previous section to copy the example code into the Cloud Shell and use the Code Editor to view the source code if you prefer.

```python
import argparse
from google.cloud import documentai_v1beta3 as documentai
from google.cloud import storage
from prettytable import PrettyTable

parser = argparse.ArgumentParser()
parser.add_argument("-P", "--project_id", help="Google Cloud Project ID")
parser.add_argument("-D", "--processor_id", help="Document AI Processor ID")
parser.add_argument("-F", "--file_name", help="Input file name", default="form.pdf")
parser.add_argument("-L", "--location", help="Proocessor Location", default="us")
args = parser.parse_args()

def process_document(project_id, location, processor_id, file_path ):

        # Instantiates a client
        client = documentai.DocumentProcessorServiceClient()

        # The full resource name of the processor, e.g.:
        # projects/project-id/locations/location/processor/processor-id
        # You must create new processors in the Cloud Console first
        name = f"projects/{project_id}/locations/{location}/processors/{processor_id}"

        # Read the file into memory
        with open(file_path, "rb") as image:
            image_content = image.read()
        
        # Create the document object 
        document = {"content": image_content, "mime_type": "application/pdf"}

        # Configure the process request
        request = {"name": name, "document": document}

        # Use the Document AI client synchronous endpoint to process the request
        result = client.process_document(request=request)

        return result.document

document=process_document(args.project_id,args.location,args.processor_id,args.file_name  )

print("Document processing complete.")
# print the raw text
print("Text: \n{}\n".format(document.text))

# Define a function to retrieve an object dictionary for a named element
def get_text(doc_element: dict, document: dict):
    """
    Document AI identifies form fields by their offsets
    in document text. This function converts offsets
    to text snippets.
    """
    response = ""
    # If a text segment spans several lines, it will
    # be stored in different text segments.
    for segment in doc_element.text_anchor.text_segments:
        start_index = (
            int(segment.start_index)
            if segment in doc_element.text_anchor.text_segments
            else 0
        )
        end_index = int(segment.end_index)
        response += document.text[start_index:end_index]
    return response

# Grab each key/value pair and their corresponding confidence scores.
document_pages = document.pages

print("Form data detected:\n")
# For each page fetch each form field and display fieldname, value and confidence scores
for page in document_pages:
    print("Page Number:{}".format(page.page_number))
    for form_field in page.form_fields:
        fieldName=get_text(form_field.field_name,document)
        nameConfidence = round(form_field.field_name.confidence,4)
        fieldValue = get_text(form_field.field_value,document)
        valueConfidence = round(form_field.field_value.confidence,4)
        print(fieldName+fieldValue +"  (Confidence Scores: (Name) "+str(nameConfidence)+", (Value) "+str(valueConfidence)+")\n")
```


The first two code blocks import the required libraries and parse parameters to initialize variables that identify the Document AI processor and input data.

```python
import argparse
from google.cloud import documentai_v1beta3 as documentai
from google.cloud import storage
from prettytable import PrettyTable

parser = argparse.ArgumentParser()
parser.add_argument("-P", "--project_id", help="Google Cloud Project ID")
parser.add_argument("-D", "--processor_id", help="Document AI Processor ID")
parser.add_argument("-F", "--file_name", help="Input file name", default="form.pdf")
parser.add_argument("-L", "--location", help="Processor Location", default="us")
args = parser.parse_args()
```

The `process_document` function is used to make a synchronous call to a Document AI processor. The function creates a Document AI API client object.

```python
def process_document(project_id, location, processor_id, file_path):
    client = documentai.DocumentProcessorServiceClient()
    name = f"projects/{project_id}/locations/{location}/processors/{processor_id}"
    with open(file_path, "rb") as image:
        image_content = image.read()
    document = {"content": image_content, "mime_type": "application/pdf"}
    request = {"name": name, "document": document}
    result = client.process_document(request=request)
    return result.document
```

The script then calls the `process_document` function with the required parameters and saves the response in the `document` variable.

```python
document = process_document(args.project_id, args.location, args.processor_id, args.file_name)
```

The final block of code prints the `.text` property that contains all of the text detected in the document then displays the form information using the text anchor data for each of the form fields detected by the form parser.

```python
print("Document processing complete.")
print("Text: \n{}\n".format(document.text))
```

---

### Task 6. Run the Document AI Python Code

Execute the sample code and process the same file as before.

Create environment variables for the Project ID and the IAM service account credentials file:

```sh
export PROJECT_ID=$(gcloud config get-value core/project)
export GOOGLE_APPLICATION_CREDENTIALS="$PWD/key.json"
```

Call the `synchronous_doc_ai.py` Python program with the parameters it requires:

```sh
python3 synchronous_doc_ai.py \
--project_id=$PROJECT_ID \
--processor_id=$PROCESSOR_ID \
--location=us \
--file_name=health-intake-form.pdf | tee results.txt
```

You will see the following block of text output:

```
FakeDoc M.D. HEALTH INTAKE FORM
Please fill out the questionnaire carefully...
Date: Sally Walker
Name: 9/14/19 ...
```

The first block of text is a single text element containing all of the text in the document. This block of text does not include any awareness of form based data so some items, such as the Date and Name entries, are mixed together in this raw text value.

The code then outputs a more structured view of the data using the form data that the form-parser has inferred from the document structure. This structured output also includes the confidence score for the form field names and values. The output from this section gives a much more useful mapping between the form field names and the values, as can be seen with the link between the Date and Name form fields and their correct values.

```bash
Form data detected:

Page Number:1 Phone #: (906) 917-3486 (Confidence Scores: (Name) 1.0, (Value) 1.0) ... Date: 9/14/19 (Confidence Scores: (Name) 0.9999, (Value) 0.9999) ... Name: Sally Walker (Confidence Scores: (Name) 0.9973, (Value) 0.9973) ... 
```

---

### Congratulations!

You've successfully used the Document AI API to extract data from documents using a general form processor. In this lab, you created and tested a Document AI processor using the console and the command line, and made Document AI synchronous API calls using Python.



## **Process Documents with Python Using the Document AI API (GSP925)** 

### Overview

The Document AI API is a document understanding solution that takes unstructured data, such as documents and emails, and makes the data easier to understand, analyze, and consume.

In this lab, you will use the Document AI API with Python to create various processors, including a general form processor and a Document OCR processor, then make synchronous and asynchronous calls to the API using Python. This lab creates a Vertex AI Workbench instance for you that you will use with JupyterLab notebooks to work with the Document AI Python Client modules.

#### Objectives

In this lab you will learn how to:

- Enable the Document AI API and create processors.
- Install the client library for Python in a Vertex AI Workbench instance.
- Parse data from a scanned form using Python to make a synchronous API call.
- Parse data from scanned forms using Python to make an asynchronous API call.

### Setup and Requirements

**Note**: Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.
{: .notice--danger}

**Note**: Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.
{: .notice--danger}

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


---


### Task 1. Create and Test a General Form Processor

In this task, you will enable the Document AI API and create and test a general form processor. The general form processor will process any type of document and extract all the text content it can identify in the document. It is not limited to printed text, it can handle handwritten text and text in any orientation, supports a number of languages, and understands how form data elements are related to each other so that you can extract key:value pairs for form fields that have text labels.

#### Enable the Cloud Document AI API

Before you can begin using Document AI, you must enable the API.

1. In Cloud Console, from the Navigation menu (Navigation menu icon), click **APIs & services > Library**.
2. Search for **Cloud Document AI API**, then click the **Enable** button to use the API in your Google Cloud project.
3. If the Cloud Document AI API is already enabled, you will see the **Manage** button, and you can continue with the rest of the lab.
4. Check that the Cloud Document AI API has been enabled.

#### Create a General Form Processor

Create a Document AI processor using the Document AI form parser.

1. In the console, on the **Navigation menu (Navigation menu icon)**, click **Document AI > Overview**.
2. Click **Explore processors** and click **Create Processor** for **Form Parser**, which is a type of general processor.
3. Specify the processor name as `form-parser` and select the region **US (United States)** from the list.
4. Click **Create** to create the general `form-parser` processor.

This will create the processor and return to the processor details page that will display the **Processor ID, status,** and the **prediction endpoint**.

Make a note of the **Processor ID** as you will need to update variables in JupyterLab notebooks with the Processor ID in later tasks.

---

### Task 2. Configure Your Vertex AI Workbench Instance to Perform Document AI API Calls

Next, connect to JupyterLab running on the Vertex AI Workbench instance that was created for you when the lab was started, then configure that environment for the remaining lab tasks.

1. In the **Google Cloud Console**, on the **Navigation menu (Navigation menu icon)**, click **Vertex AI > Workbench**.
2. Find the Workbench instance name and click on the **Open JupyterLab** button.
3. The JupyterLab interface for your Workbench instance opens in a new browser tab.
4. Click **Terminal** to open a terminal shell inside the Vertex AI Workbench instance.
5. Enter the following command in the terminal shell to import the lab files into your Vertex AI Workbench instance:
   ```sh
   gsutil cp notebook_files_path .
   ```
6. Enter the following command in the terminal shell to install the Python client libraries required for Document AI and other required libraries:
   ```sh
   python -m pip install --upgrade google-cloud-core google-cloud-documentai google-cloud-storage prettytable
   ```
   You should see output indicating that the libraries have been installed successfully.

   **Note:** In case of permission-related errors, re-run the command to ensure successful installation of the libraries. It can take a few minutes for the permissions to be applied.

7. Enter the following command in the terminal shell to import the sample health intake form:
   ```sh
   gsutil cp form_path form.pdf
   ```
8. In the notebook interface, open the **JupyterLab notebook** called `notebook_name`.
9. In the **Select Kernel** dialog, choose **Python 3** from the list of available kernels.
10. Check that the Vertex AI instance has been prepared for synchronous Document AI API calls.

---

### Task 3. Make a Synchronous Process Document Request

Make a process document call using a synchronous Document AI API call. For processing large amounts of documents at a time, you can also use the asynchronous API, which you will use in a later task.

#### Review the Python Code for Synchronous Document AI API Calls

Take a minute to review the Python code in the `notebook_name` notebook.

Import Required Libraries and Initialize Variables

```python
from google.cloud import documentai_v1beta3 as documentai
from google.cloud import storage
from prettytable import PrettyTable

project_id = %system gcloud config get-value core/project
project_id = project_id[0]
location = 'us'
file_path = 'form.pdf'
```

Set Your Processor ID

```python
processor_id = 'PROCESSOR_ID' # TODO: Replace with a valid Processor ID
```

You will need the **Document AI processor ID** of the processor you created in Task 1 for this step.

**Tip:** If you did not save it, then in the **Cloud Console** tab, open the **Navigation menu (Navigation menu icon)**, click **Document AI > My processors**, then click the name of your processor to open the details page. From here, you can copy the processor ID.

The **Process Document Function** code cell defines the `process_document` function that is used to make a synchronous call to a Document AI processor. The function creates a Document AI API client object.

The processor name required by the API call is created using the `project_id`,`locations`, and `processor_id` parameters and the sample PDF document is read in and stored in a mime_type structure.

The function creates a request object that contains the full processor name of the document and uses that object as the parameter for a synchronous call to the Document AI API client. If the request is successful the document object that is returned will include properties that contain the entities detected in the form.

```python
def process_document(
        project_id=project_id, location=location,
        processor_id=processor_id,  file_path=file_path
):
    # Instantiates a client
    client = documentai.DocumentProcessorServiceClient()
    
    name = f"projects/{project_id}/locations/{location}/processors/{processor_id}"
    with open(file_path, "rb") as image:
        image_content = image.read()
    
    document = {"content": image_content, "mime_type": "application/pdf"}
    request = {"name": name, "document": document}
    
    result = client.process_document(request=request)
    return result.document
```

The **Process Document** code cell calls the `process_document` function, saves the response in the `document` variable, and prints the raw text that has been detected. All of the processors will report some data for the `document.text` property.

```python
document = process_document()
print("Document processing complete.")
print("Text: {}".format(document.text))
```

The **Get Text Function** code cell defines the `get_text()` function that retrieves the text for a named element using the `text_anchor` `start_index` and `end_index` properties of the named element's `text_segments`. This function is used to retrieve the form name and form value for form data if that data is returned by the processor.

```python
def get_text(doc_element: dict, document: dict):
    """
    Document AI identifies form fields by their offsets
    in document text. This function converts offsets
    to text snippets.
    """
    response = ""
    for segment in doc_element.text_anchor.text_segments:
        start_index = (
            int(segment.start_index)
            if segment in doc_element.text_anchor.text_segments
            else 0
        )
        end_index = int(segment.end_index)
        response += document.text[start_index:end_index]
    return response
```

The **Display Form Data** cell iterates over all pages that have been detected and for each `form_field` detected it uses the `get_text()` function to retrieve the field name and field value. Those values are then printed out, along with their corresponding confidence scores. Form data will be returned by processors that use the general form parser or the specialized parsers but will not be returned by processors that were created with the Document OCR parser.

```python
document_pages = document.pages
print("Form data detected:\n")

for page in document_pages:
    print("Page Number:{}".format(page.page_number))
    for form_field in page.form_fields:
        fieldName = get_text(form_field.field_name, document)
        nameConfidence = round(form_field.field_name.confidence, 4)
        fieldValue = get_text(form_field.field_value, document)
        valueConfidence = round(form_field.field_value.confidence, 4)
        print(fieldName + fieldValue + "  (Confidence Scores: (Name) " + str(nameConfidence) + ", (Value) " + str(valueConfidence) + ")\n")
```

The `Display Entity Data` cell extracts entity data from the document object and displays the entity type, value, and confidence properties for each entity detected. Entity data is only returned by processors that use specialized Document AI parsers such as the Procurement Expense parser. The general form parser and the Document OCR parser will not return entity data.

Entity data is only returned by processors that use specialized Document AI parsers, such as the Procurement Expense parser. The general form parser and the Document OCR parser will not return entity data.

```python
if 'entities' in dir(document):
    entities = document.entities
    # Grab each key/value pair and their confidence scores.
    table = PrettyTable(['Type', 'Value', 'Confidence'])
    for entity in entities:
    entity_type = entity.type_
    value = entity.mention_text
    confience = round(entity.confidence,4)
    table.add_row([entity_type, value, confience])
    print(table)
else:
    print("Document does not contain entity data.")
```

---

### Task 4. Run the synchronous Document AI Python code

Execute the code to make synchronous calls to the Document AI API in the JupyterLab notebook.

In the second Set your Processor ID code cell replace the `PROCESSOR_ID` placeholder text with the Processor ID for the form-parser processor you created in an earlier step.

Select the first cell, click the **Run** menu and then click **Run Selected Cell and All Below** to run all the code in the notebook.

If you have used the sample health intake form, you will see data similar to the following for the output cell for the form data:

**Form data detected:**

```
Page Number:1 Phone #: (906) 917-3486 (Confidence Scores: (Name) 1.0, (Value) 1.0) ... Date: 9/14/19 (Confidence Scores: (Name) 0.9999, (Value) 0.9999) ... Name: Sally Walker (Confidence Scores: (Name) 0.9973, (Value) 0.9973) ...
```

If you are able to create a specialized processor, the final cell will display entity data; otherwise, it will show an empty table.

In the JupyterLab menu, click **File** and then click **Save Notebook** to save your progress.

Check that a document has been processed using the synchronous Cloud Document API.

---

### Task 5. Create a Document AI Document OCR processor

In this task, you will create a Document AI processor using the general Document OCR parser.

1. From the **Navigation menu**, click **Document AI > Overview**.
2. Click **Explore Processors** and then click **Create Processor** for Document OCR. This is a type of general processor.
3. Specify the processor name as `ocr-processor` and select the region **US (United States)** from the list.
4. Click **Create** to create your processor.
5. Make a note of the processor ID. You will need to specify this in a later task.

---

### Task 6. Prepare your environment for asynchronous Document AI API calls

In this task, you upload the sample JupyterLab notebook to test asynchronous Document AI API calls and copy some sample forms for the lab to Cloud Storage for asynchronous processing.

1. Click the **Terminal** tab to re-open the terminal shell inside the Vertex AI Workbench instance.
2. Create a Cloud Storage bucket for the input documents and copy the sample W2 forms into the bucket:

```bash
export PROJECT_ID="$(gcloud config get-value core/project)"
export BUCKET="${PROJECT_ID}"_doc_ai_async

gsutil mb gs://${BUCKET}
gsutil -m cp async_files_path gs://${BUCKET}/input
```

3. In the notebook interface, open the JupyterLab notebook called `notebook name`.
4. In the **Select Kernel** dialog, choose **Python 3** from the list of available kernels.
5. Check that the Vertex AI instance has been prepared for asynchronous Document AI API calls.

---

### Task 7. Make an asynchronous process document request

#### Review the Python code for asynchronous Document AI API calls

Take a minute to review the Python code in the `notebook name` notebook.

The first code cell imports the required libraries:

```python
from google.cloud import documentai_v1beta3 as documentai
from google.cloud import storage
import re
import os
import pandas as pd
import simplejson as json
```

The **Set your Processor ID** code cell sets the Processor ID that you have to manually set before you can process documents with the notebook.

```python
processor_id = "PROCESSOR_ID"  # TODO: Replace with a valid Processor ID
```

The **Set your variables** code cell defines the parameters that will be used to make the asynchronous call, including the location of the input and output Cloud Storage buckets that will be used for the source data and output files.

```python
project_id = %system gcloud config get-value core/project
project_id = project_id[0]
location = 'us'           # Replace with 'eu' if processor does not use 'us' location
gcs_input_bucket  = project_id+"_doc_ai_async"   # Bucket name only, no gs:// prefix
gcs_input_prefix  = "input/"                     # Input bucket folder e.g. input/
gcs_output_bucket = project_id+"_doc_ai_async"   # Bucket name only, no gs:// prefix
gcs_output_prefix = "output/"                    # Input bucket folder e.g. output/
timeout = 300
```

The **Define Google Cloud client objects** code cell initializes the Document AI and Cloud Storage clients.

```python
client_options = {"api_endpoint": "{}-documentai.googleapis.com".format(location)}
client = documentai.DocumentProcessorServiceClient(client_options=client_options)
storage_client = storage.Client()
```

The **Create input configuration** code cell creates the input configuration array parameter for the source data that will be passed to the asynchronous Document AI request.

```python
blobs = storage_client.list_blobs(gcs_input_bucket, prefix=gcs_input_prefix)
input_configs = []
print("Input Files:")
for blob in blobs:
    if ".pdf" in blob.name:
        source = "gs://{bucket}/{name}".format(bucket = gcs_input_bucket, name = blob.name)
        print(source)
        input_config = documentai.types.document_processor_service.BatchProcessRequest.BatchInputConfig(
            gcs_source=source, mime_type="application/pdf"
        )
        input_configs.append(input_config)
```

The **Create output configuration** code cell creates the output parameter for the asynchronous request.

```python
destination_uri = f"gs://{gcs_output_bucket}/{gcs_output_prefix}"
output_config = documentai.types.document_processor_service.BatchProcessRequest.BatchOutputConfig(
    gcs_destination=destination_uri
)
```

The **Create the Document AI API request** code cell builds the asynchronous Document AI batch process request object.

```python
name = f"projects/{project_id}/locations/{location}/processors/{processor_id}"
request = documentai.types.document_processor_service.BatchProcessRequest(
    name=name,
    input_configs=input_configs,
    output_config=output_config,
)
```

The **Start the batch (asynchronous) API operation** code cell makes an asynchronous document process request.

```python
operation = client.batch_process_documents(request)
# Wait for the operation to finish
operation.result(timeout=timeout)
print ("Batch process  completed.")
```

#### Run the asynchronous Document AI Python code

Use the sample code provided for you in the JupyterLab notebook to process documents asynchronously using a Document AI batch processing request.

1. In the second code cell, replace the `PROCESSOR_ID` placeholder text with the Processor ID.
2. Select the first cell, click the **Run** menu, and then click **Run Selected Cell and All Below**.
3. The notebook will take a minute or two to complete the batch process operation.
4. If the asynchronous job times out, rerun the remaining cells after the **Start the batch (asynchronous) API operation** cell.

**Your output will contain text listing the Document AI data detected in each file.**

---

### Congratulations

You've successfully made synchronous and asynchronous calls to the Document AI API. In this lab, you:

- Enabled the Document AI API and created processors.
- Installed the client library for Python in a Vertex AI Workbench instance.
- Parsed data from a scanned form using Python to make a synchronous API call.
- Parsed data from scanned forms using Python to make an asynchronous API call.

---

## **Build an End-to-End Data Capture Pipeline using Document AI (GSP927)** 

### Overview

The Document AI API is a document understanding solution that takes unstructured data, such as documents and emails, and makes the data easier to understand, analyze, and consume.

In this lab, you'll build a document processing pipeline to automatically analyze documents uploaded to Cloud Storage. The pipeline uses a Cloud Run function with a Document AI form processor to extract data and store it in BigQuery. If the form includes address fields, the address data is sent to a Pub/Sub topic. This triggers a second Cloud Run function, which uses the Geocoding API to add coordinates and writes the results to BigQuery.

This simple pipeline uses a general form processor to detect basic form data, like labeled address fields. For more complex documents, Document AI offers specialized parsers (beyond the scope of this lab) that extract detailed information even without explicit labels. For instance, the Invoice parser can identify address and supplier details from an unlabeled invoice by understanding common invoice layouts.

The overall architecture that you will create looks like the following:

1. Upload forms with address data to Cloud Storage.
2. The upload triggers a Cloud Run function call to process the forms.
3. Document AI called from Cloud Run function.
4. Document AI JSON data saved back to Cloud Storage.
5. Form Data written to BigQuery by Cloud Run function.
6. Cloud Run function sends addresses to a Pub/Sub topic.
7. Pub/Sub message triggers Cloud Run function for GeoCode processing.
8. Geocoding API called from Cloud Run function.
9. Geocoding data written to BigQuery by Cloud Run function.

This example architecture uses Cloud Run functions to implement a simple pipeline, but Cloud Run functions are not recommended for production environments as the Document AI API calls can exceed the timeouts supported by Cloud Run functions. [Cloud Tasks](https://cloud.google.com/tasks) are recommended for a more robust serverless solution.


#### Objectives

In this lab, you learn how to:

- Enable the Document AI API.
- Deploy Cloud Run functions that use the Document AI, BigQuery, Cloud Storage, and Pub/Sub APIs.

You'll configure a Cloud Run function to:

- Trigger when documents are uploaded to Cloud Storage.
- Use the Document AI client library for Python.
- Trigger when a Pub/Sub message is created.

### Setup and Requirements

**Note**: Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.
{: .notice--danger}

**Note**: Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.
{: .notice--danger}

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

---


### Task 1. Enable APIs and create an API key

You must enable the APIs for Document AI, Cloud Run functions, Cloud Build, and Geocoding for this lab, then create the API key that is required by the Geocoding Cloud Run function.

Click **Activate Cloud Shell** at the top of the Google Cloud console.

In Cloud Shell, enter the following commands to enable the APIs required by the lab:

```sh
gcloud services enable documentai.googleapis.com      
gcloud services enable cloudfunctions.googleapis.com  
gcloud services enable cloudbuild.googleapis.com    
gcloud services enable geocoding-backend.googleapis.com   
```

In the console, in the Navigation menu (**Navigation menu icon**), click **APIs & services > Credentials**.

1. Select **Create credentials**, then select **API key** from the dropdown menu.
2. The API key created dialog box displays your newly created key. An API key is a long string containing upper and lower case letters, numbers, and dashes. For example: `a4db08b757294ea94c08f2df493465a1`.
3. Click **Edit API key** in the dialog box.
4. Select **Restrict key** in the API restrictions section to add API restrictions for your new API key.
5. Click in the filter box and type **Geocoding API**.
6. Select **Geocoding API** and click **OK**.
7. Click the **Save** button.

**Note:** If you cannot find the Geocoding API in the **Restrict key** dropdown list, refresh the page to refresh the list of available APIs.

Check that all the required APIs have been enabled.

---

### Task 2. Download the lab source code

In this task, you copy the source files into your Cloud Shell. These files include the source code for the Cloud Run functions and the schemas for the BigQuery tables that you will create in the lab.

In Cloud Shell, enter the following command to download the source code for this lab:

```sh
mkdir ./documentai-pipeline-demo
gcloud storage cp -r \  
  gs://spls/gsp927/documentai-pipeline-demo/* \  
  ~/documentai-pipeline-demo/
```

---

### Task 3. Create a form processor

Create an instance of the **generic form processor** to use in the **Document AI Platform** using the **Document AI Form Parser** specialized parser. The generic form processor will process any type of document and extract all the text content it can identify in the document. It is not limited to printed text; it can handle handwritten text and text in any orientation, supports a number of languages, and understands how form data elements are related to each other so that you can extract key-value pairs for form fields that have text labels.

1. In the **Google Cloud Console**, in the search bar, type **Document AI** and click the product page result.
2. Click **Explore Processors** and click **Create Processor** for **Form Parser**.
3. Specify the processor name as `form-processor` and select the region **US (United States)** from the list.
4. Click **Create** to create your processor.

You will configure a Cloud Run function later in this lab with the **processor ID** and **location** of this processor so that the Cloud Run function will use this specific processor to process sample invoices.

---

### Task 4. Create Cloud Storage buckets and a BigQuery dataset

In this section, you will prepare your environment by creating the Google Cloud resources that are required for your document processing pipeline.

#### Create input, output, and archive Cloud Storage buckets

Create input, output, and archive Cloud Storage buckets for your document processing pipeline.

In Cloud Shell, enter the following command to create the Cloud Storage buckets for the lab:

```sh
export PROJECT_ID=$(gcloud config get-value core/project)
export BUCKET_LOCATION="REGION"
gsutil mb -c standard -l ${BUCKET_LOCATION} -b on \
  gs://${PROJECT_ID}-input-invoices
gsutil mb -c standard -l ${BUCKET_LOCATION} -b on \
  gs://${PROJECT_ID}-output-invoices
gsutil mb -c standard -l ${BUCKET_LOCATION} -b on \
  gs://${PROJECT_ID}-archived-invoices
```

#### Create a BigQuery dataset and tables

Create a BigQuery dataset and the three output tables required for your data processing pipeline.

In Cloud Shell, enter the following command to create the BigQuery tables for the lab:

```sh
bq --location="US" mk  -d \
    --description "Form Parser Results" \
    ${PROJECT_ID}:invoice_parser_results
cd ~/documentai-pipeline-demo/scripts/table-schema/
bq mk --table \
  invoice_parser_results.doc_ai_extracted_entities \
  doc_ai_extracted_entities.json
bq mk --table \
  invoice_parser_results.geocode_details \
  geocode_details.json
```

You can navigate to **BigQuery** in the Cloud Console and inspect the schemas for the tables in the `invoice_parser_results` dataset using the **BigQuery SQL workspace**.

#### Create a Pub/Sub topic

Initialize the Pub/Sub topic used to trigger the Geocoding API data enrichment operations in the processing pipeline.

In Cloud Shell, enter the following command to create the Pub/Sub topics for the lab:

```sh
export GEO_CODE_REQUEST_PUBSUB_TOPIC=geocode_request
gcloud pubsub topics \
  create ${GEO_CODE_REQUEST_PUBSUB_TOPIC}
```

---

### Task 5. Create Cloud Run Functions

Create the two Cloud Run functions that your data processing pipeline uses to process invoices uploaded to Cloud Storage. These functions use the Document AI API to extract form data from the raw documents, then use the GeoCode API to retrieve geolocation data about the address information extracted from the documents.

You can examine the source code for the two Cloud Run functions using the Code Editor or any other editor of your choice. The Cloud Run functions are stored in the following folders in Cloud Shell:

- **Process Invoices** - `scripts/cloud-functions/process-invoices`
- **Geocode Addresses** - `scripts/cloud-functions/geocode-addresses`

The main Cloud Run function, `process-invoices`, is triggered when files are uploaded to the input files storage bucket you created earlier.

The function folder `scripts/cloud-functions/process-invoices` contains the two files that are used to create the `process-invoices` Cloud Run function.

- The `requirements.txt` file specifies the Python libraries required by the function. This includes the Document AI client library as well as the other Google Cloud libraries required by the Python code to read the files from Cloud Storage, save data to BigQuery, and write messages to Pub/Sub that will trigger the remaining functions in the solution pipeline.
- The `main.py` Python file contains the Cloud Run function code that creates the Document-AI, BigQuery, and Pub/Sub API clients and the following internal functions to process the documents:

#### Internal Functions in `main.py`

- **`write_to_bq`** - Writes dictionary object to the BigQuery table. Note you must ensure the schema is valid before calling this function.
- **`get_text`** - Maps form name and value text anchors to the scanned text in the document. This allows the function to identify specific form elements, such as the Supplier name and Address, and extract the relevant value. A specialized Document AI processor provides that contextual information directly in the entities property.
- **`process_invoice`** - Uses the asynchronous Document-AI client API to read and process files from Cloud Storage as follows:
  - Creates an asynchronous request to process the file(s) that triggered the Cloud Run function call.
  - Processes form data to extract invoice fields, storing only specific fields in a dictionary that are part of the predefined schema.
  - Publishes Pub/Sub messages to trigger the Geocoding Cloud Run function using address form data extracted from the document.
  - Writes form data to a BigQuery table.
  - Deletes intermediate (output) files from the asynchronous Document AI API call.
  - Copies input files to the archive bucket.
  - Deletes processed input files.

The `process_invoices` Cloud Run function only processes form data that has been detected with the following form field names:

- `input_file_name`
- `address`
- `supplier`
- `invoice_number`
- `purchase_order`
- `date`
- `due_date`
- `subtotal`
- `tax`
- `total`

The other Cloud Run function, `geocode-addresses`, is triggered when a new message arrives on a Pub/Sub topic and it extracts its parameter data from the Pub/Sub message.

#### Create the Cloud Run Function to Process Documents Uploaded to Cloud Storage

Create a Cloud Run function that uses a Document AI form processor to parse form documents that have been uploaded to a Cloud Storage bucket.

Run the command to get the email address of the project's Cloud Storage service agent:

```sh
gcloud storage service-agent --project=$PROJECT_ID
```

Run the below command to allow the required permissions to the Cloud Storage service account:

```sh
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")

gcloud iam service-accounts create "service-$PROJECT_NUMBER" \
  --display-name "Cloud Storage Service Account" || true

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:service-$PROJECT_NUMBER@gs-project-accounts.iam.gserviceaccount.com" \
  --role="roles/pubsub.publisher"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:service-$PROJECT_NUMBER@gs-project-accounts.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountTokenCreator"
```

**Note:** If the Cloud Storage service account exists, you can ignore the error.

#### Create the Invoice Processor Cloud Run Function

```sh
cd ~/documentai-pipeline-demo/scripts
export CLOUD_FUNCTION_LOCATION="REGION"

gcloud functions deploy process-invoices \
  --gen2 \
  --region=${CLOUD_FUNCTION_LOCATION} \
  --entry-point=process_invoice \
  --runtime=python39 \
  --source=cloud-functions/process-invoices \
  --timeout=400 \
  --env-vars-file=cloud-functions/process-invoices/.env.yaml \
  --trigger-resource=gs://${PROJECT_ID}-input-invoices \
  --trigger-event=google.storage.object.finalize
```

**Note:** If the command fails with a permission error, wait a minute and try it again.

#### Create the Cloud Run Function to Lookup Geocode Data from an Address

Create the Cloud Run function that accepts address data from a Pub/Sub message and uses the Geocoding API to precisely locate the address.

```sh
cd ~/documentai-pipeline-demo/scripts
gcloud functions deploy geocode-addresses \
  --gen2 \
  --region=${CLOUD_FUNCTION_LOCATION} \
  --entry-point=process_address \
  --runtime=python39 \
  --source=cloud-functions/geocode-addresses \
  --timeout=60 \
  --env-vars-file=cloud-functions/geocode-addresses/.env.yaml \
  --trigger-topic=${GEO_CODE_REQUEST_PUBSUB_TOPIC}
```

----

### Task 6. Edit Environment Variables for Cloud Run Functions

In this task, you finalize the configuration of the Cloud Run functions by editing the environment variables for each function to reflect your lab specific parameters via the Cloud Console.



#### Edit Environment Variables for the `process-invoices` Cloud Run Function

1. In the Cloud Console, search for **Cloud Run functions** and open the product page.
2. Click on the **process-invoices** function.
3. Click **Edit**.
4. Click **Runtime, build, connections and security settings** to expand the section.
5. Update the following environment variables:
   - `GCP_PROJECT`: Set to your Project ID.
   - `PROCESSOR_ID`: Set to the Invoice processor ID you created earlier.
   - `PARSER_LOCATION`: Set to the region (`us` or `eu`).
6. Click **Next**, select `.env.yaml`, and update the above values.
7. Click **Deploy**.

#### Edit Environment Variables for the `geocode-addresses` Cloud Run Function

1. Click on the **geocode-addresses** function.
2. Click **Edit**.
3. Expand **Runtime, build, connections and security settings**.
4. Update the `API_key` value to match the API Key from Task 1.
5. Click **Next**, select `.env.yaml`, and update the `API_key` value.
6. Click **Deploy**.

---

### Task 7. Test and Validate the End-to-End Solution

Upload test data to Cloud Storage and monitor the pipeline progress:

```sh
export PROJECT_ID=$(gcloud config get-value core/project)
gsutil cp gs://spls/gsp927/documentai-pipeline-demo/sample-files/* gs://${PROJECT_ID}-input-invoices/
```

1. Open **Cloud Run functions** in the Cloud Console.
2. Click on **process-invoices**.
3. Click **Logs** to monitor events.
4. Check **BigQuery** for extracted data.

---
Solution [here](https://youtu.be/Wz5YMXy9uq4)

Run the following Commands in CloudShell

```bash
export LOCATION=
```
```bash
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Build%20an%20End-to-End%20Data%20Capture%20Pipeline%20using%20Document%20AI/gsp927-1.sh

sudo chmod +x gsp927-1.sh

./gsp927-1.sh
```

Run again the following Commands in CloudShell

```bash
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Build%20an%20End-to-End%20Data%20Capture%20Pipeline%20using%20Document%20AI/gsp927-2.sh

sudo chmod +x gsp927-2.sh

./gsp927-2.sh
```


----

### Congratulations!

You have successfully built an end-to-end invoice processing pipeline using Document AI, Cloud Run, BigQuery, Cloud Storage, and Pub/Sub!


---

## **Automate Data Capture at Scale with Document AI: Challenge Lab (GSP367)**

### Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students enrolled in the [Automate Data Capture at Scale with Document AI](https://www.cloudskillsboost.google/course_templates/674) skill badge course. Are you ready for the challenge?


### Setup

**Note**: Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.
{: .notice--danger}

**Note**: Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.
{: .notice--danger}

### Challenge Scenario

You are a data engineer at large infrastructure management company and have been assigned to work on a internal project with the financial division of the company. The company has to process an ever increasing mountain of documents that all require individual manual processing for validation and authorization, which is an expensive task that requires a lot of staff. The company plans to leverage Google Cloud tools to automate the process of collecting, categorizing, and verifying documents in an efficient and less labor intensive manner.

#### Your challenge

You must create a document processing pipeline that will automatically process documents that are uploaded to Cloud Storage. The pipeline consists of a primary Cloud Run functions that processes new files using a Document AI form processor to extract the data from the document. The function then saves the form data detected in those files to BigQuery.

You are provided with the source code for a Cloud Run functions that will perform the processing, and you are expected to deploy the document processing pipeline as shown in the architecture below, making sure to correctly configure the components for your specific pipeline.

----

### Task 1. Enable the Cloud Document AI API and copy lab source files.

#### Enable the Cloud Document AI API
Enable the Cloud Document AI API.
Enable Cloud Document AI API.

#### Copy the lab source files into your Cloud Shell
The Cloud Run functions with predefined code are hosted on a remote Cloud Storage bucket. Copy these source files into your Cloud Shell. These files include the source code for the Cloud Run functions and the schema for the BigQuery table that you will create in the lab.

In Cloud Shell, enter the following command to clone the source repository for the lab:

```bash
mkdir ./document-ai-challenge
gsutil -m cp -r gs://spls/gsp367/* \
  ~/document-ai-challenge/
```
---

### Task 2. Create a form processor

Create an instance of the general form processor using the Document AI Form Parser processor in the General (non-specialized) section. The general form processor will process any type of document and extract all the text content it can identify in the document as well as form information that it infers from the layout.

- Create the processor using the following configuration details:

| Property         | Value           |
|-----------------|----------------|
| Processor Type  | Form Parser    |
| Processor Name  | processor name |
| Region         | US             |

> **Note:** You will configure a Cloud Run function later in this lab with the **PROCESSOR ID** and **PARSER LOCATION** of this processor so that the Cloud Run function will use this specific processor to process invoices. Click on the created processor and note the **PROCESSOR ID**. However, the processor region is the **PARSER LOCATION**.

---

### Task 3. Create Google Cloud resources

#### Create input, output, and archive Cloud Storage buckets
In this step, you must create the three Cloud Storage buckets listed below with uniform bucket-level access enabled.

| Bucket Name         | Purpose                   | Storage Class | Location |
|--------------------|--------------------------|---------------|----------|
| input_bucket_name  | For input invoices       | Standard      | REGION   |
| output_bucket_name | For storing processed data | Standard    | REGION   |
| archive_bucket_name| For archiving invoices   | Standard      | REGION   |

> **Note:** A bucket can be created using the `gsutil` tool with the `-mb` parameter, along with `-c` to set the storage class, `-l` to set the (regional) location, and the `-b` flag with the value of `on` or `off` to set uniform bucket-level access. Read the [mb - Make buckets reference](https://cloud.google.com/storage/docs/creating-buckets) for more information.

#### Create a BigQuery dataset and tables


In this step, you must create a BigQuery dataset and the output table required for your data processing pipeline.

**Dataset**

| Dataset Name           | Location |
|------------------------|----------|
| invoice_parser_results | US       |

> **Note:** Use `bq mk` to create BigQuery resources. The command line switch parameter `-d` is used to create a dataset, and `--location` is used to set the location of the resource. Read the [Create datasets guide](https://cloud.google.com/bigquery/docs/datasets) for more information.

**Table**
The table schema for the extracted information has been provided in the JSON file:

```bash
document-ai-challenge/scripts/table-schema/doc_ai_extracted_entities.json
```

Use this schema to create a table named `doc_ai_extracted_entities` in the `invoice_parser_results` dataset.

> **Note:** Use `bq mk` to create BigQuery resources. The command line switch `--table` is used to create a table. Read the [Create and use tables guide](https://cloud.google.com/bigquery/docs/tables) for more information.

You can navigate to BigQuery in the Cloud Console and inspect the schema of tables in the `invoice_parser_results` dataset using BigQuery SQL workspace.

---

### Task 4. Deploy the document processing Cloud Run functions

To complete this task, you must deploy the Cloud Run functions that your data processing pipeline uses to process invoices uploaded to Cloud Storage. This function will use a Document AI API Generic Form processor to extract form data from the raw documents.

You can examine the source code of the Cloud Run functions using the Code Editor or any other editor of your choice. The Cloud Run functions are stored in the following folders in Cloud Shell:


```bash
scripts/cloud-functions/process-invoices
```

The Cloud Run function, `process-invoices`, must be triggered when files are uploaded to the input files storage bucket you created earlier.

#### Deploy the Cloud Run functions to process documents uploaded to Cloud Storage


Deploy a Cloud Run functions that uses a Document AI form processor to parse form documents that have been uploaded to a Cloud Storage bucket.

Navigate to scripts directory:

```bash
cd ~/document-ai-challenge/scripts
```

Assign the Artifact Registry Reader role to the Compute Engine service account:

```bash
PROJECT_ID=$(gcloud config get-value project)
PROJECT_NUMBER=$(gcloud projects list --filter="project_id:$PROJECT_ID" --format='value(project_number)')

SERVICE_ACCOUNT=$(gcloud storage service-agent --project=$PROJECT_ID)

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member serviceAccount:$SERVICE_ACCOUNT \
  --role roles/pubsub.publisher
```

Deploy the Cloud Run function:

```bash
export CLOUD_FUNCTION_LOCATION="REGION"
gcloud functions deploy process-invoices \
  --gen2 \
  --region=${CLOUD_FUNCTION_LOCATION} \
  --entry-point=process_invoice \
  --runtime=python39 \
  --service-account=${PROJECT_ID}@appspot.gserviceaccount.com \
  --source=cloud-functions/process-invoices \
  --timeout=400 \
  --env-vars-file=cloud-functions/process-invoices/.env.yaml \
  --trigger-resource=gs://${PROJECT_ID}-input-invoices \
  --trigger-event=google.storage.object.finalize \
  --service-account $PROJECT_NUMBER-compute@developer.gserviceaccount.com \
  --allow-unauthenticated
```

> **Note:** If you get a permission error while deploying the function, wait for 2-3 minutes and re-run the commands.

You will have to reconfigure the Cloud Run function deployment so that the environment variables `PROCESSOR_ID` and `PARSER_LOCATION` contain the correct values for the Form Parser processor you deployed in a previous step.

Ensure the `PARSER_LOCATION` value is in lower case.
Ensure you update the `PROJECT_ID` environment variable with your project ID.
Wait for the function to be fully redeployed.

---

### Task 5. Test and validate the end-to-end solution

For your final task, you must successfully process the set of invoices that are available in the `~/document-ai-challenge/invoices` folder using your pipeline.

Upload these invoices to the input Cloud Storage bucket and monitor the progress of the pipeline.

Watch the events until you see a final event indicating that the function execution finished with a status of **OK**.

Once the pipeline has fully processed the documents, you will see that the form information extracted from the invoices by the Document AI processor has been written into the BigQuery table.

> **Note:** To monitor progress, click **Logs** in the **Management** section of the Cloud Run function to view logs.


---

🚀 Lab Solution [Watch Here](https://youtu.be/DcJXiLcxkuI)


⚠️ Disclaimer
- **This script and guide are provided for  the educational purposes to help you understand the lab services and boost your career. Before using the script, please open and review it to familiarize yourself with Google Cloud services. Ensure that you follow 'Qwiklabs' terms of service and YouTube’s community guidelines. The goal is to enhance your learning experience, not to bypass it.**


🚨Copy and run the below commands in Cloud Shell:

```bash
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Automate%20Data%20Capture%20at%20Scale%20with%20Document%20AI:%20Challenge%20Lab/techcps367.sh
sudo chmod +x techcps367.sh
./techcps367.sh
```

🚨If you're not getting score on task 5 then run the below commands few times

```bash
export PROJECT_ID=$(gcloud config get-value core/project)
gsutil -m cp -r gs://cloud-training/gsp367/* \
~/document-ai-challenge/invoices gs://${PROJECT_ID}-input-invoices/
```


---

### Congratulations!

In this lab, you have successfully created a document processing pipeline that automatically processes documents uploaded to Cloud Storage using the Document AI API. You have created a form processor, deployed a Cloud Run function to process documents, and validated the end-to-end solution by processing a set of invoices.






























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