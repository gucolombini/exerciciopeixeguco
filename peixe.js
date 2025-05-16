var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var peixinho;

function preload() {
    this.load.image('mar', 'assets/bg_azul-escuro.png');
    peixinho = this.load.image('peixe', 'assets/peixes/peixe_serio.png');
    this.load.image('eyewhite', 'assets/peixes/eyewhite.png');
    this.load.image('bob', 'assets/peixes/bobesponjanoeye.png');
    this.load.image('logo', 'assets/logo-inteli_branco.png');
    this.load.image('bolha', 'assets/peixes/bolha.png');
    this.load.image('olho', 'assets/peixes/eyeangled.png');
}

function create() {
    this.add.image(400, 300, 'mar');
    this.add.image(400, 525, 'logo').setScale(0.5);
    eyewhite = this.add.image(-5000, 525, 'eyewhite');
    olho1 = this.add.image(250, 250, 'olho')
    olho2 = this.add.image(250, 250, 'olho')
    bob = this.add.image(-5000, 525, 'bob').setScale(1)
    peixinho = this.add.image(400, 300, 'peixe').setOrigin(0.5, 0.5);
    peixinho.setFlip(true, false)
    olho1.setFlip(false, true)
    olho2.setFlip(false, true)

}
var bobdiff
var bobaccel = 0
var simplex
var olho1centrox
var olho2centrox
var radian1
var radian2
var rot1
var rot2

function update() {
    peixinho.x = this.input.x;
    peixinho.y = this.input.y;
    bobdiff = Math.round(bob.x - this.input.x)
    console.log(bobdiff)

//aqui ele determina se o bob ta proximo o suficiente do mouse
//se estiver longe, ele continua andando, senao ele tenta parar
//caso esteja indo para o lado contrário, ele virará mais rápido
    if (bobdiff < 10){
        if(bobdiff > -10){
            console.log('success')
            if(-1 < bobaccel < 1) {
                console.log('under')
                bob.x = Math.round(bob.x)
            } else {
                if (bobaccel > 0.5) {
                    bobaccel = bobaccel - 0.5
                } else {
                    bobaccel = bobaccel + 0.5
                }
            }
        } else {
            console.log('fail right')
                if(bobaccel > 0) {bobaccel = bobaccel + 0.5} else {bobaccel = bobaccel + 1}
        }
    } else {
        console.log('fail left')
                if(bobaccel < 0) {bobaccel = bobaccel - 0.5} else {bobaccel = bobaccel - 1}
    }
    if (bobaccel > 25) {
        bobaccel = 25
    }
    if (bobaccel < -25) {
        bobaccel = -25
    }
    bob.x = bob.x + bobaccel
    //posicionamento do olho pra fica bonito :v
    eyewhite.x = bob.x
    olho1centrox = bob.x - 100
    olho2centrox = bob.x + 100
    olho1.x = olho1centrox
    olho2.x = olho2centrox
    // calcula o angulo para girar o olho na direçao do mouse 
    // (eu nao entendo mt bem a matematica mas funciona heheheh)
    radian1 = Math.atan2(this.input.x - olho1.x, this.input.y - 250)
    radian2 = Math.atan2(this.input.x - olho2.x, this.input.y - 250)
    rot1 = radian1 * (180 / Math.PI) * -1 + 180;
    rot2 = radian2 * (180 / Math.PI) * -1 + 180;
    olho1.angle = rot1
    olho2.angle = rot2
}