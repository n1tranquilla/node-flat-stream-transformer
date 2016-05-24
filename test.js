const
    expect=require('chai').expect,
    streamify=require('stream-array'),
    FlatStreamTransformer=require('./index.js'),
    PassThrough=require('stream').PassThrough
    ;

const
    transformStream=new FlatStreamTransformer(),
    testStream=new PassThrough({objectMode:true});

describe('FlatStreamTransformer basic usage',function(){

    it('should flatten a streams of multidimensional arrays',function(done){
        const
            array=[[1],2,[[[3,[4,5,6]],7]],8,[[9],10],11],
            expectedArray=[1,2,3,4,5,6,7,8,9,10,11];

        var i=0;
        testStream.on('data',function(number){
            expect(number).to.be.equal(expectedArray[i++]);
        });
        testStream.on('end',function(){
            expect(i).to.be.equal(expectedArray.length);
            done();
        });

        streamify(array)
            .pipe(transformStream)
            .pipe(testStream);
    });
});

