module.exports = {
	parser: "babel-eslint",
	extends: "airbnb",
	rules: {
		'import/no-extraneous-dependencies': ['off'],
		'import/no-unresolved': ['off'],
		'import/newline-after-import': ['off'],
		'arrow-body-style': ['warn', 'as-needed'],
		'arrow-parens': ['warn', 'always'],
		'no-undef': ['error'],
		'no-empty': ['warn'],
		'no-unused-vars': ['warn'],
		'no-param-reassign': ['warn'],
		'no-plusplus': ['warn'],
		'no-tabs': ['off'],
		'no-empty-pattern': ['warn'],
		'no-underscore-dangle': ['off'],
		'no-useless-constructor': ['warn'],
		'no-restricted-syntax': ['warn'],
		'quote-props': ['off'],
		'quotes': ["warn", "single"],
		'no-path-concat': ['warn'],
		'max-len': ['warn'],
		'global-require': ['off'],
		'class-methods-use-this': ['warn'],
		'indent': ['error', 'tab'],
		'no-shadow': ['warn'],
		'no-loop-func': ['warn'],
		'no-prototype-builtins': ['warn'],
		'prefer-rest-params': ['warn'],
		'prefer-spread': ['warn'],
		'prefer-const': ['warn'],
		'prefer-template': ['warn'],
		'object-shorthand': ['warn'],
		'object-curly-spacing': ['warn'],
		'array-bracket-spacing': ['warn', 'always'],
		'no-multiple-empty-lines': ['warn'],
		'no-else-return': ['off'],
		'no-template-curly-in-string': ['warn'],
		'dot-notation': ['warn'],
		'comma-dangle': ['error', {
			"arrays": "always-multiline",
			"objects": "always-multiline",
			"imports": "always-multiline",
			"exports": "always-multiline",
			"functions": "never",
		}],
		'react/self-closing-comp': ['warn'],
		'react/prefer-stateless-function': ['warn'],
		'react/no-string-refs': ['warn'],
		'react/no-find-dom-node': ['warn'],
		'react/jsx-boolean-value': ['off'],
		'react/jsx-indent': ['warn', 'tab'],
		'react/jsx-indent-props': ['warn', 'tab'],
		'react/jsx-space-before-closing': ['warn'],
		'react/jsx-closing-bracket-location': ['warn', 'props-aligned'],
		'react/jsx-no-bind': ['warn'],
		'react/no-unused-prop-types': ['warn'],
		'react/no-multi-comp': ['off'],
		'react/prefer-stateless-function': ['off'],
		'react/require-default-props': ['off'],
		'react/no-unescaped-entities': ['warn'],
		'jsx-a11y/no-static-element-interactions': ['warn'],
		'jsx-a11y/label-has-for': ['warn'],
		'jsx-a11y/anchor-has-content': ['warn'],
		'jsx-a11y/img-has-alt': ['warn'],
	}
};
