import { Container, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import WaitingRoom from '../components/waitingroom'
import { useState } from 'react'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import ChatRoom from '../components/chatroom'
import { environment } from '../environments/environment'

import { AuthContext } from "../App";
import { useContext } from "react";
import GameRoom from '../components/gameroom'

/*
initialGameState = {
  currentRound: "",
  currentPlayerId: "",
  communityCards: [
    {
      suit: "",
      value: ""
    }
  ],
  publicPlayerStates: [
    {
      userId: 0,
      username: "",
      currentBet: 0,
      isFolded: false
    }
  ]
}*/

function Lobby() {
    const [conn, setConnection] = useState();
    const [lobbyConn, setLobbyConn] = useState(); 
    const [winnerData, setWinnerData] = useState();
    const [hand, setHand] = useState([]);
    const [gameState, setGameState] = useState();

    const { user, updateUserData } = useContext(AuthContext)
  
    const joinLobby = async (lobbyId) => {
      const UserId = user.id
      try {
        const conn = new HubConnectionBuilder()
                        .withUrl(`${environment.apiUrl}game/lobby`)
                        .configureLogging(LogLevel.Information)
                        .build();
        conn.on("JoinSpecificLobby", (UserId, LobbyId) => {
          // Sends join message back, can do something with it sometime i guess
        })
  
        /*
        conn.on("ReceiveSpecificMessage", (UserId, msg) => {
          setMessages(messages => [...messages, {UserId, msg}])
        })*/

        conn.on("ReceiveHand", (playerHand) => {
          setHand(playerHand)
        })

        conn.on("GameStarted", (communityCards, currentRound, currentPlayerId, publicPlayerStates, currentPot) => {
          setWinnerData()
          setGameState({currentRound, currentPlayerId, communityCards, publicPlayerStates, currentPot})
        })

        conn.on("ReceiveUpdatedGame", (communityCards, currentRound, currentPlayerId, publicPlayerStates, currentPot) => {
          setGameState({currentRound, currentPlayerId, communityCards, publicPlayerStates, currentPot})
        })

        conn.on("ReceiveGameResult", (winnerData) => {
          updateUserData()
          setWinnerData(winnerData)
        })
  
        await conn.start();
        await conn.invoke("JoinSpecificLobby", {UserId, lobbyId});
  
        setConnection(conn);

        setLobbyConn({UserId, lobbyId})
  
      } catch (e) {
        console.log(e);
      }
    }
  
    /*
    const sendMessage = async(message) => {
      try {
        await conn.invoke("SendMessage", message)
      } catch(e) {
        console.log(e);
      }
    }*/

    const startPokerGame = async() => {
      console.log("Starting game")
      try {
        await conn.invoke("StartGame", lobbyConn)
      } catch(e) {
        console.log(e);
      }
    }

    const playerAction = async(actionType, amount) => {
      try {
        await conn.invoke("UserRoundAction", lobbyConn, {actionType, amount})
      } catch(e) {
        console.log(e);
      }
    }

    return (
      <div>
        <main>
          <Container>
            {!conn ? 
            <WaitingRoom joinLobby={joinLobby} />
            : <GameRoom gameState={gameState} hand={hand} startPokerGame={startPokerGame} lobbyConn={lobbyConn} playerAction={playerAction} winnerData={winnerData}/>
            }
          </Container>
        </main>
      </div>
    )
}

export default Lobby;