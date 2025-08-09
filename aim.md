A private-key encryption scheme consists of a set of all possible messages, called the message space **M**, and three algorithms, namely,

(a) **Gen**

(b) **Enc**

(c) **Dec**

The algorithm for key generation **Gen** is used to choose a key **k** at random from the set of all possible secret keys, denoted by the key space **K**.

The algorithm for encryption **Enc** takes as inputs the message **m** and the secret key **k** and outputs the ciphertext **c**.

The algorithm for decryption **Dec** inputs the ciphertext **c** and the key **k** and outputs the message **m**.

We are able to break many classical ciphers because of their vulnerabilities. In cryptography, we learn that a large key space is necessary for secrecy, but understanding how small key spaces make ciphers vulnerable is equally important for learning cryptographic principles.

**About the experiment:**

In this experiment, we work with a well-known historical encryption scheme, namely the shift cipher (also known as Caesar cipher), that has a very small key space. The shift cipher is easily broken using brute force attack methods because it has only 26 possible keys for the English alphabet. Your task is to break this cipher. Specifically, given (only) the ciphertext in some instance of a shift cipher, you need to find the plaintext and the secret key.
