const { spawn } = require('child_process');
class Process {
    constructor(command, arg) {
        this.command = command
        this.output = []
        this.err = []
        this.arg = arg
        
        this.proc = spawn(this.command, this.arg);
        this.proc.stdout.on('data', (data) => {
            this.output.push(data.toString());
        });

        this.proc.stderr.on('data', (data) => {
            this.err.push(data);
        });

        this.proc.on('close', (code) => {
            //
        });
    }
    kill(signal) {
        this.proc.kill(signal);
    }
    

}
module.exports = (command, arg) => {return new Process(command, arg)};

