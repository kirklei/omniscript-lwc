import { LightningElement,track,api } from 'lwc';
    import { OmniscriptBaseMixin } from 'vlocity_cmt/omniscriptBaseMixin';
    export default class a_lwc_selectable_items extends OmniscriptBaseMixin(LightningElement) {
    // Kirk Leibert - Vlocity
    // Questions -> kleibert@vlocity.com      
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
     //this.omniJsonDef.name
        let tempRows = [];
        tempRows = JSON.parse(JSON.stringify(this.omniJsonData[this.omniJsonDef.name]));
        //tempRows = JSON.parse(JSON.stringify(this.omniSeedJson[this.omniJsonDef.name].vals));
        
        tempRows.forEach((item, i) => {
           item.tagname = "cb_" + i;
           item.rowid = i;
           item.checked = false;
           item.filtered = false;
        });
        tempRows.forEach((item, i) => {
            this.displayRows.push(item);
        });
        // use this code for 107.1 and above
        this.vals = this.omniJsonData[this.omniJsonDef.name];
        //this.cols = this.omniJsonData[this.omniJsonDef.name].cols;
        // use this code for 107 and below
        //this.vals = this.omniSeedJson[this.omniJsonDef.name].vals;
        //this.cols = this.omniSeedJson[this.omniJsonDef.name].cols;      

        console.log("omniJsonData");
        console.log(JSON.stringify(this.omniJsonData));
        console.log("omniJsonDef");
        console.log(JSON.stringify(this.omniJsonDef));
        console.log("omniSeedJson");
        console.log(JSON.stringify(this.omniSeedJson));
        //console.log(JSON.stringify(this.vals));
        //console.log(JSON.stringify(this.cols));
        console.log(JSON.stringify(this.displayRows));
   }

    filterSelectedFromList(list) {
        const filteredList = list.filter(
            checked = true
        );
        return filteredList
    }

    selectRow(event) {        
        const selected = event.target.checked;
        const target = event.target.name;
        const iteration=parseInt(target.substring(3,target.length));
        this.displayRows[iteration].checked = selected;
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
        this.selectRow(event);
        this.omniUpdateDataJson(this.getRows());
    }
}