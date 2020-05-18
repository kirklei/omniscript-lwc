import { LightningElement,track,api } from 'lwc';
    import { OmniscriptBaseMixin } from 'c/omniscriptBaseMixin';
    export default class osHeroComponent extends OmniscriptBaseMixin(LightningElement) {
      
    @track
    line1 
    @track
    line2 
    @track
    line3 
    @track
    imageFile 
    @track
    color
    @track
    ch;
    @track 
    css
    @track
    elementName

    // function used to generate dynamic CSS that contains image  name variable
   get backgroundImageFunction(){
        this.css = "background: linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)), url('" + this.imageFile + "')";
            if (this.color !== undefined) {  
         /*             this.ch = this.hexToRgb(this.color);
                      this.css = "background: linear-gradient(to right, rgba(0, 0, 200, 0.4), rgba(0, 0, 200, 0.4)), url('" + this.imageFile + "')";
         */
             this.css = "background: linear-gradient(to right, rgba("+this.ch.r+","+this.ch.g+","+this.ch.b +" , "+this.ch.opacity+"), rgba("+this.ch.r+","+this.ch.g+","+this.ch.b +" , "+this.ch.opacity+")), url('" + this.imageFile + "');filter: grayscale(100%);mix-blend-mode: screen;";
             console.log("css");
             console.log(this.css);

            }
            return this.css;
        
    }   

    hexToRgb(hex,opacity) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            opacity
        } : null;
    }

    connectedCallback() {
        console.log("Values passed to custom lwc");
        console.log(JSON.stringify(this.omniSeedJson));
        if (this.omniSeedJson !== undefined) { 
            // KL-Approach I'm using is to use SetValues to pass variables from the OS to the LWC
            this.elementName = this.omniJsonDef.name; 
            this.line1 = this.omniSeedJson[this.elementName].line1;
            this.line2 = this.omniSeedJson[this.elementName].line2;
            this.line3 = this.omniSeedJson[this.elementName].line3;
            this.imageFile = this.omniSeedJson[this.elementName].image;
            this.color = this.omniSeedJson[this.elementName].color;
            this.ch = this.hexToRgb(this.color,0.5);
            console.log(JSON.stringify(this.ch));
        }
        else {
            // If no values have be supplied, then use sample data. Should help display the control in LWC Designer
            this.line1 = "Health Insurance";
            this.line2 = "Turn your love into their<br/> secure future.";  
            this.line3 = "October is Health Insurance Awareness Month.<br/> Is your family covered?";
            this.imageFile = "https://vlclwcsc-dev-ed--vlclwcsc.visualforce.com/resource/1570471279000/vlclwcsc__HeroBackground1";
        }

    }
}