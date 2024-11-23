// Initialize Web3 and contract
emailjs.init("Nl6mMF0fBJtiJWZLB"); 
let web3;
let contract;

// Load Blockchain Data
async function loadBlockchainData() {
 
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        console.log("hi")
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
        console.log("No Ethereum provider detected. Please install MetaMask.");
    }



    console.log("tata")
    // const networkId = await web3.eth.net.getId();
    console.log("bye")
    const networkId = "5777";
    const contractAddress = "0x29E52063400b6B79C6C9792F9841ea99093fFd38";  // Replace with your deployed contract address
  
    const abi = [  // Ensure ABI is provided


    {
      "inputs": [],
      "name": "reportCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "reports",
      "outputs": [
        {
          "internalType": "string",
          "name": "profileLink",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "reason",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "resolved",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_profileLink",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_reason",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_username",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        }
      ],
      "name": "submitReport",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_reportId",
          "type": "uint256"
        }
      ],
      "name": "checkReport",
      "outputs": [
        {
          "internalType": "string",
          "name": "profileLink",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "reason",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "resolved",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]

    contract = new web3.eth.Contract(abi, contractAddress);
    
    console.log("Contract instance created:", contract); 

    
}

// Submit Report to Blockchain
async function submitReport(profileLink, reason, description, username, email) {
    const accounts = await web3.eth.getAccounts();
    console.log("Accounts:", accounts)
    try {
        console.log("Submitting report..."); // Log for debugging
        console.log("chnagiunhghghghghghghghg", contract); 
        const receipt = await contract.methods.submitReport(profileLink, reason, description, username, email).send({ from: accounts[0] });
        console.log("Transaction receipt:", receipt); // Log receipt for debugging
        alert("Report submitted successfully!");
    } catch (error) {
        console.error("Error submitting report: ", error);
        alert("There was an error submitting the report. Please check the console for details.");
    }
}
//
// Check Report Status
async function checkReport() {
    const reportId = document.getElementById("reportId").value;
    try {
        const report = await contract.methods.checkReport(reportId).call();
        document.getElementById("reportResult").innerText = JSON.stringify(report, null, 2);
    } catch (error) {
        console.error("Error fetching report: ", error);
        alert("Unable to retrieve report.");
    }
}

// Handling form submission for report
const reportForm = document.getElementById("reportForm");
reportForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const profileLink = document.getElementById("profileLink").value;
    const reason = document.getElementById("reason").value;
    const description = document.getElementById("description").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    // Call submitReport to interact with the smart contract
    await submitReport(profileLink, reason, description, username, email);
});


// Submit Report to Blockchain
async function submitReport(profileLink, reason, description, username, email) {
  const accounts = await web3.eth.getAccounts();
  console.log("Accounts:", accounts);
  try {
      console.log("Submitting report..."); // Log for debugging

      // Show a loading indicator (optional)
      const loadingIndicator = document.getElementById("loadingIndicator");
      loadingIndicator.style.display = "block";

      // Call the smart contract function
      const receipt = await contract.methods.submitReport(profileLink, reason, description, username, email)
          .send({ from: accounts[0] });
      
      console.log("Transaction receipt:", receipt); // Log receipt for debugging

      // Alert user upon successful submission
      alert("Report submitted successfully!");
      
      // Reset the form fields for user convenience
      reportForm.reset();
  } catch (error) {
      console.error("Error submitting report: ", error.message);
      alert("There was an error submitting the report. Please check the console for details.");
  } finally {
      // Hide the loading indicator (optional)
      loadingIndicator.style.display = "none";
  }
}

// Load blockchain data when the page is loaded
window.onload = loadBlockchainData;




