// create a reference to the model
let CarModel = require('../models/car');

// Gets all cars from the Database and renders the page to list them all.
module.exports.carList = function(req, res, next) {  
    CarModel.find((err, carsList) => {
        console.log(carsList);
        if(err) {
            return console.error(err);
        }
        else {
            res.render('cars/list', {
                title: 'Cars List', 
                CarsList: carsList,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
}


// Gets a car by id and renders the details page.
module.exports.details = (req, res, next) => {
    let id = req.params.id;

    CarModel.findById(id, (err, carToShow) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('cars/details', {
                title: 'Car Details', 
                car: carToShow,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    let newItem = CarModel();
    
    res.render('cars/add_edit', {
        title: 'Add a New Car',
        car: newItem,
        userName: req.user ? req.user.username : ''
    });
}

// Processes the data submitted from the Add form to create a new car
module.exports.processAddPage = (req, res, next) => {

    let newItem = CarModel({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        kilometers: req.body.kilometers,
        doors: req.body.doors,
        seats: req.body.seats,
        color: req.body.color,
        price: req.body.price
    });

    CarModel.create(newItem, (err, item) => {
        if(err) {
            res.end(err);
        }
        else {
            res.redirect('/cars/list');
        }
    });
}

// Gets a car by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    CarModel.findById(id, (err, itemToEdit) => {
        if(err) {
            res.end(err);
        }
        else {
            res.render('cars/add_edit', {
                title: "Edit Car",
                car: itemToEdit,
                userName: req.user ? req.user.username : ''
            });
        }
    });
}

// Processes the data submitted from the Edit form to update a car
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedItem = CarModel({
        _id: req.body.id,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        kilometers: req.body.kilometers,
        doors: req.body.doors,
        seats: req.body.seats,
        color: req.body.color,
        price: req.body.price
    });
    
    CarModel.updateOne({_id: id}, updatedItem, (err) => {
        if (err) {
            res.end(err);
        }
        else {
            res.redirect('/cars/list')
        }
    });
}

// Deletes a car based on its id.
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    CarModel.remove({_id: id}, (err) => {
        if(err) {
            res.end(err);
        }
        else {
            res.redirect('/cars/list');
        }
    });
}