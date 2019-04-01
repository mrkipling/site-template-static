# Site Template (static)

IMPORTANT!

In order to run Gulp with watching file changes and a dev server, all you need
to type is:

gulp watch

## Build system:

- Gulp
- Build directory for site which can be safely deleted and rebuilt
- Browsersync (dev server with live reload)
- Template include support via gulp-file-include
- JS:
  - Compiled from ES6 to ES5 using Babel
  - Bundled using Browserify
  - Sourcemaps generated
  - Uglified
  - Linting configured but handled by your editor
- SASS compiled to CSS
- Minimal but useful SASS base, including a basic 12 column grid system,
  customisable variables, BEM-like methodology, and utility classes
- Images optimised
