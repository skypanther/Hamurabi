/*
	Hamurabi - the classic text-based strategy game
	Much has been lifted from http://www.apollowebworks.com/russell/samples/hamurabi.html
	
*/

var $$ = require('/common/styles').styles;
var mainWin = require('/ui/ui').createMainWin($$);
mainWin.open();

/*
 * To be added later ...
 */
Ti.Gesture.addEventListener('orientationchange', function(){
	Ti.App.fireEvent('orientation');
});
*/

/*
	We could daisy-chain it all, like this: 
	require('/ui/ui').createMainWin(require('/common/styles').styles).open();

*/