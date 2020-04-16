const Item = require('../models/item');

//https://stackoverflow.com/questions/6982692/how-to-set-input-type-dates-default-value-to-today
Date.prototype.timeNow = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,16);
});

exports.getIndex = 
    (req, res) => {
    res.render('index', {
        pageTitle: "Add new Issue",
        timeNow: new Date().timeNow(),
        path: "/"
    });
}

exports.postAddItem = (req, res) => {
    const item = new Item(null, req.body.itemDesc, req.body.itemResolveDate);
    item.saveItem();
    res.redirect('/');
}
