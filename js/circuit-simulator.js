/**
 * DC Circuits Educational Website
 * Circuit Simulator JavaScript
 * This file handles the interactive circuit simulations on the homepage and key concepts page
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize series circuit calculator on homepage
    initHomeSeriesCalculator();
    
    // Initialize parallel circuit calculator on homepage
    initHomeParallelCalculator();
    
    // Initialize series circuit calculator on key concepts page
    initSeriesCalculator();
    
    // Initialize parallel circuit calculator on key concepts page
    initParallelCalculator();
});

/**
 * Initialize series circuit calculator on the homepage
 */
function initHomeSeriesCalculator() {
    const seriesR1 = document.getElementById('series-r1');
    const seriesR2 = document.getElementById('series-r2');
    const seriesR3 = document.getElementById('series-r3');
    const seriesTotal = document.getElementById('series-total');
    
    if (!(seriesR1 && seriesR2 && seriesR3 && seriesTotal)) {
        return; // Exit if any elements are missing
    }
    
    // Update the series circuit total resistance and SVG labels
    function updateSeriesCircuit() {
        const r1 = parseFloat(seriesR1.value) || 0;
        const r2 = parseFloat(seriesR2.value) || 0;
        const r3 = parseFloat(seriesR3.value) || 0;
        
        // Calculate total resistance
        const totalResistance = r1 + r2 + r3;
        
        // Update display
        seriesTotal.textContent = totalResistance.toFixed(2);
        
        // Update SVG labels if they exist
        const r1Label = document.getElementById('series-r1-label');
        const r2Label = document.getElementById('series-r2-label');
        const r3Label = document.getElementById('series-r3-label');
        
        if (r1Label) r1Label.textContent = `${r1}Ω`;
        if (r2Label) r2Label.textContent = `${r2}Ω`;
        if (r3Label) r3Label.textContent = `${r3}Ω`;
    }
    
    // Add event listeners to update on input change
    seriesR1.addEventListener('input', updateSeriesCircuit);
    seriesR2.addEventListener('input', updateSeriesCircuit);
    seriesR3.addEventListener('input', updateSeriesCircuit);
    
    // Initialize with default values
    updateSeriesCircuit();
}

/**
 * Initialize parallel circuit calculator on the homepage
 */
function initHomeParallelCalculator() {
    const parallelR1 = document.getElementById('parallel-r1');
    const parallelR2 = document.getElementById('parallel-r2');
    const parallelR3 = document.getElementById('parallel-r3');
    const parallelTotal = document.getElementById('parallel-total');
    
    if (!(parallelR1 && parallelR2 && parallelR3 && parallelTotal)) {
        return; // Exit if any elements are missing
    }
    
    // Update the parallel circuit total resistance and SVG labels
    function updateParallelCircuit() {
        const r1 = parseFloat(parallelR1.value) || 0;
        const r2 = parseFloat(parallelR2.value) || 0;
        const r3 = parseFloat(parallelR3.value) || 0;
        
        // Check for valid resistances (prevent division by zero)
        if (r1 <= 0 || r2 <= 0 || r3 <= 0) {
            parallelTotal.textContent = "Error: All resistances must be positive";
            return;
        }
        
        // Calculate total resistance using parallel formula
        const totalResistance = 1 / (1/r1 + 1/r2 + 1/r3);
        
        // Update display
        parallelTotal.textContent = totalResistance.toFixed(2);
        
        // Update SVG labels if they exist
        const r1Label = document.getElementById('parallel-r1-label');
        const r2Label = document.getElementById('parallel-r2-label');
        const r3Label = document.getElementById('parallel-r3-label');
        
        if (r1Label) r1Label.textContent = `${r1}Ω`;
        if (r2Label) r2Label.textContent = `${r2}Ω`;
        if (r3Label) r3Label.textContent = `${r3}Ω`;
    }
    
    // Add event listeners to update on input change
    parallelR1.addEventListener('input', updateParallelCircuit);
    parallelR2.addEventListener('input', updateParallelCircuit);
    parallelR3.addEventListener('input', updateParallelCircuit);
    
    // Initialize with default values
    updateParallelCircuit();
}

/**
 * Initialize series circuit calculator on the key concepts page
 */
function initSeriesCalculator() {
    const calculateSeriesBtn = document.getElementById('calculate-series');
    const addSeriesResistorBtn = document.getElementById('add-series-resistor');
    const removeSeriesResistorBtn = document.getElementById('remove-series-resistor');
    const seriesResistorInputs = document.getElementById('series-resistor-inputs');
    const seriesResult = document.getElementById('series-result');
    
    if (!(calculateSeriesBtn && addSeriesResistorBtn && removeSeriesResistorBtn && seriesResistorInputs && seriesResult)) {
        return; // Exit if any elements are missing
    }
    
    // Function to add a new resistor input
    addSeriesResistorBtn.addEventListener('click', function() {
        const resistorCount = seriesResistorInputs.children.length;
        if (resistorCount >= 10) return; // Limit to 10 resistors
        
        const newResistor = document.createElement('div');
        newResistor.className = 'resistor-input';
        newResistor.innerHTML = `
            <label for="series-r${resistorCount + 1}">R${resistorCount + 1} (Ω):</label>
            <input type="number" id="series-r${resistorCount + 1}" placeholder="Enter resistance" value="10">
        `;
        
        seriesResistorInputs.appendChild(newResistor);
    });
    
    // Function to remove the last resistor input
    removeSeriesResistorBtn.addEventListener('click', function() {
        if (seriesResistorInputs.children.length > 2) { // Keep at least 2 resistors
            seriesResistorInputs.removeChild(seriesResistorInputs.lastChild);
        }
    });
    
    // Function to calculate total series resistance
    calculateSeriesBtn.addEventListener('click', function() {
        // Get all input values as numbers
        const resistances = Array.from(seriesResistorInputs.querySelectorAll('input'))
            .map(input => parseFloat(input.value))
            .filter(value => !isNaN(value));
        
        if (resistances.length === 0) {
            seriesResult.textContent = "Please enter valid resistance values";
            return;
        }
        
        // For series circuits, total resistance is the sum of individual resistances
        const totalResistance = resistances.reduce((sum, resistance) => sum + resistance, 0);
        
        // Display the result
        seriesResult.textContent = `${totalResistance.toFixed(2)}Ω`;
    });
    
    // Initial calculation
    calculateSeriesBtn.click();
}

/**
 * Initialize parallel circuit calculator on the key concepts page
 */
function initParallelCalculator() {
    const calculateParallelBtn = document.getElementById('calculate-parallel');
    const addParallelResistorBtn = document.getElementById('add-parallel-resistor');
    const removeParallelResistorBtn = document.getElementById('remove-parallel-resistor');
    const parallelResistorInputs = document.getElementById('parallel-resistor-inputs');
    const parallelResult = document.getElementById('parallel-result');
    
    if (!(calculateParallelBtn && addParallelResistorBtn && removeParallelResistorBtn && parallelResistorInputs && parallelResult)) {
        return; // Exit if any elements are missing
    }
    
    // Function to add a new resistor input
    addParallelResistorBtn.addEventListener('click', function() {
        const resistorCount = parallelResistorInputs.children.length;
        if (resistorCount >= 10) return; // Limit to 10 resistors
        
        const newResistor = document.createElement('div');
        newResistor.className = 'resistor-input';
        newResistor.innerHTML = `
            <label for="parallel-r${resistorCount + 1}">R${resistorCount + 1} (Ω):</label>
            <input type="number" id="parallel-r${resistorCount + 1}" placeholder="Enter resistance" value="10">
        `;
        
        parallelResistorInputs.appendChild(newResistor);
    });
    
    // Function to remove the last resistor input
    removeParallelResistorBtn.addEventListener('click', function() {
        if (parallelResistorInputs.children.length > 2) { // Keep at least 2 resistors
            parallelResistorInputs.removeChild(parallelResistorInputs.lastChild);
        }
    });
    
    // Function to calculate total parallel resistance
    calculateParallelBtn.addEventListener('click', function() {
        // Get all input values as numbers
        const resistances = Array.from(parallelResistorInputs.querySelectorAll('input'))
            .map(input => parseFloat(input.value))
            .filter(value => !isNaN(value) && value > 0);
        
        if (resistances.length === 0) {
            parallelResult.textContent = "Please enter valid resistance values";
            return;
        }
        
        // For parallel circuits, reciprocal of total resistance is the sum of reciprocals
        const reciprocalSum = resistances.reduce((sum, resistance) => sum + (1 / resistance), 0);
        const totalResistance = 1 / reciprocalSum;
        
        // Display the result
        parallelResult.textContent = `${totalResistance.toFixed(2)}Ω`;
    });
    
    // Initial calculation
    calculateParallelBtn.click();
}

/**
 * Utility function to visualize current flow in a circuit
 * @param {string} svgId - The ID of the SVG element to animate
 * @param {Array} paths - Array of path data for current animation
 */
function animateCurrentFlow(svgId, paths) {
    const svg = document.getElementById(svgId);
    if (!svg) return;
    
    // Remove any existing animation elements
    const existingDots = svg.querySelectorAll('.current-dot');
    existingDots.forEach(dot => dot.remove());
    
    // Create animated current dots for each path
    paths.forEach(path => {
        // Create a dot
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('r', '3');
        dot.setAttribute('fill', '#00FFFF');
        dot.setAttribute('class', 'current-dot');
        svg.appendChild(dot);
        
        // Create animation
        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
        animate.setAttribute('dur', '3s');
        animate.setAttribute('repeatCount', 'indefinite');
        animate.setAttribute('path', path);
        dot.appendChild(animate);
    });
}

/**
 * Function to highlight a resistor when hovered
 */
function setupResistorHover() {
    // Get all resistor SVG elements
    const resistors = document.querySelectorAll('path[id^="series-r"], path[id^="parallel-r"]');
    
    resistors.forEach(resistor => {
        // Highlight on hover
        resistor.addEventListener('mouseenter', function() {
            this.setAttribute('stroke', '#00FFFF');
            this.setAttribute('stroke-width', '3');
        });
        
        // Return to normal on mouse leave
        resistor.addEventListener('mouseleave', function() {
            this.setAttribute('stroke', '#000');
            this.setAttribute('stroke-width', '2');
        });
    });
}

// Call setup function after page load
window.addEventListener('load', setupResistorHover);
