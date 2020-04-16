const Item = require('../models/item');

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset()); //-60
    return local.toJSON().slice(0,16);
});

exports.getAdminPage = (req, res) => {
    Item.getItems((items)=>{
        res.render('admin', {
        pageTitle: 'Issues List',
        items: items,
        timeNow: new Date().toDateInputValue(),
        path: '/admin'
        });
    });
};
