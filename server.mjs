/**
 * This example uses Nunjucks template engine for rendering pages
 */


import Express         			from 'express';
import ExpSession      			from 'express-session';
import BodyParser      			from 'body-parser';
import urlencoded	   			from 'urlencode';
import CookieParser    			from 'cookie-parser';
import MethodOverrides 			from 'method-override';
import Path            			from 'path';
import passport 	   			from 'passport';
import { initialize_passport } 	from './utils/passport.mjs';
import {initialize_database } 	from './data/database.mjs'
import Nunjcks         			from 'nunjucks';

const Server = Express();
const Port   = process.env.PORT || 3000;


/**
 * Template Engine
 * You may choose to use Nunjucks if you want to recycle everything from your old project.
 * Strongly recommended. However, do note the minor differences in syntax. :)
 * Trust me it saves your time more.
 * https://www.npmjs.com/package/express-nunjucks
 */
Nunjcks.configure('templates', {
	autoescape: true,
	express:    Server
})
//	Sets `/public` to be the virtual path to access static files
Server.use("/public", Express.static('public'));

/**
 * Form body parsers etc
 */
Server.use(BodyParser.urlencoded( { extended: false }));
Server.use(BodyParser.json());
Server.use(CookieParser());
Server.use(MethodOverrides('_method'));
initialize_database(false);
/**
 * Express Session
 */

// Session timeouts in 15 minutes. Needs re-authentication after 15 mins.

Server.use(ExpSession({
	name:   'example-app',
	secret: 'random-secret',
	resave:  false,
	saveUninitialized: false,
	cookie:{_expires : 900000}
}));

/**
 * Initialize passport
 **/
 initialize_passport(Server);

 
//-----------------------------------------

/**
 * TODO: Setup global contexts here. Basically stuff your variables in locals
 */
Server.use(async function (req, res, next) {
	res.locals.user = req.user || null;
	next();
});


import Routes from './routes/main.mjs'
Server.use("/", Routes);


/**
 * DEBUG USAGE
 * Use this to check your routes
 * Prints all the routes registered into the application
**/
import { ListRoutes } from './utils/routes.mjs'
console.log(`=====Registered Routes=====`);
ListRoutes(Server._router).forEach(route => {
	console.log(`${route.method.padStart(8)} | /${route.path}`);
});
console.log(`===========================`);

/**
 * Start the server in infinite loop
 */
Server.listen(Port, function() {
	console.log(`Server listening at port ${Port}`);
});

//xy editied this