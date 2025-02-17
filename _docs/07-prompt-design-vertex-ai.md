---
title: | 
        **Prompt Design in Vertex AI** <br>
        ![Google Cloud](https://img.shields.io/badge/google--cloud-cloud--platform-blue)
        ![Gemini AI](https://img.shields.io/badge/gemini--ai-ai--platform-yellow)
        ![Imagen](https://img.shields.io/badge/imagen-image--generation-orange)
        ![Python](https://img.shields.io/badge/python-programming--language-blue)

permalink: /docs/prompt-design-vertex-ai/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-02-14T21:36:18-04:00
toc: true
---
---
## **1. Generative AI with Vertex AI: Prompt Design**

### Overview
This lab explores prompt engineering and best practices for designing effective prompts to improve the quality of your LLM-generated responses. You'll learn how to craft prompts that are concise, specific, and well-defined, focusing on one task at a time. The lab also covers advanced techniques like turning generative tasks into classification tasks and using examples to enhance response quality. For further exploration, refer to the official documentation on [prompt design](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design).
#### Gemini
[Gemini](https://deepmind.google/technologies/gemini/) is a family of powerful generative AI models developed by Google DeepMind, capable of understanding and generating various forms of content, including text, code, images, audio, and video.

**Gemini API in Vertex AI**
- The Gemini API in Vertex AI provides a unified interface for interacting with Gemini models. This allows developers to easily integrate these powerful AI capabilities into their applications. For the most up-to-date details and specific features of the latest versions, please refer to the official [Gemini documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models#gemini-models).

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

### Objective 
In this lab, you will learn how to:
  - Get started with prompt engineering using the Google Gen AI SDK.
  - Apply best practices for prompt design, including conciseness, specificity, and task definition.
  - Explore various text generation use cases with the Google Gen AI SDK, such as:
    - Ideation
    - Question answering
    - Text classification
    - Text extraction
    - Text summarization

### Setup and Requirements
#### How to start your lab and sign in to the Google Cloud console

**Note**: Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.
{: .notice--danger}

**Note**: Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.
{: .notice--danger}

1. Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
   - The Open Google Cloud console button
   - Time remaining
   - The temporary credentials that you must use for this lab
   - Other information, if needed, to step through this lab

2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser). The lab spins up resources, and then opens another tab that shows the Sign in page.

    > Tip: Arrange the tabs in separate windows, side-by-side.

    **Note**: If you see the **Choose an account** dialog, click **Use Another Account**. 
    {: .notice--info}

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
    {: .notice--info}

    **Note**: Using your own Google Cloud account for this lab may incur extra charges.
    {: .notice--danger}

7. Click through the subsequent pages:
   - Accept the terms and conditions.
   - Do not add recovery options or two-factor authentication (because this is a temporary account).
   - Do not sign up for free trials.

8. After a few moments, the Google Cloud console opens in this tab.
    ![info1](/assets/images/gcp/1.png)

    Note: To access Google Cloud products and services, click the Navigation menu or type the service or product name in the Search field.
    ![info1](/assets/images/gcp/info1.png)
    {: .notice--info}

---
### Task1. Open the notebook in Vertex AI Workbench
1. In the Google Cloud console, on the **Navigation menu** (Navigation menu icon), click **Vertex AI** > **Workbench**.
   ![info1](/assets/images/gcp/2.png)

2. Find the `vertex-ai-jupyterlab` instance and click on the **Open JupyterLab** button.
    ![info1](/assets/images/gcp/3.png) 
    ![info1](/assets/images/gcp/4.png) 

The JupyterLab interface for your Workbench instance opens in a new browser tab.
![info1](/assets/images/gcp/5.png) 

---
### Task2. Setup the notebook
1. Open the `intro_prompt_design` file.
   ![info1](/assets/images/gcp/6.png) 

2. In the **Select Kernel** dialog, choose **Python 3** from the list of available kernels.
   ![info1](/assets/images/gcp/7.png) 

3. Run through the **Getting Started** and the **Import libraries** sections of the notebook.
   - For **Project ID**, use `Project ID`, and for **Location**, use `Region`.
   ![info1](/assets/images/gcp/8.png) 

    **Note**: You can skip any notebook cells that are noted *Colab only*. If you experience a 429 response from any of the notebook cell executions, wait 1 minute before running the cell again to proceed.
    {: .notice--info}

---
### Task3. Prompt Engineering best practices
Prompt engineering is all about how to design your prompts so that the response is what you were indeed hoping to see. The idea of using "unfancy" prompts is to minimize the noise in your prompt to reduce the possibility of the LLM misinterpreting the intent of the prompt. Below are a few guidelines on how to engineer "unfancy" prompts.
```python
%pip install --upgrade --quiet google-genai
import IPython

app = IPython.Application.instance()
app.kernel.do_shutdown(True)

import sys

if "google.colab" in sys.modules:
    from google.colab import auth

    auth.authenticate_user()
    
from IPython.display import Markdown, display
from google import genai
from google.genai.types import GenerateContentConfig
    
import os

PROJECT_ID = "qwiklabs-gcp-00-2d02b388fd77"  # @param {type: "string", placeholder: "[your-project-id]", isTemplate: true}
if not PROJECT_ID or PROJECT_ID == "qwiklabs-gcp-00-2d02b388fd77":
    PROJECT_ID = str(os.environ.get("GOOGLE_CLOUD_PROJECT"))

LOCATION = os.environ.get("GOOGLE_CLOUD_REGION", "us-west1")
client = genai.Client(vertexai=True, project=PROJECT_ID, location=LOCATION)
MODEL_ID = "gemini-2.0-flash-001"  # @param {type: "string"}
```
In this section, you'll cover the following best practices when engineering prompts:
   - Be concise
   - Be specific, and well-defined
   - Ask one task at a time
   - Improve response quality by including examples
   - Turn generative tasks to classification tasks to improve safety

1. Run through the **Be concise** section of the notebook.
    🛑 Not recommended. The prompt below is unnecessarily verbose.
    ```python
    prompt = "What do you think could be a good name for a flower shop that specializes in selling bouquets of dried flowers more than fresh flowers?"

    response = client.models.generate_content(model=MODEL_ID, contents=prompt)
    display(Markdown(response.text))
    ```
    {:.no-copy}

    ✅ Recommended. The prompt below is to the point and concise.
    ```python
    prompt = "Suggest a name for a flower shop that sells bouquets of dried flowers"

    response = client.models.generate_content(model=MODEL_ID, contents=prompt)
    display(Markdown(response.text))
    ```

    ```txt
    Okay, here are some name suggestions for a dried flower shop, playing with different angles like:

    **Emphasizing the Dried/Preserved Nature**:
       - **The Everbloom Studio** (Elegant and suggests longevity)
       - **Preserved Petals** (Simple and descriptive)
       - **Lasting Blooms** (Highlights the lasting quality)
       - **Dried & Darlings** (Cute and alliterative)
       - **The Conservatory Collection** (Evokes a sense of curated beauty)
       - **Amber Flora** (Suggests preservation and a warm color)
       - **The Still Life Florist** (Artsy and sophisticated)
       - **Immortal Blooms** (Dramatic and memorable)
       - **Everlasting Florals** (Direct and clear)
       - **The Dried Stem** (Simple, clean, and modern)

    **Focusing on Beauty and Artistry**:
       - Golden Haze Florals (Ethereal and romantic)
       - Woven Petals (Suggests artistry and craftsmanship)
       - The Botanical Alchemist (Unique and intriguing)
       - Rustic Blooms (Highlights a natural, unfussy style)
       - The Petal Palette (Emphasizes color and artistry)
       - Dried Dreams Florals (Whimsical and dreamy)
       - Artisan Florals (Highlights handmade quality)
       - The Golden Bloom (Simple and evokes beauty)
       - Wildflower Wisp (Playful and natural)

    **Location/Personalized Names**:
       - (Your Name)'s Dried Flowers (Simple and personal)
       - (Town/City Name) Dried Florals (Local and recognizable)
       - Names that incorporate local flora or landmarks

    **Tips for Choosing**:
       - Consider your target audience: Are you aiming for a high-end, artistic crowd or a more casual, rustic vibe?
       - Check for availability: Make sure the name isn't already in use (business name, website domain, social media handles).
       - Say it out loud: Does it sound good and is it easy to remember?
       - Get feedback: Ask friends, family, or potential customers for their opinions.

    Good luck! Let me know if you'd like more suggestions based on a specific style or theme.
    ```
    {:.no-copy .md .notice--info}

2. Run through the **Be specific, and well-defined** section of the notebook.
   Suppose that you want to brainstorm creative ways to describe Earth.
   🛑 The prompt below might be a bit too generic (which is certainly OK if you'd like to ask a generic question!)
    ```python
    prompt = "Tell me about Earth"

    response = client.models.generate_content(model=MODEL_ID, contents=prompt)
    display(Markdown(response.text))
    ```
    {:.no-copy}

    ✅ Recommended. The prompt below is specific and well-defined.
    ```python
    prompt = "Generate a list of ways that makes Earth unique compared to other planets"

    response = client.models.generate_content(model=MODEL_ID, contents=prompt)
    display(Markdown(response.text))
    ```
    ```txt
    Okay, here's a list of ways Earth is unique compared to other planets we know of (as of October 26, 2023). Keep in mind that our understanding of exoplanets is still evolving rapidly, and some of these things may eventually be found elsewhere, but right now, they make Earth stand out:

    **Essential for Life (As We Know It)**:
        - Liquid Water on the Surface: Earth is the only known planet in our solar system, and possibly beyond, with stable bodies of liquid water on its surface. This is crucial for the kinds of life we understand.
        - Oxygen-Rich Atmosphere: While other planets have atmospheres, Earth's atmosphere is uniquely rich in free oxygen (around 21%). This is primarily a byproduct of photosynthesis by plants and other organisms. Most other planetary atmospheres are dominated by carbon dioxide, nitrogen, or hydrogen/helium.
        - Complex and Active Biosphere: Earth teems with life, from microscopic organisms to massive whales. The complexity and diversity of Earth's biosphere are unparalleled in our current knowledge. We haven't found evidence of a biosphere, especially not a complex one, anywhere else.
        - Plate Tectonics: The Earth's surface is divided into plates that move and interact. This process recycles materials, regulates the climate, and helps maintain the conditions suitable for life. While evidence suggests some past tectonic activity on other planets, Earth's ongoing and dynamic plate tectonics are unique.

    **Physical Characteristics & Conditions**:
        - Strong Magnetic Field: Generated by its iron core, Earth's magnetic field deflects harmful solar wind and cosmic radiation. This protects the atmosphere and surface from being stripped away, which is critical for habitability.
        - Just the Right Distance from the Sun: Earth orbits the sun within the "habitable zone" (also called the Goldilocks zone) – the range of distances where liquid water can exist on a planet's surface.
        - Relatively Large Moon: Earth's moon is exceptionally large relative to the planet's size compared to other moons in our solar system. It stabilizes Earth's axial tilt (preventing extreme climate swings) and influences tides.
        - Active Volcanism: Earth is volcanically active, which releases gases from the interior and contributes to the atmosphere. While other planets show evidence of past volcanism, Earth's continuous activity is distinctive.

    **Geological and Chemical Uniqueness**:
        - Presence of Abundant, Complex Organic Molecules: While organic molecules have been found on other celestial bodies, Earth has an extraordinary abundance and diversity of them, forming the building blocks of life.
        - Diverse and Complex Geology: Earth has a wide variety of geological features, including mountains, valleys, canyons, and plains, shaped by various processes over billions of years.
        - Oceans with a Specific Salinity and Chemical Composition: The salt content and chemical makeup of Earth's oceans are unique and crucial for the marine life that thrives there.
        - Continents: The presence of large continental landmasses, composed primarily of lighter, less dense rock, is a distinguishing feature.

    **Other Contributing Factors**:
        - Atmospheric Pressure: Earth has an atmospheric pressure that is conductive for liquid water on the surface of the planet.
        - Axial Tilt: The Earth's axial tilt causes seasons, and is important to have balanced global climate.
        - Dynamo Effect: The Earth's rotation and liquid iron core is what is able to produce the strong magnetic field.

    **Important Considerations**:
        - Observation Bias: Our search for exoplanets is biased toward finding planets that are large and close to their stars. We're only beginning to develop the technology to detect smaller, Earth-like planets in the habitable zones of distant stars.
        - Defining "Uniqueness": As we discover more about exoplanets, some of these features may turn out to be more common than we currently think. However, the combination of all these factors is what makes Earth truly special and, as far as we know, uniquely habitable.

    This list is based on current scientific understanding and is subject to change as our knowledge expands!
    ```
    {:.no-copy .md .notice--info}

3. Run through the **Ask one task at a time** section of the notebook.
    🛑 Not recommended. The prompt below has two parts to the question that could be asked separately.
    ```python
    prompt = "What's the best method of boiling water and why is the sky blue?"

    response = client.models.generate_content(model=MODEL_ID, contents=prompt)
    display(Markdown(response.text))
    ```
    {:.no-copy}

    ✅ Recommended. The prompts below asks one task a time.
    ```python
    prompt = "What's the best method of boiling water?"

    response = client.models.generate_content(model=MODEL_ID, contents=prompt)
    display(Markdown(response.text))
    ```
    ```txt
    # Best Methods for Boiling Water

    There's no single "best" method for boiling water, as the optimal choice depends on several factors:
    - **Speed**: How quickly do you need the water boiled?
    - **Energy efficiency**: How much do you want to minimize energy consumption?
    - **Quantity**: How much water are you boiling?
    - **Fuel source**: What's available (electricity, gas, fire)?
    - **Location**: Are you at home, camping, etc.?

    ## Common Boiling Methods

    ### 1. Electric Kettle

    **Pros**:
    - **Fast**: Generally the fastest for small to medium quantities.
    - **Energy efficient**: More efficient than stovetop methods for smaller amounts.
    - **Convenient**: Automatic shut-off for safety.
    - **Clean**: No open flame or soot.
    - **Precise temperature control**: Some models offer this for specific brewing needs.

    **Cons**:
    - **Requires electricity**: Not suitable for off-grid situations.
    - **Capacity limitations**: Limited by kettle size.

    ---

    ### 2. Stovetop Kettle (Gas or Electric)

    **Pros**:
    - **Versatile**: Works with gas, electric, or induction stoves.
    - **Larger capacity**: Can handle more water than most electric kettles.
    - **Durable**: Long lifespan.
    - **No electricity needed (for gas)**: Useful during power outages.

    **Cons**:
    - **Slower**: Generally slower than electric kettles for small amounts.
    - **Less energy efficient**: Can waste more energy.
    - **Requires monitoring**: No automatic shut-off.
    - **Potentially dangerous**: Open flames on gas stoves pose a risk.

    ---

    ### 3. Microwave

    **Pros**:
    - **Fast**: Faster than a stovetop for small amounts (1-2 cups).
    - **Convenient**: Simple to use.

    **Cons**:
    - **Uneven heating**: Risk of superheated water, which can erupt suddenly.
    - **Potentially dangerous**: Must be handled with care.
    - **Not ideal for large volumes**: Inefficient for boiling large amounts.
    - **Possible taste alteration**: Some believe microwaving affects water taste.

    ---

    ### 4. Over a Campfire/Open Fire

    **Pros**:
    - **Off-grid**: Ideal for camping or emergencies.
    - **No electricity or gas needed**: Uses natural fuel sources.

    **Cons**:
    - **Slowest**: Takes the longest time.
    - **Inconvenient**: Requires firewood, monitoring, and fire safety measures.
    - **Messy**: Pots can get sooty.
    - **Unpredictable**: Hard to control temperature.

    ---

    ### 5. Induction Cooktop

    **Pros**:
    - **Very fast**: Can be as fast as or faster than electric kettles.
    - **Energy efficient**: Transfers heat directly to cookware.
    - **Precise temperature control**: If using a kettle with settings.
    - **Safe**: The cooktop surface stays cooler than a traditional stovetop.

    **Cons**:
    - **Requires induction-compatible cookware**: Not all pots will work.
    - **Requires electricity**: Not suitable for off-grid use.

    ---

    ## Summary Table

    | Method             | Speed     | Energy Efficiency | Quantity   | Convenience  | Location       |
    |-------------------|----------|------------------|------------|-------------|---------------|
    | **Electric Kettle**  | Fastest   | Most Efficient  | Small/Med  | Very High   | Home/Office   |
    | **Stovetop Kettle**  | Moderate  | Moderate        | Med/Large  | High        | Home          |
    | **Microwave**        | Fast (Small) | Least Efficient | Very Small | Very High   | Home/Office   |
    | **Campfire**         | Slowest   | N/A             | Any        | Low         | Outdoors      |
    | **Induction Cooktop** | Fast      | Highly Efficient | Med/Large  | High        | Home          |

    ---

    ## Recommendation

    - **For general home use and speed**: An **electric kettle** is the best choice.
    - **For larger quantities or gas stovetops**: A **stovetop kettle** is preferable.
    - **For small amounts and convenience**: A **microwave** works (with caution).
    - **For camping or off-grid**: An **open fire** is the only option.
    - **For induction users**: If you have an **induction cooktop**, it's an excellent and efficient option.

    ---

    ### ⚠️ Safety Note
    Always exercise caution when boiling water. Be mindful of **hot surfaces** and **steam burns**.

    ```
    {:.no-copy .md .notice--info}

    ```python
    prompt = "Why is the sky blue?"

    response = client.models.generate_content(model=MODEL_ID, contents=prompt)
    display(Markdown(response.text))
    ```
    ```txt
    # Why Is the Sky Blue?

    The sky is blue due to a phenomenon called **Rayleigh scattering**. Here's how it works:

    ## The Science Behind It

   1. **Sunlight Composition**  
    - Sunlight is made up of all the colors of the rainbow.

   2. **Entering the Atmosphere**  
    - When sunlight enters Earth's atmosphere, it collides with air molecules (mostly nitrogen and oxygen).

   3. **Scattering of Light**  
    - This collision causes sunlight to scatter in different directions.

   4. **Rayleigh Scattering**  
    - The amount of scattering depends on the wavelength of light.  
    - **Shorter wavelengths (blue and violet) scatter more** than longer wavelengths (red and orange).  
    - This selective scattering is called **Rayleigh scattering**.

    ## Why Is the Sky Blue and Not Violet?

    Even though **violet light** has a shorter wavelength than blue and should be scattered even more, we see a blue sky because:

    - The **sun emits less violet light** than blue light.
    - Our **eyes are more sensitive** to blue light than violet.

    ### Simple Analogy  
    Imagine throwing a bunch of **tiny balls (sunlight)** at a group of **slightly bigger balls (air molecules)**.  
    - The **smaller blue balls bounce around more easily** than the bigger red balls.  
    - Since the blue balls spread out everywhere, the whole area looks **blue**.

    ---

    # Why Are Sunsets Red or Orange?

    When the sun is **low on the horizon** (during sunrise and sunset), sunlight has to travel through **more of the atmosphere** to reach our eyes. During this longer journey:

    - **Most of the blue light is scattered away** before it reaches us.  
    - **Longer wavelengths (red and orange) scatter less**, so they can travel through the atmosphere and reach our eyes.

    This is why **sunrises and sunsets appear red, orange, or yellow**.

    ```
    {:.no-copy .md .notice--info}

4. Run through the **Watch out for hallucinations** section of the notebook.
    Although LLMs have been trained on a large amount of data, they can generate text containing statements not grounded in truth or reality; these responses from the LLM are often referred to as "hallucinations" due to their limited memorization capabilities. Note that simply prompting the LLM to provide a citation isn't a fix to this problem, as there are instances of LLMs providing false or inaccurate citations. Dealing with hallucinations is a fundamental challenge of LLMs and an ongoing research area, so it is important to be cognizant that LLMs may seem to give you confident, correct-sounding statements that are in fact incorrect.
    Note that if you intend to use LLMs for the creative use cases, hallucinating could actually be quite useful.
    Try the prompt like the one below repeatedly. We set the temperature to 1.0 so that it takes more risks in its choices. It's possible that it may provide an inaccurate, but confident answer.
    ```py
    generation_config = GenerateContentConfig(temperature=1.0)

    prompt = "What day is it today?"

    response = client.models.generate_content(model=MODEL_ID, contents=prompt)
    display(Markdown(response.text))
    ```
    ```txt
    Today is Saturday, November 2, 2024.
    ```
    {:.no-copy .terminal .notice--info}

    Since LLMs do not have access to real-time information without further integrations, you may have noticed it hallucinates what day it is today in some of the outputs

### Task4. Reduce Output Variability
How can you attempt to reduce the chances of irrelevant responses and hallucinations? One way is to provide the LLM with system instructions. In this section, you will see how system instructions works and how you can use them to reduce hallucinations or irrelevant questions for a travel chatbot.

1. Run through the **Using system instructions to guardrail the model from irrelevant responses** section of the notebook.
    How can we attempt to reduce the chances of irrelevant responses and hallucinations?
    One way is to provide the LLM with system instructions.
    Let's see how system instructions works and how you can use them to reduce hallucinations or irrelevant questions for a travel chatbot.
    Suppose we ask a simple question about one of Italy's most famous tourist spots.
    ```python
    generation_config = GenerateContentConfig(temperature=1.0)

    chat = client.chats.create(
        model=MODEL_ID,
        config=GenerateContentConfig(
            system_instruction=[
                "Hello! You are an AI chatbot for a travel web site.",
                "Your mission is to provide helpful queries for travelers.",
                "Remember that before you answer a question, you must check to see if it complies with your mission.",
                "If not, you can say, Sorry I can't answer that question.",
            ]
        ),
    )

    prompt = "What is the best place for sightseeing in Milan, Italy?"

    response = chat.send_message(prompt)
    display(Markdown(response.text))
    ```
    ```txt
    # Top Sightseeing Attractions in Milan  

    Milan offers a wealth of attractions for sightseeing! Here are some of the most popular and highly-regarded places to visit:

    ## 1. **Duomo di Milano (Milan Cathedral)**  
        - A **must-see** iconic Gothic cathedral.  
        - Visitors can **go up to the roof** for stunning city views.

    ## 2. **Galleria Vittorio Emanuele II**  
        - A **beautiful 19th-century shopping arcade** with a glass roof.  
        - Even if you're not shopping, it's worth a stroll.

    ## 3. **Teatro alla Scala**  
        - One of the **most famous opera houses** in the world.  
        - Take a **guided tour** or catch a **live performance** if possible.

    ## 4. **Sforza Castle (Castello Sforzesco)**  
        - A **large historic castle** with several museums inside.  
        - Features **art collections** and **historical artifacts**.

    ## 5. **Pinacoteca di Brera**  
        - A **major art gallery** with an **impressive collection** of Italian paintings.  
        - Includes **masterpieces by Raphael and Caravaggio**.

    ## 6. **Santa Maria delle Grazie**  
        - Home to **Leonardo da Vinci's "The Last Supper"**.  
        - **Reservations are essential** and must be booked in advance.

    ## 7. **Navigli District**  
        - A charming area with **canals, restaurants, bars, and shops**.  
        - Perfect for an **evening stroll or aperitivo**.

    ---

    ## What Kind of Sightseeing Do You Enjoy?  

    To give you more tailored recommendations, consider:  

    - **Interests**: Do you prefer **art, history, architecture**, or something else?  
    - **Budget**: Are you looking for **free activities** or open to **paid attractions**?  
    - **Time**: How much time do you have for sightseeing in Milan?  

    Let me know, and I can help refine your itinerary! 😊  

    ```
    {:.no-copy .markdown .notice--info}

    Now let us pretend to be a user asks the chatbot a question that is unrelated to travel.
    ```python
    prompt = "What is the best place for sightseeing in Milan, Italy?"

    response = chat.send_message(prompt)
    display(Markdown(response.text))
    ```
    ```txt
    # Top Sightseeing Attractions in Milan  

    Milan offers a wealth of attractions for sightseeing! Here are some of the most popular and highly-regarded places to visit:  

    ## 1. **Duomo di Milano (Milan Cathedral)**  
        - A **must-see** iconic Gothic cathedral.  
        - Visitors can **go up to the roof** for stunning city views.  

    ## 2. **Galleria Vittorio Emanuele II**  
        - A **beautiful 19th-century shopping arcade** with a glass roof.  
        - Even if you're not shopping, it's worth a walk through.  

    ## 3. **Teatro alla Scala**  
        - One of the **most famous opera houses** in the world.  
        - Take a **tour** or, if you're lucky, **catch a live performance**.  

    ## 4. **Sforza Castle (Castello Sforzesco)**  
        - A **large historic castle** with several museums inside.  
        - Features **art collections** and **historical artifacts**.  

    ## 5. **Pinacoteca di Brera**  
        - A **major art gallery** with an **impressive collection** of Italian paintings.  
        - Includes **masterpieces by Raphael and Caravaggio**.  

    ## 6. **Santa Maria delle Grazie**  
        - Home to **Leonardo da Vinci's "The Last Supper"**.  
        - **Reservations are essential** and must be booked in advance.  

    ## 7. **Navigli District**  
        - A charming area with **canals, restaurants, bars, and shops**.  
        - Perfect for an **evening stroll or aperitivo**.  

    ---

    ## What Kind of Sightseeing Do You Enjoy?  

    To provide more tailored recommendations, consider:  

    - **Interests**: Do you prefer **art, history, architecture**, or something else?  
    - **Budget**: Are you looking for **free activities** or open to **paid attractions**?  
    - **Time**: How much time do you have for sightseeing in Milan?  

    Let me know, and I can help refine your itinerary! 😊  

    ```
    {:.no-copy .markdown .notice--info}
    You can see that this way, a guardrail in the prompt prevented the chatbot from veering off course.

1. Run through the **Turn generative tasks into classification tasks to reduce output variability** section of the notebook.
    The prompt below results in an open-ended response, useful for brainstorming, but response is highly variable.
    ```python
    prompt = "I'm a high school student. Recommend me a programming activity to improve my skills."

    response = client.models.generate_content(model=MODEL_ID, contents=prompt)
    display(Markdown(response.text))
    ```
    ```txt
    # Programming Activity Recommendations  

    Based on your current skill level (assuming beginner to intermediate), here are some programming activities categorized by difficulty and skills they help improve.  

    ## Beginner-Friendly (Good for Getting Started/Reinforcing Basics)  

    ### **Number Guessing Game**  
    - **Description**: The computer picks a random number, and the user tries to guess it with feedback like "Too high" or "Too low."  
    - **Skills Improved**: Variables, input/output, if/else statements, loops, random number generation.  
    - **Languages**: Python, Java, JavaScript, C++, C#.  
    - **Why it's good**: Simple to understand and easy to expand upon.  

    ### **Simple Calculator**  
    - **Description**: Takes two numbers and an operator (+, -, *, /) as input and performs the calculation.  
    - **Skills Improved**: Input/output, if/else or switch statements, basic arithmetic operations, data types.  
    - **Languages**: Python, Java, JavaScript, C++, C#.  
    - **Why it's good**: Good practice for handling user input and decision-making.  

    ### **Mad Libs Generator**  
    - **Description**: Prompts the user for words (nouns, verbs, adjectives, etc.) and inserts them into a pre-written story template.  
    - **Skills Improved**: String manipulation, input/output, lists or arrays, basic file handling.  
    - **Languages**: Python, JavaScript, Java.  
    - **Why it's good**: Fun and reinforces working with strings and user input.  

    ---

    ## Intermediate (Expanding Knowledge and Solving More Complex Problems)     

    ### **Text-Based Adventure Game**  
    - **Description**: A game where the player navigates through a story by typing commands (e.g., "go north," "take sword").  
    - **Skills Improved**: String parsing, if/else statements, loops, functions, data structures, game logic.  
    - **Languages**: Python, Java, C++, C#.  
    - **Why it's good**: Great for structuring larger programs and handling complex logic.  

    ### **Basic Web Scraper**  
    - **Description**: Fetches data from a website, parses the HTML, and extracts information (e.g., prices, headlines).  
    - **Skills Improved**: Networking, HTML parsing, regular expressions, data manipulation.  
    - **Languages**: Python, Java, JavaScript (Node.js).  
    - **Why it's good**: Introduces web technologies and data extraction.  

    ### **To-Do List Application**  
    - **Description**: A command-line or GUI app that allows users to add, remove, and list tasks.  
    - **Skills Improved**: Data structures, file I/O, user input, GUI programming (optional).  
    - **Languages**: Python, Java, C#, JavaScript (React/Vue.js for web-based version).  
    - **Why it's good**: Introduces building simple applications with data persistence.  

    ---

    ## Advanced (Challenging and Learning More Complex Concepts)  

    ### **Simple Chat Application**  
    - **Description**: Allows two or more users to exchange messages over a network.  
    - **Skills Improved**: Networking (sockets), multi-threading, data serialization, GUI programming.  
    - **Languages**: Python, Java, C++, C#.  
    - **Why it's good**: Covers important networking concepts and real-time communication.  

    ### **Simple Game Engine**  
    - **Description**: A basic framework for creating 2D games, handling graphics, input, game loops, and collision detection.  
    - **Skills Improved**: Object-oriented programming, graphics libraries, game design, linear algebra.  
    - **Languages**: Python, C++, Java.  
    - **Why it's good**: Great for learning software architecture and game development.  

    ### **Machine Learning Project (e.g., Handwritten Digit Recognition)**  
    - **Description**: Uses a library like TensorFlow or scikit-learn to build a model for recognizing handwritten digits.  
    - **Skills Improved**: Machine learning concepts, data analysis, algorithm understanding.  
    - **Languages**: Python.  
    - **Why it's good**: Introduces the exciting field of machine learning.  

    ---

    ## How to Choose a Project  

    - **Interest**: Pick something you enjoy to stay motivated.  
    - **Skill Level**: Start small and gradually increase complexity.  
    - **Time Commitment**: Be realistic about your available time.  
    - **Language**: Choose a familiar language or one you're eager to learn.  
    - **Resources**: Ensure plenty of tutorials and documentation are available.  

    ---

    ## Tips for Success  

    - **Break it Down**: Divide projects into smaller tasks.  
    - **Plan**: Sketch out the program structure before coding.  
    - **Test Regularly**: Catch errors early by testing frequently.  
    - **Use Version Control**: Learn Git (GitHub, GitLab, Bitbucket) for tracking changes.  
    - **Ask for Help**: Use forums, communities, or mentors.  
    - **Document Your Code**: Write comments to explain functionality.  
    - **Be Patient**: Programming takes time—keep learning and practicing.  

    Good luck, and have fun coding! Let me know if you have any questions. 😊  

    ```
    {:.no-copy .markdown .notice--info}

2. Run through the **Classification tasks reduces output variability** section of the notebook.
    The prompt below results in a choice and may be useful if you want the output to be easier to control.
    ```python
    prompt = """I'm a high school student. Which of these activities do you suggest and why:
    a) learn Python
    b) learn JavaScript
    c) learn Fortran
    """

    response = client.models.generate_content(model=MODEL_ID, contents=prompt)
    display(Markdown(response.text))
    ```
    ```txt
    ## My Recommendation: Python, Leaning Toward JavaScript If You Are Very Visually Oriented  

    ### Why Python or JavaScript Are Great Choices:  
    - **High Demand & Versatility**: Both languages are incredibly popular and in high demand in the tech industry. Learning either will give you a significant advantage if you plan to pursue a career in computer science, software development, data science, web development, or related fields.  
    - **Large Community Support**: Both have huge, active communities online. This means you'll find tons of tutorials, documentation, libraries, and forums where you can get help when you're stuck.  
    - **Relatively Easy to Learn (Especially Python for Beginners)**: Both are considered more beginner-friendly than many other languages.  
    - **Wide Range of Applications**: You can do a lot with either language.  

    ---
    ### Breakdown of Each Language:  

    #### **a) Python**  

    **Pros:**  
    - **Beginner-Friendly Syntax**: Python's syntax is designed to be clear, readable, and relatively easy to understand. It reads almost like plain English.  
    - **General-Purpose Language**: Python is used in a huge variety of applications, including:
        - **Data Science/Machine Learning**: It's the dominant language in these fields.  
        - **Web Development (Backend)**: Frameworks like Django and Flask make it easy to build web applications.  
        - **Scripting and Automation**: Automating repetitive tasks.  
        - **Game Development**: While not the primary language for AAA games, it's used for scripting and tools.  
        - **Education**: Used heavily in introductory computer science courses.  
    - **Extensive Libraries**: Python has a vast ecosystem of libraries (pre-written code) that make it easy to perform complex tasks without having to write everything from scratch. Examples include:
        - NumPy and Pandas (for data analysis)  
        - Scikit-learn (for machine learning)  
        - Requests (for making web requests)  
        - Tkinter and PyQT (for GUI development)  
        - Pygame (for game development)  

    **Cons:**  
    - **Can be Slower than Other Languages**: Python is an interpreted language, which can sometimes make it slower than compiled languages like C++ or Java. However, this is often not a major issue for most applications, especially when you're starting out.  
    - **Not Ideal for Complex Front-End Web Development**: While you can do web development with Python, it is not its main forte.  

    **Why It's Good for a High School Student:** Python's easy syntax lets you focus on learning programming concepts rather than getting bogged down in complex language rules. Its versatility means you can explore different areas of computer science to see what you're most interested in.  

    ---
    #### **b) JavaScript**  

    **Pros:**  
    - **Essential for Web Development (Front-End)**: JavaScript is the language of the web browser. It's used to create interactive and dynamic web pages.  
    - **Full-Stack Development (with Node.js)**: With Node.js, you can use JavaScript for both the front-end (what the user sees) and the back-end (server-side logic) of web applications.  
    - **Widely Used Frameworks**: Popular JavaScript frameworks like React, Angular, and Vue.js are used by many companies to build modern web applications.  
    - **Front-End Development is Very Visual**: You will instantly see the output of your code in the browser, which can be very rewarding.  

    **Cons:**  
    - **Can Be More Complex for Beginners (Initially)**: JavaScript's behavior can sometimes be a bit quirky, and understanding asynchronous programming (common in web development) can take some getting used to.  
    - **Security Concerns**: Web browsers can be vulnerable, and it's important to be aware of security best practices when writing JavaScript.  
    - **"Framework Fatigue"**: The JavaScript ecosystem is constantly evolving, and new frameworks and libraries are released frequently. This can be overwhelming for beginners.  

    **Why It's Good for a High School Student:** If you're interested in building websites and web applications, JavaScript is a must-learn. You can create interactive elements, animations, and dynamic content that will bring your websites to life. Plus, you can see the results of your work immediately in the browser.  

    ---
    #### **c) Fortran**  

    **Pros:**  
    - **High Performance for Numerical and Scientific Computing**: Fortran is a specialized language still used in scientific and engineering applications where performance is critical.  

    **Cons:**  
    - **Limited Applications Outside of Specific Domains**: Fortran isn't as versatile as Python or JavaScript. Its use is primarily limited to scientific and engineering computing.  
    - **Steeper Learning Curve**: Fortran can be more challenging to learn than Python or JavaScript, especially for beginners.  
    - **Smaller Community Support**: Compared to Python and JavaScript, the Fortran community is smaller, which means it might be harder to find help when you're stuck.  
    - **Lower Demand**: There are fewer job opportunities for Fortran developers compared to Python or JavaScript developers.  

    **Why It's NOT a Good Choice for a High School Student (Generally):** Unless you already have a strong interest in a specific scientific field that uses Fortran, it's not the best choice for a first programming language. The other two languages are simply more broadly applicable and will open more doors for you.  

    ---
    ### **In Summary:**  
    ✅ If you want a general-purpose language that's easy to learn and has tons of applications (especially data science), **choose Python**.  
    ✅ If you want to build websites and web applications, **choose JavaScript**.  
    🚫 **Avoid Fortran** unless you have a specific reason to learn it related to scientific computing.  

    ### **To Help Me Give You Even Better Advice, Tell Me:**  
    - What are your interests outside of school? (e.g., gaming, web design, data analysis, robotics, science)  
    - What do you see yourself doing in the future? (Even a vague idea is helpful)  
    - Have you tried any coding before?  

    Let me know, and I'll tailor my recommendations even further!
    ```
    {:.no-copy .markdown .notice--info}

---
### Task5. Improve Response Quality by Including Examples
Another way to improve response quality is to add examples in your prompt. The LLM learns in-context from the examples on how to respond. Typically, one to five examples (shots) are enough to improve the quality of responses. Including too many examples can cause the model to over-fit the data and reduce the quality of responses.

Similar to classical model training, the quality and distribution of the examples is very important. Pick examples that are representative of the scenarios that you need the model to learn, and keep the distribution of the examples (e.g. number of examples per class in the case of classification) aligned with your actual distribution.

1. Run through the **Improve response quality by including examples** section of the notebook.
   - **Zero-shot prompt**
    
        ```python
        prompt = """Decide whether a Tweet's sentiment is positive, neutral, or negative.

        Tweet: I loved the new YouTube video you made!
        Sentiment:
        """

        response = client.models.generate_content(model=MODEL_ID, contents=prompt)
        display(Markdown(response.text))
        ```
        ```txt
        Sentiment: Positive
        ```
        {:.no-copy .markdown .notice--info}

   - **One-shot prompt**
  
        ```python
        prompt = """Decide whether a Tweet's sentiment is positive, neutral, or negative.

        Tweet: I loved the new YouTube video you made!
        Sentiment: positive

        Tweet: That was awful. Super boring 😠
        Sentiment:
        """

        response = client.models.generate_content(model=MODEL_ID, contents=prompt)
        display(Markdown(response.text))
        ```
        ```txt
        Sentiment: negative
        ```
        {:.no-copy .terminal .notice--info}

   - **Few-shot prompt**
  
        ```python
        prompt = """Decide whether a Tweet's sentiment is positive, neutral, or negative.

        Tweet: I loved the new YouTube video you made!
        Sentiment: positive

        Tweet: That was awful. Super boring 😠
        Sentiment: negative

        Tweet: Something surprised me about this video - it was actually original. It was not the same old recycled stuff that I always see. Watch it - you will not regret it.
        Sentiment:
        """

        response = client.models.generate_content(model=MODEL_ID, contents=prompt)
        display(Markdown(response.text))
        ```
        ```txt
        Sentiment: positive
        ```
        {:.no-copy .terminal .notice--info}

   - **Choosing between zero-shot, one-shot, few-shot prompting methods**
        Which prompt technique to use will solely depends on your goal. The zero-shot prompts are more open-ended and can give you creative answers, while one-shot and few-shot prompts teach the model how to behave so you can get more predictable answers that are consistent with the examples provided.

### Congratulations!
**Congratulations**! In this lab you learned prompt engineering best practices using Generative AI with Google Gemini. You explored use cases which follow the best practices of being concise, specific, well-define, providing examples and asking one at a time when using LLMs to generate responses.
{: .notice--success}

----

## **2. Get Started with Vertex AI Studio (GSP1154)**

### Overiview
**Vertex AI** is a comprehensive machine learning development platform that provides both **predictive** and **generative AI** capabilities. It allows you to train, evaluate, and deploy predictive machine learning models for forecasting purposes. Additionally, you can utilize the platform to discover, tune, and serve generative AI models to produce content.

[Vertex AI Studio](https://cloud.google.com/generative-ai-studio) lets you quickly test and customize **generative AI models** so you can leverage their capabilities in your applications. It provides a variety of tools and resources including both UI (user interface) and coding examples that make it easy to start with generative AI, even if you don't have a background in machine learning.

This lab guides you through Vertex AI Studio, where you'll unlock the potential of cutting-edge generative AI models. You'll explore Gemini and use it to analyze images, design prompts, and generate conversations directly on the Google Cloud console. No need for API or Python SDKs - it's all accessible through the intuitive user interface.

### Objectives
In this lab, you will learn how to:
- Analyze images with Gemini
- Explore Vertex AI Studio Freeform mode
- Design text prompts for zero-shot, one-shot, and few-shot prompting
- Generate conversations with chat prompts

### Setup and Requirements
#### How to start your lab and sign in to the Google Cloud console

**Note**: Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.
{: .notice--danger}

**Note**: Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.
{: .notice--danger}

1. Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
   - The Open Google Cloud console button
   - Time remaining
   - The temporary credentials that you must use for this lab
   - Other information, if needed, to step through this lab

2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser). The lab spins up resources, and then opens another tab that shows the Sign in page.

    > **Tip**: Arrange the tabs in separate windows, side-by-side.

    **Note**: If you see the **Choose an account** dialog, click **Use Another Account**. 
    {: .notice--info}

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
    {: .notice--info}

    **Note**: Using your own Google Cloud account for this lab may incur extra charges.
    {: .notice--danger}

7. Click through the subsequent pages:
   - Accept the terms and conditions.
   - Do not add recovery options or two-factor authentication (because this is a temporary account).
   - Do not sign up for free trials.

8. After a few moments, the Google Cloud console opens in this tab.
    ![info1](/assets/images/gcp/1.png)

    Note: To access Google Cloud products and services, click the Navigation menu or type the service or product name in the Search field.
    ![info1](/assets/images/gcp/info1.png)
    {: .notice--info}


---
### **Task1. Analyze images with Gemini in Freeform mode**
In this section, you will use Gemini to analyze an image and extract information from it. In Freeform mode, you can design prompts for various tasks such as classification, extraction, and generation. There is no conversation history in Freeform mode, so every prompt is a brand-new request to the model.

#### Enable the Vertex AI API

1. In the Google Cloud console, enter Vertex AI API in the top search bar.
2. Click on the result for Vertex AI API under Marketplace & APIs.
3. Click Enable.
    ![img1](/assets/images/gcp/gsp1154/1.png)

#### Analyze images with Gemini
1. In the Google Cloud console, from the **Navigation menu** (Navigation menu), select **Vertex AI** > **Vertex AI Studio** > **Overview**.
   
    ![img2](/assets/images/gcp/gsp1154/2.png)
2. Under **Generate with Gemini**, click **Open Freeform**.
    The UI contains three main sections:
      - **Prompt** (*located in the center*): Here, you can create a prompt that utilizes multimodal capabilities.
      - **Configuration** (*located on the right*): This section allows you to select models, configure parameters, and obtain the corresponding code.
      - **Response** (*located at the bottom*): This section displays the results of your prompt.
3. On the top left, click **Untitled Prompt** and rename your prompt as Image Analysis.
4. In the **Configuration** section on the top right, click on the **Model** dropdown then select the **`model name`** model.
   
    **Note:** The model name and version may change with the release of new models.
    {: .notice--warning}

5. For **Region**, select `Region`.

6. Download the sample image. **Right-click** the timetable image and then save it to your desktop.
   
    ![img3](/assets/images/gcp/gsp1154/3.png)

7. On the top right of the **Prompt** section, click **Insert media** > **Upload**. Upload the timetable image you downloaded. The media can be in the form of an image, video, text, or audio file.

    ![img4](/assets/images/gcp/gsp1154/4.png) 

8. The image will be displayed inside of the **Prompt** section. Copy the following text and paste it under the image and click on the **Submit** button on the bottom right of the Prompt section.
    ```txt
    Title the image.
    ```
    

    Or be more specific:
    ```txt
    Title the image in 3 words.
    ```
    

    Does the title meet your expectations? Try to modify the prompt to see if you get different results.

9.  Describe the image. Replace the previous prompt with the following and click the **Submit** button.
    ```txt
    Describe the image in detail.
    ```
    

10. Tune the parameter. In the Configuration section, adjust the temperature by scrolling from left (0) to right (2). Resubmit the prompt to observe any changes in the outcome compared to the previous result.

    **Notes:** Temperature controls the degree of randomness in token selection. Lower temperatures are good for prompts that expect a true or correct response, while higher temperatures can lead to more diverse, unexpected, or potentially biased results. With a temperature of 0 the highest probability token is always selected.
    {: .notice--warning}    

11. Extract the text from the image. Replace the previous prompt with the following:
    ```txt
    Read the text in the image.
    ```
    
    Further on, if you want to format the output to a list, replace the previous prompt with the following:
    ```txt
    Parse the time and city in this image into a list with two columns: time and city.
    ```
    
    Your turn - try out some different prompts! How do these results differ from before?

12. Analyze the information on the image. Replace the previous prompt with the following:
    ```txt
    Calculate the percentage of the flights to different continents.
    ```
    
    Does the result meet your expectations? You are highly encouraged to try different prompts for various tasks. You are also encouraged to experiment with different temperature settings to observe the changes in the result.

13. Once you finish the prompt design, save the prompt by clicking **Save** on the top right of the Configuration section. For the region, select **Region** from the dropdown and then confirm by clicking **Save**.

14. To find your saved prompts, on the left-hand navigation menu, navigate to **Prompt Management**.

    **Note**: After selecting **Save**, give the prompts a few seconds to properly save and then proceed further with the lab. Click "Try again" if prompted "failed to update history."
    {: .notice--warning}

---
### **Task2. Explode multimodal capabilities**
In addition to **images**, **text**, and **audio**, Gemini is capable of accepting **videos** as inputs and generating text as an output.
1. Navigate to **Cloud Storage** > **Buckets** and copy the name of your Cloud Storage bucket and save it to use in the further step.
2. Click **Activate Cloud Shell** at the top of the Google Cloud console.
3. In your Cloud Shell terminal, run the command below to copy the sample video `gs://spls/gsp154/video/train.mp4` ([**preview**](https://storage.googleapis.com/spls/gsp154/video/train.mp4)) to your Cloud Storage bucket. Replace `<Your-Cloud-Storage-Bucket>` with the bucket name you copied earlier.
    ```bash
    gcloud storage cp gs://spls/gsp154/video/train.mp4 gs://<Your-Cloud-Storage-Bucket>
    ```

    **Note**: Make sure to replace the `<Your-Cloud-Storage-Bucket>` with your bucket name.
    {: .notice--info}

4. From the **Navigation menu**, select **Vertex AI** > **Vertex AI Studio** > **Overview**.
5. Under **Generate with Gemini**, click **Open Freeform**.
6. In the **Configuration** section on the top right, click on the **Model** dropdown then select the **`model name`** model.
   
    **Note**: The model name and version may change with the release of new models.
    {: .notice--info}

7. For **Region**, select `Region`.

8. Click **Insert Media** > **Import from Cloud Storage**.

9. Click on your bucket name and then click on the sample video i.e., `train.mp4` and click **Select**.
10. Generate information about the video by inserting the following prompt and clicking the **Submit** button.
    
    ```bash
    Title the video.
    ```

Freeform mode offers many capabilities such as writing stories from images, analyzing videos, and generating multimedia ads. Explore more freeform use cases by clicking **Prompt gallery**. Check out more information about [design multimodal prompts](https://cloud.google.com/vertex-ai/docs/generative-ai/multimodal/design-multimodal-prompts).

---
### **Task3. Design text prompts**
In this section, you will explore designing text prompts in Vertex AI Studio. You will explore zero-shot, one-shot, and few-shot prompting.

#### Prompt design

You can feed your desired input text, e.g. a question, to the model. The model will then provide a response based on how you structured your prompt. The process of figuring out and designing the best input text (prompt) to get the desired response back from the model is called **Prompt Design**.

**Prompt design methods**
There are three main methods to design prompts:
    - **Zero-shot prompting** - This is a method where the LLM is given only a prompt that describes the task and no additional data. For example, if you want the LLM to answer a question, you just prompt "what is prompt design?".
    - **One-shot prompting** - This is a method where the LLM is given a single example of the task that it is being asked to perform. For example, if you want the LLM to write a poem, you might give it a single example poem.
    - **Few-shot prompting** - This is a method where the LLM is given a small number of examples of the task that it is being asked to perform. For example, if you want the LLM to write a news article, you might give it a few news articles to read.

**Parameters**
Temperature and Token limit are two important parameters that you can adjust to influence the model's response.
    - **Temperature** controls the randomness in token selection. A lower temperature is good when you expect a true or correct response. A temperature of 0 means the highest probability token is always selected. A higher temperature can lead to diverse, unexpected, or potentially biased results. The model name model has a temperature range of 0 - 2 and a default of 1.
    - **Output token limit** determines the maximum amount of text output from one prompt. A token is approximately four characters.

#### Zero-shot prompting

Try zero-shot prompting in **Free-form** mode.
1. Navigate back to the **Vertex AI Studio** > **Overview** page and click **Open Freeform**.
2. On the top right under **Model**, select the **`model name`** model.

    **Note**: The model name and version may change with the release of new models.
    {: .notice--warning}

3. For **Region**, select `Region`.
4. Copy the following over to the prompt input field:
    ```bash
    What is a prompt gallery?
    ```

5. Click on the **Submit** button.
   
The model will respond to a comprehensive definition of the term prompt gallery.

Here are some exploratory exercises to explore.
   - Adjust the Output Token limit parameter to `1024` and click the **SUBMIT** button.
   - Adjust the Temperature parameter to `0.5` and click the **SUBMIT** button.
   - Adjust the Temperature parameter to `2.0` and click the **SUBMIT** button.

Inspect how the responses change as to change the parameters.

#### One-shot prompting

You can design prompts in more organized ways. You can provide **Context** and **Examples** in their respective input fields. One-shot prompting is a method where the model is given a single example of the task that it is being asked to perform. In this section, you will ask the model to complete a sentence.
1. Start by removing any text from the Prompt box.
2. Inside of the Prompt box, click Add examples. This will open a new window where you can add examples for the prompt.
    ![img5](/assets/images/gcp/gsp1154/5.png) 
3. Add this to the **INPUT** field:
    ```bash
    The color of the grass is
    ```
        
4. Add this to the OUTPUT field:
    ```bash
    The color of the grass is green
    ```

5. Click on the **Add examples** button.
6. In the Test field, copy the following in the Input field.
    
    ```bash
    The color of the sky is
    ```

7. Click on the **Submit** button. You should receive a response from the model similar to the following:
    ```bash
    The color of the sky is blue
    ```
    Instead of completing the sentence, the model gave a full sentence as a response since you provided an example for the model to base its output from. To change the response to simply complete the sentence, you can adjust the example provided in the **OUTPUT** field.

8. Click the Examples button in the Prompt box and change the OUTPUT field to:
    ```bash
    Green
    ```

9. Click on the **Add examples** button.

10. In the **Test** field, copy the following in the **Input** field.
    ```bash
    The color of the sky is
    ```

11. Click on the Submit button. You should receive a response from the model similar to the following:
    ```txt
    blue
    ```
    {: .terminal .notice--info}

    You can see that the model now completes the sentence based on the example you provided. You have successfully influenced the way the model produces response.

#### Few-shot prompting

For the next practice, you will use the model to perform sentiment analysis on a sentence, such as determining whether a movie review is positive or negative using few-shot prompting.

1. In the **Prompt** field, delete your examples from the previous section. To delete your examples, hover over the **Examples** and click the **X** (Remove File) button.
    ![img6](/assets/images/gcp/gsp1154/6.png) 
2. Click the **Add examples** button to add more examples.
   
3. Add the following examples:
    
    | INPUT                           | OUTPUT   |
    |---------------------------------|----------|
    | A well-made and entertaining film | positive |
    | I fell asleep after 10 minutes  | negative |
    | The movie was ok               | neutral  |

4. Once you have added the examples, click on the **Add examples** button.
    ![img7](/assets/images/gcp/gsp1154/7.png) 

5. In the **Test** field, copy the following in the **Input** field.
    ```bash
    It was a time well spent!
    ```

6. Click on the **Submit** button.
    ![img8](/assets/images/gcp/gsp1154/8.png) 

    The model now provides a sentiment for the input text. For the text It was a time well spent!, the sentiment is labeled as positive.

7. Once you finish the prompt design, name the prompt as Sentiment Analysis.


---
### **Task4. Generate conversations**
---
### **Congratulations!**

---
## **3. Getting Started with the Gemini API in Vertex AI (GSP1209)**

### Overview
### Objectives
### Setup and Requirements
---
### **Task1. Open the notebook in Vertex AI Workbench**
---
### **Task2. Setup the notebook**
---
### **Task3. Use the Gemini 1.5 Pro model**
---
### **Task4. Generate text from a multimodal prompt**
---
### **Congratulations**

---
## **4. Prompt Design in Vertex AI: Challenge Lab (GSP519)**

### Overview
### Setup and Requirements
### Challenge Scenario
---
### **Task1. Build a Gemini image analysis tool**
---
### **Task2. Build a Gemini Tagline Generator**
---
### **Task3. Experiment with Image Analysis Code**
---
### **Task4. Experiment with Tagline Generation Code**

### Congratulations!

![congrats](/assets/myimages/congrats.jpg)