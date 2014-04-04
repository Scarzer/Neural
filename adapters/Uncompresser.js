var exec = require('child_process').exec, child;

child = exec('uncompress 01Apr14.02z.g15.tpwc_merged_cimss_exp_rets2_a.Z',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });