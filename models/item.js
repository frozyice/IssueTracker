const fs = require('fs');
const path = require('path');

const dataPath = path.join(path.dirname(process.mainModule.filename),
    'data',
    'item.json'        
    );

//https://stackoverflow.com/questions/6982692/how-to-set-input-type-dates-default-value-to-today
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,16);
});

//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
       return 0;  
    }  
 }

const getItemsFromFile = (callBack) => {
    fs.readFile(dataPath, (error, fileContent) => {
        if(error){
            return callBack([]);
        }
        callBack(JSON.parse(fileContent));
    });
}

//Model
module.exports = class Item {
    constructor(id, itemDesc, itemResolveDate){
        
        if(id===null){
            this.id = create_UUID();
        } else {
            this.id = id;
        }
        this.itemDesc = itemDesc;
        this.itemResolveDate = itemResolveDate;
        this.itemDateCreated = new Date().toDateInputValue();
    }

    saveItem() {
        getItemsFromFile(items => {
            items.push(this);
            items.sort(sortByProperty('itemResolveDate'));
            fs.writeFile(dataPath, JSON.stringify(items), (error) => {
                console.log(error);
            });
        });
       
    };

    removeItem() {
        getItemsFromFile(items => {
            items.forEach(item => {
                if (item.id===this.id){
                    items.splice(items.indexOf(item), 1);
                }
            });

            fs.writeFile(dataPath, JSON.stringify(items), (error) => {
                console.log(error);
            });
        });
       
    };

    static getItems(callBack){
        getItemsFromFile(callBack);
    };
}