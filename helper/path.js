const path = require('path');
const fs = require('fs');
const projectPath = path.dirname(process.mainModule.filename);
console.log(projectPath);

const getFileContent = (file, cb) => {
    fs.readFile(file,(err,fileContent)=>{
        if (err){
             cb([]);
        }
        else {
             cb(JSON.parse(fileContent));
        };       
    });
};


exports.projectPath = projectPath;
exports.getFileContent = getFileContent;