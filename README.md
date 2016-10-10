# Micromodules Starter template [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/axnux/template-svc/issues)  

An *experimental* nodejs BDD scaffolding for micromodules  
Optional support for **Docker** through **Wercker**  
*! This project is still under development and it is not suitable for production use !*

## Start development with local nodejs (recommended)
### Prerequisites  
- nodejs  

### Instructions  
1. First install the dependencies using `npm install`  
2. To start with development, you have 3 options:  
   - **DEV** - execute `npm run dev` and execute your test cases once terminal  
       *Note: it will load configuration from  `config/env/default.js` and `config/env/development.js`*
   - **TEST** - execute `npm test` and execute your test cases once terminal  
       *Note: same as the above dev mode*  
       *except it will load configuration from `config/env/default.js` and `config/env/test.js`.*  
       [See more](#config--config-merging)
   - **BDD** - execute `npm run bdd` and keep running test cases in terminal  
       *Note: same as the above test mode*  
       *this will keep your code running continuous testing.*  
       *every time you update your js files. it will auto restart test cases.*  

## Folder structures
1. Business logics in **src**  
2. Test cases in **test**  
3. API doc & Test coverage report **docs**  
4. Configuration files for various environments **config/env**  
5. Configuration file that sit in your local machine only **config/env/local/default.js**  


### Config & Config Merging
To use the configuration  
```js
var config = require('config/default')
console.log(config.s3Options.region) // ap-southeast-1
```

The loading sequence of the configuration file:  

1. Load `config/env/default.js` (will always be overridden by `2`, `3`)  
2. Load `config/env/{development|test|production}.js` (load only when it exists. default to development. will be overridden by `3`)  
3. Load `config/env/local/default.js` (load only when it exists. you can create this file from `config/env/local/default.js.sample` and it will not be checked-in to git)  

#### Notes:
1. It is recommended to place defaults/commons set of configurations in `config/env/default`.  
2. If you are using a set of private credentials for local development, please put it in `config/env/local/default.js`. And then pass the actual credentials using environment variables for staging, production, testing, etc.  (as suggested by the [12factor app](https://12factor.net/))
3. If the above `2` is inappropriate for your setup, you can also put it in environment specific configurations/credentials directly into any of the `config/env/{development|test|production}.js` file.  


## Contribution
Some of the codes were written and used to meet the very specific needs for my projects. Thus feel free to submit **PULL REQUEST** for better solution/bug fixes :)

## Credits
Inspired by [MEANJS](https://github.com/meanjs/mean/)

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
