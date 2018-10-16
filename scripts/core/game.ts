(function(){
    // game variables
    let canvas:HTMLCanvasElement;
    let stage:createjs.Stage;
    let assetManager:createjs.LoadQueue;

    // State Objects
    let currentScene:objects.Scene;
    let currentState:config.Scene;

    let assetManifest = [
        {id: "slotMachine", src:"./Assets/images/slotMachine.png"},
        {id: "startBackground", src:"./Assets/images/startBackground.jpg"},
        {id: "playBackground", src:"./Assets/images/playBackground.jpg"},

        {id: "playButton", src:"./Assets/images/button_play.png"},
        {id: "spinButton", src:"./Assets/images/button_spin.png"},

        {id: "blank", src:"./Assets/images/blank.png"},
        {id: "grapes", src:"./Assets/images/grapes.png"},
        {id: "banana", src:"./Assets/images/banana.png"},
        {id: "orange", src:"./Assets/images/orange.png"},
        {id: "cherry", src:"./Assets/images/cherry.png"},
        {id: "bar", src:"./Assets/images/bar.png"},
        {id: "bells", src:"./Assets/images/bells.png"},
        {id: "spin", src:"./Assets/images/spin.png"},
        {id: "seven", src:"./Assets/images/seven.png"},
    ]

    function Init():void {
        assetManager = new createjs.LoadQueue();
        managers.Game.assetManager = assetManager; // creates a reference to the global assetManager
        assetManager.installPlugin(createjs.Sound); // enable sound preloading
        assetManager.loadManifest(assetManifest); // preloads all assets listed in the manifest
        assetManager.on("complete", Start); // call Start when assets are finished loading
    }

    function Start():void {
        console.log(`%c Game Started...`,"color: blue; font-size: 20px;");
        canvas = document.getElementsByTagName("canvas")[0];
        stage = new createjs.Stage(canvas);
        managers.Game.stage = stage; // passing a reference to the stage globally
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60; // game will run at 60fps
        createjs.Ticker.on("tick", Update);

        currentState = config.Scene.START;
        managers.Game.currentState = currentState;
        Main();
    }

    // this is the main game loop
    function Update():void {
        
        if(currentState != managers.Game.currentState){
            currentState = managers.Game.currentState;
            Main();
        }

        stage.update();
        currentScene.Update();

    }
    function Main():void {

        // clean up current scene
        if(currentScene != null){
            currentScene.Destroy();
            stage.removeAllChildren();
        }

        switch(currentState) {
            case config.Scene.START:
            currentScene = new scenes.Start;
            break;
            case config.Scene.PLAY:
            currentScene = new scenes.Play;
            break;
        }
        stage.addChild(currentScene);
    }

    window.addEventListener("load", Init);
})();