# T03: Communicating Data Insights – TV Energy Consumption

COS30045 Data Visualisation – Swinburne University of Technology
Author: Sakib Ahmed

Live site: https://cos-30045-demonstration1.vercel.app/
Storyboard (Miro): https://miro.com/app/board/uXjVHijU9u8=/?embedMode=view_only_without_ui&moveToViewport=-1012%2C-286%2C5543%2C2923&embedId=143029828106

This repository builds on the T01(a) website. The Televisions page now tells a data story about the energy use of TVs sold in Australia.

## Data Story

### Audience
The audience is **Australian households who are about to buy a TV**. They:
- are members of the general public, not data specialists;
- compare TVs mainly by screen size, price and picture quality;
- are aware of electricity costs, but rarely know how much a TV costs to run;
- will read the page on a phone or laptop and want a quick, practical answer.

### What they want to know
The most important question for this audience is: **"How can I choose a TV that costs less to run?"** The T02 questions were prioritised to answer this:

| Priority | Question | Why it matters to the audience |
|---|---|---|
| High | Q5: Screen size vs power use | Size is the biggest driver of running cost and the choice buyers make first. |
| High | Q6: Star rating vs screen size | Shows buyers they can find an efficient TV at any size. |
| Medium | Q4: Power use by screen technology | Buyers may assume one technology is more efficient; the data needs context. |
| Context | Q1, Q2, Q3: Technologies, sizes and brands on sale | Sets the scene: what is actually available in Australia. |

### Guidelines for the visualisation story
1. Use plain language and avoid technical terms (e.g. "power use when switched on" instead of "on-mode power").
2. Use headlines that state the finding, not just the topic.
3. Use units buyers recognise: inches for screen size, watts and dollars for cost.
4. Keep to one idea per chart, with clear axis labels and a caption.
5. End each section with "What this means for you" so the finding becomes an action.
6. Use the site's logo colours consistently: orange highlights the main category.

### Story structure
1. **What's on sale:** 83% of TVs use LCD (LED) screens; sizes range from 16" to 116", most commonly 65", 55" and 75"; Samsung, Kogan and LG offer 57% of models (Q1, Q2, Q3).
2. **Size drives power:** bigger screens use more power (Q5).
3. **Technology in context:** standard LCD has the lowest median power, but adjusted for screen area all three technologies use about the same power (Q4).
4. **Star ratings:** efficient TVs exist at every size, because the rating accounts for screen size (Q6).
5. **Action:** a running-cost calculator and a three-step summary.

## About the Data

### Data source
Australian Government Energy Rating registration data for televisions (`tv_2026_09_08.csv`, extract dated 8 September 2026, 5,015 rows), supplied through the unit. Each row is a TV model registered for sale, with its brand, model number, screen size, screen technology, power use and star rating.

### Data processing
Processing was done in KNIME (T01b and T02):
1. Removed columns with missing values (e.g. Family Name, GrandDate, Product Website).
2. Sorted by Model_No and then Submit_ID, and removed duplicate models, keeping the most recent registration.
3. Kept only rows with Availability Status = "Available".
4. Kept only the columns needed for the questions: Submit_ID, Brand_Reg, Model_No, SoldIn, screensize, Screen_Tech, Avg_mode_power and Star Rating Index.
5. Converted brand names to upper case to merge spelling variants.
6. Converted screen size from centimetres to inches with Math Formula (result rounded up to a whole inch).
7. Filtered to models sold in Australia (4,570 models) for the screen technology chart.
8. Aggregated with GroupBy (counts per technology and brand, median power per technology) and Top k Row Filter (top brands).

Manual adjustments for the website:
- SAMSUNG and SAMSUNG ELECTRONICS were combined for the brand chart because they are the same company (1,196 models).
- Screen sizes were grouped into size bands for the screen size chart.
- Power per screen area was calculated from Avg_mode_power and Screen_Area to compare technologies fairly.
- Charts on the website are exported from KNIME (images/), except the power-per-screen-area chart, which is drawn with Chart.js.

### Privacy
The data set describes products, not people. It contains no personal information about consumers. Submit_ID is a product registration number, and brand and model names are publicly listed. No privacy risk was identified.

### Accuracy and limitations
- **Registered models are not sales.** The data shows what is available, not what Australians actually buy.
- **Power values are test results** under standard conditions. Real power use depends on brightness settings, content and viewing hours.
- **Screen technology is confounded by size.** The median standard LCD model is 55" versus 64–65" for LCD (LED) and OLED. Power per 1,000 cm² of screen (Avg_mode_power ÷ Screen_Area) was calculated to correct for this; it is almost identical across technologies (10.5–10.7 W).
- **Brand names are inconsistent** in the registry. Upper-casing fixes spelling variants but not different registered names for the same company.
- **Filtering is not identical across questions.** The screen technology chart uses Australian-sold models only (4,570), while the other charts use all available models after cleaning (4,744).
- **Rounded screen sizes:** converting centimetres to whole inches can group slightly different sizes together.
- **KNIME chart labels:** some exported KNIME charts use default axis titles (e.g. "None"); captions on the website explain what each axis shows.
- **Running cost estimates** depend on the viewing hours and electricity price the user enters. Prices vary by state and retailer.

### Ethics
- Brand results show the number of models, not quality or efficiency, and are not a recommendation for any brand.
- The technology comparison is explained with its limitation so readers are not misled into a purchase decision.
- Charts start at zero and use consistent scales, so differences are not exaggerated.
- The data source and processing steps are documented so the results can be checked and reproduced.

## AI Declaration
- **Tool:** Claude (Anthropic)
- **Used for:** generating the HTML, CSS and JavaScript for the website (page switching, Chart.js charts, running-cost calculator); drafting the data story text, the storyboard notes and this README.
- **Not generated by AI:** the KNIME workflow and its outputs. All chart values come from my KNIME aggregation results.
- **My changes:** "Replaced placeholder charts with my own KNIME exports, checked all numbers against my KNIME outputs, set up the GitHub repository and Vercel deployment."

All AI-generated content was reviewed and checked against the KNIME outputs before submission.

## Structure
```
index.html
README.md
css/style.css
js/script.js
images/  (logo.svg + chart images)
```
