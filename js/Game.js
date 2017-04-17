var Game = function(){
    this.type = "WebGL";
    this.stage = new PIXI.Container();
    this.background;
    this.player;
    this.house;
    this.renderer;
    
    this.init = function(){
        if(!PIXI.utils.isWebGLSupported()){
            this.type = "canvas";
        }
        
                      //Create the renderer
        this.renderer = PIXI.autoDetectRenderer(807, 507);

        //Add the canvas to the HTML document
        document.body.appendChild(this.renderer.view);

        //Create a container object called the `stage`
        this.stage = new PIXI.Container();
        this.background;
        this.player;
        this.house;
        
        utils.load_file("data/house1.json", function(data){
            this.house = data;
            console.log(this.house);
        }.bind(this));

        PIXI.loader
        .add("img/background.png")
        .add("img/Character.png")
        .load(this.loaded);
    };
    
    this.loaded = function(){
        
        //Create the `cat` sprite from the texture
        this.background = new PIXI.Sprite(
            PIXI.loader.resources["img/background.png"].texture
        );


        //Create the `cat` sprite from the texture
        this.player = new PIXI.Sprite(
            PIXI.loader.resources["img/Character.png"].texture
        );
        this.player.x = 25;
        this.player.y = 25;
        this.player.vx = 0;
        this.player.vy = 0;
        this.player.r=0;
        this.player.anchor.x = 0.5;
        this.player.anchor.y = 0.5;
        
        this.stage.addChild(this.background);
        this.stage.addChild(this.player);
        
        var left = new Keyboard(37),
            up = new Keyboard(38),
            right = new Keyboard(39),
            down = new Keyboard(40);
        
        
        //Left 
        left.press = function() {
            this.player.vx = -1;
            this.player.vy = 0;
            this.player.r = utils.toRad(-90);
        }.bind(this);


        left.release = function() {
            if (!right.isDown && this.player.vy === 0) {
                this.player.vx = 0;
            }
        }.bind(this);

        //Up
        up.press = function() {
            this.player.vy = -1;
            this.player.vx = 0;
            this.player.r = utils.toRad(0);
        }.bind(this);
        
        up.release = function() {
            if (!down.isDown && this.player.vx === 0) {
                this.player.vy = 0;
            }
        }.bind(this);

        //Right
        right.press = function() {
            this.player.vx = 1;
            this.player.vy = 0;
            this.player.r = utils.toRad(90);
        }.bind(this);
        
        right.release = function() {
            if (!left.isDown && this.player.vy === 0) {
                this.player.vx = 0;
            }
        }.bind(this);

        //Down
        down.press = function() {
            this.player.vy = 1;
            this.player.vx = 0;
            this.player.r = utils.toRad(180);
        }.bind(this);
        
        down.release = function() {
            if (!up.isDown && this.player.vx === 0) {
                this.player.vy = 0;
            }
        }.bind(this);

        //Start the game loop
        this.run();
    }.bind(this);
    
    this.run = function(){
        //Loop this function 60 times per second
        requestAnimationFrame(this.run);

        this.update();

        //Render the stage
        this.renderer.render(this.stage);
    }.bind(this);
    
    this.update = function(){
        if(this.house.grid[Math.floor(this.player.y/50)][Math.floor(this.player.x/50)].walls.top==true && this.player.vy < 0){
            
        }else if(this.house.grid[Math.floor(this.player.y/50)][Math.floor(this.player.x/50)].walls.bottom==true && this.player.vy > 0){
            
        }else if(this.house.grid[Math.floor(this.player.y/50)][Math.floor(this.player.x/50)].walls.right==true && this.player.vx > 0){
            
        }else if(this.house.grid[Math.floor(this.player.y/50)][Math.floor(this.player.x/50)].walls.left==true && this.player.vx < 0){
            
        }else {
            this.player.x += this.player.vx*50;
            this.player.y += this.player.vy*50;
        }
        this.player.vx = 0;
        this.player.vy = 0;
        this.player.rotation = this.player.r;

    };
    
    this.init();
         
};