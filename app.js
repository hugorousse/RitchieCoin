// Remplacez le contenu de cette variable par l'adresse du contrat RitchieCoinAirdrop déployé
const contractAddress = "0xC10dd91dB7449e3D26EE632C0A90b052F71748f6";

// Remplacez le contenu de cette variable par l'ABI réelle du contrat RitchieCoinAirdrop
const abi = [{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Bought","type":"event"},{"inputs":[],"name":"buy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const contract = new web3.eth.Contract(abi, contractAddress);

// Appeler une fonction du contrat
contract.methods.buyRitchieCoins().send({ from: myAddress, value: amount })
  .on("transactionHash", function (hash) {
    console.log("Transaction hash:", hash);
  })
  .on("receipt", function (receipt) {
    console.log("Receipt:", receipt);
  })
  .on("error", function (error) {
    console.error("Error:", error);
  });

  async function buyRitchieCoins(amount) {
    try {
      await contract.methods.buy({ value: ethers.BigNumber.from(1000000000000000) });
  
      console.log("Achat de RitchieCoins effectué avec succès");
    } catch (error) {
      console.error("Erreur lors de l'achat de RitchieCoins", error);
    }
  }
  
  // Écoute l'événement click sur le bouton d'achat de RitchieCoins
  document.getElementById("buyButton").addEventListener("click", async () => {
    const amount = 100; // Montant de RitchieCoins à acheter
    await buyRitchieCoins();
  });

async function checkMetaMask() {
    if (typeof window.ethereum === "undefined") {
      console.log("MetaMask n'est pas installé");
      return false;
    }
  
    await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("Connecté à MetaMask");
    return true;
  }
