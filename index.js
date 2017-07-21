/*
 * Cascade Rest API interface and setup
 * 
 * @param string hostname The hostname for your cascade instance.
 * @param string username Username for authorization.
 * @param string password Password for authorization.
 * @param object password Optional. REST configuration object for connects -- see https://github.com/aacerox/node-rest-client.
 * @returns object This object has proxy references to all the methods implimented at this time.
 */


/*
 * .read
 * 
 * Method for reading an asset
 * 
 * @param object ReadAsset An object with type and indentifiers
 * @param function callback The callback to pass the response to from the read action. 
 * @return RestRequestObj see https://github.com/aacerox/node-rest-client
 */

/*
 * .readPromise
 * 
 * Method for reading an asset that returns a promise
 * 
 * @param object ReadAsset An object with type and indentifiers
 * @return promise The promise is passed {data: returnDada, request: RestRequestObj}  
 */

/*
 * .file.read
 * 
 * Method for reading a file that returns a promise
 * 
 * @param string siteName The full siteName of the file to be read
 * @param string path The path of the file to be read
 * @return promise The promise is passed {data: returnDada, request: RestRequestObj}  
 */


/*
 * .file.delete
 * 
 * Method for deleting a file that returns a promise
 * 
 * @param string siteName The full siteName of the file to be deleted
 * @param string path The path of the file to be deleted
 * @return promise The promise is passed {data: returnDada, request: RestRequestObj}  
 */

/*
 * .file.write
 * 
 * Method for deleting a file that returns a promise
 * 
 * NOTES:
 *    1) Create missing folders with defualt metadata set
 *    2) Edit file that exists
 *    3) Supports both text and binary file types
 * 
 * @param string siteName The full siteName of the file to be written
 * @param string path The path of the file to be written
 * @param string||bruffer dataToWrite The data to be written bruffer or string
 * @param object additionalData Optional. Additional data to be added to the write request (example {"metadata":{"title":"YOUR TITLE"}})
 * 
 * @return promise The promise is passed {data: returnDada, request: RestRequestObj}  
 */


var CascadeRESTAPI = require("./cascade.js");

var cascadeFileAPI = require("./cascade.file.js");

exports.initAPI = function(hostname, username, password, config) {
    //var initAPI = function(hostname, username, password, config) {
    var cascadeRESTAPI = CascadeRESTAPI.init(hostname, username, password, Object.assign({}, config));
    cascadeFileAPI.init(cascadeRESTAPI);
    return cascadeRESTAPI;
}

//test
/*
var cascade = initAPI('qa.cascade.emory.edu', 'pshan2', 'Spy62710@');
cascade.folder.delete('Pengyin - Test', 'test').then(function(data) { console.log(data); }, function(error) { console.log(error); });
*/