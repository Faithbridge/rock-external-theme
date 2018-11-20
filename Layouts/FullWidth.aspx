{% extends "Site.Master" %}

{% block globalContent %}

	{% if pageHeaderColorHex %}
		<div class="position-fixed top-zero right-zero bottom-zero left-zero {% if pageHeaderColorHex %}text-white{% endif %}" style="background-color: #{{ pageHeaderColorHex }}; opacity: .95; z-index: -1;"></div>
	{% endif %}

	<div class="soft-top xs-soft-half-top">
	    {% block content %}
	    {% endblock %}
	</div>

{% endblock %}