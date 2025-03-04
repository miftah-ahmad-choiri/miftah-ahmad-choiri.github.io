---
title: | 
        **Gemini for Data Scientists and Analysts** <br>
        ![Google Cloud Compute](https://img.shields.io/badge/google--cloud-compute--engine-blue)
        ![Nginx](https://img.shields.io/badge/nginx-web--server-green)
        ![Debian VM](https://img.shields.io/badge/debian-virtual--machine-red)
        ![Node.js](https://img.shields.io/badge/node.js-runtime--environment-brightgreen)
        ![Linux](https://img.shields.io/badge/linux-operating--system-black)

permalink: /docs/gcp/gemini-data-scientist-analyst/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-03-01T21:36:18-04:00
toc: true

---

---

Lab Course [Link](https://www.cloudskillsboost.google/course_templates/879)

<hr style="height: 5px; background-color: black; border: none;">

## **1. INTRODUCING GEMINI FOR DATA PROFESSIONALS**


{% include video id="_pFAmZBwels" provider="youtube" %}

<hr style="height: 5px; background-color: black; border: none;">

## **2. ANALYZE DATA WITH GEMINI ASSISTANCE (GSP9999)**

### **Overview**

In this lab, you are a data analyst who will use [Gemini](https://cloud.google.com/gemini/docs/overview) and BigQuery to analyze data and predict product sales as part of a proof of concept project at Cymbal Superstore. As part of the project, you will also determine if Gemini can be used to help analysts generate new SQL queries, complete queries, and explain complex queries.

The data used in the lab is based on the [BigQuery public datasets](https://cloud.google.com/bigquery/public-data), specifically the [bigquery-public-data.thelook_ecommerce](https://console.cloud.google.com/marketplace/product/bigquery-public-data/thelook-ecommerce) dataset that contains synthetic ecommerce and digital marketing data.

This lab assumes that you are familiar with SQL (Structured Query Language) and basic data analytics tasks. Knowledge of Google Cloud products is not assumed. If you're new to BigQuery, see the [BigQuery quickstarts](https://cloud.google.com/bigquery/docs/introduction).

**Note: **Duet AI was renamed to Gemini, our next-generation model. This lab has been updated to reflect this change. Any references to Duet AI in the user interface or documentation should be treated as equivalent to Gemini while following the lab instructions.
{:.notice--info}

**Note: **As an early-stage technology, Gemini can generate output that seems plausible but is factually incorrect. We recommend that you validate all output from Gemini before you use it. For more information, see [Gemini for Google Cloud and responsible AI](https://cloud.google.com/gemini/docs/discover/responsible-ai).
{:.notice--info}


#### **Objectives**

In this lab, you learn how to perform the following tasks:

* Use Gemini to answer your questions about Google Cloud data analytics products and use cases.
* Prompt Gemini to explain and generate SQL queries in BigQuery.
* Build a machine learning (ML) model to forecast future periods.

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


### **Task 1. Configure your environment and account**
---

In this task, you will configure your environment, account, and user, so that you can use the Cloud AI Companion API for Gemini.

1. Sign in to the Google Cloud console with your lab credentials, and open the **Cloud Shell** terminal window.
2. To set your project ID and region environment variables, in Cloud Shell, run the following commands:

    ```bash
    PROJECT_ID=$(gcloud config get-value project)
    REGION=set at lab start
    echo "PROJECT_ID=${PROJECT_ID}"
    echo "REGION=${REGION}"
    ```

3. To store the signed-in Google user account in an environment variable, run the following command:

    ```bash
    USER=$(gcloud config get-value account 2> /dev/null)
    echo "USER=${USER}"
    ```

4.  Enable the Cloud AI Companion API for Gemini:
    
    ```bash
    gcloud services enable cloudaicompanion.googleapis.com --project ${PROJECT_ID}
    ```

5.  To use Gemini, grant the necessary IAM roles to your Google Cloud Qwiklabs user account:

    ```bash
    gcloud projects add-iam-policy-binding ${PROJECT_ID} --member user:${USER} --role=roles/cloudaicompanion.user
    
    gcloud projects add-iam-policy-binding ${PROJECT_ID} --member user:${USER} --role=roles/serviceusage.serviceUsageViewer
    ```

    Adding these roles lets the user use Gemini assistance.


### **Task 2. Create a dataset and enable Gemini features in BigQuery**
---

In this task, you will create a dataset and enable the Gemini features in BigQuery.


#### Create a dataset

1. In the Google Cloud console, select the **Navigation menu**, and then select **BigQuery**. If prompted click **Done**.
2. In the **Explorer** panel, for **<code>set at lab start</code>**, select **View actions**, then select **Create dataset**. 
    You [create a dataset](https://cloud.google.com/bigquery/docs/datasets) to store database objects, including tables and models.


3. In the **Create dataset** pane, enter the following information:

    | Field         | Value              |
    |--------------|--------------------|
    | Dataset ID   | bqml_tutorial      |
    | Location type | select Multi-region |

    Leave the other fields at their defaults.

4. Click **Create Dataset**.


#### Enable the Gemini features in BigQuery

1. To view Gemini features in BigQuery, in the toolbar, click **Gemini**. If it's not visible, refresh the page.
2. In the **Gemini in BigQuery SQL editor** list, select all of the following options:
    * **Auto completion**
    * **Auto generation**
    * **Explanation**

**Note:** To disable Gemini features in BigQuery, deselect the Gemini features that you want to disable.
{:.notice--info}


### **Task 3. Use Gemini to analyze your data**
---

Gemini can help you discover and analyze your available data.

Before you can query data, you need to know what data you can access. Every data product organizes and stores data differently. To get help, you can send Gemini a natural language statement (or prompt) like, "How do I view which datasets and tables are available to me in BigQuery?"

If you want to understand the characteristics of different data query systems, you might prompt Gemini for specific product information like the following:

* "How do I get started with BigQuery?"
* "What are the benefits of using BigQuery for data analysis?"
* "How does BigQuery handle auto-scaling for queries?"

In this task, you will prompt Gemini to answer questions about your data.


#### Prompt Gemini to answer questions about your data


1. In the Google Cloud console, select the **Navigation menu**, and then select **BigQuery**.
2. In the Google Cloud console toolbar, click **Open Gemini**.
3. Click **ENABLE** to enable the Gemini for Google Cloud API.
4. The *Welcome to Gemini in Cloud Console* message is displayed in the Gemini pane. Click **Start Chatting**.
   
    **Note: **If the **Start Chatting** button is not enabled, refresh the page and open Gemini again.
    {:.notice--info}

5. In the Gemini pane, enter the prompt:
    
    ```bash
    How do I learn which datasets and tables are available to me in BigQuery?`
    ```

6.  Click send **Send prompt**.
    
    Gemini doesn't use your prompts or its responses as data to train its model. For more information, see [How Gemini for Google Cloud uses your data](https://cloud.google.com/gemini/docs/discover/data-governance).
    {:.notice--info}

    Gemini returns a response similar to the following:

    ```bash
    There are a few ways to learn which datasets and tables are available to you in BigQuery.

    You can use the Google Cloud console to browse the public datasets that are available.

    You can use the bq command-line tool to list the datasets and tables in your project.
    
    You can make calls to the BigQuery REST API to get a list of the datasets and tables in your project.
    ```

7.  To optionally reset your chat history, in the Gemini pane, click **Reset Chat**.

    **Note:** The chat history state is kept in memory only and doesn't persist when you switch to another workspace or when you close the Google Cloud console.
    {:.notice--info}


### **Task 4. Prompt Gemini to explain SQL queries in a sales dataset**
---

Gemini can help you work with SQL. For instance, if you work with SQL queries that other people wrote, Gemini in BigQuery can explain a complex query in plain language. Such explanations can help you understand the query syntax, underlying schema, and business context.

To prompt Gemini to explain an example SQL query, follow these steps:

1. In the Google Cloud console, select the **Navigation menu**, and then select **BigQuery**.
2. under Welcome to BigQuery Studio. Click **SQL QUERY**, to create a new SQL query.
3. In the query editor, paste the query that you want explained. \
    
    For example, you might want to understand how data tables and queries are related in a sales dataset, and you might want help writing queries that use the dataset. In the following example query, you might understand which tables are being used, but other sections of the query might take you time to parse and understand.

    ```bash
    SELECT u.id as user_id, u.first_name, u.last_name, avg(oi.sale_price) as avg_sale_price   
    FROM bigquery-public-data.thelook_ecommerce.users as u   
    JOIN bigquery-public-data.thelook_ecommerce.order_items as oi   
    ON u.id = oi.user_id   
    GROUP BY 1,2,3   
    ORDER BY avg_sale_price DESC   
    LIMIT 10
    ```

4. Select the query that you want Gemini to explain, and right-click on this selected query. In the menu, click **Explain current selection**. \
    The SQL explanation appears in the **Gemini** pane. \
    Using the example query from the previous step, Gemini returns an explanation similar to the following:

    ```bash
    The intent of this query is to find the top 10 users by average sale price. The query first joins the users and order_items tables on the user_id column. It then groups the results by user_id , first_name , and last_name, and calculates the average sale price for each group. The results are then ordered by average sale price in descending order, and the top 10 results are returned.
    ```

### **Task 5. Generate a SQL query that groups sales by day and product**
---

You can provide Gemini with a prompt to generate a SQL query based on your data's schema. Even if you're starting with no code, a limited knowledge of the data schema, or only a basic knowledge of SQL syntax, Gemini can suggest one or more SQL statements.

In this task, you generate a query that lists your top products for each day. This type of query is often complex, but you can automatically create a statement using Gemini. You then use tables in the **thelook_ecommerce** dataset and prompt Gemini to generate a query to calculate sales by order item and by product name.


#### Review the order_items and products tables the public dataset


1. In the Google Cloud console, select the **Navigation menu**, and then select **BigQuery**.
2. In the navigation menu, click **BigQuery Studio**.
3. In the Explorer pane, click **+ADD**.
4. In the Add dialog, within the Search for data sources field, enter `public datasets`.
5. Press **Enter**. You see public datasets in the list.
6. Click **public datasets**. You see the list of public datasets in the Marketplace.
7. Search for `thelook`. You see TheLook Ecommerce public dataset appears in the list.
8. Click **thelook Ecommerce**, two times.
9. Click **VIEW DATASET**.
10. Expand the **bigquery-public-data** that is added to the explorer panel.
11. Scroll down and find **thelook_ecommerce**, then expand the dataset. You see the `order_items` and `products` tables listed.
12. Click on the `order_items` table. You see the data schema displayed.
13. Return to the explorer panel.
14. Click on the `products` table. You see the data schema displayed.
    
    **Note:** Reviewing the schema for tables before you run Queries based upon prompts in Gemini will help to avoid errors, and potential hallucinations.
    {:.notice--info}

#### Use a prompt to generate the query



1. Click to open a new untitled query tab.
2. In the query editor, enter the following prompt, and then press ENTER. The pound character (#) prompts Gemini to generate SQL.

    ```bash
    # select the sum of sales by date, and product_id casted to day from order_items, joined with products. Include the product name in the results. Round the total_sales field to two decimal places and order results by total_sales descending.
    ```

3. Gemini suggests a SQL query similar to the one below. If you encounter any errors, please re-run the prompt, or you can execute the following command.

    ```bash
    # select the sum of sales by date, and product_id casted to day from order_items, joined with products. Include the product name in the results. Round the total_sales field to two decimal places and order results by total_sales descending.
    SELECT
        DATE(order_items.created_at) AS order_date,
        order_items.product_id,
        products.name AS product_name,
        ROUND(SUM(order_items.sale_price), 2) AS total_sales
    FROM
        `bigquery-public-data.thelook_ecommerce.order_items` AS order_items
    LEFT JOIN
        `bigquery-public-data.thelook_ecommerce.products` AS products
    ON
        order_items.product_id = products.id
    GROUP BY
        order_date,
        order_items.product_id,
        product_name
    ORDER BY
        total_sales DESC;
    ```

    **Note:** Gemini might suggest multiple SQL statements for your prompt.
    {:.notice--info}


4.  To accept the suggested code, click **Tab**, and then click **Run** to execute the SQL statement. You can also scroll through the suggested SQL and accept specific words suggested in the statement.
5. In the **Query results** pane, view the query results.

### **Task 6. Build a forecasting model and view results**
---

In this task, you use BigQuery ML to build a forecasting model and query it using a Gemini prompt.


#### Build the model

You use the following example query with actual sales, which are used as an input to the model. The query is used as a part of creating the ML model.

1. To create a forecasting ML model, in the **BigQuery SQL editor**, run the following SQL:

    ```bash
    CREATE MODEL bqml_tutorial.sales_forecasting_model
    OPTIONS(MODEL_TYPE='ARIMA_PLUS',
    time_series_timestamp_col='date_col',
    time_series_data_col='total_sales',
    time_series_id_col='product_id') AS
    SELECT sum(sale_price) as total_sales,
    DATE(created_at) as date_col,
    product_id
    FROM bigquery-public-data.thelook_ecommerce.order_items
    AS t1
    INNER JOIN bigquery-public-data.thelook_ecommerce.products
    AS t2
    ON t1.product_id = t2.id
    GROUP BY 2, 3;
    ```

    You can use Gemini to help you [understand this query](https://cloud.google.com/gemini/docs/use-cases/analyze-data-gemini#prompt-gemini-explain-sql-queries).

    **Note:**The query takes approximately 10 minutes to complete. While the model is running, you can also prompt Gemini with questions like **What is an ARIMA_PLUS model type?**
    {:.notice--info}

    When the model is created, the Results pane displays a message similar to the following:


    ```bash
    Successfully created model named sales_forecasting_model.
    ```


#### Query the model with a prompt

1. Click **+** to open a new untitled query tab.
2. In the query editor, enter the following prompt, and then press ENTER. The pound character (#) prompts Gemini to generate SQL.
    
    ```bash
    # Use sales_forecasting_model from the bqml_tutorial dataset in my project to generate a forecast and return all the resulting data.
    ```

3. Gemini suggests a SQL query similar to the one below. If you encounter any errors, please re-run the prompt, or you can execute the following command.

    ```bash
    # Use sales_forecasting_model from the bqml_tutorial dataset in my project to generate a forecast and return all the resulting data.
    SELECT *
    FROM
      ML.FORECAST(MODEL bqml_tutorial.sales_forecasting_model)
    ```

    **Note:** Gemini might suggest multiple SQL statements for your prompt.
    {:.notice--info}

4.  To accept the suggested code, click **Tab**, and then click **Run** to execute the SQL statement. You can also scroll through the suggested SQL and accept specific words suggested in the statement.
5.  In the **Query results** pane, view the query results.


### **Congratulations!**
---

In this lab you learned how to:

* Use Gemini to answer your questions about Google Cloud data analytics products and use cases.
* Prompt Gemini to explain and generate SQL queries in BigQuery.
* Build a machine learning (ML) model to forecast future periods.

<hr style="height: 5px; background-color: black; border: none;">


## **3. HOW TO ANALYZE DATA WITH GEMINI**

{% include video id="iObPJDtGsRs" provider="youtube" %}

<hr style="height: 5px; background-color: black; border: none;">

## **4. GEMINI FOR DATA SCIENTISTS (GSP9998)**

### **Overview**

In this lab, you are working as a data scientist for Cymbal superstore and you have been asked to help the marketing team identify, categorize, and develop new customers. The leadership team has asked you to split customers into 5 different groups based on their order behaviors and generate descriptive statistics about each group. However, you also want to give them some actionable next steps to take with each of these groups.

To identify these new customers, you will use Gemini, Vertex AI, and BigQuery to create, visualize, and summarize a K-means clustering model with ecommerce data to generate useful next steps for a marketing campaign. This lab is intended for data scientists of any experience level.

Configuration of the environment has already been completed for you. This includes enabling the Cloud AI Companion for Gemini and granting IAM the necessary roles to use Gemini. For more information, see Gemini for [Google Cloud overview](https://cloud.google.com/gemini/docs/overview).

**Note: **Duet AI was renamed to Gemini, our next-generation model. This lab has been updated to reflect this change. Any references to Duet AI in the user interface or documentation should be treated as equivalent to Gemini while following the lab instructions.
{:.notice--info}

**Note: **As an early-stage technology, Gemini can generate output that seems plausible but is factually incorrect. We recommend that you validate all output from Gemini before you use it. For more information, see [Gemini for Google Cloud and responsible AI](https://cloud.google.com/gemini/docs/discover/responsible-ai).
{:.notice--info}


#### **Objectives**

In this lab, you learn how to perform the following tasks:

- Use Colab Enterprise Python notebooks inside BigQuery Studio.
- Use BigQuery DataFrames inside of BigQuery Studio.
- Use Gemini to generate code from natural language prompts.
- Build a K-means clustering model.
- Generate a visualization of the clusters.
- Use the Gemini Pro model to develop the next steps for a marketing campaign.
- Clean up project resources.

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


### **Task 1. Create a BigQuery dataset for your project**
---

In this task, you will create the ecommerce dataset in BigQuery. The dataset will be used to store the ecommerce data you will categorize in this lab.

1. In the Google Cloud console, select the **Navigation menu**, and then select **BigQuery**. 
    
    The Welcome to BigQuery in the Cloud Console pop-up is displayed.
  
2. Click **Done**.
3. In the **Explorer** panel, for **<code>Project ID</code>**, select **View actions**, and then select **Create dataset**. 
    
    You [create a dataset](https://cloud.google.com/bigquery/docs/datasets) to store database objects, including tables and models.

4. In the **Create dataset** pane, enter the following information:

    | Field          | Value                                         |
    |---------------|-----------------------------------------------|
    | Dataset ID    | ecommerce                                     |
    | Location type | select Multi-Region                          |
    | Multi-region  | select US (multiple regions in United States) |

    Leave the other fields at their defaults.

5. Click **Create Dataset**.


### **Task 2. Create a new Python notebook**
---

In this task, you create a new Python notebook in BigQuery, so that you may use Gemini in BigQuery. The Python notebook is needed in BigQuery so that you may use Python machine learning libraries to identify customers and categorize them into groups, based upon shopping data in the ecommerce dataset.

1. In the Google Cloud console, select the **Navigation menu**, and then select **BigQuery**.
2. At the top of the page, click the **down arrow** next to the plus sign.
3. Select **Python Notebook**.
4. Select the region **<code>Region</code>** to store your code assets from the dropdown and click **Select**.
5. In the **Start with a template** pane, click **Close**.


### **Task 3. Connect to the Colab Enterprise runtime in BigQuery**
---

The next step is to connect to the Colab Enterprise runtime in BigQuery. Think of this runtime as a managed environment in BigQuery that allows you to access machine learning libraries that can help you identify your customers and categorize them into groups.

1. While remaining in the BigQuery Studio console, in the upper right corner of the notebook click on the **down arrow** next to Connect.
2. In the drop down select **Connect to a runtime**.
3. Select **Create new runtime**.
4. Select **Create default runtime**.
5. Click on the **Qwiklabs student ID**.

    **Note:** Wait a few minutes while the runtime is allocated. You will then see the connection status update to Connected at the bottom of your browser window. You will also notice that the Python notebook is added in the notebooks section of the explorer under your project.
    {:.notice--info}


### **Task 4. Build the Python Notebook**
---

In this task, you begin to build the Python notebook, by performing the following steps:

* Import Python libraries
* Define variables
* Create and import a base table as a BigQuery DataFrame from a public dataset
* Generate the K-means clustering model and visualization


#### Import Python libraries and define variables

The first step to build the Python notebook is to import python libraries and define variables.

To import the libraries into your notebook, use the steps below:

1. Add a code cell into the notebook, click the **+Code** button at the top of the notebook window.
2. Paste the following code snippet into the cell:

    ```python
    from google.cloud import bigquery
    from google.cloud import aiplatform
    import bigframes.pandas as bpd
    import pandas as pd
    from vertexai.language_models._language_models import TextGenerationModel
    from vertexai.generative_models import GenerativeModel
    from bigframes.ml.cluster import KMeans
    from bigframes.ml.model_selection import train_test_split
    ```

3. Run the cell. 
    
    The runtime will load the Python libraries, which will take approximately 1 minute. You can follow the progress by checking the status of the runtime at the bottom of the browser window. 
    
    When complete you will see a green checkmark next to the Run button on the cell.

    The table below provides more information about the Python libraries that you just imported to your notebook, including a brief description about each one.


    | Library             | Description                                                                 |
    |---------------------|---------------------------------------------------------------------------|
    | BigQuery           | Python Client for Google BigQuery                                         |
    | AI Platform        | Vertex AI SDK for Python                                                 |
    | bigframes.pandas   | BigQuery DataFrames                                                      |
    | pandas            | Open source data analysis and manipulation tool, built on top of Python.  |
    | TextGenerationModel | Creates a LanguageModel within Vertex AI.                                |
    | Kmeans            | Used to create K-means clustering models within BigQuery DataFrames.      |
    | train_test_split  | Splits dataset into test and training subsets for model tuning in BigQuery DataFrames. |

    **Note:** If you want to learn more about each library, use the link provided.
    {:.notice--info}


#### Define variables and initiate the BigQuery and Vertex AI connection

Next you will define variables and initiate the BigQuery and Vertex AI connection.

1. Add another code cell at the end of the notebook.
2. Paste the following code snippet into the cell.

    ```bash
    project_id = '<project_id>'
    dataset_name = "ecommerce"
    model_name = "customer_segmentation_model"
    table_name = "customer_stats"
    location = "<location>"
    client = bigquery.Client(project=project_id)
    aiplatform.init(project=project_id, location=location)
    ```
3. Replace **&lt;project_id>** with **<code>Project ID</code>**.
4. Replace **&lt;location>** with **<code>Region</code>**.
5. Run the cell.

#### Create and import the ecommerce.customer_stats table

Next you will store data from thelook_ecommerce BigQuery public dataset into a new table entitled customer_status in your ecommerce dataset.

1. Add another code cell at the end of the notebook.
2. Paste the following code snippet into the cell.

    ```python
    %%bigquery
    CREATE OR REPLACE TABLE ecommerce.customer_stats AS
    SELECT
      user_id,
      DATE_DIFF(CURRENT_DATE(), CAST(MAX(order_created_date) AS DATE), day) AS days_since_last_order, ---RECENCY
      COUNT(order_id) AS count_orders, --FREQUENCY
      AVG(sale_price) AS average_spend --MONETARY
      FROM (
          SELECT
            user_id,
            order_id,
            sale_price,
            created_at AS order_created_date
            FROM `bigquery-public-data.thelook_ecommerce.order_items`
            WHERE
            created_at
                BETWEEN '2022-01-01' AND '2023-01-01'
      )
    GROUP BY user_id;
    ```

3. Run the cell.


#### Create a BigQuery DataFrame and load the data using a Gemini prompt

In this step, you create a BigQuery DataFrame using a Gemini prompt and load the customer stats data into it, so that you may process the data later with the K-means clustering model.

**Note:** As mentioned at the start of the lab, you need to validate all output from Gemini before use. Use the code examples provided to assist you, however, do not copy and paste the code as is, as this may not work in some cases. You may also want to regenerate the code from Gemini for a more favorable output.
{:.notice--warning}

1. Add another code cell at the end of the notebook.
2. Within the cell, click **generate**. This allows you to generate code with Gemini, and you will see a prompt where you can add text.
3. Paste the following text into the prompt.
    
    ```python
    Convert the table ecommerce.customer_stats to a bigframes dataframe and show the top 10 records
    ```

4. Click **generate**. Gemini will generate the code below.

    ```python
    bqdf = client.read_gbq(f"{project_id}.{dataset_name}.{table_name}")
    df.head(10)
    ```
  
    **Note:** Remember that in a previous step, you added code to cell number 2 in the notebook that saved the project ID, the dataset name, and the table name as variables. If you completed this step, when you run the cell in the next step you will not have any issues and the DataFrame will be created with the first 10 rows displayed.
    {:.notice--info}

5.  Regenerate the code so that the output looks similar to the code shown here:

    ```python
    bqdf = bpd.read_gbq(f"{project_id}.{dataset_name}.{table_name}")
    
    bqdf.head(10)
    ```

6.  Run the cell. 
    
    You will see the BigQuery DataFrame output with the first 10 rows of the dataset displayed.


#### Generate the K-means clustering model

Now that you have your customer data in a BigQuery DataFrame, you will create a K-means clustering model to split the customer data into clusters based on fields like order recency, order count, and spend, and you will then visualize these as groups within a chart directly within the notebook.

1. Add another code cell at the end of the notebook.
2. Click **generate** in the cell. This will allow you to generate code with Gemini using a prompt.
3. Add the following prompt to the cell:
    
    ```bash     
    1. Split df (using random state and test size 0.2) into test and training data for a K-means clustering algorithm store these as df_test and df_train. 2. Create a K-means cluster model using bigframes.ml.cluster KMeans with 5 clusters. 3. Save the model using the to_gbq method where the model name is project_id.dataset_name.model_name.
    ```

4. Click **generate**. You will see output similar to the following:

    ```python
    #prompt: 1. Split df (using random state and test size 0.2) into test and training data for a K-means clustering algorithm store these as df_test and df_train. 2. Create a K-means cluster model using bigframes.ml.cluster KMeans with 5 clusters. 3. Save the model using the to_gbq method where the model name is project_id.dataset_name.model_name.

    df_train, df_test = train_test_split(bq_df, test_size=0.2, random_state = 42)
    kmeans = KMeans(n_clusters=5)
    kmeans.fit(df_train)
    kmeans.to_gbq(f"{project_id}.{dataset_name}.{model_name}")
    ```
5.  Run the cell.
   
    **Note:** This step will take approximately 2 minutes to complete.
    {:.notice--info}

    Your model is now created!

6.  Refresh the contents of your Explorer panel by clicking the **three dots** next to your project name and selecting **Refresh contents**. It should pop up under your ecommerce dataset. 
    
    Next, you define a new BigQuery DataFrame that joins the segment/cluster produced by the K-means model back to the original data.

7.  Add another code cell at the end of the notebook.
8.  Click **generate** in the cell. \
    This will allow you to generate code with Gemini using a prompt.

9.  Add the following prompt to the cell:
    
    ```python
    1. Call the K-means prediction model on the df dataframe, and store the results as predictions_df and show the first 10 records.
    ```

10. Click **generate**. You will see output similar to the following:

    ```python
    # prompt: 1. Call the K-means prediction model on the df dataframe, and store the results as predictions_df and show the first 10 records.

    predictions_df = kmeans.predict(df_test)
    predictions_df.head(10)
    ```

11. Run the cell.
    You see that the first 10 records are shown with the CENTROID_ID. CENTROID_ID is the cluster that the customer will be categorized as later in the lab. You also see the user_id, days_since_last_order, count_orders and average_spend fields.


#### Create a visualization of the K-means clustering model results

In this next step, you will create a visualization of the K-means clustering model results. Specifically, you will generate a scatterplot using predictions_df to look at the relationship between the days since last order by average spend, colored by segment_id (which was generated using our K-means model!)

1. Add another code cell at the end of the notebook.
2. Click **generate** in the cell. This will allow you to generate code with Gemini using a prompt.
3. Add the following prompt to the cell:
    
    ```bash
    1. Using predictions_df, and matplotlib, generate a scatterplot. 2. On the x-axis of the scatterplot, display days_since_last_order and on the y-axis, display average_spend from predictions_df. 3. Color by cluster. 4. The chart should be titled "Attribute grouped by K-means cluster."
    ```

4. Click **generate**. You will see output similar to the following:

    ```python
    #prompt: 1. Using predictions_df, and matplotlib, generate a scatterplot. 2. On the x-axis of the scatterplot, display days_since_last_order and on the y-axis, display average_spend from predictions_df. 3. Color by cluster. 4. The chart should be titled "Attribute grouped by K-means cluster."

    import matplotlib.pyplot as plt

    # Create the scatter plot
    plt.figure(figsize=(10, 6))  # Adjust figure size as needed
    plt.scatter(predictions_df['days_since_last_order'], predictions_df['average_spend'], c=predictions_df['cluster'], cmap='viridis')

    # Customize the plot
    plt.title('Attribute grouped by K-means cluster')
    plt.xlabel('Days Since Last Order')
    plt.ylabel('Average Spend')
    plt.colorbar(label='Cluster ID')

    # Display the plot
    plt.show()
    ``` 

5.  Replace **'cluster'** or **'cluster_id'** with **'CENTROID_ID'** in the **c=predictions_df** field only.
6.  Run the cell. 
    You will see the visualization displayed. 

    **Note:** If you get a **TypeError** replace the code with the example output and then run the cell.
    {:.notice--info}


### **Task 5. Generate insights from the results of the model**
---

In this task, you generate insights from the results of the model by performing the following steps:

* Summarize each cluster generated from the K-means model
* Define a prompt for the marketing campaign
* Generate the marketing campaign using the text-bison model


#### Summarize each cluster generated from the K-means model

In this step, you will summarize each cluster generated from the K-means model.

1. Add another code cell at the end of the notebook.
2. Paste the following code snippet into the cell:


    ```python
    query = """
    SELECT
      CONCAT('cluster ', CAST(centroid_id as STRING)) as centroid,
      average_spend,
      count_orders,
      days_since_last_order
    FROM (
      SELECT centroid_id, feature, ROUND(numerical_value, 2) as value
      FROM ML.CENTROIDS(MODEL `{0}.{1}`)
    )
    PIVOT (
      SUM(value)
      FOR feature IN ('average_spend',  'count_orders', 'days_since_last_order')
    )
    ORDER BY centroid_id
    """.format(dataset_name, model_name)

    df_centroid = client.query(query).to_dataframe()

    df_centroid.head()
    ```

3. Run the cell.
    
    You should see the clusters summarized in a table. Some insights you can get from this table are that some clusters have a higher average spend, and others have a higher count of orders. 
    
    Next, you will convert the data frame into a string, so you can pass it to your large language model call.

4. Add another code cell at the end of the notebook.
5. Paste the following code snippet into the cell:

    ```python
    df_query = client.query(query).to_dataframe()
    df_query.to_string(header=False, index=False)

    cluster_info = []
    for i, row in df_query.iterrows():
      cluster_info.append("{0}, average spend ${2}, count of orders per person {1}, days  since last order {3}"
      .format(row["centroid"], row["count_orders"], row["average_spend"], row["days_since_last_order"]) )

    cluster_info = (str.join("\n", cluster_info))
    print(cluster_info)
    ```

6.  Run the cell.
    The output should be similar to:


    ```python
    cluster 1, average spend $48.32, count of orders per person 1.36, days since last order 384.37
    cluster 2, average spend $202.34, count of orders per person 1.3, days since last order 482.62
    cluster 3, average spend $45.68, count of orders per person 1.36, days since last order 585.4
    cluster 4, average spend $44.71, count of orders per person 1.36, days since last order 466.26
    cluster 5, average spend $58.08, count of orders per person 3.92, days since last order 427.36
    ```

#### Generating the marketing campaign using the Gemini model

You have created a K-means model, assigned each customer to a cluster from the model, generated summary statistics for each cluster. In this step you will use Gemini to generate code from a prompt to create a marketing campaign, with customer insights and next steps for our marketing team.

For each cluster/segment defined by the K-means model, we'll generate three items that can be used by our marketing team:

* Title
* Persona
* Next marketing step

1. Add another code cell at the end of the notebook.
2. Paste the following code snippet into the cell:

    ```python
    model = GenerativeModel("gemini-1.0-pro")

    prompt = f"""
    You're a creative brand strategist, given the following clusters, come up with \
    creative brand persona, a catchy title, and next marketing action, \
    explained step by step. Identify the cluster number, the title of the person, a persona for them and the next marketing step.

    Clusters:
    {cluster_info}

    For each Cluster:
    * Title:
    * Persona:
    * Next marketing step:
    """

    responses = model.generate_content(
      prompt,
      generation_config={
          "temperature": 0.1,
          "max_output_tokens": 800,
          "top_p": 1.0,
          "top_k": 40,
      }
    )

    print(responses.text)
    ```

3. Run the cell.
    You should see each cluster with the title, persona and next steps.

    ```bash
    **Cluster 1:**

    * **Title:** The Lapsed Loyalists
    * **Persona:** These customers have made a purchase in the past but haven't returned for an extended period. They likely had a positive experience but haven't been engaged recently.
    * **Next Marketing Step:** 
      1. **Re-engagement campaign:** Send personalized emails or targeted ads reminding them of their previous purchase and highlighting new products or promotions that might interest them.
      2. **Offer exclusive discounts or incentives:** Motivate them to return with special offers or loyalty rewards.
      3. **Personalized product recommendations:** Leverage purchase history and browsing behavior to suggest relevant products they might be interested in.

    **Cluster 2:**

    * **Title:** The Occasional Treaters
    * **Persona:** These customers make infrequent purchases but spend more when they do. They likely view the brand as a premium option for special occasions.
    * **Next Marketing Step:**
      1. **Highlight exclusivity and premium value:** Emphasize the unique features and benefits of your products to justify the higher price point.
      2. **Offer limited-time promotions or bundles:** Encourage larger purchases with special deals on high-value items or curated product sets.
      3. **Create a sense of urgency and scarcity:** Promote limited-edition products or flash sales to encourage immediate action.

    **Cluster 3:**

    * **Title:** The One-and-Done Buyers
    * **Persona:** These customers have only made a single purchase and haven't returned. They might have had a neutral experience or haven't found a reason to come back.
    * **Next Marketing Step:**
      1. **Gather feedback:** Send post-purchase surveys to understand their experience and identify areas for improvement.
      2. **Offer personalized recommendations:** Based on their initial purchase, suggest complementary products or accessories to encourage further engagement.
      3. **Showcase customer testimonials and social proof:** Highlight positive reviews and user-generated content to build trust and encourage repeat purchases.

    **Cluster 4:**

    * **Title:** The Big Spenders
    * **Persona:** These customers spend significantly more than others and are likely your most loyal and valuable segment. They appreciate high-quality products and personalized experiences.
    * **Next Marketing Step:**
      1. **Develop a VIP program:** Offer exclusive benefits, early access to new products, and personalized customer service to show appreciation and encourage continued loyalty.
      2. **Personalized communication and offers:** Tailor your marketing messages and promotions to their specific interests and purchase history.
      3. **Host exclusive events or experiences:** Create opportunities for them to connect with the brand and other high-value customers.

    **Cluster 5:**

    * **Title:** The Price-Conscious Shoppers
    * **Persona:** These customers are primarily driven by price and make infrequent, low-value purchases. They are likely to compare prices and seek the best deals.
    * **Next Marketing Step:**
      1. **Promote competitive pricing and value-driven offers:** Highlight your competitive prices and bundle deals to attract price-sensitive customers.
      2. **Offer free shipping or other incentives:** Reduce purchase barriers by offering free shipping or other attractive incentives.
      3. **Focus on product benefits and value for money:** Emphasize the quality and functionality of your products to justify the price point. 
    ```

### **Task 6. Clean up project resources (Optional)**
---

In this lab, you created resources within the Google Cloud console. In a production environment you will need to remove these resources from your account, as they would be no longer needed once the insights from the model are collected. To remove the resources from your account and avoid further charges for their use, you have two options:

* Remove the project (see cautions below)
* Remove the individual resources


#### Clean up resources by removing the project

To avoid incurring charges to your Google Cloud account for the resources used in this tutorial, you can delete the Google Cloud project that you created for this tutorial.

**Caution:** Deleting a project has the following effects:
{:.notice--danger}

* Everything in the project is deleted. If you used an existing project for the tasks in this document, when you delete it, you also delete any other work you've done in the project.
* Custom project IDs are lost. When you created this project, you might have created a custom project ID that you want to use in the future. To preserve the URLs that use the project ID, such as an appspot.com URL, delete selected resources inside the project instead of deleting the whole project.

If you plan to explore multiple architectures, tutorials, or quickstarts, reusing projects can help you avoid exceeding project quota limits.

1. In the Google Cloud console, go to the **IAM & Admin > Manage resources** page.
2. In the project list, select the project that you want to delete, and then click **Delete**.
3. In the dialog, type the *project ID*, and then click **Shut Down Anyway** to delete the project.


#### Clean up resources by deleting individual resources

To avoid incurring charges, you can delete the table and model used in this lab by running the following code in a new code cell within the notebook:


    ```python
    # Delete customer_stats table

    client.delete_table(f"{project_id}.{dataset_name}.{table_name}", not_found_ok=True)
    print(f"Deleted table: {project_id}.{dataset_name}.{table_name}")

    # Delete K-means model
    client.delete_model(f"{project_id}.{dataset_name}.{model_name}", not_found_ok=True)
    print(f"Deleted model: {project_id}.{dataset_name}.{model_name}")
    ```

After you run the cell, you can refresh the contents of your project in BigQuery studio to observe the deletion of the table and the model.


### **Congratulations!**
---

In this lab, you learned how to:

* Use Colab Enterprise Python notebooks inside BigQuery Studio.
* Use BigQuery DataFrames inside of BigQuery Studio.
* Use Gemini to generate code from natural language prompts.
* Build a K-means clustering model.
* Generate a visualizations of the clusters.
* Use the text-bison model to develop the next steps for a marketing campaign.

<hr style="height: 5px; background-color: black; border: none;">

## **5. DESIGNING AN LLM CONECTED MODEL WITH GEMINI**

{% include video id="Wek8P-M1Wjw" provider="youtube" %}

<hr style="height: 5px; background-color: black; border: none;">


































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