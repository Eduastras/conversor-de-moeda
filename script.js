// Cotação da moeda do dia.
const USD = 5.37
const EUR = 6.27
const GBP = 7.20

// Obtendo os elementos DOM do formúlario.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main > footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manupilando o input amount, para receber somente números.
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    // replace serve para substituir os caracteres encontrado no regex, por aquilo que colocarmos.
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Capturando o evento de submit/envio do formulário.
form.onsubmit = function(event) {
    event.preventDefault()

    // condicional, que vê qual moeda o usuário escolheu, e chamando a function convertCurrency. Mandando o valor, preço atual(cotação) e simbolo da moeda.
    switch(currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break
        default:
            window.alert("Valor inválido!")
    }
  
}

// Função para converter a moeda. (valor, preço atual(cotação) e simbolo da moeda)
function convertCurrency (amount, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada.
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
        // multiplicando o amount pelo price, para saber o resultado em reais.

        // calcula o total.
        let total = amount * price

        // Verifica se o resultado não é um número.
        if(isNaN(total)) {
            // return, serrve para não executar o restante do código
            return alert("Por favor, digite o valor corretamente para conversão!")
        }

        // Formatar o valor total.
        result.textContent = `${formatCurrencyBRL(total)} Reais`.replace("R$", "")
        
        // Aplica a classe "show-result" que deixa o footer, display block, para mostrar o resultado.
        footer.classList.add("show-result")
    } catch(error) {
        // Remove a classe do footer.
        footer.classList.remove("show-result")
        
        console.log(error)
        window.alert("Não foi possível converter, tente novamente mais tarde!")
    }
}

// Convertendo a moeda para Reais Brasil.
function formatCurrencyBRL(value) {
    // Converte para número para utilizar o .toLocaleString para formatar no padrão BRL (R$ 00,00)
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}


