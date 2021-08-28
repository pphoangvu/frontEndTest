import {useState, useEffect} from 'react';
import { ListGroup } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Moment from 'moment';

export default function ActivityFeed(){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(()=>{
        setLoading(true);
        fetch("https://aircall-job.herokuapp.com/activities").then(res=>res.json()).then(products=>{
            setLoading(false);
            setProducts(products);
        })
    }, []);

    if(!loading){
        return (
            <>
                <h3>Call List</h3>
                <br />
                <ListGroup>
               
                            {products.filter(prod => prod.is_archived === false).map(prod => (
                            <ListGroup.Item onClick={(e)=>{history.push(`activitydetail/${prod.id}`)}} key={prod.id} className="listcontent">
                                <div className="datetime">
                                <hr/> &nbsp; {Moment(prod.created_at).format('MMMM, DD YYYY')} &nbsp; <hr /><br />
                                </div>
                                <div className="rowcontent">
                                <div className="column" id="column-1"> {prod.from} 
                                <p className="firstColumnStyle">tried to call on {prod.via}</p>
                                </div>
                                <div className="column" id="column-2">
                                    <p className="timer" style={{float: "left"}}>{Moment(prod.created_at).format('hh:MM')}</p> 
                                    <p className="am" style={{border: '1px solid', float: "right"}}>{Moment(prod.created_at).format('a')}</p>
                                    </div>
                                </div>
                        </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </>
        )
    }else{
        return null; 
    }
}