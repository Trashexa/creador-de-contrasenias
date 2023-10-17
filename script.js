const resultEl = document.getElementById('resultado')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    minuscula: getRandomLower,
    mayuscula: getRandomUpper,
    numero: getRandomNumber,
    simbolo: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const password = resultEl.innerText;
  if (!password) {
    return;
  }
  navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const minuscula = lowercaseEl.checked
    const mayuscula = uppercaseEl.checked
    const numero = numbersEl.checked
    const simbolo = symbolsEl.checked

    resultEl.innerText = generarContraseña(minuscula, mayuscula, numero, simbolo, length)
})

function generarContraseña(minuscula, mayuscula, numero, simbolo, length) {
    let crearContraseña = ''
    const typesCount = minuscula + mayuscula + numero + simbolo
    const typesArr = [{minuscula}, {mayuscula}, {numero}, {simbolo}].filter(item => Object.values(item)[0])
    
    if(typesCount === 0) {
        return ''
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            crearContraseña += randomFunc[funcName]()
        })
    }

    const contraseñaFinal = crearContraseña.slice(0, length)

    return contraseñaFinal
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const simbolos = '!@#$%^&*(){}[]=<>/,.'
    return simbolos[Math.floor(Math.random() * simbolos.length)]
}