console.log("Flappy Bird Gamefi")


const sprites = new Image();// Cria uma nova instância da classe Image para carregar os sprites
sprites.src = './sprites.png'; // Define o caminho da imagem de sprites


const canvas = document.querySelector('canvas'); // Seleciona o elemento canvas do documento HTML

const contexto = canvas.getContext('2d');// Obtém o contexto de renderização 2D do canvas


///////////////////===================================  chao  ========================================//////////////////////

//  [chao]
const chao= {   //objeto que representa o chao conforme medidas de pixels em cima da imagem sprites

    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height -112, //onde o chao vai aparecer na tela do jogo canvas.height pega o total e subtrai  112

    desenha(){ //funcao dentro do objeto = "function desenha()" . a cada FPS ele chama o loop onde vai indicar o objeto e posicao 
        contexto.drawImage( 
            sprites, 
            chao.spriteX, chao.spriteY, // define a posicao inicial do passaro do arquivo sprites - sprite x, sprite y
            chao.largura, chao.altura, //refere-se ao tamanho da area da imagem que eu quero (tamanho do recorte)
            chao.x, chao.y,
            chao.largura, chao.altura,
        
        );

        contexto.drawImage(  // repete pois a imagem fica pequena na tela e para repetir eh usado a
            sprites, 
            chao.spriteX, chao.spriteY, // define a posicao inicial do passaro do arquivo sprites - sprite x, sprite y
            chao.largura, chao.altura, //refere-se ao tamanho da area da imagem que eu quero (tamanho do recorte)
            (chao.x + chao.largura) , chao.y, // + chao.largura desloca a imagem para a direita para deslocar um pousco
            chao.largura, chao.altura,
        
        );

    }

}
///////////////////===================================  plano de fundo  ========================================///////////

//  [plano de fundo]
const planoDeFundo= {   //objeto que representa o chao conforme medidas de pixels em cima da imagem sprites

    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height -204, //onde o chao vai aparecer na tela do jogo canvas.height pega o total e subtrai  112

    desenha(){ //funcao dentro do objeto = "function desenha()" . a cada FPS ele chama o loop onde vai indicar o objeto e posicao 
        contexto.fillStyle = `#70c5ce`; //define a cor da area de fundo 
        contexto.fillRect(0,0,canvas.width, canvas.height); //dizendo onde vou pintar com a cor selecionada acima

        contexto.drawImage( 
            sprites, 
            planoDeFundo.spriteX, planoDeFundo.spriteY, // define a posicao inicial do passaro do arquivo sprites - sprite x, sprite y
            planoDeFundo.largura, planoDeFundo.altura, //refere-se ao tamanho da area da imagem que eu quero (tamanho do recorte)
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        
        );

        contexto.drawImage(  // repete pois a imagem fica pequena na tela e para repetir eh usado a
            sprites, 
            planoDeFundo.spriteX, planoDeFundo.spriteY, // define a posicao inicial do passaro do arquivo sprites - sprite x, sprite y
            planoDeFundo.largura, planoDeFundo.altura, //refere-se ao tamanho da area da imagem que eu quero (tamanho do recorte)
            (planoDeFundo.x + planoDeFundo.largura) , planoDeFundo.y, // + chao.largura desloca a imagem para a direita para deslocar um pousco
            planoDeFundo.largura, planoDeFundo.altura,
        
        );

    }

}

const flappyBird = {   //objeto que representa o passaro conforme medidas de pixels em cima da imagem sprites

    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25, //gravidade do jogo
    velocidade: 0, //velocidade do jogo

    atualiza(){
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade; // soma a velocidade com gravidade para aumentar dificudade do jogo
        console.log(flappyBird.velocidade);
        flappyBird.y = flappyBird.y + flappyBird.velocidade ; // desloca 1 
    },

    desenha(){ //funcao dentro do objeto = "function desenha()" . a cada FPS ele chama o loop onde vai indicar o objeto e posicao 
        contexto.drawImage( 
            sprites, 
            flappyBird.spriteX, flappyBird.spriteY, // define a posicao inicial do passaro do arquivo sprites - sprite x, sprite y
            flappyBird.largura, flappyBird.altura, //refere-se ao tamanho da area da imagem que eu quero (tamanho do recorte)
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        
        );

    }

}

function loop() {
    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();
    flappyBird.atualiza();
    

    requestAnimationFrame(loop); //o request vai chamar


}
    



loop(); //executando a funcao