function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  // a acessar a webcam
  video = createCapture(VIDEO);
  video.hide();
  // Carregue o modelo Mobilenet 
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}

// escreva o código para a função modelLoaded().

function modelLoaded() {
    console.log('Model Loaded!');
}

// escreva um código para colocar a visualização da webcam na
// tela.

function draw() {
  image(video, 0, 0, 300, 300);
  // Chame a função predefinida de ml5.js que é usada para comparar a visualização da webcam com o
  // modelo
  classifier.classify(video, gotResult);
}

// defina uma variável previousResult. Esta variável
// será usada para manter a etiqueta do resultado
var previousResult = '';


// Defina a função gotresult() que será usada para buscar o resultado vindo do modelo e exibir na
// página web.
function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {

    //verificar se confidence do resultado é maior que 0,5 e também vamos verificar se a
    // label do resultado anterior é maior que a label do resultado atual
    if((results[0].confidence > 0.5) && (previousResult != results[0].label)){
      console.log(results);
      // atualizar a variável previousResult
      previousResult = results[0].label;
    //  Usaremos a API de fala da Web window.speechSynthesis que é usada para falar.
      var synth = window.speechSynthesis;
      // armazenaremos os dados que queremos que o aplicativo Web fale em uma variável.
      speakData = 'O objeto detectado é - '+results[0].label;
//       Usaremos a função SpeechSynthesisUtterance() Web Speech API usada para converter o texto em
// fala
      var utterThis = new SpeechSynthesisUtterance(speakData);
//       usaremos a função speak() da API de Fala Web window.speechSynthesis para falar os
// dados armazenados na variável utterThis
      synth.speak(utterThis);

      // atualizaremos o elemento HTML
      document.getElementById("resultObjectName").innerHTML = results[0].label;
      document.getElementById("resultObjectAccuracy").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}
