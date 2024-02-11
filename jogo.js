console.log("Flappy Bird Gamefi")

const som_HIT = new Audio();
som_HIT.src ='./efeitos/hit.wav';

const sprites = new Image();// Cria uma nova instância da classe Image para carregar os sprites
sprites.src = './sprites.png'; // Define o caminho da imagem de sprites


const canvas = document.querySelector('canvas'); // Seleciona o elemento canvas do documento HTML

const contexto = canvas.getContext('2d');// Obtém o contexto de renderização 2D do canvas


function fazColisao(flappyBird, chao){  //funcao colisao
    const flappyBirdY = flappyBird.y + flappyBird.altura // quando tocar na altura da direcao do chao = flappyBird.y + flappyBird.altura
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY){ // quando a localizacao do passaro for maior ou igual a localizacao do chao, eh uma colisao
        return true;

    }
    return false; //caso contrario retorna falso

}


///////////////////===================================  chao  ========================================//////////////////////

//  [chao]

function criaChao() {
    const chao= {   //objeto que representa o chao conforme medidas de pixels em cima da imagem sprites

        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height -112, //onde o chao vai aparecer na tela do jogo canvas.height pega o total e subtrai  112
        atualiza (){
            const movimentoDoChao = 1; //para cada quadro o chao vai mover 1px

            
            const repeteEm = chao.largura / 2;//quando que o chao vai se repetir
            const movimentacao = chao.x - movimentoDoChao; //a movimentacao de fato
           // console.log("atualizac chao"); //debug 

           // console.log('[chao.x ] ', chao.x ); //debug
           //console.log('[repeteEm ] ', repeteEm); //debug
           // console.log('[movimentacao ] ', movimentacao % repeteEm ); // DEBUG // quando pego o resto da divisao nunca vai ficar maior que o numero base q estamos usando para dividir, portanto ele sempre vai reduzindo o valor de movimentacao e atela nao acaba

           chao.x = movimentacao % repeteEm; // quando pego o resto da divisao nunca vai ficar maior que o numero base q estamos usando para dividir, portanto ele sempre vai reduzindo o valor de movimentacao e atela nao acaba
        },
    
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
    return chao; // Retorna o objeto chao criado


};


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

    },

};

///////////////////===================================  flappyBird  ========================================///////////
// [flappyBird]

function criaFlappyBird(){ //criado funcao flappy bird para sempre que reiniciar o jogo ele zera todas as infos q foram gerada ex: gravidade, velocidade, posicao
    const flappyBird = {   //objeto que representa o passaro conforme medidas de pixels em cima da imagem sprites
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        gravidade: 0.25, //gravidade do jogo
        velocidade: 0, //velocidade do jogo
        pulo: 4.6,
     
        pula(){ ////////// PULA
            console.log('devo pular!!!')
    
            //console.log('[antes]', flappyBird.velocidade); //para debug
           flappyBird.velocidade = - flappyBird.pulo; // reset da gravidade e velocidade
           // console.log('[depois]', flappyBird.velocidade); //para debug
        },
    
        atualiza(){
            if(fazColisao(flappyBird, globais.chao)){
                console.log('Fez colisaaaao'); //debug
                som_HIT.play(); //WEB AUDIO API

                setTimeout(() => { //fez a colisao e tem um delay para a transicao de tela

                }, 500);
    
                mudaParaTela(Telas.INICIO) //quando tiver a colisao ele muda para tela inicio para iniciar o jogo novamente
                return; //return para que o codigo de baixo n'ao seja mais executado
            }
    
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade; // soma a velocidade com gravidade para aumentar dificudade do jogo
            //console.log(flappyBird.velocidade); //debug para ver a velocidade aumentando
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
    return flappyBird;

}




///////////////////===================================  MensagemGetReady  ========================================///////////
// [MensagemGetReady]

const messageGetReady = {   //objeto que representa o passaro conforme medidas de pixels em cima da imagem sprites

    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 154,
    x: (canvas.width / 2) -174 / 2 ,
    y: 50,
    desenha(){ //funcao dentro do objeto = "function desenha()" . a cada FPS ele chama o loop onde vai indicar o objeto e posicao 
        contexto.drawImage( 
            sprites, 
            messageGetReady.spriteX, messageGetReady.spriteY, // define a posicao inicial do passaro do arquivo sprites - sprite x, sprite y
            messageGetReady.largura, messageGetReady.altura, //refere-se ao tamanho da area da imagem que eu quero (tamanho do recorte)
            messageGetReady.x, messageGetReady.y,
            messageGetReady.largura, messageGetReady.altura,
        
        );

    }
   

}


//////////////======================================= [Telas]===============================////////////////////

const globais = {}; //globais eh objeto
let telaAtiva = {}; // let pois o valor eh sempre alterado
function mudaParaTela(novaTela){ // funcao que vai mudar a tela
    telaAtiva = novaTela; // quando iniciar o jogo vai pegar a tela ativa e jogar para nova tela

    if(telaAtiva.inicializa) {
        telaAtiva.inicializa();
        
     }

}

const Telas = {    // a tela contem as coisas que atualizam nela
    INICIO: { //OBJETO DENTRO DA TELA DE INICIO
        inicializa(){ //
            globais.flappyBird = criaFlappyBird();  //acessa 
            globais.chao = criaChao();
        },


        desenha() {
            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            messageGetReady.desenha();
        },

        click(){ // faz com que haja a troca da tela conforme click na tela
            mudaParaTela(Telas.Jogo);

        },

        atualiza() {
            globais.chao.atualiza();
            
        }


    }
};


//////////////======================================= [Telas JOGO]===============================////////////////////
Telas.Jogo = { // o jogo contem as coisas que atualizam nele
    desenha(){
        planoDeFundo.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();

    },

    click(){ // faz com que haja a troca da tela conforme click na tela
        globais.flappyBird.pula();

    },

    atualiza() {
        globais.flappyBird.atualiza();
        globais.chao.atualiza();

    }
};








function loop() {
   
    telaAtiva.desenha(); //loop vai acessar variavel telaAtiva e vai passar a considerar qual desenho do atualiza q ele vai considerar
    telaAtiva.atualiza();

    requestAnimationFrame(loop); //o request vai chamar


}
    
window.addEventListener("click",function(){ // verifica quando houve click na janela do navegador; function cada tela tem um tipo de comportamento
    if(telaAtiva.click){
        telaAtiva.click();
        
    }
});

mudaParaTela(Telas.INICIO);
loop(); //executando a funcao