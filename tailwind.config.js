module.exports = {
	future: {},
	purge: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx', 'public/**/*.html'],
	theme: {
		extend: {
			screens: {
				'2xl': '1536px',
			},
			spacing: {
				11: '2.75rem',
				72: '18rem',
				84: '21rem',
				96: '24rem',
				120: '30rem',
				'1/20': '5%',
				'2/20': '10%',
				'1/8': '12.5%',
				'3/4': '75%',
				'9/10': '90%',
				'screen-20': '20vh',
				'screen-80': '80vh',
			},
			inset: {
				5: '5%',
				30: '30%',
				50: '50%',
			},
			transformOrigin: {
				0: '0%',
			},
			fontFamily: {
				sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
			},
			colors: {
				'red-custom': '#E50914',
				'white-custom': '#F2F2F2',
				'gray-custom': '#101011',
				'gray-input': '#333',
				'gray-input-text': '#8C8C8C',
				'black-custom': '#030303',
				'blue-google': '#4285F4',
			},
			backgroundOpacity: {
				10: '0.1',
				20: '0.2',
			},
			minWidth: {
				'1/3': '33.333333%',
				'1/7': '14.285714%',
				'1/8': '12.5%',
			},
			minHeight: {
				'screen-80': '80vh',
			},
			zIndex: {
				'-1': '-1',
			},
		},
	},
	variants: {
		zIndex: ['hover', 'active'],
		extend: {},
	},
	plugins: [],
};
