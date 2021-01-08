module.exports = {
	future: {},
	purge: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx', 'public/**/*.html'],
	theme: {
		extend: {
			screens: {
				'2xl': '1536px',
			},
			spacing: {
				'1/20': '5%',
				'2/20': '10%',
				'screen-20': '20vh',
			},
			inset: {
				8: '2rem',
				10: '2.5rem',
				11: '2.75rem',
			},
			fontFamily: {
				sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
			},
			colors: {
				'red-custom': '#E50914',
				'white-custom': '#F2F2F2',
				'gray-custom': '#101011',
				'black-custom': '#030303',
			},
			backgroundOpacity: {
				10: '0.1',
				20: '0.2',
			},
			minWidth: {
				10: '10rem',
				'1/8': '12.5%',
			},
			maxWidth: {
				'min-content': 'min-content',
			},
			width: {
				72: '18rem',
				84: '21rem',
				96: '24rem',
				120: '30rem',
				'1/8': '12.5%',
			},
			minHeight: {
				'screen-80': '80vh',
			},
			height: {
				'screen-20': '20vh',
				'screen-80': '80vh',
				80: '80%',
			},
		},
	},
	variants: {
		zIndex: ['hover', 'active'],
		extend: {},
	},
	plugins: [],
};
