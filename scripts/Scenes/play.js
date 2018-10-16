var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // public variables
        // constructor
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Displays results on the reels
        Play.prototype.DisplayResults = function () {
            this.RemoveOldResult();
            for (var index = 0; index < this._spinResult.length; index++) {
                var result = this._spinResult[index];
                this._reels[index] = new objects.Reel(result);
                this._reels[index].x = this._reelObjXLocation[index];
                this.addChild(this._reels[index]);
            }
        };
        Play.prototype.RemoveOldResult = function () {
            for (var index = 0; index < this._reels.length; index++) {
                this.removeChild(this._reels[index]);
            }
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        Play.prototype.Reels = function () {
            {
                var betLine = [" ", " ", " "];
                var outCome = [0, 0, 0];
                for (var spin = 0; spin < 3; spin++) {
                    outCome[spin] = Math.floor((Math.random() * 65) + 1);
                    switch (outCome[spin]) {
                        case this.checkRange(outCome[spin], 1, 27): // 41.5% probability
                            betLine[spin] = "blank";
                            this._blanks++;
                            break;
                        case this.checkRange(outCome[spin], 28, 37): // 15.4% probability
                            betLine[spin] = "grapes";
                            this._grapes++;
                            break;
                        case this.checkRange(outCome[spin], 38, 46): // 13.8% probability
                            betLine[spin] = "banana";
                            this._bananas++;
                            break;
                        case this.checkRange(outCome[spin], 47, 54): // 12.3% probability
                            betLine[spin] = "orange";
                            this._oranges++;
                            break;
                        case this.checkRange(outCome[spin], 55, 59): //  7.7% probability
                            betLine[spin] = "cherry";
                            this._cherries++;
                            break;
                        case this.checkRange(outCome[spin], 60, 62): //  4.6% probability
                            betLine[spin] = "bar";
                            this._bars++;
                            break;
                        case this.checkRange(outCome[spin], 63, 64): //  3.1% probability
                            betLine[spin] = "bell";
                            this._bells++;
                            break;
                        case this.checkRange(outCome[spin], 65, 65): //  1.5% probability
                            betLine[spin] = "seven";
                            this._sevens++;
                            break;
                    }
                }
                return betLine;
            }
        };
        /* This function calculates the player's winnings, if any */
        Play.prototype.DetermineWinnings = function () {
            if (this._blanks == 0) {
                if (this._grapes == 3) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._bananas == 3) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._oranges == 3) {
                    this._winnings = this._playerBet * 30;
                }
                else if (this._cherries == 3) {
                    this._winnings = this._playerBet * 40;
                }
                else if (this._bars == 3) {
                    this._winnings = this._playerBet * 50;
                }
                else if (this._bells == 3) {
                    this._winnings = this._playerBet * 75;
                }
                else if (this._sevens == 3) {
                    this._winnings = this._playerBet * 100;
                }
                else if (this._grapes == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._bananas == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._oranges == 2) {
                    this._winnings = this._playerBet * 3;
                }
                else if (this._cherries == 2) {
                    this._winnings = this._playerBet * 4;
                }
                else if (this._bars == 2) {
                    this._winnings = this._playerBet * 5;
                }
                else if (this._bells == 2) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._sevens == 2) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._sevens == 1) {
                    this._winnings = this._playerBet * 5;
                }
                else {
                    this._winnings = this._playerBet * 1;
                }
                this.showWinMessage();
            }
            else {
                this.showLossMessage();
            }
        };
        /* Check to see if the player won the jackpot */
        Play.prototype.checkJackPot = function () {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                alert("You Won the $" + this._jackpot + " Jackpot!!");
                this._playerMoney += this._jackpot;
                this._jackpot = 1000;
            }
        };
        /* Utility function to show a win message and increase player money */
        Play.prototype.showWinMessage = function () {
            this._playerMoney += this._winnings;
            this.ResetFruitTally();
            this.checkJackPot();
        };
        /* Utility function to show a loss message and reduce player money */
        Play.prototype.showLossMessage = function () {
            this._playerMoney -= this._playerBet;
            this.ResetFruitTally();
        };
        /* Utility function to check if a value falls within a range of bounds */
        Play.prototype.checkRange = function (value, lowerBounds, upperBounds) {
            if (value >= lowerBounds && value <= upperBounds) {
                return value;
            }
            else {
                return !value;
            }
        };
        /* When the player clicks the spin button the game kicks off */
        Play.prototype.Spin = function (event) {
            this._spinResult = this.Reels();
            // method to display results on reel
            this.DisplayResults();
            this.DetermineWinnings();
        };
        Play.prototype.CheckInput = function () {
            if (!isNaN(Number(managers.Game.playerBet.value))) {
                this._playerBet = parseInt(managers.Game.playerBet.value);
                if (this._playerBet <= this._playerMoney && this._playerBet > 0) {
                    if (!this._btnSpin.IsEnabled) {
                        this._btnSpin.IsEnabled = true;
                        this._btnSpin.addEventListener("click", this.Spin);
                    }
                }
                else {
                    this._btnSpin.IsEnabled = false;
                    this._btnSpin.off("click", this.Spin);
                }
            }
            else {
                this._btnSpin.IsEnabled = false;
                this._btnSpin.off("click", this.Spin);
            }
        };
        // public methods
        /* Utility function to reset the player stats */
        Play.prototype.ResetFruitTally = function () {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        };
        // places the objects in the play scene
        Play.prototype.Main = function () {
            this.addChild(this._playBackground);
            this.addChild(this._slotMachine);
            this.addChild(this._lblbet);
            this.addChild(this._lbljackpot);
            this.addChild(this._lblmoney);
            this.addChild(this._btnSpin);
        };
        Play.prototype.Start = function () {
            managers.Game.playerBet.value = "";
            managers.Game.playerBet.style.display = "inline";
            this._slotMachine.x = 150;
            this._btnSpin = new objects.Button("spinButton", 530, 300, true);
            this._playBackground = new objects.Background("playBackground");
            this._slotMachine = new objects.Background("slotMachine");
            this._lblbet = new objects.Label("Bet:", "30px", "Consolas", "#000000", 200, 340, false);
            this._lbljackpot = new objects.Label("Jackpot:", "30px", "Consolas", "#000000", 200, 55, false);
            this._lblmoney = new objects.Label("Money:", "30px", "Consolas", "#000000", 200, 290, false);
            this._reels = new Array();
            this._reelObjXLocation = new Array();
            this._reelObjXLocation[0] = 210;
            this._reelObjXLocation[1] = 286;
            this._reelObjXLocation[2] = 362;
            this.Main();
            this.Reset();
        };
        Play.prototype.Update = function () {
            this.CheckInput();
            this._lbljackpot.text = "Jackpot: $" + this._jackpot;
            this._lblmoney.text = "Money: $" + this._playerMoney;
        };
        Play.prototype.Reset = function () {
            this._spinResult = ["spin", "spin", "spin"];
            this.DisplayResults();
            this.ResetFruitTally();
            this._playerMoney = 1000;
            this._winnings = 0;
            this._jackpot = 5000;
            this._playerBet = 0;
        };
        Play.prototype.Destroy = function () {
            _super.prototype.Destroy.call(this);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map