"use strict";

const
    Transform = require('stream').Transform,
    util = require('util');

/**
 * FlattenStreamTransformer
 * Flattens an input stream consisting of an
 * array of any objects, outputting a flattened
 * stream of the input array.
 *
 * @author: Nathan Tranquilla
 */
const FlattenStreamTransformer = function() {
    Transform.call(this, {objectMode: true});
};
util.inherits(FlattenStreamTransformer, Transform);

FlattenStreamTransformer.prototype._transform = function(chunk, encoding, callback) {
    if (Array.isArray(chunk)) traverse.call(this,chunk);
    else this.push(chunk);
    callback();
};

module.exports = FlattenStreamTransformer;

/**
 * traverse
 * Traverses the array tree structure pushing
 * all leaf nodes into a flat array.
 * @param array
 */
function traverse(array) {
    for(let index in array){
        if (Array.isArray(array[index])) {
            traverse.call(this,array[index]);
        } else {
            this.push(array[index]);
        }
    }
}