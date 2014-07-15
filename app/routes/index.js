
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.tumblr = function(req, res){

  console.log('index.tumblr');

    res.render('tumblr', { title: 'Tumblr', blog: 'test'});



}
