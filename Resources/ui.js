/*
	UI components
*/

// include file has helpers for some UI buttons & other controls
// put there to clean up here
Ti.include('uicomponents.js');

exports.createMainWin = function($$) {
	Ti.API.info('ui.js, anim_time = '+$$.ANIM_TIME);
	var win = Ti.UI.createWindow({
		backgroundColor:$$.winBG,
		fullscreen: false,
		exitOnClose:true,
		modal:true,
		titleid: "ham"
	});
	
	var messageBox = createMessageBox($$);
	win.add(messageBox);
	
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

