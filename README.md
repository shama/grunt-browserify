# grunt-browserify

Grunt task for node-browserify

## Getting Started
Install this grunt plugin next to your project's
[Gruntfile.js gruntfile][getting_started] with: `npm install grunt-browserify`

Then add this line to your project's `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-browserify');
```

[grunt]: https://github.com/gruntjs/grunt
[getting_started]: gruntjs.com/getting-started

## Documentation
_Run this task with the `grunt browserify` command._

Task targets, files and options may be specified according to the grunt
[Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Configuration

#### `src`
Type: `String` or `Array`
Default: `'index.js'`

Specify entry points for browserify:

```js
grunt.initConfig({
  browserify: {
    project: {
      src: 'index.js',
    },
  },
});
```

#### `dest`
Type: `String`
Default: `'bundle.js'`

Specify a destination file to write your bundle to.

#### `options.require`
Type: `String` or `Array` or `Object`
Default: `[]`

Require additional modules for inclusion in the bundle.

If `require` is an array, require each element in it.

If `require` is a non-array object, map an alias to a package name.
For instance to be able to map `require('jquery')` to the jquery-browserify
package, you can do:

```js
grunt.initConfig({
  browserify: {
    options: {
      require: { jquery: 'jquery-browserify' }
    },
  },
});
```

#### `options.ignore`
Type: `String` or `Array`
Default: `[]`

Omit a file or files from being included by the AST walk to hunt down
`require()` statements.

#### `options.alias`
Type: `Object`
Default: `{}`

Specify key:value pairs of package names to alias.

```js
grunt.initConfig({
  browserify: {
    project: {
      src: 'index.js',
      options: {
        alias: {
          'frompackage': 'topackage',
        },
      },
    },
  },
});
```

#### `options.before`
Type: `Function`
Default: `null`

Specify a function to run before bundling. Use this to enable plugins:

```js
grunt.initConfig({
  browserify: {
    project: {
      src: ['src/**/*.js'],
      beforeHook: function(bundle) {
        var stringify = require('stringify');
        bundle.use(stringify(['.hjs', '.html', '.whatever']));
      },
    },
  },
});
```

#### `options.prepend`
Type: `String` or `Array`
Default: `[]`

A file or list of files to concat and prepend to your bundle.

#### `options.append`
Type: `String` or `Array`
Default: `[]`

A file or list of files to concat and append to your bundle.


## Examples
The simplest use case upon `grunt browserify` will compile `./index.js` to
`./bundle.js`:

```js
grunt.initConfig({
  browserify: {}
});
```

Or to quickly customize the entry and compiled files:

```js
grunt.initConfig({
  browserify: {
    'out/compiled.js': 'src/entry.js'
  }
});
```

Example with all the options:

```js
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  browserify: {
    all: {
      src: ['src/**/*.js'],
      dest: 'dist/bundle.<%= pkg.version %>.js',
      options: {
        require: ['traverse'],
        alias: {
          jquery: 'jquery-browserify',
        },
        ignore: ['non-browser-module'],
        prepend: ['before.js'],
        append: ['after.js'],
        before: function(bundle) {
          // Do something before bundling
        },
      },
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code
using [grunt][grunt].

## Release History

### v0.1.0
  - Initial release

### v0.1.1
  - Properly support compact and full grunt task syntax

### v0.2.0
  - Update for Grunt v0.4 supported API
  - Update option names to match method names in browserify
  - Merged beforeHook and hook to just before

## License
Copyright (c) 2013 Camille Moncelier
Licensed under the MIT license.
