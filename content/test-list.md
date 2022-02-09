---
title: 'Test List'
permalink: /test-list
---

Goto <a href="../test-form">Test form</a>

{% include sort-data-folder.liquid data=site.data.submissions sortKey="submission_date" reverse=true %}
{% assign strings = site.data.strings %}

- Number of submissions: {{itemsSorted.size}}
- [Raw data files ](https://github.com/w3c/wai-interactive-lists/tree/main/_data/submissions)

{% for submission in itemsSorted %}

## Submission {% increment my_counter %}

  form_name: {{submission.form_name}}<br/>
  form_ver : {{submission.form_version}}<br/>
  submission_ref : {{submission.submission_ref}}<br/>
  submission_date : {{submission.submission_date | date_to_string}}


  {% if submission.text_one.size != 0 -%}
  {{strings.text_one_label}}
  : {{submission.text_one}}
  {%- endif %}

  {% if submission.text_two.size != 0 -%}
  {{strings.text_two_label}}
  : {{ submission.text_two }}
  {%- endif %}


  {{strings.option_label}}
  : {{strings[
    submission.option]}}


  {% if submission.checkbox_one -%}
  {{strings.checkbox_one}}
  {%- endif %}

  {% if submission.checkbox_two -%}
  {{strings.checkbox_two}}
  {%- endif %}


  {{strings.checkbox_group_legend}}:
  :  {% if submission.checkbox_group_a -%}
  {{strings.checkbox_group_a}}
  {%- endif %}
  <br/>
  {% if submission.checkbox_group_b -%}
  {{strings.checkbox_group_b}}
  {%- endif %}


  {{strings.radio_group_legend}}:
  : {{strings[submission.radio]}}

---

{% endfor %}
