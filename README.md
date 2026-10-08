# T04-2: Manipulate and Add Elements with D3

COS30045 Data Visualisation – Swinburne University of Technology

Author: Sakib Ahmed

Live site: https://ahmedsakib1113.github.io/T04-2/

This repository starts from the T01 PowerWise website. The page body was reset to one `<h1>`, one `<div id="content">` and one `<svg>`, keeping the site header and footer. A separate D3-only script, `energy-d3.js`, then changes the page.

## What energy-d3.js does

- `d3.select("h1").style("color", "green")` turns the heading green.
- `d3.select("div").append("p").text(...)` adds a paragraph inside `#content`.
- `d3.select("svg").append("rect")` appends an empty `<rect>`. It has no size or fill, so it is invisible but appears in the DOM.
- The second `d3.select("svg").append("rect")` sets `x=50`, `y=50`, `width=100`, `height=30` and a green fill, so it shows as a green rectangle.

D3 v7 is loaded from `https://d3js.org/d3.v7.min.js` before `energy-d3.js`, immediately before `</body>`.

## T04-3: D3 set up

T04-3 continues in this repository and starts the D3 bar chart that later exercises (T04-4 to T04-7) build on.

- `index.html` adds a `<div class="responsive-svg-container">` below the existing content. It now loads `t04-3-bars.js` after D3, and the T04-2 script `energy-d3.js` is commented out.
- `css/style.css` adds `.responsive-svg-container`, which centres the chart, fills the parent width and caps it at 1200px.
- `t04-3-bars.js` appends an `<svg>` with `viewBox="0 0 1200 1600"` and a temporary border, plus a thin blue test `<rect>`. Because of the `viewBox`, the SVG and the bar scale together when the window is resized.

## T04-4: Load data from CSV

- `data/tvBrandCount.csv` holds the number of TV models for the top 10 brands (columns `brand`, `count`).
- `t04-4-load.js` loads the file with `d3.csv`, converting `count` from a string to a number as each row is read. It logs the rows, row count, max, min and extent to the console, sorts the rows by count (highest first), and passes them to a `createBarChart(data)` stub that T04-5 will implement.
- `index.html` now loads `t04-4-load.js` after D3. `energy-d3.js` and `t04-3-bars.js` are commented out.
- `d3.csv` needs the page to be served over HTTP, so run it with Live Server rather than opening the file directly.

## AI use

This work was completed with AI assistance. Commits that include AI-generated content are tagged `[AI-assisted]`.
