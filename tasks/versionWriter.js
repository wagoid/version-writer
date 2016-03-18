'use strict';
const PACKAGE_PATH = './package.json';
const FILE_PATH = './index.html';
const DEFAULT_TAG = 'p';

module.exports = function(grunt) {
  grunt.registerMultiTask('versionWriter', 'Gets the version from your package.json file and writes it into your page', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      packagePath: PACKAGE_PATH,
      filePath: FILE_PATH,
      tag: DEFAULT_TAG
    });
    
    if (!grunt.file.exists(options.packagePath) || !grunt.file.exists(options.filePath)) {
      grunt.log.warn("Please check the packagePath and filePath parameters!");
      process.exit();
    }
    
    var packageJson = grunt.file.readJSON(options.packagePath, { encoding: "utf-8"});
    var fileContent = grunt.file.read(options.filePath, { encoding: "utf-8" });
    
    var regex = '<\s*tag[^>]*>([^<]*)<\s*\/\s*tag\s*>'.replace(/tag/g, options.tag);
    regex = new RegExp(regex, 'g');
    var paragraphMatch = fileContent.match(regex);
    
    if (paragraphMatch.length) {
      var versionMatch = paragraphMatch[0].match(/\d+(\.\d+)+/g);
      if (versionMatch.length) {
        fileContent = fileContent.replace(versionMatch, packageJson.version);
        grunt.file.write(options.filePath, fileContent, { encoding: "utf-8" });
        console.log('file updated!');  
      }
    }
  });
};