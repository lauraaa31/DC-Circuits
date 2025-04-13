
document.addEventListener('DOMContentLoaded', function() {
   
    initMobileMenu();
    

    initSmoothScroll();
    

    initTabs();
});

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        });
        
        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        });
    }
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add offset for the fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without causing a page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Tab system for applications page
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panes
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding tab pane
                const targetId = this.getAttribute('data-target');
                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
}

/**
 * Utility function to format numbers with specified decimal places
 * @param {number} value - The number to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted number
 */
function formatNumber(value, decimals = 2) {
    if (isNaN(value) || !isFinite(value)) {
        return "Invalid";
    }
    return parseFloat(value).toFixed(decimals);
}

/**
 * Handle Ohm's Law calculations
 */
function initOhmsLawCalculator() {
    const voltageInput = document.getElementById('voltage');
    const currentInput = document.getElementById('current');
    const resistanceInput = document.getElementById('resistance');
    const calcVoltageBtn = document.getElementById('calc-voltage');
    const calcCurrentBtn = document.getElementById('calc-current');
    const calcResistanceBtn = document.getElementById('calc-resistance');
    const resultDisplay = document.getElementById('ohm-result');
    
    if (!(voltageInput && currentInput && resistanceInput && calcVoltageBtn && calcCurrentBtn && calcResistanceBtn && resultDisplay)) {
        return; // Exit if any elements are missing
    }
    
    // Calculate voltage (V = I × R)
    calcVoltageBtn.addEventListener('click', function() {
        const current = parseFloat(currentInput.value);
        const resistance = parseFloat(resistanceInput.value);
        
        if (isNaN(current) || isNaN(resistance)) {
            resultDisplay.textContent = "Please enter valid numbers";
            return;
        }
        
        const voltage = current * resistance;
        resultDisplay.textContent = `${formatNumber(voltage)} V`;
    });
    
    // Calculate current (I = V ÷ R)
    calcCurrentBtn.addEventListener('click', function() {
        const voltage = parseFloat(voltageInput.value);
        const resistance = parseFloat(resistanceInput.value);
        
        if (isNaN(voltage) || isNaN(resistance) || resistance === 0) {
            resultDisplay.textContent = resistance === 0 ? "Resistance cannot be zero" : "Please enter valid numbers";
            return;
        }
        
        const current = voltage / resistance;
        resultDisplay.textContent = `${formatNumber(current)} A`;
    });
    
    // Calculate resistance (R = V ÷ I)
    calcResistanceBtn.addEventListener('click', function() {
        const voltage = parseFloat(voltageInput.value);
        const current = parseFloat(currentInput.value);
        
        if (isNaN(voltage) || isNaN(current) || current === 0) {
            resultDisplay.textContent = current === 0 ? "Current cannot be zero" : "Please enter valid numbers";
            return;
        }
        
        const resistance = voltage / current;
        resultDisplay.textContent = `${formatNumber(resistance)} Ω`;
    });
}

/**
 * Handle voltage divider calculator on applications page
 */
function initVoltageDividerCalculator() {
    const inputVoltage = document.getElementById('input-voltage');
    const r1Value = document.getElementById('r1-value');
    const r2Value = document.getElementById('r2-value');
    const calculateButton = document.getElementById('calculate-divider');
    const outputVoltage = document.getElementById('output-voltage');
    const dividerCurrent = document.getElementById('divider-current');
    
    if (!(inputVoltage && r1Value && r2Value && calculateButton && outputVoltage && dividerCurrent)) {
        return; // Exit if any elements are missing
    }
    
    calculateButton.addEventListener('click', function() {
        const vin = parseFloat(inputVoltage.value);
        const r1 = parseFloat(r1Value.value);
        const r2 = parseFloat(r2Value.value);
        
        if (isNaN(vin) || isNaN(r1) || isNaN(r2)) {
            outputVoltage.textContent = "Invalid input";
            dividerCurrent.textContent = "Invalid input";
            return;
        }
        
        if (r1 <= 0 || r2 <= 0) {
            outputVoltage.textContent = "Resistance must be positive";
            dividerCurrent.textContent = "Resistance must be positive";
            return;
        }
        
        // Calculate output voltage using voltage divider formula
        const vout = vin * (r2 / (r1 + r2));
        
        // Calculate current
        const current = vin / (r1 + r2);
        
        outputVoltage.textContent = `${formatNumber(vout)} V`;
        dividerCurrent.textContent = `${formatNumber(current * 1000, 2)} mA`;
    });
    
    // Initial calculation
    if (calculateButton) {
        calculateButton.click();
    }
}

/**
 * Initialize Power Calculator on applications page
 */
function initPowerCalculator() {
    const voltageInput = document.getElementById('power-voltage');
    const currentInput = document.getElementById('power-current');
    const resistanceInput = document.getElementById('power-resistance');
    const calcViButton = document.getElementById('calc-power-by-vi');
    const calcIrButton = document.getElementById('calc-power-by-ir');
    const calcVrButton = document.getElementById('calc-power-by-vr');
    const resultDisplay = document.getElementById('power-result');
    const formulaDisplay = document.getElementById('power-formula');
    
    if (!(voltageInput && currentInput && resistanceInput && calcViButton && calcIrButton && calcVrButton && resultDisplay && formulaDisplay)) {
        return; // Exit if any elements are missing
    }
    
    // P = V × I
    calcViButton.addEventListener('click', function() {
        const voltage = parseFloat(voltageInput.value);
        const current = parseFloat(currentInput.value);
        
        if (isNaN(voltage) || isNaN(current)) {
            resultDisplay.textContent = "Please enter valid numbers";
            return;
        }
        
        const power = voltage * current;
        resultDisplay.textContent = `${formatNumber(power)} Watts`;
        formulaDisplay.innerHTML = "<p>P = V × I</p>";
    });
    
    // P = I² × R
    calcIrButton.addEventListener('click', function() {
        const current = parseFloat(currentInput.value);
        const resistance = parseFloat(resistanceInput.value);
        
        if (isNaN(current) || isNaN(resistance)) {
            resultDisplay.textContent = "Please enter valid numbers";
            return;
        }
        
        const power = Math.pow(current, 2) * resistance;
        resultDisplay.textContent = `${formatNumber(power)} Watts`;
        formulaDisplay.innerHTML = "<p>P = I² × R</p>";
    });
    
    // P = V² / R
    calcVrButton.addEventListener('click', function() {
        const voltage = parseFloat(voltageInput.value);
        const resistance = parseFloat(resistanceInput.value);
        
        if (isNaN(voltage) || isNaN(resistance) || resistance === 0) {
            resultDisplay.textContent = resistance === 0 ? "Resistance cannot be zero" : "Please enter valid numbers";
            return;
        }
        
        const power = Math.pow(voltage, 2) / resistance;
        resultDisplay.textContent = `${formatNumber(power)} Watts`;
        formulaDisplay.innerHTML = "<p>P = V² / R</p>";
    });
    
    // Initial calculation
    if (calcViButton) {
        calcViButton.click();
    }
}

/**
 * Initialize Advanced Circuit Analyzer on applications page
 */
function initAdvancedCircuitAnalyzer() {
    const circuitVoltage = document.getElementById('circuit-voltage');
    const configSeries = document.getElementById('config-series');
    const configParallel = document.getElementById('config-parallel');
    const addResistorBtn = document.getElementById('add-resistor');
    const removeResistorBtn = document.getElementById('remove-resistor');
    const analyzeBtn = document.getElementById('analyze-circuit');
    const resistorList = document.getElementById('advanced-resistor-list');
    const totalResistance = document.getElementById('total-resistance');
    const totalCurrent = document.getElementById('total-current');
    const totalPower = document.getElementById('total-power');
    
    if (!(circuitVoltage && configSeries && configParallel && addResistorBtn && removeResistorBtn && 
          analyzeBtn && resistorList && totalResistance && totalCurrent && totalPower)) {
        return; // Exit if any elements are missing
    }
    
    // Add a new resistor input
    addResistorBtn.addEventListener('click', function() {
        const resistorCount = resistorList.children.length;
        if (resistorCount >= 10) return; // Limit to 10 resistors
        
        const newResistor = document.createElement('div');
        newResistor.className = 'resistor-item';
        newResistor.innerHTML = `
            <label for="res${resistorCount + 1}">R${resistorCount + 1}:</label>
            <input type="number" id="res${resistorCount + 1}" value="100" min="1">
            <span>Ω</span>
        `;
        
        resistorList.appendChild(newResistor);
    });
    
    // Remove the last resistor input
    removeResistorBtn.addEventListener('click', function() {
        if (resistorList.children.length > 2) { // Keep at least 2 resistors
            resistorList.removeChild(resistorList.lastChild);
        }
    });
    
    // Analyze the circuit
    analyzeBtn.addEventListener('click', function() {
        const voltage = parseFloat(circuitVoltage.value);
        const isSeries = configSeries.checked;
        
        // Get all resistor values
        const resistorValues = Array.from(resistorList.querySelectorAll('input'))
            .map(input => parseFloat(input.value))
            .filter(value => !isNaN(value) && value > 0);
        
        if (resistorValues.length === 0 || isNaN(voltage) || voltage <= 0) {
            totalResistance.textContent = "Invalid input";
            totalCurrent.textContent = "Invalid input";
            totalPower.textContent = "Invalid input";
            return;
        }
        
        let resistance;
        if (isSeries) {
            // Series: add all resistances
            resistance = resistorValues.reduce((sum, val) => sum + val, 0);
        } else {
            // Parallel: 1/Req = 1/R1 + 1/R2 + ...
            const reciprocalSum = resistorValues.reduce((sum, val) => sum + 1/val, 0);
            resistance = 1 / reciprocalSum;
        }
        
        const current = voltage / resistance;
        const power = voltage * current;
        
        totalResistance.textContent = `${formatNumber(resistance)} Ω`;
        totalCurrent.textContent = `${formatNumber(current)} A`;
        totalPower.textContent = `${formatNumber(power)} W`;
        
        // Update circuit visualization
        updateCircuitVisualization(resistorValues, isSeries);
    });
    
    // Function to update the circuit visualization
    function updateCircuitVisualization(resistorValues, isSeries) {
        const visualizationContainer = document.getElementById('custom-circuit-visualization');
        if (!visualizationContainer) return;
        
        let svgWidth = 400;
        let svgHeight = isSeries ? 150 : 250;
        
        let svg = `<svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">`;
        
        // Draw battery
        svg += `
            <line x1="50" y1="${isSeries ? '75' : '125'}" x2="50" y2="${isSeries ? '40' : '85'}" stroke="#000" stroke-width="2" />
            <line x1="40" y1="${isSeries ? '40' : '85'}" x2="60" y2="${isSeries ? '40' : '85'}" stroke="#000" stroke-width="2" />
            <line x1="35" y1="${isSeries ? '30' : '75'}" x2="65" y2="${isSeries ? '30' : '75'}" stroke="#000" stroke-width="2" />
            <text x="50" y="${isSeries ? '100' : '145'}" text-anchor="middle" font-size="12">V</text>
        `;
        
        if (isSeries) {
            // Series circuit
            svg += `
                <line x1="50" y1="30" x2="50" y2="10" stroke="#000" stroke-width="2" />
                <line x1="50" y1="10" x2="70" y2="10" stroke="#000" stroke-width="2" />
                <line x1="50" y1="75" x2="70" y2="75" stroke="#000" stroke-width="2" />
            `;
            
            let xPos = 70;
            const spacing = (svgWidth - 100) / (resistorValues.length + 1);
            
            // Draw resistors in series
            for (let i = 0; i < resistorValues.length; i++) {
                svg += `
                    <line x1="${xPos}" y1="10" x2="${xPos}" y2="75" stroke="#000" stroke-width="2" />
                    <path d="M${xPos},75 L${xPos + 5},70 L${xPos + 10},80 L${xPos + 15},70 L${xPos + 20},80 L${xPos + 25},70 L${xPos + 30},80 L${xPos + 35},70 L${xPos + 40},80 L${xPos + 45},70 L${xPos + 50},75" fill="none" stroke="#000" stroke-width="2" />
                    <text x="${xPos + 25}" y="100" text-anchor="middle" font-size="12">${resistorValues[i]}Ω</text>
                `;
                xPos += spacing;
            }
            
            // Complete the circuit
            svg += `
                <line x1="${xPos}" y1="10" x2="${xPos}" y2="75" stroke="#000" stroke-width="2" />
                <line x1="${xPos}" y1="10" x2="${svgWidth - 20}" y2="10" stroke="#000" stroke-width="2" />
                <line x1="${xPos}" y1="75" x2="${svgWidth - 20}" y2="75" stroke="#000" stroke-width="2" />
                <line x1="${svgWidth - 20}" y1="10" x2="${svgWidth - 20}" y2="75" stroke="#000" stroke-width="2" />
            `;
        } else {
            // Parallel circuit
            svg += `
                <line x1="50" y1="75" x2="50" y2="25" stroke="#000" stroke-width="2" />
                <line x1="50" y1="25" x2="75" y2="25" stroke="#000" stroke-width="2" />
                <line x1="75" y1="25" x2="75" y2="${svgHeight - 25}" stroke="#000" stroke-width="2" />
                <line x1="75" y1="${svgHeight - 25}" x2="50" y2="${svgHeight - 25}" stroke="#000" stroke-width="2" />
                <line x1="50" y1="${svgHeight - 25}" x2="50" y2="125" stroke="#000" stroke-width="2" />
            `;
            
            // Calculate spacing for parallel branches
            const yStart = 50;
            const ySpacing = (svgHeight - 100) / (resistorValues.length + 1);
            
            // Draw resistors in parallel
            for (let i = 0; i < resistorValues.length; i++) {
                const yPos = yStart + i * ySpacing;
                
                svg += `
                    <line x1="75" y1="${yPos}" x2="200" y2="${yPos}" stroke="#000" stroke-width="2" />
                    <path d="M125,${yPos} L130,${yPos-5} L135,${yPos+5} L140,${yPos-5} L145,${yPos+5} L150,${yPos-5} L155,${yPos+5} L160,${yPos-5} L165,${yPos+5} L170,${yPos-5} L175,${yPos}" fill="none" stroke="#000" stroke-width="2" />
                    <text x="150" y="${yPos - 15}" text-anchor="middle" font-size="12">${resistorValues[i]}Ω</text>
                `;
            }
            
            // Close the parallel circuit
            svg += `<line x1="200" y1="${yStart}" x2="200" y2="${yStart + (resistorValues.length - 1) * ySpacing}" stroke="#000" stroke-width="2" />`;
        }
        
        svg += `</svg>`;
        visualizationContainer.innerHTML = svg;
    }
    
    // Initial analysis
    if (analyzeBtn) {
        setTimeout(() => {
            analyzeBtn.click();
        }, 100);
    }
}

// Initialize all calculators if on the appropriate page
window.addEventListener('load', function() {
    // If on the key concepts page
    if (document.getElementById('ohms-law')) {
        initOhmsLawCalculator();
    }
    
    // If on the applications page
    if (document.getElementById('voltage-divider')) {
        initVoltageDividerCalculator();
        initPowerCalculator();
        initAdvancedCircuitAnalyzer();
    }
});
