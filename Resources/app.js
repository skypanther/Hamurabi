/*
	Hamurabi - the classic text-based strategy game
	Much has been lifted from http://www.apollowebworks.com/russell/samples/hamurabi.html
	
*/

require('/ui').createMainWin(require('/styles').styles).open();

/*
	Instead of daisy-chaining it all, we could do:
	// require in the global styles module
	var styles = require('/styles'); 
	var $$ = styles.styles;
	// require our UI module
	var ui = require('/ui');
	// declare the main window
	var mainWin = ui.createMainWin($$);
	// open it to start the app
	mainWin.open();
*/