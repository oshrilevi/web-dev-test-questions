function baseObj(){}
(function(){
    var THIS = this;
    this.defined = function(x){
        return typeof x != 'undefined';
    };
    this.init = function(params){

    };
    this.get = function(key){
        return (options[key]);
    };
    this.set = function(key, value){
        if(THIS.defined(options[key])){
            options[key] = value;
        }
    };
    var options = {

    };
    this.notifications = {

    };
    this.callbacks = {

    };
    this.toggle = {

    };
    this.services = {

    };
}).apply(baseObj);