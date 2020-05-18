import { LightningElement, api, track } from 'lwc';
import { OmniscriptBaseMixin } from 'vlocity_cmt/omniscriptBaseMixin';

    export default class a_lwc_iframe extends OmniscriptBaseMixin(LightningElement) {
      
    @track 
    url;
_
    @api
    get iframeurl() {
        return this._iframeurl;
    }

    set iframeurl(value) {
       this._iframeurl = value;
       this.url = this._iframeurl;

    }

    renderedCallback()
    {
        console.log("renderedCallback");
        console.log(this.url);
    }
    
}