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
            menu: {"menuCarbs":[{"Food":"Meatballs","Carbohydrates":45},{"Food":"Tofu","Carbohydrates":35},{"Food":"Something Else","Carbohydrates":4},{"Food":"Ketchup","Carbohydrates":4},{"Food":"Cupcake","Carbohydrates":45},{"Food":"Blah Blah","Carbohydrates":23},{"Food":"Cookie","Carbohydrates":23}]},
            selectedMenu: {"menuCarbs":[]},
            loading: true,
            totalCarbs: 0
        }
    }

    loadData= () => {
        var that = this
        fetch(foodURL+'getfood')
        .then((response) => response.json())
        .then(function(response) {
            that.setState({ 
                loading: false,
                menu: response});
        })
    }


    componentDidMount() {
        //this.loadData()
    }

    addToCard(row) {
        var newMenu = this.state.selectedMenu
        newMenu['menuCarbs'].push(row);
        var totalCarbs = 0
        for(var i=0; i<newMenu['menuCarbs'].length; i++){
            totalCarbs += newMenu['menuCarbs'][i].Carbohydrates;
        }
        this.setState({ 
            selectedMenu: newMenu,
            totalCarbs: totalCarbs})
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
                            {/* <div className={this.state.loading ? 'col-lg-8 lmask ' : 'col-lg-8 '}> */}
                            <div className='col-lg-6'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Add</th>
                                        <th>Carbs</th>
                                        <th>Food</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { this.state.menu.menuCarbs.map((item, i) => {
                                    return <tr key={i} className='foodChoice'>
                                            <td className=''><button onClick={i => this.addToCard(item)} className="btn btn-primary btn-sm">Add</button></td>
                                            <td className=''>{item.Carbohydrates}</td>
                                            <td className='foodChoiceName'>{item.Food}</td>
                                        </tr>
                                })
                                }
                                </tbody>
                                </table>
                            </div>
                            {/* <div className={this.state.loading ? 'col-lg-4 lmask' : 'col-lg-4 '}> */}
                            <div className='col-lg-6'>
                                <div className="card">
                                    <div className="row">
                                        <div className="card-header col-lg-12">
                                            <div className="indexHeader">Liam's Meal Plan</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="card-body col-lg-8">
                                            { this.state.selectedMenu.menuCarbs.map((item, i) => {
                                            return <div key={i} className='row foodChoice'>
                                                    <div className='col-lg-4'>{item.Carbohydrates}</div>
                                                    <div className='foodChoiceName col-lg-8'>{item.Food}</div>
                                                </div>
                                            })
                                            }
                                        </div>
                                        <div className="col-lg-4">
                                           <div className="totalCarbHeader">Total Carbs</div>
                                           <div className="totalCarbDetail">{this.state.totalCarbs}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}

export default Summary