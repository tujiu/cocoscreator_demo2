cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.parent.on("touchmove", (event) => {
            let touchPoint = this.node.parent.convertToNodeSpace(event.getLocation());
            this.node.x = touchPoint.x;
        });
    },

    init () {
        this.node.x = 360;
        this.node.y = 15;
    }
});
