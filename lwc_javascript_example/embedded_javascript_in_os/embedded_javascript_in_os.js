import { LightningElement, track, api } from 'lwc';
    import { OmniscriptBaseMixin } from 'vlocity_cmt/omniscriptBaseMixin';
    export default class embedded_javascript_in_os extends OmniscriptBaseMixin(LightningElement) {

    @track 
    arguments = false;

    @api
    get a() {
        return this._a;
    }

    set a(value) {
        this._a = value;
        this.arguments = true;
    }
    
    @api
    get embeddedjavascript() {
        return this._embeddedjavascript;
    }

    set embeddedjavascript(value) {
        this._embeddedjavascript = value;
    }

    connectedCallback() {
    if (this.arguments == true) {
        this.javaScriptMethodWithArguments();
        }
    else {
        this.javaScriptMethod();
        }
    }

    javaScriptMethodWithArguments() {
            console.log("javaScriptMethodWithArguments");
            let args = JSON.parse(JSON.stringify(this.a));
            let js = this.embeddedjavascript;
            let fnString = JSON.parse(JSON.stringify(js.fnString));
            let fn = Function.apply(Function, Object.keys(args).concat(fnString));
            let result = fn.apply(fn, Object.keys(args).map(key=>args[key]));
            console.log(result);
            let output = {'output':result};
            this.omniUpdateDataJson(output);
            //debug messages
            console.log("fnString");
            console.log(fnString);
            console.log("args");
            console.log(args); 
            console.log("Object.keys(args).concat(fnString)");
            console.log(Object.keys(args).concat(fnString));
        }
       
        javaScriptMethod() {
            console.log("javaScriptMethod");         
            let js = this.embeddedjavascript;
            let fnString = JSON.parse(JSON.stringify(js.fnString));
            let dynamicFunction = [];
            dynamicFunction.push(fnString);
            let fn = Function.apply(Function, dynamicFunction);
            let result = fn.apply(fn, null);
            let output = {'output':result};
            this.omniUpdateDataJson(output);
            // debug messages
            console.log("fnString");
            console.log(fnString);
            console.log(output);
        }
}