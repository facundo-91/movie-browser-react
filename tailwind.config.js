module.exports = {
	purge: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx', 'public/**/*.html'],
	theme: {
		extend: {
			spacing: {
				9: '2.25rem',
				11: '2.75rem',
				60: '15rem',
				72: '18rem',
				84: '21rem',
				96: '24rem',
				120: '30rem',
				'1/25': '4%',
				'1/20': '5%',
				'3/50': '6%',
				'2/20': '10%',
				'1/8': '12.5%',
				'1/6': '16.67%',
				'1/4': '25%',
				'9/16': '56.25%',
				'3/4': '75%',
				'9/10': '90%',
				'screen-20': '20vh',
				'screen-80': '80vh',
				'screen-vw': '56.25vw',
			},
			inset: {
				'-4': '-1rem',
				5: '5%',
				25: '25%',
				30: '30%',
				40: '40%',
				50: '50%',
				100: '100%',
			},
			transitionProperty: {
				width: 'width',
			},
			transformOrigin: {
				0: '0%',
			},
			fontFamily: {
				sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
			},
			fontSize: {
				'1.5vw': '1.5vw',
				'3.5vw': '3.5vw',
			},
			colors: {
				'red-custom': '#E50914',
				'white-custom': '#F2F2F2',
				'gray-custom': '#141414',
				'gray-input': '#333',
				'gray-input-text': '#8C8C8C',
				'black-custom': '#030303',
				'blue-google': '#4285F4',
				'orange-error': '#e87c03',
				'primary-button': '#FFFFFF',
				'secundary-button': '#6D6D6E',
			},
			backgroundOpacity: {
				10: '0.1',
				20: '0.2',
			},
			boxShadow: {
				custom: '20px 0px 16px 2px rgb(0 0 0 / 75%), -20px 0px 16px 2px rgb(0 0 0 / 75%)',
			},
			minWidth: {
				'1/3': '33.333333%',
				'1/6': '16.67%',
				'1/7': '14.285714%',
				'1/8': '12.5%',
			},
			minHeight: {
				'screen-80': '80vh',
			},
			zIndex: {
				'-1': -1,
			},
		},
	},
	variants: {
		extend: {
			padding: ['focus', 'hover'],
			width: ['focus'],
			zIndex: ['hover', 'active'],
			opacity: ['active'],
			transform: ['hover'],
			transitionProperty: ['hover'],
			transitionDelay: ['hover'],
		},
	},
	plugins: [],
};
