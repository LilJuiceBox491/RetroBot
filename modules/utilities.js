//Local Imports
buffer = require('./string-utilities.js').buffer;

//Object Initializations
var time = new Date();
var delay = true;

function log(text, level) {
  if (level === undefined) {
    console.log('[' + getTime() + ' / ' + 'Info' + ']: ' + text);
  }
  else {
		console.log("[" + getTime() + " / " + level + "]: " + text);
  }
}

function getTime() {
	return(buffer(time.getHours()) + ":" + buffer(time.getMinutes()) + ":" + buffer(time.getSeconds()));
}

exports.log = log;
exports.getTime = getTime;