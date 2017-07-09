var assert = require('chai').assert;
var Tree = require('./tree');

describe("Tree", function(){
	describe('addNode', function(){
		it('should add new node if it does not exist', function(){
			var tree = new Tree();
			tree.addNode(5);
			tree.addNode(5);
			tree.addNode(2);
			tree.addNode(6);
			assert.equal(tree.getValue(), 5);
			assert.equal(tree.getRight().getValue(), 6);
			assert.equal(tree.getLeft().getValue(), 2);
		});
	});
	describe('deleteNode', function(){
		it('should delete node if it exists', function(){
			var tree = new Tree();
			tree.addNode(5);
			tree.addNode(2);
			tree.addNode(6);
			tree = tree.deleteNode(5);
			assert.equal(tree.getRight().getValue(), 6);
			assert.equal(tree.getValue(), 2);
		})
	})
})