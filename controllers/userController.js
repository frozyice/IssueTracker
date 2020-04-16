const Item = require('../models/item');

exports.getIndex = 
    (req, res) => {
    res.render('index', {
        pageTitle: "Add new Issue",
        path: "/"
    });
}

exports.postAddItem = (req, res) => {
    const item = new Item(req.body.itemDesc, req.body.itemResolveDate);
    item.saveItem();
    res.redirect('/');
}
