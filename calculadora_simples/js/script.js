const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const button = document.querySelectorAll("#buttons-container button");

class calculator{
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";

    }
        //add digit to calculator screen
    addDigit(digit) {
        console.log(digit);  
        // check if current operations alread has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;   
             
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

        //Process all calculator operations
        processOperation(operation){

            //check if current is empty
            if(this.currentOperationText.innerText === "" && operation !== "C"){
                    // change operation
                if(this.previousOperationText !== ""){
                  this.changeOperation(operation);
                }
                return;
            }

            // Get current and previous value
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

        // Change values of the calculator screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null,
    ){
       
        if(operationValue === null){
            //  Append number to current value
            this.currentOperationText.innerText += this.currentOperation;

        } else {
            //check if value is zero, if it is just add current value
            if(previous === 0){
                operationValue = current;
            }

            // add current calue to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }

    }
        // Change math operation
       changeOperation(operation){

            const mathOperations = ["*", "/", "+", "-"];
            
            if(!mathOperations.includes(operation)){
                return;
            }

            this.previousOperationText.innerText = 
            this.previousOperationText.innerText.slice(0, -1) + operation; 
       } 
       // DElete this last digit
       processDelOperator(){
        this.currentOperationText.innerText = 
        this.currentOperationText.innerText.slice (0, -1);
       }
       // Clear current operation
       processClearCurrentOperator(){
            this.currentOperationText.innerText = "";
       }
       // Clear all operations
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