import React from 'react'
import { Link } from "react-router-dom"
import $ from "jquery"

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
            totalCarbs: 0,
            dosage: 0.0
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

    calcInsulin(carbs,ratio) {
        var result = carbs/ratio
        return result
    }

    addToCard(row) {
        var newMenu = this.state.selectedMenu
        newMenu['menuCarbs'].push(row);
        var totalCarbs = 0
        for(var i=0; i<newMenu['menuCarbs'].length; i++){
            totalCarbs += newMenu['menuCarbs'][i].Carbohydrates;
        }
        document.getElementById("foodFilter").value = "";
        $('#foodFilter').keyup();
        //$('#foodFilter' ).focus();
        var dosage = this.calcInsulin(totalCarbs,25)
        this.setState({ 
            selectedMenu: newMenu,
            totalCarbs: totalCarbs,
            dosage: dosage})
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
                            <input className="form-control" id="foodFilter" type="text" placeholder="Search.." />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Add</th>
                                        <th>Carbs</th>
                                        <th>Food</th>
                                    </tr>
                                </thead>
                                <tbody id="menuData">
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
                                    <div className="row cardDetail">
                                        <div className="col-lg-7">
                                            { this.state.selectedMenu.menuCarbs.map((item, i) => {
                                            return <div key={i} className='row foodChoice'>
                                                    <div className='foodChoiceNumber col-lg-3'>{item.Carbohydrates}</div>
                                                    <div className='foodChoiceName col-lg-9'>{item.Food}</div>
                                                </div>
                                            })
                                            }
                                        </div>
                                        <div className="col-lg-5">
                                           <div className="row">
                                                <label className="col-sm-7 insulinRatioLabel">Carbs/Unit: </label>
                                                <div className="col-sm-5">
                                                    <input type="text" className="form-control form-control-sm insulinRatioValue" placeholder="25"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="col-sm-7 carbTotalsLabel">
                                                    Total Carbs: 
                                                </label>
                                                <div className="col-sm-5 totalCarbDetail">
                                                    {this.state.totalCarbs}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 amountToAdministerHeader">
                                                   Amount to Dose
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 amountToAdministerDetail">
                                                   {this.state.dosage.toFixed(1)} Units
                                                </div>
                                            </div>
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