function calculator(){
    const numButtons = document.querySelectorAll('.num');
    const operationButtons = document.querySelectorAll('.operation');
    const deleteButton = document.querySelector('.delete');
    const clearButton = document.querySelector('.clear');
    const equalButton = document.querySelector('.equal');
    let previousText = document.querySelector('.previous');
    let currentText = document.querySelector('.current');
    let currentOperand = "";
    let previousOperand = "";
    let operation = null;

    function handleButtons(){
        numButtons.forEach(btn => {
            currentOperand === 0 ? currentOperand = "" : "";
            btn.addEventListener('click', ()=> {
                if(currentOperand === "You can't divide by 0"){
                    currentOperand = 0;
                    previousOperand = "";
                    operation = null;
                    updateDisplay();
                }
                if(btn.textContent === "." && currentOperand.includes('.')){
                    return;
                };
                currentOperand += btn.textContent;
                updateDisplay();
            });
        });

        operationButtons.forEach(btn =>{
            btn.addEventListener('click', () => {
                if(currentOperand === "You can't divide by 0"){
                    currentOperand = "Error, please clear.";
                    previousOperand = "";
                    operation = null;
                    updateDisplay();
                }
                else if(currentOperand === "Error, please clear."){
                    currentOperand = "Error, please clear.";
                    previousOperand = "";
                    operation = null;
                    updateDisplay();
                }
                else if(operation != null){
                    let operationTemp = btn.textContent;
                    let curr = parseFloat(currentOperand);
                    let prev = parseFloat(previousOperand);
                    let results;

                    if( isNaN(prev)  ||  isNaN(curr) ) return 

                    if(operation === "+"){
                        results = prev + curr;
                    }
                    else if(operation === "-"){
                        results = prev - curr;
                    }
                    else if(operation === "*"){
                        results = prev * curr;
                    }
                    else if(operation === "÷" && curr === 0){
                        results = "You can't divide by 0";
                    }
                    else if(operation === "÷"){
                        results = prev / curr;
                    }
                    currentOperand = 0;
                    operation = operationTemp;
                    previousOperand = results + operation;  
                    updateDisplay();
                    currentOperand = "";                 
                }
                else{
                    if(currentOperand === "") return;
                    operation = btn.textContent;
                    operate();
                    updateDisplay();
                }
            });
        });
    }

    function operate () {
        if(currentOperand === "") return;
        if(previousOperand !== ""){
            calculateResults();
        }

        previousOperand = `${currentOperand} ${operation}`;
        currentOperand = '';
    }

    function updateDisplay(){
        currentText.textContent = currentOperand;
        previousText.textContent = previousOperand;
    }

    clearButton.addEventListener('click', () =>{
        currentOperand = 0;
        previousOperand = "";
        operation = null;
        updateDisplay();
        currentOperand = "";
    })

    deleteButton.addEventListener('click', ()=>{
        let temp;
        if(currentOperand === "You can't divide by 0"){
            currentOperand = 0;
            temp = currentOperand;
        }
        else{
            temp = currentOperand.toString().slice(0, -1);
        }

        if(temp === "" || temp === 0){
            temp = 0; 
            currentOperand = temp;
            updateDisplay();
        }
        else{
            currentOperand = parseFloat(temp);
            updateDisplay();
        }
    })

    equalButton.addEventListener('click', ()=>{
        calculateResults();
        updateDisplay();
    })

    function calculateResults(){
        let curr = parseFloat(currentOperand);
        let prev = parseFloat(previousOperand);
        let results;

        if( isNaN(prev)  ||  isNaN(curr) ) return 

        if(operation === "+"){
            results = prev + curr;
        }
        else if(operation === "-"){
            results = prev - curr;
        }
        else if(operation === "*"){
            results = prev * curr;
        }
        else if(operation === "÷" && curr === 0){
            results = "You can't divide by 0";
        }
        else if(operation === "÷"){
            results = prev / curr;
        }
        currentOperand = results;
        operation = null;
        previousOperand = '';
    }


    handleButtons();
};

calculator();