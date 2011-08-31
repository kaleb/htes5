if (!Array.prototype.forEach) {
    /** @author <a href="http://j.mp/bYBHKl">Mozilla</a> */
    Array.prototype.forEach = function(fun /*, thisp */) {
        "use strict";
        if (this === void 0 || this === null) { throw new TypeError(); }
        if (typeof fun !== "function") { throw new TypeError(); }
        var i, t = Object(this);
            len = t.length >>> 0,
            thisp = arguments[1];
        for (i = 0; i < len; i++) {
            if (i in t) {
                fun.call(thisp, t[i], i, t);
            }
        }
    };
}

if (!Array.prototype.filter) {
    /** @author <a href="http://j.mp/bgDpU9">Mozilla</a> */
    Array.prototype.filter = function(fun /*, thisp */) {
        "use strict";
        if (this === void 0 || this === null) { throw new TypeError(); }
        if (typeof fun !== "function") { throw new TypeError(); }
        var t = Object(this);
            len = t.length >>> 0,
            i, val, res = [],
            thisp = arguments[1];
        for (i = 0; i < len; i++) {
            if (i in t) {
                val = t[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, t)) {
                    res.push(val);
                }
            }
        }
        return res;
    };
}

if (!Array.prototype.every) {
    /** @author <a href="http://j.mp/gGvKPx">Mozilla</a> */
    Array.prototype.every = function(fun /*, thisp */) {
        "use strict";
        if (this === void 0 || this === null) { throw new TypeError(); }
        if (typeof fun !== "function") { throw new TypeError(); }
        var i, t = Object(this),
            len = t.length >>> 0;
            thisp = arguments[1];
        for (i = 0; i < len; i++) {
            if (i in t && !fun.call(thisp, t[i], i, t)) {
                return false;
            }
        }
        return true;
    };
}

if (!Array.prototype.indexOf) {
    /** @author <a href="http://j.mp/9MMWnS">Mozilla</a> */
    Array.prototype.indexOf = function(searchElement /*, fromIndex */) {
        "use strict";
        if (this === void 0 || this === null) { throw new TypeError(); }
        var t = Object(this);
            len = t.length >>> 0,
            n = 0, k;
        if (len === 0) {
            return -1;
        }
        if (arguments.length > 0) {
                n = Number(arguments[1]);
            if (n !== n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}

if (!Array.prototype.lastIndexOf) {
    /** @author <a href="http://j.mp/hzFDVJ">Mozilla</a> */
    Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) {
        "use strict";
        if (this === void 0 || this === null) { throw new TypeError(); }
        var t = Object(this),
            len = t.length >>> 0,
            n = len, k;
        if (len === 0) {
            return -1;
        }
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n !== n) {
                n = 0;
            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);
        for (; k >= 0; k--) {
            if (k in t && t[k] === searchElement)
              return k;
        }
        return -1;
    };
}

if (!Array.prototype.map) {
    /** @author <a href="http://j.mp/bYBHKl">Mozilla</a> */
    Array.prototype.map = function(fun /*, thisp */) {
        "use strict";
        if (this === void 0 || this === null) { throw new TypeError(); }
        if (typeof fun !== "function") { throw new TypeError(); }
        var i, t = Object(this);
            len = t.length >>> 0,
            res = new Array(len),
            thisp = arguments[1];
        for (i = 0; i < len; i++) {
            if (i in t) {
                res[i] = fun.call(thisp, t[i], i, t);
            }
        }
        return res;
    };
}

if ( !Array.prototype.reduce ) {
    /** @author <a href="http://j.mp/bYBHKl">Mozilla</a> */
    Array.prototype.reduce = function reduce(accumlator){
        var l = this.length,
            i, curr;
        if(typeof accumlator !== "function") {
            // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
            throw new TypeError("First argument is not callable");
        }
        if((l == 0 || l === null) && (arguments.length <= 1)) {// == on purpose to test 0 and false.
            throw new TypeError("Array length is 0 and no second argument");
        }
        if(arguments.length <= 1) {
            for(i=0 ; i=l) { // empty array
                throw new TypeError("Empty array and no second argument");
            }
            curr = this[i++]; // Increase i to start searching the secondly defined element in the array
        } else{
            curr = arguments[1];
        }
        for(i = i || 0 ; i < l ; i++) {
            if(i in this) {
                curr = accumlator.call(undefined, curr, this[i], i, this);
            }
        }
        return curr;
    };
}

if (!Array.prototype.reduceRight) {
    /** @author <a href="http://j.mp/mCchL5">Mozilla</a> */
    Array.prototype.reduceRight = function(callbackfn /*, initialValue */) {
        "use strict";
        if (this === void 0 || this === null) { throw new TypeError(); }
        if (typeof callbackfn !== "function") { throw new TypeError(); }
        var t = Object(this),
            len = t.length >>> 0;
            k = len - 1,
            accumulator;
        // no value to return if no initial value, empty array
        if (len === 0 && arguments.length === 1) {
            throw new TypeError();
        }
        if (arguments.length >= 2) {
            accumulator = arguments[1];
        } else {
            do {
                if (k in this) {
                    accumulator = this[k--];
                    break;
                }

                // if array contains no values, no initial value to return
                if (--k < 0)
                    throw new TypeError();
            } while (true);
        }
        while (k >= 0) {
            if (k in t) {
                accumulator = callbackfn.call(undefined, accumulator, t[k], k, t);
            }
            k--;
        }
        return accumulator;
    };
}

if (!Array.prototype.some) {
    /** @author <a href="http://j.mp/fVqOxS">Mozilla</a> */
    Array.prototype.some = function(fun /*, thisp */) {
        "use strict";
        if (this === void 0 || this === null) { throw new TypeError(); }
        if (typeof fun !== "function") { throw new TypeError(); }
        var i, t = Object(this),
            len = t.length >>> 0,
            thisp = arguments[1];
        for (i = 0; i < len; i++) {
            if (i in t && fun.call(thisp, t[i], i, t)) {
                return true;
            }
        }
        return false;
    };
}