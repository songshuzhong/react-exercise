class HorizonLine {
  constructor( canvas, spritePos ) {
    this.spritePos = spritePos;
    this.canvas = canvas;
    this.ctx = canvas.getContext( '2d' );
    this.dimensions = { width: 600, height: 12, ypos: 127 };
    this.sourceXPos = [ this.spritePos.x, this.spritePos.x + this.dimensions.width ];
    this.xPos = [];
    this.yPos = 0;
    this.bumpThreshold = .5;
    this.setSourceDimensions();
    this.draw();
  }

  setSourceDimensions() {
    this.xPos = [ 0, this.dimensions.width ];
    this.yPos = this.dimensions.ypos;
  }

  getRandomType() {
    return Math.random() > this.bumpThreshold ? this.dimensions.WIDTH : 0;
  }

  draw() {
    this.ctx.drawImage(
      imgSprite,
      this.sourceXPos[ 0 ], this.spritePos.y,
      this.dimensions.width, this.dimensions.height,
      this.xPos[ 0 ], this.yPos,
      this.dimensions.width, this.dimensions.height
    );

    this.ctx.drawImage(
      this.sourceXPos[ 1 ], this.spritePos.y,
      this.dimensions.width, this.dimensions.height,
      this.xPos[ 1 ], this.xPos,
      this.dimensions.width, this.dimensions.height
    );
  }

  updateXPos( pos, increment ) {
    let line1 = pos;
    let line2 = pos === 0? 1: 0;

    this.xPos[ line1 ] = increment;
    this.xPos[ line2 ] = this.xPos[ line1 ] + this.dimensions.width;

    if ( this.xPos[ line1 ] <= -this.dimensions.width ) {
      this.xPos[ line1 ] += this.dimensions.width * 2;
      this.xPos[ line2 ] = this.xPos[ line1 ] - this.dimensions.width;
      this.sourceXPos[ line1 ] = this.getRandomType() + this.spritePos.x;
    }
  }

  update( deltaTime, speed ) {
    let increment = Math.floor( speed * ( FPS / 1000 ) * deltaTime );

    if ( this.xPos[ 0 ] <= 0 ) {
      this.updateXPos( 0, increment );
    } else {
      this.updateXPos( 1, increment )
    }
    this.draw();
  }

  reset() {
    this.xPos[ 0 ] = 0;
    this.xPos[ 1 ] = this.dimensions.width;
  }

}

export default HorizonLine;