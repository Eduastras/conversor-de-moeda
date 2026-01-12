// Cotação da moeda do dia.
const USD = 5.37 // Dólar Américano
const EUR = 6.27 // Euro
const GBP = 7.20 // Libra Esterlina
const JPY = 0.034 // Iene
const AUD = 3.60 // Dólar Australino
const CHF = 6.70 // Franco Suiço
const CAD = 3.86 // Dólar Canadense
const CNY = 0.77 // Renminbi (Yuan)
const ARS = 0.0037 // Peso Argentina
const TRY = 0.12 // Lira Turca

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
        case "JPY":
            convertCurrency(amount.value, JPY, "¥")
            break
        case "AUD":
            convertCurrency(amount.value, AUD, "$")
            break
        case "CHF":
            convertCurrency(amount.value, CHF, "₣")
            break
        case "CAD":
            convertCurrency(amount.value, CAD, "C$")
            break
        case "CNY":
            convertCurrency(amount.value, CNY, "CN¥")
            break
        case "ARS":
            convertCurrency(amount.value, ARS, "$")
            break
        case "TRY":
            convertCurrency(amount.value, TRY, "₺")
            break
        default:
            window.alert("Moeda Inválida!")
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
    // Converte para número para utilizar o .toLocaleString para formatar no padrão BRL (R$ 00,00).
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}


