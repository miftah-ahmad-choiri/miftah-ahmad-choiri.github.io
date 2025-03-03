---
title: | 
        How to Publish a Content <br>
        ![GitHub](https://img.shields.io/badge/github-repository-black)
        ![Jekyll](https://img.shields.io/badge/jekyll-static--site--generator-blue)
        ![Ruby](https://img.shields.io/badge/ruby-programming-red)
        ![GitHub Pages](https://img.shields.io/badge/github--pages-hosting-green)

permalink: /docs/publish-content/
excerpt: "This module explain how to publish a content on this website"
last_modified_at: 2025-02-08T21:36:18-04:00
toc: true

---

## 1. **`_docs`** - 📝 Create New Documentation  

To create new documentation, simply add a new Markdown file.  
For example: **`04-how-to-install-awx.md`**  

```yml
---
title: | 
        How to Install Ansible AWX 🚀 <br>
        ![Ansible](https://img.shields.io/badge/ansible-automation-red)
        ![Ansible Tower](https://img.shields.io/badge/ansible--tower-management--ui-blue)
        ![Ansible AWX](https://img.shields.io/badge/ansible--awx-open--source--ui-green)

permalink: /docs/how-to-install-awx/
excerpt: "This guide explains how to install Ansible AWX on RHEL 9."
last_modified_at: 2025-02-08T21:36:18-04:00
toc: true
---

# 🚀 How to Install AWX on RHEL 9  
...
```

### 🔗 Linking Documentation to `docs.md`  
To add a link to this documentation in `docs.md`, edit the following section:  

```yml
  - image_path: /assets/pictures/16.png
    alt: "Automation with Red Hat Ansible 🤖"
    title: "Automation with Red Hat Ansible 🤖"
    excerpt: "Best practices for system maintenance and optimization."
    url: "/docs/how-to-install-awx"
    btn_class: "btn--primary"
    btn_label: "Learn More"
```

---

## 2. **`_data`** - 📌 Edit Navbar for Documentation  

To display the documentation link in the navigation menu, edit `navigation.yml`:  

```yml
  - title: Red Hat Ansible 🤖
    children:
      - title: "How to Install AWX"
        url: /docs/how-to-install-awx
```

---

## 3. **`_posts`** - 📰 Create a Blog Post  

If you want to publish a **portfolio** or **blog post**, navigate to the `_posts` directory and create a new Markdown file, e.g., **`2025-02-08-new-post-miftah.md`**  

```yml
---
title: "🚀 New Post: Miftah & Red Hat"
categories:
  - redhat
tags:
  - content
  - css
  - edge case
  - lists
  - markup
---

Hi, Miftah! Welcome to my latest blog post on **Red Hat technologies**! 🚀
```

---

## 4. **`_<projects>`** - 🚀 Publish a Project  

To create a **new project experience**, create a directory inside your repository and add a Markdown file.  

### **Example:** Creating a Project Directory  
```bash
cd miftah-ahmad-choiri.github.io
mkdir _relocation
vi _relocation/example.md
```

### **Example Project File (`example.md`)**  
```md
---
title: "Pending Execution"
excerpt: "A tabby is any domestic cat that has a coat featuring distinctive stripes, dots, lines, or swirling patterns, usually with a mark resembling an 'M' on its forehead."
---

> A tabby is any domestic cat that has a coat featuring distinctive stripes, dots, lines, or swirling patterns, usually together with a mark resembling an 'M' on its forehead.  
>  
> 🐱 Tabbies are sometimes mistakenly thought to be a breed, but in reality, the tabby pattern is found in many cat breeds and mixed-breed populations.  
>  
> <cite>— From Wikipedia, the free encyclopedia</cite>
```

🎉 Once added, the project will automatically appear in the **My Projects** list under the **Relocation** category.  

---

### ✅ Summary  
- **📄 Documentation:** Add a Markdown file in `_docs`  
- **📌 Navbar Links:** Edit `navigation.yml` in `_data`  
- **📰 Blog Posts:** Add new files in `_posts`  
- **🚀 Projects:** Create directories inside `_<projects>`  

Let’s keep building awesome content! 🚀🔥  
































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