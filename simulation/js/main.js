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

  // Add helpful startup message
  const notification = document.getElementById("notification");
  if (notification) {
    notification.value = `🚀 Welcome to the Shift Cipher Challenge!

🎯 Your mission: Decrypt "${ciphers[current_cipher]}"

🛠️ Available tools:
• Part II: Analysis workspace with frequency analysis and shift testing
• Part III: Practice area for encryption/decryption experiments  
• Part IV: Submit your final answer here

💡 Tip: Start with 'Test All Shifts' in Part II to explore all possibilities!

Good luck! 🍀`;
    notification.style.color = "#1976d2";
  }
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
      "background: #e3f2fd; padding: 12px; border-radius: 6px; margin: 10px 0; font-weight: bold; color: #1565c0; border-left: 4px solid #2196f3;";

    // Find the Part I section and add the info at the top
    const partISection = document.querySelector(
      'div[style*="background: #f0f8ff"]'
    );
    if (partISection) {
      const firstTable = partISection.querySelector("table");
      if (firstTable) {
        partISection.insertBefore(challengeInfo, firstTable);
      }
    }
  }

  challengeInfo.innerHTML = `
    <strong>🎯 Challenge ${challengeNum} of ${totalChallenges}</strong><br>
    <span style="font-size: 0.9em; color: #1976d2;">
      Decrypt: <code style="background: #fff; padding: 2px 4px; border-radius: 3px;">"${ciphers[current_cipher]}"</code>
    </span>
  `;
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

  // Provide educational explanation
  const notification = document.getElementById("notification");
  let currentText = notification.value;
  currentText += "\n\n🔧 VERIFICATION in Part III:";
  currentText += `\n✅ Plaintext: "${correctPlaintext}"`;
  currentText += `\n✅ Shift: ${correctShift}`;
  currentText += `\n✅ Produces: "${ciphers[current_cipher]}"`;
  currentText += "\n\n🎓 This demonstrates how the shift cipher works:";
  currentText += `\nEach letter in "${correctPlaintext}" is shifted ${correctShift} positions forward in the alphabet.`;
  currentText +=
    "\n\n🚀 Ready for the next challenge? Click 'Next Ciphertext'!";

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
    document.getElementById("notification").value =
      '🎉 CORRECT!! Well done!\n\nYou successfully decrypted: "' +
      ciphers[current_cipher] +
      '" → "' +
      answers[current_cipher] +
      '" using shift ' +
      shift_indices[current_cipher] +
      ".";
    document.getElementById("notification").style.color = "green";

    // Automatically set up Part III to verify the answer
    setTimeout(() => {
      verifyWithPartIII();
    }, 1000);
  } else {
    // Provide detailed educational hints based on what's wrong
    let hint = "❌ This is not correct. ";

    // Analyze the current challenge details
    const currentCipher = ciphers[current_cipher];
    const correctAnswer = answers[current_cipher];
    const correctShift = shift_indices[current_cipher];

    if (
      userPlaintext == correctPlaintext &&
      userShiftIndex != correctShiftIndex
    ) {
      hint +=
        "Your plaintext is CORRECT ✅, but the shift key is wrong ❌.\n\n";
      hint += `💡 The correct shift is ${correctShift}. Here's why:\n`;
      hint += `When you shift each letter of "${correctAnswer}" by ${correctShift} positions:\n`;

      // Show first few character transformations as example
      const examples = [];
      for (let i = 0; i < Math.min(3, correctAnswer.length); i++) {
        const char = correctAnswer.charAt(i);
        if (char >= "a" && char <= "z") {
          const shifted = String.fromCharCode(
            ((char.charCodeAt(0) - 97 + correctShift) % 26) + 97
          );
          examples.push(`'${char}' → '${shifted}'`);
        }
      }
      hint += examples.join(", ") + "...\n";
      hint += `This produces: "${currentCipher}"\n\n`;
      hint += `🔧 Verify this in Part III: Enter "${correctAnswer}" and set shift to ${correctShift}, then click Encrypt.`;
    } else if (
      userPlaintext != correctPlaintext &&
      userShiftIndex == correctShiftIndex
    ) {
      hint +=
        "Your shift key is CORRECT ✅, but the plaintext needs correction ❌.\n\n";
      hint += `💡 With shift ${correctShift}, the cipher "${currentCipher}" decrypts to:\n`;
      hint += `"${correctAnswer}"\n\n`;
      hint += `🔧 Try this in Part III: Put "${currentCipher}" in the ciphertext box, set shift to ${correctShift}, and click Decrypt.`;

      if (userPlaintext.length > 0) {
        // Show which parts are correct/incorrect
        hint += `\n\n📝 Comparing your answer "${userPlaintext}" with correct "${correctAnswer}":\n`;
        const maxLen = Math.max(userPlaintext.length, correctAnswer.length);
        let comparison = "";
        for (let i = 0; i < maxLen; i++) {
          const userChar =
            i < userPlaintext.length ? userPlaintext.charAt(i) : "_";
          const correctChar =
            i < correctAnswer.length ? correctAnswer.charAt(i) : "_";
          if (userChar === correctChar) {
            comparison += "✅";
          } else {
            comparison += "❌";
          }
        }
        hint += comparison;
      }
    } else if (
      userPlaintext != correctPlaintext &&
      userShiftIndex != correctShiftIndex
    ) {
      hint += "Both plaintext and shift key need correction ❌❌.\n\n";
      hint += `🎯 Challenge: Decrypt "${currentCipher}"\n`;
      hint += `✅ Correct Answer: "${correctAnswer}" with shift ${correctShift}\n\n`;

      // Give step-by-step guidance
      hint += "📚 Step-by-step approach:\n";
      hint += "1️⃣ Use Part II's 'Test All Shifts' to see all possibilities\n";
      hint += "2️⃣ Look for meaningful English words in the results\n";
      hint += "3️⃣ Use Part II's 'Frequency Analysis' to find patterns\n";
      hint += "4️⃣ Practice with Part III to understand how shifting works\n\n";

      if (userPlaintext.length > 0) {
        // Give a hint about how close they are
        const correctFirst = correctAnswer.substring(
          0,
          Math.min(3, correctAnswer.length)
        );
        hint += `💡 Hint: The plaintext starts with "${correctFirst}..."\n`;
        hint += `🔧 Try different shifts in Part III until "${currentCipher}" becomes "${correctFirst}..."`;
      } else {
        hint += `🔧 Start by clicking 'Test All Shifts' in Part II to see all possible decryptions!`;
      }
    } else if (userPlaintext.length == 0) {
      hint += "Please enter your decrypted answer in the text area above.\n\n";
      hint += `🎯 Your task: Decrypt "${currentCipher}"\n\n`;
      hint += "🛠️ Available tools:\n";
      hint +=
        "• Part II: Analysis tools (frequency analysis, test all shifts)\n";
      hint += "• Part III: Practice encryption/decryption with any text\n";
      hint += "• Part IV: Submit your final answer here\n\n";
      hint +=
        "💡 Start with 'Test All Shifts' in Part II to see all possibilities!";
    }

    document.getElementById("notification").value = hint;
    document.getElementById("notification").style.color = "#d32f2f";
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

  let analysis = `📊 FREQUENCY ANALYSIS for "${ciphers[current_cipher]}"\n`;
  analysis += "=" + "=".repeat(50) + "\n\n";
  analysis += "📈 Letter Distribution:\n";
  analysis += "Letter | Count | Percentage | Visual\n";
  analysis += "-------|-------|------------|--------\n";

  for (let [letter, count] of sorted) {
    const percentage = ((count / total) * 100).toFixed(1);
    const bars = "█".repeat(Math.floor((count / total) * 20));
    analysis += `   ${letter.toUpperCase()}   |   ${count}   |   ${percentage.padStart(
      5
    )}%   | ${bars}\n`;
  }

  analysis += "\n📚 CRYPTANALYSIS HINTS:\n";
  analysis +=
    "• Most frequent English letters: E(12.7%), T(9.1%), A(8.2%), O(7.5%)\n";
  analysis += "• Most frequent cipher letter might correspond to 'E'\n";
  analysis += "• Look for single letters (often 'A' or 'I')\n";
  analysis += "• Common 3-letter words: THE, AND, FOR, YOU\n\n";

  if (sorted.length > 0) {
    const mostFrequent = sorted[0][0].toUpperCase();
    analysis += `💡 ANALYSIS: '${mostFrequent}' appears most frequently (${sorted[0][1]} times)\n`;
    analysis += `If '${mostFrequent}' represents 'E', then the shift would be ${
      (sorted[0][0].charCodeAt(0) - 97 - 4 + 26) % 26
    }\n`;
    analysis += `Try this shift in Part III to test your hypothesis!\n\n`;
  }

  analysis += "🔧 NEXT STEPS:\n";
  analysis += "1. Use 'Test All Shifts' to see all possibilities\n";
  analysis += "2. Look for meaningful words in the results\n";
  analysis += "3. Test your hypothesis in Part III";

  document.getElementById("textarea2").value = analysis;
}

// Shift testing helper for Part II
function testAllShifts() {
  const ciphertext = ciphers[current_cipher];
  let results = `🔍 TESTING ALL SHIFTS for "${ciphertext}"\n`;
  results += "=" + "=".repeat(60) + "\n\n";
  results += "Shift | Decrypted Text                          | Notes\n";
  results += "------|------------------------------------------|----------\n";

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

    // Add analysis notes for meaningful-looking results
    let notes = "";
    if (decrypted.includes("the ") || decrypted.includes(" the")) {
      notes += "Contains 'the' ";
    }
    if (decrypted.includes("and ") || decrypted.includes(" and")) {
      notes += "Contains 'and' ";
    }
    if (decrypted.includes("attack") || decrypted.includes("dawn")) {
      notes += "⭐ Meaningful!";
    }
    if (
      /^[a-z\s]+$/.test(decrypted) &&
      decrypted
        .split(" ")
        .every(
          (word) =>
            word.length === 0 || /^[aeiou]/.test(word) || /[aeiou]/.test(word)
        )
    ) {
      if (!notes.includes("⭐")) notes += "Looks like English";
    }

    const paddedShift = shift.toString().padStart(2);
    const paddedDecrypted = decrypted.padEnd(40);
    results += `  ${paddedShift}  | ${paddedDecrypted} | ${notes}\n`;
  }

  results += "\n🎯 ANALYSIS GUIDE:\n";
  results += "• Look for common English words like 'the', 'and', 'is', 'to'\n";
  results += "• Check for meaningful phrases or sentences\n";
  results += "• Consider letter patterns and word structure\n";
  results += "• Stars (⭐) indicate particularly promising results\n\n";
  results += "📝 Found a meaningful result? Test it in Part III to verify!\n";
  results += "🎯 Then enter your answer in Part IV for checking.";

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
