# version-writer
A simple grunt plugin to write the package's version into your page

# How to use it 

Add the following dependency to your project:
```
"version-writer": "git+https://github.com/wagoid/version-writer.git"
```

Configure your GruntFile.js. Example GruntFile.js content:

```
module.exports = function(grunt) {

  grunt.initConfig({
      versionWriter: {
        options: {
          packagePath: "./package.json",
          filePath: "./index.html",
          tag: "p"
        }
      }
  });

  grunt.loadNpmTasks('version-writer');
};
```

The packagePath option is the path to your package.json file. Default is './package.json'.

The filePath option is the path to your index.html file. Default is './index.html'.

The tag option is the html tag to replace the content. Default is 'p'.

The version of your project should be using the Semantic Versioning pattern. Check it out: http://semver.org/.
