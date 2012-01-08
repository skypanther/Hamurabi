/*
	Main UI components
*/

exports.createMainWin = function($$) {
	Ti.API.info('ui.js, anim_time = '+$$.ANIM_TIME);
	var win = Ti.UI.createWindow({
		backgroundColor:$$.winBG,
		backgroundImage:$$.winBGImage,
		fullscreen: false,
		exitOnClose:true,
		modal:true,
		titleid: "ham"
	});
	

	var kingdomBox = require('/ui/topBox').createTopBox('kingdom', 'population', 'acres');
	win.add(kingdomBox);
	var wealthBox = require('/ui/topBox').createTopBox('weath', 'grain', 'land');
	wealthBox.right = 10;
	wealthBox.left = null;
	win.add(wealthBox);
	

	// require our slide-in notification box component and add it to the window
	var messageBox = require('/ui/messageBox').createMessageBox($$);
	win.add(messageBox);
	
	// Adding one-off components here directly since we don't need them to have special methods or functions
	/* Bushels to Feed */
	var buToFeed = Ti.UI.createTextField({
		value: 0,
		width: 30,
		height: 30,
		left: 40,
		top: 180,
		borderWidth:1,
		backgroundColor:'#fff',
		borderRadius:4,
		font: { fontSize:18 },
		textAlign:'center'
	});
	win.add(buToFeed);
	var buFeedLabel = Ti.UI.createLabel({
		text: L('bu_to_feed'),
		width: 'auto',
		height: 30,
		left: 100,
		top: 180,
		font: {
			fontWeight:'bold',
			fontSize:20
		}
	});
	win.add(buFeedLabel);

	/* Acres to Plant */
	var acToPlant = Ti.UI.createTextField({
		value: 0,
		width: 30,
		height: 30,
		left: 40,
		top: 230,
		borderWidth:1,
		backgroundColor:'#fff',
		borderRadius:4,
		font: { fontSize:18 },
		textAlign:'center'
	});
	win.add(acToPlant);
	var acPlantLabel = Ti.UI.createLabel({
		text: L('ac_to_plant'),
		width: 'auto',
		height: 30,
		left: 100,
		top: 230,
		font: {
			fontWeight:'bold',
			fontSize:20
		}
	});
	win.add(acPlantLabel);

	/* Acres to Sell/Buy */
	var acToSell = Ti.UI.createTextField({
		value: 0,
		width: 30,
		height: 30,
		left: 40,
		top: 280,
		borderWidth:1,
		backgroundColor:'#fff',
		borderRadius:4,
		font: { fontSize:18 },
		textAlign:'center'
	});
	win.add(acToSell);
	var acBuyLabel = Ti.UI.createLabel({
		text: L('ac_to_buy'),
		width: 'auto',
		height: 30,
		left: 100,
		top: 280,
		font: {
			fontWeight:'bold',
			fontSize:20
		}
	});
	win.add(acBuyLabel);

	/* The Buy/Sell segmented control */
	// needs to be an implementation of my cross-platform segmented control
	// which needs to be updated to CommonJS

	// placeholder for now till I build out the rest of the UI
	var btn = Ti.UI.createButton({
		title:'Show it',
		bottom:10,
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

