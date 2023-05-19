function calcular_idade() {
    var nascimento = document.querySelector('input#data_nascimento').value;
    var [ano, mes, dia] = nascimento.split('-').map(Number);
    var idade = 0;
    dataAtual = new Date();

    if (mes-1 < dataAtual.getMonth()) {
        idade = dataAtual.getFullYear() - ano;
    }
    else if (mes-1 == dataAtual.getMonth()) {
        if (dia >= dataAtual.getDate()) {
            idade = dataAtual.getFullYear() - ano;
        }
        else {
            idade = dataAtual.getFullYear() - ano - 1;
        }
    }
    else {
        idade = dataAtual.getFullYear() - ano - 1;
    }
    
    document.getElementById('idade').value=(idade);
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
};