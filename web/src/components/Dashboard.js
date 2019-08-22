import React from 'react'
import { Link } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.css';

var foodURL = 'https://'+process.env.REACT_APP_API+'.execute-api.'+process.env.REACT_APP_REGION+'.amazonaws.com/'+process.env.REACT_APP_ENV+'/'

//var foodURL = 'http://localhost:3010/'

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastUpdated: 'lastUpdated',
            loading: true
        }
    }


    componentDidMount() {
        fetch(foodURL+'getfood')
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            this.setState({ 
                loading: false});
        })
    }

    render() {
        
        return (<div> 
                    <div className="jumbotron text-center container-fluid">
                        <Link to={'/'} >
                            <h1 className="page_header">Lunch Checklist</h1>
                        </Link>
                    </div>
                    <div className="container">
                        <div className="row text-center">
                            <div className={this.state.loading ? 'col-lg-8 lmask ' : 'col-lg-8 '}>
                                
                            </div>
                            <div className={this.state.loading ? 'col-lg-4 lmask' : 'col-lg-4 '}>
                                
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}

export default Summary