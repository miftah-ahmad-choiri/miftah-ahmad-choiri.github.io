---
title: | 
        **The Basics of Google Cloude Compute** <br>
        ![Google Cloud Compute](https://img.shields.io/badge/google--cloud-compute--engine-blue)
        ![Nginx](https://img.shields.io/badge/nginx-web--server-green)
        ![Debian VM](https://img.shields.io/badge/debian-virtual--machine-red)
        ![Node.js](https://img.shields.io/badge/node.js-runtime--environment-brightgreen)
        ![Linux](https://img.shields.io/badge/linux-operating--system-black)

permalink: /docs/gcp/gemini-in-bigquery/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-02-28T21:36:18-04:00
toc: true

---

## **1. USE CASE**

{% include video id="ULJ_sMbFd1g" provider="youtube" %}

<hr style="height: 5px; background-color: black; border: none;">

## **2. EXPLORE AND PREPARE DATA**

{% include video id="fkmbLcz6Svg" provider="youtube" %}

<hr style="height: 5px; background-color: black; border: none;">

## **3. EXPLORE DATA WITH GEMINI IN BIGQUERY (GSP1257)**

### Overview

Imagine you're a detective trying to solve a mystery, but instead of clues, you have multiple, massive spreadsheets of data.

You are a new data analyst for Data Beans, a company specializing in data collection, analytics, and insights for mobile coffee truck companies throughout your country. It is your first week at the company, and you have been tasked with exploring the company's data related to the coffee trucks, menu, and orders. Your onboarding buddy recommends that you use BigQuery with the table explorer and data insight features to learn about the data and gain insights from it. These features will help you to get started with exploring the company's data and gain insights from it without having to write SQL queries from scratch.

#### Objectives

In this lab, you learn how to:

- Generate data insights on the order item table.
- Use the table explorer with the location table and generate basic queries.
- Query the order item table without SQL code.

Once you complete these objectives, you will also review the menu and order tables using either of these features as an open activity.

Finally, you will have time to reflect on what you have learned in this lab and consider how you could apply the table explorer and data insights features to your own use cases by answering questions in your [Lab Journal](https://storage.mtls.cloud.google.com/spls/gsp1257/gsp1257_Lab_Journal.pdf).

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


### Task 1. Generate data insights on the order item table
---

In this task, you will enable data insights on the `order_item` table within the `coffee_on_wheels` dataset.

Data insights is a tool for anyone who wants to explore their data and gain insights without writing complex SQL queries.

1. In the Google Cloud console, on the Navigation menu, click **BigQuery**.
2. Click **DONE** on the welcome pop-up.
3. In the **Explorer** panel, expand the set at lab start project. You see the `coffee_on_wheels` dataset at the bottom of the list.
4. Expand the `coffee_on_wheels` dataset. You see the `order_item` table.
5. Click the `order_item` table. You see the `order_item` schema displayed. Review the details of the schema.
6. Click the **INSIGHTS** tab. You see a message stating *"Insights have not yet been generated."* This is normal, because the insights have never been generated in your lab environment.
7. Click the **GENERATE INSIGHTS** button.
8. From the **Region** dropdown select *Region region* and click **GENERATE**. Gemini will now generate insights for the `order_item` table.

**Note:** It will take a few minutes to generate insights for the table, this is normal. Wait until the insights are generated to check completion of this task. You will return to insights for the `order_item` table later.
{:.notice--info}

### Task 2. Use table explorer to review details of the location table
---

While you are waiting for the insights to be generated, you will use the [table explorer](https://cloud.google.com/bigquery/docs/table-explorer) feature of BigQuery to review the `location` table included with the `coffee_on_wheels` dataset. You will also build a basic query with the table explorer to find all fields associated with *Coffee Cart Connection, Empire Espresso, and Street Sips* trucks.

#### Access the table explorer

1. In the **Explorer** panel, click the `location` table. You see the `location` table schema displayed. Review the details of the schema.
2. Click the **TABLE EXPLORER** tab. Notice how the BigQuery studio page changes where you have the **Distinct Values** section at the top and the **Generated Query** section at the bottom, with the query below.

    ```sql
    SELECT
       *
    FROM
       `set at lab start.coffee_on_wheels.location`;
    ```
    You will work in the Distinct Values section. When you add fields using the SELECT FIELDS button, you will see the query change in the Generated Query section.


#### Select fields and build a basic query

1. Click **SELECT FIELDS**. You see all the fields in the table displayed.
2. Select all the fields and click **SAVE**. Now you see an interactive card for each field.
3. Click:
   - **Coffee Cart Connection**
   - **Street Sips**
   - **Empire Espresso Explorer**

    **Note**: Once you have selected these values, BigQuery will indicate that "This script will process 5.7 KB when run." This indicates how much data the script will process when you run the query.
    {:.notice--info}
    
    Also notice that the query is:

    ```sql
    SELECT
       `city_id`,
       `company_id`,
       `location_id`,
       `location_name`,
       `location_type`
    FROM
       `set at lab start.coffee_on_wheels.location`
    WHERE
       (`location_name` IN ('Coffee Cart Connection',
           'Empire Espresso Explorer',
           'Street Sips'));
    ```

4. Click **APPLY**. Notice how the other values in the other cards change.
5. Click **COPY TO QUERY**.
6. A new `Untitled query` tab opens in BigQuery studio.
7. Click **RUN**. The result is 3 rows with the `city_id`, `company_id`, `location_id`, `location_name`, and `location_type` of each of these trucks.
    Congratulations! You have just written your first query with table explorer without using SQL code.

In summary, table explorer is a tool for getting started with data exploration in BigQuery, especially if you're new to SQL or want a quick way to understand your data.

Here are some key things to remember about table explorer:
- It's a visual tool to explore one table at a time.
- It doesn't support complex operations like joins across multiple tables.
- It generates basic SQL queries.
- It doesn't provide AI-powered assistance for complex queries.

#### Time to reflect
Considering your data and use cases for BigQuery, how would you use the table explorer feature?

### Task 3. Query the order item table without code
---

The insights you generated in an earlier task are now ready. In this task, you will use a prompt generated from these insights to query the `order_item` table without using code.

#### Select an insight and run the query associated with it

1. In the **Explorer** panel, click the **order_item** table. Review the schema with the associated fields.
2. Click **INSIGHTS**. Search for an insight similar to:

    **Note:** Each insight is in the form of a question starting with who, what, when, where, and how, or with an action verb, like calculate, identify, or find.
    {:.notice--info}

3. Review the list of insights, and search for an insight similar to the one below:
   
    ```bash
    What is the total revenue generated from each menu item?
    ```

    **Note**: This insight may be generated using phrasing like "This query calculates the total revenue generated by each menu item."
    {:.notice--info}

    **Note**: The insights are generated by Gemini and, because of this, you may not have an insight identical to the one above. This is because Gemini predicts insights based on the data in the dataset and the trained model. So, with this said, search for something similar that has the total revenue for each menu item in the `order_item` table. **Feel free to re-generate insights as needed by using the GENERATE INSIGHTS button if you want to work with this example prompt**.
    {:.notice--info}

4. Once you find a similar insight, expand the insight to reveal the underlying SQL code for it. You should see a query similar to the one below:

   ```sql
   SELECT menu_id, SUM(item_total) AS total_revenue FROM `coffee_on_wheels.order_item` GROUP BY menu_id;
   ```

5. Click **COPY TO QUERY**. A new tab opens in BigQuery Studio. It is called "Untitled Query" with the question (the prompt that generated the query) and the query included.
6. Click **RUN**. The query will run, and you will see the result. Notice that the results include two fields: the menu ID and the total revenue generated for each menu item. This is helpful, but we don't quickly know which item has the most revenue, and the total revenue field includes extraneous decimal places. You can fix that again without SQL code.

#### Transform the query to round total revenue to 2 decimal places:

1. Select the query.

2. To the immediate left of the SELECT statement, click Gemini, and then click **Transform**. You see a dialog with an empty text field and a **GENERATE** button. Here, you can transform the query based on natural language.

3. Enter the prompt below:
    
    ```bash
    Display total_revenue rounded to 2 decimal points.
    ```

4. Click **GENERATE**. You will see the original query with red background text and the modified query with green background text.

5. If you agree with the newly suggested query, click **INSERT**. The query is inserted back into the Untitled Query tab and should look like this:

    ```sql
    SELECT
      menu_id,
      ROUND(SUM(item_total), 2) AS total_revenue
    FROM
      `set at lab start.coffee_on_wheels.order_item`
    GROUP BY menu_id;
    ```

6. Click **RUN**. Notice that the `total_revenue` field is now formatted where results only have two decimal places.

#### Transform the query to order results in descending order:


1. Select the query.

2. To the immediate left of the SELECT statement, click Gemini and then click **Transform**.

3. Enter the prompt below:

    ```bash
    Order the total_revenue field in descending order.
    ```

4. Click **GENERATE**. You will see the original query with red background text, and the modified query with green background text.

5. If you agree with the newly suggested query, click **INSERT**. The query is inserted back into the Untitled Query tab and should look similar to:
   ```sql
   SELECT
       menu_id,
       ROUND(SUM(item_total), 2) AS total_revenue
   FROM
       `set at lab start.coffee_on_wheels.order_item`
   GROUP BY menu_id
   ORDER BY total_revenue DESC;
   ```

6. Click **RUN**. Notice that the total_revenue field is now in descending order, with the menu items with the most total revenue displayed first.

Congratulations! You have successfully used data insights to select an insight and transform it without using SQL code.

In summary, BigQuery data insights is a tool for anyone who wants to explore their data and gain insights without writing complex SQL queries.

Here are some key things to remember about BigQuery insights:

- It's a helpful tool for exploring and understanding your data, especially if you're new to SQL or want to get started with data analysis.
- It uses Gemini to generate queries based on your data's metadata, making it easier to find relevant insights.
- It's a feature that can help you unlock your data's potential.

#### Time to reflect
1. Which insights did you find most useful with the order_item table?

2. Considering your data and use cases for BigQuery, how would you use the data insights feature?

### Task 4. Review the menu and order tables
---

In this task, you explore the remaining menu and order tables in the coffee_on_wheels dataset and answer the questions below using your [Lab Journal](https://storage.mtls.cloud.google.com/spls/gsp1257/gsp1257_Lab_Journal.pdf). Now that you have learned about the data insights and table explorer tools, we suggest you use them to answer these questions, or even write your own queries if you choose to do so. However, be mindful of the remaining time left for this lab. Once the clock gets to 5 minutes left, we suggest you confirm you have completed all progress checks to get credit for completing the lab.

1. **Find the top three items with the highest average prices for each size.**
   - Which table or tables would contain this?
   - Which tool would help you answer this question?

2. **Find all orders from `location_id` 37.**
   - Which table or tables would contain this information?
   - How many orders are there from this location?
   - Which tool would you use to find all the orders?

3. **For your use cases, which tool, table explorer or data insights, would help you the most? Why?**

Once you have answered the questions, feel free to review the [Lab Journal Solutions](https://storage.mtls.cloud.google.com/spls/gsp1257/gsp1257_Lab_Journal_solutions.pdf).

### Congratulations!

In this lab, you learned how to generate data insights, and use these insights to query the coffee_on_wheels dataset without code. You also learned how to use the table explorer to explore the location table and generate basic queries without code. Finally, you considered how to apply these features to your own data and use cases with BigQuery.


<hr style="height: 5px; background-color: black; border: none;">


## **4. ASSIST CODE DEPLOYMENT**

{% include video id="TRH5sAi0xWQ" provider="youtube" %}

<hr style="height: 5px; background-color: black; border: none;">


## **5. DEVELOP CODE WITH GEMINI IN BIGQUERY (GSP1258)** 

### Overview

Imagine you are a data analyst and have been with Data Beans for a few months. You have worked on a few successful projects with your teammates and have been assigned your first solo project. You are starting to create more complex queries with little help, but you have been asked to write more complex queries to retrieve deeper insights. Everyone on the team is helpful, but you need to start showing that you are more self-sufficient in your work.

You have read that BigQuery SQL code generation, explanation, and transformation may help you to write more complex queries using natural language. And, if you get stuck with writing a new query, you have also learned you could use Gemini to help review and debug your code. It could even help you with suggestions to resolve issues. Using these features will help you to be more independent in your work and, perhaps, even more efficient. However, you are not sure how to get started.



#### Objectives

In this lab, you learn how to:

- Generate a SQL query using a natural language prompt.
- Use the code explanation feature of BigQuery.
- Modify SQL code with the transform feature of BigQuery.
- Prompt Gemini to review and debug SQL code in BigQuery.
- Ask Gemini for suggestions to fix a SQL code issue.

Finally, you will have time to reflect on what you have learned in this lab and consider how you could apply the code generation, explanation, transformation, and suggestions with your data, use cases, and workflows by answering questions in your [Lab Journal](https://storage.mtls.cloud.google.com/spls/gsp1258/gsp1258_lab_journal.pdf).


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



### Task 1. Review menu and order_item tables
---

In this task, you review the `menu` and `order_item` table schemas.

**Important:** If you don't review the schema for these tables, you will not be able to successfully complete other tasks in this lab.
{:.notice--warning}

#### Review the `menu` table schema

1. In the **Google Cloud console**, on the **Navigation menu**, click **BigQuery**.
2. Click **DONE** on the Welcome dialog.
3. In the **Explorer** panel, expand the **set at lab start** project. You see the `coffee_on_wheels` dataset at the bottom of the list.
4. Expand the `coffee_on_wheels` dataset. You see the `menu` table.
5. Click the `menu` table. You see the menu schema displayed.
6. Review the details of the schema.

7. Answer this question:
   - Which fields use `FLOAT` as datatype?

#### Review the `order_item` table schema

1. Click the `order_item` table. You see the `order_item` schema displayed.
2. Review the details of the schema.
3. Answer this question:
   - Which fields use `INTEGER` as the data type?


### Task 2. Generate a SQL query using a natural language prompt
---

In this task, you generate a SQL query using a natural language prompt to find menu IDs and total revenue for the top three and bottom three items in the menu by total revenue.

1. Click **+** to create a new SQL Query. A new tab is displayed in **BigQuery Studio**.
2. Click **SQL generation tool** to access the SQL generation tool.  
   - You see the **Generate SQL with Gemini** dialog appear.
   - You can enter a natural language prompt in this window to generate a new SQL statement.
3. Enter the prompt below:

    Show the menu IDs and total revenue from the order_item table with the top three highest and top three lowest by total revenue.
    {:.notice--info}

4. Click **Generate**. You see **Gemini** create a SQL statement like the one below:

    ```sql
    (
       SELECT
           menu_id,
           SUM(item_total) AS total_revenue
       FROM
           `set at lab start.coffee_on_wheels.order_item`
       GROUP BY 1
       ORDER BY
           total_revenue DESC
       LIMIT 3
    )
    UNION ALL
    (
       SELECT
           menu_id,
           SUM(item_total) AS total_revenue
       FROM
           `set at lab start.coffee_on_wheels.order_item`
       GROUP BY 1
       ORDER BY
           total_revenue
       LIMIT 3
    );
    ```

5. Click **INSERT**. The query you generated is added to the **Untitled query** tab.

#### Explain the query

1. Select the query.
2. Click **Gemini** immediately to the left of the query.
3. Click **Explain this query**.
4. You see the dialog for Gemini open to the right of **BigQuery Studio**.
5. Click **Start chatting**. You can see an explanation for the query like the one below in the chat window.
6. Review the explanation. Gemini provides a summary of the response like the following:

    In summary, this query helps you identify the most and least popular menu items based on their revenue, providing valuable insights for business decisions.
    {:.notice--info}

6. Click **RUN**. The result is six menu items: the top three highest-selling items and the bottom three lowest-selling items.

---

#### Time to Reflect

1. Considering your data and use cases for **BigQuery**, How would you use the **code generation** feature?
2. How would you use the **code explanation** feature?


### Task 3. Transform a query
---

The query you created in the previous task is helpful, but it is missing some critical information. For example, you don't know the menu item name, and there are extraneous decimal places in the `total_revenue` column.

To get the menu item name, you will have to join the `menu` and `order_item` tables. You can also format the `total_revenue` field so that only two decimal places are displayed.

In this task, you use the transform feature of Gemini to write prompts to address these gaps.

#### Join the menu and order item tables to get the menu item name

1. Click the `+` to create a new SQL query. A new tab is displayed in BigQuery Studio.
2. Click `SQL generation tool` to access the SQL generation tool. You see the `Generate SQL with Gemini` dialog. You can enter a natural language prompt in this window to generate a new SQL statement.
3. Enter the prompt below:

    Join the menu table with the order item table, return the menu_id, the item_name, and show the top three highest items and bottom three lowest items by total_revenue.
    {:.notice--info}

4. Click **Generate**. You see Gemini create an SQL statement like the one below:

    ```sql
    (
       SELECT
           t1.menu_id,
           t1.item_name,
           SUM(t2.item_total) AS total_revenue
       FROM
           `set at lab start.coffee_on_wheels.menu` AS t1
           INNER JOIN `set at lab start.coffee_on_wheels.order_item` AS t2 ON t1.menu_id = t2.menu_id
       GROUP BY 1, 2
       ORDER BY
           total_revenue DESC
       LIMIT 3
    )
    UNION ALL
    (
       SELECT
           t1.menu_id,
           t1.item_name,
           SUM(t2.item_total) AS total_revenue
       FROM
           `set at lab start.coffee_on_wheels.menu` AS t1
           INNER JOIN `set at lab start.coffee_on_wheels.order_item` AS t2 ON t1.menu_id = t2.menu_id
       GROUP BY 1, 2
       ORDER BY
           total_revenue
       LIMIT 3
    );
    ```

5. Click `INSERT`. The query you generated is added to the `Untitled query` tab.

#### Explain the query:
1. Select the query.
2. Click `Gemini` immediately to the left of the query.
3. Click `Explain this query`. You see the explanation displayed in the Gemini chat window with a summary like the one below:

    This query provides a quick and easy way to identify the most popular and least popular items on the coffee shop's menu, which can be valuable for making decisions about inventory, pricing, and menu changes.
    {:.notice--info}

4. Review the details of the explanation.
5. Click `RUN`. The result is six menu items: the top three highest-selling items and the bottom three lowest-selling items. However, this time, you not only see the `menu_id` and `total_revenue` fields, but you also see the `item_name` field included between them.

6. Answer these questions:
- **Which item has the most revenue?**
- **Which item has the least revenue?**

---

#### Transform the query to remove extraneous decimal places

1. Select the query.
2. Click `Gemini` to access the SQL generation tool.
3. Click `Transform`. You see the `Transform SQL with Gemini` pop-up appear.
4. Enter the following prompt:

    Format the total revenue column so that there are only two decimal places.
    {:.notice--info}

5. Click `GENERATE`. You see the new query generated.

    **Note**: Notice how BigQuery shows the differences in the code: replaced lines are in red-background text and the new line that modifies it based upon your prompt is in green-background text.
    {:.notice--info}

6. Click **INSERT**. You see the new query in the Untitled query tab.

    ```sql
    (
       SELECT
           t1.menu_id,
           t1.item_name,
           ROUND(SUM(t2.item_total), 2) AS total_revenue
       FROM
           `set at lab start.coffee_on_wheels.menu` AS t1
           INNER JOIN `set at lab start.coffee_on_wheels.order_item` AS t2 ON t1.menu_id = t2.menu_id
       GROUP BY 1, 2
       ORDER BY
           total_revenue DESC
       LIMIT 3
    )
    UNION ALL
    (
       SELECT
           t1.menu_id,
           t1.item_name,
           ROUND(SUM(t2.item_total), 2) AS total_revenue
       FROM
           `set at lab start.coffee_on_wheels.menu` AS t1
           INNER JOIN `set at lab start.coffee_on_wheels.order_item` AS t2 ON t1.menu_id = t2.menu_id
       GROUP BY 1, 2
       ORDER BY
           total_revenue
       LIMIT 3
    );
    ```

7. Click **RUN**. Notice how the result is very similar. However, now the `total_revenue` field only has two decimal places.

#### Time to reflect
- **What is the total revenue generated by Clouds of Coffee Delight?**
- **Considering your data and use cases for BigQuery, how would you use the code generation feature?**


### Task 4. Code review, debugging, and suggestions
---

When you use Gemini with BigQuer,y you also have the ability to review and debug code. When you may have an error, you can use Gemini to suggest changes to improve your code, so there aren't errors.

#### Scenario
Your teammate created the following SQL code:

```sql
SELECT
    oi.menu_id,
    m.item_name,
    SUM(oi.item_total) AS total_revenue
FROM
    `set at lab start.coffee_on_wheels.order_item` AS oi
    INNER JOIN `set at lab start.menu` AS m ON oi.menu_id = m.menu_id
WHERE m.item_size = 'Small'
GROUP BY 1, 2
ORDER BY
    total_revenue DESC
LIMIT 10;
```

Their goal was to retrieve the top ten small-sized items by total revenue from the `coffee_on_wheels` dataset. However, they encountered the following error:

**Not found**: Dataset PROJECT_ID:PROJECT_ID was not found in location US
{:.notice--info}

And they are unable to resolve the issue.

Your task is to use Gemini and the `coffee_on_wheels` dataset to resolve issues with this SQL code that was generated by your team member.

#### Code review

1. Click the **+** to create a new SQL query.

2. Enter the query below.

    ```sql
    SELECT
        oi.menu_id,
        m.item_name,
        SUM(oi.item_total) AS total_revenue
    FROM
        `set at lab start.coffee_on_wheels.order_item` AS oi
        INNER JOIN `set at lab start.menu` AS m ON oi.menu_id = m.menu_id
    WHERE m.item_size = 'Small'
    GROUP BY 1, 2
    ORDER BY
    total_revenue DESC
    LIMIT 10;
    ```

3. Click **RUN**. You confirm the query fails to run and you get the following error:

    **Not found**: Dataset PROJECT_ID:PROJECT_ID was not found in location US
    {:.notice--info}

#### Debug the Code with Gemini and the Error  

1. Access the **Gemini Chat** window in BigQuery.  
2. In the chat window, enter the following question:  

    Why am I getting "Not found: PROJECT_ID:PROJECT_ID was not found in location US" when I run this query?
    {:.notice--info}
   

3. Press `<SHIFT><ENTER>`, or `<SHIFT><return>` on Mac, to create a new line in the chat window.  
4. Select the query and copy it.  
5. Paste it immediately after the question you asked.  
6. Press `<SHIFT><ENTER>`, or `<SHIFT><return>` on Mac, to create a new line in the chat window.  
7. Enter the following sentence:  

    Please suggest new code to resolve any issues.
    {:.notice--info}
   

8. Click **Send prompt**. You get a response from Gemini.  

9. Review the suggestions in the response.  

    Based upon these suggestions, you determine the most likely cause of the issue is the correct dataset name **coffee_on_wheels** is not specified within the INNER JOIN statement for the `menu` table in the query.  

    Within the suggestions, a refined query with a potential solution similar to the one below is provided:  

    ```sql
    SELECT
        oi.menu_id,
        m.item_name,
        SUM(oi.item_total) AS total_revenue
    FROM
        `set at lab start.coffee_on_wheels.order_item` AS oi
        INNER JOIN `set at lab start.coffee_on_wheels.menu` AS m ON oi.menu_id = m.menu_id
    WHERE m.item_size = 'Small'
    GROUP BY 1, 2
    ORDER BY
        total_revenue DESC
    LIMIT 10;
    ```

10. Copy the refined query.  
11. Click **+** to open a new untitled query tab.  
12. Paste the refined query in the new untitled query tab.  
13. Click **RUN**. The result is each of the top 10 small menu items with the `item_name` and the `total_revenue`.  

This is very close to what your teammate wanted. However, there is one small missing piece to the refined query. Notice that the `total_revenue` field is formatted with extraneous decimal places. You can ask Gemini to correct this for you with the steps below.  

---

#### Formatting the `total_revenue` Field with Only Two Decimal Places  

1. In the chat window, ask Gemini the following prompt:  

    I need help refining this query.
    {:.notice--info}
   

2. Press `<SHIFT><ENTER>`, or `<SHIFT><return>` on Mac, to create a new line in the chat window.  
3. Select the query and copy it.  
4. Paste it immediately after this first part of the prompt.  
5. Press `<SHIFT><ENTER>`, or `<SHIFT><return>` on Mac, to create a new line in the chat window.  
6. Add the following text to the end of the prompt:  

    Can you refactor the code so that we round to only two decimal places displayed with the total_revenue field in the results?
    {:.notice--info}

7. Confirm the prompt now looks something like this:  

    I need help refining this query.  
    SELECT oi.menu_id, m.item_name, SUM(oi.item_total) AS total_revenue  
    FROM `PROJECT_ID.coffee_on_wheels.order_item` AS oi  
    INNER JOIN `PROJECT_ID.coffee_on_wheels.menu` AS m ON oi.menu_id = m.menu_id  
    WHERE m.item_size = 'Small'  
    GROUP BY 1, 2  
    ORDER BY total_revenue DESC  
    LIMIT 10;  
    Can you refactor the code so that we round to only two decimal places displayed with the total_revenue field in the results?
    {:.notice--info}

8. Click **Send prompt**. You see Gemini's response below.  

    ```sql
    SELECT
        oi.menu_id,
        m.item_name,
        ROUND(SUM(oi.item_total), 2) AS total_revenue  -- Round to 2 decimal places
    FROM
        `set at lab start.coffee_on_wheels.order_item` AS oi
        INNER JOIN `set at lab start.coffee_on_wheels.menu` AS m ON oi.menu_id = m.menu_id
    WHERE m.item_size = 'Small'
    GROUP BY 1, 2
    ORDER BY
        total_revenue DESC
    LIMIT 10;
    ```

    With an explanation like the one below:  

    To limit the `total_revenue` field to two decimal places, you can use the `ROUND()` function in BigQuery. `ROUND(SUM(oi.item_total), 2)`: This part of the query uses the `ROUND()` function to round the sum of `oi.item_total` to two decimal places. The `2` inside the `ROUND()` function specifies the number of decimal places to keep.
    {:.notice--info}  

9. Copy the refactored code.  
10. Click **+** to open a new untitled query tab.  
11. Paste the refactored query in the new untitled query tab.  
12. Click **RUN**. The result is each of the top 10 small menu items with the `item_name` and the `total_revenue`.  
13. You confirm the results are what is desired and send the query back to your teammate. They thank you for your help.  

---

#### Time to Reflect  

1. Answer this question: **"What is the name of the item with the 5th most revenue? Also, how much revenue did it generate?"**  

2. Considering your data and use cases, how would you use the code review and suggestion features to fix code you are struggling with?  


### Congratulations!
---


You have generated a SQL query with a natural language prompt and used code explanation to understand queries you are unfamiliar with. You have also used Gemini to help you review and debug code. You asked Gemini to help you with suggestions to improve or even fix your code. You are becoming more experienced with using Gemini in BigQuery to author queries with and without code. Now you even have experience troubleshooting queries. You are becoming more confident with BigQuery each day and can use Gemini to supplement your knowledge and skills.

<hr style="height: 5px; background-color: black; border: none;">

## **6. DISCOVER AND VISUALIZE WORKFLOW**

{% include video id="zIEQeFzlXQo" provider="youtube" %}

<hr style="height: 5px; background-color: black; border: none;">

## **7. USE DATA CANVAS TO VISUALIZE AND DESIGN QUERIES(GSP1259)** 

### Overview

Imagine you are a data analyst and have been at Data Beans for a year. You have successfully completed many projects on your own and are taking on the responsibility of mentoring new data analysts because the company is growing. The team has already been using Gemini in BigQuery to generate SQL code, data insights, and table explorer. The team has found these helpful, especially with new datasets. However, the team needs a better collaboration tool for visualizing data and creating new, more complex queries that join tables.

You have heard that Data Canvas is a visual interface within Google Cloud BigQuery that simplifies data exploration and analysis. It allows users to interact with their data through point-and-click actions, eliminating the need for complex SQL queries. You can also collaborate with others by sharing canvases with others. Data Canvas appears to be a potential solution for the team's needs, and from what you have read, you want to get started using it, but unsure how to do this.

#### Objectives

In this lab, you learn how to use Data Canvas to:

- Join the menu, orders, and order item tables.
- Calculate the total revenue for all menu items in 2024.
- Create a bar chart displaying the top 10 items by total revenue.
- Identify two menu items generating the same revenue.
- Collaborate with others.

Finally, you have time to reflect on what you have learned in this lab and consider how you could apply Data Canvas to your data, use cases, and workflows by answering questions in your [Lab Journal](https://storage.mtls.cloud.google.com/spls/gsp1259/gsp1259_lab_journal.pdf).

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


### Task 1: Join the Menu, Orders, and Order Item Tables  
---

In this task, you use Data Canvas to find the `menu`, `orders`, and `order_item` tables and join them so that you can create insights from them.  

#### Find the Menu, Orders, and Order Item Tables  

1. In the **Google Cloud console**, on the **Navigation menu**, click **BigQuery**.  
2. Click **DONE** on the Welcome dialog.  
3. Click **Data Canvas** to create a new data canvas for your project.  
4. Select the **region**.  
5. Click **SELECT**. See the **Untitled canvas** tab appear.  
   - Notice how you can find a table with a natural language prompt and access recently used tables, queries, and saved queries.  
   - You are going to use a natural language prompt to find the `menu` and `order_item` tables by searching for the `coffee_on_wheels` dataset.  
6. Enter **coffee on wheels**.  
7. Click **Send search query**.  
   - The tables for the `coffee_on_wheels` dataset appear.  
   - You should see four tables: `location`, `menu`, `orders`, and `order_items`.  

**Note:** Click the **Submit search query** button until the number of tables displayed is as expected. If the expected tables are not displayed, open the `coffee_on_wheels` dataset from the left pane, and for `menu`, `orders`, and `order_items` tables, select **Query in > Current data canvas** from the three dots. Then, click **JOIN** from any of the tables and select the remaining two. You can continue with the following subtask from step 3 with the **Join these data sources** prompt.
{:.notice--info}  

#### Join the Menu, Orders, and Order Item Tables  

Now that you have found the tables, you can join them.  

1. Select the `menu`, `orders`, and `order_item` tables. Notice the **JOIN** button appears.  
2. Click **JOIN**.  
   - You see Data Canvas join the three tables visually, and a new branch node is created.  
   - However, the join isn't complete yet.  
   - Notice a query like the one below is automatically created, and you have options to run or save it.  

    ```sql
    SELECT * FROM `set at lab start.coffee_on_wheels.menu` AS t1,
    `set at lab start.coffee_on_wheels.orders` AS t2,
    `set at lab start.coffee_on_wheels.order_item` AS t3 LIMIT 10;
    ```

    *You don't use this query, as it only selects items from the tables and lists 10 of them. Instead, use the prompt included:*  

    ```bash
    Join these data sources
    ```

3. Click **Send input**.  
   - A new query like the one below is generated.  

    ```sql
    SELECT
        menu.menu_id,
        menu.company_id,
        menu.item_name,
        menu.item_price,
        menu.item_description,
        menu.item_size,
        order_item.order_item_id,
        order_item.order_id,
        order_item.quantity,
        order_item.item_price,
        order_item.item_total,
        orders.location_id,
        orders.customer_id,
        orders.order_datetime,
        orders.order_completion_datetime
    FROM
        `set at lab start.coffee_on_wheels.menu` AS menu
    INNER JOIN
        `set at lab start.coffee_on_wheels.order_item` AS order_item
    ON
        menu.menu_id = order_item.menu_id
    INNER JOIN
        `set at lab start.coffee_on_wheels.orders` AS orders
    ON
    order_item.order_id = orders.order_id;
    ```

2. Click **RUN**.  
3. Review the results and confirm the tables are joined.  
   - You see each menu item listed with key fields including `item_name`, `item_price`, `order_datetime`, and `item_total`.  
   - Use these fields within this new table to calculate total revenue for each item in 2024 in the next task.  


### Task 2: Calculate the Total Revenue for All Menu Items in 2024  
---

In this task, you use the joined tables to calculate the total revenue for all menu items in 2024 using a Gemini prompt resulting in an SQL query.  

Beneath the results of the join query, you see options to branch another node in your data canvas, including **QUERY THESE RESULTS, VISUALIZE, AND JOIN**.  

- **QUERY THESE RESULTS**: Can be used to create a query from the resulting joined table.  
- **VISUALIZE**: Can be used to create charts from the data in the joined table.  
- **JOIN**: Can be used to join this table with another table.  

1. Click **QUERY THESE RESULTS**. A new node is generated in your data canvas. Notice you can enter a prompt, or you can manually write new SQL code.  

2. Enter the following prompt:  

    From the joined table, only consider orders from 2024. Calculate the total revenue for each menu item. In the results, display the menu_id, the item name, the item size, and the total revenue (rounded as only two decimal places). Order results with total revenue in descending order.
    {:.notice--info}  

3. Click **Send input**. You see a new query is generated like the one below.  

    **Prompt**: From the joined table, only consider orders from 2024. Calculate the total revenue for each menu item. In the results, display the menu_id, the item name, the item size, and the total revenue (rounded as only two decimal places). Order results with total revenue in descending order.
    {:.notice--info}  

    ```sql
    SELECT  
        t1.menu_id,  
        t1.item_name,  
        t1.item_size,  
        ROUND(SUM(t1.item_total), 2) AS total_revenue  
    FROM  
        `SQL` AS t1  
    WHERE  
        EXTRACT(YEAR FROM t1.order_datetime) = 2024  
    GROUP BY  
        1, 2, 3  
    ORDER BY  
        total_revenue DESC;
    ```

4. Click **RUN**.  

6. Review the results. Notice that the `menu_id`, `item_name`, `item_size`, and `total_revenue` fields are included.  

#### Time to Reflect  
1. Which item is ranked number 2 in highest revenue? What is the `item_size` reported?  
  

### Task 3: Create a Bar Chart Displaying the Top 10 Items by Total Revenue  
---

In this task, you use the results from the total revenue calculation to create a bar chart of the top 10 items by total revenue.  

#### Identify the Top 10 Items by Total Revenue  

1. Click **QUERY THESE RESULTS**. A new node is generated in your data canvas.  

2. Enter the following prompt:  

    Identify the top 10 items by total revenue and include the `menu_id`, `item_name`, `item_size`, and `total_revenue` fields.
    {:.notice--info}  

3. Click **Send input**. You see a new query is generated like the one below.  

    ```sql
    SELECT  
        t1.menu_id,  
        t1.item_name,  
        t1.item_size,  
        t1.total_revenue  
    FROM  
        `SQL` AS t1  
    ORDER BY  
        t1.total_revenue DESC  
    LIMIT 10;
    ```

4. Click **RUN**.  

5. Review the results. Notice that now only the top 10 items by total revenue are shown.  

#### Create the Bar Chart  

1. Click **VISUALIZE**.  

2. Select **Create a bar chart**. A new node is generated in your data canvas. Notice how a chart is created automatically from the "Create bar chart" prompt and the chart is displayed with all menu items included with their total revenue.  

    This is helpful, but notice how the items aren't in order from highest to lowest total revenue. Nor are the item sizes factored into the chart. You can fix that.  

3. Replace the existing prompt by entering the following prompt:  

    Create a vertical bar chart displaying total revenue. Include the item name on the x-axis and the total revenue on the y-axis in the results. Start with the location with the highest revenue. Stack the results by item size.
    {:.notice--info}  

4. Click **Send input**. Notice how the top ten items are displayed now in order, and item size is factored into total revenue with color-coding.  

#### View the Chart Summary  
Now that the chart is created, you also get a summary. To view the chart summary:  

1. At the bottom of the chart, click **Generate Summary**. A chart summary is generated like the one below:  

    Summary:
       - "Coffee-infused Avocado Toast" emerged as the top revenue generator, reaching $675.48.  
       - A majority of the menu items (5 out of 10) do not have size variations and fall under the `"n/a"` size category.  
       - Items without size options contribute significantly to the overall revenue.  
       - For items with size options ("Brewhaha Bonanza" and "Java Journey"), the `"large"` size demonstrates higher popularity.
    {:.notice--info}


#### Time to Reflect  
1. Compare the bar chart to the raw data in the results for the query you generated in **Task 2**.  

2. Why is **Brewhaha Bonanza** displayed as the highest total revenue item in the chart and not **Coffee-infused Avocado Toast**?  


### Task 4. Identify Two Menu Items Generating the Same Revenue
---

In this task, you identify two menu items generating the same revenue from the total revenue calculation you completed in an earlier task.

1. Return to the node for the total revenue calculation.
2. Move your cursor so that it hovers over the bottom center of the node. You see the **Branch another node** options appear.
3. Click **QUERY THESE RESULTS**. A new node is generated in your data canvas.
4. Enter the following prompt:

    Find two items with the same total revenue. Within the results, display the item names, item size, and total revenue. Limit your response to only two items.
    {:.notice--info}

5. Click **Send input**. You see a new query like the one below is generated.

    **Prompt**: Find two items with the same total revenue. Within the results, display the item names, item size, and total revenue. Limit your response to only two items.
    {:.notice--info}

    ```sql
    SELECT
    t1.item_name,
    t1.item_size,
    t1.total_revenue
    FROM
    `SQL 1` AS t1
    WHERE
    t1.total_revenue IN(
    SELECT
       t2.total_revenue
    FROM
       `SQL 1` AS t2
    GROUP BY
       1
    HAVING
       COUNT(t2.total_revenue) > 1 )
    LIMIT
    2;
    ```

6. Click **RUN**.

#### Time to Reflect
Review the results. Notice two results are displayed, with the item names, size, and total revenue for each.

1. Which two items are displayed?
2. What are the item sizes?
3. Do the revenues match?
4. Considering your data and use cases, how would you use data canvas to visualize and design queries?


### Task 5. Collaborate with Others
---

In this task, you act as two different users, the owner of the data canvas and another user you want to share the data canvas with. First, you review the roles assigned to the owner and the other user within this lab environment. Then, you save and share the data canvas you just created. You also export the data canvas to a notebook. Finally, you access the data canvas as the other user.

#### Roles Required for Using and Sharing Data Canvases

1. In the **Google Cloud console**, on the **Navigation menu**, click **IAM & Admin**. You see the list of principals along with the assigned roles.

2. Find the **set at lab start** principal.

    **Note:** This is the owner principal, also this is the user you have been using up until this point in this lab.
    {:.notice--info}

As you can see in IAM, this user has the following roles:

- **BigQuery Admin**
- **Gemini for Google Cloud User**
- **Owner**
- **Service Usage Viewer**
- **Viewer**

3. Find the **set at lab start** principal.

    **Note:** This is the other principal you use for testing the data canvas sharing feature.
    {:.notice--info}

As you can see in IAM, this user has the following roles:

   - **BigQuery Data Editor**
   - **BigQuery Studio User**
   - **Gemini for Google Cloud User**
   - **Code Editor**
   - **Viewer**

See **Permissions Required Roles for data canvas** for more information.

#### Save and Share a Data Canvas (as the Owner)

1. Return to your data canvas in BigQuery.
2. Find the **Save** button at the top of the Canvas. Click the down arrow. You see two options, **Save** and **Save As**.
3. Click **Save As**. The **Save** dialog appears.
4. Enter a name: **Two items with same total revenue**.
5. Keep the default region, as this was assigned to you when you launched the lab.
6. Click **SAVE**. You notice that the data canvas is now saved and listed in the **Explorer** panel in the **Shared data canvases** section.

#### Export a Data Canvas to a Notebook (as the Owner)

BigQuery data canvas lets you export your queries as a notebook.

1. Within the data canvas, click **Export as notebook**.
2. In the **Save Notebook** pane, enter the name for the notebook (**data_canvas_export**) and the region where you want to save it (**[default region]**).
3. Click **Save**. The notebook is created successfully.
4. To view the created notebook, expand the **Notebooks** section of the explorer panel.
5. Click on the **data_canvas_export** notebook.

    **Note:** Given the current permissions for the owner and the other user, only the owner can export. In other words, you need to supply the appropriate permissions to enable the export feature.
    {:.notice--info}

#### Access a Data Canvas (as Another User)

Now you access the data canvas as another user.

1. Here, in the **lab guide**, right-click on **Open Google Cloud console**.
2. Select **Open link in incognito window**.
3. Use **Username 2** username and password. Access the Google Cloud console the same way you did at the start of this lab.
4. In the **Google Cloud console**, on the **Navigation menu**, click **BigQuery**.
5. Click **DONE** on the **Welcome** dialog.
6. In the **Explorer** panel, expand the **set at lab start** project. You see the **coffee_on_wheels** dataset at the bottom of the list.
7. Expand **Data canvases**.
8. Expand **Shared data canvases**. You see the **Two items with same total revenue** data canvas listed.
9. Click the **Two items with same total revenue** data canvas. You see the data canvas displayed.

From here, the other can review the data canvas to understand the workflow you designed for this business problem. If needed, they can even modify the canvas to either troubleshoot an issue or augment it as needed, based upon the permissions they have.

#### Time to Reflect

- Considering your data and use cases, how would you use data canvas to collaborate with your team?
- How would you manage access to the data canvases your team creates?



### Congratulations!
---

You have successfully used data canvas to find and join tables from the **coffee_on_wheels** dataset. You also successfully calculated the total revenue for all menu items in the dataset, and visualized these using a bar chart directly in **data canvas**. Then, you successfully found two items with the same revenue from this calculation. Finally, you successfully used IAM roles in **data canvas** to save a data canvas in your project and share it with others.

Consider what you have learned in this lab, and share it with others on your team to identify how you can collaborate with each other using **data canvas**.

<hr style="height: 5px; background-color: black; border: none;">

## **8. SUMMARY**

{% include video id="_o-iphsDx_E" provider="youtube" %}

<hr style="height: 5px; background-color: black; border: none;">


## **9. QUIZ**

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

----





























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