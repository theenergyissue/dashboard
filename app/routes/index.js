
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.tumblr = function(req, res){
  res.render('tumblr', { title: 'Tumblr'});
}
