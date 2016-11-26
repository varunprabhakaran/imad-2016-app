var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');


var config = {
    user: 'varunprabhakaran',
    database: 'varunprabhakaran',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

//Category
function createCategory (){
	var catTemplate =`
	<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>My Blog</title>
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<!-- Own Styles-->
<link rel="stylesheet" href="css/style.css">
   
    
</head>

<body>

<div class="container-fluid header">
	<div class="container">
    	<div class="col-lg-12">
        	<h1 style="text-align:center;">ProClix</h1>
        </div>
    </div>
</div>

<!-- Container Starts Here-->
<div class="container">
  
  <div class="row pad_bot">
    <!--Col-8 Starts Here-->
	<div align="center" class="pad_top">
    	<a href="/" class="btn">Home</a>
	</div>

    
    <!--Category-->
          <div id="category">
          
          </div>
    <!--Ends Here-->
    
    
    <!-- Col-8 Ends Here-->
    
    <!--Col-4 Starts Here-->
    <div class="col-lg-4 col-md-4 col-sm-12">
      
      <div class="col-lg-12 pad_bot">
        <h3 class="title" style="margin-top: 0px;">ABOUT AUTHOR</h3>
        <div align="center"> <img src="images/one.jpg" class="img-responsive"> </div>
        <div align="center">
          <h4 class="about-me" align="center">JAYA SURYA</h4>
        </div>
        
        <div align="center">
        	<p>Have seasons lesser under them saw his let so itself one, fourth subdue. Fly third blessed dry fifth dominion two called their for which in dry unto winged great saw.</p>
            <a href="#" class="abt-me">ABOUT ME</a>
        </div>
      
      <!--Login-->
      <div id="login_area">
      </div>
        
      </div>
      
      
      
      
      <!--Latest Posts Starts Here-->
      
      <div class="col-lg-12 col-sm-8 col-md-12 col-xs-12">

		<div id="latest-posts">
        </div>
                
      </div>
      <!--Latest Post Ends Here-->
      
      <!--Category Starts Here-->
      <div class="col-lg-12 col-sm-4 col-md-12 col-xs-12">
      		<h3 class="title pad_top_5 pad_no" style="margin-top: 0px;font-weight:600;">CATEGORIES</h3>
            
            <div id="get-cat">
			</div>
            
      </div>
      <!--Category Ends here-->
      
      
    </div>
    <!--Col-4 Ends Here-->
    
  </div>
</div>
<!--Container Ends Here-->

<!-- Container Fluid Starts-->
<div class="footer">
<div class="container">
<!-- Footer Starts Here-->
    <div class="col-lg-12 footer col-sm-12">
    	
        <div class="col-lg-4 col-sm-4">
        	<h3 class="foot_head title">About Me</h3>
            
            <div class="col-lg-12" align="center">
            	
            	<img src="images/test.jpg" class="img-circle">
                <p>Jayasurya</p>
                
                <p>Email: <a href="#">jayasuryas06@gmail.com</a></p>
                <p>Mob.No: 9894685416</p>
                
            </div>
            
        </div>
        <!--Popular Posts-->
        <div class="col-lg-4 col-sm-4">
      		<div id="pop-posts">
            </div>
            
        </div>
        <!--Popular Posts Ends Here-->
        
        <div class="col-lg-4 col-sm-4 col-xs-12">
        	<h3 class="foot_head title">Keep In Touch</h3>
            
           <a class="twitter-timeline" data-width="500" data-height="250" href="https://twitter.com/s_jayasurya">Tweets by s_jayasurya</a> <script async src="//<strong>platform.twitter.com/widgets.js</strong>" charset="utf-8"></script>
          
          
               <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script> 
          
        </div>
        
        <!--CopyRight starts Here-->
        <div align="center" class="col-lg-12 pad_top_5 col-sm-12 col-xs-12">
        	<p>&copy; MyBlog. All Rights Reserved. Designed By <strong>Varun</strong>.</p>
        </div>
        <!--CopyRight Ends Here-->        
        
    </div>
    <!--Footer Ends Here-->
</div>
</div>
<!-- Container Fluid Ends-->

<script type="text/javascript" src="/ui/main.js"></script>

</body>
</html>

	
	
	 `;

	return catTemplate;
}

//Article 
function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
	var img = data.img;
	var category = data.category;
    
    var htmlTemplate = `
	
	<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>My Blog</title>
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<!-- Own Styles-->
<link rel="stylesheet" href="css/style.css">
   
   
</head>

<body>

<!-- Container Starts Here-->
<div class="container">
  <div class="row">  
    <div class="col-lg-12 header col-md-12 col-sm-12 col-xs-12">
    	<div class="col-lg-offset-5 col-lg-2 col-lg-offset-5 col-md-offset-5 col-md-3 col-sm-offset-5 col-sm-3">
      <a href="/" style="color:#FFF;"><h1>My Blog</h1></a>
      </div>
    </div>
    
  </div>
  <div class="row pad_bot">
    <!--Col-8 Starts Here-->
    <div class="col-lg-8 col-md-8 col-sm-12">
	<div align="center" class="pad_top">
    	<a href="/" class="btn">Home</a>
	</div>
        <div class="cat_title">
          <p><b class="cat">${category}</b> / Nov 2,2016.</p>
          <h3>${heading}</h3>
        </div>
        <!-- To Align the image to the center-->
        <div align="center" class="pad_bot">
        <img src="ui/images/two.jpg" class="img-responsive">
        </div>
        
        <p class="para">${content}</p>
        
        <!-- Border-->
        <div class="border"></div>
		
		<!--Comment-->
		<h4>Comments</h4>
		  <div id="comment_form">
		  </div>
		  <div id="comments">
			<center>Loading comments...</center>
		  </div>

        
    </div>
    <!-- Col-8 Ends Here-->
    
    <!--Col-4 Starts Here-->
    <div class="col-lg-4 col-md-4 col-sm-12">
      
      <div class="col-lg-12 pad_bot">
        <h3 class="title">ABOUT AUTHOR</h3>
        <div align="center"> <img src="ui/images/one.jpg" class="img-responsive"> </div>
        <div align="center">
          <h4 class="about-me" align="center">JAYA SURYA</h4>
        </div>
        
        <div align="center">
        	<p>Have seasons lesser under them saw his let so itself one, fourth subdue. Fly third blessed dry fifth dominion two called their for which in dry unto winged great saw.</p>
            <a href="#" class="abt-me">ABOUT ME</a>
        </div>
        
      </div>
      
      <!--Latest Posts Starts Here-->
      <div id="latest-posts">
      </div>

      <!--Latest Post Ends Here-->
      
      <!--Category Starts Here-->
      <div class="col-lg-12 col-md-12 col-sm-4 col-xs-12">
      		<h3 class="title pad_top_5" style="margin-top: 0px;font-weight:600;">CATEGORIES</h3>
            
           <div id="get-cat">
		   </div>
            
      </div>
      <!--Category Ends here-->
      
      
    </div>
    <!--Col-4 Ends Here-->
    
  </div>
</div>
<!--Container Ends Here-->

<!-- Container Fluid Starts-->
<div class="footer">
<div class="container">
<!-- Footer Starts Here-->
    <div class="col-lg-12 footer col-sm-12">
    	
        <div class="col-lg-4 col-sm-4">
        	<h3 class="foot_head title">About Me</h3>
            
            <div class="col-lg-12" align="center">
            	
            	<img src="ui/images/test.jpg" class="img-circle">
                <p>Jayasurya</p>
                
                <p>Email: <a href="#">jayasuryas06@gmail.com</a></p>
                <p>Mob.No: 9894685416</p>
                
            </div>
            
        </div>
        
        <!--Popular Posts-->
        <div class="col-lg-4 col-sm-4">
      		<div id="pop-posts">
            </div>
            
        </div>
        <!--Popular Posts Ends Here-->
        
        <div class="col-lg-4 col-sm-4 col-xs-12">
        	<h3 class="foot_head title">Keep In Touch</h3>
            
           <a class="twitter-timeline" data-width="500" data-height="250" href="https://twitter.com/s_jayasurya">Tweets by s_jayasurya</a> <script async src="//<strong>platform.twitter.com/widgets.js</strong>" charset="utf-8"></script>
          
          
               <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script> 
          
        </div>
        
        <!--CopyRight starts Here-->
        <div align="center" class="col-lg-12 pad_top_5 col-sm-12 col-xs-12">
        	<p>&copy; MyBlog. All Rights Reserved. Designed By <strong>Varun</strong>.</p>
        </div>
        <!--CopyRight Ends Here-->        
        
    </div>
    <!--Footer Ends Here-->
</div>
</div>
<!-- Container Fluid Ends-->
<script type="text/javascript" src="/ui/article.js"></script>
<script type="text/javascript" src="/ui/main.js"></script>

</body>
</html>

    `;
    return htmlTemplate;
}




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});

app.get('/ui/img/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', req.params.fileName));
});

//For My Code
app.get('/ui/images/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', req.params.fileName));
});

app.get('/ui/css/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', req.params.fileName));
});

app.get('/ui/js/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js', req.params.fileName));
});



//For Article
app.get('/articles/ui/js/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js', req.params.fileName));
});

app.get('/articles/css/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', req.params.fileName));
});

app.get('/articles/ui/images/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', req.params.fileName));
});

app.get('/articles/:filename/ui/images/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', req.params.fileName));
});

app.get('/category/css/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', req.params.fileName));
});

app.get('/category/js/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js', req.params.fileName));
});

app.get('/category/images/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', req.params.fileName));
});

app.get('/category/ui/images/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', req.params.fileName));
});

var pool = new Pool(config);

app.get('/get-articles', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM article ORDER BY date DESC', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

//latest articles
app.get('/latest-articles', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM article ORDER BY date DESC LIMIT 4', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});


//Popular Posts
app.get('/pop-articles', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM article ORDER BY RANDOM() DESC LIMIT 4', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});


app.get('/articles/:articleName', function (req, res) {

  // SELECT * FROM article WHERE title = '\'; DELETE WHERE a = \'asdf'
  pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    }
  });
});

app.get('/category/:categoryName', function (req, res) {
      res.send(createCategory());
//        res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/cat/:categoryName', function (req, res) {
	
  // SELECT * FROM article WHERE title = '\'; DELETE WHERE a = \'asdf'
  pool.query("SELECT * FROM article WHERE category = $1", [req.params.categoryName], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            res.send(JSON.stringify(result.rows));
        }
    }
  });
});

//For Category Listing in Side bar
app.get('/get-categories', function (req, res) {
	pool.query("SELECT DISTINCT category FROM article", function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            res.send(JSON.stringify(result.rows));
        }
    }
  });
});

//Posting Comments
app.get('/get-comments/:articleName', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT comment.*, "user".username FROM article, comment, "user" WHERE article.title = $1 AND article.id = comment.article_id AND comment.user_id = "user".id ORDER BY comment.timestamp DESC', [req.params.articleName], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.post('/submit-comment/:articleName', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from article where title = $1', [req.params.articleName], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Article not found');
                } else {
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comment (comment, article_id, user_id) VALUES ($1, $2, $3)",
                        [req.body.comment, articleId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!')
                            }
                        });
                }
            }
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});


//Login
function hash (input, salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

app.post('/create-user', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});

app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                // Set the session
                req.session.auth = {userId: result.rows[0].id};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/logout', function (req, res) {
   delete req.session.auth;
   //res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
   res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
