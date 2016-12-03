var categoryName = window.location.pathname.split('/')[2];

function loadLoginForm () {
    var loginHtml = `
        <h3>Login/Register</h3>
		<div clss="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		<div class="form-group">
        <input type="text" class="form-control" id="username" placeholder="Username" />
		</div>
		<div class="form-group">
        <input type="password" class="form-control" id="password" placeholder="Password" />
		</div>
        
        <input type="submit" class="btn btn-success" id="login_btn" value="Login" />
        <input type="submit" class="btn btn-primary" id="register_btn" value="Register" />
		</div>
        `;
    document.getElementById('login_area').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Logged in Successfully!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again!';
  				  alert("Invalid credentials. Try again!");
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
				  alert("Something went wrong on the server");
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout" class="btn btn-danger">Logout</a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

//Func for Article 
function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
//                var content = '<ul>';
				var content = '<div class="col-lg-8 col-md-8 col-sm-12">';
                var articleData = JSON.parse(this.responseText);
				
                for (var i=0; i< articleData.length; i++) {
                   
				   content += `
				         <div class="col-lg-6 pad_bot col-sm-6"> <img src="${articleData[i].img}" class="img-responsive">
        <div class="cat_title">
          <p><b class="cat">${articleData[i].category}</b> / (${articleData[i].date.split('T')[0]})</p>
          <h3>${articleData[i].heading}</h3>
        </div>
        <p class="para">${articleData[i].content.substring(3, 150)}</p>
        <a href="/articles/${articleData[i].title}" class="view">view more</a> </div>
				   
				   `;
				
                }
				  content += "</div>";
  //              content += "</ul>"
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}


//Func for category 
function loadCategory () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var article = document.getElementById('category');
            if (request.status === 200) {
//                var content = '<ul>';
//				alert("Test");
				var a = 5;
				var content = `<div class="col-lg-8 col-md-8 col-sm-12">
				<h3 class="title" style="margin-top: 0px; text-transform:uppercase;">` + categoryName +`</h3>      `;
                var articleData = JSON.parse(this.responseText);
				
                for (var i=0; i< articleData.length; i++) {
                   
				   content += `
				         <div class="col-lg-6 pad_bot col-sm-6"> <img src="${articleData[i].img}" class="img-responsive">
        <div class="cat_title">
          <p><b class="cat">${articleData[i].category}</b> / (${articleData[i].date.split('T')[0]})</p>
          <h3>${articleData[i].heading}</h3>
        </div>
        <p class="para">${articleData[i].content.substring(3, 150)}</p>
        <a href="/articles/${articleData[i].title}" class="view">view more</a> </div>
				   
				   `;
				
                }
				  content += "</div>";
  //              content += "</ul>"
                article.innerHTML = content;
            } else {
                article.innerHTML('Oops! Could not load all articles!')
            }
        }
    };
    
    request.open('GET', '/cat/' + categoryName, true);
    request.send(null);
}



//Fun for latest-Articles
function latestArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('latest-posts');
            if (request.status === 200) {
				var content = '<h3 class="title" style="margin-top: 0px;font-weight:600;">LATEST POSTS</h3>';
                var articleData = JSON.parse(this.responseText);
				
                for (var i=0; i< articleData.length; i++) {
                   
				   content += `   
				   
			<div class="col-lg-4 pad_top_5 col-sm-2 col-md-4 col-xs-3 col-2">
            	<img src="${articleData[i].img}" class="img-responsive">
            </div>
            
            <div class="col-lg-8 pad_top_5 col-sm-10 col-md-8 col-xs-9 col-10" style="margin-left:-15px !important;font-weight:500;">
						    <a href="/articles/${articleData[i].title}">
								<p>${articleData[i].heading}</p>
							</a>            	
            </div>
            <!-- Row Ends Here-->
            <div class="clearfix"></div>
				   
				   `;
				
                }
//				  content += "</div>";
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
    };
    
    request.open('GET', '/latest-articles', true);
    request.send(null);
}


//Fun for latest-Articles
function popArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('pop-posts');
            if (request.status === 200) {
				var content = '<h3 class="foot_head title">Popular Posts</h3>';
                var articleData = JSON.parse(this.responseText);
				
                for (var i=0; i< articleData.length; i++) {
                   
				   content += `   
				   
            <div class="col-lg-4 pad_top_5 col-sm-4 col-xs-3 col-2">
            	<img src="${articleData[i].img}" class="img-responsive">
            </div>
            
            <div class="col-lg-8 pad_top_5 col-sm-8 col-xs-9 col-10" style="margin-left:-15px !important;font-weight:500;">
            	<a href="/articles/${articleData[i].title}">
					<p>${articleData[i].heading}</p>
				</a>	
            </div>
            <!-- Row Ends Here-->
            <div class="clearfix"></div>
				   
				   `;
				
                }
//				  content += "</div>";
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
    };
    
    request.open('GET', '/pop-articles', true);
    request.send(null);
}


//Fun for Category
function getCategory () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('get-cat');
            if (request.status === 200) {
				var content = '<div class="col-lg-12">';
                var articleData = JSON.parse(this.responseText);
				
                for (var i=0; i< articleData.length; i++) {
                   
				   content += `   
				   
            <a href="/category/${articleData[i].category}" class="list-group-item">${articleData[i].category}
				   
				   `;
				
                }
				  content += "</div>";
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
    };
    
    request.open('GET', '/get-categories', true);
    request.send(null);
}




//Calling loadArticles()
loadArticles();

//Calling loadLogin()
loadLogin();

//Calling latest-posts
latestArticles();

//Calling Pop-posts
popArticles();

//Calling loadCategory
loadCategory();

//Calling getCategory
getCategory();