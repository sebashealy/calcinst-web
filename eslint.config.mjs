import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'

export default [
  { ignores: ['dist/', '.astro/', '.lighthouseci/', 'node_modules/'] },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // I1: prohibido el catch vacío, sin excepciones (PLAN_SITIO_WEB.md §5).
      'no-empty': 'error',
    },
  },
]
