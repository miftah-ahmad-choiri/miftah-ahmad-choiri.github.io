---
title: | 
        **Work with Gemini Models in BigQuery** <br>
        ![Google Cloud Compute](https://img.shields.io/badge/google--cloud-compute--engine-blue)
        ![Nginx](https://img.shields.io/badge/nginx-web--server-green)
        ![Debian VM](https://img.shields.io/badge/debian-virtual--machine-red)
        ![Node.js](https://img.shields.io/badge/node.js-runtime--environment-brightgreen)
        ![Linux](https://img.shields.io/badge/linux-operating--system-black)

permalink: /docs/gcp/gemini-big-query/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-03-01T21:36:18-04:00
toc: true

---



Lab Course [Link](https://www.cloudskillsboost.google/course_templates/1133)

<hr style="height: 5px; background-color: black; border: none;">

## **1. CRM USE CASE: SOCIAL MEDIA SENTIMENT ANALYSIS**


{% include video id="JiQnl1z4wzY" provider="youtube" %}


<hr style="height: 5px; background-color: black; border: none;">

## **2. WORK WITH AI/ML MODELS IN BIGQUERY**


{% include video id="N0QFv7UXuHU" provider="youtube" %}

<hr style="height: 5px; background-color: black; border: none;">

## **3. GEMINI IN ACTION: ANALYZE CUSTOMER REVIEWS WITH SQL**


{% include video id="7ZpHUcMGo1U" provider="youtube" %}

<hr style="height: 5px; background-color: black; border: none;">


## **4. ANALYZE CUSTOMER REVIEWS WITH GEMINI USING SQL (GSP1246)**

### **Overview**

In this lab you learn how to use BigQuery Machine Learning with remote models (Gemini Pro) in SQL to extract keywords, assess customer sentiment in customer reviews, and respond to customer reviews with zero-shot and few-shot prompts.

BigQuery is a fully managed, AI-ready data analytics platform that helps you maximize value from your data and is designed to be multi-engine, multi-format, and multi-cloud. One of its key features is BigQuery Machine Learning, which lets you create and run machine learning (ML) models by using [SQL queries or with Colab Enterprise notebooks](https://cloud.google.com/bigquery/docs/bqml-introduction).

Gemini is a family of generative AI models developed by Google DeepMind that is designed for multimodal use cases. The Gemini API gives you access to the Gemini Pro, [Gemini Pro Vision and Gemini Flash models](https://cloud.google.com/bigquery/docs/generative-ai-overview#generative_ai).

Additionally, you'll use the Gemini Pro Vision model to generate summaries and extract relevant keywords from customer review images.

#### Objectives

In this lab, you learn how to:

- Create a Cloud Resource connection in BigQuery.
- Create the dataset, and tables in BigQuery.
- Create the Gemini remote models in BigQuery.
- Prompt Gemini to analyze keywords and sentiment (positive, or negative) for text based customer reviews.
- Generate a report with a count of positive, and negative reviews.
- Respond to customer reviews.
- Prompt Gemini to extract a summary and keywords for each customer review image.

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

### **Task 1. Create the cloud resource connection and grant IAM role**
---

#### Create the cloud resource connection in BigQuery

In this task you create a Cloud resource connection in BigQuery, so you can work with Gemini Pro and Gemini Pro Vision models. You will also grant the cloud resource connection's service account IAM permissions, through a role, to enable it access the Vertex AI services.

1. In the Google Cloud console, on the **Navigation menu**, click **BigQuery**.
2. Click **DONE** on the Welcome pop-up.
3. To create a connection, click **+ ADD**, and then click **Connections to external data sources**.
4. In the Connection type list, select **Vertex AI remote models, remote functions and BigLake (Cloud Resource)**.
5. In the Connection ID field, enter **gemini_conn** for your connection.
6. For **Location type** select **Multi-region** and then, from dropdown select **US** multi-region.
7. Use the defaults for the other settings.
8. Click **Create connection**.
9. Click **GO TO CONNECTION**.
10. In the Connection info pane, copy the service account ID to a text file for use in the next task. You will also see that the connection is added under the External Connections section of your project in the BigQuery Explorer.


#### Grant Vertex AI User role to the connection's service account

1. In the console, on the **Navigation menu**, click **IAM & Admin**.
2. Click **Grant Access**.
3. In the **New principals** field, enter the service account ID that you copied earlier.
4. In the Select a role field, enter **Vertex AI**, and then select **Vertex AI User** role.
5. Click **Save**.
    The result is the service account now includes the Vertex AI User role.


### **Task 2. Review images, and files, and grant IAM role to service account**
---

In this task, you review the dataset and the image files, then you grant IAM permissions to the cloud resource connection's service account.

#### Review the image files and customer reviews dataset on Cloud Storage

Before you dive into this task to grant permissions to the resource connection service account, review the dataset and the image files.

1. In the console, select the **Navigation menu**, and then select **Cloud Storage**.
2. Click on **Buckets** and Select the **<code>set at lab start</code>-bucket** bucket.
3. The bucket contains the `gsp1246` folder, open the folder. You will see two items in it:
    * The `images` folder contains all image files you will analyze. Feel free to access the images folder and review the image files.
    * The `customer_reviews.csv` file is the dataset that contains the text based customer reviews.
    
    **Note:** You can use the Authenticated URL for each image and the customer_reviews.csv file to download and review each item.
    {:.notice--info}


#### Grant IAM Storage Object Admin role to the connection's service account

Granting IAM permissions to the resource connection's service account before you start working in BigQuery will ensure you do not encounter access denied errors when running queries.

1. Return to the root of the bucket.
2. Click **PERMISSIONS**.
3. Click **GRANT ACCESS**.
4. In the **New principals** field, enter the service account ID you copied earlier.
5. In the Select a role field, enter **Storage Object**, and then select **Storage Object Admin** role.
6. Click **Save**. \
    The result is the service account now includes the Storage Object Admin role.

### **Task 3. Create the dataset, and tables in BigQuery**
---

In this task, you create a dataset for the project, the table for customer reviews, and the image object table.


#### Create the dataset

1. In the console, select the **Navigation menu**, and then select **BigQuery**.
2. In the **Explorer** panel, for **<code>set at lab start</code>**, select **View actions**, and then select **Create dataset**. 
    You [create a dataset](https://cloud.google.com/bigquery/docs/datasets) to store database objects, including tables and models.

3. In the **Create dataset** pane, enter the following information:

    | Field          | Value          |
    |---------------|---------------|
    | Dataset ID    | gemini_demo    |
    | Location type | select Multi-region |
    | Multi-region  | select US      |

4. Leave the other fields at their defaults.
5. Click **Create Dataset**. \
    
    The result is the `gemini_demo` dataset is created and listed underneath your project in the BigQuery Explorer.

#### Create the table for the customer reviews

To create the customer reviews table you will use a SQL query.

1. Click the **+** to **Create a new SQL Query**.
2. In the query editor, paste the query below.

    ```sql
    LOAD DATA OVERWRITE gemini_demo.customer_reviews
    (customer_review_id INT64, customer_id INT64, location_id INT64, review_datetime DATETIME, review_text STRING, social_media_source STRING, social_media_handle STRING)
    FROM FILES (
      format = 'CSV',
      uris = ['gs://set at lab start-bucket/gsp1246/customer_reviews.csv']);
    ```

    This query uses the [LOAD DATA statement](https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#loading_csv_data_into_a_table) to load the `customer_reviews.csv` file from Cloud Storage to a BigQuery table with the given column names and data types.

3. Click **Run**.
   
    The result is the query is processed and the `customer_reviews` table created with the `customer_review_id`, `customer_id`, `location_id`, `review_datetime`, `review_text`, `social_media_source`, and `social_media_handle` for each review in the dataset.

4. In the Explorer, click on the **customer_reviews** table and review the schema and details. Feel free to query the table to review records.


#### Create the object table for the review images

To create the object table you will use a SQL Query.

1. Click the **+** to **Create new SQL query**.
2. In the query editor, paste the query below.

    ```sql
    CREATE OR REPLACE EXTERNAL TABLE
      `gemini_demo.review_images`
    WITH CONNECTION `us.gemini_conn`
    OPTIONS (
      object_metadata = 'SIMPLE',
      uris = ['gs://set at lab start-bucket/gsp1246/images/*']
      );
    ```

3. Run the Query. 
    
    The result is the `review_images` [object table](https://cloud.google.com/bigquery/docs/object-table-introduction) is added to the `gemini_demo` dataset and loaded with the uri (the cloud storage location) of each audio review in the sample dataset.

4. In the Explorer, click on the **review_images** table and review the schema and details. Feel free to query the table to review specific records.


### **Task 4. Create the Gemini models in BigQuery**
---

Now that the tables are created, you can begin to work with them. In this task, you create models for [Gemini Pro and Gemini Pro Vision in BigQuery](https://cloud.google.com/bigquery/docs/generative-ai-overview).

#### Create the Gemini Pro model

1. Click the **+** to **Create a new SQL Query**.
2. In the query editor, paste the query below and run it.


    ```sql
    CREATE OR REPLACE MODEL `gemini_demo.gemini_pro`
    REMOTE WITH CONNECTION `us.gemini_conn`
    OPTIONS (endpoint = 'gemini-pro')
    ```

    The result is the `gemini_pro` model is created and you see it added to the `gemini_demo` dataset, in the models section.

3. In the Explorer, click on the **gemini_pro** model and review the details and schema.

#### Create the Gemini Pro Vision model

1. Click the **+** to **Create a new SQL Query**.
2. In the query editor, paste the query below and run it.

    ```sql
    CREATE OR REPLACE MODEL `gemini_demo.gemini_pro_vision`
    REMOTE WITH CONNECTION `us.gemini_conn`
    OPTIONS (endpoint = 'gemini-pro-vision')
    ```

3. The result is the `gemini_pro_vision` model is created and you see it added to the `gemini_demo` dataset, in the models section.

4. In the Explorer, click on the **gemini_pro_vision** model and review the details and schema.

### **Task 5. Prompt Gemini to analyze customer reviews for keywords and sentiment**
---

In this task, you will use Gemini Pro model to analyze each customer review for keywords and sentiment, either positive or negative.


#### Analyze the customer reviews for keywords

1. Click the **+** to **Create a new SQL Query**.
2. In the query editor, paste the query below, and run it.

    ```sql
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_keywords` AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_pro`,
    (
      SELECT social_media_source, customer_id, location_id, review_text, review_datetime, CONCAT(
          'For each review, provide keywords from the review. Answer in JSON format with one key: keywords. Keywords should be a list.',
          review_text) AS prompt
      FROM `gemini_demo.customer_reviews`
    ),
    STRUCT(
       0.2 AS temperature, TRUE AS flatten_json_output)));
    ```
    
    This query takes customer reviews from the `customer_reviews` table, constructs prompts for the `gemini_pro` model to identify keywords within each review. The results are then stored in a new table `customer_reviews_keywords`. 
    
    Please wait. The model takes approximately 30 seconds to process the customer review records. 
    
    When the model is finished, the result is the `customer_reviews_keywords` table is created.

3. In the Explorer, click on the **customer_reviews_keywords** table and review the schema and details.
4. Click the **+** to **Create a new SQL Query**.
5. In the query editor, paste and run the query below.

    ```sql
    SELECT * FROM gemini_demo.customer_reviews_keywords
    ```

    The result is rows are displayed from the `customer_reviews_keywords` table with the `ml_generate_text_llm_result` column containing the keywords analysis, `social_media_source`, `review_text`, `customer_id`, `location_id` and `review_datetime` columns included.

#### Analyze the customer reviews for positive and negative sentiment

1. Click the **+** to **Create a new SQL Query**.
2. In the query editor, paste the query below, and run it.

    ```sql
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_analysis` AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_pro`,
    (
      SELECT social_media_source, customer_id, location_id, review_text, review_datetime, CONCAT(
          'Classify the sentiment of the following text as positive or negative.',
          review_text, "In your response don't include the sentiment explanation. Remove all extraneous information from your response, it should be a boolean response either positive or negative.") AS prompt
      FROM `gemini_demo.customer_reviews`
    ),
    STRUCT(
        0.2 AS temperature, TRUE AS flatten_json_output)));
    ```

    This query takes customer reviews from the `customer_reviews` table, constructs prompts for the `gemini_pro` model to classify the sentiment of each review. The results are then stored in a new table `customer_reviews_analysis`, so that you may use it later for further analysis.

    Plese wait. The model takes approximately 20 seconds to process the customer review records.

    When the model is finished, the result is the `customer_reviews_analysis` table is created.

3. In the Explorer, click on the **customer_reviews_analysis** table and review the schema and details.
4. Click the **+** to **Create a new SQL Query**.
5. In the query editor, paste and run the query below.


    ```sql
    SELECT * FROM `gemini_demo.customer_reviews_analysis`
    ORDER BY review_datetime
    ```
  
    The result is rows `customer_reviews_analysis` table with the `ml_generate_text_llm_result` column containing the sentiment analysis, with the `social_media_source`, `review_text`, `customer_id`, `location_id` and `review_datetime` columns included. 
    
    Take a look at some of the records. You may notice some of the results for positive and negative may not be formatted correctly, with extraneous characters like periods, or extra space. You can sanitize the records by using the view below.

#### Create a view to sanitize the records

1. Click the **+** to **Create a new SQL Query**.
2. In the query editor, paste and run the query below.

    ```sql
    CREATE OR REPLACE VIEW gemini_demo.cleaned_data_view AS
    SELECT REPLACE(REPLACE(LOWER(ml_generate_text_llm_result), '.', ''), ' ', '') AS sentiment, 
    REGEXP_REPLACE(
          REGEXP_REPLACE(
                REGEXP_REPLACE(social_media_source, r'Google(\+|\sReviews|\sLocal|\sMy\sBusiness|\sreviews|\sMaps)?', 'Google'), 
                'YELP', 'Yelp'
          ),
          r'SocialMedia1?', 'Social Media'
      ) AS social_media_source,
    review_text, customer_id, location_id, review_datetime
    FROM gemini_demo.customer_reviews_analysis;
    ```

    The query creates the view, `cleaned_data_view` and includes the sentiment results, the review text, the customer id and the location id. It then takes the sentiment result (positive or negative) and ensures that all letters are made lower case, and extreanous characters like extra spaces or periods are removed. The resulting view will make it easier to do further analysis in later steps within this lab.

3. You can query the view with the query below, to see the rows created.

    ```sql
    SELECT * FROM gemini_demo.cleaned_data_view
    ORDER BY review_datetime
    ```

    This query is designed to fetch all data from the `cleaned_data_view` view and then arrange it in ascending order based on the date and time of the reviews.


#### Create a report of positive and negative review counts

1. You can use BigQuery to create a bar chart report of the counts of positive and negative reviews. Start with the query below.

    ```sql
    SELECT sentiment, COUNT(*) AS count
    FROM `gemini_demo.cleaned_data_view`
    WHERE sentiment IN ('positive', 'negative')
    GROUP BY sentiment;
    ```

2. The result is counts for positive and negative reviews are displayed.
3. To create the bar chart report of these counts, click **CHART** in the Query results section of BigQuery. BigQuery will automatically set the chart configuration, with chart type of Bar, and the sentiment column (the predicted sentitment as positive or negative) and the bar will display the count.

#### Create a count of positive and negative reviews by social media source

1. You can use BigQuery to list the count of positive and negative reviews per social media source using the query below.

    ```sql
    SELECT sentiment, social_media_source, COUNT(*) AS count
    FROM `gemini_demo.cleaned_data_view`
    WHERE sentiment IN ('positive') OR sentiment IN ('negative')
    GROUP BY sentiment, social_media_source
    ORDER BY sentiment, count;
    ```

    Click **Check my progress** to verify the objective.

### **Task 6. Respond to customer reviews**

You can also use Gemini Pro to respond to customer reviews. In this task you will learn how to create a marketing response using zero-shot and a customer service response using few-shot, against specific reviews in the `customer_reviews` table.

**Note:** Refer to [zero-shot vs. few-shot prompts](https://ai.google.dev/gemini-api/docs/prompting-strategies#zero-shot-vs-few-shot-prompts) within the Google AI for Developers documentation for more information.
{:.notice--info}


#### Marketing response

The customer with `customer_id` 5576 responded with:

The location was clean and inviting. I also like that there is a variety of seating because sometimes I want to cuddle up with my coffee and read and other times I prefer a tall chair and table so I can work on projects.
{:.notice--info}

This is clearly a positive review, how can you use Gemini Pro to respond to this customer and incentivize them for the positive review?

1. You can use Gemini Pro with these queries to accomplish this. In the query editor, paste the query below and run it.

    ```sql
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_marketing` AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_pro`,
    (
      SELECT social_media_source, customer_id, location_id, review_text, review_datetime, CONCAT(
          'You are a marketing representative. How could we incentivise this customer with this positive review? Provide a single response, and should be simple and concise, do not include emojis. Answer in JSON format with one key: marketing. Marketing should be a string.', review_text) AS prompt
      FROM `gemini_demo.customer_reviews`
      WHERE customer_id = 5576
    ),
    STRUCT(
      0.2 AS temperature, TRUE AS flatten_json_output)));
    ```

    This query is designed to analyze customer reviews from the `customer_reviews` table, specifically those from customer ID 5576. When you run the query, it uses Gemini Pro to generate marketing suggestions based on the review text and then stores the results in a new table called `customer_reviews_marketing.` This table will contain the original review data along with the generated marketing suggestions, allowing you to easily analyze and act upon them.

2. You can view the details of the `customer_reviews_marketing` table by running the SQL query below.
    
    ```sql
    SELECT * FROM gemini_demo.customer_reviews_marketing
    ```

    Notice that the `ml_generate_text_llm_result` column contains the response.

3.  You can make this easier to read, and take action on the response by using the SQL query below:
    
    ```sql
    CREATE OR REPLACE TABLE
    gemini_demo.customer_reviews_marketing_formatted AS (
    SELECT
      review_text,
      JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.marketing") AS marketing,
      social_media_source, customer_id, location_id, review_datetime
    FROM
      gemini_demo.customer_reviews_marketing results )
    ```

4.  You can view the details of the table by running the SQL query below.
    
    ```sql
    SELECT * FROM gemini_demo.customer_reviews_marketing_formatted
    ```
    
    Notice the `marketing` column. An appliction can be written to take the response in the `marketing` column and attach the 10 percent off coupon file as a notifcation for the customer's account in the data beans app or an email can be generated with these to the customer as well.


#### Customer service response

The customer with `customer_id` 8844 responded with:

I had a very disappointing experience at this coffee truck. The service was terrible - the staff were rude and inattentive, and we had to wait a long time for our food and drinks. The food itself was mediocre at best - the coffee was weak and the pastries were stale. The shop itself was also very cramped and noisy, making it difficult to relax and enjoy our time there. To top it all off, the prices were very high, making the whole experience even worse. I would definitely not recommend this place to anyone.
{:.notice--info}

This is clearly a negative review, how can you use Gemini Pro to respond to this customer and notify the coffee shop of their experience, in an effort to take action?

1. You can use Gemini Pro with these queries to accomplish this. In the query editor, paste the query below and run it.

    ```sql
    CREATE OR REPLACE TABLE
    gemini_demo.customer_reviews_cs_response AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_pro`,
    (
      SELECT social_media_source, customer_id, location_id, review_text, review_datetime, CONCAT(
          'How would you respond to this customer review? If the customer says the coffee is weak or burnt, respond stating "thank you for the review we will provide your response to the location that you did not like the coffee and it could be improved." Or if the review states the service is bad, respond to the customer stating, "the location they visited has been notified and we are taking action to improve our service at that location." From the customer reviews provide actions that the location can take to improve. The response and the actions should be simple, and to the point. Do not include any extraneous or special characters in your response. Answer in JSON format with two keys: Response, and Actions. Response should be a string. Actions should be a string.', review_text) AS prompt
      FROM `gemini_demo.customer_reviews`
      WHERE customer_id = 8844
    ),
    STRUCT(
      0.2 AS temperature, TRUE AS flatten_json_output)));    
    ```

    This query is designed to automate customer service responses by using Gemini Pro to analyze customer reviews and generate appropriate responses and action plans. It's a powerful example of how Google Cloud can be used to enhance customer service and improve business operations. When the query is run, the result is the `customer_reviews_cs_response` table is created.

2. You can view the details of the table by running the SQL query below.
    
    ```sql
    SELECT * FROM gemini_demo.customer_reviews_cs_response
    ```

    Notice that the `ml_generate_text_llm_result` column contains the response and the actions as two keys.

3.  You can make this easier to read, by using the SQL query below two separate the response and the actions into two columns in a new table called `customer_reviews_cs_response_formatted`:

    ```sql
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_cs_response_formatted` AS (
    SELECT
      review_text,
      JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.Response") AS Response,
      JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.Actions") AS Actions,
      social_media_source, customer_id, location_id, review_datetime
    FROM
      gemini_demo.customer_reviews_cs_response` results )
    ```
4.  You can view the details of the table by running the SQL query below.
    
    ```sql
    SELECT * FROM gemini_demo.customer_reviews_cs_response_formatted
    ```

5.  Notice the response and actions fields are now created. You can build separate applications to respond to the customer, and to the location so that it can take actions to improve and the customer will be notified their feedback was received.


### **Task 7. Prompt Gemini to provide keywords and summaries for each image**
---

In this task, you will use Gemini (the Gemini Pro and Vision models you created) to analyze images generating keywords and summaries.

#### Analyze the images with Gemini Pro Vision model

1. Click the **+** to **Create a new SQL Query**.
2. In the query editor, paste the query below, and run it.

    ```sql
    CREATE OR REPLACE TABLE
    gemini_demo.review_images_results AS (
      SELECT
        uri,
        ml_generate_text_llm_result
    FROM
        ML.GENERATE_TEXT( MODEL `gemini_demo.gemini_pro_vision`,
        TABLE `gemini_demo.review_images`,
        STRUCT( 0.2 AS temperature,
            'For each image, provide a summary of what is happening in the image and keywords from the summary. Answer in JSON format with two keys: summary, keywords. Summary should be a string, keywords should be a list.' AS PROMPT,
            TRUE AS FLATTEN_JSON_OUTPUT)));
    ```

    Please wait. The model takes approximately 1 minute to complete. When the model has finished processing the image, the result is the `review_images_results` table is created.

3. In the Explorer, click on the **review_image_results** table and review the schema and details.
4. Click the **+** to **Create a new SQL Query**.
5. In the query editor, paste and run the query below.
   
    ```sql
    SELECT * FROM gemini_demo.review_images_results
    ```
    
    The result is rows for each review image are displayed with the uri (the CloudStorage location of the review image) and a JSON result including the summary and keywords the Gemini Pro Vision model. 
    You can retrieve these results in a more human readable way, by using the next query.

6.  Click the **+** to **Create a new SQL Query**.
7.  In the query editor, paste and run the query below.

    ```sql
    CREATE OR REPLACE TABLE
      gemini_demo.review_images_results_formatted AS (
      SELECT
        uri,
        JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.summary") AS summary,
        JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.keywords") AS keywords
      FROM
        gemini_demo.review_images_results results )
    ```

    The result is the `review_images_results_formatted` table is created.

8.  You can query the table with the query below, to see the rows created.
    
    ```sql
    SELECT * FROM gemini_demo.review_images_results_formatted
    ```
    Notice how the uri column results remain the same, but the JSON is now converted to the summary and keywords columns for each row.


### **Congratulations!**
---

You successfully created cloud resource connection in BigQuery. You also created created a dataset, tables, and models to prompt Gemini to analyze sentimenet on customer reviews, with a report of positive and negative review counts. You then used zero-shot and few-shot prompts with Gemini to respond to these reviews. Finally, you used the Gemini Pro Vision model to analyze images and generate summaries and keywords.



<hr style="height: 5px; background-color: black; border: none;">


## **5. GEMINI IN ACTION: ANALYZE CUSTOMER REVIEWS WITH PYTHON NOTEBOOKS**

{% include video id="N8-ofVFPJmE" provider="youtube" %}


<hr style="height: 5px; background-color: black; border: none;">

## **6. ANALYZE CUSTOMER REVIEWS WITH GEMINI USING PYTHON NOTEBOOKS (GSP1249)**


### **Overview**

In this lab you learn how to use BigQuery Machine Learning with remote models (Gemini Pro) in SQL to extract keywords, assess customer sentiment in customer reviews, and respond to customer reviews with zero-shot and few-shot prompts.

BigQuery is a fully managed, AI-ready data analytics platform that helps you maximize value from your data and is designed to be multi-engine, multi-format, and multi-cloud. One of its key features is BigQuery Machine Learning, which lets you create and run machine learning (ML) models by using [SQL queries or with Colab Enterprise notebooks](https://cloud.google.com/bigquery/docs/bqml-introduction).

[Gemini](https://deepmind.google/technologies/gemini/#introduction) is a family of generative AI models developed by Google DeepMind that is designed for multimodal use cases. The Gemini API gives you access to the Gemini Pro, [Gemini Pro Vision and Gemini Flash models](https://cloud.google.com/bigquery/docs/generative-ai-overview#generative_ai).

Additionally, you'll use the Gemini Pro Vision model to generate summaries and extract relevant keywords from customer review images.

#### Objectives

In this lab, you learn how to:

- Create a Cloud Resource connection in BigQuery.
- Create the dataset, and tables in BigQuery.
- Create the Gemini remote models in BigQuery.
- Prompt Gemini to analyze keywords and sentiment (positive, or negative) for text based customer reviews.
- Generate a report with a count of positive, and negative reviews.
- Respond to customer reviews.
- Create an application for customer service representatives to respond to audio based customer reviews.

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


### **Task 1. Create BigQuery Python notebook and connect to runtime**
---

In this task you create a BigQuery Python notebook and connect the notebook to the runtime.

#### Create the BigQuery Python notebook

1. In the Google Cloud console, on the **Navigation menu**, click **BigQuery**.
2. Click **DONE** on the Welcome pop-up.
3. Click **PYTHON NOTEBOOK**.
4. Select for the region.
5. Click **SELECT**.
    
    You will also notice that the Python notebook is added in the notebooks section of the explorer under your project.

6. Delete all of the cells that are in the notebook by clicking the trash icon that appears when you hover over each cell.

Once complete, the notebook should be blank and you are ready to move on to the next step.


#### Connect to the runtime

1. Click **Connect**.
2. Click on the **Qwiklabs student ID**. 
    
    Please wait. It may take up to 3 minutes to connect to the runtime. 
    
    At some point, you will see the connection status update to Connected at the bottom of your browser window.


### **Task 2. Create the cloud resource connection and grant IAM role**
---

#### Create the cloud resource connection in BigQuery

In this task you create a [Cloud resource connection](https://cloud.google.com/bigquery/docs/create-cloud-resource-connection) in BigQuery, so you can work with Gemini Pro and Gemini Flash models. You will also grant the cloud resource connection's service account IAM permissions, through a role, to enable it access the Vertex AI services.

You will use the Python SDK and the Google Cloud CLI to create the resource connection. But first you need to import Python libraries and set the project_id and region variables.

1. Create a new code cell with the code below:

    ```python
    # Import Python libraries
    import vertexai
    from vertexai.generative_models import GenerativeModel, Part
    from google.cloud import bigquery
    from google.cloud import storage
    import json
    import io
    import matplotlib.pyplot as plt
    from IPython.display import HTML, display
    from IPython.display import Audio
    from pprint import pprint
    ```
    
    This code will import the Python libraries.

2. Run this cell. The libraries are now loaded and ready to be used.
3. Create a new code cell with the code below:

    ```py
    # Set Python variables for project_id and region
    project_id = "Project ID"
    region = " "REGION""
    ```   

    **Note:** project_id and region are saved here as Python variables not SQL variables, therefore you can only refer to them in cells using Python code, not SQL code.
    {:.notice--info}

4.  Run this cell. The variables for project_id and region are set.
5.  Create a new code cell with the code below:

    ```py
    # Create the resource connection
    !bq mk --connection \
      --connection_type=CLOUD_RESOURCE \
      --location=US \
      gemini_conn
    ```

    This code will use the Google Cloud CLI command `bq mk --conection` to create the resource connection.

6.  Run this cell. The resource connection is now created.
7.  Click the **view actions** button next to your project id in the Explorer.
8.  Choose **Refresh contents**.
9.  Expand **external connections**. Notice `us.gemini_conn` is now listed as an external connection.
10. Click **us.gemini_conn**.
11. In the Connection info pane, copy the service account ID to a text file for use in the next task.


#### Grant Vertex AI User role to the connection's service account

1. In the console, on the **Navigation menu**, click **IAM & Admin**.
2. Click **Grant Access**.
3. In the **New principals** field, enter the service account ID that you copied earlier.
4. In the Select a role field, enter **Vertex AI**, and then select **Vertex AI User** role.
5. Click **Save**. \
    The result is the service account now includes the Vertext AI User role.


### **Task 3. Review audio files, dataset, and grant IAM role to service account**
---

In this task, you review the dataset and the audio files, then you grant IAM permissions to the cloud resource connection's service account.


#### Review the audio files, image files, and customer reviews dataset on Cloud Storage

Before you dive into this task to grant permissions to the resource connection service account, review the dataset and the image files.

1. In the Google Cloud console, select the **Navigation menu**, and then select **Cloud Storage**.
2. Click on the **<code>set at lab start</code>-bucket** bucket.
3. The bucket contains the gsp1249 folder, open the folder. You will see five items in it:
    * The `audio` folder contains all audio files you will analyze. Feel free to access the audio folder and review the audio files.
    * The `customer_reviews.csv` file is the dataset that contains the text based customer reviews.
    * The `images` folder contains an image file you will use later in this lab. Feel free to access this folder and view the image file contained within it.
    * `notebook.ipynb`, this is a copy of the notebook you are creating in this lab. Feel free to review it as needed.
    
    **Note:** You can use the Authenticated URL to download and review each item.
    {:.notice--info}


#### Grant IAM Storage Object Admin role to the connection's service account

Granting IAM permissions to the resource connection's service account before you start working in BigQuery will ensure you do not encounter access denied errors when running queries.

1. Return to the root of the bucket.
2. Click **PERMISSIONS**.
3. Click **GRANT ACCESS**.
4. In the **New principals** field, enter the service account ID you copied earlier.
5. In the Select a role field, enter **Storage Object**, and then select **Storage Object Admin** role.
6. Click **Save**. \
    The result is the service account now includes the Storage Object Admin role.


### **Task 4. Create the dataset, and customer reviews table in BigQuery**
---

In this task, you create a dataset for the project, the table for customer reviews.


#### Create the dataset

For the dataset you will use the following properties:

| Field          | Value              |
|---------------|--------------------|
| Dataset ID    | gemini_demo        |
| Location type | select Multi-region |
| Multi-region  | select US          |



1. Return to the Python notebook in BigQuery.

2. Create a new code cell with the code below:


    ```py
    # Create the dataset
    %%bigquery
    CREATE SCHEMA IF NOT EXISTS `Project ID.gemini_demo`
    OPTIONS(location="US");
    ```

3. Notice the code starts with `%%bigquery`, this tells Python that the code immediately following this statement will be SQL code.

4. Run this cell. 
    The result is the SQL code will create the `gemini_demo` dataset in your project residing in the US region listed underneath your project in the BigQuery Explorer.


#### Create the customer reviews table with sample data

To create the customer reviews table you will use a SQL query.

1. Create a new code cell with the code below:

    ```py
    # Create the customer reviews table
    %%bigquery
    LOAD DATA OVERWRITE gemini_demo.customer_reviews
    (customer_review_id INT64, customer_id INT64, location_id INT64, review_datetime DATETIME, review_text STRING, social_media_source STRING, social_media_handle STRING)
    FROM FILES (
      format = 'CSV',
      uris = ['gs://Project ID-bucket/gsp1249/customer_reviews.csv']);
    ```

2. Run this cell. 
    The result is the `customer_reviews` table is created with sample customer review data, including the `customer_review_id`, `customer_id`, `location_id`, `review_datetime`, `review_text`, `social_media_source`, and `social_media_handle` for each review in the dataset.

3. In the Explorer, click on the **customer_reviews** table and review the schema and details.
4. Query the table to review records by creating a new code cell with the code below.

    ```py
    # Create the customer reviews table
    %%bigquery
    SELECT * FROM gemini_demo.customer_reviews
    ORDER BY review_datetime
    ```

5.  Run this cell. 
    The result is the records are displayed from the table with all columns included.


### **Task 5. Create the Gemini Pro model in BigQuery**
---

Now that the tables are created, you can begin to work with them. In this task, you create the Gemini Pro model in BigQuery.

1. Return to the Python notebook.
2. Create a new code cell with the code below:

    ```py
    # Create the customer reviews table
    %%bigquery
    CREATE OR REPLACE MODEL `gemini_demo.gemini_pro`
    REMOTE WITH CONNECTION `us.gemini_conn`
    OPTIONS (endpoint = 'gemini-pro')
    ```

3. Run this cell. 
    The result is the `gemini_pro` model is created and you see it added to the `gemini_demo` dataset, in the models section.

4. In the Explorer, click on the **gemini_pro** model and review the details and schema.


### **Task 6. Prompt Gemini to analyze customer reviews for keywords and sentiment**
---

In this task, you will use Gemini Pro model to analyze each customer review for sentiment, either positive or negative.


#### Analyze the customer reviews for positive and negative sentiment

1. Create a new code cell with the code below:

    ```py
    # Create the sentiment analysis table
    %%bigquery
    CREATE OR REPLACE TABLE
    gemini_demo.customer_reviews_analysis AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_pro`,
    (
      SELECT social_media_source, customer_id, location_id, review_text, review_datetime,   CONCAT(
          'Classify the sentiment of the following text as positive or negative.',
          review_text, "In your response don't include the sentiment explanation. Remove all extraneous information from your response, it should be a boolean response either positive or negative.") AS prompt
      FROM `gemini_demo.customer_reviews`
    ),
    STRUCT(
      0.2 AS temperature, TRUE AS flatten_json_output)));
    ```

2. Run this cell. 
    This query takes customer reviews from the `customer_reviews` table, constructs the prompt, and then uses these with the `gemini_pro` model to classify the sentiment of each review. The results are then stored in a new table `customer_reviews_analysis` so that you may use it later for further analysis.
    Please wait. The model takes approximately 30 seconds to process the customer review records.
    When the model is finished, the result is the `customer_reviews_analysis` table is created.

3. In the Explorer, click on the **customer_reviews_analysis** table and review the schema and details.

4. Create a new code cell with the code below:

    ```py
    # Pull the first 100 records from the customer_reviews_analysis table
    %%bigquery
    SELECT * FROM gemini_demo.customer_reviews_analysis
    ORDER BY review_datetime
    ```

5.  Run this cell. 
    The result is rows with the `ml_generate_text_llm_result` column (containing the sentiment analysis), the customer review text, customer id and location id. 
    
    Take a look at some of the records. You may notice some of the results for positive and negative may not be formatted correctly, with extraneous characters like periods, or extra space. You can santize the records by using the view below.


#### Create a view to sanitize the records

1. Create a new code cell with the code below:

    ```py
    # Sanitize the records within a new view
    %%bigquery
    CREATE OR REPLACE VIEW gemini_demo.cleaned_data_view AS
    SELECT REPLACE(REPLACE(LOWER(ml_generate_text_llm_result), '.', ''), ' ', '') AS sentiment,
    REGEXP_REPLACE(
          REGEXP_REPLACE(
                REGEXP_REPLACE(social_media_source, r'Google(\+|\sReviews|\sLocal|\sMy\sBusiness|\sreviews|\sMaps)?', 'Google'),
                'YELP', 'Yelp'
          ),
          r'SocialMedia1?', 'Social Media'
      ) AS social_media_source,
    review_text, customer_id, location_id, review_datetime
    FROM gemini_demo.customer_reviews_analysis;
    ```


2. Run this cell. 
    The code creates the view, `cleaned_data_view` and includes the sentiment results, the review text, the customer id and the location id. It then takes the sentiment result (positive or negative) and ensures that all letters are made lower case, and extreanous charaters like extra spaces or periods are removed. The resulting view will make it easier to do further analysis in later steps within this lab.

3. Create a new code cell with the code below:

    ```py
    # Pull the first 100 records from the cleaned_data_view view
    %%bigquery
    SELECT * FROM `gemini_demo.cleaned_data_view`
    ORDER BY review_datetime
    ```

4.  Run this cell. \
    Notice that the `sentiment` column now has clean values for positive and negative reviews. You will be able to use this view in later steps to build a report.


#### Create a report of positive and negative review counts

You can use Python and the Matplotlib library to create a bar chart report of the counts of positive and negative reviews.

1. Create new code cell to use the BigQuery client to query the cleaned_data_view for positive and negative reviews, and group the reviews by sentiment, storing the results in a dataframe.

    ```py
    # Task 6.5 - Create the BigQuery client, and query the cleaned data view for positive and negative reviews, store the results in a dataframe and then show the first 10 records
    client = bigquery.Client()
    query = "SELECT sentiment, COUNT(*) AS count FROM `gemini_demo.cleaned_data_view` WHERE sentiment IN ('positive', 'negative') GROUP BY sentiment;"
    query_job = client.query(query)
    results = query_job.result().to_dataframe()
    results.head(10)
    ```

2. Run this cell. 
    The result of running the cell is a table output with total counts of positive and negative reviews.

3. Create a new cell to define variables for the report.

    ```py
    # Define variable for the report.
    sentiment = results["sentiment"].tolist()
    count = results["count"].tolist()
    ```

4.  Run this cell. There is no output.
5.  Create a new cell to build the report.

    ```py
    # Task 6.7 - Build the report.
    plt.bar(sentiment, count, color='skyblue')
    plt.xlabel("Sentiment")
    plt.ylabel("Total Count")
    plt.title("Bar Chart from BigQuery Data")
    plt.show()
    ```

6.  Run this cell.
    The result is a bar chart with the counts of positive and negative reviews.

7.  Alternatively you can build a simple, color-coded report of the counts of negative and positive sentiment using the code below:

    ```py
    # Create an HTML table for the counts of negative and positive sentiment and color codes the results.
    html_counts = f"""
    <table style="border-collapse: collapse; width: 25%; padding: 10px;">
    <thead>
    <tr style="background-color: #f2f2f2;">
    <th style="padding: 10px; text-align: left;">Negative</th>
    <th style="padding: 10px; text-align: left;">Positive</th>
    </tr>
    </thead>
    <tbody>
    <tr style="padding: 10px;">
    <td style="padding: 10px; color: red">{count[0]}</td>
    <td style="padding: 10px; color: green">{count[1]}</td>
    </tr>
    </tbody>
    </table>
    """

    # Display the HTML tables
    display(HTML(html_counts))
    ```


### **Task 7. Respond to customer reviews**
---

Data beans wants to experiment with customer reviews using images and audio recordings. In this section of this notebook you will use CloudStorage, BigQuery, Gemini Flash, and Python to perform sentiment analysis on customer reviews provided to data beans as images and audio files. And from the resulting analysis you will generate customer service responses to be sent back to the customer thanking them for their review and actions the cofee house can take based upon the review.

You will do this both at scale and then later with one image and audio file, so that you may learn how to create a Proof of Concept application for customer service representatives. This enables a "human-in-the-loop" strategy for the customer feedback process, where customer service representatives can take action with both the customer and individual coffee houses.


#### Processing audio files at scale with JSON responses

1. Create a new cell to conduct sentiment analysis on audio files and respond to the customer.

    ```py
    # Conduct sentiment analysis on audio files and respond to the customer.
    vertexai.init(project="Project ID", location="region")

    model = GenerativeModel(model_name="gemini-1.5-flash")

    prompt = """
    Please provide a transcript for the audio.
    Then provide a summary for the audio.
    Then identify the keywords in the transcript.
    Be concise and short.
    Do not make up any information that is not part of the audio and do not be verbose.
    Then determine the sentiment of the audio: positive, neutral or negative.

    Also, you are a customr service representative.
    How would you respond to this customer review?
    From the customer reviews provide actions that the location can take to improve. The response and the actions should be simple, and to the point. Do not include any extraneous characters in your response.
    Answer in JSON format with five keys: transcript, summary, keywords, sentiment, response and actions. Transcript should be a string, summary should be a sting, keywords should be a list, sentiment should be a string, customer response should be a string and actions should be string.
    """

    bucket_name = "Project ID-bucket"
    folder_name = 'gsp1249/audio'  # Include the trailing '/'

    def list_mp3_files(bucket_name, folder_name):
      storage_client = storage.Client()
      bucket = storage_client.bucket(bucket_name)
      print('Accessing ', bucket, ' with ', storage_client)

      blobs = bucket.list_blobs(prefix=folder_name)

      mp3_files = []
      for blob in blobs:
          if blob.name.endswith('.mp3'):
                mp3_files.append(blob.name)
      return mp3_files

    file_names = list_mp3_files(bucket_name, folder_name)
    if file_names:
      print("MP3 files found:")
      print(file_names)
      for file_name in file_names:
          audio_file_uri = f"gs://{bucket_name}/{file_name}"
          print('Processing file at ', audio_file_uri)
          audio_file = Part.from_uri(audio_file_uri, mime_type="audio/mpeg")
          contents = [audio_file, prompt]
          response = model.generate_content(contents)
          print(response.text)
      else:
          print("No MP3 files found in the specified folder.")
    ```


2. A few key points about this cell:
    * The first line initializes Vertex AI with your project ID and region, you will need to populate these values.
    * The next line creates a model in BigQuery named model, based upon the Gemini Flash model.
    * You then define a prompt to be used by the Gemini Flash model. The prompt effectively converts the audio file to text, then analyzes the sentiment of the text, and once the analysis is complete, creates a customer response for each file.
    * You need to set your bucket as the bucket_name string variable. Note: folder_name is used as well for gsp1249/audio subfolder. Don't change this.
    * A function called list_mp3_files is created identify all mp3 files within the bucket. Then these files are processed by the Gemini Flash model within the if statement.

3. Run this cell. 
    The result is all 5 of the audio files are analysed and the output of the analysis is provided as a JSON response. The JSON response could be parsed accordingly and routed to the appropriate applications to respond to the customer or the location with actions for improvement.


#### Creating an application for customer service representatives

In this section of the lab, you will learn how to create a customer service application based upon a negative review analysis. You will:

* Use the same prompt in the previous cell to analyze a single negative review.
* Generate the transcript from the negative review audio file, create the JSON object from the model output with the appropriate formatting, and save specific parts of the JSON object as Python variables, so that you can use these with HTML as part of your application.
* Generate the HTML table, load the image the customer uploaded for the review and load the audio file in the player.
* Display the HTML table, with the image and the player for the audio file.

1. Create a new cell, and enter the following code, so that you can Generate the transcript for the negative review audio file, create the JSON object, and associated variables.

    ```py
    # Generate the transcript for the negative review audio file, create the JSON object, and associated variables

    audio_file_uri = f"gs://{bucket_name}/{folder_name}/data-beans_review_7061.mp3"
    print(audio_file_uri)

    audio_file = Part.from_uri(audio_file_uri, mime_type="audio/mpeg")

    contents = [audio_file, prompt]

    response = model.generate_content(contents)
    print('Generating Transcript...')
    #print(response.text)

    results = response.text
    # print("your results are", results, type(results))
    print('Transcript created...')

    print('Transcript ready for analysis...')

    json_data = results.replace('```json', '')
    json_data = json_data.replace('```', '')
    jason_data = '"""' + results + '"""'

    # print(json_data, type(json_data))

    data = json.loads(json_data)

    # print(data)

    transcript = data["transcript"]
    summary = data["summary"]
    sentiment = data["sentiment"]
    keywords = data["keywords"]
    response = data["response"]
    actions = data["actions"]
    ```


    A few key points about this cell:
      * The code in the cell will select a specific audio file from Cloud Storage (data-beans_review_7061.mp3).
      * It then sends the file to prompt in the previous cell labeled Task 7.1 to be processed by the Gemini Flash model.
      * The model's response is extracted to JSON format.
      * Then the JSON data is parsed, and stores Python variables for the transcript, summary, sentiment, keywords, customer response, and actions.
2. Run the cell. 
    The output is minimal, just the uri of the audio file processed and processing messages.
3. Create an HTML based table from the selected values and load the audio file containing the negative review into the player.

    ```python
    # Create an HTML table (including the image) from the selected values.

    html_string = f"""
    <table style="border-collapse:collapse;width:100%;padding:10px;">
    <tbody><tr style="background-color:#f2f2f2;">
    <th style="padding:10px;width:50%;text-align:left;">customer_id: 7061 - @coffee_lover789</th>
    <th style="padding:10px;width:50%;text-align:left;">&nbsp;</th>
    </tr></tbody>
    </table>
    <table>
    <tbody>
    <tr style="padding:10px;">
    <td style="padding:10px;">{transcript}</td>
    <td style="padding:10px;color:red;">{sentiment} feedback</td>
    </tr>
    <tr>
    </tr>
    <tr style="padding:10px;">
    <td style="padding:10px;">&nbsp;</td>
    <td style="padding:10px;">
      <table>
    <tr><td>{keywords[0]}</td></tr>
    <tr><td>{keywords[1]}</td></tr>
    <tr><td>{keywords[2]}</td></tr>
    <tr><td>{keywords[3]}</td></tr>
    </tbody>
      </table>
    </td>
    </tr>
    <tr style="padding:10px;">
    <td style="padding:10px;">
    <strong>Customer summary:</strong>{summary}</td>
    </tr>
    <tr style="padding:10px;">
    <td style="padding:10px;">
    <strong>Recommended actions:</strong>{actions}</td>
    </tr>
    <tr style="padding:10px;">
    <td style="padding:10px;background-color:#EAE0CF;">
    <strong>Suggested Response:</strong>{response}</td>
    </tr>
    </tbody>
    </table>

    """
    print('The table has been created.')

    ```

    A few key points about this cell:
      * The code in the cell will construct an HTML table string.
      * Then insert the values for the transcript, sentiment, keywords, image, summary, actions, and response into the table cells.
      * The code will also apply styling to the table elements.
      * When the cell is run, the output of the cell will indicate when the table has been created.

4.  Look for the `&lt;td style="padding:10px;">` tag with the `{summary}` output included. Add new line of code before this tag.

5.  Paste `&lt;td rowspan="3" style="padding: 10px;">&lt;img src="&lt;authenticated url here>" alt="Customer Image" style="max-width: 300px;">&lt;/td>` into this new line of code.
6.  Find the Authenticated URL for the image_7061.png file. Go to Cloud Storage, select the only bucket you have there, the images folder, and then click on the image.
7.  On the resulting page, copy the Authenticated URL for the image.
8.  Return to the Python notebook in BigQuery. Replace the `&lt;authenticated url here>` with the actual Authenticated URL in the code you just pasted.
9.  Run the cell. \
Again the output is minimal. Just some processing messages, indicating each step completes.
10.  Create a new cell to download the audio file and load it into the player, using the code below:

    ```python
    # Download the audio file from Google Cloud Storage and load into the player
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(f"{folder_name}/data-beans_review_7061.mp3")
    audio_bytes = io.BytesIO(blob.download_as_bytes())

    # Assuming a sample rate of 44100 Hz (common for MP3 files)
    sample_rate = 44100

    print('The audio file is loaded in the player.
    ```   

11. A few key points about this cell:
    * The code in the cell accesses the Cloud Storage bucket and retrieves the specific audio file (data-beans_review_7061.mp3).
    * Then it downloads the file as a byte stream and determines the sample rate of the file, so that it may be played in a player directly in the notebook.
    * When the cell is run, the output of the cell is a message stating the audio file is loaded into the player and ready for playback.

12. Run the cell.

13. Create a new cell and enter the code below:


    ```py
    # Task 7.5 - Build the mockup as output to the cell.
    print('Analysis complete. Review the results below.')
    display(HTML(html_string))
    display(Audio(audio_bytes.read(), rate=sample_rate, autoplay=True))
    ```

14. Run the cell. 
    This cell is where the magic happens. The display method is used to display the HTML and the Audio file loaded into the player. Review the output of the cell. It should look identical to the image below: 


### **Congratulations!**
---
You successfully created cloud resource connection in BigQuery. You also created created a dataset, tables, and models to prompt Gemini to analyze sentiment and keywords on customer reviews. Finally, you used Gemini to analyze audio-based customer reviews to generate summaries and keywords to repond to customer reviews within a customer service application.



<hr style="height: 5px; background-color: black; border: none;">

## **7. QUIZ**




























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