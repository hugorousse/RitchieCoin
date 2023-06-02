// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RitchieCoin {
    mapping(address => uint256) public balances;
    mapping(address => mapping(uint256 => uint256)) public snapshots;
    mapping(uint256 => uint256) public snapshotTotals;
    
    uint256 public totalSupply;
    string public name;
    string public symbol;
    uint8 public decimals;
    
    constructor() {
        totalSupply = 1000000;
        name = "RitchieCoin";
        symbol = "RIC";
        decimals = 18;
        
        balances[msg.sender] = totalSupply;
    }
    
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
    
    function transfer(address recipient, uint256 amount) external {
        require(amount <= balances[msg.sender], "Insufficient balance");
        
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        
        // Update snapshots for sender and recipient
        updateSnapshot(msg.sender);
        updateSnapshot(recipient);
    }
    
    function vote(uint256 proposalId) external {
        uint256 currentBalance = balances[msg.sender];
        uint256 currentSnapshot = snapshotTotals[proposalId];
        
        if (currentSnapshot > 0) {
            uint256 latestSnapshot = snapshots[msg.sender][currentSnapshot];
            require(latestSnapshot < currentBalance, "Cannot vote with locked balance.");
        }
        
        updateSnapshot(msg.sender);
        snapshotTotals[proposalId] += currentBalance;
    }
    
    function getWeightedVote(address account, uint256 proposalId) external view returns (uint256) {
        uint256 currentSnapshot = snapshotTotals[proposalId];
        
        if (currentSnapshot > 0) {
            uint256 latestSnapshot = snapshots[account][currentSnapshot];
            return latestSnapshot;
        }
        
        return 0;
    }
    
    function updateSnapshot(address account) internal {
        uint256 currentBalance = balances[account];
        uint256 currentSnapshot = snapshotTotals[0];
        uint256 latestSnapshot = snapshots[account][currentSnapshot];
        
        if (latestSnapshot < currentBalance) {
            currentSnapshot += 1;
            snapshots[account][currentSnapshot] = currentBalance;
            snapshotTotals[0] += currentBalance;
        }
    }
}
