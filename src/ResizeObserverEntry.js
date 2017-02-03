import defineConfigurable from './utils/defineConfigurable';
import global from './shims/global';

export default class ResizeObserverEntry {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {ClientRect} rectData - Data of the elements' content rectangle.
     */
    constructor(target, rectData) {
        // Content rectangle needs to be an instance of ClientRect if it's
        // available.
        const rectInterface = global.ClientRect || Object;
        const contentRect = Object.create(rectInterface.prototype);

        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(contentRect, rectData);

        defineConfigurable(this, {target, contentRect});
    }
}
