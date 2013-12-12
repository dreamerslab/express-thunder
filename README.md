# express-thunder

Express 3.x `layout`, `partial` and `block` template functions for the [thunder](https://github.com/dreamerslab/thunder) template engine.



## Installation

    $ npm install express-thunder --save

( `--save` automatically writes to your `package.json` file, tell your friends )



## Usage

Run `node app.js` from `examples` and open `localhost:3000` to see a working example.

Given a template, `index.html`:

    <? it.layout( 'boilerplate' ) ?>
    <? it.script( 'foo.js' ) ?>
    <? it.stylesheet( 'foo.css' ) ?>
    <h1>I am the <?= it.what ?> template</h1>
    <? it.block( 'header', "<p>I'm in the header.</p>" ) ?>
    <? it.block( 'footer', "<p>I'm in the footer.</p>" ) ?>

And a layout, `boilerplate.html`:

    <!DOCTYPE html>
    <html>
      <head>
        <title>It's <?= it.who ?></title>
        <?= it.scripts ?>
        <?= it.stylesheets ?>
      </head>
      <body>
        <header>
          <?= it.blocks.header ?>
        </header>
        <section>
          <?= it.body ?>
        </section>
        <footer>
          <?= it.blocks.footer ?>
        </footer>
      </body>
    </html>

When rendered by an Express 3.0 app:

    var express = require( 'express' );
    var engine  = require( 'express-thunder' );
    var app     = express();

    // use express-thunder for all ejs templates:
    app.engine( 'html', engine );
    app.set( 'view engine', 'html' );
    app.set( 'views', path.join( __dirname, 'views' ));
    app.set( 'port', process.env.PORT || 3000 );

    // render 'index' into 'boilerplate':
    app.get( '/', function ( req, res, next){
      res.render( 'index', { what : 'best', who : 'me' });
    });

    app.listen( 3000 );

You get the following result:

    <!DOCTYPE html>
    <html>
      <head>
        <title>It's me</title>
        <script src="foo.js"></script>
        <link rel="stylesheet" href="foo.css" />
      </head>
      <body>
        <header>
          <p>I'm in the header.</p>
        </header>
        <section>
          <h1>I am the best template</h1>
        </section>
        <footer>
          <p>I'm in the footer.</p>
        </footer>
      </body>
    </html>



## Features

### `it.layout( view )`

When called anywhere inside a template, requests that the output of the current template be passed to the given view as the `it.body` local. Use this to specify layouts from within your template, which is recommended with Express 3.0, since the app-level layout functionality has been removed.

### `it.partial( name, optionsOrCollection )`

When called anywhere inside a template, adds the given view to that template using the current given `optionsOrCollection`. The usual way to use this is to pass an Array as the collection argument. The given view is then executed for each item in the Array; the item is passed into the view as a local with a name generated from the view's filename.

For example, if you do `<?= it.partial( 'thing', it.things ) ?>` then each item in the `things` Array is passed to `thing.html` with the name `thing`. If you rename the template, the local name of each item will correspond to the template name.

### `it.block( name, html )`

When called anywhere inside a template, adds the given html to the named block. In the layout you can then do `<?= it.block( 'foo' ) ?>` to render all the html for that block.

Since this relies on javascript strings, and bypasses EJS's default escaping, you should be very careful if you use this function with user-submitted data.

### `it.script( src, type )`

A convenience function for `it.block( 'scripts', '<script src="src.js"></script>' )` with optional type. When called anywhere inside a template, adds a script tag with the given src/type to the scripts block. In the layout you can then do `<?= it.scripts ?>` to output the scripts from all the child templates.

### `it.stylesheet( href, media )`

A convenience function for `it.block( 'stylesheets', '<link rel="stylesheet" href="href.css" />')` with optional media type. When called anywhere inside a template, adds a link tag for the stylesheet with the given href/media to the stylesheets block. In the layout you can then do `<?= it.stylesheets ?>` to output the links from all the child templates.



## Running Tests

To run the test suite first invoke the following command within the repo, installing the development dependencies:

    $ npm install -d

then run the tests:

    $ npm test



## Backwards Compatibility

Express 2.0 had similar functionality built in, using `{ layout : 'view' }` as an argument to `res.render` but this has been removed in Express 3.0. If you want the old behavior you should do:

    app.locals({
      _layoutFile : true
    })


And/or pass `_layoutFile : true` in the options when you call `res.render(...)`.



## Credits

This library is a fork from Tom's [ejs-locals](https://github.com/RandomEtc/ejs-locals). ejs-locals is a fork from Robert Sk&ouml;ld's [express-partials](https://github.com/publicclass/express-partials), and the partial function remains relatively untouched from there ( aside from cache support   ). Robert is still updating his library and it now supports other template engines - check it out!

The blocks idea and syntax comes from Aseem Kishore's [express-blocks](https://github.com/aseemk/express-blocks)



## License

(The MIT License)

- Copyright (c) 2012 Robert Sk&ouml;ld &lt;robert@publicclass.se&gt;
- Copyright (c) 2012 Tom Carden &lt;tom@tom-carden.co.uk&gt;
- Copyright (c) 2011 dreamerslab &lt;ben@dreamerslab.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
