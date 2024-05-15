import { useState } from "react"
import { Button, Col, Form, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function WaitingRoom({ joinLobby }) {
    const [lobby, setLobby] = useState();

    
    return <Form onSubmit={e => {
        e.preventDefault();
        joinLobby(lobby);
    }}> 
        <Row className="px-5 py-5">
            <Col sm={12}>
                <Form.Group>
                    <Form.Control placeholder="Lobby Id"
                            onChange={e => setLobby(e.target.value)} />
                </Form.Group>
            </Col>
            <Col sm={12}>
                <hr />
                <Button variant="success" type="submit">Join</Button>
            </Col>

        </Row>
    </Form>
}

export default WaitingRoom;