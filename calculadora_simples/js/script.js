const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const button = document.querySelectorAll("#buttons-container button");

class calculator{
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";

    }
        //add digit to calculator screen | adicionar dígito à tela da calculadora
    addDigit(digit) {
        console.log(digit);  
        // check if current operations alread has a dot | verifique se as operações atuais já possuem um ponto
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;   
             
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

        //Process all calculator operations | Processe todas as operações da calculadora
        processOperation(operation){

            //check if current is empty | verifique se a corrente está vazia
            if(this.currentOperationText.innerText === "" && operation !== "C"){
                    // change operation | mudança de operação
                if(this.previousOperationText !== ""){
                  this.changeOperation(operation);
                }
                return;
            }

            // Get current and previous value | Obtenha o valor atual e anterior
            let operationValue;
            let previous = +this.previousOperationText.innerText.split(" ")[0];
            let current = +this.currentOperationText.innerText;

            switch(operation){
                case "+":
                    operationValue = previous + current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
                case "-":
                    operationValue = previous - current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
                case "/":
                    operationValue = previous / current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
                case "*":
                    operationValue = previous * current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
                case "DEL":
                    this.processDelOperator();
                    break;
                case "CE":
                    this.processClearCurrentOperator();
                    break;
                case "C":
                    this.processClearOperator();
                    break;
                case "=":
                    this.processEqualOperator();
                    break;
                default:
                    return;
            }
        }

        // Change values of the calculator screen | Alterar valores da tela da calculadora
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null,
    ){
       
        if(operationValue === null){
            //  Append number to current value | Anexar número ao valor atual
            this.currentOperationText.innerText += this.currentOperation;

        } else {
            //check if value is zero, if it is just add current value | verifique se o valor é zero, se for apenas adicione o valor atual
            if(previous === 0){
                operationValue = current;
            }

            // add current value to previous | adicione o valor atual ao anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }

    }
        // Change math operation | Alterar operação matemática
       changeOperation(operation){

            const mathOperations = ["*", "/", "+", "-"];
            
            if(!mathOperations.includes(operation)){
                return;
            }

            this.previousOperationText.innerText = 
            this.previousOperationText.innerText.slice(0, -1) + operation; 
       } 
       // DElete this last digit | Delete este último dígito
       processDelOperator(){
        this.currentOperationText.innerText = 
        this.currentOperationText.innerText.slice (0, -1);
       }
       // Clear current operation | Limpar operação atual
       processClearCurrentOperator(){
            this.currentOperationText.innerText = "";
       }
       // Clear all operations | Limpar todas as operações
       processClearOperator(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
        }
        
        processEqualOperator(){
            
            let operation = this.previousOperationText.innerText.split(" ")[1];

            this.processOperation(operation);
      
   }
}

    const calc = new calculator(previousOperationText, currentOperationText);


        button.forEach((btn) => {
            btn.addEventListener("click", (e) => {

            const value = e.target.innerText;

            if(+value >= 0 || value === "."){
                console.log(value);
            calc.addDigit(value);
            } else {
            calc.processOperation(value);
        }

    });
});