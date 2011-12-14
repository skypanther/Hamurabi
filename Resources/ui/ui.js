/*
	Main UI components
*/

exports.createMainWin = function($$) {
	Ti.API.info('ui.js, anim_time = '+$$.ANIM_TIME);
	var win = Ti.UI.createWindow({
		backgroundColor:$$.winBG,
		fullscreen: false,
		exitOnClose:true,
		modal:true,
		titleid: "ham"
	});
	
	// require our slide-in notification box component and add it to the window
	var messageBox = require('/ui/messageBox.js').createMessageBox($$);
	win.add(messageBox);
	
	/*
		Other UI components would be created in a similar fashion
		where they're defined in a module, required in, used here
		
		We'll need:
			- Something to output current stats
			- Input controls for what to feed, sell, etc.
			- and hooks to the app logic files which determine the results of a round of play
	*/
	
	// placeholder for now till I build out the rest of the UI
	var btn = Ti.UI.createButton({
		title:'Show it',
		top:200,
		height:40,
		width:100
	});
	btn.addEventListener('click', function(){
		btn.hide();
		messageBox.showMe();
		setTimeout(btn.show, 3500);
	});
	win.add(btn);
	
	return win;
};

