---
title: | 
        **Workspace: Add-ons** <br>
        ![Google Cloud Compute](https://img.shields.io/badge/google--cloud-compute--engine-blue)
        ![Nginx](https://img.shields.io/badge/nginx-web--server-green)
        ![Debian VM](https://img.shields.io/badge/debian-virtual--machine-red)
        ![Node.js](https://img.shields.io/badge/node.js-runtime--environment-brightgreen)
        ![Linux](https://img.shields.io/badge/linux-operating--system-black)

permalink: /docs/gcp/workspace-addons/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-02-23T21:36:18-04:00
toc: true

---

## **Creating a Gmail Add-on (GSP249)**

### Overview

Gmail add-ons automate tasks within Gmail, saving time and effort for users. Gmail add-ons can examine incoming messages, then act on these messages in various ways, such as:

- Displaying additional information for the user in the Gmail UI.
- Connecting to non-Google services, to retrieve information or take other actions.
- Providing an interactive interface to allow the user to control the add-on or send information to another service.

#### Objectives

In this hands-on lab you create a Gmail [Add-on](https://developers.google.com/gmail/add-ons/) that allows you to quickly change the labels of an email thread.

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

### Task 1. Create the script project

#### Launch Apps Script

1. Click this [Apps Script link](https://script.google.com/) to open in a new tab or browser window. A new project opens.  
    
    **Note:** Apps Script places the project file in your Drive root folder.
    {:.notice--info}


2. Click the **Settings** icon then select the **Show "appsscript.json" manifest file in editor** option.  

3.Click the **Editor** icon.

#### Name the project
1. Click **Untitled project** in the upper left.
2. Name the project **Gmail Add-on Quickstart**, and then click **Rename**.

#### Create the script file, Code.gs
- Replace the **Code.gs** file contents with the following:
  
    ```javascript
    // Code.gs
    /**
    * Copyright Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *     https://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */

    /**
    * Returns the array of cards that should be rendered for the current
    * e-mail thread. The name of this function is specified in the
    * manifest 'onTriggerFunction' field, indicating that this function
    * runs every time the add-on is started.
    *
    * @param {Object} e The data provided by the Gmail UI.
    * @return {Card[]}
    */
    function buildAddOn(e) {
        // Activate temporary Gmail add-on scopes.
        var accessToken = e.messageMetadata.accessToken;
        GmailApp.setCurrentMessageAccessToken(accessToken);

        var messageId = e.messageMetadata.messageId;
        var message = GmailApp.getMessageById(messageId);

        // Get user and thread labels as arrays to enable quick sorting and indexing.
        var threadLabels = message.getThread().getLabels();
        var labels = getLabelArray(GmailApp.getUserLabels());
        var labelsInUse = getLabelArray(threadLabels);

        // Create a section for that contains all user Labels.
        var section = CardService.newCardSection()
            .setHeader("<font color=\"#1257e0\"><b>Available User Labels</b></font>");

        // Create a checkbox group for user labels that are added to prior section.
        var checkboxGroup = CardService.newSelectionInput()
            .setType(CardService.SelectionInputType.CHECK_BOX)
            .setFieldName('labels')
            .setOnChangeAction(CardService.newAction().setFunctionName('toggleLabel'));

        // Add checkbox with name and selected value for each User Label.
        for(var i = 0; i < labels.length; i++) {
            checkboxGroup.addItem(labels[i], labels[i], labelsInUse.indexOf(labels[i])!= -1);
        }

        // Add the checkbox group to the section.
        section.addWidget(checkboxGroup);

        // Build the main card after adding the section.
        var card = CardService.newCardBuilder()
            .setHeader(CardService.newCardHeader()
            .setTitle('Quick Label')
            .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/label_googblue_48dp.png'))
            .addSection(section)
            .build();

        return [card];
    }

    /**
    * Updates the labels on the current thread based on
    * user selections. Runs via the OnChangeAction for
    * each CHECK_BOX created.
    *
    * @param {Object} e The data provided by the Gmail UI.
    */
    function toggleLabel(e){
        var selected = e.formInputs.labels;

        // Activate temporary Gmail add-on scopes.
        var accessToken = e.messageMetadata.accessToken;
        GmailApp.setCurrentMessageAccessToken(accessToken);

        var messageId = e.messageMetadata.messageId;
        var message = GmailApp.getMessageById(messageId);
        var thread = message.getThread();

        if (selected != null){
            for each (var label in GmailApp.getUserLabels()) {
                if(selected.indexOf(label.getName()) != -1){
                    thread.addLabel(label);
                }
                else {
                    thread.removeLabel(label);
                }
            }
        }
        else {
            for each (var label in GmailApp.getUserLabels()) {
                    thread.removeLabel(label);
            }
        }
    }

    /**
    * Converts an GmailLabel object to a array of strings.
    * Used for easy sorting and to determine if a value exists.
    *
    * @param {labelsObjects} A GmailLabel object array.
    * @return {lables[]} An array of labels names as strings.
    */
    function getLabelArray(labelsObjects){
        var labels = [];
        for(var i = 0; i < labelsObjects.length; i++) {
            labels[i] = labelsObjects[i].getName();
        }
        labels.sort();
        return labels;
    }
    ```
    
    **Note:** Before saving, you'll need to update the script manifest to avoid errors.
    {:.notice--info}

---

### Task 2. Update the script manifest

Update the manifest (**appsscript.json**) to provide the add-on with required deployment information.

1. In the script editor, select the **appsscript.json** file from the left menu.
2. Replace the content of the manifest (**appsscript.json**) with the following:

    ```json
    {
        "oauthScopes": [
            "https://www.googleapis.com/auth/gmail.addons.execute",
            "https://www.googleapis.com/auth/gmail.addons.current.message.metadata",
            "https://www.googleapis.com/auth/gmail.modify"
        ],
        "gmail": {
            "name": "Gmail Add-on Quickstart - QuickLabels",
            "logoUrl": "https://www.gstatic.com/images/icons/material/system/1x/label_googblue_24dp.png",
            "contextualTriggers": [{
                "unconditional": {},
                "onTriggerFunction": "buildAddOn"
            }],
            "openLinkUrlPrefixes": [
                "https://mail.google.com/"
            ],
            "primaryColor": "#4285F4",
            "secondaryColor": "#4285F4"
        }
    }
    ```

3. Click the **Save project** icon to save the changes to the manifest and **Code.gs**. This step provides the add-on with required deployment information. If you get an error, save **Code.gs** again.

---

### Task 3. Deploy the add-on

1. Click the **Deploy > Test deployments** button at the top of the screen.
2. For **Application(s): Gmail**, click **Install**.
3. Click **Done**.
4. Open the **[Gmail add-on settings](https://mail.google.com/mail/#settings/addons)** tab.
5. This brings you to the **Setting** dialog at the **Add-ons** tab.

    When you have completed these steps, the add-on appears in the **Installed developer add-ons** list and becomes available for use in Gmail.

    **Note:** If you don't see your add-on in the **Installed developer add-ons** list, refresh the browser window. If the add-on is still not in the list, return to the **Gmail Add-on Quickstart** tab, uninstall and reinstall the add-on from the **Test deployments** window.
    {:.notice--danger}

---

### Task 4. Run the add-on

1. Return to your **Gmail** tab and refresh the tab.
2. Choose a message in Gmail and open it.
3. Make sure the right side menu is open - click the arrow to expand if it has been collapsed.

#### Create some labels

1. Click the **Labels** button (Gmail Label icon) from the Gmail menu bar above the email.
2. Click **Create new**.
3. Enter "Test 1" as your label name and click the **Create** button.
4. Repeat these steps to create another label named "Test 2".

#### Authorize add-on

The add-ons you installed appear in the right menu of the open email thread.
1. On the right side of the screen, click on the **Gmail Label** icon.
    
    The add-on will place a contextual card on the right side of the window, with a message asking for authorization.

2. Click the **Authorize access** link to open a dialog where you can authorize the add-on.
3. Select the student account that should authorize the add-on.
4. Click **Allow**.

5. If the next dialog informs you that the app is not verified:

    - Click **Advanced**.
    - At the bottom of the dialog, click **Go to Gmail Add-on Quickstart (unsafe)**.
    - In the new dialog, type "Continue" into the text field, then click **Next**.

6. Once authorized, the add-on should automatically refresh and start operating.

---

### Task 5. Use the add-on

The **Test 1** and the **Test 2** labels are checked under the **Available User Labels** section of the add-on (right side menu).
1. Click the **Test 2** checkbox to deselect the label. This will remove the label from the email thread you're currently in.
2. Verify that the appropriate labels have been applied by navigating back to the **Inbox** and refreshing the browser. Only the **Test 1** label is still applied and **Test 2** has been removed.
3. Open a different email.
4. In the add-on menu, select the **Test 1** and **Test 2** checkboxes, enabling them both.
5. Return to the **Inbox** and refresh the browser. Both labels have been applied to the email thread.

---


### **Congratulations!**  
You now have an idea of what Gmail add-ons are capable of. You could do many other things like displaying other recent threads that the sender has started, or translating the text of an email from one language to another without leaving Gmail.



---

## **Using the Natural Language API from Google Docs (GSP126)** 

### Overview

The [Natural Language API](https://cloud.google.com/natural-language/) is a pretrained machine learning model that can analyze syntax, extract entities, and evaluate the sentiment of text. You can call the Natural Language API from Google Docs to perform all of these functions.

This lab focuses on calling the Natural Language API from Google Docs. You use the Natural Language API to recognize the sentiment of selected text in a Google Doc and highlight it based on that sentiment.

When you complete this lab, you are able to select text in a document and mark its sentiment, using a menu choice, as shown below.
Text is highlighted in red for negative sentiment, green for positive sentiment, and yellow for neutral sentiment.

#### Objectives

In this lab, you learn how to:

- Call the Natural Language API from Google Docs
- Add menus to Google Docs
- Recognize and work with selected text in Google Docs

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

### Task 1. Enable the Natural Language API

Before you start, make sure that the Natural Language API is enabled.

1. In the Google Cloud console, select **Navigation menu > APIs & Services > Library**.

2. Search for **Cloud Natural Language API** and click on the API to enable it or to confirm that the API is enabled.

---

### Task 2. Get an API key

Generate an API user key to pass in the request URL.

1. To create an API key, select **Navigation menu > APIs & Services > Credentials**.

2. Click **Create credentials** at the top and select **API key**:

3. Copy the API key to a text file or a Google Doc to use in a later step. Click **Close**.

Once you have the API key, you are ready to move into Google Docs.


---

### Task 3. Set up your Google Doc

Before you call the Natural Language API, make an Apps Script program to create the menu, link it to a function to mark the text, and extract the text from the user selection.

1. Create a new **[Google Doc](https://docs.google.com/document/create)**.
2. From within your new document, select the menu item **Extensions > Apps Script**.
3. Delete any code in the script editor and paste in the code below. This code creates a menu item, extracts the text from the current selected text, and highlights the text based on its sentiment. It does not call the Natural Language API yet.

    ```javascript
    /**
    * @OnlyCurrentDoc
    *
    * The above comment directs Apps Script to limit the scope of file
    * access for this add-on. It specifies that this add-on will only
    * attempt to read or modify the files in which the add-on is used,
    * and not all of the user's files. The authorization request message
    * presented to users will reflect this limited scope.
    */

    /**
    * Creates a menu entry in the Google Docs UI when the document is
    * opened.
    *
    */
    function onOpen() {
        var ui = DocumentApp.getUi();
        ui.createMenu('Natural Language Tools')
            .addItem('Mark Sentiment', 'markSentiment')
            .addToUi();
        }
    /**
    * Gets the user-selected text and highlights it based on sentiment
    * with green for positive sentiment, red for negative, and yellow
    * for neutral.
    *
    */
    function markSentiment() {
        var POSITIVE_COLOR = '#00ff00';  //  Colors for sentiments
        var NEGATIVE_COLOR = '#ff0000';
        var NEUTRAL_COLOR = '#ffff00';
        var NEGATIVE_CUTOFF = -0.2;   //  Thresholds for sentiments
        var POSITIVE_CUTOFF = 0.2;

    var selection = DocumentApp.getActiveDocument().getSelection();
    if (selection) {
        var string = getSelectedText();

        var sentiment = retrieveSentiment(string);

        //  Select the appropriate color
        var color = NEUTRAL_COLOR;
        if (sentiment <= NEGATIVE_CUTOFF) {
            color = NEGATIVE_COLOR;
        }
        if (sentiment >= POSITIVE_CUTOFF) {
            color = POSITIVE_COLOR;
        }

        //  Highlight the text
        var elements = selection.getSelectedElements();
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].isPartial()) {
                var element = elements[i].getElement().editAsText();
                var startIndex = elements[i].getStartOffset();
                var endIndex = elements[i].getEndOffsetInclusive();
                element.setBackgroundColor(startIndex, endIndex, color);

            } else {
                var element = elements[i].getElement().editAsText();
                foundText = elements[i].getElement().editAsText();
                foundText.setBackgroundColor(color);
            }
        }
    }
    }
    /**
    * Returns a string with the contents of the selected text.
    * If no text is selected, returns an empty string.
    */
    function getSelectedText() {
        var selection = DocumentApp.getActiveDocument().getSelection();
        var string = "";
        if (selection) {
            var elements = selection.getSelectedElements();

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].isPartial()) {
                var element = elements[i].getElement().asText();
                var startIndex = elements[i].getStartOffset();
                var endIndex = elements[i].getEndOffsetInclusive() + 1;
                var text = element.getText().substring(startIndex, endIndex);
                string = string + text;

        } else {
            var element = elements[i].getElement();
            // Only translate elements that can be edited as text; skip
            // images and other non-text elements.
            if (element.editAsText) {
                string = string + element.asText().getText();
            }
        }
    }
    }
    return string;
    }

    /** Given a string, will call the Natural Language API and retrieve
     * the sentiment of the string.  The sentiment will be a real
     * number in the range -1 to 1, where -1 is highly negative
     * sentiment and 1 is highly positive.
    */
    function retrieveSentiment (line) {
        //  TODO:  Call the Natural Language API with the line given
        //         and return the sentiment value.
        return 0.0;
    }
    ```


    **Note:** To learn more about Apps Script, refer to the [Google Apps Script reference](https://developers.google.com/apps-script/reference).
    {:.notice--info}

4. On the menu bar, click **Save project**. (The script's name is shown to end users in several places, including the authorization dialog.)
5. Return to your document. Add text to your document. You can use the sample that comes from [*Alice in Wonderland*](http://www.gutenberg.org/files/11/11-h/11-h.htm#link2HCH0002) on Project Gutenberg (copy and paste the Plain Text UTF-8 version into the document), but feel free to use any text you wish.
6. Reload the document to see the new menu, **Natural Language Tools**, which you created, appear in the Google Docs toolbar.
7. Select text and then the **Mark Sentiment** option from the **Natural Language Tools** menu. The first time you select this option, you are prompted to authorize the script to run. Click **Continue**, and then confirm your account.
8. Allow **Natural Language Tools** to view and manage documents that this application has been installed in.
9. Once the script is authorized, the selected text is highlighted in yellow, since the stub for sentiment analysis always returns `0.0`, which is neutral.


---

### Task 4. Call the Natural Language API

Once your program can extract text from the selection and highlight it, it's time to call the Natural Language API. All of this is done in the body of the `retrieveSentiment` function.

**Note:** To learn more about the Natural Language API, refer to the [Cloud Natural Language API reference](https://cloud.google.com/natural-language/docs/reference/rest/).
{:notice--info}

1. Return to **Extensions > Apps Script** in Google Docs.
2. In the `retrieveSentiment` function, replace **"your key here"** with your actual API key from the Google Cloud Console.

    ```javascript
    var apiKey = "your key here"; // Replace with your actual API key
    ```

3. Create a variable to hold the URL of the Natural Language API with your API key appended to it:

    ```javascript
    var apiEndpoint = "https://language.googleapis.com/v1/documents:analyzeSentiment?key=" + apiKey;
    ```

4. Build a structure from the line passed into the function that holds the text of the line, along with its type and language. Currently, the only supported language is English.

    ```javascript
    var docDetails = {
        language: 'en-us',
        type: 'PLAIN_TEXT',
        content: line
    };
    ```

5. Build the entire data payload from the document details by adding the encoding type:

    ```javascript
    var nlData = {
        document: docDetails,
        encodingType: 'UTF8'
    };  
    ```

6. Create a structure containing the payload and the necessary header information:

    ```javascript
    var nlOptions = {
        method : 'post',
        contentType: 'application/json',
        payload : JSON.stringify(nlData)
    };
    ```

7. Make the call, saving the response:

    ```javascript
    var response = UrlFetchApp.fetch(apiEndpoint, nlOptions);
    ```

8. The response is returned in JSON format; parse it and extract the `score` field, if it exists. Return either that field or `0.0`.

    ```javascript
    var data = JSON.parse(response);

    var sentiment = 0.0;
    // Ensure all pieces were in the returned value
    if (data && data.documentSentiment && data.documentSentiment.score){
        sentiment = data.documentSentiment.score;
    }

    return sentiment;
    ```

    The complete code to retrieve the sentiment is below:

    ```javascript
    function retrieveSentiment (line) {
        var apiKey = "your key here"; // Replace with your actual API key
        var apiEndpoint = "https://language.googleapis.com/v1/documents:analyzeSentiment?key=" + apiKey;

        // Create a structure with the text, its language, its type, and its encoding
        var docDetails = {
            language: 'en-us',
            type: 'PLAIN_TEXT',
            content: line
        };

        var nlData = {
            document: docDetails,
            encodingType: 'UTF8'
        };

        // Package all of the options and the data together for the call
        var nlOptions = {
            method : 'post',
            contentType: 'application/json',
            payload : JSON.stringify(nlData)
        };

        // Make the call
        var response = UrlFetchApp.fetch(apiEndpoint, nlOptions);

        var data = JSON.parse(response);

        var sentiment = 0.0;
        // Ensure all pieces were in the returned value
        if (data && data.documentSentiment && data.documentSentiment.score){
            sentiment = data.documentSentiment.score;
        }

        return sentiment;
    }
    ```

9. Save your script, reload the document, and try out the full program. You may need to re-authorize with your credentials to enable the new functionality. Select different sections of your document to see how the sentiment may differ over its parts.


10. (Optional) Type and then analyze your own words. For example, type and analyze:
    - "I'm mad"
    - "I'm happy"

    Experiment to see how the Natural Language API interprets different groups, for example, if you analyze:

    ```bash
    I'm happy. I'm happy. I'm sad.
    ```

    What happens if you add another "I'm sad."?

---

### Congratulations!

You created a Google Doc and called the Natural Language API to analyze the sentiment of selected portions of the document.



---

## **Google Chat Bot - Apps Script (GSP250)** 

### Overview

Google Chat bots provide easy-to-use access points to your organization's data and services. Users can converse with bots within a chat experience.

One way to create a Google Chat bot is to use [Google Apps Script](https://developers.google.com/apps-script/). This also gives you easy access to other Google services like Drive, Gmail, Calendar, Docs, Sheets, and much more.

In this lab, you use Google Apps Script to create a simple Google Chat bot, which you'll name "Attendance Bot". The bot integrates with Gmail to set a user's vacation responder and integrates with Calendar to put a meeting on the user's calendar.

#### Objectives

In this lab, you perform the following tasks:

- Create a chat app from a template with pre-populated event handlers.
- Configure and publish the chat bot.
- Add new handlers for events raised in Google Chat.
- Parse event objects sent from Google Chat.
- Respond to Google Chat with card-formatted responses.
- Define and react to custom actions for button clicks in cards.

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

### Task 1. Create a chat app from a template

To implement your bot, create a new Google Apps Script project using the Chat App template.

**Note:** Signing into Google Cloud console sets your project and credentials. Before you click the Google Apps Script editor link in Step 1, be sure you have signed into the Google Cloud console.
{:.notice--info}

1. Click this [Google Apps Script homepage](https://script.google.com/home/start) link to open the Google Apps Script online editor.
2. Scroll down to the bottom of the page, and click on **Chat App**.
3. Click **Untitled project** (the current name).
4. In the **Edit project name** dialog, rename the project to **Attendance Bot**, and then click **Rename**.

#### Events in Google Chat

Most Apps Script bot interactions with Google Chat are event-driven. The interaction between the user, the bot, and Google Chat typically follows a sequence:

1. A user initiates an action, like adding a bot to a room, starting a direct message (DM) with a bot, or removing the bot from a room.
2. The action raises an event aimed at the bot in Google Chat.
3. Google Chat calls the corresponding event handler defined in the bot's script.

Google Chat raises four events that your Apps Script bot can listen for:

- **ADDED_TO_SPACE**: This event occurs when a human user adds a bot to a room or a DM. In Apps Script, you define an `onAddToSpace()` function to handle this event.
- **REMOVED_FROM_SPACE**: This event occurs when a user removes the bot from a room or DM. This event does not post a response back to Google Chat. In Apps Script, you define an `onRemoveFromSpace()` function to handle this event.
- **MESSAGE**: This event occurs when a user messages the bot, either directly in a DM or as an @mention in a room. In Apps Script, you define an `onMessage()` function to respond to this event.
- **CARD_CLICKED**: This event occurs when the user clicks a button with a custom action assigned to it. In Apps Script, you define an `onCardClick()` function to respond to this event.

#### Update the code for the MESSAGE event handler

The Chat App template pre-populates the code file containing the event handlers.

1. Click on the **Code.gs** file to see the pre-populated event handlers.
    
    Notice the event handlers for the `MESSAGE`, `ADDED_TO_SPACE`, and `REMOVE_FROM_SPACE` events. (You will add a handler for the `CARD_CLICKED` events later in this lab.)

2. On **line 38**, align the cursor to the line below it (a single tab indentation like line 39), and then copy and paste the following code line to prompt logging of the event:
   
    ```javascript
    console.log('Attendance Bot added in ', event.space.name);
    ```

3. Click **Save project to drive** (Save icon) to save the change to the **Code.gs** file.

---

### Task 2. Publish the bot

Before you can run and test the bot, the Google Chat API must be enabled for your Google Cloud project, and your bot must be published to Google Chat.

#### Configure the Google Cloud project and update the script to use it

1. Go to the **Google Cloud console**, click the **Navigation menu** (☰) in the upper left and navigate to **APIs & Services > OAuth consent screen**.
2. Click **Get Started**.
3. For the **Project configuration** page, under **App Information**, configure the following and click **Next**:
   
    | Field          | Value             |
    |--------------|-----------------|
    | App name     | Attendance Bot  |
    | User support email | Select the email ID from the drop-down. |
   
4. For **Audience**, select **Internal** and click **Next**.
5. Type the email address for **Contact Information** and click **Next**.
6. Accept the policy and click **Continue** then **Create**.
7. From the **Navigation Menu**, click **Cloud Overview > Dashboard**.
8. In the **Dashboard**, click **Go to project settings** in the **Project Info** section.
9. Record the **Project number** to use in the next step to configure your project.
10. Return to the **Apps Script editor**, and navigate to the **Project Settings** for the **Attendance Bot** project (gear icon for project settings).
11. Under **Google Cloud Platform (GCP) Project**, click **Change project**.
12. For **GCP Project number**, enter the project number that you copied earlier. Then, click **Set project**.

#### Configure and publish the chat bot

1. In the **Apps Script editor**, get the **Head Deployment ID** for the test deployment by clicking on **Deploy > Test Deployments** (top-right of the screen), and then clicking **Copy** next to **Head Deployment ID**.
2. In the **Google Cloud console**, navigate to **Navigation Menu (☰) > APIs & Services > Library**.
3. In the **Library**, search for **Google Chat API**. Select the API from the list of results.
4. The **Google Chat API** is already enabled in this project. If it is not enabled, click **Enable**.
5. Click **Manage**, and then click the **Configuration** tab under the **Google Chat API** section.
6. In the **Configuration** dialog, set the fields with the following values:
   
    | Field          | Value                                       |
    |--------------|---------------------------------|
    | App name     | Attendance Bot                 |
    | Avatar URL   | [https://goo.gl/kv2ENA](https://goo.gl/kv2ENA) |
    | Description  | Apps Script lab bot            |
    | Functionality | Select **Receive 1:1 messages** and **Join spaces and group conversations** |
    | Connection settings | Check **Apps Script project**, and then paste the **Head Deployment ID** that you copied earlier into the **Deployment ID** field. |
    | Visibility   | username                        |

7. Click **SAVE**.
8. After the changes are saved, scroll to the top of the **Configuration** dialog to update the **App Status** to **LIVE – available to users**.
   
    *You may have to refresh the page to see the **App Status** field.*

9. Click **SAVE** again.

#### Test the bot

To test your bot in **Google Chat**, do the following:

1. Click the **Google Chat** link to open **Google Chat**.
2. Select **Start a chat** (💬) in the **Chat** section.
3. Search for **Attendance bot**.
4. From the results, select the **Attendance Bot, Apps Script lab bot** that you created, and click **Start chat**.

    When the **direct message thread** opens, you should see a message from the bot thanking you for adding it to a DM.
   
    **Note**: It can take a few minutes for the progress check below to return a successful completion mark for this task. If not successful, wait a few mins and try again.
    {:.notice--info}

---

### Task 3. Define a card-formatted response

In the previous task, your bot responded to Google Chat events with a simple text response. In this task, you update your bot to respond with cards.

#### Card responses

Google Chat supports the use of cards for responses. Cards are visual containers that allow you to group sets of user interface widgets together. Cards can display headers, text paragraphs, sets of buttons, images, and key/value text. Your bot can define one or many cards in its JSON response to Google Chat, which then translates your response into the corresponding UI elements.

The following image shows an example card response with three sections that includes a header, a key/value widget, an image widget, and a text button.

1. In Apps Script, click **Editor (editor_icon)**, and open the `Code.gs` file.
2. Locate the existing code for function `onMessage(event)` at the top of `Code.gs` file, and delete code lines 1 to 17.

    You replace these code lines for function `onMessage(event)` with new code in the next step.
   
3. Copy the following code, and paste these lines at the top of the `Code.gs` file:

    **Code.gs**

    ```javascript
    var DEFAULT_IMAGE_URL = 'https://goo.gl/bMqzYS';
    var HEADER = {
        header: {
            title : 'Attendance Bot',
            subtitle : 'Log your vacation time',
            imageUrl : DEFAULT_IMAGE_URL
        }
    };

    /**
    * Creates a card-formatted response.
    * @param {object} widgets the UI components to send
    * @return {object} JSON-formatted response
    */
    function createCardResponse(widgets) {
        return {
            cards: [HEADER, {
                sections: [{
                widgets: widgets
                }]
            }]
        };
    }

    /**
    * Responds to a MESSAGE event triggered
    * in Google Chat.
    *
    * @param event the event object from Google Chat
    * @return JSON-formatted response
    */
    function onMessage(event) {
        var userMessage = event.message.text;

        var widgets = [{
            "textParagraph": {
            "text": "You said: " + userMessage
            }
        }];

        console.log('You said:', userMessage);

        return createCardResponse(widgets);
    }
    ```

4. Click **Save project to drive (Save icon)** to save the `Code.gs` file.

    By replacing the `onMessage()` function and adding the `createCardResponse()` function, you accomplish the following:

      - The `onMessage()` function reads the user's original message and constructs a response as a simple `TextParagragh` widget.
      - The `onMessage()` function then calls `createCardResponse()`, which places the `TextParagraph` widget within a section of a single card.
      - The bot returns the JavaScript object constructed with the card response to Google Chat.


```javascript
/**
 * Responds to a MESSAGE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
var DEFAULT_IMAGE_URL = 'https://goo.gl/bMqzYS';
var HEADER = {
  header: {
    title : 'Attendance Bot',
    subtitle : 'Log your vacation time',
    imageUrl : DEFAULT_IMAGE_URL
  }
};

/**
 * Creates a card-formatted response.
 * @param {object} widgets the UI components to send
 * @return {object} JSON-formatted response
 */
function createCardResponse(widgets) {
  return {
    cards: [HEADER, {
      sections: [{
        widgets: widgets
      }]
    }]
  };
}

/**
 * Responds to a MESSAGE event triggered
 * in Google Chat.
 *
 * @param event the event object from Google Chat
 * @return JSON-formatted response
 */
var REASON = {
  SICK: 'Out sick',
  OTHER: 'Out of office'
};
/**
 * Responds to a MESSAGE event triggered in Google Chat.
 * @param {object} event the event object from Google Chat
 * @return {object} JSON-formatted response
 */

function onMessage(event) {
  console.info(event);
  var reason = REASON.OTHER;
  var name = event.user.displayName;
  var userMessage = event.message.text;

  // If the user said that they were 'sick', adjust the image in the
  // header sent in response.
  if (userMessage.indexOf('sick') > -1) {
    // Hospital material icon
    HEADER.header.imageUrl = 'https://goo.gl/mnZ37b';
    reason = REASON.SICK;
  } else if (userMessage.indexOf('vacation') > -1) {
    // Spa material icon
    HEADER.header.imageUrl = 'https://goo.gl/EbgHuc';
  }

  var widgets = [{
    textParagraph: {
      text: 'Hello, ' + name + '.<br>Are you taking time off today?'
    }
  }, {
    buttons: [{
      textButton: {
        text: 'Set vacation in Gmail',
        onClick: {
          action: {
            actionMethodName: 'turnOnAutoResponder',
            parameters: [{
              key: 'reason',
              value: reason
            }]
          }
        }
      }
    }, {
      textButton: {
        text: 'Block out day in Calendar',
        onClick: {
          action: {
            actionMethodName: 'blockOutCalendar',
            parameters: [{
              key: 'reason',
              value: reason
            }]
          }
        }
      }
    }]
  }];
  return createCardResponse(widgets);
}

/**
 * Responds to a CARD_CLICKED event triggered in Google Chat.
 * @param {object} event the event object from Google Chat
 * @return {object} JSON-formatted response
 * @see https://developers.google.com/chat/reference/message-formats/events
 */
function onCardClick(event) {
  console.info(event);
  var message = '';
  var reason = event.action.parameters[0].value;
  if (event.action.actionMethodName == 'turnOnAutoResponder') {
    turnOnAutoResponder(reason);
    message = 'Turned on vacation settings.';
  } else if (event.action.actionMethodName == 'blockOutCalendar') {
    blockOutCalendar(reason);
    message = 'Blocked out your calendar for the day.';
  } else {
    message = "I'm sorry; I'm not sure which button you clicked.";
  }
  return { text: message };
}

var ONE_DAY_MILLIS = 24 * 60 * 60 * 1000;
/**
 * Turns on the user's vacation response for today in Gmail.
 * @param {string} reason the reason for vacation, either REASON.SICK or REASON.OTHER
 */
function turnOnAutoResponder(reason) {
  var currentTime = (new Date()).getTime();
  Gmail.Users.Settings.updateVacation({
    enableAutoReply: true,
    responseSubject: reason,
    responseBodyHtml: "I'm out of the office today; will be back on the next business day.<br><br><i>Created by Attendance Bot!</i>",
    restrictToContacts: true,
    restrictToDomain: true,
    startTime: currentTime,
    endTime: currentTime + ONE_DAY_MILLIS
  }, 'me');
}

/**
 * Places an all-day meeting on the user's Calendar.
 * @param {string} reason the reason for vacation, either REASON.SICK or REASON.OTHER
 */
function blockOutCalendar(reason) {
  CalendarApp.createAllDayEvent(reason, new Date(), new Date(Date.now() + ONE_DAY_MILLIS));
}

/**
 * Responds to an ADDED_TO_SPACE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
function onAddToSpace(event) {
  var message = "";

  if (event.space.singleUserBotDm) {
    message = "Thank you for adding me to a DM, " + event.user.displayName + "!";
  } else {
    message = "Thank you for adding me to " +
        (event.space.displayName ? event.space.displayName : "this chat");
  }

  if (event.message) {
    // Bot added through @mention.
    message = message + " and you said: \"" + event.message.text + "\"";
  }
   
  console.log('Attendance Bot added in ', event.space.name);

  return { "text": message };
}

/**
 * Responds to a REMOVED_FROM_SPACE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
function onRemoveFromSpace(event) {
  console.info("Bot removed from ",
      (event.space.name ? event.space.name : "this chat"));
}

```

#### Test the bot

1. To retest this bot, return to your direct message chat with the bot in Google Chat, and type any message, such as "Hello".

    The Attendance bot should respond with a **Log your vacation time** card.

    **Note**: The onMessage() event handler parses the event object passed to it by Google Chat to extract the user's original message. You can also get other types of information about the event, including the name of the user that initiated the event, their email address, the name of the room that the event occurred in, and much more.
    {:.notice--info}

    For more information about the structure of the event objects sent by Google Chat, you can refer to the Event formats reference guide.

    **Note**: It can take a few minutes for the progress check below to return a successful completion mark for this task. If not successful, wait a few mins and try again.
    {:.notice--info}

---

### Task 4. React to button clicks in cards

In the previous step, your bot responded to a message from a user—a `MESSAGE` event—with a simple card that contained a [`TextParagragh`](https://developers.google.com/chat/reference/message-formats/cards#textparagraph) widget. In this step, you will create a response that includes buttons, where each button has a custom action defined for it.

#### Interactive cards

Card responses can contain one of two types of buttons: `TextButton` widgets, which display text-only buttons; and `ImageButton` widgets, which display a button with a simple icon or image without text.

Both `TextButton` and `ImageButton` widgets support one of two `onClick` behaviors (as defined in the JSON response sent back to Google Chat): either `openLink` or `action`. As the name implies, `openLink` opens a specified link in a new browser tab.

The `action` object, however, specifies a custom action for the button to perform. You can specify several arbitrary values in the `action` object, including a unique `actionMethodName` and a set of key / value parameter pairs.

Specifying an `action` object for the button creates an [interactive card](https://developers.google.com/chat/how-tos/cards-onclick). When the user clicks the button in the message, Google Chat raises a `CARD_CLICKED` event and sends a request back to the bot that sent the original message. The bot then needs to handle the event raised from Google Chat and return a response back to the space.

#### Add buttons to the card

1. Return to Apps Script, and click **Editor(Editor icon)** in the **Files** panel.
2. In `Code.gs`, remove the `onMessage()` function again by deleting lines 25-44.
3. Copy the following code, and paste at line 25.

    This code creates two buttons, a Set vacation in Gmail and a Block out day in Calendar button in the card sent to Google Chat.

    **Code.gs**

    ```javascript
    var REASON = {
        SICK: 'Out sick',
        OTHER: 'Out of office'
    };

    function onMessage(event) {
        console.info(event);
        var reason = REASON.OTHER;
        var name = event.user.displayName;
        var userMessage = event.message.text;

        if (userMessage.indexOf('sick') > -1) {
            HEADER.header.imageUrl = 'https://goo.gl/mnZ37b';
            reason = REASON.SICK;
        } else if (userMessage.indexOf('vacation') > -1) {
            HEADER.header.imageUrl = 'https://goo.gl/EbgHuc';
        }

        var widgets = [{
            textParagraph: {
            text: 'Hello, ' + name + '.<br>Are you taking time off today?'
            }
        }, {
            buttons: [{
                textButton: {
                    text: 'Set vacation in Gmail',
                    onClick: {
                        action: {
                            actionMethodName: 'turnOnAutoResponder',
                            parameters: [{
                                key: 'reason',
                                value: reason
                            }]
                        }
                    }
                }
            }, {
                textButton: {
                    text: 'Block out day in Calendar',
                    onClick: {
                        action: {
                            actionMethodName: 'blockOutCalendar',
                            parameters: [{
                                key: 'reason',
                                value: reason
                            }]
                        }
                    }
                }
            }]
        }];
        return createCardResponse(widgets);
    }
    ```

4. To handle the `CARD_CLICKED` event, add the `onCardClick()` function to the end of the `Code.gs` file.

    Code.gs

    ```javascript
    function onCardClick(event) {
        console.info(event);
        var message = '';
        var reason = event.action.parameters[0].value;
        if (event.action.actionMethodName == 'turnOnAutoResponder') {
            turnOnAutoResponder(reason);
            message = 'Turned on vacation settings.';
        } else if (event.action.actionMethodName == 'blockOutCalendar') {
            blockOutCalendar(reason);
            message = 'Blocked out your calendar for the day.';
        } else {
            message = "I'm sorry; I'm not sure which button you clicked.";
        }
        return { text: message };
    }
    ```

    In responding to user clicks, now the bot does one of two things: It sets the user's vacation responder in Gmail to an "out of office" message; or it schedules an all-day meeting on the user's Calendar. To accomplish these tasks, the bot calls the [Gmail advanced service](https://developers.google.com/gmail/api/v1/reference/users/settings/updateVacation) and the [Calendar Apps Script API](https://developers.google.com/apps-script/reference/calendar/calendar-app#createEvent(String,Date,Date)).

    ```javascript
    var ONE_DAY_MILLIS = 24 * 60 * 60 * 1000;
    /**
    * Turns on the user's vacation response for today in Gmail.
    * @param {string} reason the reason for vacation, either REASON.SICK or REASON.OTHER
    */
    function turnOnAutoResponder(reason) {
        var currentTime = (new Date()).getTime();
        Gmail.Users.Settings.updateVacation({
            enableAutoReply: true,
            responseSubject: reason,
            responseBodyHtml: "I'm out of the office today; will be back on the next business day.<br><br><i>Created by Attendance Bot!</i>",
            restrictToContacts: true,
            restrictToDomain: true,
            startTime: currentTime,
            endTime: currentTime + ONE_DAY_MILLIS
        }, 'me');
    }

    /**
    * Places an all-day meeting on the user's Calendar.
    * @param {string} reason the reason for vacation, either REASON.SICK or REASON.OTHER
    */
    function blockOutCalendar(reason) {
        CalendarApp.createAllDayEvent(reason, new Date(), new Date(Date.now() + ONE_DAY_MILLIS));
    }
    ```

6. Click **Save project to drive (Save icon)** to save the `Code.gs` file.
7. In the left-side menu, next to **Services**, click **Add a service**, and select **Gmail API** from the list.

8. Click **Add**.

#### Check that the Gmail API is enabled

Make sure that the Gmail Advanced Service is enabled in this project. To check the Gmail API status, do the following:

1. In the **Google Cloud Console**, navigate to **Navigation Menu** (☰) > **APIs & Services** > **Library**.
2. In the Library, search for **Gmail API**. Select the API from the list of results.
3. If the **Gmail API** is not already enabled, click **Enable**.

#### Test the bot

1. Return to the DM in **[Google Chat](https://chat.google.com/)**, and type:  
    
    ```bash
    I'm sick
    ```
    
    The bot should respond with a card similar to the image below that prompts you to configure the bot.

2. To configure the Attendance Bot, click **Configure**, choose your user account, click **ALLOW**, and then close the page when you see the message "*You may close this page now*".
Now the bot displays the available options.

3. Click **SET VACATION IN GMAIL**. You should see the message "*Turned on vacation settings.*"

4. Click **BLOCK OUT DAY IN CALENDAR**. You should see the message "*Blocked out your calendar for the day.*"

5. Click the **Google Apps** icon to access and check **Gmail** and **Calendar** associated with this account.  

    You should see the **Vacation Setting** enabled in Gmail.  


    You should see a day blocked out in the Calendar.  

    **Note:** It can take a few minutes for the progress check below to return a successful completion mark for this task. If not successful, wait a few minutes and try again.
    {:.notice--info}


---

### Congratulations!

You created a bot that responds to user messages, sets their vacation responder in Gmail, and puts an all-day event on their Calendar.































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
