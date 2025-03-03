---
title: | 
        **Secure Software Delivery** <br>
        ![Google Cloud Compute](https://img.shields.io/badge/google--cloud-compute--engine-blue)
        ![Nginx](https://img.shields.io/badge/nginx-web--server-green)
        ![Debian VM](https://img.shields.io/badge/debian-virtual--machine-red)
        ![Node.js](https://img.shields.io/badge/node.js-runtime--environment-brightgreen)
        ![Linux](https://img.shields.io/badge/linux-operating--system-black)

permalink: /docs/gcp/secure-software-delivery/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-03-01T21:36:18-04:00
toc: true

---

---

Lab Course [Link](https://www.cloudskillsboost.google/course_templates/1164/labs/509863)

<hr style="height: 5px; background-color: black; border: none;">

## **1. GETTING DEPLOYMENT WITH BINARY AUTHORIZATION (GSP1183)**

### Overview

Binary Authorization is a deploy-time security control that ensures only trusted container images are deployed on Google Kubernetes Engine (GKE) or Cloud Run. With Binary Authorization, you can require images to be signed by trusted authorities during the development process and then enforce signature validation when deploying. By enforcing validation, you can gain tighter control over your container environment by ensuring only verified images are integrated into the build-and-release process.

The following diagram shows the components in a Binary Authorization/Cloud Build setup:

Cloud Build pipeline that creates a Binary Authorization attestation.

In this pipeline:

1. Code to build the container image is pushed to a source repository, such as [Cloud Source Repositories](https://cloud.google.com/source-repositories/docs).

2. A continuous integration (CI) tool, [Cloud Build](https://cloud.google.com/build/docs) builds and tests the container.

3. The build pushes the container image to [Container Registry](https://cloud.google.com/container-registry/docs) or another registry that stores your built images.

4. [Cloud Key Management Service](https://cloud.google.com/kms/docs), which provides key management for the [cryptographic key pair](https://cloud.google.com/binary-authorization/docs/key-concepts#cryptographic_keys), signs the container image. The resulting signature is then stored in a newly created attestation.

5. At deploy time, the attestor verifies the attestation using the public key from the key pair. [Binary Authorization](https://cloud.google.com/binary-authorization/docs) enforces the [policy](https://cloud.google.com/binary-authorization/docs/key-concepts#policies) by requiring signed [attestations](https://cloud.google.com/binary-authorization/docs/key-concepts#attestations) to deploy the container image.

In this lab you will learn about the tools and techniques to secure deployed artifacts. This lab focuses on artifacts (containers) after they have been created but not deployed to any particular environment.


#### Objectives

In this lab you to do the following:
- Image Signing
- Admission Control Policies
- Signing Scanned Images
- Authorizing Signed Images
- Blocked unsigned Images

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


#### Environment Setup

In Cloud Shell, set your project ID and the project number for your project. Save them as `PROJECT_ID` and `PROJECT_NUMBER` variables.

```bash
export PROJECT_ID=$(gcloud config get-value project)
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID \
    --format='value(projectNumber)')
```

content_copy

#### Enable services

Enable all necessary services:

```bash
gcloud services enable \
  cloudkms.googleapis.com \
  cloudbuild.googleapis.com \
  container.googleapis.com \
  containerregistry.googleapis.com \
  artifactregistry.googleapis.com \
  containerscanning.googleapis.com \
  ondemandscanning.googleapis.com \
  binaryauthorization.googleapis.com
```

### Task 1. Create Artifact Registry repository
---

In this lab you will be using Artifact Registry to store and scan your images.

1. Create the repository with the following command:
    ```bash
    gcloud artifacts repositories create artifact-scanning-repo \
      --repository-format=docker \
      --location="REGION" \
      --description="Docker repository"
    ```

2. Configure docker to utilize your gcloud credentials when accessing Artifact Registry:

    ```bash
    gcloud auth configure-docker "REGION"-docker.pkg.dev
    ```


3. Create and change into a work directory:

    ```bash
    mkdir vuln-scan && cd vuln-scan
    ```

4. Next define a sample image. Create a file called `Dockerfile` with the following contents:

    ```bash
    cat > ./Dockerfile << EOF
    FROM python:3.8-alpine  

    App
    WORKDIR /app
    COPY . ./

    RUN pip3 install Flask==2.1.0
    RUN pip3 install gunicorn==20.1.0
    RUN pip3 install Werkzeug==2.2.2


    CMD exec gunicorn --bind :\$PORT --workers 1 --threads 8 main:app

    EOF
    ```

5. Create a file called `main.py` with the following contents:

    ```bash
    cat > ./main.py << EOF
    import os
    from flask import Flask

    app = Flask(__name__)

    @app.route("/")
    def hello_world():
        name = os.environ.get("NAME", "Worlds")
        return "Hello {}!".format(name)

    if __name__ == "__main__":
        app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
    EOF
    ```

6. Use Cloud Build to build and automatically push your container to Artifact Registry.

    ```bash
    gcloud builds submit . -t "REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image
    ```

### Task 2. Image Signing
---

#### What is an Attestor

- This person/process is responsible for one link in the chain of trust of the system.

- They hold a cryptographic key, and sign an image if it passes their approval process.

- While the Policy Creator determines policy in a high-level, abstract way, the Attestor is responsible for concretely enforcing some aspect of the policy.

- This can be a real person, like a QA tester or a manager, or a bot in a CI system.

- The security of the system depends on their trustworthiness, so it's important that their private keys are kept secure.

Each of these roles can represent an individual person or a team of people in your organization. In a production environment, these roles would likely be managed by separate Google Cloud Platform projects, and access to resources would be shared between them in a limited fashion using [Cloud IAM](https://cloud.google.com/iam/).

![how attestor heirarchy works](Images/Qi8-attestor-heirarchy-works.png)

Attestors in Binary Authorization are implemented on top of the [Cloud Container Analysis API](https://cloud.google.com/container-analysis/api/reference/rest/), so it is important to describe how that works before going forward. The Container Analysis API was designed to allow you to associate metadata with specific container images.

As an example, a Note might be created to track the [Heartbleed](http://heartbleed.com/) vulnerability. Security vendors would then create scanners to test container images for the vulnerability, and create an Occurrence associated with each compromised container.

![208aa5ebc53ff2b3.png](Images/4Z9-208aa5ebc53ff2b3png.png)

Along with tracking vulnerabilities, Container Analysis was designed to be a generic metadata API. Binary Authorization utilizes Container Analysis to associate signatures with the container images they are verifying. A Container Analysis Note is used to represent a single attestor, and Occurrences are created and associated with each container that attestor has approved.

The Binary Authorization API uses the concepts of "attestors" and "attestations", but these are implemented using corresponding Notes and Occurrences in the Container Analysis API.

![container analysis flow chart](Images/uMH-container-analysis-flow-chart.png)

#### Create an Attestor Note

An Attestor Note is simply a small bit of data that acts as a label for the type of signature being applied. For example one note might indicate vulnerability scan, while another might be used for QA sign off. The note will be referred to during the signing process.

![Container Analysis API and Binary Authorization relationship flow chart](Images/4u8-container-analysis-api-binary-authorization.png)

1. Create a note:

    ```bash
    cat > ./vulnz_note.json << EOM
    {
      "attestation": {
        "hint": {
          "human_readable_name": "Container Vulnerabilities attestation authority"
        }
      }
    }
    EOM
    ```

2. Store the note

    ```bash
    NOTE_ID=vulnz_note

    curl -vvv -X POST \
        -H "Content-Type: application/json"  \
        -H "Authorization: Bearer $(gcloud auth print-access-token)"  \
        --data-binary @./vulnz_note.json  \
        "https://containeranalysis.googleapis.com/v1/projects/${PROJECT_ID}/notes/?noteId=${NOTE_ID}"
    ```

3. Verify the note

    ```bash
    curl -vvv  \
        -H "Authorization: Bearer $(gcloud auth print-access-token)" \
        "https://containeranalysis.googleapis.com/v1/projects/${PROJECT_ID}/notes/${NOTE_ID}"
    ```

    Your Note is now saved within the Container Analysis API.

4. Creating an Attestor

    Attestors are used to perform the actual image signing process and will attach an occurrence of the note to the image for later verification. To make use of your attestor, you must also register the note with Binary Authorization:

    ![Attestor is associated with an occurance of a Note](Images/LmV-attestor-associated-occurance-note.png)

5. Create Attestor

    ```bash
    ATTESTOR_ID=vulnz-attestor

    gcloud container binauthz attestors create $ATTESTOR_ID \
        --attestation-authority-note=$NOTE_ID \
        --attestation-authority-note-project=${PROJECT_ID}
    ```

6. Verify Attestor

    ```bash
    gcloud container binauthz attestors list
    ```

    The last line indicates `NUM_PUBLIC_KEYS: 0` you will provide keys in a later step.

    Cloud Build automatically creates the `built-by-cloud-build` attestor in your project when you run a build that generates images. So the above command returns two attestors, `vulnz-attestor` and `built-by-cloud-build`. After images are successfully built, Cloud Build automatically signs and creates attestations for them.

7. The [Binary Authorization](https://cloud.google.com/binary-authorization/docs/overview) service account will need rights to view the attestation notes. Provide the access to the IAM Role with the following API call:

    ```bash
    PROJECT_NUMBER=$(gcloud projects describe "${PROJECT_ID}"  --format="value(projectNumber)")

    BINAUTHZ_SA_EMAIL="service-${PROJECT_NUMBER}@gcp-sa-binaryauthorization.iam.gserviceaccount.com"


    cat > ./iam_request.json << EOM
    {
      'resource': 'projects/${PROJECT_ID}/notes/${NOTE_ID}',
      'policy': {
        'bindings': [
          {
            'role': 'roles/containeranalysis.notes.occurrences.viewer',
            'members': [
              'serviceAccount:${BINAUTHZ_SA_EMAIL}'
            ]
          }
        ]
      }
    }
    EOM
    ```

8. Use the file to create the IAM Policy:

    ```bash
    curl -X POST  \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $(gcloud auth print-access-token)" \
        --data-binary @./iam_request.json \
        "https://containeranalysis.googleapis.com/v1/projects/${PROJECT_ID}/notes/${NOTE_ID}:setIamPolicy"
    ```

### Task 3. Adding a KMS key
---

Before you can use this attestor, your authority needs to create a cryptographic key pair that can be used to sign container images. This can be done through [Google Cloud Key Management Service (KMS)](https://cloud.google.com/kms/).

![diagram of Google Cloud Key Management Service (KMS)](Images/PWz-diagram-google-cloud-key-management-service-kms.png)

1. First, add some environment variables to describe the new key:

    ```bash
    KEY_LOCATION=global
    KEYRING=binauthz-keys
    KEY_NAME=codelab-key
    KEY_VERSION=1
    ```

2. Create a keyring to hold a set of keys:

    ```bash
    gcloud kms keyrings create "${KEYRING}" --location="${KEY_LOCATION}"
    ```

3. Create a new asymmetric signing key pair for the attestor

    ```bash
    gcloud kms keys create "${KEY_NAME}" \
        --keyring="${KEYRING}" --location="${KEY_LOCATION}" \
        --purpose asymmetric-signing   \
        --default-algorithm="ec-sign-p256-sha256"
    ```

    You should see your key appear on the [KMS page](https://console.cloud.google.com/security/kms) of theCloud console.

4. Now, associate the key with your attestor through the gcloud `binauthz` command:

    ```bash
    gcloud beta container binauthz attestors public-keys add  \
        --attestor="${ATTESTOR_ID}"  \
        --keyversion-project="${PROJECT_ID}"  \
        --keyversion-location="${KEY_LOCATION}" \
        --keyversion-keyring="${KEYRING}" \
        --keyversion-key="${KEY_NAME}" \
        --keyversion="${KEY_VERSION}"
    ```

5. If you print the list of authorities again, you should now see a key registered:

    ```bash
    gcloud container binauthz attestors list
    ```

### Task 4. Creating a signed attestation

At this point you have the features configured that enable you to sign images. Use the Attestor you created previously to sign the Container Image you've been working with.

![KMS diagram showing attestation and occurrence connections](Images/xuS-kms-diagram-showing-attestation-occurrence.png)

An attestation must include a cryptographic signature to state that the attestor has verified a particular container image and is safe to run on your cluster.

1. To specify which container image to attest, run the following to determine its digest:

    ```bash
    CONTAINER_PATH="REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image
    ```

    ```bash
    DIGEST=$(gcloud container images describe ${CONTAINER_PATH}:latest \
        --format='get(image_summary.digest)')
    ```

2. Now, you can use gcloud to create your attestation. The command takes in the details of the key you want to use for signing, and the specific container image you want to approve:

    ```bash
    gcloud beta container binauthz attestations sign-and-create  \
        --artifact-url="${CONTAINER_PATH}@${DIGEST}" \
        --attestor="${ATTESTOR_ID}" \
        --attestor-project="${PROJECT_ID}" \
        --keyversion-project="${PROJECT_ID}" \
        --keyversion-location="${KEY_LOCATION}" \
        --keyversion-keyring="${KEYRING}" \
        --keyversion-key="${KEY_NAME}" \
        --keyversion="${KEY_VERSION}"
    ```

    In Container Analysis terms, this will create a new occurrence, and attach it to your attestor's note.

3. To ensure everything worked as expected, run the following to list your attestations:

    ```bash
    gcloud container binauthz attestations list \
      --attestor=$ATTESTOR_ID --attestor-project=${PROJECT_ID}
    ```

### Task 5. Admission control policies

[Binary Authorization](https://cloud.google.com/binary-authorization/docs/set-up-platform) is a feature in GKE and Cloud Run that provides the ability to validate rules before a container image is allowed to run. The validation executes on any request to run an image be it from a trusted CI/CD pipeline or a user manually trying to deploy an image. This capability allows you to secure your runtime environments more effectively than CI/CD pipeline checks alone.

To understand this capability you will modify the default GKE policy to enforce a strict authorization rule.

1. Create the GKE cluster with binary authorization enabled:

    ```bash
    gcloud beta container clusters create binauthz \
        --zone "ZONE"  \
        --binauthz-evaluation-mode=PROJECT_SINGLETON_POLICY_ENFORCE
    ```

2. Allow Cloud Build to deploy to this cluster:

    ```bash
    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
            --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
            --role="roles/container.developer"
    ```

#### Allow All policy

First verify the default policy state and your ability to deploy any image

1. Review existing policy:

    ```bash
    gcloud container binauthz policy export
    ```

2. Notice that the enforcement policy is set to `ALWAYS_ALLOW`

    ```bash
    evaluationMode: ALWAYS_ALLOW
    ```

3. Deploy Sample to verify you can deploy anything:

    ```bash
    kubectl run hello-server --image gcr.io/google-samples/hello-app:1.0 --port 8080
    ```

4. Verify the deploy worked:

    ```bash
    kubectl get pods
    ```

    You will see the following output:

    ![Status Running for hello-server](Images/RGa-status-running-hello-server.png)

5. Delete deployment:

    ```bash
    kubectl delete pod hello-server
    ```

#### Deny All policy

Now update the policy to disallow all images.

1. Export the current policy to an editable file:

    ```bash
    gcloud container binauthz policy export  > policy.yaml
    ```

2. In a text editor, open the `policy.yaml' file and change the `evaluationMode` from `ALWAYS_ALLOW` to `ALWAYS_DENY`:

    ```bash
    edit policy.yaml
    ```

    Ensure the edited policy YAML file appears as follows:

    ```bash
    globalPolicyEvaluationMode: ENABLE
    defaultAdmissionRule:
      evaluationMode: ALWAYS_DENY
      enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
    name: projects/PROJECT_ID/policy
    ```

    This policy is relatively simple. The *[globalPolicyEvaluationMode](https://cloud.google.com/binary-authorization/docs/policy-yaml-reference#globalpolicyevaluationmode)* line declares that this policy extends the global policy defined by Google. This allows all official GKE containers to run by default. Additionally, the policy declares a *[defaultAdmissionRule](https://cloud.google.com/binary-authorization/docs/policy-yaml-reference#defaultadmissionrule)* that states that all [other pods will be rejected](https://cloud.google.com/binary-authorization/docs/policy-yaml-reference#evaluationmode). The admission rule includes an [enforcementMode](https://cloud.google.com/binary-authorization/docs/policy-yaml-reference#enforcementmode) line, which states that all pods that are not conformant to this rule should be blocked from running on the cluster.

    For instructions on how to build more complex policies, look through the [Binary Authorization documentation](https://cloud.google.com/binary-authorization/docs/policy-yaml-reference).

    ![flowchart of binary authorization policy allowing only specified containers](Images/m9K-flowchart-binary-authorization-policy-allowing.png)


3. In Cloud Shell run the following to apply the new policy:

    ```bash
    gcloud container binauthz policy import policy.yaml
    ```

    Wait a few seconds for the change to propagate.

4. Attempt a sample workload deployment:

    ```bash
    kubectl run hello-server --image gcr.io/google-samples/hello-app:1.0 --port 8080
    ```

5. Deployment fails with the following message:

    ```bash
    Error from server (VIOLATES_POLICY): admission webhook "imagepolicywebhook.image-policy.k8s.io" denied the request: Image gcr.io/google-samples/hello-app:1.0 denied by Binary Authorization default admission rule. Denied by always_deny admission rule
    ```

#### Revert the policy to allow all

Before moving on to the next section, revert the policy changes.

1. In a text editor, change the `evaluationMode` from `ALWAYS_DENY` to **ALWAYS_ALLOW**.

    ```bash
    edit policy.yaml
    ```

    The edited policy YAML file should appear as follows:

    ```bash
    globalPolicyEvaluationMode: ENABLE
    
    defaultAdmissionRule:
      evaluationMode: ALWAYS_ALLOW
      enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
    name: projects/PROJECT_ID/policy
    ```

2. Apply the reverted policy:

    ```bash
    gcloud container binauthz policy import policy.yaml
    ```

### **Task 6. Automatically signing images**

You've enabled image signing, and manually used the Attestor to sign your sample image. In practice you will want to apply attestations during automated processes such as CI/CD pipelines.

In this section you will configure [Cloud Build](https://cloud.google.com/binary-authorization/docs/cloud-build) to attest images automatically.

#### Roles needed

1. Add Binary Authorization Attestor Viewer role to Cloud Build Service Account:

    ```bash
    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
      --member serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com \
      --role roles/binaryauthorization.attestorsViewer
    ```

2. Add Cloud KMS CryptoKey Signer/Verifier role to Cloud Build Service Account (KMS-based Signing):

    ```bash
    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
      --member serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com \
      --role roles/cloudkms.signerVerifier
    ```

    ```bash
    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
      --member serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com \
      --role roles/cloudkms.signerVerifier
    ```

3. Add Container Analysis Notes Attacher role to Cloud Build Service Account:

    ```bash
    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
      --member serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com \
      --role roles/containeranalysis.notes.attacher
    ```

#### Provide access for Cloud Build Service Account

Cloud Build will need rights to access the on-demand scanning api.

- Provide access with the following commands:

    ```bash
    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
            --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
            --role="roles/iam.serviceAccountUser"
        
    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
            --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
            --role="roles/ondemandscanning.admin"
    ```

#### Prepare the Custom Build Cloud Build Step

You'll be using a Custom Build step in Cloud Build to simplify the attestation process. Google provides this Custom Build step which contains helper functions to streamline the process. Before use, the code for the custom build step must be built into a container and pushed to Cloud Build.

- To do this, run the following commands:

    ```bash
    git clone https://github.com/GoogleCloudPlatform/cloud-builders-community.git
    cd cloud-builders-community/binauthz-attestation
    gcloud builds submit . --config cloudbuild.yaml
    cd ../..
    rm -rf cloud-builders-community
    ```

### Add a signing step to your `cloudbuild.yaml`

Add the attestation step into your Cloud Build pipeline.

1. Review the signing step below.

    **Review only. Do Not Copy**

    ```bash
    #Sign the image only if the previous severity check passes

    - id: 'create-attestation'
      name: 'gcr.io/${PROJECT_ID}/binauthz-attestation:latest'
      args:
          - --artifact-url
          - '{{{ project_0.default_region | "REGION" }}}-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image'
          - '--attestor'
          - 'projects/${PROJECT_ID}/attestors/$ATTESTOR_ID'
          - '--keyversion'
    'projects/${PROJECT_ID}/locations/$KEY_LOCATION/keyRings/$KEYRING/cryptoKeys/$KEY_NAME/cryptoKeyVersions/$KEY_VERSION'
    ```

2. Write a `cloudbuild.yaml` file with the complete pipeline below:

    ```bash
    cat > ./cloudbuild.yaml << EOF
    steps:

    # build
    - id: "build"
      name: 'gcr.io/cloud-builders/docker
      args: ['build', '-t', '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image'``, ``'.'``]`
      waitFor: ['-']


    # additional CICD checks (not shown)

    # Retag

    - id: "retag"
      name: 'gcr.io/cloud-builders/docker'
      args: ['tag',  '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image', '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image:good']
      



pushing to artifact registry
`- id: ``"push"`

`  name: ``'gcr.io/cloud-builders/docker'`

`  args: [``'push'``,  ``'"REGION"-docker.pkg.dev/``${PROJECT_ID}``/artifact-scanning-repo/sample-image:good'``]`



Sign the image only if the previous severity check passes
`- id: ``'create-attestation'`

`  name: ``'gcr.io/``${PROJECT_ID}``/binauthz-attestation:latest'`

  args:
`    - ``'--artifact-url'`

`    - ``'"REGION"-docker.pkg.dev/``${PROJECT_ID}``/artifact-scanning-repo/sample-image:good'`

`    - ``'--attestor'`

`    - ``'projects/``${PROJECT_ID}``/attestors/``$ATTESTOR_ID``'`

`    - ``'--keyversion'`

`    - ``'projects/``${PROJECT_ID}``/locations/``$KEY_LOCATION``/keyRings/``$KEYRING``/cryptoKeys/``$KEY_NAME``/cryptoKeyVersions/``$KEY_VERSION``'`




images:
`  - ``"REGION"``-docker.pkg.dev/``${PROJECT_ID}``/artifact-scanning-repo/sample-image:good`

EOF
```
Copied!

content_copy

1. Run the build:

```
gcloud builds submit
```
Copied!

content_copy

### Review the build in Cloud Build History

In the Cloud console navigate to **Cloud Build > Build history** page and review that latest build and the successful execution of the build steps.

Click **Check my progress** to verify the objective.

Add a signing step.

Check my progress

## **Task 7. Authorizing signed images**

Now you will update GKE to use Binary Authorization for validating the image has a signature from the Vulnerability scanning before allowing the image to run.

![binary authorization validates trusted and untrusted images](Images/qVJ-binary-authorization-validates-trusted.png)

### Update GKE Policy to Require Attestation

Require images are signed by your Attestor by adding clusterAdmissionRules to your GKE BinAuth Policy

Currently, your cluster is running a policy with one rule: allow containers from official repositories, and reject all others.

1. Overwrite the policy with the updated config using the command below:

`COMPUTE_ZONE``=``"REGION"`

`cat`` ``> binauth_policy.yaml << EOM`

`defaultAdmissionRule``:`

`  ``enforcementMode``: ``ENFORCED_BLOCK_AND_AUDIT_LOG`

`  ``evaluationMode``: ``REQUIRE_ATTESTATION`

`  ``requireAttestationsBy``:`

`  ``-`` ``projects/${PROJECT_ID}/attestors/vulnz-attestor`

`globalPolicyEvaluationMode``: ``ENABLE`

`clusterAdmissionRules``:`

`  ``${COMPUTE_ZONE}.binauthz``:`

`    ``evaluationMode``: ``REQUIRE_ATTESTATION`

`    ``enforcementMode``: ``ENFORCED_BLOCK_AND_AUDIT_LOG`

`    ``requireAttestationsBy``:`

`    ``-`` ``projects/${PROJECT_ID}/attestors/vulnz-attestor`

```
EOM
```
Copied!

content_copy

1. You should now have a new file on disk, called `updated_policy.yaml`. Now, instead of the default rule rejecting all images, it first checks your attestor for verifications.

![allowed containers plus container signed by Attestor is allowed](Images/VUX-allowed-containers-plus-container-signed.png)

1. Upload the new policy to Binary Authorization:

```
gcloud beta container binauthz policy import binauth_policy.yaml
```
Copied!

content_copy

### Deploy a signed image

1. Get the image digest for the good image:

`CONTAINER_PATH``=``"REGION"``-docker.pkg.dev/``${PROJECT_ID}``/artifact-scanning-repo/sample-image`

Copied!

content_copy

```
DIGEST=$(gcloud container images describe ${CONTAINER_PATH}:good \
    --format='get(image_summary.digest)')
```
Copied!

content_copy

1. Use the digest in the Kubernetes configuration:

```
cat > deploy.yaml << EOM
apiVersion: v1
kind: Service
metadata:
  name: deb-httpd
spec:
  selector:
    app: deb-httpd
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deb-httpd
spec:
  replicas: 1
  selector:
    matchLabels:
      app: deb-httpd
  template:
    metadata:
      labels:
        app: deb-httpd
    spec:
      containers:
      - name: deb-httpd
        image: ${CONTAINER_PATH}@${DIGEST}
        ports:
        - containerPort: 8080
        env:
          - name: PORT
            value: "8080"

EOM
```
Copied!

content_copy

1. Deploy the app to GKE

```
kubectl apply -f deploy.yaml
```
Copied!

content_copy

In the Cloud console navigate to **Kubernetes Engine > Workloads** and review the successful deployment of the image.

Click **Check my progress** to verify the objective.

Deploy a signed image.

Check my progress

## **Task 8. Blocked unsigned Images**

### Build an Image

1. Use local docker to build the image to your local cache:

`docker build -t ``"REGION"``-docker.pkg.dev``/${PROJECT_ID}/``artifact-scanning-repo/sample-image:bad .`

Copied!

content_copy

1. Push the unsigned image to the repo:

`docker ``push`` ``"REGION"``-docker.pkg.dev``/${PROJECT_ID}/``artifact-scanning-repo/sample-image:bad`

Copied!

content_copy

1. Get the image digest for the bad image:

`CONTAINER_PATH``=``"REGION"``-docker.pkg.dev/``${PROJECT_ID}``/artifact-scanning-repo/sample-image`

Copied!

content_copy

```
DIGEST=$(gcloud container images describe ${CONTAINER_PATH}:bad \
    --format='get(image_summary.digest)')
```
Copied!

content_copy

1. Use the digest in the Kubernetes configuration:

```
cat > deploy.yaml << EOM
apiVersion: v1
kind: Service
metadata:
  name: deb-httpd
spec:
  selector:
    app: deb-httpd
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deb-httpd
spec:
  replicas: 1
  selector:
    matchLabels:
      app: deb-httpd
  template:
    metadata:
      labels:
        app: deb-httpd
    spec:
      containers:
      - name: deb-httpd
        image: ${CONTAINER_PATH}@${DIGEST}
        ports:
        - containerPort: 8080
        env:
          - name: PORT
            value: "8080"

EOM
```
Copied!

content_copy

1. Attempt to deploy the app to GKE

```
kubectl apply -f deploy.yaml
```
Copied!

content_copy

Review the [workload in the console](https://console.cloud.google.com/kubernetes/workload/overview) and note the error stating the deployment was denied:

`No`` attestations ``found`` that were ``valid`` ``and`` signed ``by`` a key ``trusted`` ``by`` the attestor`

Click **Check my progress** to verify the objective.

Deploy an unsigned image.

Check my progress

## **Congratulations!**

You've learned how to create an Attestor to sign images to validate rules before a container image is allowed to run. You learned how to write a policy to inform Cloud Build to allow or deny access to the GKE cluster, and you have used Binary Authorization with Google Cloud KMS to validate image signatures, and prevent unsigned images access to the Kubernetes cluster.


<hr style="height: 5px; background-color: black; border: none;">

## **2. SECURE BUILDS WITH CLOUD BUILD (GSP1184)**

<hr style="height: 5px; background-color: black; border: none;">

## **3. SECURING CONTAINER BUILDS (GSP1185)**

<hr style="height: 5px; background-color: black; border: none;">

## **4. SECURE SOFTWARE DELIVERY: CHALLENGE LAB (GSP521)**


























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