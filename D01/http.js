const http = require("http");
const fs = require("fs");

var httpServer = http.createServer(function (req, res) {
        console.log(req.url);

        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        var partUrl = req.url.split("/");
        let answer = partUrl[1];
        let ID = partUrl[partUrl.length - 1];
        console.log(ID);
        if (answer == "home") {
            res.write("<h1>Welcome to our APIs</h1>");
            res.end();
        } else if (answer == "students") {
            var data = fs.readFileSync("students.json");
            console.log(Number.isInteger(ID));
            if (ID == "students") {
                var students = JSON.parse(data);
                res.write(JSON.stringify(students));
                res.end();
            } else if (isFinite(ID)) {
                students = JSON.parse(data);
                selected_student = students[parseInt(ID) - 1];
                res.write(JSON.stringify(selected_student));
                res.end();
            } else {
                res.write("<h2> not a student id</h2>");
                res.end();
            }
        } else if (answer == "iti") {
            res.write("<h1>Welcome to ITI</h1>");
            
            var image = fs.readFileSync("iti-logo.png");
            //res.writeHead(200,{'content-type':'image/jpg'}); 
            res.write(image);
        } else {
            res.write("<h2>404 not found</h2>");
            res.end();
        }
    })
    .listen(4000);

console.log("listening on port 4000...");