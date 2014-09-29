var TiltGrid = (function(win,utils){

    if (!utils) {
        return null;
    }

    var exports = function TiltGrid(element) {

        this._element = element;

        // set parameters
        this._maxTileSize = element.getAttribute('data-tile-size') || 'm';
        this._element.setAttribute('data-tile-size',this._maxTileSize);

        // calculate max tile width
        this._maxTileActualWidth = this._getMaxTileWidthByTileSize(this._maxTileSize);

        // grid property
        this._grid = {
            slots:null,
            occupants:0,
            wasted:0,
            space:0,
            width:0,
            height:0
        };

        this._currentWidth = null;

        // setup items
        this._items = this._getItems(this._element);

        // set initial max tile height
        this._minHorizontalTileSlots = 4;


        // listen to resize
        var self = this,timer = null;

        utils.listen(window,'resize',function() {

            clearTimeout(timer);

            if (self._isShrinking()) {

                // organize without delay (and without animations)
                self._element.className += ' tilt-static';

                setTimeout(function(){
                    self._organize();
                },1);

            }
            else {
                timer = setTimeout(function(){
                    self._organize();
                },50);
            }

        });

        // organize slots for first time
        this._organize();

        // setup init animation delays
        var i=0,l = this._items.length,wrapper;
        for (;i<l;i++) {
            wrapper = this._items[i].node.children[0];
            utils.setStyle(
                wrapper,'-transitionDelay',i * .1 + 's'
            );
        }

        // ready, when organized class is applied animations are enabled
        setTimeout(function(){
            self._element.setAttribute('data-ready','true');
        },1);
    };


    exports.prototype = {

        /**
         * tests if the new container size is smaller than the previous one
         * @private
         */
        _isShrinking:function() {
            return this._element.offsetWidth < this._currentWidth;
        },

        /**
         * Parses the children of the list and creates an objects for each child for later decoration
         * @param element
         * @returns {Array}
         * @private
         */
        _getItems:function(element) {

            var children = element.children,items = [],i= 0,l=children.length;
            for (;i<l;i++) {
                items.push({
                    node:children[i],
                    offset:null,
                    size:null
                });
            }
            return items;

        },

        /**
         * Returns the size of the tile based on it's data-size value
         * @param tile
         * @param cells
         * @returns object
         * @private
         */
        _getTileSize:function(tile,cells) {

            var type = tile.getAttribute('data-tile-type') || 'm',
                types = type.split(','),l=types.length,size = types[0],
                i=1,offset,result,explicit=false;

            if (l>1) {
                for(;i<l;i++) {

                    type = types[i];

                    // first character is offset
                    offset = parseInt(type,10);

                    // if offset is not a number it's the 'all' type
                    if (isNaN(offset)) {
                        size = type.substring(1);
                        continue;
                    }

                    // else check if number is smaller than cell count
                    if (offset <= cells) {

                        size = type.split(offset+'')[1];

                        if (offset == cells) {
                            explicit = true;
                            break;
                        }
                    }
                }
            }

            // get size-
            result = this._getObjectByTileSize(size);
            result.explicit = explicit;

            return result;
        },

        _setTileSize:function(item,size) {

            item.size = size;
            item.node.setAttribute('data-tile-size',this._getTileSizeByObject(size));

        },

        _getHorizontalGridCellCount:function(width) {

            var slots = 0,scaled = Math.round(width / 100);

            if (this._maxTileSize == 's') {
                slots = 4 + scaled;
            }

            if (this._maxTileSize == 'm') {
                slots = 3 + scaled;
            }

            if (this._maxTileSize == 'l') {
                slots = 2 + scaled;
            }

            return Math.max(this._minHorizontalTileSlots,slots);

        },

        _getMaxTileHeightByHorizontalCellCount:function(count) {
            var i= 0,l = this._items.length,node,size,max=1;
            for (;i<l;i++) {
                node = this._items[i].node;
                size = this._getTileSize(node,count);
                if (size.y > max) {
                    max = size.y;
                }
            }
            return max;
        },

        /**
         * Organize the tiles based on the current width
         * @private
         */
        _organize:function() {

            // get container width
            this._currentWidth = this._element.offsetWidth;

            // calculate amount of cells to place across x axis
            var xCells = Math.max(this._minHorizontalTileSlots,Math.floor(this._currentWidth / this._maxTileActualWidth)),yCells=0;

            // based on amount of cells we can determine tile size
            var tileScale = Math.floor(this._currentWidth / xCells);

            // for loops
            var i=0,l=this._items.length,reset = false,item;

            // check if different grid than previous grid
            if (this._grid.slots && xCells !== this._grid.slots[0].length) {

                // reset
                reset = true;

                // reset items
                for (;i<l;i++) {
                    item = this._items[i];
                    item.offset = null;
                    item.size = null;
                }

                // reset grid
                this._grid = {
                    slots:null,
                    occupants:0,
                    wasted:0,
                    space:0,
                    width:0,
                    height:0,
                    xSlots:0,
                    ySlots:0
                };
            }

            // define a new grid
            if (!this._grid.slots) {
                this._grid.slots = [utils.initArray(0,xCells)];
            }

            for (i=0;i<l;i++) {

                item = this._items[i];

                // if no size defined or rescaled, get the original size of the tile for this grid layout
                if (!item.size || (reset && item.size && item.size.rescaled)) {
                    this._setTileSize(item,this._getTileSize(item.node,xCells));
                }

                // if no offset defined, find an offset for this tile in the current grid
                if (!item.offset) {

                    // get offset for this item
                    item.offset = this._findSlot(this._grid.slots,item.size);

                    // test if scaled
                    if (item.size.rescaled) {
                        this._setTileSize(item,item.size);
                    }

                    // if still no offset skip to next item
                    if (!item.offset) {continue;}

                    // reserve this offset
                    this._reserveSlot(this._grid.slots,item);
                }

                // when we enter this part in the loop an offset has been defined
                this._setItemPosition(item,tileScale);

                // calculate grid y scale
                if (item.offset.y + item.size.y > yCells) {
                    yCells = item.offset.y + item.size.y;
                }

            }

            // resize grid container over y axis so sibling elements are pushed down
            this._element.style.height = (yCells * tileScale) + 'px';

            // enable any blocked transitions
            this._element.className = this._element.className.replace(' tilt-static','');

        },

        _setItemPosition:function(item,scale) {

            if (utils.hasTransforms()) {

                utils.setTransforms(item.node,{
                    'translateX':Math.round(scale * item.offset.x) + 'px',
                    'translateY':Math.round(scale * item.offset.y) + 'px'
                });

                utils.setStyles(item.node,{
                    'width':(scale * item.size.x) + 'px',
                    'height':(scale * item.size.y) + 'px'
                });

            }
            else {

                utils.setStyles(item.node,{
                    'left':Math.round(scale * item.offset.x) + 'px',
                    'top':Math.round(scale * item.offset.y) + 'px',
                    'width':(scale * item.size.x) + 'px',
                    'height':(scale * item.size.y) + 'px'
                });
            }


        },

        _findSlot:function(grid,size) {

            var rowCap = grid[0].length,x,y,required = size.x * size.y;
            if (required <= this._grid.wasted) {
                rowCap = this._grid.width;
            }

            // for all rows
            for (y=0;y<grid.length;y++) {
                for (x=0;x<rowCap;x++) {

                    if (!this._isSlotAvailable(x,y,grid,size)) {
                        continue;
                    }

                    return {
                        x:x,
                        y:y
                    };
                }
            }

            // if no space and not forced scale
            // try again but with smaller version
            // only rescale if a couple of spots vacant
            if (!size.explicit && (size.x>1 || size.y>1) &&
                this._grid.vacant > 0 && this._grid.vacant <= size.x * size.y) {

                if (size.x > 1) {
                    size.x = Math.max(size.x/2,1);
                }
                else if (size.y > 1) {
                    size.y = Math.max(size.y/2,1);
                }

                size.rescaled = true;

                return this._findSlot(grid,size);
            }

            // if no slot found add row and try again
            this._extendGrid(grid);

            // try again
            return this._findSlot(grid,size);
        },

        _reserveSlot:function(grid,item) {

            var x=item.offset.x,y=item.offset.y,
                w=item.size.x,h=item.size.y;

            // loop over x and y axis
            for (var yo=y;yo<y+h;yo++) {
                for (var xo=x;xo<x+w;xo++) {
                    grid[yo][xo] = 1;
                }
            }

            var offset = 0;
            for (var i=0;i<grid[0].length;i++) {
                if (grid[0][i] === 1) {
                    offset = i;
                }
                else {
                    break;
                }
            }

            this._grid.width = offset+1;
            this._grid.height = grid.length;
            this._grid.ySlots = this._grid.height;
            this._grid.xSlots = this._grid.slots[0].length;
            this._grid.occupants += w * h;
            this._grid.space = this._grid.width * this._grid.height;
            this._grid.wasted = this._grid.space - this._grid.occupants;
            this._grid.vacant = this._grid.ySlots * this._grid.xSlots - this._grid.occupants;


            //this._logState(grid);

        },

        _logState:function(grid) {
            console.log('--------------------');
            for (var s=0;s<grid.length;s++) {
                console.log(JSON.stringify(grid[s]));
            }
            console.log('width',this._grid.width);
            console.log('height',this._grid.height);
            console.log('space',this._grid.space);
            console.log('occupants',this._grid.occupants);
            console.log('wasted',this._grid.wasted);
            console.log('vacant',this._grid.vacant);
        },

        _isSlotAvailable:function(x,y,grid,size) {

            var w = size.x-1,h = size.y-1;

            // if taken, no go
            if (this._isSlotTaken(grid,x,y)) {
                return false;
            }

            // if is small tile, takes up one spot [0], already confirmed spot is available
            if (w === 0 && h === 0) {
                return true;
            }

            // loop over x and y axis
            for (var yo=y;yo<=y+h;yo++) {
                for (var xo=x;xo<=x+w;xo++) {

                    // if out of bounds
                    if (!grid[yo]) {
                        return false;
                    }

                    // test if available
                    if (this._isSlotTaken(grid,xo,yo)) {
                        return false;
                    }
                }
            }

            return true;
        },

        _isSlotTaken:function(grid,x,y) {
            return grid[y] ? grid[y][x] !== 0 : false;
        },

        _extendGrid:function(grid) {
            grid.push(utils.initArray(0,grid[0].length));
        },

        /**
         * Returns the max tile size for this grid
         * @param size
         * @returns {number}
         * @private
         */
        _getMaxTileWidthByTileSize:function(size) {

            if (size == 'm') {
                return 60;
            }

            if (size == 'l') {
                return 75;
            }

            if (size == 's') {
                return 45;
            }

            return 60;

        },

        /**
         * Returns an object based on the size of the tile
         * @param size
         * @returns {{x: number, y: number}}
         * @private
         */
        _getObjectByTileSize:function(size) {

            // squares
            if (size == 's') {
                return {x:1,y:1}
            }
            if (size == 'm') {
                return {x:2,y:2}
            }
            if (size == 'l') {
                return {x:4,y:4}
            }

            // landscape
            if (size == '_s') {
                return {x:2,y:1};
            }
            if (size == '_l') {
                return {x:4,y:2};
            }

            // portrait
            if (size == '|s') {
                return {x:1,y:2};
            }
            if (size == '|l') {
                return {x:2,y:4};
            }

            throw new Error('unknown tile size: "' + size + '"');
        },

        /**
         * Returns a string size based on an object
         * @param obj
         * @returns {string}
         * @private
         */
        _getTileSizeByObject:function(obj) {

            // squares
            if (obj.x == obj.y) {

                if (obj.x == 1) {
                    return 's';
                }
                if (obj.x == 2) {
                    return 'm';
                }
                if (obj.x == 4) {
                    return 'l';
                }

            }

            // landscape
            if (obj.x > obj.y) {

                if (obj.x == 2) {
                    return '_s';
                }
                if (obj.x == 4) {
                    return '_l';
                }
            }

            // portrait
            if (obj.x < obj.y) {

                if (obj.y == 2) {
                    return '|s';
                }

                if (obj.y == 4) {
                    return '|l';
                }

            }

            return null;
        }

    };

    return exports;

}(window,window['TiltUtils']));