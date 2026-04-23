const fs=require("fs");
// fs.writeFile("data.txt","Hello from Node.js",(err)=>{
//     if(err){
//         console.log("Error occurred",err);
//     }else{
//         console.log("File written successfully");
//     }
// });

fs.readFile("read.txt", "utf8", (err, data) => {
    if (err) {
        console.log("Error reading file", err);
    } else {
        console.log("File content:", data);
    }
});

fs.appendFile("read.txt", "\nAppended text from Node.js", (err) => {
    if (err) {
        console.log("Error appending to file", err);
    } else {
        console.log("Content appended successfully");
    }
});


fs.unlink("read.txt", (err) => {
    if (err) {
        console.log("Error deleting file", err);
    } else {
        console.log("File deleted successfully");
    }
});