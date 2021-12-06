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
var bgColliders;
var runesResources;
var runesDamage;
var runesIncrease;
var runesDecrease;
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
var addOne;
var bg;
var bgCollider;
var endPanel;
var txtEndScore;
var bgBlack;
var startPanel;
var txtPlay;
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
var increaseText;
var decreaseText;
var animateAddOne;
var setupAddOne;
var increaseTextScore;
var decreaseTextScore;
var approachBlock;
var destroyParticlesEachTime;
var increaseEndPanel;
var decreaseAlphaText;
var increaseAlphaText;
var pauseAlphaText;
var increaseRune;
var decreaseRune;
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
var txtScore;
var actualScore;
var isTextScoreOnAnim;
var numberRow;
var rowRows;
var bulletsInGame;
var isEnd;
var spaceBar;
var isStart;
var mainTheme;
var stateAlphaText;
var blocksInGame;
var canSpawnPtcHextech;
var canSpawnPtcShimmer;
// -------------------------------------

// ===================================================


function preload ()
{
    // Background
    this.load.image('bg', 'assets/images/BG.png');
    this.load.image('bgCollider', 'assets/images/BGCollider.png');
    this.load.image('endPanel', 'assets/images/EndPanel.png');
    this.load.image('bgBlack', 'assets/images/BGBlack.png');
    this.load.image('startPanel', 'assets/images/StartPanel.png');

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
    this.load.audio('destroyHextech', 'assets/audio/DestroyHextech2.wav');
    this.load.audio('destroyShimmer', 'assets/audio/DestroyShimmer2.wav');
    this.load.audio('destroyBall', 'assets/audio/DestroyBall2.wav');
    this.load.audio('mainTheme', 'assets/audio/MainTheme.wav');
    this.load.audio('addOneSong', 'assets/audio/AddOneSong.wav');
    this.load.audio('laugh', 'assets/audio/Laugh.wav');

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
    this.load.image('addOne', 'assets/images/AddOne.png');

    // Rune's assets
    this.load.image('runeResources', 'assets/images/RuneResources.png');
    this.load.spritesheet('runeResourcesSheet', 'assets/images/RuneResourcesSheet.png',
      { frameWidth: 75, frameHeight: 98 }
    );
    this.load.image('runeDamage', 'assets/images/RuneDamage.png');
    this.load.spritesheet('runeDamageSheet', 'assets/images/RuneDamageSheet.png',
      { frameWidth: 63, frameHeight: 91 }
    );
    this.load.image('runeIncrease', 'assets/images/RuneIncrease.png');
    this.load.spritesheet('runeIncreaseSheet', 'assets/images/RuneIncreaseSheet.png',
      { frameWidth: 100, frameHeight: 100 }
    );
    this.load.image('runeDecrease', 'assets/images/RuneDecrease.png');
    this.load.spritesheet('runeDecreaseSheet', 'assets/images/RuneDecreaseSheet.png',
      { frameWidth: 97, frameHeight: 83 }
    );
}


function create ()
{
  // Initialize start state
  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  isStart = false;

  // Initialize main theme
  mainTheme = this.sound.add('mainTheme', {volume: 0.2});
  mainTheme.play();

  // Initialize differents backgrounds
  bg = this.add.image(450, 4500, 'bg');
  bgColliders = this.physics.add.staticGroup();
  bgCollider = bgColliders.create(450, 2800, 'bgCollider');

  // ================== INITIALIZE PARTICLES ===================
  var particlesHextech = this.add.particles('ptcHextechShoot');
  var particlesShimmer = this.add.particles('ptcShimmerShoot');
  canSpawnPtcHextech = true;
  canSpawnPtcShimmer = true;
  // ===========================================================

  // Initialize cannon
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
    if(remainingMun > 0 && isStart)
    {
      bulletsInGame++;
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
      LaughSinged(this);
    }
    else if((bulletsInGame == 0 || blocksInGame == 0) && isEnd == false && isStart)
    {
      endPanel = this.add.image(450, 400, 'endPanel').setVisible(false).setScale(0.6);

      txtEndScore = this.add.text(500, 452, actualScore, { fill: '#ffffff' });
      txtEndScore.align = 'center';
      txtEndScore.setFontSize(50);
      txtEndScore.setFontFamily('font1');
      txtEndScore.setVisible(false);

      isEnd = true;
      bgBlack.setVisible(true);
      endPanel.setVisible(true);
      increaseEndPanel = this.time.addEvent({ delay: 5, callback: TIncreaseEndPanel, callbackScope: this, repeat : 60});
    }
  }, this);
  // ===========================================================


  this.add.image(450, 100, 'cannon02');
  gearTop = this.add.image(450, 100, 'cannon04');


  // ================== BRICKS : Level Design ==================
  hextechBlocks = this.physics.add.staticGroup();
  shimmerBlocks = this.physics.add.staticGroup();

  SetupLevelDesign();

  numberRow = 0;
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

  this.physics.add.collider(bgCollider, hextechBalls);
  this.physics.add.collider(bgCollider, shimmerBalls);

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

  remainingMun = 30;
  txtMun = this.add.text(100, 120, 'X ' + remainingMun, { fill: '#ffffff' });
  txtMun.align = 'center';
  txtMun.setFontSize(40);
  txtMun.setFontFamily('font1');
  // ===========================================================


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

  addOne = this.add.image(210, 140, 'addOne');
  addOne.setAlpha(0);
  // ===========================================================


  // ================== SCORE ==================================
  actualScore = 0;
  txtScore = this.add.text(740, 70, actualScore, { fill: '#ffffff' });
  txtScore.align = 'center';
  txtScore.setFontSize(40);
  txtScore.setFontFamily('font1');
  isTextScoreOnAnim = false;
  // ===========================================================


  // ================= RUNES ===================================
  runesResources = this.physics.add.group();
  this.physics.add.overlap(runesResources, hextechBalls, MakeResources, null, this);
  this.physics.add.overlap(runesResources, shimmerBalls, MakeResources, null, this);

  this.anims.create({
    key: 'resources',
    frames: this.anims.generateFrameNumbers('runeResourcesSheet', { start: 0, end: 4 }),
    frameRate: 32,
    repeat: -1
  });

  runesDamage = this.physics.add.group();
  this.physics.add.overlap(runesDamage, hextechBalls, MakeDamage, null, this);
  this.physics.add.overlap(runesDamage, shimmerBalls, MakeDamage, null, this);

  this.anims.create({
    key: 'damage',
    frames: this.anims.generateFrameNumbers('runeDamageSheet', { start: 0, end: 4 }),
    frameRate: 32,
    repeat: -1
  });

  runesIncrease = this.physics.add.group();
  this.physics.add.overlap(runesIncrease, hextechBalls, MakeIncrease, null, this);
  this.physics.add.overlap(runesIncrease, shimmerBalls, MakeIncrease, null, this);

  this.anims.create({
    key: 'increase',
    frames: this.anims.generateFrameNumbers('runeIncreaseSheet', { start: 0, end: 4 }),
    frameRate: 32,
    repeat: -1
  });

  runesDecrease = this.physics.add.group();
  this.physics.add.overlap(runesDecrease, hextechBalls, MakeDecrease, null, this);
  this.physics.add.overlap(runesDecrease, shimmerBalls, MakeDecrease, null, this);

  this.anims.create({
    key: 'decrease',
    frames: this.anims.generateFrameNumbers('runeDecreaseSheet', { start: 0, end: 4 }),
    frameRate: 32,
    repeat: -1
  });
  // ===========================================================


  // ================== END PANEL ==============================
  bulletsInGame = 0;
  isEnd = false;

  bgBlack = this.add.image(450, 1500, 'bgBlack');

  startPanel = this.add.image(450, 400, 'startPanel').setScale(1.2);

  txtPlay = this.add.text(235, 405, "Press Space to Play", { fill: '#ffffff' });
  txtPlay.setFontSize(50);
  txtPlay.setFontFamily('font1');
  decreaseAlphaText = this.time.addEvent({ delay: 5, callback: TDecreaseAlphaText, args: [this], callbackScope: this, repeat: 20});
  stateAlphaText = 1;
  // ===========================================================
}


function update()
{
  if(Phaser.Input.Keyboard.JustDown(spaceBar))
  {
    if(isStart == false)
    {
      isStart = true;
      bgBlack.setVisible(false);
      mainTheme.volume = 1;
      startPanel.setVisible(false);
      txtPlay.setVisible(false);
    }
  }
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


// TIMER FUNCTION
// Animate text when add a ball (increase)
function TIncreaseText(txt)
{
  txt.setScale(txt.scale + 0.05);
}


// TIMER FUNCTION
// Animate text when add a ball (decrease)
function TDecreaseText(txt)
{
  txt.setScale(txt.scale - 0.05);
}


// TIMER FUNCTION
// Animate text when add a ball (decrease)
function TDecreaseTextScore(txt)
{
  txt.setScale(txt.scale - 0.1);

  if(txt.scale <= 0.98)
  {
    isTextScoreOnAnim = false;
    txt.setScale(1);
  }
}


// Add a mun
function AddBall()
{
  remainingMun = remainingMun + 1;
  txtMun.setText('X ' + remainingMun);
}


// TIMER FUNCTION
// Animate AddOne
function TAnimateAddOne()
{
  addOne.setAlpha(addOne.alpha - 0.05);
  addOne.setY(addOne.y - 3);
}


// TIMER FUNCTION
// Setup AddOne
function TSetupAddOne()
{
  addOne.setAlpha(0);
  addOne.setPosition(210, 140);
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
  canSpawnPtcHextech = true;
}

// TIMER FUNCTION
// Reduce the alpha of particle sprite
function TReduceParticleAlphaDestroyHextech()
{
  emitterHextechDestroy.setAlpha(emitterHextechDestroy.alpha.propertyValue - 0.08);
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
  emitterHextechDestroy.setQuantity(100);
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

    increaseText = this.time.addEvent({ delay: 5, callback: TIncreaseText, args: [txtMun], callbackScope: this, repeat: 5});
    decreaseText = this.time.addEvent({ delay: 25, callback: TDecreaseText, args: [txtMun], callbackScope: this, repeat: 5});

    AddBall();
    this.sound.play('addOneSong');

    addOne.setAlpha(1);
    animateAddOne = this.time.addEvent({ delay: 50, callback: TAnimateAddOne, callbackScope: this, repeat: 20});
    setupAddOne = this.time.addEvent({ delay: 1000, callback: TSetupAddOne, callbackScope: this});
  }
}


// Hextech ball hit hextech brick
function HitHextech(hextechBall, hextechBlock)
{
  blocksInGame--;
  this.cameras.main.shake(50, 0.005); // Camera Shake (duration, power)
  this.sound.play('destroyHextech');
  var particlesHextechDestroy = this.add.particles('ptcHextechDestroy');
  if(canSpawnPtcHextech)
  {
    SpawnHextechParticlesDestroy(hextechBlock.x, hextechBlock.y, particlesHextechDestroy);
    canSpawnPtcHextech = false;
  }

  animDestroyHextechBlock = this.time.addEvent({ delay: 1, callback: TAnimDestroyBlock, args: [hextechBlock], callbackScope: this, repeat: 50});
  dispawnHextechBlock = this.time.addEvent({ delay: 51, callback: TDispawnBlock, args: [hextechBlock], callbackScope: this});

  reduceParticleAlphaDestroyHextech = this.time.addEvent({ delay: 1, callback: TReduceParticleAlphaDestroyHextech, callbackScope: this, repeat : 7});
  stopParticlesDestroyHextech = this.time.addEvent({ delay: 9, callback: TStopParticlesDestroyHextech, callbackScope: this});

  fillHextechBar = this.time.addEvent({ delay: 1, callback:TFillHextechBar, callbackScope: this, repeat: 25});

  SpawnRune(hextechBlock);

  AddScore();
  if(!isTextScoreOnAnim)
  {
    isTextScoreOnAnim = true;
    increaseTextScore = this.time.addEvent({ delay: 5, callback: TIncreaseText, args: [txtScore], callbackScope: this, repeat: 10});
    decreaseTextScore = this.time.addEvent({ delay: 50, callback: TDecreaseTextScore, args: [txtScore], callbackScope: this, repeat: 5});
  }

  hextechBlock.setName("isDead");

  if(CheckRow())
  {
    approachBlock = this.time.addEvent({ delay: 1, callback: TMoveBlocks, callbackScope: this, repeat: 50});
    numberRow++;
  }
}


// Hextech ball hit shimmer brick
function FailHextech(hextechBall, shimmerBlock)
{
  this.sound.play('destroyBall');
  shimmerBlock.setScale(shimmerBlock.scaleX + 0.1, shimmerBlock.scaleY + 0.1);
  hextechBall.disableBody(true, true);

  bulletsInGame--;
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
  canSpawnPtcShimmer = true;
}

// TIMER FUNCTION
// Reduce the alpha of particle sprite
function TReduceParticleAlphaDestroyShimmer()
{
  emitterShimmerDestroy.setAlpha(emitterShimmerDestroy.alpha.propertyValue - 0.08);
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
  emitterShimmerDestroy.setQuantity(100);
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

    increaseText = this.time.addEvent({ delay: 5, callback: TIncreaseText, args: [txtMun], callbackScope: this, repeat: 5});
    decreaseText = this.time.addEvent({ delay: 25, callback: TDecreaseText, args: [txtMun], callbackScope: this, repeat: 5});

    AddBall();
    this.sound.play('addOneSong');

    addOne.setAlpha(1);
    animateAddOne = this.time.addEvent({ delay: 50, callback: TAnimateAddOne, callbackScope: this, repeat: 20});
    setupAddOne = this.time.addEvent({ delay: 1000, callback: TSetupAddOne, callbackScope: this});
  }
}


// Shimmer ball hit shimmer brick
function HitShimmer(shimmerBall, shimmerBlock)
{
  blocksInGame--;
  this.cameras.main.shake(50, 0.005); // Camera Shake (duration, power)
  this.sound.play('destroyShimmer');
  var particlesShimmerDestroy = this.add.particles('ptcShimmerDestroy');
  if(canSpawnPtcShimmer)
  {
    SpawnShimmerParticlesDestroy(shimmerBlock.x, shimmerBlock.y, particlesShimmerDestroy)
    canSpawnPtcShimmer = false;
  }

  animDestroyShimmerBlock = this.time.addEvent({ delay: 1, callback: TAnimDestroyBlock, args: [shimmerBlock], callbackScope: this, repeat: 50});
  dispawnShimmerBlock = this.time.addEvent({ delay: 51, callback: TDispawnBlock, args: [shimmerBlock], callbackScope: this});

  reduceParticleAlphaDestroyShimmer = this.time.addEvent({ delay: 1, callback: TReduceParticleAlphaDestroyShimmer, callbackScope: this, repeat : 7});
  stopParticlesDestroyShimmer = this.time.addEvent({ delay: 9, callback: TStopParticlesDestroyShimmer, callbackScope: this});

  fillShimmerBar = this.time.addEvent({ delay: 1, callback:TFillShimmerBar, callbackScope: this, repeat: 25});

  SpawnRune(shimmerBlock);

  AddScore();
  if(!isTextScoreOnAnim)
  {
    isTextScoreOnAnim = true;
    increaseTextScore = this.time.addEvent({ delay: 5, callback: TIncreaseText, args: [txtScore], callbackScope: this, repeat: 10});
    decreaseTextScore = this.time.addEvent({ delay: 50, callback: TDecreaseTextScore, args: [txtScore], callbackScope: this, repeat: 5});
  }

  shimmerBlock.setName("isDead");

  if(CheckRow())
  {
    approachBlock = this.time.addEvent({ delay: 1, callback: TMoveBlocks, callbackScope: this, repeat: 50});
    numberRow++;
  }
}


// Shimmer ball hit hextech brick
function FailShimmer(shimmerBall, hextechBlock)
{
  this.sound.play('destroyBall');
  hextechBlock.setScale(hextechBlock.scaleX + 0.1, hextechBlock.scaleY + 0.1);
  shimmerBall.disableBody(true, true);

  bulletsInGame--;
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
  var row01 = [];
  hextechBlocks.create(100, 400, 'brickHextech');
  Phaser.Utils.Array.Add(row01, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(250, 400, 'brickHextech');
  Phaser.Utils.Array.Add(row01, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(400, 400, 'brickShimmer');
  Phaser.Utils.Array.Add(row01, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(550, 400, 'brickHextech');
  Phaser.Utils.Array.Add(row01, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(700, 400, 'brickShimmer');
  Phaser.Utils.Array.Add(row01, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);

  var row02 = [];
  shimmerBlocks.create(175, 500, 'brickShimmer');
  Phaser.Utils.Array.Add(row02, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(325, 500, 'brickShimmer');
  Phaser.Utils.Array.Add(row02, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(475, 500, 'brickHextech');
  Phaser.Utils.Array.Add(row02, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(625, 500, 'brickHextech');
  Phaser.Utils.Array.Add(row02, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(775, 500, 'brickShimmer');
  Phaser.Utils.Array.Add(row02, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);

  var row03 = [];
  shimmerBlocks.create(100, 600, 'brickShimmer');
  Phaser.Utils.Array.Add(row03, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(250, 600, 'brickHextech');
  Phaser.Utils.Array.Add(row03, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(400, 600, 'brickHextech');
  Phaser.Utils.Array.Add(row03, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(550, 600, 'brickHextech');
  Phaser.Utils.Array.Add(row03, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(700, 600, 'brickShimmer');
  Phaser.Utils.Array.Add(row03, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);

  var row04 = [];
  hextechBlocks.create(175, 700, 'brickHextech');
  Phaser.Utils.Array.Add(row04, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(325, 700, 'brickShimmer');
  Phaser.Utils.Array.Add(row04, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(475, 700, 'brickShimmer');
  Phaser.Utils.Array.Add(row04, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(625, 700, 'brickShimmer');
  Phaser.Utils.Array.Add(row04, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(775, 700, 'brickHextech');
  Phaser.Utils.Array.Add(row04, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);

  var row05 = [];
  hextechBlocks.create(100, 800, 'brickHextech');
  Phaser.Utils.Array.Add(row05, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(250, 800, 'brickShimmer');
  Phaser.Utils.Array.Add(row05, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(400, 800, 'brickShimmer');
  Phaser.Utils.Array.Add(row05, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(550, 800, 'brickHextech');
  Phaser.Utils.Array.Add(row05, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(700, 800, 'brickHextech');
  Phaser.Utils.Array.Add(row05, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);

  var row06 = [];
  shimmerBlocks.create(175, 900, 'brickShimmer');
  Phaser.Utils.Array.Add(row06, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(325, 900, 'brickHextech');
  Phaser.Utils.Array.Add(row06, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(475, 900, 'brickHextech');
  Phaser.Utils.Array.Add(row06, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(625, 900, 'brickShimmer');
  Phaser.Utils.Array.Add(row06, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(775, 900, 'brickShimmer');
  Phaser.Utils.Array.Add(row06, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);

  var row07 = [];
  shimmerBlocks.create(100, 1000, 'brickShimmer');
  Phaser.Utils.Array.Add(row07, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(250, 1000, 'brickHextech');
  Phaser.Utils.Array.Add(row07, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(400, 1000, 'brickShimmer');
  Phaser.Utils.Array.Add(row07, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(550, 1000, 'brickHextech');
  Phaser.Utils.Array.Add(row07, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(700, 1000, 'brickHextech');
  Phaser.Utils.Array.Add(row06, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);

  var row08 = [];
  shimmerBlocks.create(175, 1100, 'brickShimmer');
  Phaser.Utils.Array.Add(row08, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(325, 1100, 'brickShimmer');
  Phaser.Utils.Array.Add(row08, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(475, 1100, 'brickHextech');
  Phaser.Utils.Array.Add(row08, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(625, 1100, 'brickShimmer');
  Phaser.Utils.Array.Add(row08, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(775, 1100, 'brickHextech');
  Phaser.Utils.Array.Add(row08, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);

  var row09 = [];
  hextechBlocks.create(100, 1200, 'brickHextech');
  Phaser.Utils.Array.Add(row09, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(250, 1200, 'brickHextech');
  Phaser.Utils.Array.Add(row09, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(400, 1200, 'brickShimmer');
  Phaser.Utils.Array.Add(row09, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(550, 1200, 'brickHextech');
  Phaser.Utils.Array.Add(row09, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(700, 1200, 'brickShimmer');
  Phaser.Utils.Array.Add(row09, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);

  var row10 = [];
  hextechBlocks.create(175, 1300, 'brickHextech');
  Phaser.Utils.Array.Add(row10, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(325, 1300, 'brickHextech');
  Phaser.Utils.Array.Add(row10, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(475, 1300, 'brickShimmer');
  Phaser.Utils.Array.Add(row10, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(625, 1300, 'brickShimmer');
  Phaser.Utils.Array.Add(row10, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(775, 1300, 'brickShimmer');
  Phaser.Utils.Array.Add(row10, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);

  var row11 = [];
  hextechBlocks.create(100, 1400, 'brickHextech').setScale(1).refreshBody();
  Phaser.Utils.Array.Add(row11, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(250, 1400, 'brickHextech').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row11, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(400, 1400, 'brickShimmer').setScale(1.4).refreshBody();
  Phaser.Utils.Array.Add(row11, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(550, 1400, 'brickHextech').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row11, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(700, 1400, 'brickHextech').setScale(1).refreshBody();
  Phaser.Utils.Array.Add(row11, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);

  var row12 = [];
  shimmerBlocks.create(175, 1500, 'brickShimmer').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row12, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(325, 1500, 'brickShimmer').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row12, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(475, 1500, 'brickShimmer').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row12, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(625, 1500, 'brickShimmer').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row12, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(775, 1500, 'brickHextech').setScale(1.4).refreshBody();
  Phaser.Utils.Array.Add(row12, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);

  var row13 = [];
  shimmerBlocks.create(100, 1600, 'brickShimmer').setScale(1.4).refreshBody();
  Phaser.Utils.Array.Add(row13, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(250, 1600, 'brickHextech').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row13, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(400, 1600, 'brickHextech').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row13, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(550, 1600, 'brickShimmer').setScale(1.4).refreshBody();
  Phaser.Utils.Array.Add(row13, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(700, 1600, 'brickHextech').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row13, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);

  var row14 = [];
  hextechBlocks.create(175, 1700, 'brickHextech').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row14, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(325, 1700, 'brickShimmer').setScale(1.4).refreshBody();
  Phaser.Utils.Array.Add(row14, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(475, 1700, 'brickHextech').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row14, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(625, 1700, 'brickShimmer').setScale(1.4).refreshBody();
  Phaser.Utils.Array.Add(row14, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(775, 1700, 'brickHextech').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row14, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);

  var row15 = [];
  shimmerBlocks.create(100, 1800, 'brickShimmer').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row15, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(250, 1800, 'brickHextech').setScale(1.4).refreshBody();
  Phaser.Utils.Array.Add(row15, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(400, 1800, 'brickShimmer').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row15, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(550, 1800, 'brickHextech').setScale(1.4).refreshBody();
  Phaser.Utils.Array.Add(row15, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(700, 1800, 'brickShimmer').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row15, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);

  var row16 = [];
  shimmerBlocks.create(175, 1900, 'brickShimmer').setScale(1.4).refreshBody();
  Phaser.Utils.Array.Add(row16, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(325, 1900, 'brickHextech').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row16, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(475, 1900, 'brickHextech').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row16, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(625, 1900, 'brickHextech').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row16, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(775, 1900, 'brickHextech').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row16, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);

  var row17 = [];
  shimmerBlocks.create(100, 2000, 'brickShimmer').setScale(1).refreshBody();
  Phaser.Utils.Array.Add(row17, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(250, 2000, 'brickShimmer').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row17, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(400, 2000, 'brickHextech').setScale(1.4).refreshBody();
  Phaser.Utils.Array.Add(row17, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(550, 2000, 'brickShimmer').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row17, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(700, 2000, 'brickShimmer').setScale(1).refreshBody();
  Phaser.Utils.Array.Add(row17, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);

  var row18 = [];
  hextechBlocks.create(175, 2100, 'brickHextech').setScale(1, 1).refreshBody();
  Phaser.Utils.Array.Add(row18, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(325, 2100, 'brickShimmer').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row18, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(475, 2100, 'brickHextech').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row18, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(625, 2100, 'brickShimmer').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row18, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(775, 2100, 'brickHextech').setScale(1, 1).refreshBody();
  Phaser.Utils.Array.Add(row18, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);

  var row19 = [];
  hextechBlocks.create(100, 2200, 'brickHextech').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row19, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(250, 2200, 'brickHextech').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row19, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(400, 2200, 'brickShimmer').setScale(1, 1.4).refreshBody();
  Phaser.Utils.Array.Add(row19, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(550, 2200, 'brickShimmer').setScale(0.8).refreshBody();
  Phaser.Utils.Array.Add(row19, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(700, 2200, 'brickShimmer').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row19, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);

  var row20 = [];
  shimmerBlocks.create(175, 2300, 'brickShimmer').setScale(1, 1.4).refreshBody();
  Phaser.Utils.Array.Add(row20, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(325, 2300, 'brickShimmer').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row20, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(475, 2300, 'brickHextech').setScale(1.2).refreshBody();
  Phaser.Utils.Array.Add(row20, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(625, 2300, 'brickHextech').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row20, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(775, 2300, 'brickHextech').setScale(1, 1.4).refreshBody();
  Phaser.Utils.Array.Add(row20, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);

  var row21 = [];
  hextechBlocks.create(100, 2400, 'brickHextech').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row21, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(250, 2400, 'brickShimmer').setScale(0.8, 1.2).refreshBody();
  Phaser.Utils.Array.Add(row21, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(400, 2400, 'brickHextech').setScale(0.6, 1.4).refreshBody();
  Phaser.Utils.Array.Add(row21, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(550, 2400, 'brickShimmer').setScale(0.8, 1.2).refreshBody();
  Phaser.Utils.Array.Add(row21, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(700, 2400, 'brickShimmer').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row21, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);

  var row22 = [];
  hextechBlocks.create(125, 2500, 'brickHextech').setScale(0.6, 1.4).refreshBody();
  Phaser.Utils.Array.Add(row22, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(225, 2500, 'brickShimmer').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row22, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(325, 2500, 'brickHextech').setScale(0.6).refreshBody();
  Phaser.Utils.Array.Add(row22, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(425, 2500, 'brickShimmer').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row22, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(525, 2500, 'brickHextech').setScale(0.6, 1.4).refreshBody();
  Phaser.Utils.Array.Add(row22, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(625, 2500, 'brickShimmer').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row22, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(725, 2500, 'brickHextech').setScale(0.6).refreshBody();
  Phaser.Utils.Array.Add(row22, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(825, 2500, 'brickShimmer').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row22, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);

  var row23 = [];
  hextechBlocks.create(100, 2600, 'brickHextech').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row23, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(200, 2600, 'brickHextech').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row23, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(300, 2600, 'brickHextech').setScale(0.6).refreshBody();
  Phaser.Utils.Array.Add(row23, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(400, 2600, 'brickShimmer').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row23, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(500, 2600, 'brickHextech').setScale(0.6).refreshBody();
  Phaser.Utils.Array.Add(row23, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(600, 2600, 'brickShimmer').setScale(0.6, 1.4).refreshBody();
  Phaser.Utils.Array.Add(row23, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(700, 2600, 'brickShimmer').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row23, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(800, 2600, 'brickShimmer').setScale(0.6).refreshBody();
  Phaser.Utils.Array.Add(row23, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);

  var row24 = [];
  shimmerBlocks.create(125, 2700, 'brickShimmer').setScale(0.6, 1.4).refreshBody();
  Phaser.Utils.Array.Add(row24, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(225, 2700, 'brickHextech').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row24, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  shimmerBlocks.create(425, 2700, 'brickShimmer').setScale(1.8, 1.4).refreshBody();
  Phaser.Utils.Array.Add(row24, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  shimmerBlocks.create(625, 2700, 'brickShimmer').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row24, shimmerBlocks.children.entries[shimmerBlocks.children.entries.length - 1]);
  hextechBlocks.create(725, 2700, 'brickHextech').setScale(0.6).refreshBody();
  Phaser.Utils.Array.Add(row24, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);
  hextechBlocks.create(825, 2700, 'brickHextech').setScale(0.6, 1).refreshBody();
  Phaser.Utils.Array.Add(row24, hextechBlocks.children.entries[hextechBlocks.children.entries.length - 1]);

  rowRows = [row01, row02, row03, row04, row05, row06, row07, row08, row09, row10, row11, row12, row13, row14, row15, row16, row17, row18, row19, row20, row21, row22, row23, row24];
  blocksInGame = 127;
 }


 // Singed has 10% chance to laugh
 function LaughSinged(game)
 {
  var chance = Phaser.Math.Between(0, 20);

  if(chance == 0)
  {
    game.sound.play('laugh');
  }
 }


 // Add score
 function AddScore()
 {
  actualScore = actualScore + 100;
  txtScore.setText(actualScore);

  if(txtEndScore != null)
    txtEndScore.setText(actualScore);
 }


 // TIMER FUNCTION
 // Move blocks with times
 function TMoveBlocks()
 {
  for (var i = 0; i < hextechBlocks.children.entries.length; i++) 
  {
    hextechBlocks.children.entries[i].y -= 2;
    hextechBlocks.children.entries[i].refreshBody();
  }

  for (var j = 0; j < shimmerBlocks.children.entries.length; j++) 
  {
    shimmerBlocks.children.entries[j].y -= 2;
    shimmerBlocks.children.entries[j].refreshBody();
  }

  for (var k = 0; k < runesResources.children.entries.length; k++) 
  {
    runesResources.children.entries[k].y -= 2;
    runesResources.children.entries[k].refreshBody();
  }

  for (var l = 0; l < runesDamage.children.entries.length; l++) 
  {
    runesDamage.children.entries[l].y -= 2;
    runesDamage.children.entries[l].refreshBody();
  }

  for (var m = 0; m < runesIncrease.children.entries.length; m++) 
  {
    runesIncrease.children.entries[m].y -= 2;
    runesIncrease.children.entries[m].refreshBody();
  }

  for (var n = 0; n < runesDecrease.children.entries.length; n++) 
  {
    runesDecrease.children.entries[n].y -= 2;
    runesDecrease.children.entries[n].refreshBody();
  }

  bg.y -= 2;
  bgCollider.y -= 2;
  bgCollider.refreshBody();
 }


 function CheckRow()
 {
  var tempCanApproach = 1;
  var tempArray = rowRows[numberRow];

  for (var i = 0; i < tempArray.length; i++)
  {
    if(tempArray[i].name != "isDead")
    {
      tempCanApproach = 0;
    }
  }
  
  return tempCanApproach;
 }


 // TIMER FUNCTION
 // Increase scale of end panel
 function TIncreaseEndPanel()
 {
  endPanel.setScale(endPanel.scale + 0.01);

  if(endPanel.scale > 1.18)
  {
    txtEndScore.setVisible(true);
  }
 }


// TIMER FUNCTION
// Increase alpha text
function TIncreaseAlphaText(game)
{
  txtPlay.setAlpha(txtPlay.alpha + 0.05);

  if(txtPlay.alpha == 1 && stateAlphaText == 0)
  {
    stateAlphaText = 1;
    pauseAlphaText = game.time.addEvent({ delay: 1000, callback: TPauseAlphaText, args: [this], callbackScope: this});
  }
}


// TIMER FUNCTION
// Decrease alpha text
function TDecreaseAlphaText(game)
{
  txtPlay.setAlpha(txtPlay.alpha - 0.05);

  if(txtPlay.alpha == 0 && stateAlphaText == 1)
  {
    stateAlphaText = 0;
    increaseAlphaText = game.time.addEvent({ delay: 10, callback: TIncreaseAlphaText, args: [this], callbackScope: this, repeat: 20});
  }
}


// TIMER FUNCTION
// Pause alpha text
function TPauseAlphaText(game)
{
  decreaseAlphaText = game.time.addEvent({ delay: 10, callback: TDecreaseAlphaText, args: [this], callbackScope: this, repeat: 20});
}


function SpawnRune(block)
{
  var choice = Phaser.Math.Between(0, 15);
  var xPos = 0;
  var yPos = 0;

  if(choice <= 3)
  {
    xPos = Phaser.Math.Between(block.x - 50, block.x + 50);
    yPos = Phaser.Math.Between(block.y - 50, block.y + 50);
  }

  if(choice == 0)
  {
    runesResources.create(xPos, yPos, 'runeResources').anims.play('resources', 5, true);
  }
  else if(choice == 1)
  {
    runesDamage.create(xPos, yPos, 'runeDamage').anims.play('damage', 5, true);;
  }
  else if(choice == 2)
  {
    runesIncrease.create(xPos, yPos, 'runeIncrease').anims.play('increase', 5, true);;
  }
  else if(choice == 3)
  {
    runesDecrease.create(xPos, yPos, 'runeDecrease').anims.play('decrease', 5, true);;
  }
}


function MakeResources(rune, ball)
{
  this.sound.play('addOneSong');

  var amount = Phaser.Math.Between(20, 40);

  fillShimmerBar = this.time.addEvent({ delay: 1, callback:TFillShimmerBar, callbackScope: this, repeat: amount});
  fillHextechBar = this.time.addEvent({ delay: 1, callback:TFillHextechBar, callbackScope: this, repeat: amount});

  rune.disableBody(true, true);
}

function MakeDamage(rune, ball)
{
  this.sound.play('addOneSong');

  var amount = Phaser.Math.Between(1.4, 2);

  ball.setScale(amount, amount);

  rune.disableBody(true, true);
}

function MakeIncrease(rune, ball)
{
  this.sound.play('addOneSong');

  var amount = Phaser.Math.Between(10, 100);

  increaseRune = this.time.addEvent({ delay: 0.5, callback:TIncreaseRune, callbackScope: this, repeat: amount});

  rune.disableBody(true, true);
}

function MakeDecrease(rune, ball)
{
  this.sound.play('addOneSong');

  var amount = Phaser.Math.Between(10, 50);

  decreaseRune = this.time.addEvent({ delay: 0.5, callback:TDecreaseRune, callbackScope: this, repeat: amount});

  rune.disableBody(true, true);
}

function TIncreaseRune()
{
  actualScore = actualScore + 10;
  txtScore.setText(actualScore);

  if(txtEndScore != null)
    txtEndScore.setText(actualScore);
}

function TDecreaseRune()
{
  actualScore = actualScore - 10;
  txtScore.setText(actualScore);

  if(txtEndScore != null)
    txtEndScore.setText(actualScore);
}