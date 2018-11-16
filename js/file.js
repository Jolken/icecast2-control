const fs = require('fs');
class File {
    constructor(file) {
        this.file = file;
    }
    read() {
        return new Promise((resolve) => {
            fs.readFile(this.file, "utf8", 
            (err, data) => {
                if (err) console.log(err);
                else resolve(data);
            });
        })
    }
    write(data) {
        return new Promise((resolve) => {
            fs.writeFile(this.file, data, "utf8", (err) => {
                if (err) console.log(err);
                else resolve({ status: "saved", 'data': data});
            });
        })
    }
    
}
module.exports = (file) => {return new File(file)}