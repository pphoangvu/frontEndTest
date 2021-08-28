import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import Moment from 'moment';

export default function ActionDetail(props) {
    let { id } = useParams();
    const history = useHistory();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch(`https://aircall-job.herokuapp.com/activities/${id}`).then(res => res.json()).then(product => {
            setLoading(false);
            setProduct(product);
        });
    }, [id])


    function handleOrangeClick() {
        fetch(`https://aircall-job.herokuapp.com/activities/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        },
            body: JSON.stringify({      
                is_archived: true
            })
        })      
        alert('Call archived!')
        history.push("/activityfeed")
    }

    if (!loading) {
        if (product) {
            return (
                <>
                    <h3>Call {id}</h3>
                    <br />
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                 {Moment(product.created_at).format('MMMM, DD YYYY')} at {Moment(product.created_at).format('hh:MM a')} <hr /><br />   
                            </Card.Title>
                            <Card.Text>
                                <strong>From: </strong> {product.from}<br />
                                <strong>To:</strong> {product.to}<br />
                                <strong>Via:</strong> {product.via}<br />
                                <strong>Call direction:</strong> {product.direction}<br />
                                <strong>Call duration:</strong> {product.duration / 60 } minutes<br />
                                <strong>Call type:</strong> {product.call_type}<br />
                            </Card.Text>
                            &nbsp; &nbsp; <Button variant="primary" onClick={handleOrangeClick}>Archive this call</Button> &nbsp;
                            <LinkContainer to="/activityfeed">
                                <Button variant="primary">Back to Call List</Button>
                            </LinkContainer>
                        </Card.Body>
                    </Card>
                </>
            );
        } else {
            return (
                <>
                    <h3>Product {id}</h3>
                    <p>Not Found...</p>
                </>
            );
        }

    } else {
        return null;
    }


}