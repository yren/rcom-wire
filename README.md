# Rcom Api project

<div align="center">
    <a href="https://travis-ci.org/">
        <img src="https://travis-ci.com/images/logos/Tessa-pride-4.svg" width="175">
    </a>
</div>
<br />

<div align="center">

[![Build Status](https://travis-ci.org/yren/hang.svg?branch=master)](https://travis-ci.org/yren/hang)

</div>

## dependency
```
npm install restify@5.0.1 --save
npm install restify-errors@5.0.0 --save
npm install request@2.81.0 --save
npm install memcached@2.2.2 --save
npm install underscore@1.8.3 --save
npm install swagger-node-restify@0.1.2  --save

## unit test
npm install mocha -g
npm install mocha@3.5.0 --save-dev
npm install sinon@3.1.0 --save-dev

```

## folder structure
* controllers:  
This folder contain code for controllers. It also have 

* lib:

* models:

## start
```
node index.js
## or
npm start
```

## swagger ui for api docs
* http://localhost:3000/swagger-ui

## TODO
* api version use path /v1 or use header version 1.0.0 ?

## tech reference
* http://restify.com/
* https://github.com/request/request
* https://github.com/3rd-Eden/memcached
* http://underscorejs.org/
* https://github.com/caolan/nodeunit
* https://github.com/sinonjs/sinon

## travis integrate
* https://travis-ci.org/yren/rcom-wire