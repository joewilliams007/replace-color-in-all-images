const fs = require('fs');
const replaceColor = require('replace-color')
const prompt = require('prompt-sync')();
console.log("started process")
const dir = prompt('What is the directory name?\nExample /home/joe/Desktop/icons\n');
console.log(`Scanning the directory ${dir}`);

try {
  fs.readdir(dir, (err, files) => {
      console.log("Found "+files.length+" files:\n ");
  });
} catch (err){
  console.log("Unable to find any files!\n ");
  process.exit();
}

const targetColorInput = prompt('What is the color you want to target? (example: #FFFFFFF)\n');
const replaceColorInput = prompt('What is the color you want to replace it with? (example: #FFFFFFF)\n');

fs.readdir(dir, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
     
files.forEach(function (file) {
      console.log(file); 

            replaceColor({
                image: dir+"/"+file,
                colors: {
                  type: 'hex',
                  targetColor: targetColorInput,
                  replaceColor: replaceColorInput
                }
              }, (err, jimpObject) => {
                if (err) return console.log(err)
                jimpObject.write("./"+dir+"/"+file, (err) => {
                  if (err) return console.log(err)
                })
              })
        });
});
console.log("FINISHED! New files are located here: "+"./"+dir);

// /home/joe/Desktop/icons



