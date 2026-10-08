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

## AI use

This work was completed with AI assistance. Commits that include AI-generated content are tagged `[AI-assisted]`.
