// This object contains all the Phaser configurations to load our game
const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 900,
  heigth: 640,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload,
    create,
    update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: false
    },
  }
};

// ***************************************************
// Create the game instance
var game = new Phaser.Game(config);

// ***************************************************


// ==================== VARIABLES ==================== 

// ------------ GROUPS -----------------
var hextechBlocks;
var shimmerBlocks;
var hextechBalls;
var shimmerBalls;
var groupPtcHextechDestroy;
var groupPtcShimmerDestroy;
// -------------------------------------

// ------------ GAME OBJECTS -----------
var cannon;
var gearTop;
var gearBottom;
var panelLoader;
var loaderBallHextech01;
var loaderBallHextech02;
var loaderBallHextech03;
var loaderBallShimmer01;
var loaderBallShimmer02;
var loaderBallShimmer03;
var barHextech01;
var barHextech02;
var barShimmer01;
var barShimmer02;
// -------------------------------------

// ------------ TIMED EVENT ------------
var rotateGear;
var stopParticlesShootHextech;
var reduceParticleAlphaShootHextech;
var dispawnHextechBlock;
var animDestroyHextechBlock;
var stopParticlesDestroyHextech;
var reduceParticleAlphaDestroyHextech;
var fillHextechBar;
var fillShimmerBar;
// -------------------------------------

// ------------ PARTICLES --------------
var emitterHextechShoot;
var emitterHextechDestroy;
var emitterShimmerShoot;
var emitterShimmerDestroy;
// -------------------------------------

// ------------ DATA -------------------
var loader01;
var loader02;
var loader03;
var txtMun;
var remainingMun;
var valueHextechBar;
var valueShimmerBar;
// -------------------------------------

// ===================================================


function preload ()
{
    // Cannon's assets
    this.load.spritesheet('cannon01', 'assets/images/Cannon01.png',
      { frameWidth: 78, frameHeight: 163 }
    );
    this.load.image('cannonIdle', 'assets/images/CannonIdle.png');
    this.load.image('cannon02', 'assets/images/Cannon02.png');
    this.load.image('cannon03', 'assets/images/Cannon03.png');
    this.load.image('cannon04', 'assets/images/Cannon04.png');

    // Brick's assets
    this.load.image('brickHextech', 'assets/images/Brick_Hextech.png');
    this.load.image('brickShimmer', 'assets/images/Brick_Shimmer.png');

    // Ball's assets
    this.load.image('ballHextech', 'assets/images/Gemstone_Hextech.png');
    this.load.image('ballShimmer', 'assets/images/Gemstone_Shimmer.png');
    this.load.image('panelLoaderBullets', 'assets/images/PanelLoaderIdle.png');
    this.load.spritesheet('panelLoaderBulletsAnim', 'assets/images/PanelLoaderAnim.png',
      { frameWidth: 200, frameHeight: 120 }
    );

    // Particle's assets
    this.load.image('ptcHextechShoot', 'assets/images/ParticlesHextech01.png');
    this.load.image('ptcHextechDestroy', 'assets/images/ParticlesHextech02.png');
    this.load.image('ptcShimmerShoot', 'assets/images/ParticlesShimmer01.png');
    this.load.image('ptcShimmerDestroy', 'assets/images/ParticlesShimmer02.png');

    // Font
    this.load.script('specialFont', 'assets/fonts/Bullpen3D.ttf');

    // Audio
    this.load.audio('shoot', 'assets/audio/ShootCannon.wav');
    this.load.audio('destroyHextech', 'assets/audio/DestroyHextech.wav');
    this.load.audio('destroyShimmer', 'assets/audio/DestroyShimmer.wav');
    this.load.audio('destroyBall', 'assets/audio/DestroyBall.wav');
    this.load.audio('mainTheme', 'assets/audio/MainTheme.wav');

    // Bar's assets
    this.load.image('bar02', 'assets/images/Bar02.png');
    this.load.image('barHextech01', 'assets/images/BarHextech01.png');
    this.load.spritesheet('barHextechSheet', 'assets/images/BarHextechSheet.png',
      { frameWidth: 32, frameHeight: 128 }
    );
    this.load.image('barShimmer01', 'assets/images/BarShimmer01.png');
    this.load.spritesheet('barShimmerSheet', 'assets/images/BarShimmerSheet.png',
      { frameWidth: 32, frameHeight: 128 }
    );
}


function create ()
{
  this.sound.play('mainTheme');

  // ================== INITIALIZE PARTICLES ===================
  var particlesHextech = this.add.particles('ptcHextechShoot');
  var particlesShimmer = this.add.particles('ptcShimmerShoot');
  // ===========================================================


  gearBottom = this.add.image(450, 100, 'cannon03');

  cannon = this.physics.add.sprite(450, 100, 'cannonIdle').setOrigin(0.51, 0.97);
  cannon.setAngle(180);


  // ================== ANIM : CANNON ==========================
  this.anims.create({
    key: 'shooting',
    frames: this.anims.generateFrameNumbers('cannon01', { start: 0, end: 7 }),
    frameRate: 32
  });
  // ===========================================================


  // ================== SHOOT ==================================
  this.input.on('pointerdown', function (pointer) {
    if(remainingMun > 0)
    {
      this.sound.play('shoot');
      cannon.anims.play('shooting', 5, true);
      rotateGear = this.time.addEvent({ delay: 50, callback: TRotateGear, callbackScope: this, repeat: 70});
      this.cameras.main.shake(50, 0.008); // Camera Shake (duration, power)

      if(loader01 == 0)
      {
        ShootHextech(pointer, particlesHextech);
        reduceParticleAlphaShootHextech = this.time.addEvent({ delay: 1, callback: TReduceParticleAlphaShootHextech, callbackScope: this, repeat : 50});
        stopParticlesShootHextech = this.time.addEvent({ delay: 51, callback: TStopParticlesShootHextech, callbackScope: this});
      }
      else
      {
        ShootShimmer(pointer, particlesShimmer);
        reduceParticleAlphaShootShimmer = this.time.addEvent({ delay: 1, callback: TReduceParticleAlphaShootShimmer, callbackScope: this, repeat : 50});
        stopParticlesShootShimmer = this.time.addEvent({ delay: 51, callback: TStopParticlesShootShimmer, callbackScope: this});
      }
    
      UpdateLoader();
    }
  }, this);
  // ===========================================================


  this.add.image(450, 100, 'cannon02');
  gearTop = this.add.image(450, 100, 'cannon04');


  // ================== BRICKS : Level Design ==================
  hextechBlocks = this.physics.add.staticGroup();
  shimmerBlocks = this.physics.add.staticGroup();
  
  SetupLevelDesign();
  // ===========================================================


  // ================== ROTATE CANNON ==========================
  this.input.on('pointermove', function (pointer) {

    var dist = Phaser.Math.Distance.BetweenPoints(cannon, pointer);
    var adj = cannon.x - pointer.x;
    var cos = adj / dist;
    var degree = Phaser.Math.RadToDeg(cos) + 180;

    cannon.setAngle(degree);

    var dist2 = Phaser.Math.Distance.BetweenPoints(cannon, pointer);
    var adj2 = pointer.x - cannon.x;
    var cos2 = adj2 / dist2;
    var degree2 = Phaser.Math.RadToDeg(cos2) + 180;

    gearBottom.setAngle(degree2);
  }, this);
 // ===========================================================


  hextechBalls = this.physics.add.group();
  this.physics.add.collider(hextechBalls, hextechBlocks, HitHextech, null, this);
  this.physics.add.collider(hextechBalls, shimmerBlocks, FailHextech, null, this);
  shimmerBalls = this.physics.add.group();
  this.physics.add.collider(shimmerBalls, shimmerBlocks, HitShimmer, null, this);
  this.physics.add.collider(shimmerBalls, hextechBlocks, FailShimmer, null, this);

  // ================== ANIM : LOADER PANEL ==========================
  panelLoader = this.physics.add.sprite(150, 50, 'panelLoaderBullets');

  this.anims.create({
    key: 'loader',
    frames: this.anims.generateFrameNumbers('panelLoaderBulletsAnim', { start: 0, end: 7 }),
    frameRate: 32,
    repeat: -1
  });

  panelLoader.anims.play('loader', 5, true);
  // ===========================================================


  // ================== SETUP LOADER ===========================
  loader01 = 0;
  loader02 = 1;
  loader03 = 0;

  loaderBallHextech03 = this.add.image(98, 52, 'ballHextech').setScale(0.5);
  loaderBallHextech02 = this.add.image(140, 52, 'ballHextech').setScale(0.5).setVisible(false);
  loaderBallHextech01 = this.add.image(200, 52, 'ballHextech');
  loaderBallShimmer03 = this.add.image(98, 52, 'ballShimmer').setScale(0.5).setVisible(false);
  loaderBallShimmer02 = this.add.image(140, 52, 'ballShimmer').setScale(0.5);
  loaderBallShimmer01 = this.add.image(200, 52, 'ballShimmer').setVisible(false);

  remainingMun = 20;
  txtMun = this.add.text(100, 120, 'X ' + remainingMun, { fill: '#ffffff' });
  txtMun.align = 'center';
  txtMun.setFontSize(40);
  txtMun.setFontFamily('font1');
  // ===========================================================

  groupPtcShimmerDestroy = this.physics.add.group();
  groupPtcHextechDestroy = this.physics.add.group();

  // ================== BARS ===================================
  barHextech01 = this.physics.add.sprite(300, 150, 'barHextech01').setOrigin(0.5, 1).setScale(1, 0.5);

  this.anims.create({
    key: 'barHextechAnim',
    frames: this.anims.generateFrameNumbers('barHextechSheet', { start: 0, end: 7 }),
    frameRate: 32,
    repeat: -1
  });

  barHextech01.anims.play('barHextechAnim', 5, true);

  barHextech02 = this.add.image(300, 50, 'bar02');

  barShimmer01 = this.physics.add.sprite(600, 150, 'barHextech01').setOrigin(0.5, 1).setScale(1, 0.5);

  this.anims.create({
    key: 'barShimmerAnim',
    frames: this.anims.generateFrameNumbers('barShimmerSheet', { start: 0, end: 7 }),
    frameRate: 32,
    repeat: -1
  });

  barShimmer01.anims.play('barShimmerAnim', 5, true);

  barShimmer02 = this.add.image(600, 50, 'bar02');

  valueHextechBar = 50;
  valueShimmerBar = 50;
  // ===========================================================
}


function update()
{

}


// TIMER FUNCTION
// Turn top gear when shoot
function TRotateGear()
{
  gearTop.rotation += 0.02;
}


// Calculate start position of balls when shoot (at the end of the cannon)
function CalculateBallPos(pointer)
{
  let distCannon = 147;

  let dist = Phaser.Math.Distance.BetweenPoints(cannon, pointer);
  let adj = cannon.x - pointer.x;
  let cos = adj / dist;

  let posX = 450 - cos * distCannon;
  let posY = 100 + Math.sqrt((distCannon * distCannon) - ((cos * distCannon) * (cos * distCannon)));

  let pos = new Phaser.Math.Vector2(posX, posY);

  return pos;
}


// Add a mun
function AddBall()
{
  remainingMun = remainingMun + 1;
  txtMun.setText('X ' + remainingMun);
}


// TIMER FUNCTION
// Hextech brick dispawn after delay
function TDispawnBlock(block)
{
  block.disableBody(true, true);
}


// TIMER FUNCTION
// Hextech brick dispawn after delay
function TAnimDestroyBlock(block)
{
  block.setScale(block.scaleX + 0.15, block.scaleY + 0.15);
  block.setAlpha(block.alpha - 0.05);
}


// TIMER FUNCTION
// Stop particles after delay when cannon shots a bullet
function TStopParticlesShootHextech()
{
  emitterHextechShoot.stop();
}

// TIMER FUNCTION
// Reduce the alpha of particle sprite
function TReduceParticleAlphaShootHextech()
{
  emitterHextechShoot.setAlpha(emitterHextechShoot.alpha.propertyValue - 0.02);
}


// TIMER FUNCTION
// Stop particles after delay when hextech ball destroys block
function TStopParticlesDestroyHextech()
{
  emitterHextechDestroy.stop();
}

// TIMER FUNCTION
// Reduce the alpha of particle sprite
function TReduceParticleAlphaDestroyHextech()
{
  emitterHextechDestroy.setAlpha(emitterHextechDestroy.alpha.propertyValue - 0.04);
}


// Spawn hextech particles near the end of the cannon
function SpawnHextechParticlesShoot(posX, posY, ptc)
{
  emitterHextechShoot = ptc.createEmitter();

  emitterHextechShoot.setPosition(posX, posY);
  emitterHextechShoot.setSpeed(200);
  emitterHextechShoot.setBlendMode(Phaser.BlendModes.ADD);
  emitterHextechShoot.setQuantity(10);
}


// Spawn hextech particles at the position of destroyed block
function SpawnHextechParticlesDestroy(posX, posY, ptc)
{
  emitterHextechDestroy = ptc.createEmitter();

  emitterHextechDestroy.setPosition(posX, posY);
  emitterHextechDestroy.setSpeed(250);
  emitterHextechDestroy.setBlendMode(Phaser.BlendModes.ADD);
  emitterHextechDestroy.setQuantity(50);
  emitterHextechDestroy.setGravityY(900);
}


// Spawn ball hextech
function ShootHextech(pointer, ptc)
{
  let power = 800;

  var hextechBall = hextechBalls.create(CalculateBallPos(pointer).x, CalculateBallPos(pointer).y, 'ballHextech');
  hextechBall.setBounce(1);
  hextechBall.setCollideWorldBounds(true);

  var vectorVelocity = new Phaser.Math.Vector2(pointer.x - 450, pointer.y);
  vectorVelocity.normalize();

  hextechBall.setVelocity(vectorVelocity.x * power, vectorVelocity.y * power);

  SpawnHextechParticlesShoot(CalculateBallPos(pointer).x, CalculateBallPos(pointer).y, ptc);
}


// TIMER FUNCTION
// Fill +25% of Hextech bar
function TFillHextechBar()
{
  valueHextechBar = valueHextechBar + 1;
  barHextech01.setScale(1, barHextech01.scaleY + 0.01);

  if(valueHextechBar == 100)
  {
    valueHextechBar = 0;
    barHextech01.setScale(1, 0);
    AddBall();
  }
}


// Hextech ball hit hextech brick
function HitHextech(hextechBall, hextechBlock)
{
  this.cameras.main.shake(50, 0.005); // Camera Shake (duration, power)
  this.sound.play('destroyHextech');
  var particlesHextechDestroy = this.add.particles('ptcHextechDestroy');
  SpawnHextechParticlesDestroy(hextechBlock.x, hextechBlock.y, particlesHextechDestroy);

  animDestroyHextechBlock = this.time.addEvent({ delay: 1, callback: TAnimDestroyBlock, args: [hextechBlock], callbackScope: this, repeat: 50});
  dispawnHextechBlock = this.time.addEvent({ delay: 51, callback: TDispawnBlock, args: [hextechBlock], callbackScope: this});

  reduceParticleAlphaDestroyHextech = this.time.addEvent({ delay: 1, callback: TReduceParticleAlphaDestroyHextech, callbackScope: this, repeat : 12});
  stopParticlesDestroyHextech = this.time.addEvent({ delay: 13, callback: TStopParticlesDestroyHextech, callbackScope: this});

  fillHextechBar = this.time.addEvent({ delay: 1, callback:TFillHextechBar, callbackScope: this, repeat: 25});
}


// Hextech ball hit shimmer brick
function FailHextech(hextechBall, shimmerBlock)
{
  this.sound.play('destroyBall');
  shimmerBlock.setScale(shimmerBlock.scaleX + 0.1, shimmerBlock.scaleY + 0.1);
  hextechBall.disableBody(true, true);
}


// TIMER FUNCTION
// Stop particles after delay when cannon shots a bullet
function TStopParticlesShootShimmer()
{
  emitterShimmerShoot.stop();
}

// TIMER FUNCTION
// Reduce the alpha of particle sprite
function TReduceParticleAlphaShootShimmer()
{
  emitterShimmerShoot.setAlpha(emitterShimmerShoot.alpha.propertyValue - 0.02);
}


// TIMER FUNCTION
// Stop particles after delay when shimmer ball destroys block
function TStopParticlesDestroyShimmer()
{
  emitterShimmerDestroy.stop();
}

// TIMER FUNCTION
// Reduce the alpha of particle sprite
function TReduceParticleAlphaDestroyShimmer()
{
  emitterShimmerDestroy.setAlpha(emitterShimmerDestroy.alpha.propertyValue - 0.04);
}


// Spawn shimmer particles near the end of the cannon
function SpawnShimmerParticlesShoot(posX, posY, ptc)
{
  emitterShimmerShoot = ptc.createEmitter();

  emitterShimmerShoot.setPosition(posX, posY);
  emitterShimmerShoot.setSpeed(200);
  emitterShimmerShoot.setBlendMode(Phaser.BlendModes.ADD);
  emitterShimmerShoot.setQuantity(10);
}


// Spawn shimmer particles at the position of destroyed block
function SpawnShimmerParticlesDestroy(posX, posY, ptc)
{
  emitterShimmerDestroy = ptc.createEmitter();

  emitterShimmerDestroy.setPosition(posX, posY);
  emitterShimmerDestroy.setSpeed(250);
  emitterShimmerDestroy.setBlendMode(Phaser.BlendModes.ADD);
  emitterShimmerDestroy.setQuantity(50);
  emitterShimmerDestroy.setGravityY(900);
}


// Spawn ball shimmer
function ShootShimmer(pointer, ptc)
{
  let power = 800;

  var shimmerBall = shimmerBalls.create(CalculateBallPos(pointer).x, CalculateBallPos(pointer).y, 'ballShimmer');
  shimmerBall.setBounce(1);
  shimmerBall.setCollideWorldBounds(true);

  var vectorVelocity = new Phaser.Math.Vector2(pointer.x - 450, pointer.y);
  vectorVelocity.normalize();

  shimmerBall.setVelocity(vectorVelocity.x * power, vectorVelocity.y * power);

  SpawnShimmerParticlesShoot(CalculateBallPos(pointer).x, CalculateBallPos(pointer).y, ptc);
}


// TIMER FUNCTION
// Fill +25% of Shimmer bar
function TFillShimmerBar()
{
  valueShimmerBar = valueShimmerBar + 1;
  barShimmer01.setScale(1, barShimmer01.scaleY + 0.01);

  if(valueShimmerBar == 100)
  {
    valueShimmerBar = 0;
    barShimmer01.setScale(1, 0);
    AddBall();
  }
}


// Shimmer ball hit shimmer brick
function HitShimmer(shimmerBall, shimmerBlock)
{
  this.cameras.main.shake(50, 0.005); // Camera Shake (duration, power)
  this.sound.play('destroyShimmer');
  var particlesShimmerDestroy = this.add.particles('ptcShimmerDestroy');
  SpawnShimmerParticlesDestroy(shimmerBlock.x, shimmerBlock.y, particlesShimmerDestroy)

  animDestroyShimmerBlock = this.time.addEvent({ delay: 1, callback: TAnimDestroyBlock, args: [shimmerBlock], callbackScope: this, repeat: 50});
  dispawnShimmerBlock = this.time.addEvent({ delay: 51, callback: TDispawnBlock, args: [shimmerBlock], callbackScope: this});

  reduceParticleAlphaDestroyShimmer = this.time.addEvent({ delay: 1, callback: TReduceParticleAlphaDestroyShimmer, callbackScope: this, repeat : 12});
  stopParticlesDestroyShimmer = this.time.addEvent({ delay: 13, callback: TStopParticlesDestroyShimmer, callbackScope: this});

  fillShimmerBar = this.time.addEvent({ delay: 1, callback:TFillShimmerBar, callbackScope: this, repeat: 25});
}


// Shimmer ball hit hextech brick
function FailShimmer(shimmerBall, hextechBlock)
{
  this.sound.play('destroyBall');
  hextechBlock.setScale(hextechBlock.scaleX + 0.1, hextechBlock.scaleY + 0.1);
  shimmerBall.disableBody(true, true);
}


// Update Loader
function UpdateLoader()
{
  loader01 = loader02;
  loader02 = loader03;
  loader03 = Phaser.Math.Between(0, 1);

  if(loader01 == 0)
  {
    loaderBallHextech01.setVisible(true);
    loaderBallShimmer01.setVisible(false);
  }
  else
  {
    loaderBallHextech01.setVisible(false);
    loaderBallShimmer01.setVisible(true);
  }

  if(loader02 == 0)
  {
    loaderBallHextech02.setVisible(true);
    loaderBallShimmer02.setVisible(false);
  }
  else
  {
    loaderBallHextech02.setVisible(false);
    loaderBallShimmer02.setVisible(true);
  }

  if(loader03 == 0)
  {
    loaderBallHextech03.setVisible(true);
    loaderBallShimmer03.setVisible(false);
  }
  else
  {
    loaderBallHextech03.setVisible(false);
    loaderBallShimmer03.setVisible(true);
  }

  remainingMun = remainingMun - 1;
  txtMun.setText('X ' + remainingMun);
}

 // Level design
 function SetupLevelDesign()
 {
  hextechBlocks.create(100, 400, 'brickHextech');
  hextechBlocks.create(250, 400, 'brickHextech');
  shimmerBlocks.create(400, 400, 'brickShimmer');
  hextechBlocks.create(550, 400, 'brickHextech');
  shimmerBlocks.create(700, 400, 'brickShimmer');

  shimmerBlocks.create(175, 500, 'brickShimmer');
  shimmerBlocks.create(325, 500, 'brickShimmer');
  hextechBlocks.create(475, 500, 'brickHextech');
  hextechBlocks.create(625, 500, 'brickHextech');
  shimmerBlocks.create(775, 500, 'brickShimmer');

  shimmerBlocks.create(100, 600, 'brickShimmer');
  hextechBlocks.create(250, 600, 'brickHextech');
  hextechBlocks.create(400, 600, 'brickHextech');
  hextechBlocks.create(550, 600, 'brickHextech');
  shimmerBlocks.create(700, 600, 'brickShimmer');

  hextechBlocks.create(175, 700, 'brickHextech');
  shimmerBlocks.create(325, 700, 'brickShimmer');
  shimmerBlocks.create(475, 700, 'brickShimmer');
  shimmerBlocks.create(625, 700, 'brickShimmer');
  hextechBlocks.create(775, 700, 'brickHextech');
 }