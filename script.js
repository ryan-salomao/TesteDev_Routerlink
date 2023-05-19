function limpa_formulario_data_nascimento() {
    document.getElementById('data_nascimento').value=("");
}

function diferenca_anos(dAtual, dNasc) {
    var diferenca =(dAtual.getTime() - dNasc.getTime()) / 1000;
    diferenca /= (60 * 60 * 24);
    return Math.abs(Math.round(diferenca/365.25)); 
}

function define_data_limite() {
    var hoje = new Date().toISOString().split('T')[0];
    document.getElementById('data_nascimento').setAttribute('max', hoje);
}
define_data_limite();

function calcular_idade() {
    var nascimento = document.querySelector('input#data_nascimento').value;
    var [ano, mes, dia] = nascimento.split('-').map(Number);
    var idade = 0;
    var dataAtual = new Date();
    var dataNascimento = new Date(ano, mes, dia);

    idade = diferenca_anos(dataAtual, dataNascimento);

    if (mes-1 < dataAtual.getMonth()) {
        idade = dataAtual.getFullYear() - ano;
    }
    else if (mes-1 == dataAtual.getMonth()) {
        if (dia <= dataAtual.getDate()) {
            idade = dataAtual.getFullYear() - ano;
        }
        else {
            idade = dataAtual.getFullYear() - ano - 1;
        }
    }
    else {
        idade = dataAtual.getFullYear() - ano - 1; // anos iguais dá -1, cai na validação
    }

    if (idade <= 0) {
        alert("Data de Nascimento inválida. *Menos de 1 ano");
        limpa_formulario_data_nascimento();
    }
    // caso seja necessário validação de idade:
    // else if (idade < 18) {
        // alert("Data de Nascimento inválida. *Menor de idade");
        // limpa_formulario_data_nascimento();
    // }
    else {
        document.getElementById('idade').value=(idade);
    }
}

function focus_numero() {
    document.getElementById('numero').focus();
}

function limpa_formulario_cep() {
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
    document.getElementById('ibge').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
        document.getElementById('ibge').value=(conteudo.ibge);
    }
    else {
        limpa_formulario_cep();
        alert("CEP não encontrado.");
    }
}
        
function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '');

    if (cep != "") {

        var validacep = /^[0-9]{8}$/;

        if(validacep.test(cep)) {

            document.getElementById('rua').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('uf').value="...";
            document.getElementById('ibge').value="...";

            var script = document.createElement('script');

            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            document.body.appendChild(script);
        }
        else {
            limpa_formulario_cep();
            alert("Formato de CEP inválido.");
        }
    }
    else {
        limpa_formulario_cep();
    }
}