var host = require('./host.js');

var Site = function(siteName) {
    this.name = siteName;
    this.lastModifiedBy = host.userName;
    this.lastModifiedDateTime = Date.now();
    this.getFolder = function(name) {
        console.log('getFolder');
        return siteName;
    }
};

module.exports = Site;