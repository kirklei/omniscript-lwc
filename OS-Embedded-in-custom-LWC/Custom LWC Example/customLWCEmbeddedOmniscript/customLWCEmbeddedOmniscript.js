import { LightningElement, track } from 'lwc';
    export default class test1 extends LightningElement {
        @track prefillval;
        connectedCallback() {
            this.prefillval = {"ContextId":"1111"};
        }
    }