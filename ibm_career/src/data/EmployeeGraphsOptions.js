	export const categories = {
		'title' : 'Your certifications, by category',
		'resizable': true,
		'donut' : {
			'center': {
				'label': 'Certifications'
			},
			'alignment': 'center'
		},
		'legend' : {
			'position': 'left',
			'orientation': 'vertical',
			'truncation': {
			  'numCharacter': 25
			}
		},
		'height': '25em'
	}

	export const yearly = {
		"title": "Your certifications, by year attained",
		"axes": {
			"bottom": {
				"title": "Year",
				"mapsTo": "year",
				'scaleType': 'time'
			},
			"left": {
				'mapsTo': 'amount',
				'title': 'Certifications Attained'
			}
		},
		'legend': {
			'enabled': false
		},
		"curve": "curveMonotoneX",
		"height": "25em"
	}
