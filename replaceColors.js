const fs = require('fs');
const replaceColor = require('replace-color')
const prompt = require('prompt-sync')();

const getColors = require('get-image-colors')
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

  
      


              
              const options = {
                count: 10,
                type: 'image/png'
              }
              getColors(dir+"/"+file, options).then(colors => {
                // `colors` is an array of 10 color objects
                colors.map(color => color.hex()).forEach(function(entry) {
                  console.log(entry);

                 
                  replaceColor({
                    image: dir+"/"+file,
                    colors: {
                      type: 'hex',
                      targetColor: entry,
                      replaceColor: replaceColorInput
                    }
                  }, (err, jimpObject) => {
                    if (err) return console.log(err)
                    jimpObject.write(dir+"/"+file, (err) => {
                      if (err) return console.log(err)
                      console.log("FINISHED! New files are located here: "+"./"+dir);
                    })
                  })




              })
            }); 
        });
});

// /home/joe/Desktop/icons #0eff00 #E64868



