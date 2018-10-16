module scenes{
    export class Start extends objects.Scene{
        // private instance variables
        private _playButton:objects.Button;

        // public properties

        // constructors
        constructor() {
            super();

            this.Start();
        }

        // private methods

        // public methods

        public Main(): void {
            this.addChild(this._playButton);

            // event listeners
            this._playButton.on("click", ()=>{
                managers.Game.currentState = config.Scene.PLAY;
            })
        }        
        public Start(): void {
            this._playButton = new objects.Button("playButton", 320, 420, true);
            this.Main();
        }
        public Update(): void {

        }
        public Reset(): void {
            
        }
        public Destroy(): void {
            super.Destroy();
        }
    }
}