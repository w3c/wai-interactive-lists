
{% comment%}
//const submissionsString = String.raw`{{itemsSorted | jsonify | replace: "\\", "\\\\" }}`;
//const submissions = JSON.parse(submissionsString);
{% endcomment %}
{% assign itemsSorted = itemsSorted[3] %}
const submissions = "{{ itemsSorted | jsonify | uri_escape  }}"
console.log(submissions)
console.log(decodeURIComponent(submissions))
