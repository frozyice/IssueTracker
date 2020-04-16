const Item = require('../models/item');

//https://stackoverflow.com/questions/6982692/how-to-set-input-type-dates-default-value-to-today
Date.prototype.timeNowOffset = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset()+60);
    return local.toJSON().slice(0,16);
});



exports.getAdminPage = (req, res) => {
    Item.getItems((items)=>{
        res.render('admin', {
        pageTitle: 'Issues List',
        items: items,
        timeNowOffset: new Date().timeNowOffset(),
        path: '/admin'
        });
    });
};

exports.completeItem = (req, res) => {
    const item = new Item(req.params.id);
    item.removeItem();
    res.redirect('/admin');
    
};