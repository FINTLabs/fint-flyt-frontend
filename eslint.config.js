import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import tsPlugin from '@typescript-eslint/eslint-plugin';

import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
    {
        files: ['**/*.{ts,tsx,js,jsx}'],

        languageOptions: {
            parser: tsParser,
        },

        plugins: {
            '@typescript-eslint': tsPlugin,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },

        rules: {
            ...tsPlugin.configs.recommended.rules,
            // ...reactPlugin.configs.recommended.rules,
            // ...reactHooksPlugin.configs.recommended.rules,
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',

            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',

            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: '@navikt/aksel-icons',
                            message: 'Importer ikoner fra src/components/icons.',
                        },
                    ],
                    patterns: [
                        {
                            group: ['@mui/icons-material/*'],
                            message: 'Importer ikoner fra src/components/icons.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['src/components/icons/**/*'],
        rules: {
            'no-restricted-imports': 'off',
        },
    },
];
