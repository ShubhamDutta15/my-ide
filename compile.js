const path = require("path");
const fs = require("fs");


const saveFile = (name, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(name, data, function (err) {
            if (err) {
                console.log(err);
                reject()
            } else {
                console.log("The file was saved!");
                resolve()
            }
        });
    })
}




// Function for executing C codes
const cExecute = (data, input) => {
    return new Promise((resolve, reject) => {
        const fileName = "test.c"
        saveFile(fileName, data)
            .then(() => {
                // Create Input file
                fs.writeFile("input.txt", input, function (err) {
                    if (err) {
                        console.log(err);
                        reject()
                    }
                });

                // FILE SAVED SUCCESSFULLY
                // Generate the output file for it
                const filePath = path.join(__dirname, "../test.c")
                exec('gcc ' + filePath, (err, stdout, stderr) => {
                    if (err) {
                        // IF COMPILATION ERROR
                        console.error(`exec error: ${err}`);
                        resolve({
                            err: true,
                            output: err,
                            error: stderr
                        })
                    }

                    // SUCCESSFULL COMPILATION EXECUTING
                    console.log("SUCCESSFULLY COMPILED")
                    exec('a.exe < ' + 'input.txt', (err, stdout, stderr) => {
                        if (err) {
                            console.log("ERROR " + err)
                            resolve({
                                err: true,
                                output: err,
                                error: stderr
                            })
                        }

                        console.log("OUTPUT ", stdout)
                        resolve({
                            err: false,
                            output: stdout
                        })
                    })
                })

            })
            .catch(() => {
                console.log("ERROR SAVE FILE")
                const err = {
                    err: true,
                    output: "Internal Server Error!"
                }
                resolve(err)
            })
    })
}



module.exports = cExecute;