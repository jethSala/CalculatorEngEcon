// Get DOM elements
const selectElement = document.getElementById("select1");
const divisions = document.getElementById("wrapper2");
const divChild = divisions.children;

// Utility function to get currency sign
const getCurrencySign = (val) => {
    const currencySigns = {
        "₱": "₱",
        "$": "$",
        "¥": "¥",
        "₩": "₩",
        "﷼.": "﷼.",
        "€": "€",
    };
    return currencySigns[val] || "";
};

// Calculate answer for different options
const calculateAnswer = (selectedOption, val1, val2, val3, val4) => {
    const ioverc = val2 / val4;
    switch (selectedOption) {
        case "presentAnuity":
            return (val1 * (1 - Math.pow(1 + ioverc, -val3 * val4))) / ioverc;
        case "futureAnuity":
            return (val1 * (Math.pow(1 + ioverc, val3 * val4) - 1)) / ioverc;
        case "PED":
            return ((val4 - val3) / (val4 + val3)) / ((val2 - val1) / (val2 + val1));
        case "presenttimeValue":
            return val1 * Math.pow(1 + ioverc, -val3 * val4);
        case "futuretimeValue":
            return val1 * Math.pow(1 + ioverc, val3 * val4);
        default:
            return 0;
    }
};

// Calculate interest earned
const calculateInterestEarned = (val1, val2, val3, val4) => {
    const interestE = val2 * val3 * val4;
    return Math.abs(interestE - val1);
};

// Handle option change
const handleOptionChange = () => {
    const selectedOption = selectElement.value;
    clearInputFields();

    const outputElement = document.getElementById(`output${selectedOption}`);
    const interestEarned = document.getElementById(`interest${selectedOption}`);
    const selectCompounded = document.getElementById(`compounded${selectedOption}`);
    const currency = document.getElementById(`currency${selectedOption}`);
    const regularDeposit = document.getElementById(`RDM${selectedOption}`);
    const inter = document.getElementById(`I${selectedOption}`);
    const Yer = document.getElementById(`Years${selectedOption}`);

    if (selectedOption === "PED") {
        const elasticity = document.getElementById("typeElas");
        const p1 = document.getElementById("p1");
        const p2 = document.getElementById("p2");
        const q1 = document.getElementById("q1");
        const q2 = document.getElementById("q2");
        const peD = calculateAnswer(selectedOption, parseFloat(p1.value), parseFloat(p2.value), parseFloat(q1.value), parseFloat(q2.value));
        
        outputElement.textContent = `Price Elasticity of Demand: ${Math.abs(peD)}`;
        elasticity.textContent = `Elasticity: ${Math.abs(peD) > 1 ? "Elastic" : Math.abs(peD) < 1 ? "Inelastic" : "Unitary Elastic"}`;
    } else {
        const ans = calculateAnswer(selectedOption, parseFloat(regularDeposit.value), parseFloat(inter.value), parseFloat(Yer.value), parseFloat(selectCompounded.value));
        const iE = calculateInterestEarned(ans, parseFloat(regularDeposit.value), parseFloat(Yer.value), parseFloat(selectCompounded.value));
        const curr = getCurrencySign(currency.value);
        const formattedAns = ans.toFixed(2);
        const formattedIE = iE.toFixed(2);
        
        outputElement.textContent = `${selectedOption.includes("future") ? "Future" : "Present"} Value: ${curr}${formattedAns.toLocaleString("en-US")}`;
        interestEarned.textContent = `Interest Earned: ${curr}${formattedIE.toLocaleString("en-US")}`;
    }
};

// Toggle div visibility
const addRemove = (val) => {
    for (let i = 0; i <= 4; i++) {
        divChild[i].classList.toggle("displayNone", val !== i);
    }
};

// Clear all inputs
const clearInputFields = () => {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`RDM${i}`).value = "";
        document.getElementById(`I${i}`).value = "";
        document.getElementById(`Years${i}`).value = "";
    }
};

// Attach event handlers
selectElement.addEventListener("change", handleOptionChange);

// Initialize with the default option
handleOptionChange();
