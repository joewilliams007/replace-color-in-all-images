const fs = require('fs');
const replaceColor = require('replace-color')
const prompt = require('prompt-sync')();
const sharp = require('sharp');

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

const replaceColorInput = prompt('What is the color you want to replace it with? (example: #FFFFFFF)\n');

fs.readdir(dir, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
     
files.forEach(function (file) {
      console.log(file); 

    
      sharp(dir+"/"+file)
          .greyscale() // make it greyscale
          .linear(1.5, 0) // increase the contrast
          .png({colors:2}) // reduce image to two colors
          .toFile(dir+"/"+file)
          .then(() => {
              console.log('Huzzah!')
      
            replaceColor({
                image: dir+"/"+file,
                colors: {
                  type: 'hex',
                  targetColor: "#000000",
                  replaceColor: replaceColorInput
                }
              }, (err, jimpObject) => {
                if (err) return console.log(err)
                jimpObject.write(dir+"/"+file, (err) => {
                  if (err) return console.log(err)
                  console.log("FINISHED! New files are located here: "+"./"+dir);
                })
              })

            }); 
        });
});

// /home/joe/Desktop/icons #0eff00 #E64868



