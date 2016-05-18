Flat-stream-transformer is a lightweight Transform stream which flattens an input stream consisting of an
array of any objects, outputting a flattened stream of the input array. Example usage would be to flatten an
input stream which is a nested array of json objects.

## Basic Usage
```
const
    streamify=require('stream-array'),
    FlatStreamTransformer=require('./index.js')

const array=[
    [{key:'value1'}],
    [{key:'value2'}],
    [{key:'value3'}]
];

streamify(array)
    .pipe(new FlatStreamTransformer());

//=> [{key:'value1'},{key:'value2'},{key:'value3'}]