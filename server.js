var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

/*    user: 'varunprabhakaran',
    database: 'varunprabhakaran',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: 'db-varunprabhakaran-39636'*/

var config = {
    user: 'varunprabhakaran',
    database: 'varunprabhakaran',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: 'db-varunprabhakaran-39636'
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));


var pool = new Pool(config);



app.get('/test', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM article', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result));
      }
   });
});


//Func for Portfolio
function createProfil (){
	var Profile = `
	<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Profile</title>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <link rel="stylesheet" href="css/myprofile.css">


    <!--Font-awesome cdn-->
<!--    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">-->

  </head>
  <body>

<!--Container TSarts Here-->
<div class="container-fluid text-center home-bg" style="padding-top: 12%;padding-bottom: 13.5%;">

        <img src="images/avatar.jpg" class="img-circle">
        <h1> <small style="color: #FFF !important;">Varun Prabhakaran</small></h1>
        <h4 class="caps"><small>Freelancer / Web Designer</small></h4>


      <div class="social">
        <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>&nbsp;&nbsp;
        <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>&nbsp;&nbsp;
        <a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
      </div>

</div>

<!-- Container Ends Here-->

<!--Section 2 Starts here-->

<section class="col-1">
<div class="container-fluid">
  <div class="col-lg-12 pad-top-bot-25">
    <h2 style="border-bottom:1px solid green;"> <small>Education</small></h2>
  </div>

  <!--Cont-1-->
  <div class="col-lg-12 pad-top-bot-25">
  <div class="col-lg-3 pad-top-25">
    <p>2000-2011<br>
SSLC</p>
  </div>
  <div class="col-lg-9 border-left">
    <h2>St.Joseph’s Mat.Hr. Sec.School.</h2><br>
  </div>
  </div>

  <!--Cont-2-->
  <div class="col-lg-12 pad-top-bot-25">
  <div class="col-lg-3 pad-top-25">
    <p>2011-2013<br>
Master Degree</p>
  </div>
  <div class="col-lg-9 border-left">
    <h2>St.Joseph’s Mat.Hr. Sec.School.</h2><br>
   </div>
  </div>

  <!--Cont-3-->
  <div class="col-lg-12 pad-top-bot-25">
  <div class="col-lg-3 pad-top-25">
    <p>2013-2018<br>
Master Degree</p>
  </div>
  <div class="col-lg-9 border-left">
<h2>Sri Krishna Arts and Science College.</h2><br>  
  </div>
  </div>


</div>
</section>

<section class="sec1-bg">
  <div class="container-fluid">
	
   <div style="padding:25%;" >
   <div class="progress">
    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="73" aria-valuemin="0" aria-valuemax="100" style="width:73%">
      73% Complete (success)
    </div>
  </div>
  <br>
  <div class="progress">
    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="73" aria-valuemin="0" aria-valuemax="100" style="width:73%">
      73% Complete (success)
    </div>
  </div>
  <br>
  <div class="progress">
    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="73" aria-valuemin="0" aria-valuemax="100" style="width:73%">
      73% Complete (success)
    </div>
  </div>
  </div>
 </div> 
      
</section>

<!--Section 2 ends here-->

<!--Section 3 starts here-->

<section class="col-2">
<div class="container-fluid">
  <div class="col-lg-12 pad-top-bot-25">
    <h2 style="border-bottom:1px solid green;"> <small>CO-CURRICULAR ACTIVITIES</small></h2>
  </div>

  <!--Cont-1-->
  <div class="col-lg-12 pad-top-bot-25">
  <div class="col-lg-3 pad-top-25">
  	<p>Poster Presentation</p>
  </div>
  <div class="col-lg-9 border-left">
    <h5>Presented a poster on “Computer Technology”in theNational Conference
(NCCTC’13) organized by Sri Krishna College Coimbatore.</h5><br>
  </div>
  </div>

  <!--Cont-2-->
  <div class="col-lg-12 pad-top-bot-25">
  <div class="col-lg-3 pad-top-25">
  	<p>Journal Publication</p>
  </div>
  <div class="col-lg-9 border-left">
	<h5>Published a paper on “Bio- Nano robotics : The Milestone of Nanotechnology and
Medicine” in the Internationaljournal of Advanced Research in Computer
Science (ISSN No. 0976-569).</h5>
   </div>
  </div>

  <!--Cont-3-->
  <div class="col-lg-12 pad-top-bot-25">
  <div class="col-lg-3 pad-top-25">
  	<p>Journal Publication</p>
  </div>
  <div class="col-lg-9 border-left">
	<h5>Published a paper on “Human Pose Recognition by Single Depth Image”in the
National Conference on Recent Trends in Computer Technology(NCRTCT’15).</h5>
  </div>
  </div>


</div>
</section>

<section class="sec2-bg">
  <div class="container-fluid">
	
    <div align="center" style="padding-top:30%;">
    <h1>Im Looking For A Job</h1>
    <a href="#" class="btn btn-black">Hire Me</a>
    </div>
   
 </div> 
</section>

<!--Section 3 ends here-->

<!--Section 4 starts here-->

<section class="col-aca-2">
  <div class="container-fluid">

	<div class="col-lg-12 pad-top-bot-25">
    <h2 style="border-bottom:1px solid green;"> <small>ACADEMIC PROJECT - II</small></h2>
    <div style="padding:20px 10px;">
    <h4 style="padding:20px;">CRIME MANAGEMENT SYSTEM</h4>
    <p><blockquote style="font-size:16.5px;padding-left:20px;margin:0px 25px !important;">The main idea behind developing this project is to provide an application for police
department to manage criminal details. This app provides a facility for reporting crimes,
complaints and easy access to the public in a computerized manner.</blockquote></p>
    </div>
  </div>	

 </div> 
</section>

<section class="col-aca-1">
<div class="container-fluid">
  <div class="col-lg-12 pad-top-bot-25">
    <h2 style="border-bottom:1px solid green;"> <small>ACADEMIC PROJECT - I</small></h2>
    <div style="padding:20px 10px;">
    <h4 style="padding:20px;">DISCOVERING EMERGING TOPIC IN SOCIAL NETWORKS</h4>
    <p><blockquote style="font-size:16.5px;padding-left:20px;margin:0px 25px !important;">This project focus on emergence of topic signaled by social aspects of these networks.This project propose a probability model of the mentioning behavior of the user, and propose to detect the emergence of a new topic from anomalies measured through the model.</blockquote></p>
    </div>
  </div>
</div>
</section>

<!--Section 4 ends here-->
<div class="clearfix"></div>
<!--Section 5 starts here-->
<section class="col-1">
<div class="container-fluid">
  
  <div class="col-lg-12 pad-top-bot-25">
    <h2 style="border-bottom:1px solid green;"> <small>TECHNICAL SKILLS</small></h2>
    <div style="padding:20px 10px;">
    <h4 style="padding:20px;">LANGUAGE</h4>
	<blockquote style="font-size:16.5px;padding-left:20px;margin:0px 25px !important;">
        <ul>
            <li style="list-style:none !important;padding:10px;">C</li>
            <li style="list-style:none !important;padding:10px;">C++</li>
            <li style="list-style:none !important;padding:10px;">HTML 5</li>
            <li style="list-style:none !important;padding:10px;">CSS</li>
            <li style="list-style:none !important;padding:10px;">BOOTSTRAP</li>
            <li style="list-style:none !important;padding:10px;">NODE JS</li>
        </ul>
  	</blockquote>
    </div>
  </div>


</div>
</section>

<section class="sec1-bg">
  <div class="container-fluid">
	
   <div style="padding:15%;" >
   <div class="progress">
    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="73" aria-valuemin="0" aria-valuemax="100" style="width:65%">
     65% - C Language
    </div>
  </div>
  <br>
  <div class="progress">
    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="73" aria-valuemin="0" aria-valuemax="100" style="width:60%">
      60% - C++ Language
    </div>
  </div>
  <br>
  
  <div class="progress">
    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="73" aria-valuemin="0" aria-valuemax="100" style="width:62%">
      62% - HTML
    </div>
  </div>
  <br>
  
  <div class="progress">
    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="73" aria-valuemin="0" aria-valuemax="100" style="width:60%">
      60% - CSS
    </div>
  </div>
  <br>
  
  <div class="progress">
    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="73" aria-valuemin="0" aria-valuemax="100" style="width:60%">
      60% - BOOTSTRAP
    </div>
  </div>
  <br>
  
  <div class="progress">
    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="73" aria-valuemin="0" aria-valuemax="100" style="width:30%">
      30% - NodeJs
    </div>
  </div>
  
  </div>
 </div> 
      
</section>

<!--Section 5 ends here-->
<div class="clearfix"></div>
<!--Footer starts here-->
<div class="container-fluid footer-background">
	
    <div class="col-lg-12">
    	<div align="center">
        	<p>Designed By Varun</p>
        </div>
    </div>
    
</div>
<!--Footer ends here-->

  </body>
</html>

	`;
	return Profile;
}


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
          <p><a href="/category/${category}"><b class="cat">${category}</b></a> / Nov 2,2016.</p>
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

//about-profile
app.get('/about/profile', function (req, res) {
	res.send(createProfil());
});

app.get('/about/images/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', req.params.fileName));
});

app.get('/about/css/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', req.params.fileName));
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

app.get('/images/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', req.params.fileName));
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
   pool.query('SELECT * FROM article ORDER BY date DESC LIMIT 6', function (err, result) {
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
