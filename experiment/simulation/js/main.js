// Main JavaScript for Shift Cipher Simulation
// Combined functionality - cipher operations and page initialization

// Utility function to trim whitespace
function trim(str) {
  return str.replace(/\s+/g, "");
}

// Shift cipher encryption function
function Shift_Encrypt(src, dst) {
  var plaintext = document.getElementById(src).value.toLowerCase();
  if (plaintext.length < 1) {
    alert("please enter some plaintext");
    return;
  }
  var shift = parseInt(document.getElementById("shift_key").value);
  ciphertext = "";
  var re = /[a-z]/;
  for (i = 0; i < plaintext.length; i++) {
    if (re.test(plaintext.charAt(i)))
      ciphertext += String.fromCharCode(
        ((plaintext.charCodeAt(i) - 97 + shift) % 26) + 97
      );
    else ciphertext += plaintext.charAt(i);
  }
  document.getElementById(dst).value = ciphertext;
}

// Shift cipher decryption function
function Shift_Decrypt(src, dest) {
  ciphertext = document.getElementById(src).value.toLowerCase();
  // do some error checking
  if (ciphertext.length < 1) {
    alert("please enter some ciphertext (letters only)");
    return;
  }
  var shift = parseInt(document.getElementById("shift_key").value);
  plaintext = "";
  var re = /[a-z]/;
  for (i = 0; i < ciphertext.length; i++) {
    if (re.test(ciphertext.charAt(i)))
      plaintext += String.fromCharCode(
        ((ciphertext.charCodeAt(i) - 97 + 26 - shift) % 26) + 97
      );
    else plaintext += ciphertext.charAt(i);
  }
  document.getElementById(dest).value = plaintext;
}

// Challenge cipher data
var ciphers = [
  "haahjr ha khdu",
  "wkh srufxslqh lv xqghu wkh vkhhwv",
  "WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ",
  "ymnx nx ymj ktwjxy uwnrjafq",
  "esp bflwtej zq xpcnj td yze decltypo",
  "owlzwhwghdwgxlzwmfalwvklslwk",
];
var answers = [
  "attack at dawn",
  "the porcupine is under the sheets",
  "the quick brown fox jumps over the lazy dog",
  "this is the forest primeval",
  "the quality of mercy is not strained",
  "wethepeopleoftheunitedstates",
];
var shift_indices = [7, 3, 3, 5, 11, 18];
var current_cipher = 0;

// Initialize the first cipher when page loads
function initializeCipher() {
  if (document.getElementById("textarea")) {
    document.getElementById("textarea").value = ciphers[current_cipher];
  }
  // Also update the challenge indicator
  updateChallengeInfo();
}

// Update challenge information display
function updateChallengeInfo() {
  const challengeNum = current_cipher + 1;
  const totalChallenges = ciphers.length;

  // Add challenge info to Part I if it doesn't exist
  let challengeInfo = document.getElementById("challenge-info");
  if (!challengeInfo) {
    challengeInfo = document.createElement("div");
    challengeInfo.id = "challenge-info";
    challengeInfo.style.cssText =
      "background: #e8f4fd; padding: 8px; border-radius: 3px; margin: 10px 0; font-weight: bold; color: #2c3e50;";

    const partISection =
      document.querySelector("p b").parentElement.parentElement;
    partISection.insertBefore(challengeInfo, partISection.querySelector("p"));
  }

  challengeInfo.innerHTML = `<strong>Challenge ${challengeNum} of ${totalChallenges}</strong> - Decrypt: "${ciphers[current_cipher]}"`;
}

// Help students verify their answer by setting up Part III
function verifyWithPartIII() {
  const correctPlaintext = answers[current_cipher];
  const correctShift = shift_indices[current_cipher];

  // Set up Part III with the correct answer
  document.getElementById("shift_plaintext").value = correctPlaintext;
  document.getElementById("shift_key").selectedIndex = correctShift;

  // Automatically encrypt to show it matches the challenge
  Shift_Encrypt("shift_plaintext", "shift_ciphertext");

  // Highlight that this matches the challenge
  const notification = document.getElementById("notification");
  let currentText = notification.value;
  currentText +=
    "\n\n✅ Part III now shows the verification - the plaintext and shift you found produce the challenge ciphertext!";
  notification.value = currentText;
}

// Cycle through challenge ciphers
function Next_Shift_Test() {
  current_cipher = current_cipher + 1;

  if (current_cipher > ciphers.length - 1) {
    current_cipher = 0;
  }
  document.getElementById("textarea").value = ciphers[current_cipher];
  updateChallengeInfo();

  // Clear previous answers and notifications
  document.getElementById("textarea3").value = "";
  document.getElementById("select_ans_shift").selectedIndex = 26; // Reset to "_"
  document.getElementById("notification").value = "";
  document.getElementById("notification").style.color = "black";
}

// Check student's answer
function CheckAnswer() {
  const userPlaintext = trim(
    document.getElementById("textarea3").value.toLowerCase()
  );
  const correctPlaintext = trim(answers[current_cipher]);
  const userShiftIndex =
    document.getElementById("select_ans_shift").selectedIndex;
  const correctShiftIndex = shift_indices[current_cipher];

  if (
    userPlaintext == correctPlaintext &&
    userShiftIndex == correctShiftIndex
  ) {
    document.getElementById("notification").value = "CORRECT!! Well done!";
    document.getElementById("notification").style.color = "green";

    // Automatically set up Part III to verify the answer
    setTimeout(() => {
      verifyWithPartIII();
    }, 1000);
  } else {
    // Provide helpful hints based on what's wrong
    let hint = "This is not correct. ";

    if (
      userPlaintext == correctPlaintext &&
      userShiftIndex != correctShiftIndex
    ) {
      hint +=
        "Your plaintext is correct, but the shift key is wrong. Try shift key " +
        shift_indices[current_cipher] +
        ".";
      // Add specific guidance about Part III
      hint += `\n\nTip: Try entering "${correctPlaintext}" in Part III and test different shift values until you get "${ciphers[current_cipher]}".`;
    } else if (
      userPlaintext != correctPlaintext &&
      userShiftIndex == correctShiftIndex
    ) {
      hint += "Your shift key is correct, but check your plaintext spelling.";
      // Add guidance about using the correct shift in Part III
      hint += `\n\nTip: Use shift ${shift_indices[current_cipher]} in Part III to decrypt "${ciphers[current_cipher]}" and see what plaintext you get.`;
    } else if (
      userPlaintext != correctPlaintext &&
      userShiftIndex != correctShiftIndex
    ) {
      hint += "Both plaintext and shift key need correction. ";
      // Give a character-by-character hint for the first few characters
      if (userPlaintext.length > 0) {
        const correctFirst3 = correctPlaintext.substring(0, 3);
        hint += "Hint: The plaintext starts with '" + correctFirst3 + "...'";
      } else {
        hint +=
          "Try using the tools in Part II or Part III to decrypt the ciphertext.";
      }
      hint += `\n\nStrategy: Use Part III as a testing tool - try different combinations of text and shift values to understand how the cipher works.`;
    } else if (userPlaintext.length == 0) {
      hint += "Please enter your answer in the text area.";
      hint += `\n\nRemember: Part III is for practice and testing. Part IV is where you submit your final answer for "${ciphers[current_cipher]}".`;
    }

    document.getElementById("notification").value = hint;
    document.getElementById("notification").style.color = "red";
  }
}

// Enhanced Part II functionality - Frequency Analysis Helper
function analyzeFrequency() {
  const ciphertext = ciphers[current_cipher].toLowerCase();
  const frequency = {};
  const total = ciphertext.replace(/[^a-z]/g, "").length;

  // Count letter frequencies
  for (let char of ciphertext) {
    if (char >= "a" && char <= "z") {
      frequency[char] = (frequency[char] || 0) + 1;
    }
  }

  // Sort by frequency
  const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);

  let analysis = "Letter Frequency Analysis:\n";
  analysis += "Letter | Count | Percentage\n";
  analysis += "-------|-------|----------\n";

  for (let [letter, count] of sorted) {
    const percentage = ((count / total) * 100).toFixed(1);
    analysis += `   ${letter.toUpperCase()}   |   ${count}   |   ${percentage}%\n`;
  }

  analysis +=
    "\nCommon English letters: E(12.7%), T(9.1%), A(8.2%), O(7.5%), I(7.0%), N(6.7%)";
  analysis +=
    "\nTip: The most frequent cipher letter might correspond to 'E' in English.";

  document.getElementById("textarea2").value = analysis;
}

// Shift testing helper for Part II
function testAllShifts() {
  const ciphertext = ciphers[current_cipher];
  let results = "Testing all possible shifts:\n";
  results += "Shift | Decrypted Text\n";
  results += "------|---------------\n";

  for (let shift = 0; shift < 26; shift++) {
    let decrypted = "";
    for (let i = 0; i < ciphertext.length; i++) {
      const char = ciphertext.charAt(i).toLowerCase();
      if (char >= "a" && char <= "z") {
        decrypted += String.fromCharCode(
          ((char.charCodeAt(0) - 97 + 26 - shift) % 26) + 97
        );
      } else {
        decrypted += ciphertext.charAt(i);
      }
    }
    results += `  ${shift.toString().padStart(2)}  | ${decrypted}\n`;
  }

  results += "\nLook for meaningful English words to find the correct shift!";
  document.getElementById("textarea2").value = results;
}

// Clear the rough work area
function clearRoughWork() {
  document.getElementById("textarea2").value = "";
}

// Initialize simulation when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initializeCipher();
});

// Make functions globally accessible
window.Shift_Encrypt = Shift_Encrypt;
window.Shift_Decrypt = Shift_Decrypt;
window.Next_Shift_Test = Next_Shift_Test;
window.CheckAnswer = CheckAnswer;
window.analyzeFrequency = analyzeFrequency;
window.testAllShifts = testAllShifts;
window.clearRoughWork = clearRoughWork;
window.verifyWithPartIII = verifyWithPartIII;
window.updateChallengeInfo = updateChallengeInfo;
