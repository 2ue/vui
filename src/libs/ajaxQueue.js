;(function (root, factory) {
    if (typeof define === 'function' && (define.amd||define.cmd)) {
        // AMD&CMD
        define(function(){
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(root);
    } else {
        // Browser globals (root is window)
        root.Browser = factory(root);
    }
}(typeof self !== 'undefined' ? self : this, function (root) {
    var _window = root || {};
    var _navigator = typeof root.navigator != 'undefined' ? root.navigator : {};
    var _mime = function (option, value) {
        var mimeTypes = _navigator.mimeTypes;
        for (var mt in mimeTypes) {
            if (mimeTypes[mt][option] == value) {
                return true;
            }
        }
        return false;
    };
})
