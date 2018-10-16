module objects {
    // Button class used for clickable buttons
    export class Button extends GameObject {

        // private instance variables
        private _isEnabled = false;
        private mouseoutFunc: Function;
        private mouseoverFunc: Function;


        // public properties
        get IsEnabled(): boolean {
            return this._isEnabled;
        }

        set IsEnabled(newValue: boolean) {
            if(this._isEnabled != newValue){
                this._isEnabled = newValue;
                if (newValue) {
                    this.alpha = 1;
                    this.addEventListener("mouseover", this._over)
                    this.addEventListener("mouseout", this._out)
                }
                else {
                    this.alpha = 0.3;
                    this.off("mouseover", this._over);
                    this.off("mouseout", this._out);
                }
            }
        }

        // constructor
        /**
         *Creates an instance of Button.
         * @param {string} imageString
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {boolean} [isCentered=false]
         */
        constructor(imageString: string, x: number = 0, y: number = 0, isCentered: boolean = false) {
            super(imageString);

            if (isCentered) {
                this.regX = this.HalfWidth;
                this.regY = this.HalfHeight;
            }

            this.x = x;
            this.y = y;

            this._out = this._out.bind(this);
            this._over = this._over.bind(this);

            this.IsEnabled = true;
        }
        // private methods

        // event handlers
        private _over(event: createjs.MouseEvent): void {
            this.alpha = 0.7;
        }
        private _out(event: createjs.MouseEvent): void {
            this.alpha = 1.0;
        }
        // public methods

        public Start(): void {

        }
        public Update(): void {

        }
        public Reset(): void {

        }
        public Destroy(): void {

        }
    }
}