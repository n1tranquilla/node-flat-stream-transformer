Flat-stream-transformer is a lightweight node.js [transform stream](https://nodejs.org/api/stream.html#stream_class_stream_transform)
which flattens a stream of objects.

## Basic Usage
```
const
    streamify=require('stream-array'),
    FlatStreamTransformer=require('./index.js')

const array=[
    [
        {key:'value1'},
        [
            {key:'value2'},
            {key:'value3'}
        ],
    ],
    [
        {key:'value4'}
    ],
    [
        {key:'value5'},
        {key:'value6'},
    ]
];

streamify(array)
    .pipe(new FlatStreamTransformer());

//=>
//[
//  {key:'value1'},
//  {key:'value2'},
//  {key:'value3'},
//  {key:'value4'},
//  {key:'value5'},
//  {key:'value6'}
//]