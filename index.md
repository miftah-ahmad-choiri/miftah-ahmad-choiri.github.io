---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: splash
permalink: /
hidden: true
header:
  overlay_color: "#5e616c"
  #overlay_filter: rgba(91, 65, 182, 0.5)
  overlay_image: /assets/pictures/20.jpeg
  actions:
    - label: "<i class='fas fa-arrow-right'></i> Let's Go"
      url: "/docs/"
      class: "btn btn-primary" 
excerpt: >
  An Artificial Brain for My Mind. Think Smart with Me! <br /> <br />

intro:
  - excerpt: |
      🔥 **_Welcome at mymind!_** 🔥  

      🔧 Whether you're a **system administrator, IT engineer, or tech enthusiast**, this site is your go-to hub for **automation, virtualization, cloud computing, and hardware break-fix solutions**.  

      📖 Dive into **technical guides, troubleshooting tips, and best practices**—all based on **_hands-on experience_** from project installations, migrations, and system optimizations.  

      💡 **Let’s build, automate, and innovate together!** ⚙️🚀  

feature_row:
  - image_path: /assets/pictures/18.png
    alt: "MyDocs-Banks📄"
    title: "MyDocs-Banks📄"
    excerpt: "I provide well-structured documentation for automation and system configurations across enterprise environments. My documentation covers Red Hat, AIX, AS/400, Cisco MDS, Brocade switches, HMC, Storwize, and IBM DS8000, ensuring efficient troubleshooting, setup, and management of IT infrastructure."
    url: "/docs/"
    btn_class: "btn--primary"
    btn_label: "Go there"
  - image_path: /assets/pictures/19.png
    alt: "MyPortofolios"
    title: "MyPortofolios🏆"
    excerpt: "I have hands-on experience in setting up and configuring Ansible, RHV, OpenShift, AS/400, AIX, VIOS, Spectrum Control, IBM DS8000, and Storwize storage. My work involves optimizing enterprise infrastructure, automating deployments, and ensuring system reliability through efficient configurations."
    url: "/blog/"
    btn_class: "btn--primary"
    btn_label: "Go there"
  - image_path: /assets/pictures/17.png
    alt: "MyProjects"
    title: "MyProjects💼"
    excerpt: "I have worked on installation, migration, relocation, maintenance, optimization, integration, problem breakfix, and decommissioning for enterprise servers, including IBM Power, IBM Storage, and other OEM products. My expertise ensures seamless infrastructure deployment, system reliability, and performance optimization."
    url: "/collection-archive/"
    btn_class: "btn--primary"
    btn_label: "Go there"      
feature_row4:
  - image_path: /assets/profiles/Formal-circle.png
    alt: "Miftah Ahmad Choiri"
    title: "Miftah Ahmad Choiri"
    excerpt: 'Investing in **learning** is the most valuable **investment**—its returns last a lifetime and create endless **opportunities**.🚀'
    url: "/about/"
    btn_label: "Reach Me"
    btn_class: "btn--primary"
---

{% include feature_row %}
{% include feature_row id="intro" type="center" %}

{% include feature_row id="feature_row4" type="center" %}