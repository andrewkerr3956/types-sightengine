import sightengine from 'sightengine';
var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('test feedback', function () {
    it('should return success', function (done) {
        sightengine("1908050306", "g5crDgQvUouc2GwvyvmF").feedback('nudity', 'safe', 'https://sightengine.com/assets/img/examples/example5.jpg').then((result) => {
            done(assert.equal('success', result.status))
        })
    });

    it('should return error', function (done) {
        sightengine("1908050306", "g5crDgQvUouc2GwvyvmF").feedback('nudity', 'safe', 'https://sightengine.com/assets/img/examples/example99999.jpg').then((result) => {
            done(assert.equal('failure', result.status))
        })
    });
});

describe('test image moderation', function () {
    it('should return success', function (done) {
        sightengine("1908050306", "g5crDgQvUouc2GwvyvmF").check(['nudity', 'type', 'properties', 'wad', 'faces', 'celebrities']).set_url('https://sightengine.com/assets/img/examples/example5.jpg').then(function (result) {
            done(assert.equal('success', result.status))
        })
    });

    it('should return success', function (done) {
        sightengine("1908050306", "g5crDgQvUouc2GwvyvmF").check(['nudity']).set_url('https://sightengine.com/assets/img/examples/example5.jpg').then(function (result) {
            done(assert.equal('success', result.status))
        })
    });

    it('should return success', function (done) {
        sightengine("1908050306", "g5crDgQvUouc2GwvyvmF").check(['nudity', 'type', 'properties', 'wad', 'faces', 'celebrities']).set_file(path.resolve(__dirname, 'assets', 'image.jpg')).then(function (result) {
            done(assert.equal('success', result.status))
        })
    });

    it('should return success', function (done) {
        sightengine("1908050306", "g5crDgQvUouc2GwvyvmF").check(['celebrities']).set_file(path.resolve(__dirname, 'assets', 'image.jpg')).then(function (result) {
            done(assert.equal('success', result.status))
        })
    });

    it('should return success', function (done) {
        var binaryImage = fs.createReadStream(path.resolve(__dirname, 'assets', 'image.jpg'));

        sightengine("1908050306", "g5crDgQvUouc2GwvyvmF").check(['nudity']).set_bytes(binaryImage).then(function (result) {
            done(assert.equal('success', result.status))
        })
    });

    it('should return success', function (done) {
        var binaryImage = fs.createReadStream(path.resolve(__dirname, 'assets', 'image.jpg'));

        sightengine("1908050306", "g5crDgQvUouc2GwvyvmF").check(['nudity', 'type', 'properties', 'wad', 'faces', 'celebrities']).set_bytes(binaryImage).then(function (result) {
            done(assert.equal('success', result.status))
        });
    });

    it('should return success', function (done) {
        var i64 = new Buffer(fs.readFileSync(path.resolve(__dirname, 'assets', 'image.jpg'))).toString('base64');

        sightengine("1908050306", "g5crDgQvUouc2GwvyvmF").check(['nudity', 'type', 'properties', 'wad', 'faces', 'celebrities']).set_bytes(i64, 'image.png').then(function (result) {
            done(assert.equal('success', result.status))
        });

        /*  Use a base64 string
         var i64 = 'base64string';
     
         sightengine.check(['nudity', 'type', 'properties','wad','faces', 'celebrities']).set_bytes(i64, 'image.png').then(function(result) {
           done(assert.equal('success', result.status))
         }); */
    });

    it('should return error', function (done) {
        sightengine("1908050306", "g5crDgQvUouc2GwvyvmF").check(['nudity', 'wad', 'properties', 'type', 'faces', 'celebrities']).set_url('https://sightengine.com/assets/img/examples/example99999.jpg').then(function (result) {
            done(assert.equal('failure', result.status))
        })
    });
});

describe('video moderation', () => {
    it('should return success', (done) => {
        sightengine("1908050306", "g5crDgQvUouc2GwvyvmF")
            .check(['nudity', 'wad', 'properties', 'type', 'faces', 'celebrities'])
            .video('https://sightengine.com/assets/stream/examples/funfair.mp4', 'https://eobg5s7hiievgnh.m.pipedream.net')
            .then(function (result) {
                console.log("result ", result);
                done(assert.equal('success', result.status))
            })
    })

    it('should return success', (done) => {
        sightengine("1908050306", "g5crDgQvUouc2GwvyvmF")
            .check(['nudity', 'wad', 'properties', 'type', 'faces', 'celebrities'])
            .video_sync('https://sightengine.com/assets/stream/examples/funfair.mp4')
            .then(function (result) {
                console.log("result ", result);
                done(assert.equal('success', result.status))
            })
    })
})


