document.addEventListener("DOMContentLoaded", function () {
  // 1. Scroll button
  const btn = document.createElement("button");
  btn.innerHTML = "㐃";
  btn.id = "scrollToTopBtn";
  btn.title = "Go to top";
  document.body.appendChild(btn);

  window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  btn.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 2. Code block styling
  const codeTags = document.querySelectorAll("code.highlighter-rouge");

  codeTags.forEach(tag => {
    tag.style.color = "#021f33";
    tag.style.backgroundColor = "#d7ebfc";
    tag.style.borderRadius = "4px";
    tag.style.padding = "2px 4px";
  });

  // 3. Table styling
  const tables = document.querySelectorAll("table.pretty-table");

  tables.forEach(table => {
    table.style.borderCollapse = "collapse";
    table.style.width = "auto";
    table.style.margin = "1.5em 0";
    table.style.marginLeft = "0";
    table.style.marginRight = "0";
    table.style.fontFamily = "IBM Plex Sans, sans-serif";
    table.style.fontSize = "0.9em";
    table.style.border = "1px solid #ccc";
    table.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";

    const cells = table.querySelectorAll("th, td");
    cells.forEach(cell => {
      cell.style.border = "1px solid #ccc";
      cell.style.padding = "0.6em";
      cell.style.textAlign = "left";
    });

    table.querySelectorAll("th").forEach(th => {
      th.style.backgroundColor = "#f0f4f8";
      th.style.color = "#003366";
    });
  });

  // 4. Inject IBM Plex Sans font
  const ibmFontLink = document.createElement("link");
  ibmFontLink.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap";
  ibmFontLink.rel = "stylesheet";
  document.head.appendChild(ibmFontLink);



  // 6. Global font and heading styles
  const pageFontStyle = document.createElement("style");
  pageFontStyle.innerHTML = `
    body {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 18px;
      line-height: 1.6;
      color: #222;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'IBM Plex Sans', sans-serif !important;
      font-weight: bold;
      color: #003366;
      margin-top: 1.2em;
      margin-bottom: 0.5em;
    }

    h1 { font-size: 2em; }
    h2 { font-size: 1.6em; }
    h3 { font-size: 1.3em; }
    h4 { font-size: 1.1em; }
    h5, h6 { font-size: 1em; }
  `;
  document.head.appendChild(pageFontStyle);

  // 6. Custom CSS for button and summary
  const style = document.createElement("style");
  style.innerHTML = `
    #scrollToTopBtn {
      display: none;
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 99;
      border: none;
      outline: none;
      background-color: #555;
      color: white;
      cursor: pointer;
      padding: 20px;
      border-radius: 20px;
      font-size: 15px;
    }

    #scrollToTopBtn:hover {
      background-color: #111;
    }

    summary[class$='-summary'] {
      font-weight: bold;
      font-size: 0.8em;
      background-color: rgb(0, 0, 0);
      padding: 6px 10px;
      border-radius: 6px 6px 0 0;
      font-family: monospace;
      user-select: none;
      list-style: none;
      cursor: pointer;
      position: relative;
      padding-left: 1.8em;
    }

    summary.cli-summary {
      color: rgb(7, 136, 242);
      border-left: 4px solid #007acc;
    }

    summary.output-summary {
      color: rgb(3, 235, 30);
      border-left: 4px solid rgb(0, 204, 88);
    }

    summary.error-summary {
      color: rgb(245, 4, 4);
      border-left: 4px solid #d32f2f;
    }

    summary.file-summary {
      color: rgb(203, 255, 15);
      border-left: 4px solid rgb(250, 255, 103);
    }

    summary[class$='-summary']::-webkit-details-marker {
      display: none;
    }

    summary.cli-summary::before {
      content: "✎";
      color: rgb(7, 136, 242);
    }

    summary.output-summary::before {
      content: "☑";
      color: rgb(3, 235, 30);
    }

    summary.error-summary::before {
      content: "⚠";
      color: rgb(245, 4, 4);
    }

    summary.file-summary::before {
      content: "🗎";
      color: rgb(203, 255, 15);
    }

    summary[class$='-summary']::before {
      font-weight: bold;
      position: absolute;
      left: 6px;
      top: 50%;
      transform: translateY(-50%) rotate(0deg);
      transition: transform 0.2s ease;
    }

    details[open] summary[class$='-summary']::before {
      transform: translateY(-50%) rotate(90deg);
    }

    .warning-box {
      border: 1px solid #ff9800;
      background-color: #fff3e0;
      padding: 1em;
      border-radius: 6px;
      font-family: sans-serif;
      font-size: 0.9em;
      margin: 1em 0;
      color: #333;
    }

    .warning-box strong {
      display: block;
      margin-bottom: 0.3em;
      font-size: 1em;
      color: #e65100;
    }
  `;
  document.head.appendChild(style);
});
