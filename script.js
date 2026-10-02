function enviarMensagem(event) {
    event.preventDefault()

const nome = document.getElementById('nome').value
const mensagem = document.getElementById('mensagem').value
const telefone = '5511977035162'
const texto = `Olá, meu nome é ${nome} entro em contato pelo seu site e minha mensagem é a seguinte: ${mensagem}`
const textoFormatado = encodeURIComponent(texto)
const whatsappUrl = `https://wa.me/${telefone}?text=${textoFormatado}`
window.open(whatsappUrl, '_blank')
    document.getElementById('formulario').reset() // Limpa o formulário após o envio
}


