---
title: 'Test List'
permalink: /test-list
---

{% include sort-data-folder.liquid data=site.data.submissions sortKey="submission_date" reverse=true %}

<div class="header-sup" id="main" markdown="1">

Goto <a href="../test-form">Test form</a>

</div>
<div id="app">
    <div class="courses-filters" id="left-col">
          <form action="..." data-filter-form>
          <h2>Filters</h2>
            <fieldset id="type">
              <legend class="label">
                Radio Group
              </legend>
              <div class="filter-options field">
                <label>Radio one
                  <input type="checkbox" name="radio_one">
                </label>
              </div>
              <div class="filter-options field">
                <label>Radio two
                  <input type="checkbox" name="radio_two">
                </label>
              </div>
          </fieldset>
          <fieldset id="audience">
            <legend class="label">
                Checkbox Group
            </legend>
            <div class="filter-options field">
              <label>Checkbox Group a
                <input type="checkbox" name="checkbox_group_a">
              </label>
            </div>
            <div class="filter-options field">
              <label>Checkbox Group b>
                <input type="checkbox" name="checkbox_group_b">
              </label>
            </div>
        </fieldset>
        </form>
    </div>
    <div id="courses-list">
        <h2>Submissions</h2>
<div markdown="1">
- Number of submissions: {{itemsSorted.size}}
- [Raw data files ](https://github.com/w3c/wai-interactive-lists/tree/main/_data/submissions)
  </div>
    {% for submission in itemsSorted %}
        {% include submission.md %}
    {% endfor %}
  </div>
</div>


<style>
  {% include css/styles.css %}
</style>
<script>
  {% include js/submission.js %}
</script>
