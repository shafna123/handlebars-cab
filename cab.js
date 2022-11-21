const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring');
const passenger = require('./data/passenger');
const db = require('./data/db');
const Handlebars = require('handlebars');


registerPartials();
   
    const server = http.createServer(function(req,res){
        res.setHeader('Content-Type', 'text/html');
        const link = url.parse(req.url, true);
        const query = link.query;
        const page = link.pathname;

// if(path == "/login"){
//     var content = fs.readFileSync('templates/login.html', 'utf8');
//     res.end(content);
// }

// if(path == "/index"){
//     var content = fs.readFileSync('templates/index.html', 'utf8');
//     res.end(content);
// }

// if(path == "/index1"){
//     var content = fs.readFileSync('templates/index1.html', 'utf8');
//     res.end(content);
// }

// if(path == "/register"){
//     var content = fs.readFileSync('templates/register.html', 'utf8');
//     res.end(content);
// }


if(page == "/"){
    passenger.getAll((err,result) => { 
        console.log(err);             //for displaying data as object instead of array of object
        var context = {data: result};
        console.log(context);
        let t = renderTemplate('index', context);
        res.end(t);

    });
}
     else if(page == "/passenger/create" && req.method == "GET"){
            let template = renderTemplate ('create', {});
            res.end(template);
     }
     else if(page == "/passenger/create" && req.method == "POST") {
        console.log("line 56");
        let formData = '';
        req.on('data', function(data){
            formData += data.toString() 
        });
       
        req.on('end', function(){
        let userData = qs.parse(formData);
        console.log(userData)
        passenger.addOne(userData.name, userData.email, (err,result) =>{
            var context = {
                result,
                success: true,
                errors: []
                }
            
            if(err){
                console.log(err)
                context.success = false;
            
            }
                let t = renderTemplate('create', context);
                res.end(t);
            
        });
        });

     }

});

server.listen(80);

function renderTemplate(name,data){
    var filePath = path.join(__dirname, "templates", name+".hbs");
    let templateText = fs.readFileSync(filePath, "utf-8");
    let template = Handlebars.compile(templateText); 
    return template(data); 
}

function registerPartials(){                                                           //for navbar
    var filePath = path.join(__dirname, "templates", "partials", "navbar.hbs");
    let templateText = fs.readFileSync(filePath, "utf-8"); 
    Handlebars.registerPartial("navbar", templateText);
}


