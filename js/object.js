if (!Object.create) {
    Object.create = function (obj) {
        function C(){};
        C.prototype = obj;
        return new C();
    };
}

if (!Object.keys) {
    Object.keys = function (obj) {
        if (o !== Object(obj))
            throw new TypeError('Object.keys called on non-object');
        var ret = [], p;
        for (p in obj) {
            if (Object.prototype.hasOwnProperty.call(obj,p)) {
                ret.push(p);
            }
        }
        return ret;
    };
}