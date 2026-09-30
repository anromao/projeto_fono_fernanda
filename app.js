//conectando o frontend ao backend
const URL_API = 'http://localhost:3000/api/usuarios'

//declarando as variáveis globais
const form = document.getElementById('form-usuarios')
const inputId = document.getElementById('usuario-id')
const inputNome = document.getElementById('nome')
const inputCPF = document.getElementById('cpf')
const inputTelCel = document.getElementById('telcel')
const inputEmail = document.getElementById('email')
const corpoTabela = document.getElementById('corpo-tabela')


//carregando os eventos
document.addEventListener('DOMContentLoaded', carregarUsuarios)

//CRUD
function preencherForm(id, nome, cpf, telcel, email) {
    inputId.value = id
    inputNome.value = nome
    inputCpf.value = cpf
    inputTelCel = telcel
    inputEmail.value = email
}