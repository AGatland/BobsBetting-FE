import { Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import MessageContainer from './messagecontainer';
import SendMessageForm from './SendMessageForm';

function ChatRoom({messages, sendMessage}) {

    return (
        <div>
            <Row className="px-5 py-5">
                <Col sm={10}>
                <h2>ChatRoom</h2>
                </Col>
                <Col>

                </Col>
            </Row>
            <Row className="px-5 py-5">
                <Col sm={12}>
                    <MessageContainer messages={messages} />
                </Col>
                <Col>
                    <SendMessageForm sendMessage={sendMessage} />
                </Col>
            </Row>
        </div>
    )
}

export default ChatRoom;