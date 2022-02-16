---
title: 'Test List'
permalink: /test-list
---

Goto <a href="../test-form">Test form</a>

{% include sort-data-folder.liquid data=site.data.submissions sortKey="submission_date" reverse=true %}

- Number of submissions: {{itemsSorted.size}}
- [Raw data files ](https://github.com/w3c/wai-interactive-lists/tree/main/_data/submissions)

<div id="app">
    <div class="courses-filters" id="left-col">
        <form action="..." data-filter-form>
            <h2>Filters</h2>
        </form>
    </div>
    <div id="courses-list">
        <h2>Submissions</h2>
        {% for submission in itemsSorted %}
            {% include submission.md %}
        {% endfor %}
    </div>
</div>
