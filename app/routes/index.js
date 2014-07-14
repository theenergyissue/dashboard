
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.tumblr = function(req, res){

  req.locals.tumblrClient.userInfo(function (err, data) {
    data.blogs.forEach(function (blog) {
        console.log(blog.name);
    });

    res.render('tumblr', { title: 'Tumblr', blog: data.blogs[0]});
  });


}
