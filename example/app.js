/**
 * Module dependencies.
 */

var express = require( 'express' );
var routes  = require( './routes' );
var http    = require( 'http' );
var path    = require( 'path' );
var engine  = require( '../index.js' );

var app = express();

// all environments
app.engine( 'html', engine );
app.set( 'view engine', 'html' );
app.set( 'views', path.join( __dirname, 'views' ));
app.set( 'port', process.env.PORT || 3000 );
app.use( express.favicon());
app.use( express.logger( 'dev' ));
app.use( express.json());
app.use( express.urlencoded());
app.use( express.methodOverride());
app.use( app.router );
app.use( express.static( path.join( __dirname, 'public' )));

// development only
if( 'development' == app.get( 'env' )){
  app.use( express.errorHandler());
}

app.get( '/', routes.index );

http.createServer( app ).listen( app.get( 'port' ), '127.0.0.1', function (){
  console.log( 'Express server listening on port ' + this.address().port );
});
