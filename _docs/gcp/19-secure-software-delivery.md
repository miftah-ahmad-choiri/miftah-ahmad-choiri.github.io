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
---

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
---

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
---

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

#### Add a signing step to your `cloudbuild.yaml`

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
      args: ['build', '-t', '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image', '.']
      waitFor: ['-']


    # additional CICD checks (not shown)
    # Retag
    - id: "retag"
      name: 'gcr.io/cloud-builders/docker'
      args: ['tag',  '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image', '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image:good']

    # pushing to artifact registry
    - id: "push"
      name: 'gcr.io/cloud-builders/docker'
      args: ['push',  '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image:good']

    # Sign the image only if the previous severity check passes
    - id: 'create-attestation'
      name: 'gcr.io/${PROJECT_ID}/binauthz-attestation:latest'`
      args:
        - '--artifact-url'
        - '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image:good'
        - '--attestor'
        - 'projects/${PROJECT_ID}/attestors/$ATTESTOR_ID'
        - '--keyversion'
        - 'projects/${PROJECT_ID}/locations/$KEY_LOCATION/keyRings/$KEYRING/cryptoKeys/$KEY_NAME/cryptoKeyVersions/$KEY_VERSION'

    images:
      - "REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image:good

    EOF
    ```

3. Run the build:

    ```bash
    gcloud builds submit
    ```

#### Review the build in Cloud Build History

In the Cloud console navigate to **Cloud Build > Build history** page and review that latest build and the successful execution of the build steps.


### **Task 7. Authorizing signed images**
---

Now you will update GKE to use Binary Authorization for validating the image has a signature from the Vulnerability scanning before allowing the image to run.

![binary authorization validates trusted and untrusted images](Images/qVJ-binary-authorization-validates-trusted.png)

#### Update GKE Policy to Require Attestation

Require images are signed by your Attestor by adding clusterAdmissionRules to your GKE BinAuth Policy

Currently, your cluster is running a policy with one rule: allow containers from official repositories, and reject all others.

1. Overwrite the policy with the updated config using the command below:

    ```bash
    COMPUTE_ZONE="REGION"
    cat > binauth_policy.yaml << EOM
    defaultAdmissionRule:
      enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
      evaluationMode: REQUIRE_ATTESTATION
      requireAttestationsBy:
      - projects/${PROJECT_ID}/attestors/vulnz-attestor
    globalPolicyEvaluationMode: ENABLE
    clusterAdmissionRules:
      ${COMPUTE_ZONE}.binauthz:
        evaluationMode: REQUIRE_ATTESTATION
        enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
        requireAttestationsBy:
        - projects/${PROJECT_ID}/attestors/vulnz-attestor
    
    EOM
    ```

2. You should now have a new file on disk, called `updated_policy.yaml`. Now, instead of the default rule rejecting all images, it first checks your attestor for verifications.

    ![allowed containers plus container signed by Attestor is allowed](Images/VUX-allowed-containers-plus-container-signed.png)

3. Upload the new policy to Binary Authorization:

    ```bash
    gcloud beta container binauthz policy import binauth_policy.yaml
    ```

#### Deploy a signed image

1. Get the image digest for the good image:

    ```bash
    CONTAINER_PATH="REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image
    ```
    

    ```bash
    DIGEST=$(gcloud container images describe ${CONTAINER_PATH}:good \
        --format='get(image_summary.digest)')
    ```

2. Use the digest in the Kubernetes configuration:

    ```bash
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

3. Deploy the app to GKE

    ```bash
    kubectl apply -f deploy.yaml
    ```

    In the Cloud console navigate to **Kubernetes Engine > Workloads** and review the successful deployment of the image.


### Task 8. Blocked unsigned Images
---

#### Build an Image

1. Use local docker to build the image to your local cache:

    ```bash
    docker build -t "REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image:bad .
    ```


2. Push the unsigned image to the repo:

    ```bash
    docker push "REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image:bad
    ```

3. Get the image digest for the bad image:

    ```bash
    CONTAINER_PATH="REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image
    ```

    ```bash
    DIGEST=$(gcloud container images describe ${CONTAINER_PATH}:bad \
        --format='get(image_summary.digest)')
    ```

4. Use the digest in the Kubernetes configuration:

    ```bash
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

5. Attempt to deploy the app to GKE

    ```bash
    kubectl apply -f deploy.yaml
    ```

    Review the [workload in the console](https://console.cloud.google.com/kubernetes/workload/overview) and note the error stating the deployment was denied:

    ```bash
    No attestations found that were valid and signed by a key trusted by the attestor
    ```


### Congratulations!
---

You've learned how to create an Attestor to sign images to validate rules before a container image is allowed to run. You learned how to write a policy to inform Cloud Build to allow or deny access to the GKE cluster, and you have used Binary Authorization with Google Cloud KMS to validate image signatures, and prevent unsigned images access to the Kubernetes cluster.


<hr style="height: 5px; background-color: black; border: none;">

## **2. SECURE BUILDS WITH CLOUD BUILD (GSP1184)**

### **Overview**

Software vulnerabilities are weaknesses that can cause an accidental system failure or provide bad actors a means to compromise your software. [Artifact Analysis](https://cloud.google.com/artifact-registry/docs/analysis) provides two kinds of OS scanning to find vulnerabilities in containers:



* The [On-Demand Scanning API](https://cloud.google.com/artifact-analysis/docs/os-scanning-on-demand) allows you to manually scan container images for OS vulnerabilities, either locally on your computer or remotely in Artifact Registry. This gives you granular control over the containers you want to scan for vulnerabilities.
* The [Container Scanning API](https://cloud.google.com/artifact-analysis/docs/os-overview) allows you to automate OS vulnerability detection, scanning each time you push an image to Artifact Registry. You can use On-Demand Scanning to scan images in your CI/CD pipeline before deciding whether to store them in a registry. Enabling this API also enables language package scans for Go and Java vulnerabilities.

In this lab you'll learn how to build and scan for vulnerabilities conainer images stored in Artifact Registry wth Cloud Build.


#### Objectives

In this lab you'll:

* Build Images with Cloud Build
* Use Artifact Registry for Containers
* Utilize automated vulnerability scanning
* Configure On-Demand Scanning
* Add image scanning in CI/CD in Cloud Build

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

### **Task 1. Build images with Cloud Build**
---

In this section you will create an automated build pipeline to build your container image, scan it, then evaluate the results. If no CRITICAL vulnerabilities are found it will push the image to the repository. If CRITICAL vulnerabilities are found the build will fail and exit.

1. Provide access for Cloud Build Service Account:

    ```bash
    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
            --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
            --role="roles/iam.serviceAccountUser"

    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
            --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
            --role="roles/ondemandscanning.admin"
    ```

    Cloud Build will need rights to access the on-demand scanning api. Provide access with the following commands.


2. Create and change into a work directory:

    ```bash
    mkdir vuln-scan && cd vuln-scan
    ```


3. Define a sample image:

    Create a file called Dockerfile with the following contents:


    ```bash
    cat > ./Dockerfile << EOF
    FROM gcr.io/google-appengine/debian10@sha256:d25b680d69e8b386ab189c3ab45e219fededb9f91e1ab51f8e999f3edc40d2a1
    
    # System
    RUN apt update && apt install python3-pip -y

    # App
    WORKDIR /app
    COPY . ./

    RUN pip3 install Flask==1.1.4  
    RUN pip3 install gunicorn==20.1.0  

    CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app

    EOF
    ```

4. Create a file called main.py with the following contents:

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


#### Create the Cloud Build pipeline

You will create a `cloudbuild.yaml` file in your directory that will be used for the automated process. For this lab the steps are limited to the container build process. In practice, however, you would include application specific instructions and tests in addition to the container steps.



1. Create the file with the following command:

    ```bash
    cat > ./cloudbuild.yaml << EOF
    steps:

    # build
    - id: "build"
      name: 'gcr.io/cloud-builders/docker'
      args: ['build', '-t', '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image', '.']
      waitFor: ['-']

    EOF
    ```

2. Run the CI pipeline:

    Submit the build for processing:

    ```bash
    gcloud builds submit
    ```

3. Once the build process has started, in the Cloud console, open the **Cloud Build** dashboard to view the contents.


### **Task 2. Use Artifact Registry for Containers**
---

#### Create Artifact Registry repository

You will be using Artifact Registry to store and scan your images.

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

3. Modify the Cloud Build pipeline to push the resulting image to Artifact Registry:

    ```bash
    cat > ./cloudbuild.yaml << EOF
    steps:

    # build
    - id: "build"
      name: 'gcr.io/cloud-builders/docker'
      args: ['build', '-t', '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image', '.']
      waitFor: ['-']

    # push to artifact registry
    - id: "push"
      name: 'gcr.io/cloud-builders/docker'
      args: ['push',  '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image']

    images:
      - "REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image
    EOF
    ```

4. Run the CI pipeline:

    ```bash
    gcloud builds submit
    ```

### **Task 3. Automated vulnerability scanning**
---

Scanning is triggered automatically every time you push a new image to Artifact Registry. Vulnerability information is continuously updated when new vulnerabilities are discovered.

In this section you'll review the image you just built and pushed to the Artifact Registry and explore the vulnerability results.


#### Review Image Details

Once the build process has completed, review the image and vulnerability results in the Artifact Registry dashboard.

1. In the Cloud console, open **Artifact Registry**.
2. Click on the **artifact-scanning-repo** to view the contents.
3. Click into the image details.
4. Click into the latest digest of your image.
5. Once the scan has finished, click on the **Vulnerabilities** tab for the image.

From the vulnerabilities tab you will see the results of the automatic scanning for the image you just built.

![alt_text](images/image1.png "image_tooltip")

Auto scanning is enabled by default. Explore the Artifact Registry Settings to see how you can turn off/on auto scanning.


### **Task 4. On Demand Scanning**
---

There are various scenarios where you may need to perform a scan before pushing the image to a repository. For example, a container developer may scan an image and fix the issues it finds before pushing code to the source control.

In the example below you will build and analyze the image locally before acting on the results.

1. Use local docker to build the image to your local cache:

    ```bash
    docker build -t "REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image .
    ```

2. Once the image has been built, request a scan of the image:

    ```bash
    gcloud artifacts docker images scan \
        "REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image \
        --format="value(response.scan)" > scan_id.txt
    ```

    The results of the scan are stored in a metadata server. The job completes with a location of the results in the metadata server.


3. Review the output which was stored in the `scan_id.txt` file:

    ```bash
    cat scan_id.txt
    ```
    Notice the report location of the scan results in the metadata server.


4. To view the actual results of the scan, use the `list-vulnerabilities` command on the report location noted in the output file:

    ```bash
    gcloud artifacts docker images list-vulnerabilities $(cat scan_id.txt)
    ```

    The output contains a significant amount of data about all the vulnerabilities in the image Humans rarely use the data stored in the report directly. Typically the results are used by an automated process.


5. Use the commands below to read the report details and log if any CRITICAL vulnerabilities were found:

    ```bash
    export SEVERITY=CRITICAL

    gcloud artifacts docker images list-vulnerabilities $(cat scan_id.txt) --format="value(vulnerability.effectiveSeverity)" | if grep -Fxq ${SEVERITY}; then echo "Failed vulnerability check for ${SEVERITY} level"; else echo "No ${SEVERITY} Vulnerabilities found"; fi
    ```

    The output from this command will be

    ```bash
    Failed vulnerability check for CRITICAL level
    ```

### **Task 5. Use Artifact Scanning in CI/CD in Cloud Build**
---

First, you'll provide Cloud Build rights to access the on-demand scanning api.

1. Provide access with the following commands:

    ```bash
    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
            --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
            --role="roles/iam.serviceAccountUser"

    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
            --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
            --role="roles/ondemandscanning.admin"
    ```


2. Update the Cloud Build pipeline with the following command which creates a `cloudbuild.yaml` file that will be used for the automated process:

    ```bash
    cat > ./cloudbuild.yaml << EOF
    steps:

    # build
    - id: "build"
      name: 'gcr.io/cloud-builders/docker'
      args: ['build', '-t', '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image', '.']
      waitFor: ['-']

    #Run a vulnerability scan at _SECURITY level
    - id: scan
      name: 'gcr.io/cloud-builders/gcloud'
      entrypoint: 'bash'
      args:
      - '-c'
      - |
        (gcloud artifacts docker images scan \
        "REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image \
        --location us \
        --format="value(response.scan)") > /workspace/scan_id.txt

    #Analyze the result of the scan
    - id: severity check
      name: 'gcr.io/cloud-builders/gcloud'
      entrypoint: 'bash'
      args:
      - '-c'
      - |
          gcloud artifacts docker images list-vulnerabilities \$(cat /workspace/scan_id.txt) \
          --format="value(vulnerability.effectiveSeverity)" | if grep -Fxq CRITICAL; \
          then echo "Failed vulnerability check for CRITICAL level" && exit 1; else echo "No CRITICAL vulnerability found, congrats !" && exit 0; fi

    #Retag
    - id: "retag"
      name: 'gcr.io/cloud-builders/docker'
      args: ['tag',  '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image', '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image:good']

    #pushing to artifact registry
    - id: "push"
      name: 'gcr.io/cloud-builders/docker'
      args: ['push',  '"REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image:good']

    images:
      - "REGION"-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image
    EOF
    ```

    For this example the steps are limited to the container build process. In practice you would include application specific instructions and tests in addition to the container steps.

3. Submit the build for processing to verify that the build breaks when a CRITICAL severity vulnerability is found.

    ```bash
    gcloud builds submit
    ```


4. Review Build Failure in the [Cloud Build History](https://console.cloud.google.com/cloud-build/builds) page.


#### Fix the Vulnerability

Update the Dockerfile to use a base image that does not contain CRITICAL vulnerabilities.

1. Overwrite the Dockerfile to use the Debian 10 image with the following command:

    ```bash
    cat > ./Dockerfile << EOF
    FROM python:3.8-alpine 

    # App
    WORKDIR /app
    COPY . ./

    RUN pip3 install Flask==2.1.0
    RUN pip3 install gunicorn==20.1.0
    RUN pip3 install Werkzeug==2.2.2

    CMD exec gunicorn --bind :\$PORT --workers 1 --threads 8 main:app

    EOF
    ```


2. Submit the build for processing to verify that the build will succeed when no CRITICAL severity vulnerabilities are found:

    ```bash
    gcloud builds submit
    ```


3. In the Cloud console, navigate to **Cloud Build > Cloud Build History** to review the build success.


#### Review Scan results

Review the good image in Artifact Registry.

1. Open **Artifact Registry** in the Cloud console.
2. Click on the **artifact-scanning-repo** to view the contents.
3. Click into the image details.
4. Click into the latest digest of your image.
5. Click on the **Vulnerabilities** tab for the image.


### **Congratulations!**
---

You have learned how to build an image with Cloud Build and store the image in Artifact Registry, and seen how Artifact scanning triggers automatically. You also know how to scan images "on-demand" - prior to being pushed to source control.


<hr style="height: 5px; background-color: black; border: none;">

## **3. SECURING CONTAINER BUILDS (GSP1185)**


### **Overview**

Artifact Registry enables you to store different artifact types, create multiple repositories in a single project, and associate a specific region or multi-region with each repository. There are several repository modes. Each mode serves a different purpose. The following diagram shows one of many possible ways you can use repositories in different modes together. The diagram shows a workflow across two Google Cloud projects. In a development project, developers build a Java application. In a separate runtime project, another build creates a container image with the application for deployment to Google Kubernetes Engine.


#### Objectives

In this lab, you learn how to perform the following tasks.

- Use Standard Repositories for deploying your private packages
- Use Remote Repositories to cache maven central packages
- Use Virtual Repositories to combine multiple upstream repos in one config

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


#### Workspace Setup


1. In Cloud Shell, set your project ID and project number. Save them as `PROJECT_ID` and `PROJECT_NUMBER` variables:

    ```bash
    export PROJECT_ID=$(gcloud config get-value project)
    export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
    ```

2. Enable the Artifact Registry API:

    ```bash
    gcloud services enable artifactregistry.googleapis.com
    ```


3. Clone the repo needed for this lab, and then go to the `container-analysis` directory:

    ```bash
    git clone https://github.com/GoogleCloudPlatform/java-docs-samples
    cd java-docs-samples/container-registry/container-analysis
    ```

### **Task 1. Standard repositories**
---

[Standard Repositories](https://cloud.google.com/artifact-registry/docs/repositories/create-repos) provide a way to store your private packages and share them across your other applications

1. Run the following command to create a standard maven repository for Java artifacts:

    ```bash
    gcloud artifacts repositories create container-dev-java-repo \
        --repository-format=maven \
        --location=us-central1 \
        --description="Java package repository for Container Dev Workshop"
    ```

2. In the Cloud Console go to Artifact Registry > Repositories and notice your newly created Maven repository named `container-dev-java-repo`. If you click on it you can see that it's empty at the moment.
3. Review the repo in the terminal:

    ```bash
    gcloud artifacts repositories describe container-dev-java-repo \
        --location=us-central1
    ```

    Should return a response similar to the following

    ```bash
    Encryption: Google-managed key
    Repository Size: 0.000MB
    createTime: '2023-03-21T19:01:45.461589Z'
    description: Java package repository for Container Dev Workshop
    format: MAVEN
    mavenConfig: {}
    mode: STANDARD_REPOSITORY
    name: projects/qwiklabs-gcp-03-4304110dc461/locations/us-central1/repositories/container-dev-java-repo
    updateTime: '2023-03-21T19:01:45.461589Z'
    ```

### **Task 2. Configure Maven for Artifact Registry**
---

1. Run the following command to print the repository configuration to add to your Java project:

    ```bash
    gcloud artifacts print-settings mvn \
        --repository=container-dev-java-repo \
        --location=us-central1
    ```
    
    The previous command returns xml to be added into your projects pom.xml.

      * The **repositories** section specifies where Maven may download remote artifacts for use by the current project.
      * The **distributionManagement** section specifies which remote repository the project will push to when it is deployed.
      * The **extensions** section adds in artifactregistry-maven-wagon which enables the Authentication and transport layer needed for connecting to Artifact Registry
      * Note: Extensions can exist in pom.xml or extensions.xml. In cases where the project depends on a parent project, those dependencies are accessed before the rest of the entries in the pom.xml are loaded. To ensure the parent has access to the extension, it can be placed in an extensions.xml file which is loaded before the pom.xml thus making it available for the parent dependencies.

2. Run the following command in Cloud Shell to open the Editor in the current directory:

    ```bash
    cloudshell workspace .
    ```

3. Copy the three sections then open the `pom.xml` in Cloud Shell Editor and add the returned settings to the bottom of the file just inside the closing `project` tag.

    Example: (your project names will be different in your URLs)


    ```bash
     ...

      <distributionManagement>
        <snapshotRepository>
          <id>artifact-registry</id>
          <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
        </snapshotRepository>
        <repository>
          <id>artifact-registry</id>
          <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
        </repository>
      </distributionManagement>

      <repositories>
        <repository>
          <id>artifact-registry</id>
          <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
          <releases>
            <enabled>true</enabled>
          </releases>
          <snapshots>
            <enabled>true</enabled>
          </snapshots>
        </repository>
      </repositories>

      <build>
        <extensions>
          <extension>
            <groupId>com.google.cloud.artifactregistry</groupId>
            <artifactId>artifactregistry-maven-wagon</artifactId>
            <version>2.2.0</version>
          </extension>
        </extensions>
      </build>

    </project>
    ```

    With Artifact Registry configured in Maven, you can now use Artifact Registry to store Java jars for use by other projects in your organization.


1. Run the following command to upload your Java package to Artifact Registry:

    ```bash
    mvn deploy -DskipTests
    ```


    If you want to run this command again, make sure to increase the version in the pom.xml.


2. In the Cloud console go to **Artifact Registry > Repositories**. Click into `container-dev-java-repo` and check that the `hello-world` binary artifact is there:

![alt_text](images/image1.png "image_tooltip")

### **Task 3. Remote repositories**
---

[Remote Repositories](https://cloud.google.com/artifact-registry/docs/repositories/remote-repo) provide the ability to cache third party packages for increased reliability and security.

1. Run the following command to create a remote repository for Maven Central artifacts:

    ```bash
    gcloud artifacts repositories create maven-central-cache \
        --project=$PROJECT_ID \
        --repository-format=maven \
        --location=us-central1 \
        --description="Remote repository for Maven Central caching" \
        --mode=remote-repository \
        --remote-repo-config-desc="Maven Central" \
        --remote-mvn-repo=MAVEN-CENTRAL
    ```

2. In the Cloud console go to **Artifact Registry > Repositories**. Click into `maven-central-cache` and notice it's been created and is currently empty.

3. Review the repo in the terminal:

    ```bash
    gcloud artifacts repositories describe maven-central-cache \
        --location=us-central1
    ```

4. Run the following command to print the repository configuration to add to your Java project:

    ```bash
    gcloud artifacts print-settings mvn \
        --repository=maven-central-cache \
        --location=us-central1
    ```

5. Add the repository section into your pom.xml. Be sure not to copy the outer &lt;repositories> tag from the output.
6. Change the ID of the newly added repository to "central" to ensure each repository entry has a unique ID.

    Example: (your project names will be different in your URLs)

    ```bash
    ...

      <distributionManagement>
        <snapshotRepository>
          <id>artifact-registry</id>
          <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
        </snapshotRepository>
        <repository>
          <id>artifact-registry</id>
          <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
        </repository>
      </distributionManagement>

      <repositories>
        <repository>
          <id>artifact-registry</id>
          <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
          <releases>
            <enabled>true</enabled>
          </releases>
          <snapshots>
            <enabled>true</enabled>
          </snapshots>
        </repository>

        <repository>
          <id>central</id>
          <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/maven-central-cache</url>
          <releases>
            <enabled>true</enabled>
          </releases>
          <snapshots>
            <enabled>true</enabled>
          </snapshots>
        </repository>

      </repositories>

      <build>
        <extensions>
          <extension>
            <groupId>com.google.cloud.artifactregistry</groupId>
            <artifactId>artifactregistry-maven-wagon</artifactId>
            <version>2.2.0</version>
          </extension>
        </extensions>
      </build>

    </project>
    ```

7. Run the following commands in your terminal to create an `extensions.xml` for your project, To use the [core extensions](https://maven.apache.org/docs/3.3.1/release-notes.html) mechanism ensuring Maven can resolve parent or plugin dependencies from Artifact Registry.

    ```bash
    mkdir .mvn 
    cat > .mvn/extensions.xml << EOF
    <extensions xmlns="http://maven.apache.org/EXTENSIONS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://maven.apache.org/EXTENSIONS/1.0.0 http://maven.apache.org/xsd/core-extensions-1.0.0.xsd">
      <extension>
        <groupId>com.google.cloud.artifactregistry</groupId>
        <artifactId>artifactregistry-maven-wagon</artifactId>
        <version>2.2.0</version>
      </extension>
    </extensions>
    EOF
    ```

8. Run the following command to compile your application using the Remote Repository:

    ```bash
    rm -rf ~/.m2/repository 
    mvn compile
    ```

9. In the Cloud console go to **Artifact Registry > Repositories**. Click into `maven-central-cache` and check that the binary artifacts cached there:

![alt_text](images/image2.png "image_tooltip")


### **Task 4. Virtual repositories**
---

[Virtual Repositories](https://cloud.google.com/artifact-registry/docs/repositories/virtual-repo) act as an interface for multiple repositories to be accessed through a single configuration. This simplifies client configuration for consumers of your artifacts and increases security by mitigating [dependency confusion attacks](https://cloud.google.com/software-supply-chain-security/docs/dependencies#public-dependencies).

1. Create a policy file

    ```bash
    cat > ./policy.json << EOF
    [
      {
        "id": "private",
        "repository": "projects/${PROJECT_ID}/locations/us-central1/repositories/container-dev-java-repo",
        "priority": 100
      },
      {
        "id": "central",
        "repository": "projects/${PROJECT_ID}/locations/us-central1/repositories/maven-central-cache",
        "priority": 80
      }
    ]

    EOF
    ```


2. Create the virtual repository


    ```bash
    gcloud artifacts repositories create virtual-maven-repo \
        --project=${PROJECT_ID} \
        --repository-format=maven \
        --mode=virtual-repository \
        --location=us-central1 \
        --description="Virtual Maven Repo" \
        --upstream-policy-file=./policy.json
    ```

3. Run the following command to print the repository configuration to add to your Java project:

    ```bash
    gcloud artifacts print-settings mvn \
        --repository=virtual-maven-repo \
        --location=us-central1
    ```

4. Replace the entire repositories section in your pom with the one virtual repositories section from the output.

    Example: (your project names will be different in your URLs)

    ```bash
    ...

      <distributionManagement>
        <snapshotRepository>
          <id>artifact-registry</id>
          <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
        </snapshotRepository>
        <repository>
          <id>artifact-registry</id>
          <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
        </repository>
      </distributionManagement>

      <repositories>
        <repository>
          <id>artifact-registry</id>
          <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/virtual-maven-repo</url>
          <releases>
            <enabled>true</enabled>
          </releases>
          <snapshots>
            <enabled>true</enabled>
          </snapshots>
        </repository>
      </repositories>

      <build>
        <extensions>
          <extension>
            <groupId>com.google.cloud.artifactregistry</groupId>
            <artifactId>artifactregistry-maven-wagon</artifactId>
            <version>2.2.0</version>
          </extension>
        </extensions>
      </build>

    </project>
    ```


#### Pull dependencies from the Virtual Repository

Since the Virtual repository is a pass through and won't store any actual packages, to clearly demonstrate the process you'll delete the maven-central-cache repo you created earlier and recreate it, to start again with an empty repository

1. Run the following commands to recreate the cache repository

    ```bash
    gcloud artifacts repositories delete maven-central-cache \
        --project=$PROJECT_ID \
        --location=us-central1 \
        --quiet

    gcloud artifacts repositories create maven-central-cache \
        --project=$PROJECT_ID \
        --repository-format=maven \
        --location=us-central1 \
        --description="Remote repository for Maven Central caching" \
        --mode=remote-repository \
        --remote-repo-config-desc="Maven Central" \
        --remote-mvn-repo=MAVEN-CENTRAL
    ```


2. You can review the empty repo in the console. **Cloud console > Artifact Registry > Repositories**
3. Now exercise the virtual repository by building your project with the following command:

    ```bash
    rm -rf ~/.m2/repository 
    mvn compile
    ```

4. Review the packages in the console. **Cloud Console > Artifact Registry > Repositories**. Click into `maven-central-cache` and check that the binary artifacts were configured to pull from the virtual repo but were ultimately pulled from the `maven-central-cache`.


![alt_text](images/image3.png "image_tooltip")



### **Congratulations!**
---

You've learned how to use several repository modes and the various purposes those repositories serve.


<hr style="height: 5px; background-color: black; border: none;">

## **4. SECURE SOFTWARE DELIVERY: CHALLENGE LAB (GSP521)**

### **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Secure Software Delivery](https://www.cloudskillsboost.google/) course. Are you ready for the challenge?


### **Challenge Scenario**

You are a software engineer at Cymbal Bank, tasked with securely deploying a new web application to the cloud. The application handles sensitive customer data, so security is paramount. Your goal is to implement a robust, automated pipeline that builds, scans, signs, and deploys the containerized application while adhering to strict security standards. For this challenge, you will use Google Cloud services such as Artifact Registry, Binary Authorization, and Cloud Build to achieve this objective on a sample application.


#### Topics tested

* **Create Artifact Registry Repositories:** Set up Artifact Registry repositories to store Docker images for scanning and production.
* **Push Docker Images:** Build and push Docker images to Artifact Registry via Cloud Build for vulnerability scanning.
* **Set up Binary Authorization:** Configure Binary Authorization with attestors and keys to enforce image signing policies.
* **View Vulnerability Scans:** Examine vulnerability scan results within Artifact Registry to identify and understand potential security risks.
* **Create a Secure CI/CD Pipeline:** Build a Cloud Build pipeline that automates image building, vulnerability scanning, and image signing.
* **Review and Fix:** Analyze a failed build due to critical vulnerabilities and rectify the issues in the application code.
* **Rebuild and Deploy:** Re-run the CI/CD pipeline with the fixed code and ensure successful deployment to Cloud Run.


### **Setup and requirements**

#### Before you click the Start Lab button

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.
{:.notice--info}

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.
{:.notice--info}

### **Task 1. Enable APIs and set up the environment**
---

Before you can start building your secure CI/CD pipeline, you need to enable the necessary Google Cloud APIs and set up your development environment. This will ensure that you have access to all the required services and tools.

1. Enable the required APIs for this lab:

    ```bash
    gcloud services enable \
      cloudkms.googleapis.com \
      run.googleapis.com \
      cloudbuild.googleapis.com \
      container.googleapis.com \
      containerregistry.googleapis.com \
      artifactregistry.googleapis.com \
      containerscanning.googleapis.com \
      ondemandscanning.googleapis.com \
      binaryauthorization.googleapis.com
    ```

2. In Cloud Shell, run the following command to download the sample Python, Docker, and Cloud Build files:

    ```bash
    mkdir sample-app && cd sample-app
    gcloud storage cp gs://spls/gsp521/* .
    ```


3. Create two Artifact Registry repositories: one for scanning and one for production. Name the repositories `artifact-scanning-repo` and `artifact-prod-repo`, respectively.

    The scanning repository will be used to store the Docker image before it is scanned for vulnerabilities, while the production repository will store the image after it has been signed and is ready for deployment.


### **Task 2. Create the Cloud Build pipeline**
---

In this task, you'll lay the foundation for your CI/CD pipeline by creating a basic Cloud Build configuration to build and push your Docker image to Artifact Registry. This initial step will enable you to scan the image for vulnerabilities later in the lab.

1. Start by adding the following roles to the **Cloud Build service account**:
    * `roles/iam.serviceAccountUser`
    * `roles/ondemandscanning.admin`
2. In the **Cloud Shell Editor**, open the `sample-app/cloudbuild.yaml` file.
3. **Complete TODOs:** Fill out the image name placeholders (`&lt;image-name>`). For this, you will need to reference the `artifact-scanning-repo` repository, and the image name should be `sample-image`. Make sure to use the region `REGION`.
4. Submit the build.
5. Check out the image you pushed to the `artifact-scanning-repo` repository and verify you can see a number of **Critical** vulnerabilities in the scan results.


### **Task 3. Set up Binary Authorization**
---

To enforce strict security policies for container deployments, you'll leverage Binary Authorization. This service allows you to define who can deploy what images, and under which conditions. In this task, you'll create and configure the necessary components of Binary Authorization, including attestors, notes, and KMS keys. This will prepare you to integrate Binary Authorization into your CI/CD pipeline.


#### Create an Attestor

1. In Cloud Shell, create a JSON file. This file will define an Attestor note containing the attestation hint. The attestation hint's `human_readable_name` should be set to "Container Vulnerabilities attestation authority".
2. Use the Container Analysis API to create a new note with the ID `vulnerability_note`. The note's details should be defined in the note file you created in the previous step. Make sure to include proper authentication and set the appropriate Content-Type header in your API request.
3. Use the Container Analysis API to retrieve the details of the Attestor note you just created. Make sure to include proper authentication in your API request.
4. Use the `gcloud` command-line tool to create a new Binary Authorization Attestor. The Attestor ID should be **vulnerability-attestor**, and it should be associated with the Attestor note you created earlier.
5. Use the `gcloud` command-line tool to list all existing Binary Authorization Attestors. Verify that the Attestor you just created is included in the list.
6. Construct an IAM policy that grants the Binary Authorization service account the `roles/containeranalysis.notes.occurrences.viewer` role on the Attestor note you created. Then, use the Container Analysis API to set this IAM policy on the note.


#### Generate a KMS Pair

In this section, you will generate a KMS key pair to sign attestations.

1. Set up Key Management:
    * Create a KMS keyring named `binauthz-keys` in the `global` location to store the keys.
    * Within this keyring, generate a new asymmetric signing key pair. Name this key `lab-key` and make sure it's **version 1**.
2. Link Key to Attestor:
    * Use the `gcloud` command-line tool to associate the `lab-key` (**version 1**) with your Binary Authorization Attestor. Make sure to specify the `global` location and the `binauthz-keys` keyring when referencing the key.


#### Update the Binary Authorization Policy

1. **Modify the Policy**: Adjust the Binary Authorization policy to enforce the requirement for attestations for the default rule.
2. **Incorporate Your Attestor**: Include the `vulnerability-attestor` you previously created as part of the policy configuration.


### **Task 4. Create a Cloud Build CI/CD pipeline with vulnerability scanning**
---

Building upon the basic pipeline from Task 2, you'll now enhance it with crucial security features. This includes vulnerability scanning to identify potential weaknesses in your container images and image signing to ensure their integrity. In this task, you will integrate vulnerability scanning and image signing into your CI/CD pipeline, making it more robust and secure.


#### Add the required roles to the Cloud Build service account

1. Grant the Cloud Build service account the following IAM roles in your project:
    * `roles/binaryauthorization.attestorsViewer`
    * `roles/cloudkms.signerVerifier`
    * `roles/containeranalysis.notes.attacher`
    * `roles/iam.serviceAccountUser`
    * `roles/ondemandscanning.admin`
2. Additionally, ensure that the Compute Engine default service account also has the `cloudkms.signerVerifier` role.


#### Install the Custom Build step

1. You'll be using a Custom Build step in Cloud Build to simplify the attestation process. Google provides this Custom Build step which contains helper functions to streamline the process. Before use, the code for the custom build step must be built into a container and pushed to Cloud Build. To do this, run the following command:

    ```bash
    git clone https://github.com/GoogleCloudPlatform/cloud-builders-community.git
    cd cloud-builders-community/binauthz-attestation
    gcloud builds submit . --config cloudbuild.yaml
    cd ../..
    rm -rf cloud-builders-community
    ```


#### Update the Cloud Build pipeline

In this section, you will complete the Cloud Build pipeline to include vulnerability scanning, severity checks, image signing, and deployment to Cloud Run. The code provided below is a partial implementation of the pipeline. You will need to fill in the missing parts to complete the pipeline.

1. **Complete TODOs:** Fill in the missing parts of the pipeline, including:
    * Specifying the image location in Artifact Registry for vulnerability scanning. Note that you want to scan the image in the `artifact-scanning-repo` repository.
    * Setting the appropriate severity level for vulnerability checks. The pipeline should fail if any `CRITICAL` vulnerabilities are found.
    * Configuring the image signing step with the correct attestor and KMS key information. The attestor name is `vulnerability-attestor`, and the key version is the full path to the `lab-key` version 1.
    * Retagging the image for production and pushing it to the production repository. You should use the `artifact-prod-repo` repository for this purpose.
    * Deploying the image to Cloud Run. You will use the production image from the `artifact-prod-repo` repository for this step.

    **Note:** you have already filled out the first few TODOs in the `cloudbuild.yaml` file in the second task of this lab. Make sure to replace the rest of the placeholders with the correct values for the remaining TODOs.
    {:notice--info}


    **cloudbuild.yaml**

    ```bash
    steps:

    # TODO: #1. Build Step. Replace the <image-name> placeholder with the correct value.
    - id: "build"
      name: 'gcr.io/cloud-builders/docker'
      args: ['build', '-t', '<image-name>', '.']
      waitFor: ['-']

    # TODO: #2. Push to Artifact Registry. Replace the <image-name> placeholder with the correct value.
    - id: "push"
      name: 'gcr.io/cloud-builders/docker'
      args: ['push',  '<image-name>']

    # TODO: #3. Run a vulnerability scan. Replace the <image-name> placeholder with the correct value.
    - id: scan
      name: 'gcr.io/cloud-builders/gcloud'
      entrypoint: 'bash'
      args:
        - '-c'
        - |
            (gcloud artifacts docker images scan \
            <image-name> \
            --location us \
            --format="value(response.scan)") > /workspace/scan_id.txt

    # TODO: #4. Analyze the result of the scan. IF CRITICAL vulnerabilities are found, fail the build. 
    # Replace the <correct vulnerability> placeholders with the correct values. Case sensitive!
    - id: severity check
      name: 'gcr.io/cloud-builders/gcloud'
      entrypoint: 'bash'
      args:
        - '-c'
        - |
            gcloud artifacts docker images list-vulnerabilities $(cat /workspace/scan_id.txt) \
            --format="value(vulnerability.effectiveSeverity)" | if grep -Fxq <correct vulnerability>; \
            then echo "Failed vulnerability check for <correct vulnerability> level" && exit 1; else echo \
            "No <correct vulnerability> vulnerability found, congrats !" && exit 0; fi

    # TODO: #5. Sign the image only if the previous severity check passes. 
    # Replace the placeholders with the correct values: <image-name>, <attestor-name>, and <key-version>.
    # Note the <key-version> should be the **full** path to the key version.
    - id: 'create-attestation'
      name: 'gcr.io/${PROJECT_ID}/binauthz-attestation:latest'
      args:
        - '--artifact-url'
        - '<image-name>'
        - '--attestor'
        - '<attestor-name>'
        - '--keyversion'
        - '<key-version>'

    # TODO: #6. Re-tag the image for production and push it to the production repository using the latest tag. 
    # Replace the <image-name> and <production-image-name> placeholders with the correct values.
    - id: "push-to-prod"
      name: 'gcr.io/cloud-builders/docker'
      args: 
        - 'tag' 
        - '<image-name>'
        - '<production-image-name>'
    - id: "push-to-prod-final"
      name: 'gcr.io/cloud-builders/docker'
      args: ['push', '<production-image-name>']

    # TODO: #7. Deploy to Cloud Run. Replace the <image-name> and <your-region> placeholders with the correct values.
    - id: 'deploy-to-cloud-run'
      name: 'gcr.io/cloud-builders/gcloud'
      entrypoint: 'bash'
      args:
        - '-c'
        - |
          gcloud run deploy auth-service --image=<image-name> \
          --binary-authorization=default --region=<your-region> --allow-unauthenticated

    # TODO: #8. Replace <image-name> placeholder with the value from the build step.
    images:
      - <image-name>
    ```

2. **Trigger the Build**:
    * Submit the Cloud Build configuration you created to initiate the build process.
    * Pay attention to the region you're working in when submitting the build.
3. **Observe the Build Failure**:
    * Navigate to the Cloud Build History page in the Google Cloud Console.
    * Look for the build you just triggered and examine its status.
    * Confirm that the build fails due to the presence of a `CRITICAL` severity vulnerability.

    **Note:** your build is supposed fail due to a `CRITICAL` severity vulnerability. You will address this issue in the next task.
    {:.notice--info}


### **Task 5. Fix the vulnerability and redeploy the CI/CD pipeline**
---

In a real-world scenario, vulnerability scans often reveal issues that need to be addressed. This task simulates such a scenario, where your build fails due to a critical vulnerability. In this task, you will analyze the build failure, identify the vulnerability, and fix it by updating your application's dependencies. You will then re-trigger the Cloud Build pipeline to ensure the build completes successfully without any critical vulnerabilities.

1. **Update the Dockerfile:** Modify your Dockerfile to use the `python:3.8-alpine` base image. Update the `Flask`, `Gunicorn`, and `Werkzeug` dependencies to the following versions:
    * Flask: `3.0.3`
    * Gunicorn: `23.0.0`
    * Werkzeug: `3.0.4`
2. **Re-trigger the Build**: Submit your updated Cloud Build configuration to initiate a new build.
3. **Verify Build Success**: Check the Cloud Build History page to confirm that the build completes successfully without any `CRITICAL` vulnerability issues.
4. For testing purposes, run the following command to allow unauthenticated access to the Cloud Run service so you can validate the deployment. Replace `&lt;your-region>` with the region where you deployed the service.

    ```bash
    gcloud beta run services add-iam-policy-binding --region=<your-region> --member=allUsers --role=roles/run.invoker auth-service
    ```

    **Note:** this command is for testing purposes only and should not be used in a production environment!
    {:.notice--info}

5. **Validate Deployment:** Access the Cloud Run service URL to ensure your application is deployed and functioning correctly.


### **Congratulations!**
---

Congratulations! In this lab, you successfully implemented a secure CI/CD pipeline that builds, scans, signs, and deploys a web application to the cloud. This hands-on experience has equipped you with essential skills for building and deploying secure applications in the cloud, incorporating security best practices into your development workflows and ensuring the integrity of your software delivery process.

























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