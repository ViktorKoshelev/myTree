function Tree() {
	this._value = this._left = this._right = this._par = null;
}

Tree.prototype.getValue = function() {
	return this._value;
}

Tree.prototype.setValue = function(val) {
	this._value = val;
}

Tree.prototype.getLeft = function() {
	return this._left;
}

Tree.prototype.setLeft = function(node) {
	this._left = node;
}

Tree.prototype.getRight = function() {
	return this._right;
}

Tree.prototype.setRight = function(node) {
	this._right = node;
}

Tree.prototype.getParent = function() {
	return this._parent;
}

Tree.prototype.setParent = function(node) {
	this._parent = node;
}

Tree.prototype.findNode = function(val) { //return node closest to val
	var self = this;

	while (self != null) {
		var value = self.getValue();
		var left = self.getLeft();
		var right = self.getRight();
		if (value == val)
			return self;
		if (value < val)
			if (right)
				self = right;
			else
				return self;
		if (value > val)
			if (left)
				self = left;
			else
				return self;
	}
	return self;
}

Tree.prototype.addNode = function(val) { // add new node to tree
	var self = this.findNode(val);
	var value = self.getValue();

	if (value == val)
		return;

	if (value && value > val) {
		self.setLeft(new Tree());
		self.getLeft().setValue(val);
		self.getLeft().setParent(self);
		return;
	}
	if (value && value < val) {
		self.setRight(new Tree());
		self.getRight().setValue(val);
		self.getRight().setParent(self);
		return;
	}
	self.setValue(val);
}

Tree.prototype.deleteNode = function(val) {
	var self = this.findNode(val);

	if (self.getValue() != val)
		return;

	if (self.getParent() && self.getParent().getValue() > self.getValue()) {
		if (self.getRight()) {
			var replace = self.getRight();
			while (replace.getLeft())
				replace = replace.getLeft();

			replace.setLeft(self.getLeft()); // replace left son to the lowest son from right
			self.getLeft().setParent(replace);
			self.getParent().setLeft(self.getRight()); // replace right son to the deleted node
			self.getRight().setParent(self.getParent()); // link right son to parent deleted node
		} else {
			if (self.getLeft()) {
				self.getParent().setLeft(self.getLeft());
				self.getLeft().setParent(self.getParent());
			} else {
				self.getParent().setLeft(null);
			}
		}
	} else {
		if (self.getLeft()) {
			var replace = self.getLeft();
			while (replace.getRight())
				replace = replace.getRight();

			replace.setRight(self.getRight());
			self.getRight().setParent(replace);
			if (self.getParent()) {
				self.getParent().setRight(self.getLeft());
				self.getLeft().setParent(self.getParent());
			} else {
				self.getLeft().setParent(null);
			}
		} else {
			if (self.getRight()) {
				if (self.getParent())
					self.getParent().setRight(self.getRight());
				self.getRight().setParent(self.getParent());
			} else {
				if (self.getParent())
					self.getParent().setRight(null);
			}
		}
	}

	var root = self.getParent() || self.getRight() || self.getLeft();
	while (root.getParent())
		root = root.getParent();
	self = null;
	return root;
}

module.exports = Tree;