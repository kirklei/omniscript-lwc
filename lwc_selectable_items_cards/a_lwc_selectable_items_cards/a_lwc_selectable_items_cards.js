import { LightningElement,track,api } from 'lwc';
    import { OmniscriptBaseMixin } from 'vlocity_cmt/omniscriptBaseMixin';
    export default class a_lwc_selectable_items_cards extends OmniscriptBaseMixin(LightningElement) {
    @track previousitem = -1;
    @track selecteditem;
    @track data = {};
    @track vals = [];
    @track cols = [];
    @track displayRows = [];
    @api title = '';
    @api multiselect;

    connectedCallback() {
        console.log('SITest');
        this.initMethod();
    }
   
    initMethod() {
        let tempRows = [];
        tempRows = JSON.parse(JSON.stringify(this.omniJsonData[this.omniJsonDef.name]));
        /* 
        ** v.106 only
        ** next  lines
        */
        //tempRows = JSON.parse(JSON.stringify(this.omniSeedJson[this.omniJsonDef.name].vals));
        
        tempRows.forEach((item, i) => {
           item.index = i+1;
           item.checked = false;
           item.cssclass = "product-card";
        });
        tempRows.forEach((item, i) => {
            this.displayRows.push(item);
        });
        
        this.vals = this.omniJsonData[this.omniJsonDef.name];
        //this.cols = this.omniJsonData[this.omniJsonDef.name].cols;
        
        /* 
        ** v.106 only
        ** next two lines
        */

        //this.vals = this.omniSeedJson[this.omniJsonDef.name].vals;
        //this.cols = this.omniSeedJson[this.omniJsonDef.name].cols;      

        /*     
        console.log("omniJsonData");
        console.log(JSON.stringify(this.omniJsonData));
        console.log("omniJsonDef");
        console.log(JSON.stringify(this.omniJsonDef));
        console.log("omniSeedJson");
        console.log(JSON.stringify(this.omniSeedJson));
        console.log(JSON.stringify(this.vals));
        console.log(JSON.stringify(this.cols));
        console.log(JSON.stringify(this.displayRows));
        */


   }

    getListFromMap () {
        // to be implemented later
    }

    filterSelectedFromList(list) {
        const filteredList = list.filter(
            checked = true
        );
        return filteredList
    }

    selectRow(event) {        
        this.selecteditem = event.currentTarget.dataset.item - 1;
        if (this.selecteditem == this.previousitem) {
            console.log("#Same row selected");
        }
        else {
            console.log("#Select new row, deselect old row");
            this.displayRows[this.selecteditem].checked = true;
            this.displayRows[this.selecteditem].cssclass = "product-card-best";
            if (this.previousitem > -1) { 
                this.displayRows[this.previousitem].checked = false
                this.displayRows[this.previousitem].cssclass = "product-card";
            } 
        }

        console.log("selected item");
        console.log(this.selecteditem);
        console.log(JSON.stringify(event.currentTarget.dataset));
        this.previousitem = this.selecteditem;
    }

    getRows() {
        let data = [];
        let filtered = [];
        data = this.displayRows;
        filtered = data.filter(function(item){
            return item.checked == true;
        });
        return filtered;
    }

    handleSelection(event) {
        console.log("handleSelection");
        this.selectRow(event);
        this.omniUpdateDataJson(this.getRows());
    }
}