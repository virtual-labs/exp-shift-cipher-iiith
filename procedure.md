This experiment teaches you how to analyze and decrypt shift cipher (Caesar cipher) ciphertext using various cryptanalysis techniques. Follow these steps to master the shift cipher:

### **STEP 1: Understanding the Challenge (PART I)**

Start by examining the given ciphertext in **PART I - Decryption Challenge**:

- You'll see a challenge ciphertext that needs to be decrypted
- The challenge number and total challenges are displayed
- You can click "🔄 Next Ciphertext" to cycle through different challenge ciphertexts
- Each challenge has a different plaintext and shift key

**Example:** The first challenge shows `haahjr ha khdu` which should decrypt to `attack at dawn` using shift 7.

### **STEP 2: Analysis and Exploration (PART II)**

Use the analysis tools provided in **PART II - Analysis Workspace**:

- **📊 Frequency Analysis**:

  - Click this button to analyze letter frequencies in the current ciphertext
  - Compare cipher letter frequencies with common English letter patterns
  - Look for the most frequent cipher letter (might correspond to 'E')
  - Use the frequency hints to estimate the shift value

- **🔍 Test All Shifts**:

  - Automatically try all possible shift values (0-25)
  - Look for meaningful English words and phrases in the results
  - Results marked with ⭐ indicate particularly promising decryptions
  - Use this for brute force cryptanalysis

- **Rough Work Area**:

  - Use the large text area to make notes and record observations
  - Keep track of promising shift values and partial decryptions
  - Document your cryptanalysis process

- **🗑️ Clear**: Clear your rough work area when needed

### **STEP 3: Practice and Verification (PART III)**

Use the encryption/decryption tool in **PART III - Shift Cipher Simulator**:

- **For Practice:**

  - Enter any plaintext in the text area
  - Select a shift value (0-25) from the dropdown
  - Click "🔒 Encrypt ↓" to see the ciphertext result
  - Click "🔓 Decrypt ↑" to reverse the process

- **For Verification:**
  - Enter your suspected plaintext from the challenge
  - Set the shift value you think is correct
  - Encrypt to see if it matches the original challenge ciphertext
  - This confirms your analysis is correct

### **STEP 4: Submit Your Solution (PART IV)**

Once you've identified the correct plaintext and shift key:

- **Enter Solution**: Type the decrypted plaintext in the solution text area
- **Select Key**: Choose the corresponding shift key from the dropdown
- **Check Answer**: Click "🎯 Check my answer!" to verify your solution
- **Review Feedback**:
  - Correct answers show success message and verification in Part III
  - Incorrect answers provide detailed hints and guidance
  - Use the feedback to improve your analysis

### **STEP 5: Learn from Verification**

When you get the correct answer:

- The system automatically sets up Part III with your solution
- You can see exactly how the plaintext encrypts to the challenge ciphertext
- This reinforces your understanding of how the shift cipher works
- Click "🔄 Next Ciphertext" to try more challenges

### **Example Walkthrough:**

Let's decrypt the cipher text "KRZ DUH BRX" step by step:

**Step 1:** Observe the ciphertext pattern
**Step 2:** Use "Test All Shifts" in Part II:

- For k=0: "krz duh brx" (no meaning)
- For k=1: "jqy ctg aqw" (no meaning)
- For k=2: "ipx bsf zpv" (no meaning)
- For k=3: "how are you" ⭐ (meaningful!)

**Step 3:** Verify in Part III by entering "how are you" with shift 3
**Step 4:** Submit "how are you" and key "3" in Part IV
**Step 5:** Receive confirmation and move to next challenge

### **Tips for Success:**

- Start with frequency analysis for longer ciphertexts
- Use "Test All Shifts" for quick brute force analysis
- Look for common English words like "the", "and", "you"
- Practice with Part III to understand the cipher mechanics
- Pay attention to the detailed feedback in Part IV

**Using the Simulation Tools:**

- You can use the "Test All Shifts" button in **PART II** to automatically perform this brute force analysis
- The frequency analysis tool can help identify patterns that suggest the correct shift value
- The manual encryption/decryption tool in **PART III** allows you to verify specific hypotheses
- The feedback system in **PART IV** provides immediate verification of your solutionext in **PART I** of the simulation page. You can click "Next Ciphertext" to get different challenge ciphertexts to decrypt.

**STEP 2 :** Use the analysis tools provided in **PART II** to help with your cryptanalysis:

- **Frequency Analysis (📊)**: Analyze letter frequencies in the current ciphertext to identify patterns
- **Test All Shifts (🔍)**: Automatically try all possible shift values (0-25) to find meaningful text
- **Rough Work Area**: Use the text area to make notes, record your observations, and keep track of promising decryptions
- **Clear Button (🗑️)**: Clear your rough work area when needed

**STEP 3 :** Use the encryption/decryption tool in **PART III** to manually test specific shift values:

- Enter text in the plaintext area
- Select a shift value (0-25) from the dropdown
- Click "Encrypt" to see the ciphertext result
- Click "Decrypt" to reverse the process
- This helps you understand how the shift cipher works and test your hypotheses

**STEP 4 :** Once you've identified the correct plaintext and shift key through analysis:

- Enter the decrypted plaintext in the **PART IV** solution text area
- Select the corresponding shift key from the dropdown
- Click "Check my answer!" to verify your solution
- The feedback area will show whether your answer is correct and provide hints if needed

**STEP 5 [OPTIONAL] :** Verify your understanding by using **PART III** to encrypt your solution plaintext with your discovered key to confirm it produces the original ciphertext.

**An Example:**

Let us say we have a cipher text "KRZ DUH BRX" generated by a shift cipher.
We carry out the brute force attack as follows:

For k=0:

    cipher text: K R Z D U H B R X
    plain text: k r z d u h b r x

For k=1:

    cipher text: K R Z D U H B R X
    plain text: j q y c t g a q w

For k=2:

    cipher text: K R Z D U H B R X
    plain text: i p x b s f z p v

For k=3:

    cipher text: K R Z D U H B R X
    plain text: h o w a r e y o u

For k=3, we obtain a meaningful plain text namely how are you and hence we are done.
