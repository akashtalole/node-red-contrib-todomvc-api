'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function TodomvcApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.list_todos_xFields = config.list_todos_xFields;
        this.list_todos_xFieldsType = config.list_todos_xFieldsType || 'str';
        this.create_todo_payload = config.create_todo_payload;
        this.create_todo_payloadType = config.create_todo_payloadType || 'str';
        this.create_todo_xFields = config.create_todo_xFields;
        this.create_todo_xFieldsType = config.create_todo_xFieldsType || 'str';
        this.put_todo_payload = config.put_todo_payload;
        this.put_todo_payloadType = config.put_todo_payloadType || 'str';
        this.put_todo_xFields = config.put_todo_xFields;
        this.put_todo_xFieldsType = config.put_todo_xFieldsType || 'str';
        this.put_todo_id = config.put_todo_id;
        this.put_todo_idType = config.put_todo_idType || 'str';
        this.get_todo_xFields = config.get_todo_xFields;
        this.get_todo_xFieldsType = config.get_todo_xFieldsType || 'str';
        this.get_todo_id = config.get_todo_id;
        this.get_todo_idType = config.get_todo_idType || 'str';
        this.delete_todo_id = config.delete_todo_id;
        this.delete_todo_idType = config.delete_todo_idType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client;
            if (this.service && this.service.host) {
                client = new lib.TodomvcApi({ domain: this.service.host });
            } else {
                node.error('Host in configuration node is not specified.', msg);
                errorFlag = true;
            }
            if (!errorFlag) {
                client.body = msg.payload;
            }

            var result;
            if (!errorFlag && node.method === 'list_todos') {
                var list_todos_parameters = [];
                var list_todos_nodeParam;
                var list_todos_nodeParamType;

                list_todos_nodeParam = node.list_todos_xFields;
                list_todos_nodeParamType = node.list_todos_xFieldsType;
                if (list_todos_nodeParamType === 'str') {
                    list_todos_parameters.xFields = list_todos_nodeParam || '';
                } else {
                    list_todos_parameters.xFields = RED.util.getMessageProperty(msg, list_todos_nodeParam);
                }
                list_todos_parameters.xFields = !!list_todos_parameters.xFields ? list_todos_parameters.xFields : msg.payload;
                                result = client.list_todos(list_todos_parameters);
            }
            if (!errorFlag && node.method === 'create_todo') {
                var create_todo_parameters = [];
                var create_todo_nodeParam;
                var create_todo_nodeParamType;

                create_todo_nodeParam = node.create_todo_payload;
                create_todo_nodeParamType = node.create_todo_payloadType;
                if (create_todo_nodeParamType === 'str') {
                    create_todo_parameters.payload = create_todo_nodeParam || '';
                } else {
                    create_todo_parameters.payload = RED.util.getMessageProperty(msg, create_todo_nodeParam);
                }
                create_todo_parameters.payload = !!create_todo_parameters.payload ? create_todo_parameters.payload : msg.payload;
                
                create_todo_nodeParam = node.create_todo_xFields;
                create_todo_nodeParamType = node.create_todo_xFieldsType;
                if (create_todo_nodeParamType === 'str') {
                    create_todo_parameters.xFields = create_todo_nodeParam || '';
                } else {
                    create_todo_parameters.xFields = RED.util.getMessageProperty(msg, create_todo_nodeParam);
                }
                create_todo_parameters.xFields = !!create_todo_parameters.xFields ? create_todo_parameters.xFields : msg.payload;
                                result = client.create_todo(create_todo_parameters);
            }
            if (!errorFlag && node.method === 'put_todo') {
                var put_todo_parameters = [];
                var put_todo_nodeParam;
                var put_todo_nodeParamType;

                put_todo_nodeParam = node.put_todo_payload;
                put_todo_nodeParamType = node.put_todo_payloadType;
                if (put_todo_nodeParamType === 'str') {
                    put_todo_parameters.payload = put_todo_nodeParam || '';
                } else {
                    put_todo_parameters.payload = RED.util.getMessageProperty(msg, put_todo_nodeParam);
                }
                put_todo_parameters.payload = !!put_todo_parameters.payload ? put_todo_parameters.payload : msg.payload;
                
                put_todo_nodeParam = node.put_todo_xFields;
                put_todo_nodeParamType = node.put_todo_xFieldsType;
                if (put_todo_nodeParamType === 'str') {
                    put_todo_parameters.xFields = put_todo_nodeParam || '';
                } else {
                    put_todo_parameters.xFields = RED.util.getMessageProperty(msg, put_todo_nodeParam);
                }
                put_todo_parameters.xFields = !!put_todo_parameters.xFields ? put_todo_parameters.xFields : msg.payload;
                
                put_todo_nodeParam = node.put_todo_id;
                put_todo_nodeParamType = node.put_todo_idType;
                if (put_todo_nodeParamType === 'str') {
                    put_todo_parameters.id = put_todo_nodeParam || '';
                } else {
                    put_todo_parameters.id = RED.util.getMessageProperty(msg, put_todo_nodeParam);
                }
                put_todo_parameters.id = !!put_todo_parameters.id ? put_todo_parameters.id : msg.payload;
                                result = client.put_todo(put_todo_parameters);
            }
            if (!errorFlag && node.method === 'get_todo') {
                var get_todo_parameters = [];
                var get_todo_nodeParam;
                var get_todo_nodeParamType;

                get_todo_nodeParam = node.get_todo_xFields;
                get_todo_nodeParamType = node.get_todo_xFieldsType;
                if (get_todo_nodeParamType === 'str') {
                    get_todo_parameters.xFields = get_todo_nodeParam || '';
                } else {
                    get_todo_parameters.xFields = RED.util.getMessageProperty(msg, get_todo_nodeParam);
                }
                get_todo_parameters.xFields = !!get_todo_parameters.xFields ? get_todo_parameters.xFields : msg.payload;
                
                get_todo_nodeParam = node.get_todo_id;
                get_todo_nodeParamType = node.get_todo_idType;
                if (get_todo_nodeParamType === 'str') {
                    get_todo_parameters.id = get_todo_nodeParam || '';
                } else {
                    get_todo_parameters.id = RED.util.getMessageProperty(msg, get_todo_nodeParam);
                }
                get_todo_parameters.id = !!get_todo_parameters.id ? get_todo_parameters.id : msg.payload;
                                result = client.get_todo(get_todo_parameters);
            }
            if (!errorFlag && node.method === 'delete_todo') {
                var delete_todo_parameters = [];
                var delete_todo_nodeParam;
                var delete_todo_nodeParamType;

                delete_todo_nodeParam = node.delete_todo_id;
                delete_todo_nodeParamType = node.delete_todo_idType;
                if (delete_todo_nodeParamType === 'str') {
                    delete_todo_parameters.id = delete_todo_nodeParam || '';
                } else {
                    delete_todo_parameters.id = RED.util.getMessageProperty(msg, delete_todo_nodeParam);
                }
                delete_todo_parameters.id = !!delete_todo_parameters.id ? delete_todo_parameters.id : msg.payload;
                                result = client.delete_todo(delete_todo_parameters);
            }
            if (!errorFlag && result === undefined) {
                node.error('Method is not specified.', msg);
                errorFlag = true;
            }
            var setData = function (msg, data) {
                if (data) {
                    if (data.response) {
                        if (data.response.statusCode) {
                            msg.statusCode = data.response.statusCode;
                        }
                        if (data.response.headers) {
                            msg.headers = data.response.headers;
                        }
                        if (data.response.request && data.response.request.uri && data.response.request.uri.href) {
                            msg.responseUrl = data.response.request.uri.href;
                        }
                    }
                    if (data.body) {
                        msg.payload = data.body;
                    }
                }
                return msg;
            };
            if (!errorFlag) {
                node.status({ fill: 'blue', shape: 'dot', text: 'TodomvcApi.status.requesting' });
                result.then(function (data) {
                    node.send(setData(msg, data));
                    node.status({});
                }).catch(function (error) {
                    var message = null;
                    if (error && error.body && error.body.message) {
                        message = error.body.message;
                    }
                    node.error(message, setData(msg, error));
                    node.status({ fill: 'red', shape: 'ring', text: 'node-red:common.status.error' });
                });
            }
        });
    }

    RED.nodes.registerType('todomvc-api', TodomvcApiNode);
    function TodomvcApiServiceNode(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;

    }

    RED.nodes.registerType('todomvc-api-service', TodomvcApiServiceNode, {
        credentials: {
            temp: { type: 'text' }
        }
    });
};
