module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        sourceType: 'module'
    },
    rules: {
        indent: [
            'error',
            'tab'
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'never'
        ],
				'no-unused-vars': [
					'error', 
					{ 
						vars: 'all', 
						args: 'after-used', 
						argsIgnorePattern: '_'
					}
				]
    }
}