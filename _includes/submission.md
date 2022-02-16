{% capture title %} Submission {% increment my_counter %}{% endcapture %}
{% include box.html type="start" title=title  %}
<div  markdown="1">


{% assign strings = site.data.strings %}
{% assign submission = include.submission %}

form_name: {{submission.form_name}}<br/>
form_ver: {{submission.form_version}}<br/>
submission_ref: {{submission.submission_ref}}<br/>
submission_date: {{submission.submission_date | date_to_string}}

{% if submission.text_one.size != 0 -%}
{{strings.text_one_label}}
: {{submission.text_one}}
{%- endif %}


{% if submission.text_two.size != 0 -%}
  {{strings.text_two_label}}
: {{ submission.text_two }}
{%- endif %}


{{strings.option_label}}
: {{strings[submission.option]}}


{{strings.option2_label}}
: {% for opt in submission.option2%} {{strings[opt]}}{% if forloop.last != true %}, {% endif %} {% endfor %}


{% if submission.checkbox_one -%}
{{strings.checkbox_one}}
{%- endif -%}
{%- if submission.checkbox_one and submission.checkbox_two -%}
<br/>
{%- endif -%}
{%- if submission.checkbox_two -%}
{{strings.checkbox_two}}
{%- endif %}


{{strings.checkbox_group_legend}}:
: {% for cb in submission.checkbox_group %} {{strings[cb]}}{% if forloop.last != true %}, {% endif %} {% endfor %}


{{strings.radio_group_legend}}:
: {{strings[submission.radio]}}

</div>
{% include box.html type="end" %}
