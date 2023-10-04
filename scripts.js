//THE SETUP
let selectElement = document.getElementById("select1");
let divisions = document.getElementById("wrapper2");
let divChild = divisions.children;

//Currency Sign
function sign(val) {
    let sign;
    if (val === "₱") {
        sign = "₱";
    } else if (val === "$") {
        sign = "$";
    } else if (val === "¥") {
        sign = "¥";
    } else if (val === "₩") {
        sign = "₩";
    } else if (val === "﷼.") {
        sign = "﷼.";
    } else if (val === "€") {
        sign = "€";
    }
    return sign;
}

// Answer
function values(val1, val2, val3, val4, selEl) {
    let ioverc = val2/val4;
    let answer;
    if (selEl === "presentAnuity") {
        answer = (val1*(1-(1+ioverc)**(-val3*val4)))/(ioverc);
    } else if (selEl === "futureAnuity") {
        answer = (val1*((1+ioverc)**(val3*val4)-1))/(ioverc);
    } else if (selEl === "PED") {
        answer = ((val4-val3)/(val4+val3))/((val2-val1)/(val2+val1))
    } else if (selEl === "presenttimeValue") {
        answer = (val1*((1+ioverc)**(-val3*val4)))
    } else if (selEl === "futuretimeValue") {
        answer = (val1*((1+ioverc)**(val3*val4)))
    }
    return answer;
}

// Interest Earned
function inE(val1, val2, val3, val4) {
    let interestE = val2*val3*val4;
    let inE;
    if (interestE > val1) {
        inE = interestE-val1;
    } else {
        inE = val1-interestE;
    }
    return inE;
}

//Solving
function solve() {
    let selectedOption = selectElement.value;
    let currency, regularDeposit, inter, Yer, selectCompounded, interestEarned, outputElement;
    if (selectedOption === "presentAnuity") {
        outputElement = document.getElementById("output");
        interestEarned = document.getElementById("interest");
        selectCompounded = document.getElementById("compounded1");
        currency = document.getElementById("currency1");
        regularDeposit = document.getElementById("RDM");
        inter = document.getElementById("I");
        Yer = document.getElementById("Years");

        let interestConverted = parseFloat(inter.value)/100;
        let ans = values(parseFloat(regularDeposit.value), interestConverted, parseFloat(Yer.value), parseFloat(selectCompounded.value), selectedOption);
        let iE = inE(ans, parseFloat(regularDeposit.value), parseFloat(Yer.value), parseFloat(selectCompounded.value));

        let curr = sign(currency.value);
        ans = parseFloat(ans.toFixed(2));
        ans = ans/parseFloat(Yer.value);
        ans = ans/parseFloat(selectCompounded.value);
        iE = parseFloat(regularDeposit.value)-ans;
        outputElement.textContent = "Present Value: "+ curr + ans.toLocaleString("en-US");
        interestEarned.textContent = "Interest Earned: "+ curr + iE.toLocaleString("en-US");
    } else if (selectedOption === "futureAnuity") {
        outputElement = document.getElementById("output2");
        interestEarned = document.getElementById("interest2");
        selectCompounded = document.getElementById("compounded2");
        currency = document.getElementById("currency2");
        regularDeposit = document.getElementById("RDM2");
        inter = document.getElementById("I2");
        Yer = document.getElementById("Years2");

        let interestConverted = parseFloat(inter.value)/100;
        let ans = values(parseFloat(regularDeposit.value), interestConverted, parseFloat(Yer.value), parseFloat(selectCompounded.value), selectedOption);
        let iE = inE(ans, parseFloat(regularDeposit.value), parseFloat(Yer.value), parseFloat(selectCompounded.value));

        let curr = sign(currency.value);
        ans = parseFloat(ans.toFixed(2));
        iE = parseFloat(iE.toFixed(2));
        outputElement.textContent = "Future Value: "+ curr + ans.toLocaleString("en-US");
        interestEarned.textContent = "Interest Earned: "+ curr + iE.toLocaleString("en-US");
    } else if (selectedOption === "PED") {
        outputElement = document.getElementById("output3");
        let elasticity = document.getElementById("typeElas");
        let p1 = document.getElementById("p1");
        let p2 = document.getElementById("p2");
        let q1 = document.getElementById("q1");
        let q2 = document.getElementById("q2");

        let peD = values(parseFloat(p1.value), parseFloat(p2.value), parseFloat(q1.value), parseFloat(q2.value), selectedOption);
        
        outputElement.textContent = "Price Elasticity of Demand: "+Math.abs(peD);

        if (Math.abs(peD) > 1) {
            elasticity.textContent = "Elasticity: Elastic";
        } else if (Math.abs(peD) < 1) {
            elasticity.textContent = "Elasticity: Inelastic";
        } else if (Math.abs(peD) === 1) {
            elasticity.textContent = "Elasticity: Unitary Elastic"
        }
    } else if (selectedOption === "presenttimeValue") {
        outputElement = document.getElementById("output4");
        selectCompounded = document.getElementById("compounded3");
        currency = document.getElementById("currency3");
        futureValue = document.getElementById("FV");
        inter = document.getElementById("I3");
        Yer = document.getElementById("Y3");

        let interestConverted = parseFloat(inter.value)/100;
        let ans = values(parseFloat(futureValue.value), interestConverted, parseFloat(Yer.value), parseFloat(selectCompounded.value), selectedOption);

        let curr = sign(currency.value);
        ans = parseFloat(ans.toFixed(2));
        outputElement.textContent = "Present Value: "+ curr + ans.toLocaleString("en-US");
    } else if (selectedOption === "futuretimeValue") {
        outputElement = document.getElementById("output5");
        selectCompounded = document.getElementById("compounded4");
        currency = document.getElementById("currency4");
        presentValue = document.getElementById("PV");
        inter = document.getElementById("I4");
        Yer = document.getElementById("Y4");

        let interestConverted = parseFloat(inter.value)/100;
        let ans = values(parseFloat(presentValue.value), interestConverted, parseFloat(Yer.value), parseFloat(selectCompounded.value), selectedOption);

        let curr = sign(currency.value);
        ans = parseFloat(ans.toFixed(2));
        outputElement.textContent = "Future Value: "+ curr + ans.toLocaleString("en-US");
    }
}

// Toggle
function addRemove(val) {
    for (i = 0; i <= 4; i++) {
        if (val === i) {
            divChild[i].classList.remove("displayNone")
        } else {
            divChild[i].classList.add("displayNone")
        }
    }
}

// Clear all inputs
function clearInputFields() {
    // Clear input fields for the first option
    document.getElementById("RDM").value = "";
    document.getElementById("I").value = "";
    document.getElementById("Years").value = "";

    // Clear input fields for the second option
    document.getElementById("RDM2").value = "";
    document.getElementById("I2").value = "";
    document.getElementById("Years2").value = "";

    // Clear input fields for the third option
    document.getElementById("p1").value = "";
    document.getElementById("p2").value = "";
    document.getElementById("q1").value = "";
    document.getElementById("q2").value = "";

    // Clear input fields for the fourth option
    document.getElementById("FV").value = "";
    document.getElementById("I3").value = "";
    document.getElementById("Y3").value = "";

    // Clear input fields for the fifth option
    document.getElementById("PV").value = "";
    document.getElementById("I4").value = "";
    document.getElementById("Y4").value = "";


}

// Handling Option change
function handleOptionChange() {
    let selectedOption = selectElement.value;
    clearInputFields();

    if (selectedOption === "presentAnuity") {
        addRemove(0);
        document.getElementById("output").textContent = "Present Value: ";
        document.getElementById("interest").textContent = "Interest Earned: ";
    } else if (selectedOption === "futureAnuity") {
        addRemove(1);
        document.getElementById("output2").textContent = "Future Value: ";
        document.getElementById("interest2").textContent = "Interest Earned: ";
    } else if (selectedOption === "PED") {
        addRemove(2);
        document.getElementById("output3").textContent = "Price Elasticity of Demand: ";
        document.getElementById("typeElas").textContent = "Elasticity: ";
    } else if (selectedOption === "presenttimeValue") {
        addRemove(3);
        document.getElementById("output4").textContent = "Present Value: ";
    } else if (selectedOption === "futuretimeValue") {
        addRemove(4);
        document.getElementById("output5").textContent = "Future Value: ";
    }
}

selectElement.onchange = handleOptionChange;