const fs = require('fs');

console.log("started process")

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
  
readline.question('What directory to search in?\nExample: ./home/images\n\n', dir => {   console.log(`Searching for files in ${dir}!`);
    readline.close();

    fs.readdir(dir, (err, files) => {
        console.log("Found "+files.length+" files:\n ");
    });

    fs.readdir(dir, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
     
        files.forEach(function (file) {
            console.log(file); 
        
        });
    });

});


/*
const replaceColor = require('replace-color')
replaceColor({
    image: file,
    colors: {
      type: 'hex',
      targetColor: '#FF0000',
      replaceColor: '#FFFFFF'
    }
  }, (err, jimpObject) => {
    if (err) return console.log(err)
    jimpObject.write('./output.jpg', (err) => {
      if (err) return console.log(err)
    })
  })*/
