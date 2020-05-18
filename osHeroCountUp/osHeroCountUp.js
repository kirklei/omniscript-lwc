import { LightningElement, api, track } from 'lwc';
    import { OmniscriptBaseMixin } from 'c/omniscriptBaseMixin';
    import { loadScript } from 'lightning/platformResourceLoader';
    import COUNT_UP from '@salesforce/resourceUrl/countUp'
    export default class osHeroCountUp extends OmniscriptBaseMixin(LightningElement) {
 
    @track _isRendered = false
    @track stat1
    @track stat2
    @track stat3
    @track stat4
    @track color
    @track ch

      connectedCallback() {
        // Call omniUpdateDataJson to update the omniscript
        // this.omniUpdateDataJson({'key':'value'});
        if (this._isRendered) return;
        this._isRendered = true;
        loadScript(this, COUNT_UP)
            .then(() => {
                this.initializeCountUp();
            })
            .catch(error => {
                this.error = error;
            });
        }

        initializeCountUp() {
            console.log("Values passed to custom lwc");
            console.log(JSON.stringify(this.omniSeedJson));
            console.log("this.omniJsonDef");
            console.log(JSON.stringify(this.omniJsonDef));
            if (this.omniSeedJson !== undefined) { 
                // KL-Approach I'm using is to use SetValues to pass variables from the OS to the LWC
                this.elementName = this.omniJsonDef.name; 
                this.stat1 = this.omniSeedJson[this.elementName].stat1;
                this.stat2 = this.omniSeedJson[this.elementName].stat2;
                this.stat3 = this.omniSeedJson[this.elementName].stat3;
                this.stat4 = this.omniSeedJson[this.elementName].stat4;
                //this.color = this.omniSeedJson[this.elementName].color;
                //this.ch = this.hexToRgb(this.color,0.5);
                //console.log(JSON.stringify(this.ch));
            }
            else {
                // If no values have be supplied, then use sample data. Should help display the control in LWC Designer
                this.stat1 = 1000;
                this.stat2 = 2000;  
                this.stat3 = 3000;
                this.stat4 = 4000;

            }
            const el = this.template.querySelector('.stat1');
            const el2 = this.template.querySelector('.stat2');
            const el3 = this.template.querySelector('.stat3');
            const el4 = this.template.querySelector('.stat4');

            const numAnim = new CountUp(el, 0, this.stat1, 0, 2);
            numAnim.start();
            const numAnim2 = new CountUp(el2, 0, this.stat2, 0, 3);
            numAnim2.start();
            const numAnim3 = new CountUp(el3, 0, this.stat3, 0, 2);
            numAnim3.start();
            const numAnim4 = new CountUp(el4, 0, this.stat4, 0, 3);
            numAnim4.start();

        }
    }