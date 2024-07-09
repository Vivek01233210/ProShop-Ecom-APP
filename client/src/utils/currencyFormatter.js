export function formatCurrency(number) {
    // Convert the number to a string
    let numStr = number.toString();
    // Reverse the string for easy processing
    let reversedStr = numStr.split('').reverse().join('');
    // Initialize an array to hold the parts of the formatted number
    let formattedParts = [];
    
    // Loop through the reversed string
    for (let i = 0; i < reversedStr.length; i++) {
        // After the first 3 digits and every 2 digits thereafter, prepend a comma
        if (i === 3) {
            formattedParts.push(',');
        } else if (i > 3 && (i - 3) % 2 === 0) {
            formattedParts.push(',');
        }
        // Prepend the current digit
        formattedParts.push(reversedStr[i]);
    }
    
    // Reverse the array to get the correct order, join into a string, and return
    return formattedParts.reverse().join('');
}

// Example usage
// console.log(formatCurrency(123456789));