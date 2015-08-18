module.exports = {
    // CONVERT THIS ['test.js', 'test1.js'] INTO THIS {'test.min.js': ['test.js'], 'test1.min.js': ['test1.js']}
    generateMinFilesObj : function(input_arr, type_str){
        var res = {};
        input_arr.forEach(function(entry) {
            res[entry.replace('.'+type_str, '.min.'+type_str)] = entry;
        });
        return(res);
    }
};