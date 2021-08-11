if(typeof web3 !== "undefined"){
    var voteContract = web3.eth.contract([
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_candidate_1",
                    "type": "string"
                },
                {
                    "name": "_candidate_2",
                    "type": "string"
                }
            ],
            "name": "EndVoteAndCreateNewVote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "GetOwner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "Register",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "GetCandidatesName",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "GetVoteList",
            "outputs": [
                {
                    "name": "",
                    "type": "address[]"
                },
                {
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_candidateNumber",
                    "type": "uint256"
                },
                {
                    "name": "_voteNumber",
                    "type": "uint256"
                }
            ],
            "name": "Vote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "GetMyTickets",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "GetIsRegistered",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "GetVoteResult",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_candidate_1",
                    "type": "string"
                },
                {
                    "name": "_candidate_2",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "VoteCount_1",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "VoteCount_2",
                    "type": "uint256"
                }
            ],
            "name": "eventNewVoteResult",
            "type": "event"
        }
    ]);
    var voteContractAtLocal = voteContract.at("0x86B829f5d3e5B58eA8088e4a83A3f606c3bb347F");
}