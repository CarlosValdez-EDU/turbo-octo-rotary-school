var fs = require('fs');

//App version
console.log("Incrementing build number...");
fs.readFile('./src/utils/app_version.json',function(err,content){
    debugger;
    if(err) throw err;
    var metadata = JSON.parse(content);
    metadata.buildNumber = metadata.buildNumber + 1;
    fs.writeFile('./src/utils/app_version.json',JSON.stringify(metadata),function(err){
        if(err) throw err;
        console.log("Current build number: " + metadata.buildNumber);
    })
});