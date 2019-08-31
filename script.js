class Calculator{
  constructor(previousNumberText, currentNumberText){
  	this.previousNumberText = previousNumberText
  	this.currentNumberText = currentNumberText
  	this.clear()
    
  }

   clear(){
  this.currentNumber = ''
  this.previousNumber = ''
  this.operation = ''
 }


 delete(){
  this.currentNumber = this.currentNumber.toString().slice(0, -1)
  
 }

 appendNumber(number){
   if(number === '.' && this.currentNumber.includes('.')) return
   this.currentNumber = this.currentNumber.toString() + number.toString()
 }

 chooseOperation(operation){
  if (this.currentNumber === '') return
  if( this.previousNumber !== ''){
    this.compute()
  }
  this.operation = operation
  this.previousNumber = this.currentNumber
  this.currentNumber = ''
 }

 compute(){
  let computation 
  const prev = parseFloat(this.previousNumber)
  const current = parseFloat(this.currentNumber)
  if (isNaN(prev) || isNaN(current)) return
   switch (this.operation){
    case '+':
     computation = prev + current
     break
    case '-':
     computation = prev - current
     break
    case '*':
     computation = prev * current
     break
    case '÷':
     computation = prev / current
     break
    default:
     return
   }
   this.currentNumber =  computation
   this.operation = undefined
   this.previousNumber = '' 
 }

 updateDisplay(){
   this.currentNumberText.innerText = this.currentNumber
   if(this.operation !=null){
      this.previousNumberText.innerText = 
       `${this.previousNumber} ${this.operation}`
   }
  
  }


}




const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const equalsButton = document.querySelector('[data-equals]')
const previousNumberText = document.querySelector('[data-previous-number]')
const currentNumberText = document.querySelector('[data-current-number]')



const calculator = new Calculator(previousNumberText, currentNumberText)
 
numberButtons.forEach(button => {
	button.addEventListener('click', ()=>{
	  calculator.appendNumber(button.innerText)
	  calculator.updateDisplay()
	})
})

operationButtons.forEach(button => {
  button.addEventListener('click', ()=>{
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})


equalsButton.addEventListener('click', button =>{
  calculator.compute()
  calculator.updateDisplay()
})


allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})


deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})



