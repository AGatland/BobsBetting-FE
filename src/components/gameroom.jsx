import { Button, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function GameRoom({gameState, hand, startPokerGame, playerAction, winnerData}) {


    if (!gameState || !hand) {
        return (
        <div>
            <Row className="px-5 py-5">
                <Col sm={10}>
                <h2>GameRoom</h2>
                </Col>
                <Col>
                    <p>Game not started yet</p>
                    <Button onClick={() => startPokerGame()}>Start Game</Button>
                </Col>
            </Row>
        </div>
    )}

    return (
        <div>
            {winnerData && 
            <Row> <h3>WINNERS:</h3> {winnerData.map((player, index) => 
                <Col key={index}>
                    <h5>{player.username} with {player.handGrade} won ${player.winnings}</h5>
                </Col>
                )}
                <Col>
                    <Button onClick={() => startPokerGame()}>Start New Game</Button>
                </Col>
            </Row>
            }
            <Row>
            <Col>
                <h4>Community Cards: </h4>
                {gameState.communityCards.map((card, index) => 
                        <img height={"150px"} key={index} src={`./deck/${card.rank}${card.suit.charAt(0)}.svg`}></img>    
                    )}
                </Col>
            </Row>
            <Row >
                <Col>
                <h4>Players in Lobby: </h4>
                <b>Blue name = their turn</b>
                {gameState.publicPlayerStates.map((player, index) => 
                            <p key={index} style={{ color: gameState.currentPlayerId === player.turnNumber ? 'blue' : 'black' }}>
                                    {player.username+" $"+player.currentBet}
                            </p>
                    )}
                </Col>
                <Col>
                    <h4>Game round:</h4>
                    <h5>{gameState.currentRound}</h5>
                    <h4>Current Pot:</h4>
                    <h5>${gameState.currentPot}</h5>
                </Col>
            </Row>
            <br></br>
            <br></br>
            <Row>
                <Col>
                    <h4>Your Hand: </h4>
                    {hand.map((card, index) => 
                        <img height={"150px"} key={index} src={`./deck/${card.rank}${card.suit.charAt(0)}.svg`}></img>    
                    )}
                </Col>
                <Col>
                    <h4>Do Action: </h4>
                    <Button onClick={() => playerAction(0, 0)}>Fold</Button>
                    <Button onClick={() => playerAction(1, 0)}>Call</Button>
                    <Button onClick={() => playerAction(2, 10)}>Raise 10</Button>
                    <Button onClick={() => playerAction(3, 0)}>All in</Button>
                </Col>
            </Row>
        </div>
    )
}

export default GameRoom;