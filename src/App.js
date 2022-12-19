import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./characters";
import "react-toastify/dist/ReactToastify.css";
import { COPY_SUCCESS } from "./message";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(20);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleGeneratorPassword = (e) => {
    if (
      !includeUpperCase &&
      !includeLowerCase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify("You must select at least one option", true);
    }
    let characterList = "";

    if (includeLowerCase) characterList += lowerCaseLetters;
    if (includeUpperCase) characterList += upperCaseLetters;
    if (includeNumbers) characterList += numbers;
    if (includeSymbols) characterList += specialCharacters;

    setPassword(createPassword(characterList));
  };

  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password += characterList.charAt(characterIndex);
    }

    return password;
  };

  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCopyPassword = (e) => {
    if (password == "") {
      notify("Nothing To Copy", true);
    } else {
      copyToClipboard();
      notify(COPY_SUCCESS);
    }
  };

  return (
    <div className="min-h-screen bg-bground">
      <div className="w-96 my-0 mx-auto pt-52">
        <div className="bg-gground rounded-sm shadow-md p-5">
          <h2 className="text-center text-white mb-5">Password Generator</h2>
          <div className="relative bg-black opacity-40 py-[13px] px-[10px] text-white h-11 mb-4">
            <h3>{password}</h3>
            <button
              onClick={handleCopyPassword}
              className="absolute bg-bground border-0 h-10 p-2 cursor-pointer top-[3px] right-[3px]"
            >
              <i className="far fa-clipboard"></i>
            </button>
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="password-strength">Password Length</label>
            <input
              className="text-black pl-1"
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id="password-strength"
              name="password-strength"
              max="20"
              min="10"
            />
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
            <input
              checked={includeUpperCase}
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters"
            />
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="lowercase-letters">Include Lowercase Letter</label>
            <input
              checked={includeLowerCase}
              onChange={(e) => setIncludeLowerCase(e.target.checked)}
              type="checkbox"
              id="lowercase-letters"
              name="lowercase-letters"
            />
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id="include-numbers"
              name="include-numbers"
            />
          </div>

          <div className="flex justify-between text-white mb-4">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox"
              id="include-symbols"
              name="include-symbols"
            />
          </div>

          <button
            onClick={handleGeneratorPassword}
            className="bg-bground border-0 block w-full p-2 text-white text-base cursor-pointer"
          >
            Generate Password
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default App;
