import React, {Component} from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

class RequestPermissionTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected : null
        };

    }


    render() {

        //const onRowClick =



        // const data = [
        //     {
        //         "item": "cement",
        //         "item_desc": " Need at least 200 bags of cement for the upcoming two weeks work in the construction site at Malabe",
        //         "quantity" : 18,
        //         "unit_price" : 3200,
        //         "total_cost" : null,
        //         "status" : null,
        //         "priority" : 5
        //     },
        //     {
        //         "item": "sand",
        //         "item_desc": "8 cubes of sand for the upcoming two weeks work in the construction site at Malabe",
        //         "quantity" : 8,
        //         "unit_price" : 8500,
        //         "total_cost" : null,
        //         "status" : "pending",
        //         "priority" : 8
        //     },
        //     {
        //         "item": "Metal",
        //         "item_desc": "4 cubes of Metal for the upcoming two weeks work in the construction site at Malabe",
        //         "quantity" : 4,
        //         "unit_price" : 5400,
        //         "total_cost" : null,
        //         "status" : null,
        //         "priority" : 2
        //     }
        // ];

        const columns = [
            {
                Header: 'Material Item',
                accessor: 'item',
            },
            {
                Header: 'Quantity Required',
                accessor: 'quantity',
            },
            {
                Header: 'Approximate Unit Price',
                accessor: 'unit_price',
            },
            {
                Header: 'Approximate Total Cost',
                accessor: 'total_cost',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Priority Level',
                accessor: 'priority',

            }
        ];

        return (
            <div className="card-body">
                <h4 className="card-title">Purchase Order Requisition table </h4>
                <br/>
                <ReactTable
                    columns={columns}
                    data={this.props.requestPermissionOrdersDataSet}
                    defaultPageSize={10}
                    getTrGroupProps={(state, rowInfo, column, instance) => {
                        if (rowInfo !== undefined) {
                            return {
                                onClick: (e, handleOriginal) => {
                                    console.log('It was in this row:', rowInfo)
                                    this.props.onSelectRow(rowInfo);
                                    this.setState({
                                        selected: rowInfo.index
                                    })
                                },
                                style: {
                                    cursor: 'pointer',
                                    background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                }
                            }
                        }}
                    }
                    defaultSorted={[
                        {
                            id: "priority",
                            asc: true
                        }
                    ]}
                ></ReactTable>
            </div>
        );
    }
}

export default RequestPermissionTable;