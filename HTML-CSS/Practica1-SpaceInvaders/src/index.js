// La practica la hicimos Oscar Gonzalez y yo

function initCanvas() {
    var canvas = document.getElementById('canvas-game');
    var ctx = canvas.getContext('2d');

    // Declaramos las imagenes a utilizar
    var ship = new Image();
    var enemy = new Image();
    var meteor = new Image();
    var background = new Image();

    var v = 0.7;
    //var randomv = Math.random()*(maxv-minv)+minv;

    /*
    ship.src = "../Images/spaceship.png";
    enemy.src = "../Images/satelite.png";
    meteor.src = "../Images/meteor.png";*/

    background.src = "https://images5.alphacoders.com/286/thumb-1920-286987.jpg";
    ship.src = "https://images.emojiterra.com/openmoji/v12.2/512px/1f7e6.png";
    enemy.src = "https://images.emojiterra.com/openmoji/v12.2/512px/1f7e5.png";
    meteor.src = "https://images.emojiterra.com/openmoji/v12.2/512px/1f7e9.png";

    var canvasWidth = ctx.canvas.width;
    var canvasHeight = ctx.canvas.heigth;

    // Funcion que nos devuelve la config de cada nave enemiga
    var enemyTemplate = function(options) {
        return {
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.image || enemy,
        }
    }

    // Array que almacena naves enemigas
    var enemies = [
        new enemyTemplate({ id:'enemy',x:50,y:-160,w:100,h:100,image:meteor }),
        new enemyTemplate({ id:'enemy2',x:150,y:-810,w:100,h:100 }),
        new enemyTemplate({ id:'enemy3',x:250,y:-420,w:100,h:100,image:meteor }),
        new enemyTemplate({ id:'enemy3',x:350,y:-240,w:100,h:100 }),
        new enemyTemplate({ id:'enemy3',x:450,y:-609,w:100,h:100 }),
        new enemyTemplate({ id:'enemy3',x:550,y:-333,w:100,h:100 }),
    ];

    // Funcion para mostrar enemigos
    var renderEnemies = function(enemyList) {
        for(var i=0; i<enemyList.length; i++){
            var enemy = enemyList[i];
            ctx.drawImage(enemy.image, enemy.x, enemy.y+=v, enemy.w, enemy.h);
            
            launcher.hitDetectLowerLevel(enemy);
        }
    }

    function Launcher() {
        this.y = 500,
        this.x = canvasWidth*.5 -25,
        this.w = 100,
        this.h = 100,
        this.direction,
        this.bg = "lightgreen";
        this.misile= [],

        this.gameStatus = {
            over: false,
            message: "",
            fillStyle: 'red',
            font: 'italic bold 36px Arial, sans-serif'
        }

        this.render = function() {
            if(this.direction === 'left'){
                this.x -= 2;
            }else if(this.direction === 'right'){
                this.x += 2;
            }
            ctx.fillStyle = this.bg;
            ctx.drawImage(background,0,0);
            ctx.drawImage(ship,this.x,this.y,100,100);

            // Misiles
            for(var i=0; i<this.misile.length; i++){
                var m = this.misile[i];
                ctx.fillRect(m.x, m.y-=5, m.w, m.h); // Dibujamos la bala con una nueva posicion y

                this.hitDetect(m, i);

                // Cuando la bala llegue al tope, la borramos
                if(m.y <= 0){
                    this.misile.splice(i, 1); // i es el elemento, 1 es cuantos elementos queremos remover
                }
            }

            if(enemies.length === 0){
                clearInterval(animateInterval);
                ctx.fillStyle = 'green';
                ctx.font = this.gameStatus.font;
                ctx.fillText('You win!', canvasWidth*.5 -80, 50);
            }
        }

        this.hitDetect = function(m, mi){
            for(var i=0; i<enemies.length; i++){
                var e = enemies[i];

                if(m.x <= e.x + e.w && m.x + m.w >= e.x && m.y >= e.y && m.y <= e.y + e.h){
                    enemies.splice(i,1);
                }
            }
        }

        this.hitDetectLowerLevel = function(enemy){
            if(enemy.y > 600){
                enemy.y = Math.random()*(-900-(-50))+(-50);
                enemy.x = Math.random()*(550-60)+60;
            }

            // Cuando los enemigos te tocan
            if((enemy.y < this.y + 50 && enemy.y > this.y - 50) && (enemy.x < this.x + 45 && enemy.x > this.x - 45)){
                this.gameStatus.over = true;
                this.gameStatus.message = "You died";
            }
        }
    }

    var launcher = new Launcher();

    function animate() {
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        launcher.render()
        renderEnemies(enemies);
    }

    var animateInterval = setInterval(animate, 6);

    // Cuando se presiona una tecla izquierda 37
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37){
            launcher.direction = 'left';
            // Impedimos que se salga del canvas
            if(launcher.x < canvasWidth *.2 -130){
                launcher.x += 0;
                launcher.direction = '';
            }
        }
    });

    // Cuando no se presiona la tecla izquierda 37
    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 37){
            launcher.x += 0;
            launcher.direction = '';
        }
    });

    // Cuando se presiona la tecla derecha 39
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 39){
            launcher.direction = 'right';
            // Impedimos que se salga del canvas
            if(launcher.x > canvasWidth - 110){
                launcher.x -= 0;
                launcher.direction = '';
            }
        }
    });
    
    // Cuando no se presiona la tecla derecha 39
    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 39){
            launcher.x -= 0;
            launcher.direction = '';
        }
    });

    // Cuando no se presiona la tecla P
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 80){
            location.reload();
        }
    });

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 32){
            launcher.misile.push({
                x: launcher.x + 50, // Las balas salen del centro de la nave
                y: launcher.y,
                w: 3,
                h: 10,
            })
        }
    })

}

window.addEventListener('load', function(event) {
    initCanvas();
})