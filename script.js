function calcularIMC() {
    const pesoInput = document.getElementById('peso').value.replace(',', '.');
    const alturaInput = document.getElementById('altura').value.replace(',', '.');
    const peso = parseFloat(pesoInput);
    const altura = parseFloat(alturaInput);
    const resultado = document.getElementById('resultado');
    const silhueta = document.getElementById('silhueta');
    const silhuetaWrapper = silhueta.parentElement;

    removerHighlight();

    if (isNaN(peso) || isNaN(altura) || altura <= 0) {
        resultado.textContent = "Insira um número valido.";
        silhuetaWrapper.style.backgroundColor = "#333";
        silhueta.style.transform = "scaleX(1)";
        return;
    }

    const imc = peso / (altura * altura);
    resultado.textContent = `Seu IMC é: ${imc.toFixed(2).replace('.', ',')}`;

    let scale = 1; // Valor base
    if (imc < 18.5) {
        destacarLinha('linha1', 'yellow');
        silhuetaWrapper.style.backgroundColor = '#ffd900';
        scale = 0.9;
    } else if (imc < 24.9) {
        destacarLinha('linha2', 'green');
        silhuetaWrapper.style.backgroundColor = '#66bb6a';
        scale = 1;
    } else if (imc < 29.9) {
        destacarLinha('linha3', 'orange');
        silhuetaWrapper.style.backgroundColor = '#fb8c00';
        scale = 1.15;
    } else if (imc < 39.9) {
        destacarLinha('linha4', 'red');
        silhuetaWrapper.style.backgroundColor = '#e53935';
        scale = 1.3;
    } else {
        destacarLinha('linha5', 'darkred');
        silhuetaWrapper.style.backgroundColor = '#8b0000';
        scale = 1.5;
    }

    silhueta.style.transform = `scaleX(${scale})`;
}


function limpar() {
    document.getElementById('peso').value = '';
    document.getElementById('altura').value = '';
    document.getElementById('resultado').textContent = '';
    removerHighlight();

    const silhueta = document.getElementById('silhueta');
    silhueta.style.transform = "scaleX(1)";
    silhueta.parentElement.style.backgroundColor = '#555';
}


function destacarLinha(id, cor) {
    const linha = document.getElementById(id);
    linha.classList.add('highlight', cor);
}

function removerHighlight() {
    ['linha1', 'linha2', 'linha3', 'linha4', 'linha5'].forEach(id => {
        const linha = document.getElementById(id);
        linha.className = '';
    });
}

document.getElementById('calcular').addEventListener('click', calcularIMC);
document.getElementById('limpar').addEventListener('click', limpar);
document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        calcularIMC();
    }
});
