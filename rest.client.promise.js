var Promise = require("bluebird");
var methodNamesToPromisify = "get post put delete patch".split(" ");
var nodeRestClient = require('node-rest-client');

/**
 * The Promisifier promisifying the node-rest-client
 * @param originalMethod Original method to be promisified
 * @returns {promisified} The promisified version of the method
 * @constructor
 */
function EventEmitterPromisifier(originalMethod) {
    return function promisified() {
        var args = [].slice.call(arguments);
        var self = this;
        return new Promise(function (resolve, reject) {

            // add the callback to the arguments

            args.push(
                function (data, response) {
                    // resolve the Promise providing data and response as
                    // an object
                    resolve({
                        data: data,
                        response: response
                    });
                }
            );

            // call the method

            var emitter = originalMethod.apply(self,
                args
            );

            // listen to specific events leading to rejects

            emitter
                .on("error", function (err) {
                    reject(err);
                })
                .on("requestTimeout", function () {
                    reject(new Promise.TimeoutError());
                })
                .on("responseTimeout", function () {
                    reject(new Promise.TimeoutError());
                });
        });
    };
};

/**
 * A simple wrapper around `new Client(options)`, returning a promisified
 * client object.
 *
 * @param options Options for `node-rest-client.Client`
 * @param options.promisify Boolean for enabling promisification of methods
 * @param options.promisify.methods Array of strings or space delimited of methods
 * @param options.promisify.onRegisterMethod Boolean promisify registered methods if true
 * @returns {*} the promisified client
 */
var client = function (options) {

    var restClient = new nodeRestClient.Client(options);

    if(options.promisify){
        var promisifiedClient = Promise.promisifyAll(restClient, {
            filter: function (name) {
                if(options.promisify.methods){
                    if(Array.isArray(options.promisify.methods)){
                        return options.promisify.methods.indexOf(name) > -1;
                    } else {
                        return options.promisify.methods.toString().split(" ").indexOf(name)  > -1;
                    }
                } else {
                    return methodNamesToPromisify.indexOf(name) > -1;
                }
            },
            promisifier: EventEmitterPromisifier,
            suffix: 'Promise'
        });

        if(options.promisify.onRegisterMethod == true) {
            var registerMethod = promisifiedClient.registerMethod;
            

            promisifiedClient.registerMethod = function(){
                var args = [].slice.call(arguments);
                registerMethod.apply(promisifiedClient, args);
                Promise.promisifyAll(restClient.methods, {
                    filter: function (name) {
                        return name === args[0];
                    },
                    promisifier: EventEmitterPromisifier,
                    suffix: 'Promise'
                })
            };
        }
        return promisifiedClient;
    } else {
        return restClient;
    }
}

exports.Client = client;
