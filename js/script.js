// Page switching for the single-page site
const pageNames = {
  home: "Home",
  televisions: "Televisions",
  about: "About Us"
};

const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");
const pageTriggers = document.querySelectorAll("[data-page]");
const currentPageLabel = document.getElementById("current-page-name");

function showPage(pageId) {
  // Fall back to home for unknown ids
  if (!pageNames[pageId]) {
    pageId = "home";
  }

  // Show the selected page, hide the others
  pages.forEach(function (page) {
    page.hidden = page.id !== pageId;
  });

  // Highlight the active link in the menu
  navLinks.forEach(function (link) {
    const isActive = link.dataset.page === pageId;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  // Tell the user where they are
  currentPageLabel.textContent = pageNames[pageId];
  document.title = pageNames[pageId] + " | PowerWise Appliances";
  window.scrollTo(0, 0);
}

// Any element with data-page (menu links, logo, buttons) switches page
pageTriggers.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    const pageId = trigger.dataset.page;
    history.pushState({ page: pageId }, "", "#" + pageId);
    showPage(pageId);
  });
});

// Support the browser back and forward buttons
window.addEventListener("popstate", function () {
  const id = location.hash.replace("#", "");
  // Ignore in-page anchors such as #step-size (story section links)
  if (id === "" || pageNames[id]) {
    showPage(id);
  }
});

// Running cost estimator on the Televisions page
const wattsInput = document.getElementById("watts");
const hoursInput = document.getElementById("hours");
const rateInput = document.getElementById("rate");
const costOutput = document.getElementById("cost-output");

function updateCost() {
  const watts = parseFloat(wattsInput.value) || 0;
  const hours = parseFloat(hoursInput.value) || 0;
  const centsPerKwh = parseFloat(rateInput.value) || 0;
  const kwhPerYear = (watts / 1000) * hours * 365;
  const dollars = (kwhPerYear * centsPerKwh) / 100;
  costOutput.textContent = "$" + dollars.toFixed(2);
}

[wattsInput, hoursInput, rateInput].forEach(function (input) {
  input.addEventListener("input", updateCost);
});

// Chart (Chart.js) for the power-per-screen-area comparison. All other charts are KNIME exports in images/.
const colours = {
  orange: "#F5A623",
  brown: "#7B5E3B",
  sand: "#C9B37E",
  text: "#3E2E1C"
};

function makeCharts() {
  if (typeof Chart === "undefined") {
    return; // Chart.js failed to load; the rest of the page still works
  }
  Chart.defaults.font.family = '"Source Sans 3", "Segoe UI", Arial, sans-serif';
  Chart.defaults.color = colours.text;

  // Q4 (context): power per 1,000 cm2 of screen, calculated from Avg_mode_power and Screen_Area
  new Chart(document.getElementById("chart-power-area"), {
    type: "bar",
    data: {
      labels: ["LCD", "LCD (LED)", "OLED"],
      datasets: [{ data: [10.51, 10.74, 10.73], backgroundColor: [colours.brown, colours.orange, colours.sand] }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: "Watts per 1,000 cm² of screen" } },
        x: { title: { display: true, text: "Screen technology" } }
      }
    }
  });
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Initial load (respects a hash such as #televisions)
makeCharts();
showPage(location.hash.replace("#", ""));
updateCost();
