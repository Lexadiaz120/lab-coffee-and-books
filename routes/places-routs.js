const router = require("express").Router(); 
const place = require('./../models/place');  
router.get('/create' , (req , res , next ) => {
  res.render('./places/create-form');
}) 




 

router.get('/list', (req, res, next) => {
    place
        .find() 
        .then(places => res.render('./places/list', { places}))
        .catch(err => console.log(err));


})




router.post('/create', (req, res, next) => {
    const {name, type} = req.body;    
    place 
    .create({name, type}) 
        .then( res.redirect('/places/list'))
       .catch(err => console.log(err));
})

 
 

router.get('/edit', (req, res, next) => {
    const { place_id } = req.query; 
    console.log(place_id);
    place.
        findById(place_id)
        .then(places => res.render('./places/edit-place-form', places));
})




    router.post('/edit/:id', (req, res, next) => {
      const {id} =  req.params; 
      const {name , type }  = req.body; 

      place
        .findByIdAndUpdate(id, {name, type} , {new: true})  
        .then( res.redirect('/places/list')) 
        .catch(err => console.log(err)); 
    })

 

router.get('/delete-place', (req, res) => {

    const placeId = req.query.place_id

    place
        .findByIdAndDelete(placeId)
        .then(() => res.redirect('/places/list'))
        .catch(err => console.log(err))
})







module.exports =  router;
