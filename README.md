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

## T04-5: D3 binding and drawing with data

- `t04-5-bars.js` defines `createBarChart(data)`. It appends an `<svg viewBox="0 0 1200 400">` to the responsive container, then binds the rows with `selectAll("rect").data(data).join("rect")`, so there is one `<rect>` per brand.
- Each bar gets a class from its data (for example `bar bar-859`), a width equal to its `count`, and a constant height of 16.
- The bars are not spaced yet, so they sit on top of each other and only the longest is visible. T04-6 adds scales and x/y positions.
- The `createBarChart` stub was removed from `t04-4-load.js`, and `index.html` loads `t04-4-load.js` then `t04-5-bars.js` after D3.

## T04-6: Scaling charts

`t04-5-bars.js` now uses D3 scales so the bars always fit inside the SVG.

- The SVG has a logical coordinate system (`viewBox` 500 × 1600) and an explicit display size (640 × 420 pixels).
- `d3.scaleLinear()` maps counts from 0 to the highest count onto 0 to 500, so the longest bar fills the logical width.
- `d3.scaleBand()` gives each brand its own row from top to bottom, with `paddingInner(0.2)` between bars and `paddingOuter(0.1)` at the ends. Each bar's height is `yScale.bandwidth()`.
- Bars are drawn in steelblue, longest first. Because the logical canvas is tall and the display box is wide, the browser scales the canvas to fit the height and centres it.

## AI use

This work was completed with AI assistance. Commits that include AI-generated content are tagged `[AI-assisted]`.
