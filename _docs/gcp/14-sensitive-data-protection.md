---
title: | 
        **Get Started with Sensitive Data Protection** <br>
        ![Google Cloud Compute](https://img.shields.io/badge/google--cloud-compute--engine-blue)
        ![Nginx](https://img.shields.io/badge/nginx-web--server-green)
        ![Debian VM](https://img.shields.io/badge/debian-virtual--machine-red)
        ![Node.js](https://img.shields.io/badge/node.js-runtime--environment-brightgreen)
        ![Linux](https://img.shields.io/badge/linux-operating--system-black)

permalink: /docs/gcp/sensitive-data-protection/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-02-23T21:36:18-04:00
toc: true

---

## **Cloud Data Loss Prevention API: Qwik Start (GSP107)**

### Overview

Now part of [Sensitive Data Protection](https://cloud.google.com/sensitive-data-protection/docs/sensitive-data-protection-overview), the Cloud Data Loss Prevention (DLP) API provides programmatic access to a powerful detection engine for personally identifiable information (PII) and other privacy-sensitive data in unstructured data streams.

The DLP API provides fast, scalable classification and optional redaction for sensitive data elements like credit card numbers, names, social security numbers, passport numbers, and phone numbers. The API supports text and images – just send data to the API or specify data stored on your Cloud Storage, BigQuery, and Cloud Datastore instances.

In this lab, you set up a JSON file to analyze, send it to the DLP API, to inspect a string of data for sensitive information, then redact any sensitive information that was found.

#### Objectives

In this lab, you use the DLP API to do the following:

- Inspect a string for sensitive information
- Redact sensitive data from text content

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


#### Set an environmental variable for your project ID

1. In Cloud Shell, run the following command to set an environment variable for your project ID::
  
    ```bash
    export PROJECT_ID=$DEVSHELL_PROJECT_ID
    ```

---

### Task 1. Inspect a string for sensitive information

This section shows you how to ask the service to scan sample text using the `projects.content.inspect` REST method. The JSON file you create contains an `InspectConfig` and a `ContentItem` object.

Using your preferred editor (`nano`, `vim`, etc.) or Cloud Shell, create a JSON request file with the following text, and save it as `inspect-request.json`:

```json
{
  "item":{
    "value":"My phone number is (206) 555-0123."
  },
  "inspectConfig":{
    "infoTypes":[
      {
        "name":"PHONE_NUMBER"
      },
      {
        "name":"US_TOLLFREE_PHONE_NUMBER"
      }
    ],
    "minLikelihood":"POSSIBLE",
    "limits":{
      "maxFindingsPerItem":0
    },
    "includeQuote":true
  }
}
```

Obtain an authorization token using your account:

```sh
gcloud auth print-access-token
```

A huge string is returned. You need this token for the next step.

If you receive an error that no service account is being used, wait a few minutes and run the command again.

Use `curl` to make a `content:inspect` request, replacing `ACCESS_TOKEN` with the string that was returned in the previous step:

```sh
curl -s \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  https://dlp.googleapis.com/v2/projects/$PROJECT_ID/content:inspect \
  -d @inspect-request.json -o inspect-output.txt
```

**Note:** Here's what's going on:
- To pass a filename to `curl` you use the `-d` option (for "data") and precede the filename with an `@` sign. This file should be in the same directory in which you execute the `curl` command.
- It saves the `curl` response in `inspect-output.txt` file. Check the output using the below command:

```sh
cat inspect-output.txt
```

You should see a response similar to the following:

```json
{
  "result": {
    "findings": [
      {
        "quote": "(206) 555-0123",
        "infoType": {
          "name": "PHONE_NUMBER"
        },
        "likelihood": "LIKELY",
        "location": {
          "byteRange": {
            "start": "19",
            "end": "33"
          },
          "codepointRange": {
            "start": "19",
            "end": "33"
          }
        },
        "createTime": "2018-07-03T02:20:26.043Z"
      }
    ]
  }
}
```

#### Upload output to Cloud Storage
Run the following command to upload the `curl` response on Cloud Storage for activity tracking validation:

```sh
gsutil cp inspect-output.txt gs://bucket_name_filled_after_lab_start
```

### Task 2. Redacting sensitive data from text content

The DLP API can automatically redact sensitive data from text files instead of giving you a list of findings.

Try sending the API JSON file using [`deidentifyConfig`](https://cloud.google.com/dlp/docs/reference/rest/v2beta2/projects.deidentifyTemplates) object, so sensitive information is redacted from the output.

Create a new JSON file (called `new-inspect-file.json`) that includes the following:

```json
{
  "item": {
     "value":"My email is test@gmail.com"
   },
   "deidentifyConfig": {
     "infoTypeTransformations":{
          "transformations": [
            {
              "primitiveTransformation": {
                "replaceWithInfoTypeConfig": {}
              }
            }
          ]
        }
    },
    "inspectConfig": {
      "infoTypes": {
        "name": "EMAIL_ADDRESS"
      }
    }
}
```

Use `curl` to make a `content:deidentify` request (`ACCESS_TOKEN` has been replaced with a command to print the access token):

```sh
curl -s \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  https://dlp.googleapis.com/v2/projects/$PROJECT_ID/content:deidentify \
  -d @new-inspect-file.json -o redact-output.txt
```

It saves the `curl` response in `redact-output.txt` file. Check the output using the below command:

```sh
cat redact-output.txt
```

You should see a response similar to the following:

```json
{
  "item": {
    "value": "My email is [EMAIL_ADDRESS]"
  },
  "overview": {
    "transformedBytes": "14",
    "transformationSummaries": [
      {
        "infoType": {
          "name": "EMAIL_ADDRESS"
        },
        "transformation": {
          "replaceWithInfoTypeConfig": {}
        },
        "results": [
          {
            "count": "1",
            "code": "SUCCESS"
          }
        ],
        "transformedBytes": "14"
      }
    ]
  }
}
```

You've sent your first request to the DLP API and redacted sensitive information from output!

#### Upload output to Cloud Storage
Run the following command to upload the `curl` response on Cloud Storage for activity tracking validation:

```sh
gsutil cp redact-output.txt gs://bucket_name_filled_after_lab_start
```

### Congratulations!

You used the Cloud Data Loss Prevention (DLP) API to inspect for, and then redact sensitive data from text content.

---

## **Redacting Critical Data with Sensitive Data Protection (GSP864)** 

### Overview

The Cloud Data Loss Prevention (DLP) API is part of Sensitive Data Protection, which is a fully managed service designed to help discover, classify, and protect sensitive information.

You can use the DLP API to classify data in a variety of ways, including data type, sensitivity level, and catagories.

The DLP API protects sensitive data in a variety of ways, including:

- **Redaction**: redact sensitive data from a document or file.
- **Masking**: mask sensitive data with a placeholder, such as `*`.
- **Tokenization**: replace sensitive data with a unique identifier.
- **Encryption**: encrypt sensitive data.

In this lab, you learn the basic capabilities of the DLP API and try out various ways to use the API to protect data.

#### Objectives

In this lab, you use the DLP API to do the following:

- Inspect strings and files for matching info types
- Learn about de-identification techniques and de-identify data
- Redact info types in strings and images

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
    gcloud config set compute/region Region
    ```

---

### Task 1. Clone the repo and enable APIs

#### Clone the Repository
In Cloud Shell, run the following command to download the Cloud Data Loss Prevention Node.js Client repository:

```sh
git clone https://github.com/googleapis/synthtool
```

Once you download the project code, change into the samples directory and install the required Node.js packages:

```sh
cd synthtool/tests/fixtures/nodejs-dlp/samples/ && npm install
```

**Note:** Ignore any warning messages.

Make sure you're using the correct project by setting it with the following `gcloud` command:

```sh
export PROJECT_ID="<filled at in lab start>"
gcloud config set project $PROJECT_ID
```

#### Enable APIs

Here are the APIs needed to enable your project:

- **DLP API** - Provides methods for detection, risk analysis, and de-identification of privacy-sensitive fragments in text, images, and Google Cloud storage repositories.
- **Cloud Key Management Service (KMS) API** - Google Cloud KMS allows encryption key management and performs cryptographic operations with those keys.

Enable the required APIs with the following `gcloud` command:

```sh
gcloud services enable dlp.googleapis.com cloudkms.googleapis.com \
--project $PROJECT_ID
```

---

### Task 2. Inspect strings and files

The `samples` directory of the project downloaded in the preceding step contains several JavaScript files that make use of the different functionality of the DLP API. The file `inspectString.js` inspects a provided string for sensitive info types.

Provide the string option and a sample string with some potentially sensitive information:

```sh
node inspectString.js $PROJECT_ID "My email address is jenny@somedomain.com and you can call me at 555-867-5309" > inspected-string.txt
```

The output tells you the findings for each matched info type, which includes:

- **InfoType**: The information type detected for that part of the string. Find a full list of possible info types [here](https://cloud.google.com/dlp/docs/infotypes-reference).
- **Likelihood**: The results are categorized based on how likely they each represent a match. Likelihood can range from `VERY_UNLIKELY` to `VERY_LIKELY`.

Check the output using the below command:

```sh
cat inspected-string.txt
```

#### Expected Findings:

```text
Findings:
    Info type: PERSON_NAME
    Likelihood: POSSIBLE
    Info type: EMAIL_ADDRESS
    Likelihood: LIKELY
    Info type: PHONE_NUMBER
    Likelihood: VERY_LIKELY
```

#### Inspecting Files

Similarly, you can inspect files for info types. Run the following command to review the sample `accounts.txt` file:

```sh
cat resources/accounts.txt
```

The file includes the following text:

```text
My credit card number is 1234 5678 9012 3456, and my CVV is 789.
```

Use the `inspectFile.js` file to inspect the provided file for sensitive info types:

```sh
node inspectFile.js $PROJECT_ID resources/accounts.txt > inspected-file.txt
```

Check the output using the below command:

```sh
cat inspected-file.txt
```

#### Expected Findings:

```text
Findings:
    Info type: CREDIT_CARD_NUMBER
    Likelihood: VERY_LIKELY
```

Below is the asynchronous function that uses the API to inspect the string input:

```javascript
async function inspectString(
  ProjectId,
  string,
  minLikelihood,
  maxFindings,
  infoTypes,
  customInfoTypes,
  includeQuote
) {
...
}
```

The arguments provided for the parameters above are used to construct a request object. That request is then provided to the `inspectContent` function to get a response that results in the output:

```javascript
// Construct item to inspect
const item = {value: string};

// Construct request
const request = {
  parent: `projects/${projectId}/locations/global`,
  inspectConfig: {
    infoTypes: infoTypes,
    customInfoTypes: customInfoTypes,
    minLikelihood: minLikelihood,
    includeQuote: includeQuote,
    limits: {
      maxFindingsPerRequest: maxFindings,
    },
  },
  item: item,
};

// Run request
const [response] = await dlp.inspectContent(request);
```

#### Upload output to Cloud Storage

Run the following commands to upload the responses on Cloud Storage for activity tracking validation:

```sh
gsutil cp inspected-string.txt gs://bucket_name_filled_after_lab_start
gsutil cp inspected-file.txt gs://bucket_name_filled_after_lab_start
```

---

### Task 3. De-identification

Beyond inspecting and detecting sensitive data, you can also use Sensitive Data Protection to perform de-identification using the DLP API. De-identification is the process of removing identifying information from data. The API detects sensitive data as defined by info types, then uses a de-identification transformation to mask, delete, or otherwise obscure the data.

Run the following command to use `deidentifyWithMask.js` to try de-identification with a mask:

```sh
node deidentifyWithMask.js $PROJECT_ID "My order number is F12312399. Email me at anthony@somedomain.com" > de-identify-output.txt
```

Check the output using the below command:

```sh
cat de-identify-output.txt
```

With a mask, the API replaces the characters of the matching info type with a different character, `*` by default. Example output:

```text
My order number is F12312399. Email me at *****************************
```

Notice that the email address in the string is obfuscated while the arbitrary order number is intact. (Custom info types are possible but out of scope of this lab).

Look at the function that uses the DLP API to de-identify with a mask. Once again, these arguments are used to construct a request object. This time it's provided to the `deidentifyContent` function:

```javascript
async function deidentifyWithMask() {
    const request = {
      parent: `projects/${projectId}/locations/global`,
      deidentifyConfig: {
        infoTypeTransformations: {
          transformations: [
            {
              primitiveTransformation: {
                characterMaskConfig: {
                  maskingCharacter: maskingCharacter,
                  numberToMask: numberToMask,
                },
              },
            },
          ],
        },
      },
      item: item,
    };

    // Run de-identification request
    const [response] = await dlp.deidentifyContent(request);
```

#### Upload output to Cloud Storage

Run the following command to upload the responses on Cloud Storage for activity tracking validation:

```sh
gsutil cp de-identify-output.txt gs://bucket_name_filled_after_lab_start
```

Click **Check my progress** to verify the objective.

---

### Task 4. Redact strings and images

Another method of obfuscating sensitive information is redaction. Redaction replaces a match with the info type it's identified to match with.

Use `redactText.js` to redact text from a sample input:

```sh
node redactText.js $PROJECT_ID  "Please refund the purchase to my credit card 4012888888881881" CREDIT_CARD_NUMBER > redacted-string.txt
```

Check the output using the below command:

```sh
cat redacted-string.txt
```

The output replaces the sample credit card number with the info type `CREDIT_CARD_NUMBER`:

```text
Please refund the purchase on my credit card [CREDIT_CARD_NUMBER]
```

This is useful if you'd like to hide sensitive information but still identify the type of information that's being removed. The DLP API can similarly redact information from images that contain text. Take a look at a sample image (located in the `samples/resources` directory):

To redact the phone number from the image, run the following command:

```sh
node redactImage.js $PROJECT_ID resources/test.png "" PHONE_NUMBER ./redacted-phone.png
```

As specified, a new image named `redacted-phone.png` is generated with the requested information blacked out. To verify, open the `samples/redacted-phone.png` file using Cloud Shell Code Editor.

Try it again to redact the email address from the image:

```sh
node redactImage.js $PROJECT_ID resources/test.png "" EMAIL_ADDRESS ./redacted-email.png
```

A new image named `redacted-email.png` is generated with the requested information blacked out.

Here is the function that is used to redact from a string:

```javascript
async function redactText(
  callingProjectId,
  string,
  minLikelihood,
  infoTypes
) {
...}
```

And here is the request provided to the `deidentifyContent` function:

```javascript
const request = {
    parent: `projects/${projectId}/locations/global`,
    item: {
      value: string,
    },
    deidentifyConfig: {
      infoTypeTransformations: {
        transformations: [replaceWithInfoTypeTransformation],
      },
    },
    inspectConfig: {
      minLikelihood: minLikelihood,
      infoTypes: infoTypes,
    },
  };
  const [response] = await dlp.deidentifyContent(request);
```

Similarly, here is the function for redacting an image:

```javascript
async function redactImage(
  callingProjectId,
  filepath,
  minLikelihood,
  infoTypes,
  outputPath
) {
...}
```

And here is the request provided to the `redactImage` function:

```javascript
// Construct image redaction request
    const request = {
      parent: `projects/${projectId}/locations/global`,
      byteItem: {
        type: fileTypeConstant,
        data: fileBytes,
      },
      inspectConfig: {
        minLikelihood: minLikelihood,
        infoTypes: infoTypes,
      },
      imageRedactionConfigs: imageRedactionConfigs,
    };
```

#### Upload output to Cloud Storage

Run the following commands to upload the responses on Cloud Storage for activity tracking validation:

```sh
gsutil cp redacted-string.txt gs://bucket_name_filled_after_lab_start
gsutil cp redacted-phone.png gs://bucket_name_filled_after_lab_start
gsutil cp redacted-email.png gs://bucket_name_filled_after_lab_start
```

Click **Check my progress** to verify the objective.

---

### Congratulations!

The Cloud Data Loss Prevention (DLP) API is a powerful tool that provides access to a powerful sensitive data inspection, classification, and de-identification platform. You used the DLP API to inspect strings and files for multiple info types, and then redact data from a string and an image.

---

## **Creating a De-identified Copy of Data in Cloud Storage (GSP1073)** 

### Overview

[Sensitive Data Protection](https://cloud.google.com/dlp) is a fully managed service designed to help discover, classify, and protect sensitive information. In this lab, you create and run a Sensitive Data Protection job using the De-identify (DeID) Findings Action to create a redacted and de-identified copy of some data in Cloud Storage. You also learn how to create a de-identification template to define how to redact the data.

As part of the setup process of this lab, an "input" Cloud Storage bucket with sample folders and files, as well as an "output" Cloud Storage bucket for the redacted data have been created for you.

#### Objectives

In this lab, you:

- Create a Sensitive Data Protection de-identification template for structured and unstructured data
- Configure a Sensitive Data Protection Inspection Job Trigger with De-identify Findings Action enabled
- Create a Sensitive Data Protection Inspection Job
- View results of the inspection job and view new de-identified files in Cloud Storage

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

### Task 1. Create De-Identify Templates

#### Create a Template for Unstructured Data

In this section, you configure and create a de-identify template for unstructured data.

1. In the Google Cloud console, in the Navigation menu, click **Security > [Data Loss Prevention](https://console.cloud.google.com/security/dlp/)**.
2. Click the **Configuration** tab.
3. In the **Configuration > Templates** section, click **Create Template**.


4. On the **Create Template** page, define the following options:
   - **Template type**: Select **De-identify (remove sensitive data)**.
   - **Data transformation type**: Select **InfoType**.
   - **Template ID**: Enter `deid_unstruct1`.
   - **Display name**: Enter `deid_unstruct1 template`.
   - **Description**: Leave the field empty.
   - **Resource location**: Use the default setting **Global (any region)**.
5. Click **Continue**.

6. For the **Transformation Rule**, select **Replace with infoType name**.
7. For **InfoTypes to transform**, select **Any detected infoTypes defined in an inspection template or inspect config that are not specified in other rules**.


8. Click **Create**.
9. Click **Check my progress** to verify the objective.

#### Create a Template for Structured Data

In this section, you configure and create a de-identify template for structured data.

1. In the Google Cloud console, navigate back to the **Data Loss Prevention** page.
2. Click the **Configuration** tab.
3. In the **Configuration > Templates** section, click **Create Template**.


4. On the **Create Template** page, define the following options:
   - **Template type**: Select **De-identify (remove sensitive data)**.
   - **Data transformation type**: Select **Record**.
   - **Template ID**: Enter `deid_struct1`.
   - **Display name**: Enter `deid_struct1 template`.
   - **Description**: Leave the field empty.
   - **Resource location**: Use the default setting **Global (any region)**.
5. Click **Continue**.

6. For the **Transformation Rule**, add the following field names:
   - `ssn`
   - `ccn`
   - `email`
   - `vin`
   - `id`
   - `agent_id`
   - `user_id`


7. For the **Transformation type**, select **Primitive field transformation**.
8. For the **Transformation method**, select **Replace**. This replaces the contents of every cell for fields that match any in the list you provided.
9. Click **+ Add Transformation Rule**.
10. For this new rule, add the field: `message`.
11. For the **Transformation type**, select **Match on infoType** and click **Add Transformation**.
12. For the **Transformation Method**, select **Replace with infoType name**.
13. For **InfoTypes to transform**, select **Any detected infoTypes defined in an inspection template or inspect config that are not specified in other rules**. This applies infoType inspection and redaction to any files with a field called `message`.


14. Click **Create**.

---

### Task 2. Create a DLP Inspection Job Trigger

In the Google Cloud console, navigate back to the Data Loss Prevention page.

Click the **Inspection** tab.

Click **Create Job and Job Triggers**.

To configure input data, do the following:

In the Name section, define the following options:
- For **Job ID**, enter `DeID_Storage_Demo1`.
- Keep **Resource location** set to **Global (any region)**.
- In the **Storage type** list, select **Google Cloud Storage**, and then define the following options:
  - For the **Location Type**, select **Scan a bucket with optional include/exclude rules**.
  - For the **URL**, enter: `input bucket`.
  - Set **Percentage of included objects scanned within the bucket** to **100%** and select **No Sampling**.

> **Note:** For the storage bucket URL, make sure there are no whitespaces.


Leave the rest of the fields as default and click **Continue**.

Under Configure detection, leave all fields as default and click **Continue**.

Under Add Actions, toggle to enable **Make a de-identify copy**.

Enter the two templates that you created above in the respective boxes:

```
projects/project-id/locations/global/deidentifyTemplates/deid_unstruct1
projects/project-id/locations/global/deidentifyTemplates/deid_struct1
```

> **Note:** Make sure there are no spaces in the de-identification template paths.



For the **Cloud Storage output location**, specify: `output bucket name`.
This specifies to write the redacted output to the second bucket that was created for you.

Click **Continue**.

For Schedule, select **Create a trigger to run the job on a periodic schedule** and select **Weekly**.

Click **Continue**.

Scroll down and click **Create > Confirm Create**.

You should now have a job under **Inspection > Job Triggers**.




---
### Task 3. Run DLP Inspection and Review Results

In the Google Cloud console, navigate back to the Data Loss Prevention page.

Click the **Inspection** tab.

Under **Job Triggers**, you should see the job trigger that you created.

Select this job trigger.

Click **Run Now**.

This creates and runs a new job instance.

Select the job instance from the section below **Triggered Jobs**.

> **Note:** If you do not see a job, you may need to refresh the screen or wait a minute and refresh.

Monitor the job and wait for it to say **Done**.

Once **Done**, review the results on this page to see what was found in the bucket.

Great! You should see your findings populated and an overview of your job results at the bottom.


#### View De-identified Output

On the **Job Results** page, click on **Configuration**.

Scroll down to the section **Output Bucket for De-identified Cloud Storage Data**.

Click on the **bucket link** to be taken to that Cloud Storage Bucket.

Explore the various folders and files to see what has been redacted. For example, clicking on one of the images in the image folder should show something like:

**Redacted Image**


For further exploration, you can try the following:

- Change the settings in the de-identification templates to try out different ways to de-identify and transform data. See the transformation reference [here](https://cloud.google.com/dlp/docs/concepts-transformation). You can also try turning on different tokenization or pseudonymization methods using **Cloud KMS**.
- Try editing the **DLP Job Trigger** and adjusting what kind of data is being inspected, then run another job by clicking **Run Now** from the triggers page. For example, if you turn off **PERSON_NAME** detection, the names should no longer be redacted.

### Congratulations!

Congratulations, in this lab you created **Sensitive Data Protection de-identification templates** for structured and unstructured data, configured a **Job Trigger** with **De-identify Findings Action** enabled, created an **Inspection Job**, and viewed the results of the inspection job.


---

### Task 4. Redact strings and images

Another method of obfuscating sensitive information is redaction. Redaction replaces a match with the info type it's identified to match with.

Use `redactText.js` to redact text from a sample input:

```sh
node redactText.js $PROJECT_ID  "Please refund the purchase to my credit card 4012888888881881" CREDIT_CARD_NUMBER > redacted-string.txt
```

Check the output using the below command:

```sh
cat redacted-string.txt
```

The output replaces the sample credit card number with the info type `CREDIT_CARD_NUMBER`:

```text
Please refund the purchase on my credit card [CREDIT_CARD_NUMBER]
```

This is useful if you'd like to hide sensitive information but still identify the type of information that's being removed. The DLP API can similarly redact information from images that contain text. Take a look at a sample image (located in the `samples/resources` directory):

To redact the phone number from the image, run the following command:

```sh
node redactImage.js $PROJECT_ID resources/test.png "" PHONE_NUMBER ./redacted-phone.png
```

As specified, a new image named `redacted-phone.png` is generated with the requested information blacked out. To verify, open the `samples/redacted-phone.png` file using Cloud Shell Code Editor.

Try it again to redact the email address from the image:

```sh
node redactImage.js $PROJECT_ID resources/test.png "" EMAIL_ADDRESS ./redacted-email.png
```

A new image named `redacted-email.png` is generated with the requested information blacked out.

Here is the function that is used to redact from a string:

```javascript
async function redactText(
  callingProjectId,
  string,
  minLikelihood,
  infoTypes
) {
...}
```

And here is the request provided to the `deidentifyContent` function:

```javascript
const request = {
    parent: `projects/${projectId}/locations/global`,
    item: {
      value: string,
    },
    deidentifyConfig: {
      infoTypeTransformations: {
        transformations: [replaceWithInfoTypeTransformation],
      },
    },
    inspectConfig: {
      minLikelihood: minLikelihood,
      infoTypes: infoTypes,
    },
  };
  const [response] = await dlp.deidentifyContent(request);
```

Similarly, here is the function for redacting an image:

```javascript
async function redactImage(
  callingProjectId,
  filepath,
  minLikelihood,
  infoTypes,
  outputPath
) {
...}
```

And here is the request provided to the `redactImage` function:

```javascript
// Construct image redaction request
    const request = {
      parent: `projects/${projectId}/locations/global`,
      byteItem: {
        type: fileTypeConstant,
        data: fileBytes,
      },
      inspectConfig: {
        minLikelihood: minLikelihood,
        infoTypes: infoTypes,
      },
      imageRedactionConfigs: imageRedactionConfigs,
    };
```

#### Upload output to Cloud Storage

Run the following commands to upload the responses on Cloud Storage for activity tracking validation:

```sh
gsutil cp redacted-string.txt gs://bucket_name_filled_after_lab_start
gsutil cp redacted-phone.png gs://bucket_name_filled_after_lab_start
gsutil cp redacted-email.png gs://bucket_name_filled_after_lab_start
```

---

### Congratulations!

The Cloud Data Loss Prevention (DLP) API is a powerful tool that provides access to a powerful sensitive data inspection, classification, and de-identification platform. You used the DLP API to inspect strings and files for multiple info types, and then redact data from a string and an image.




---
## **Get Started with Sensitive Data Protection: Challenge Lab (ARC116)**

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

You are working as a junior cloud engineer in your organization. You're part of a team of cloud engineers assigned to using Sensitive Data Protection API's powerful detection engine to protect and screen for personally identifiable information (PII) and other privacy-sensitive data. As part of this project, you are asked to use the Sensitive Data Protection service in Google Cloud to redact sensitive information from text, de-identify sensitive data, and create a DLP template to use for inspecting data.

You are expected to have the skills and knowledge for the tasks that follow.

#### Your challenge

For this challenge, you have been tasked with redacting and de-identifying sensitive information, and creating templates to inspect structured and unstructured data.

You need to:

- Inspect strings and files to perform de-identification.
- Create de-identification inspection templates.
- Configure a job trigger to run DLP inspections.

Each task is described in detail below, good luck!

----


### Task 1. Redact sensitive data from text content

To complete this task, set an environmental variable for your project ID and obtain an authorization token in Cloud Shell.

Create a JSON file called `redact-request.json` using the code that follows and use `curl` to make a `content:deidentify` request.

Save the `curl` command output in a file called `redact-response.txt`.

Upload the output file, `redact-response.txt`, to the Cloud Storage Bucket `qwiklabs-gcp-03-0d4c7521e6fa-redact`.

```json
{
    "item": {
        "value": "Please update my records with the following information:\n Email address: foo@example.com,\nNational Provider Identifier: 1245319599"
    },
    "deidentifyConfig": {
        "infoTypeTransformations": {
            "transformations": [{
                "primitiveTransformation": {
                    "replaceWithInfoTypeConfig": {}
                }
            }]
        }
    },
    "inspectConfig": {
        "infoTypes": [
            {
                "name": "EMAIL_ADDRESS"
            },
            {
                "name": "US_HEALTHCARE_NPI"
            }
        ]
    }
}
```

---

### Task 2. Create DLP inspection templates

For this task, you create two de-identification templates that are used to inspect structured and unstructured data, respectively.

Create a de-identify template for structured data with the name `structured_data_template` (in **Global (any region)**) that has two transformation rules:

#### a. First transformation rule:

| Parameter                  | Configuration                         |
|----------------------------|--------------------------------------|
| Transformation Rule fields | bank name, zip code                 |
| Transformation type        | Primitive field transformation      |
| Transformation method      | Mask with character                 |
| Masking Character         | `#`                                  |
| Mask all characters       | Enable mask all characters checkbox and do not ignore any characters |

#### b. Second transformation rule:

| Parameter                  | Configuration                         |
|----------------------------|--------------------------------------|
| Transformation Rule fields | message                              |
| Transformation type        | Match on infoType                    |
| Transformation method      | Replace with infoType name           |

Create a de-identify template for unstructured data with the name `unstructured_data_template` (in **Global (any region)**), configured as:

| Parameter        | Configuration |
|------------------|--------------|
| Transformation Rule | Replace      |
| String value     | `[redacted]`   |


---

### Task 3. Configure a job trigger to run DLP inspection

For this task, you configure a job trigger to run the Cloud Data Loss Prevention API. A few sample files have been provided for you in the Cloud Storage Bucket named `qwiklabs-gcp-03-0d4c7521e6fa-input`.

Create a DLP inspection job trigger named `dlp_job` (in **Global (any region)**).

| Parameter                                       | Configuration                                            |
|-------------------------------------------------|----------------------------------------------------------|
| Storage type                                   | Cloud Storage                                          |
| Location Type                                  | Scan a bucket with optional include/exclude rules.     |
| Cloud Storage Input location                   | `qwiklabs-gcp-03-0d4c7521e6fa-input`                                         |
| Percentage of included objects scanned within the bucket | 100%                                 |
| Sampling method                                | No sampling                                           |
| Actions                                       | Toggle **Make a de-identify copy**. Enter the names of the two templates that you created into the appropriate boxes |
| Cloud Storage output location                 | `gs://qwiklabs-gcp-03-0d4c7521e6fa-output`                                        |
| Schedule                                      | Create a trigger to run the job on a periodic schedule (**Weekly**) |

Run DLP inspection and explore the various folders and files in the Cloud Storage Bucket `gs://qwiklabs-gcp-03-0d4c7521e6fa-output` to verify the redacted data.


---

### Solution [here](https://youtu.be/9sWZC466FQk)

Run the following Commands in CloudShell

```bash
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Get%20Started%20with%20Sensitive%20Data%20Protection%20Challenge%20Lab/arc116-1.sh

sudo chmod +x arc116-1.sh

./arc116-1.sh
```

Run again the following Commands in CloudShell

```bash
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Get%20Started%20with%20Sensitive%20Data%20Protection%20Challenge%20Lab/arc116-2.sh

sudo chmod +x arc116-2.sh

./arc116-2.sh
```

---

### Congratulations!


























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