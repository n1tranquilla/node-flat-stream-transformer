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
        const array=[
            [ {key:'value1'}, [ {key:'value2'}, {key:'value3'} ] ],
            [ {key:'value4'} ],
            [ {key:'value5'}, {key:'value6'} ]
        ];
        const expectedArray=[
          {key:'value1'},
          {key:'value2'},
          {key:'value3'},
          {key:'value4'},
          {key:'value5'},
          {key:'value6'}
        ];

        var i=0;
        testStream.on('data',function(number){
            expect(number).to.be.deep.equal(expectedArray[i++]);
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

