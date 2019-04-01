const GameModel = require('GameModel');
cc.Class({
    extends: cc.Component,

    properties: {
        gameView:require('GameView'),
        ball: require('Ball'),
        paddle: require('Paddle'),
        brickLayout: require('BrickLayout'),
        overPanel: require('OverPanel'),
    },

    onLoad: function () {
        //安卓返回键退出
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            if (event.keyCode === cc.KEY.back) {
                cc.director.end();
            }
        });
        this.physicsManager = cc.director.getPhysicsManager();
        this.gameModel = new GameModel();
        this.startGame();

    },
    init() {
        this.physicsManager.enabled = true;
        this.gameModel.init();

        this.gameView.init(this);
        this.ball.init(this);
        this.paddle.init();
        this.brickLayout.init(this.gameModel.bricksNumber);
        this.overPanel.init(this);

    },

    startGame() {
        this.init();
    },

    pauseGame() {
        this.physicsManager.enabled = false;
    },

    resumeGame() {
        this.physicsManager.enabled = true;
    },

    stopGame() {
        this.physicsManager.enabled = false;
        this.overPanel.show(this.gameModel.score, this.gameModel.bricksNumber === 0);
    },

    onBallContactBrick(ballNode, brickNode) {
        brickNode.parent = null;
        this.gameModel.addScore(1);
        this.gameModel.minusBrick(1);
        this.gameView.updateScore(this.gameModel.score);
        if (this.gameModel.bricksNumber <= 0) {
            this.stopGame();
        }
    },

    onBallContactGround(ballNode, groundNode) {
        this.stopGame();
    },

    onBallContactPaddle(ballNode, paddleNode) {

    },

    onBallContactWall(ballNode, brickNode) {

    },

    onDestroy() {
        this.physicsManager.enabled = false;
    }
});
