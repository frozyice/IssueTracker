const Item = require('../models/item');

exports.getAdminPage = (req, res) => {
    Item.getItems((items)=>{
        res.render('admin', {
        pageTitle: 'Issues List',
        items: items,
        path: '/admin'
        });
    });
};
