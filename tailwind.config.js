module.exports = {
	future: {},
	purge: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx', 'public/**/*.html'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
			},
			colors: {
				'red-custom': '#E50914',
				'white-custom': '#F2F2F2',
				'gray-custom': '#101011',
				'black-custom': '#030303',
			},
			minWidth: {
				10: '10%',
			},
			width: {
				72: '18rem',
				84: '21rem',
				96: '24rem',
				120: '30rem',
			},
			minHeight: {
				'screen-75': '75vh',
			},
			height: {
				75: '75vh',
			},
		},
	},
	variants: {
		zIndex: ['hover', 'active'],
		extend: {},
	},
	plugins: [],
};
