const GLOBAL = {
  'resizable': true,
	'height': '30em'
}

export const loading = {
  "data": {
    "loading": true
  }
}

export const categories = {...GLOBAL, ...{
	'title' : 'Certifications, by category',
	"axes": {
		"left": {
			"scaleType": "labels",
			"mapsTo": "group",
			"truncation": {
        "threshold": 15,
        "numCharacter": 30
      }
		},
		"bottom": {
			'title': 'Number of certifications',
			"mapsTo": "value"
		}
	},
	"zoomBar": {
    "left": {
      "enabled": true,
      "type": "slider_view"
    }
  },
	'legend' : {
		'enabled': false
	}
}}

export const type = {...GLOBAL, ...{
	'title' : 'Certifications, by type',
	'donut' : {
		'center': {
			'label': 'Certifications'
		},
		'alignment': 'center'
	},
	'legend': {
		'enabled': false
	}
}}

export const model = {...GLOBAL, ...{
  "title": "Certifications, by year",
  "axes" : {
    "bottom": {
      "title": 'Year',
      'mapsTo': 'key',
      'scaleType': 'time'
    },
    "left": {
      "title": 'Certifications',
      'mapsTo': 'certifications',
      'scaleType': 'linear'
    }
  },
	'legend': {
	  'position': 'bottom',
	  "alignment": "center"
	},
	"zoomBar": {
    "top": {
      "enabled": true,
      "type": "slider_view"
    }
  },
	"curve": "curveMonotoneX"
}}

export const location = {...GLOBAL, ...{
  "title": "Location of registered users",
  "axes" : {
    "bottom": {
      "title": 'Year',
      'mapsTo': 'key',
      'scaleType': 'time'
    },
    "left": {
      "title": 'Certifications',
      'mapsTo': 'certifications',
      'scaleType': 'linear'
    }
  },
	'legend': {
	  'position': 'bottom',
	  "alignment": "center"
	},
	"zoomBar": {
    "top": {
      "enabled": true,
      "type": "slider_view"
    }
  },
	"curve": "curveMonotoneX"
}}
