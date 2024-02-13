console.log("Flappy Bird Gamefi")

let frames = 0; //declarando como 0
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
        
        pulo: 4.6,
     
        pula(){ ////////// PULA
           // console.log('devo pular!!!'); //debug
    
            //console.log('[antes]', flappyBird.velocidade); //para debug
           flappyBird.velocidade = - flappyBird.pulo; // reset da gravidade e velocidade
           // console.log('[depois]', flappyBird.velocidade); //para debug
        },

        gravidade: 0.25, //gravidade do jogo
        velocidade: 0, //velocidade do jogo

        atualiza(){
            if(fazColisao(flappyBird, globais.chao)){
               // console.log('Fez colisaaaao'); //debug
                som_HIT.play(); //WEB AUDIO API

                setTimeout(() => { //fez a colisao e tem um delay para a transicao de tela

                }, 500);
    
                mudaParaTela(Telas.GAME_OVER) //quando tiver a colisao ele muda para tela inicio para iniciar o jogo novamente
                return; //return para que o codigo de baixo n'ao seja mais executado
            }
    
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade; // soma a velocidade com gravidade para aumentar dificudade do jogo
            //console.log(flappyBird.velocidade); //debug para ver a velocidade aumentando
            flappyBird.y = flappyBird.y + flappyBird.velocidade ; // desloca 1 
        },

        movimentos: [
            { spriteX: 0 , spriteY: 0 }, // Bird asa pra cima , mov1
            { spriteX: 0 , spriteY: 26 }, // Bird asa pro meio, mov2
            { spriteX: 0 , spriteY: 52 }, // Bird asa pra baixo, mov3
            { spriteX: 0 , spriteY: 26 }, // Bird asa pro meio, mov4
        ],

        frameAtual: 0, //movimento das asas
        atualizaOFrameAtual(){ //para cada vez que entra a funcao desenha, ele incrementa o frameAtual
            const intervaloDeFrame = 10; // A cada 10 frames eu indico qual movimento do passaro que quero
            const passouOIntervalo = frames % intervaloDeFrame === 0; // frames pelo modulo(%) pelo intervaloDeFrames // limitando o numero// ===0 para limitar
           // console.log(intervaloDeFrame) //Debug

            if(passouOIntervalo) {

            
            const baseDoIncremento = 1;
            const incremento = baseDoIncremento + flappyBird.frameAtual;
            const baseRepeticao = flappyBird.movimentos.length; //a baseRepeticao eh o tamanho da quantidade de movimento q temos = 4 movimentos 
            flappyBird.frameAtual = incremento % baseRepeticao

            //console.log("incremento", incremento); //DEBUG  // incremento sempre de 1 em 1 e acompanha o frame
            //console.log("base repeticao", baseRepeticao); //DEBUG  // base sempre 4 pq tem 4 tipos de movimentos
            //console.log("frame", incremento % baseRepeticao);//DEBUG  //  quando o frame for 4 e a baseRepeticao 4 ele volta pra 0 pq os arrays movimentos comecam do zero
            
            //console.log(frames); //debug, aumenta o valor a cada quadro por segundo para 
            }
        


        },
    
        desenha(){ //funcao dentro do objeto = "function desenha()" . a cada FPS ele chama o loop onde vai indicar o objeto e posicao 
            flappyBird.atualizaOFrameAtual(); 
            const  { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual]; //extraindo os valores de movimento

            contexto.drawImage( 
                sprites, 
                spriteX, spriteY, // define a posicao inicial do passaro do arquivo sprites - sprite x, sprite y
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

///////////////////===================================  MessageGameOver  ========================================///////////
// [MessageGameOver]

const messageGameOver = {   //objeto que representa o passaro conforme medidas de pixels em cima da imagem sprites

    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: (canvas.width / 2) -226 / 2 ,
    y: 50,
    desenha(){ //funcao dentro do objeto = "function desenha()" . a cada FPS ele chama o loop onde vai indicar o objeto e posicao 
        contexto.drawImage( 
            sprites, 
            messageGameOver.spriteX, messageGameOver.spriteY, // define a posicao inicial do passaro do arquivo sprites - sprite x, sprite y
            messageGameOver.largura, messageGameOver.altura, //refere-se ao tamanho da area da imagem que eu quero (tamanho do recorte)
            messageGameOver.x, messageGameOver.y,
            messageGameOver.largura, messageGameOver.altura,
        
        );

    }
   

}
//////////////======================================= [criaCanos]===============================////////////////////

function criaCanos(){
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            canos.pares.forEach(function(par){ //para cada par de canos que eu tenho eu desenho os valores abaixo

                const yRandom = par.y; //valor de random, ambos dos canos irao aparecer dinamicamente na tela

                const espacamentoEntreCanos = 110 ; // define o espacamento de um cano e outro

                const canoCeuX = par.x; 
                const canoCeuY = yRandom; //definindo cano de cima onde o 0 eh o topo

                

                //==========CANO DO CEU==========
                contexto.drawImage( // desenhos o cano do ceu
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )
                //==========CANO DO CHAO==========
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom; // define q o cano do chao vai comecar no final do cano cel + o valor que for definido em espacamentoEntreCanos (eh o espaco para o passaro passar)
                contexto.drawImage( // desenhos o cano do chao
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
            
                )
                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }                
            })
        },
        
        temColisaoComOFlappyBird(par) { //FUNCAO COLISAO COM CANOS
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
           
           // console.log('Cabeça:', cabecaDoFlappy); //debug
            //console.log('Pé:', peDoFlappy); //debug

            if((globais.flappyBird.x + globais.flappyBird.largura -4) >= par.x ) {
               // console.log('Passou pela posição x do cano'); //debug

                //console.log("invadiu area dos canos"); //debug
                if(cabecaDoFlappy <= par.canoCeu.y){  // verificando se cabeca do passaro vai encostra no cano do ceu
                    console.log('Cabeça do Flappy Bird colidiu com o cano superior'); //debug


                    return true;
                }

                if(peDoFlappy >= par.canoChao.y){
                    console.log('Pé do Flappy Bird colidiu com o cano inferior'); //debug
 
                    return true
                }
            }
            return false;

        },
        pares: [],  //lista de canos para serem atualizados na tela
        atualiza() {
            const passou100Frames = frames % 100 === 0; //resultado da divisao do frame atual o resto = 0

            if(passou100Frames){ //se fpassou 100 frames eu vou adicionar mais um cano na lista de canos
               console.log("passou 100 frames") ; // DEBUG
               canos.pares.push({  //lista de canos para serem atualizados na tela
                  
                    x: canvas.width,
                    y: -150 * (Math.random() + 1 ), //Math.random gera valores aleatorios // deixando numero aleatorio sempre maior que -150
                });
            }
            canos.pares.forEach(function(par){ // pegar os pares desenhados e fazerem eles andarem na tela
                par.x = par.x - 2 ; // vai andar 2 pixels a cada vez que atualizar a tela 
                //console.log("teste") //debug


               
                if(canos.temColisaoComOFlappyBird(par)) {
                    console.log('Você perdeu!'); //debug
                    som_HIT.play();
                    mudaParaTela(Telas.GAME_OVER);
                    

                }
                

                if(par.x + canos.largura <= 0) { //limpando memoria user, apagando dados dos canos q ja passaram

                    canos.pares.shift(); 
                }
                //console.log("Posição dos canos:", par.x, par.y); //debug


            });

        }

        
    }

    return canos;
}
//////////////======================================= [PLACAR]===============================////////////////////


function criaPlacar() { // config placar
    const placar = {
        pontuacao: 0 ,
        desenha() {
            contexto.font = '25px "VT323" ';
            contexto.textAlign = "right"//alinhando texto a direita
            contexto.fillStyle = 'black';
            contexto.fillText(`SCORE ${placar.pontuacao}`, canvas.width -10, 35); // canvas.width pega a medida da tela; rendereizando
            

        },
        atualiza() {
            const intervaloDeFrame = 20; // A cada 10 frames eu indico qual movimento do passaro que quero
            const passouOIntervalo = frames % intervaloDeFrame === 0; // frames pelo modulo(%) pelo intervaloDeFrames // limitando o numero// ===0 para limitar
           
            if (passouOIntervalo){
                placar.pontuacao = placar.pontuacao + 1;

            }

        }
    }
    return placar;
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
            globais.canos = criaCanos(); //funcao que vai criar um objeto na tela para ter o controle de atualizar e fazer mover
            //console.log ("cria canos", criaCanos); //debug
        },


        desenha() {
            planoDeFundo.desenha();
            
            globais.flappyBird.desenha();

            globais.chao.desenha();
            
            //console.log ("cria canos", canos.desenha); //debug
            
            messageGetReady.desenha(); // mensagem de inicio do jogo
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
    inicializa(){
        globais.placar = criaPlacar(); //funcao construtor que cria um onjeto que vai ser atualizado a cada ciclo x
    },
    desenha(){
        planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha();

    },

    click(){ // faz com que haja a troca da tela conforme click na tela
        globais.flappyBird.pula();

    },

    atualiza() {
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
        globais.placar.atualiza();
    }
};



Telas.GAME_OVER = {
    desenha() {
      messageGameOver.desenha();
    },
    atualiza() {
      
    },
    click() {
      mudaParaTela(Telas.INICIO);
    }
  }




function loop() {
   
    telaAtiva.desenha(); //loop vai acessar variavel telaAtiva e vai passar a considerar qual desenho do atualiza q ele vai considerar
    telaAtiva.atualiza();
    
    frames = frames + 1; //soma a cada fps do jogo
    requestAnimationFrame(loop); //o request vai chamar


}
    
window.addEventListener("click",function(){ // verifica quando houve click na janela do navegador; function cada tela tem um tipo de comportamento
    if(telaAtiva.click){
        telaAtiva.click();
        
    }
});

mudaParaTela(Telas.INICIO);
loop(); //executando a funcao