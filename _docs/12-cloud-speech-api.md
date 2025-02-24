---
title: | 
        **The Basics of Google Cloude Compute** <br>
        ![Google Cloud Compute](https://img.shields.io/badge/google--cloud-compute--engine-blue)
        ![Nginx](https://img.shields.io/badge/nginx-web--server-green)
        ![Debian VM](https://img.shields.io/badge/debian-virtual--machine-red)
        ![Node.js](https://img.shields.io/badge/node.js-runtime--environment-brightgreen)
        ![Linux](https://img.shields.io/badge/linux-operating--system-black)

permalink: /docs/cloud-speech-api/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-02-23T21:36:18-04:00
toc: true
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

### Task 1. Enable the Text-to-Speech API

1. In the **Navigation menu**, click **APIs and Services > Enable APIs and Services**.
2. On the top of the Dashboard, click **+ Enabled APIs and Services**.
3. Enter `text-to-speech` in the search box.
4. Click **Cloud Text-to-Speech API**.
5. Click **Enable** to enable the Cloud Text-to-Speech API.

Wait for a few seconds for the API to be enabled for the project. Once enabled, the **Cloud Text-to-Speech API** page shows details, metrics and more.

---

### Task 2. Create a virtual environment

Python virtual environments are used to isolate package installation from the system.

1. Install the virtualenv environment:

    ```bash
    sudo apt-get install -y virtualenv
    ```

2. Build the virtual environment:

    ```bash
    python3 -m venv venv
    ```

3. Activate the virtual environment:

    ```bash
    source venv/bin/activate
    ```

---
### Task 3. Create a service account

You should use a service account to authenticate your calls to the Text-to-Speech API.

1. To create a service account, run the following command in Cloud Shell:

    ```bash
    gcloud iam service-accounts create tts-qwiklab
    ```

2. Now generate a key to use that service account:

    ```bash
    gcloud iam service-accounts keys create tts-qwiklab.json --iam-account tts-qwiklab@Project ID.iam.gserviceaccount.com
    ```

3. Finally, set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the location of your key file:

    ```bash
    export GOOGLE_APPLICATION_CREDENTIALS=tts-qwiklab.json
    ```

---

### Task 4. Get a list of available voices

As mentioned previously, the Text-to-Speech API provides many different voices and languages that you can use to create audio files. You can use any of the [available voices](https://cloud.google.com/text-to-speech/docs/voices) as the speaker for your content.

**Note:** The Text-to-Speech API includes several premium voices, known as [WaveNet voices](https://cloud.google.com/text-to-speech/docs/wavenet#wavenet_voices), that generate more natural-sounding synthetic speech. These voices are also a bit more expensive than other available voices. Refer to the [Cloud Text-to-Speech pricing page](https://cloud.google.com/text-to-speech/pricing) for more details.
{:.notice--info}

1. The following curl command gets the list of all the voices you can select from when creating synthetic speech using the Text-to-Speech API:

    ```bash
    curl -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
        -H "Content-Type: application/json; charset=utf-8" \
        "https://texttospeech.googleapis.com/v1/voices"
    ```

    The Text-to-Speech API returns a JSON-formatted result that looks similar to the following:

    ```json
    {
    "voices": [
        {
            "languageCodes": [
                "es-ES"
            ],
            "name": "es-ES-Standard-A",
            "ssmlGender": "FEMALE",
            "naturalSampleRateHertz": 24000
        },
        {
            "languageCodes": [
                "ja-JP"
            ],
            "name": "ja-JP-Standard-A",
            "ssmlGender": "FEMALE",
            "naturalSampleRateHertz": 22050
        },
        {
            "languageCodes": [
                "pt-BR"
            ],
            "name": "pt-BR-Standard-A",
            "ssmlGender": "FEMALE",
            "naturalSampleRateHertz": 24000
        },
        ...
    ]
    }
    ```

    Looking at the results from the curl command, notice that each voice has four fields:

      - **name**: The ID of the voice that you provide when you request that voice.
      - **ssmlGender**: The gender of the voice to speak the text, as defined in the [SSML W3 Recommendation](https://www.w3.org/TR/speech-synthesis11/#edef_voice).
      - **naturalSampleRateHertz**: The sampling rate of the voice.
      - **languageCodes**: The list of language codes associated with that voice.

    Also, notice that some languages have several voices to choose from.

2. To scope the results returned from the API to just a single language code, run:

    ```bash
    curl -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
        -H "Content-Type: application/json; charset=utf-8" \
        "https://texttospeech.googleapis.com/v1/voices?language_code=en"
    ```
---

### Task 5. Create synthetic speech from text

Now that you've seen how to get the names of voices to speak your text, it's time to create some synthetic speech!

For this, you build your request to the Text-to-Speech API in a text file titled `synthesize-text.json`.

1. Create this file in Cloud Shell by running the following command:

    ```bash
    touch synthesize-text.json
    ```

2. Using a line editor (for example nano, vim, or emacs) or the Cloud Shell code editor, add the following code to `synthesize-text.json`:

    ```json
    {
        "input":{
            "text":"Cloud Text-to-Speech API allows developers to include
                natural-sounding, synthetic human speech as playable audio in
                their applications. The Text-to-Speech API converts text or
                Speech Synthesis Markup Language (SSML) input into audio data
                like MP3 or LINEAR16 (the encoding used in WAV files)."
        },
        "voice":{
            "languageCode":"en-gb",
            "name":"en-GB-Standard-A",
            "ssmlGender":"FEMALE"
        },
        "audioConfig":{
            "audioEncoding":"MP3"
        }
    }
    ```

3. Save the file and exit the line editor.

    The JSON-formatted request body provides three objects:

      - The **input** object provides the text to translate into synthetic speech.
      - The **voice** object specifies the voice to use for the synthetic speech.
      - The **audioConfig** object tells the Text-to-Speech API what kind of audio encoding to send back.

4. Use the following code to call the Text-to-Speech API using the curl command:

    ```bash
    curl -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
        -H "Content-Type: application/json; charset=utf-8" \
        -d @synthesize-text.json "https://texttospeech.googleapis.com/v1/text:synthesize" \
        > synthesize-text.txt
    ```

    The output of this call is saved to a file called `synthesize-text.txt`.

5. Open the `synthesize-text.txt` file. Notice that the Text-to-Speech API provides the audio output in base64-encoded text assigned to the `audioContent` field, similar to what's shown below:

    ```json
    {
        "audioContent": "//NExAASGoHwABhGudEACdzqFXfRE4EY3AACkD/zX4ADf/6J/[...]"
    }
    ```

    To translate the response into audio, you need to select the audio data it contains and decode it into an audio file - for this lab, MP3. Although there are many ways that you can do this, in this lab you'll use some simple Python code.

6. Create a file named `tts_decode.py`:

    ```bash
    touch tts_decode.py
    ```

7. Using a line editor (for example nano, vim, or emacs) or the Cloud Shell code editor, add the following code into `tts_decode.py`:

    ```python
    import argparse
    from base64 import decodebytes
    import json

    def decode_tts_output(input_file, output_file):
        with open(input_file) as input:
            response = json.load(input)
            audio_data = response['audioContent']

            with open(output_file, "wb") as new_file:
                new_file.write(decodebytes(audio_data.encode('utf-8')))

    if __name__ == '__main__':
        parser = argparse.ArgumentParser(description="Decode output from Cloud Text-to-Speech")
        parser.add_argument('--input', help='The response from the Text-to-Speech API.', required=True)
        parser.add_argument('--output', help='The name of the audio file to create', required=True)
        args = parser.parse_args()
        decode_tts_output(args.input, args.output)
    ```

    Save `tts_decode.py` and exit the line editor.

    Now, to create an audio file from the response you received from the Text-to-Speech API, run the following command from Cloud Shell:

    ```bash
    python tts_decode.py --input "synthesize-text.txt" --output "synthesize-text-audio.mp3"
    ```

    This creates a new MP3 file named `synthesize-text-audio.mp3`.

    Create a new file called `index.html`:

    ```bash
    touch index.html
    ```

    Using a line editor, add the following code into `index.html`:

    ```html
    <html>
        <body>
            <h1>Cloud Text-to-Speech codelab</h1>
            <p>Output from synthesizing text:</p>
            <audio controls>
                <source src="synthesize-text-audio.mp3" />
            </audio>
        </body>
    </html>
    ```

12. Start a simple Python HTTP server:

    ```bash
    python -m http.server 8080
    ```

13. Finally, click **Web Preview**.
14. Click Web Preview and select **Preview on port 8080** to listen to the audio.
    In the new browser window, you should see something like the following:

    ![img1](/assets/images/gcp/gsp222/1.png)

15. Play the audio embedded on the page. You'll hear the synthetic voice speak the text that you provided to it!

16. When you're done listening to the audio files, you can shut down the HTTP server by pressing **CTRL+C** in Cloud Shell.

---

# Task 6. Create synthetic speech from SSML

In addition to using text, you can also provide input to the Text-to-Speech API in the form of [Speech Synthesis Markup Language (SSML)](https://cloud.google.com/text-to-speech/docs/ssml). SSML defines an XML format for representing synthetic speech. Using SSML input, you can more precisely control pauses, emphasis, pronunciation, pitch, speed, and other qualities in the synthetic speech output.

1. First, build your request to the Text-to-Speech API in a text file titled `synthesize-ssml.json`. Create this file in Cloud Shell by running the following command:

    ```bash
    touch synthesize-ssml.json
    ```

2. Using a line editor (for example `nano`, `vim`, or `emacs`) or the Cloud Shell code editor, paste the following JSON into `synthesize-ssml.json`:

    ```json
    {
        "input":{
            "ssml":"<speak><s>
                <emphasis level=\"moderate\">Cloud Text-to-Speech API</emphasis>
                allows developers to include natural-sounding
                <break strength=\"x-weak\"/>
                synthetic human speech as playable audio in their
                applications.</s>
                <s>The Text-to-Speech API converts text or
                <prosody rate=\"slow\">Speech Synthesis Markup Language</prosody>
                <say-as interpret-as=\"characters\">SSML</say-as>
                input into audio data
                like <say-as interpret-as=\"characters\">MP3</say-as> or
                <sub alias=\"linear sixteen\">LINEAR16</sub>
                <break strength=\"weak\"/>
                (the encoding used in
                <sub alias=\"wave\">WAV</sub> files).</s></speak>"
        },
        "voice":{
            "languageCode":"en-gb",
            "name":"en-GB-Standard-A",
            "ssmlGender":"FEMALE"
        },
        "audioConfig":{
            "audioEncoding":"MP3"
        }
    }
    ```

    Notice that the `input` object of the JSON payload includes an `ssml` field instead of a `text` field. The `ssml` field contains XML-formatted content with the `<speak>` element as its root. Each of the elements present in this XML representation of the input affects the output of the synthetic speech.

    Specifically, the elements in this sample have the following effects:

      - `<s>` contains a sentence.
      - `<emphasis>` adds stress on the enclosed word or phrase.
      - `<break>` inserts a pause in the speech.
      - `<prosody>` customizes the pitch, speaking rate, or volume of the enclosed text, as specified by the `rate`, `pitch`, or `volume` attributes.
      - `<say-as>` provides more guidance about how to interpret and then say the enclosed text.
      - `<sub>` specifies a substitution value to speak for the enclosed text.

    **Note:** You can see the full list of SSML elements supported by Cloud Text-to-Speech by reviewing the [SSML reference](https://cloud.google.com/text-to-speech/docs/ssml).
    {:.notice--info}

3. In Cloud Shell, use the following command to call the Text-to-Speech API and save the output to a file called `synthesize-ssml.txt`:

    ```bash
    curl -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \  
        -H "Content-Type: application/json; charset=utf-8" \  
        -d @synthesize-ssml.json "https://texttospeech.googleapis.com/v1/text:synthesize" \  
        > synthesize-ssml.txt
    ```

    Again, you need to decode the output from the Text-to-Speech API before you can hear the audio.

4. Run the following command to generate an audio file named `synthesize-ssml-audio.mp3` using the `tts_decode.py` utility that you created previously:

    ```bash
    python tts_decode.py --input "synthesize-ssml.txt" --output "synthesize-ssml-audio.mp3"
    ```

5. Next, open the `index.html` file that you created earlier. Replace the contents of the file with the following HTML:

    ```html
    <html>
        <body>
            <h1>Cloud Text-to-Speech Demo</h1>
        <p>
        Output from synthesizing text:
        </p>
        <audio controls>
            <source src="synthesize-text-audio.mp3" />
        </audio>
        <p>
        Output from synthesizing SSML:
        </p>
        <audio controls>
            <source src="synthesize-ssml-audio.mp3" />
        </audio>
        </body>
    </html>
    ```

6. Then, start a simple Python HTTP server from the Cloud Shell command prompt:

    ```bash
    python -m http.server 8080
    ```

7. As before, click Web Preview and then select the port number from the displayed menu.
   
    ![img1](/assets/images/gcp/gsp222/2.png)

8. Play the two embedded audio files. Notice the differences in the SSML output: although both audio files say the same words, the SSML output speaks them a bit differently, adding pauses and different pronunciations for abbreviations.

# Task 7. Configure audio output and device profiles

Beyond SSML, you can provide even more customization to your synthetic speech output. You can specify other audio encodings, change the pitch, and optimize the output for specific hardware.

Build your request to the Text-to-Speech API in a text file titled `synthesize-with-settings.json`:

1. Create a file named `synthesize-with-settings.json`:

    ```bash
    touch synthesize-with-settings.json
    ```

2. Paste the following JSON into `synthesize-with-settings.json`:

    ```json
    {
        "input":{
            "text":"The Text-to-Speech API is ideal for any application that plays audio of human speech to users."
        },
        "voice":{
            "languageCode":"en-us",
            "name":"en-GB-Standard-A",
            "ssmlGender":"FEMALE"
        },
        "audioConfig":{
            "speakingRate": 1.15,
            "pitch": -2,
            "audioEncoding":"OGG_OPUS",
            "effectsProfileId": ["headphone-class-device"]
        }
    }
    ```

3. Save the file and exit the line editor.
    
    Looking at this JSON payload, you notice that the audioConfig object contains some additional fields now:

      - The `speakingRate` field specifies a speed at which the speaker says the voice. A value of `1.0` is the normal speed for the voice, `0.5` is half that fast, and `2.0` is twice as fast.
      - The `pitch` field specifies a difference in tone to speak the words. The value here specifies a number of semitones lower (negative) or higher (positive) to speak the words.
      - The `audioEncoding` field specifies the audio encoding to use for the data. The accepted values for this field are `LINEAR16`, `MP3`, and `OGG_OPUS`.
      - The `effectsProfileId` field requests that the Text-to-Speech API optimizes the audio output for a specific playback device. The API applies an predefined audio profile to the output that enhances the audio quality on the specified class of devices.

    **Note:** The Audio Profiles feature is in Beta release status. Review the guide for details about how to use it in your application. All other settings described here are generally available for normal use in your application.
    {:.notice--danger}


4. Call the API using `curl`:

    ```bash
    curl -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \  
        -H "Content-Type: application/json; charset=utf-8" \  
        -d @synthesize-with-settings.json "https://texttospeech.googleapis.com/v1beta1/text:synthesize" \  
        > synthesize-with-settings.txt
    ```

    The output of this call is saved to a file called `synthesize-with-settings.txt`.

5. Run the following command to generate an audio file named `synthesize-with-settings-audio.mp3` from the output received from the Text-to-Speech API:

    ```bash
    python tts_decode.py --input "synthesize-with-settings.txt" --output "synthesize-with-settings-audio.ogg"
    ```

6. Next open the `index.html` file that you created earlier and replace the contents of the file with the following HTML:

    ```html
    <html>
        <body>
            <h1>Cloud Text-to-Speech Demo</h1>
        <p>Output from synthesizing text:</p>
        <audio controls>
            <source src="synthesize-text-audio.mp3" />
        </audio>
        <p>Output from synthesizing SSML:</p>
        <audio controls>
            <source src="synthesize-ssml-audio.mp3" />
        </audio>
        <p>Output with audio settings:</p>
        <audio controls>
            <source src="synthesize-with-settings-audio.ogg" />
        </audio>
        </body>
    </html>
    ```

7. Now, restart the Python HTTP server from the Cloud Shell command prompt:

    ```bash
    python -m http.server 8080
    ```

8. As before, click **Web Preview** then select the port number from the displayed menu.
   
   In the new browser window, you should see something like the following:

   ![img1](/assets/images/gcp/gsp222/3.png)

9. Play the third embedded audio file. Notice that the voice on the audio speaks a bit faster and lower than the previous examples.

---

### Congratulations!

You have learned how to create synthetic speech using the Cloud Text-to-Speech API. You learned about:

- Listing all of the synthetic voices available through the Text-to-Speech API
- Creating a Text-to-Speech API request and calling the API with curl, providing both text and [SSML](https://cloud.google.com/text-to-speech/docs/ssml)
- Configuring the setting for audio output, including specifying a device profile for audio playback

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

### Task 1. Create an API key

Since later in this lab you use `curl` to send a request to the Translation API, you need to generate an API key to pass in your request URL.

1. To create an API key, in the Navigation menu (*Navigation menu icon*), click **APIs & services > Credentials**.

2. Click **+CREATE CREDENTIALS**.
3. In the drop-down menu, select **API key**.
4. Copy the key you just generated.

    Next, save it to an environment variable to avoid having to insert the value of your API key in each request.

5. Run the following in Cloud Shell. Be sure to replace `<your_api_key>` with the key you just copied:

    ```sh
    export API_KEY=YOUR_API_KEY
    ```

---

### Task 2. Translate text

In this example, you translate the string "My name is Steve" into Spanish.

- Pass the text to be translated, along with the API key environment variable, to the Translation API with the following `curl` command:

    ```sh
    TEXT="My%20name%20is%20Steve"
    curl "https://translation.googleapis.com/language/translate/v2?target=es&key=${API_KEY}&q=${TEXT}"
    ```

    Your response should look like this:

    ```json
    {
        "data": {
            "translations": [
                {
                    "translatedText": "Mi nombre es Steve",
                    "detectedSourceLanguage": "en"
                }
            ]
        }
    }
    ```

    In the response, you can see the translated text and the source language that the API detected.

    **Note: Premium Mode** The Google Cloud Translation API uses a standard edition model for most translation tasks. Google has augmented its translation service to use a more robust [Neural Machine Translation System](https://research.googleblog.com/2016/09/a-neural-network-for-machine.html). To learn more about using this premium model, refer to the [Cloud Translation Documentation](https://cloud.google.com/translate/docs).
    {:.notice--info}

---

### Task 3. Detect the language

In addition to translating text, the Translation API can also detect the language of the text. In this example, you detect the language of two strings.

- Pass the text to be examined, along with the API key environment variable, to the Translation API with the following `curl` command:

    ```sh
    TEXT_ONE="Meu%20nome%20é%20Steven"
    TEXT_TWO="日本のグーグルのオフィスは、東京の六本木ヒルズにあります"
    curl -X POST "https://translation.googleapis.com/language/translate/v2/detect?key=${API_KEY}" -d "q=${TEXT_ONE}" -d "q=${TEXT_TWO}"
    ```

    Your response should look like this:

    ```json
    {
        "data": {
            "detections": [
                [
                    {
                        "isReliable": false,
                        "language": "pt",
                        "confidence": 1
                    }
                ],
                [
                    {
                        "language": "ja",
                        "isReliable": false,
                        "confidence": 1
                    }
                ]
            ]
        }
    }
    ```

    The languages returned by this sample are `"pt"` and `"ja"`. These are the **[ISO-639-1](https://en.wikipedia.org/wiki/ISO_639-1)** identifiers for **Portuguese** and **Japanese**. The [list of languages supported by the Translation API](https://cloud.google.com/translate/docs/languages) includes all possible language codes that can be returned.

---

### Congratulations!

You've learned how to translate text with the Cloud Translation API!


---

## **Speech to Text Transcription with the Cloud Speech API (GSP048)** 

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

---

### Task 1: Create an API Key

Since you use `curl` to send a request to the Speech-to-Text API, you need to generate an API key to pass in your request URL.

1. To create an API key, on the **Navigation menu** click **APIs & services > Credentials**.
2. Click **Create credentials** and select **API key**.
3. Copy and record the key you just generated to use later in this lab.
4. Click **Close**.

    Now save your key to an environment variable to avoid having to insert the value of your API key in each request.

5. To perform the next steps, connect to the Linux instance provisioned for you via SSH:

    On the **Navigation menu**, click **Compute Engine > VM Instances**.
    
    Notice the **linux-instance** VM in the VM instances list. VM details are to the right of the VM name.

6. Click **SSH** to the right of the linux-instance VM name.
    An interactive shell opens. Use this to perform the next operations.

7. In the shell (SSH) run the following, replacing `<your_api_key>` with the key you just copied:

    ```sh
    export API_KEY=<YOUR_API_KEY>
    ```

---

### Task 2: Create your API Request

**Note:** This lab uses a pre-recorded file available on Cloud Storage: `gs://cloud-samples-data/speech/brooklyn_bridge.flac`. Before sending it to the Speech-to-Text API, you can [listen to this file](https://storage.cloud.google.com/cloud-samples-data/speech/brooklyn_bridge.flac).

1. Build your request to the API in a `request.json` file:

    ```sh
    touch request.json
    ```

2. Open the file using your preferred command-line editor (`nano`, `vim`, `emacs`) and add the following:

    ```json
    {
        "config": {
            "encoding":"FLAC",
            "languageCode": "en-US"
        },
        "audio": {
            "uri":"gs://cloud-samples-data/speech/brooklyn_bridge.flac"
        }
    }
    ```

3. Save the file as needed.

    The request body has a `config` and `audio` object:

    In `config`, you tell the Speech-to-Text API how to process the request:
     - The `encoding` parameter tells the API which type of audio encoding you're using. `FLAC` is used for `.raw` files.
     - `languageCode` defaults to English if left out of the request.

    There are other parameters you can add to your `config` object, but `encoding` is the only required one.

    In the `audio` object, you pass the API the uri of the audio file, which is stored in Cloud Storage for this lab.

----

### Task 3: Call the Speech-to-Text API

1. Pass your request body, along with the API key environment variable, to the API with the following `curl` command:

    ```sh
    curl -s -X POST -H "Content-Type: application/json" --data-binary @request.json \
    "https://speech.googleapis.com/v1/speech:recognize?key=${API_KEY}" > result.json
    ```

    Your response is stored in a file named `result.json`.

2. To see the contents of the file:

    ```sh
    cat result.json
    ```

    The response should look like this:

    ```json
    {
        "results": [
            {
                "alternatives": [
                    {
                        "transcript": "how old is the Brooklyn Bridge",
                        "confidence": 0.98216057
                    }
                ],
                "resultEndTime": "1.770s",
                "languageCode": "en-us"
            }
        ],
        "totalBilledTime": "15s"
    }
    ```

    The `transcript` value returns the Speech API's text transcription of your audio file, and `confidence` indicates how sure the API is about the transcription accuracy.

    Notice that you called the `syncrecognize` method in our request above. The Speech-to-Text API supports both synchronous and asynchronous speech to text transcription.

    In this example a complete audio file was used, but you can also use the `syncrecognize` method to perform streaming speech to text transcription while the user is still speaking.


---

### Task 4: Speech-to-Text Transcription in Different Languages

The Speech-to-Text API supports transcription in over **100 languages**!

You can change the `languageCode` parameter in `request.json`. A list of supported languages is available in the [Language support guide](https://cloud.google.com/speech-to-text/docs/languages).

Try a **French** audio file - (for a preview, [listen here](https://storage.cloud.google.com/cloud-samples-data/speech/corbeau_renard.flac)):

1. Edit `request.json` and change the content to:

    ```json
    {
        "config": {
            "encoding":"FLAC",
            "languageCode": "fr"
        },
        "audio": {
            "uri":"gs://cloud-samples-data/speech/corbeau_renard.flac"
        }
    }
    ```

2. Call the Speech-to-Text API again:

    ```sh
    curl -s -X POST -H "Content-Type: application/json" --data-binary @request.json \
    "https://speech.googleapis.com/v1/speech:recognize?key=${API_KEY}" > result.json
    ```

    See the results:

    ```sh
    cat result.json
    ```

    You should see the following response:

    ```json
    {
        "results": [
            {
                "alternatives": [
                    {
                        "transcript": "maître corbeau sur un arbre perché Tenait dans son bec un fromage maître Renard par l'odeur alléché lui tint à peu près ce langage et bonjour monsieur du corbeau",
                        "confidence": 0.93855613
                    }
                ],
                "resultEndTime": "12.630s",
                "languageCode": "fr-fr"
            }
        ],
        "totalBilledTime": "15s"
    }
    ```

    This is a sentence from a popular French children’s tale by **Jean de la Fontaine**. You can try adding other audio files in Cloud Storage and changing the `languageCode` parameter in your request.

    **Note:** API restrictions and usage limits on Cloud Speech-to-Text are documented in the [Quotas and limits](https://cloud.google.com/speech-to-text/quotas) resource.
    {:.notice--info}

---

### Congratulations!

You've performed speech-to-text transcription with the Speech API. You passed the API the Cloud Storage URI of your audio file and reviewed the alternative of passing a base64 encoded string of your audio content.


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

----

### Task 1: Create an API Key

1. For this task, you need to create an API key to use in this and other tasks when sending a request to the Speech-to-Text API.

2. Save the API key to use in other tasks.

---

### Task 2: Create Synthetic Speech from Text Using the Text-to-Speech API

1. For this task, connect to the VM instance **`Instance name`** provisioned for you via **SSH**.

2. Activate the virtual environment using the following command:

    ```sh
    source venv/bin/activate
    ```

3. Using a text editor (such as `nano` or `vim`), create a file named `synthesize-text.json` and paste the following into the file:

    ```json
    {
        "input":{
            "text":"Cloud Text-to-Speech API allows developers to include natural-sounding, synthetic human speech as playable audio in their applications. The Text-to-Speech API converts text or Speech Synthesis Markup Language (SSML) input into audio data like MP3 or LINEAR16 (the encoding used in WAV files)."
        },
        "voice":{
            "languageCode":"en-gb",
            "name":"en-GB-Standard-A",
            "ssmlGender":"FEMALE"
        },
        "audioConfig":{
            "audioEncoding":"MP3"
        }
    }
    ```

4. Call the Text-to-Speech API to synthesize the text from the `synthesize-text.json` file and store the result in a file named `synthesize-text.txt`.

5. Using a text editor (such as `nano` or `vim`), create a file named `tts_decode.py` and paste the following code into that file:

    ```python
    import argparse
    from base64 import decodebytes
    import json

    def decode_tts_output(input_file, output_file):
        """ Decode output from Cloud Text-to-Speech. """
        with open(input_file) as input:
            response = json.load(input)
            audio_data = response['audioContent']
            with open(output_file, "wb") as new_file:
                new_file.write(decodebytes(audio_data.encode('utf-8')))

    if __name__ == '__main__':
        parser = argparse.ArgumentParser(description="Decode output from Cloud Text-to-Speech")
        parser.add_argument('--input', help='The response from the Text-to-Speech API.', required=True)
        parser.add_argument('--output', help='The name of the audio file to create', required=True)
        args = parser.parse_args()
        decode_tts_output(args.input, args.output)
    ```

6. Now, to create an audio file using the response you received from the Text-to-Speech API, run the following command from Cloud Shell:

    ```sh
    python tts_decode.py --input "synthesize-text.txt" --output "synthesize-text-audio.mp3"
    ```

    This creates a new MP3 file named `synthesize-text-audio.mp3`.

7. Finally, download the audio file via the **DOWNLOAD FILE** option of the VM instance's SSH session to listen to it.

---

### Task 3: Perform Speech-to-Text Transcription with the Cloud Speech API

**Note:** This lab uses a pre-recorded file available on Cloud Storage: `gs://cloud-samples-data/speech/corbeau_renard.flac`. You can listen to this file.
{:.notice--info}

1. For this task, connect to the VM instance **Instance name** provisioned for you via SSH.

2. Using a text editor (such as `nano` or `vim`), create a file named `request.json` as your API request to transcribe the audio file available at the `gs://cloud-samples-data/speech/corbeau_renard.flac` location to **French**.

3. Call the API request and store the result in a file named `transcription_result.json`.

---

### Task 4: Translate Text with the Cloud Translation API

1. For this task, connect to the VM instance **Instance name** provisioned for you via SSH.

2. Translate the `input_text.txt` sentence to the **English** language by calling the Cloud Translation API and store the result in the `translated_text.json` file.


---

### Task 5: Detect a Language with the Cloud Translation API

1. For this task, connect to the VM instance **Instance name** provisioned for you via SSH.

2. Detect the language of the `unknown_text.txt` sentence by calling the Cloud Translation API and store the result in the `detected_language.json` file.

---

### Congratulations!

You have successfully created synthetic speech from text using the Text-to-Speech API, transcribed speech to text using the Cloud Speech API, as well as translated text and detected a language with the Cloud Translation API.
{:.notice--success}



