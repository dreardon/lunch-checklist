import React from 'react'
import { Link } from "react-router-dom"
import $ from "jquery"
import { FormGroup, FormControl } from "react-bootstrap";
import jsPDF from 'jspdf';


import 'bootstrap/dist/css/bootstrap.css';

var foodURL = 'https://'+process.env.REACT_APP_API+'.execute-api.'+process.env.REACT_APP_REGION+'.amazonaws.com/'+process.env.REACT_APP_ENV+'/'

//var foodURL = 'http://localhost:3010/'

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastUpdated: 'lastUpdated',
            menu: {"menuCarbs":[{"Food":" Mashed Potatoes, 1/4c","Carbohydrates":6},{"Food":"(Melons & Pineapple)","Carbohydrates":8.2},{"Food":"100% Whole Grain Bread 1/2sl","Carbohydrates":9},{"Food":"5-Way Hot Mixed Veggie, 1/4c","Carbohydrates":4},{"Food":"6\" WW Tortilla, 1ea","Carbohydrates":12},{"Food":"All Natural Applesauce","Carbohydrates":10.32},{"Food":"AM: Cheddar Cheese Biscuit, 1ea","Carbohydrates":29},{"Food":"AM: Cheerios Cereal (GF), 1/2c","Carbohydrates":10},{"Food":"AM: Corn Chex Cereal (GF), 1/2c","Carbohydrates":13},{"Food":"AM: English Muffin, 1/2ea","Carbohydrates":12},{"Food":"AM: Fresh Zucchini Bread, 1sl","Carbohydrates":26},{"Food":"AM: Graham Crackers, 1sheet (2ea)","Carbohydrates":12.5},{"Food":"AM: Life Cereal, 1/2c","Carbohydrates":16.67},{"Food":"AM: Mini Pretzel, 8ea","Carbohydrates":10},{"Food":"AM: Plain Bagel, 1/2ea","Carbohydrates":14},{"Food":"AM: Raisin Bread, 1/2sl","Carbohydrates":7},{"Food":"AM: Strawberry Yogurt, 1/2c","Carbohydrates":19.5},{"Food":"AM: Vaniila Yogurt, 1/2c","Carbohydrates":19.5},{"Food":"AM: WG Blueberry Muffin, 1ea","Carbohydrates":26},{"Food":"AM: WG French Toast Stks, 1ea","Carbohydrates":19},{"Food":"Apple Juice, 1/2c","Carbohydrates":13},{"Food":"Baked Ziti, 1/2c","Carbohydrates":42},{"Food":"Beef Meatblls in Gravy, 3ea","Carbohydrates":16},{"Food":"Bibb, Baby Spinach, Lolla Russo, 1/4c","Carbohydrates":0.27},{"Food":"Caesar Dressing, 1Tsp","Carbohydrates":0.15},{"Food":"Caesar Salad, 1/4c","Carbohydrates":0.5},{"Food":"Cheeseburger Meatloaf, 1ea","Carbohydrates":10},{"Food":"Chicken Chunks Boneless Wings, 3ea","Carbohydrates":10.5},{"Food":"Chicken Fajitas, 1/3c","Carbohydrates":3},{"Food":"Chicken Sliders, 1ea","Carbohydrates":8},{"Food":"Corn Tortilla Chips, 1/4c","Carbohydrates":10},{"Food":"Country Style Salisbury Steak, 1ea","Carbohydrates":5.9},{"Food":"Danimals Yogurt, 4oz","Carbohydrates":14},{"Food":"Diced Peaches in Juice, 3/8c","Carbohydrates":9},{"Food":"Diced Pears in Juice, 1/2c","Carbohydrates":14},{"Food":"Diced Pears in Juice, 3/8c","Carbohydrates":10.5},{"Food":"Fresh  Banana (medium), 1/2ea","Carbohydrates":13.5},{"Food":"Fresh Apple 3/8c","Carbohydrates":9},{"Food":"Fresh Apple, 1/2ea  (medium)","Carbohydrates":12},{"Food":"Fresh Baby Carrots, 1/4","Carbohydrates":3.5},{"Food":"Fresh Cantaloupe, 1sl","Carbohydrates":6},{"Food":"Fresh Carrots, Broccoli , 1/4c","Carbohydrates":3.5},{"Food":"Fresh Granny Smith Apple 3/8c","Carbohydrates":7},{"Food":"Fresh Orange Wedges, 2pcs","Carbohydrates":5.5},{"Food":"Fresh Orange Wedges, 4pcs","Carbohydrates":11},{"Food":"Fresh Sauteed Green Beans, 1/4c","Carbohydrates":4},{"Food":"Gluten Free  Chicken Tenders, 3ea","Carbohydrates":13},{"Food":"Graham Crackers, 1sheet (2ea","Carbohydrates":12.5},{"Food":"Grape Jelly, 1tsp","Carbohydrates":4.33},{"Food":"Honey Dew, 1sl  (8/23)","Carbohydrates":7},{"Food":"Italian All Beef Meatballs, 3ea","Carbohydrates":2.4},{"Food":"Italian Bread, 1sl","Carbohydrates":32},{"Food":"Ketchup 1TSP","Carbohydrates":1.33},{"Food":"Macaroni & Cheese  1/2c","Carbohydrates":16},{"Food":"Mandarin Oranges, 1/2c","Carbohydrates":12},{"Food":"Mexican Nacho Fiesta, 1/4c","Carbohydrates":6},{"Food":"Mild Salsa, 1oz","Carbohydrates":2},{"Food":"Milk, 1/2c","Carbohydrates":5.33},{"Food":"Mixed Fruit in Juice, 3/8c","Carbohydrates":8.43},{"Food":"Mixed Fruit Salad, 3/8c","Carbohydrates":15},{"Food":"Orange Raspberry Juice, 1/2c","Carbohydrates":13},{"Food":"Oven Baked Chicken Patty  1ea","Carbohydrates":13},{"Food":"Oven Roasted Turkey Breast Sandwich, 1/2ea","Carbohydrates":18},{"Food":"Parmesan Cheese, 1/2oz","Carbohydrates":2},{"Food":"Pizza Pasta Bake, 1/2c","Carbohydrates":42},{"Food":"PM: Baby Carrots, 1/2c","Carbohydrates":7},{"Food":"PM: Blueberry Lemon Crispy, 1/2pkt","Carbohydrates":10.5},{"Food":"PM: Cheddar Cheese Goldfish, 1/3c","Carbohydrates":13.8},{"Food":"PM: Cheez It Crackers, 1/3c","Carbohydrates":16.55},{"Food":"PM: Cucumbers, 1/2c","Carbohydrates":1.5},{"Food":"PM: Mini Pretzel, 8ea","Carbohydrates":10},{"Food":"PM: Multi Grain Sun Chips, 1/2pkt","Carbohydrates":9},{"Food":"PM: Strawberry Yogurt, 1/2c","Carbohydrates":19.5},{"Food":"PM: String Cheese, 1ea","Carbohydrates":1},{"Food":"PM: Townhouse Crackers, 4ea","Carbohydrates":7.2},{"Food":"PM: Vanilla Yogurt, 1/2c","Carbohydrates":19.5},{"Food":"PM: WG Goldfish, 1ea","Carbohydrates":14},{"Food":"Ranch 1 TBLSP","Carbohydrates":2.6},{"Food":"Ranch 1 Tsp","Carbohydrates":2.6},{"Food":"Ranch Dip, 1/2oz","Carbohydrates":1},{"Food":"Ranch Dip, 1tsp","Carbohydrates":1},{"Food":"Roasted Teriyaki Chicken, 3ea","Carbohydrates":10.2},{"Food":"Saltines Crackers, 4ea","Carbohydrates":17.33},{"Food":"Shred Mozzarella Cheese, 1/2oz","Carbohydrates":0.4},{"Food":"Slider Roll, 1ea","Carbohydrates":19},{"Food":"Steamed Frozen Green Beans, 1/2c","Carbohydrates":2},{"Food":"Steamed Frozen Green Beans, 1/4c","Carbohydrates":2},{"Food":"Strawberry Kiwi Juice, 1/2c","Carbohydrates":13},{"Food":"Sub Roll, 1/2ea","Carbohydrates":19.5},{"Food":"Sweet Tender Peas 1/4c","Carbohydrates":4.5},{"Food":"Sweet Yellow Corn, 1/4c","Carbohydrates":7.9},{"Food":"Syrup, 1/2tsp","Carbohydrates":2.29},{"Food":"Syrup, 1tblsp","Carbohydrates":12.29},{"Food":"Tossed Salad, 1/2c","Carbohydrates":0.9},{"Food":"Townhouse Crackers, 4ea","Carbohydrates":7.2},{"Food":"Turkey Corn Dog Nuggets, 4ea","Carbohydrates":21},{"Food":"Vanilla Wafers, 4ea","Carbohydrates":11},{"Food":"WG Brown Rice","Carbohydrates":11.46},{"Food":"WG Buttermilk Pancakes, 1ea","Carbohydrates":16},{"Food":"Wheat Dinner Roll, 1ea","Carbohydrates":16},{"Food":"Wheat Hamburger Roll, 1ea","Carbohydrates":27},{"Food":"White Grape Juice, 1/2c","Carbohydrates":13},{"Food":"Whole Grain Crackers. 2pkts","Carbohydrates":8},{"Food":"WW Spaghetti w Meat Sauce, 1/2c","Carbohydrates":41}]},
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

    changeRatio(e) {
        var dosage = this.calcInsulin(this.state.totalCarbs,this.refs.ratio.value)
        this.setState({ 
            dosage: dosage})
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

    exportAsPdf() {        
        const elementToPrint = document.getElementById('lunch_card');
        
        const pdf = new jsPDF('p', 'pt', 'a4');
        
        pdf.internal.scaleFactor = 2.25;
        
        pdf.text(20, 30, "Dashboard");
        
        let options = {
            pagesplit: true,
            background: '#fff',
            format: 'PNG',
            padding: 50,
            margin: {
                top: 40,
                bottom: 30
            }
        };
        
        //pdf.rect(20, 20, pdf.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');
        pdf.setDisplayMode("125%", "continuous");
        pdf.addHTML(elementToPrint, 0, 30, options, () => {
            pdf.save('Dashboard.pdf');
        });}

        // html2canvas(document.body).then(canvas => {
        //     let pdf = new jsPDF('p', 'mm', 'a4');
        //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
        //     pdf.save(filename);
        // });

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
                                <span className="card-parent">
                                    <button onClick={this.exportAsPdf} className="btn btn-primary btn-sm">Print</button>
                                    <div className="card" id="lunch_card">
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
                                                        {/* <Input type="text" onKeyPress={this.changeRatio} className="form-control form-control-sm insulinRatioValue" placeholder="25" /> */}
                                                        {/* <input type="text" onKeyPress={this.changeRatio} className="form-control form-control-sm insulinRatioValue" placeholder="25"/> */}
                                                        <FormGroup>
                                                                <FormControl
                                                                    id="insulinRatio"
                                                                    placeholder="25"
                                                                    type="input"
                                                                    ref="ratio"
                                                                    onChange={this.changeRatio.bind(this)} 
                                                                    className="form-control form-control-sm insulinRatioValue"
                                                                />
                                                        </FormGroup>
                                                        
                                                
                                                
                                                
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
                                                <div className="row">
                                                    <div className="col-sm-12 notes">
                                                        <textarea className="form-control form-control-sm notesText"  rows="7"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}

export default Summary