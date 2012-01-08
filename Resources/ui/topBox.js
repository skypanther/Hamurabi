/*
	Module creates the boxes at the top of the UI to outpu current assets
*/

// Helper for making labels
function makeLabel(strID) {
	var tmpLabel =  Ti.UI.createLabel({
		text: L(strID)+': 0',
		origText: L(strID), /* Holds original text of this label */
		height:'auto',
		width:'auto',
		color:'#000',
		top:10,
		font:{
			fontFamily:'Helvetica Neue',
			fontSize: 15
		},
		textAlign:'left'
	});
	tmpLabel.update = function(num) {
		tmpLabel.text = tmpLabel.origText+': '+num;
	};
	return tmpLabel;
} // end makeLabel()

// helper for making headers
function makeHeader(strID) {
	var tmpView = Ti.UI.createView({
		width:'100%',
		height:30,
		backgroundColor:'#ccc'
	});
	var headLabel = Ti.UI.createLabel({
		text: L(strID),
		height:'auto',
		width:'100%',
		color:'#000',
		top:5,
		bottom:5,
		font:{
			fontFamily:'Helvetica Neue',
			fontSize: 15,
			fontWeight:'bold'
		},
		textAlign:'center'
	});
	tmpView.add(headLabel);
	return tmpView;
} // end makeHeader()


/*
	Main function
*/
exports.createTopBox = function(headerStrID, firstLabel, secondLabel) {
	var boxView = Ti.UI.createView({
		layout:'vertical',
		backgroundColor: '#fff',
		width:'40%',
		height:'200',
		top: 0,
		left:10
	});
	boxView.add(makeHeader(headerStrID));
	var label1 = makeLabel(firstLabel);
	boxView.add(label1);
	var label2 = makeLabel(secondLabel);
	boxView.add(label2);
	
	boxView.update = function(firstLblVal, secondLblVal) {
		label1.update(firstLblVal);
		label2.update(secondLblVal);
	};
	
	return boxView;
};
