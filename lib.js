/*jshint -W069 */
/**
 * A simple TodoMVC API
 * @class TodomvcApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var TodomvcApi = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function TodomvcApi(options){
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : '';
        if(this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                  .forEach(function(parameterName) {
                      var parameter = parameters.$queryParameters[parameterName];
                      queryParameters[parameterName] = parameter;
            });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name TodomvcApi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    TodomvcApi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if(Object.keys(form).length > 0) {
            if (req.headers['Content-Type'] && req.headers['Content-Type'][0] === 'multipart/form-data') {
                delete req.body;
                var keyName = Object.keys(form)[0]
                req.formData = {
                    [keyName]: {
                        value: form[keyName],
                        options: {
                            filename: (fileType(form[keyName]) != null ? `file.${ fileType(form[keyName]).ext }` : `file` )
                        }
                    }
                };
            } else {
                req.form = form;
            }
        }
        if(typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body){
            if(error) {
                deferred.reject(error);
            } else {
                if(/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch(e) {}
                }
                if(response.statusCode === 204) {
                    deferred.resolve({ response: response });
                } else if(response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });
    };


/**
 * List all tasks
 * @method
 * @name TodomvcApi#list_todos
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.xFields - An optional fields mask
 */
 TodomvcApi.prototype.list_todos = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/todos/';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
                if(parameters['xFields'] !== undefined){
                    headers['X-Fields'] = parameters['xFields'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a new task
 * @method
 * @name TodomvcApi#create_todo
 * @param {object} parameters - method options and parameters
     * @param {} parameters.payload - A simple TodoMVC API
     * @param {string} parameters.xFields - An optional fields mask
 */
 TodomvcApi.prototype.create_todo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/todos/';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['payload'] !== undefined){
                body = parameters['payload'];
            }


        if(parameters['payload'] === undefined){
            deferred.reject(new Error('Missing required  parameter: payload'));
            return deferred.promise;
        }
 
        
        
                if(parameters['xFields'] !== undefined){
                    headers['X-Fields'] = parameters['xFields'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a task given its identifier
 * @method
 * @name TodomvcApi#put_todo
 * @param {object} parameters - method options and parameters
     * @param {} parameters.payload - A simple TodoMVC API
     * @param {string} parameters.xFields - An optional fields mask
     * @param {integer} parameters.id - The task identifier
 */
 TodomvcApi.prototype.put_todo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/todos/{id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['payload'] !== undefined){
                body = parameters['payload'];
            }


        if(parameters['payload'] === undefined){
            deferred.reject(new Error('Missing required  parameter: payload'));
            return deferred.promise;
        }
 
        
        
                if(parameters['xFields'] !== undefined){
                    headers['X-Fields'] = parameters['xFields'];
                }
        


 
        
            path = path.replace('{id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch a given resource
 * @method
 * @name TodomvcApi#get_todo
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.xFields - An optional fields mask
     * @param {integer} parameters.id - The task identifier
 */
 TodomvcApi.prototype.get_todo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/todos/{id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
                if(parameters['xFields'] !== undefined){
                    headers['X-Fields'] = parameters['xFields'];
                }
        


 
        
            path = path.replace('{id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a task given its identifier
 * @method
 * @name TodomvcApi#delete_todo
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The task identifier
 */
 TodomvcApi.prototype.delete_todo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/todos/{id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return TodomvcApi;
})();

exports.TodomvcApi = TodomvcApi;
