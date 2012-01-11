/*
	Module creates the slide-out message box, which will display the results of a turn in the game
*/

// Helper for making labels used in the slide-out message box
function makeLabel(strID, param) {
	var tmpLabel =  Ti.UI.createLabel({
		text: 'foo',
		height:'auto',
		width:'90%',
		color:'#000',
		top:10,
		font:{
			fontFamily:'Helvetica Neue',
			fontSize: 15
		},
		textAlign:'left'
	});
	
	if(param instanceof Array) {
		var tmpText = L(strID).replace("\%1", param[0]);
		tmpLabel.text = tmpText.replace("\%2", param[1]);
	} else {
		tmpLabel.text = L(strID).replace("\%1", param);		
	}
	return tmpLabel;
}

/*
	Main function
*/
exports.createMessageBox = function($$) {
	var msgView = Ti.UI.createView({
		layout:'vertical',
		backgroundColor: '#ffe83e',
		borderRadius: '10',
		width:'100%',
		height:'90%',
		top: 10,
		left:Ti.Platform.displayCaps.platformWidth+20,
		zIndex:99
	});
	if(Ti.Platform.osname != 'android') {
		// bug: seting border causes transparency problems
		// http://jira.appcelerator.org/browse/TIMOB-5362
		msgView.border = 1;
		msgView.borderColor = '#999';
		msgView.backgroundImage = '/images/bggradient.png';
	}
	var msgTitle = makeLabel("reportTitle", [0]);
	msgView.add(msgTitle);
	var msgStarved = makeLabel("reportStarved", [0]);
	msgView.add(msgStarved);
	var msgMoved = makeLabel("reportMoved", [0]);
	msgView.add(msgMoved);
	var msgPopulation = makeLabel("reportPopulation", [0]);
	msgView.add(msgPopulation);
	var msgHarvest = makeLabel("reportHarvest", [0, 1]);
	msgView.add(msgHarvest);
	var msgRats = makeLabel("reportRats", [0]);
	msgView.add(msgRats);
	var msgStorage = makeLabel("reportStorage", [0]);
	msgView.add(msgStorage);
	var msgLand = makeLabel("reportLand", [0, 1]);
	msgView.add(msgLand);
	
	/*
		TBD - function to update contents of the message box
	*/
	msgView.update = function() {
		
	};
	
	/*
		Slides the message box into view
	*/
	msgView.showMe = function() {
		msgView.animate({
			left:10,
			duration:$$.ANIM_TIME
		}, function() {
			setTimeout(msgView.hideMe, $$.PAUSE);
		});
		
	};
	/*
		Hides the message box
	*/
	msgView.hideMe = function() {
		msgView.animate({
			left: Ti.Platform.displayCaps.platformWidth+20,
			duration:$$.ANIM_TIME
		});
	};
	
	return msgView;
};
