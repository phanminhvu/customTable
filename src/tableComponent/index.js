import React, {useState, useMemo, useRef,useCallback, useEffect} from "react";
import {
    Row, Col,
    Form,

    Table,
    Input, Button, Space, Checkbox,
    Typography, Divider
} from 'antd';
import axios from "axios";
// import {Resizable} from 'react-resizable';
import './index.css';
import FilterTable from "./FilterTable";
// import ResizableTitle from "./component/ResizableTitle";
import moment from 'moment';
// import Highlighter from 'react-highlight-words';
import {FilterOutlined} from '@ant-design/icons';
const  dateTypeInput= "YYYY-MM-DDTHH:mm:ss.SSSZ"
const {Text} = Typography
const CheckboxGroup = Checkbox.Group;
const TableComponent = (props) => {
    const [tableData, setTableData] = useState([])
    const [columns, setColumns] = useState(props.headers)
    const [filter, setFilter] = useState({});
    const [currentDataSource, setCurrentDataSource] = useState({})

    const [dataFilter, setDataFitler] = useState([])

    useEffect(() => {
        didMount()

    }, []);


    useEffect(() => {
        if (tableData.length > 0) {
            const cols = setUpCols(columns)
            setColumns(cols)

        }
    }, [tableData]);


    // var filterCollection = document.getElementsByClassName('ant-dropdown-trigger')
    //
    // for(var i = 0; i < filterCollection.length; i++){
    //     filterCollection[i].addEventListener('click', function(e){
    //
    //         let checkBox = document.getElementsByClassName('ant-checkbox');
    //
    //
    //         let checkBoxTree = document.getElementsByClassName('ant-tree-checkbox');
    //         // checkBox.forEach((item, index) => {
    //         //     console.log(item, index, 'item')
    //         // })
    //
    //         for(var i = 0; i < checkBox.length; i++){
    //             console.log(checkBox[i], 'checkBox[i]')
    //             checkBox[i].classList.add("ant-checkbox-checked")
    //         }
    //
    //         for(var i = 0; i < checkBoxTree.length; i++){
    //             console.log(checkBoxTree[i], 'checkBox[i]')
    //             checkBoxTree[i].classList.add("ant-tree-checkbox-checked")
    //         }
    //        console.log(checkBox, typeof checkBox , 'checkBox')
    //         // checkBox.classList.add("ant-checkbox-checked")
    //     });
    // }

    const didMount = async () => {
        try {
            // const res = await axios.get(props.dataUrl)
            // let data = []
            // if (typeof res.data === 'string') {
            //     data = JSON.parse(data)
            // } else {
            //     data = res.data.data
            // }
            let data = setUpTableData(props.tableData)
            setTableData(data)
            setCurrentDataSource(data)

            const dataFitler = setUpDataFilter(data)
            setDataFitler(dataFitler)
        } catch (e) {
            console.log(e)
        }
    }




    const setUpDataFilter = (data) => {
        let dataFitler = {}
        data.forEach((item, index) => {
            Object.entries(item).forEach(([key, value]) => {
                dataFitler[key] = []
            })
        })
        data.forEach((item, index) => {
            Object.entries(item).forEach(([key, value]) => {
                if (dataFitler[key].findIndex((item) => item.value === value) === -1) {
                    dataFitler[key].push({
                        text: value.toString(),
                        value: value,
                    })
                }

            })
        })
        return dataFitler
    }

    const getSumValue = (data, dataIndex) => {
        if(data.length > 0){
        let sum = 0
        data.forEach((itemData, index) => {
            sum += itemData[dataIndex]
        })
        return sum.toLocaleString('US');
    }}


    const setUpCols = (columns) => {
        let cols = []
        const columnss = [...columns]
        const count = columnss.filter((item) => item.sum).length
        if (props.showIndex && columnss[0].dataIndex !== 'index') {
            cols = [{
                title: 'STT',
                dataIndex: 'index',
                fixed: 'left',
                key: 'index',
                width: 50,
            }].concat(columnss)
        } else {
            cols = columnss
        }

        cols.forEach((item, index) => {

            item.children = [
                {
                    title: item.key === 'index' ? <Text type="danger">Total</Text> : item.sum ?
                        <Text type="danger">{getSumValue(currentDataSource, item.dataIndex)}</Text>
                        : '',
                    align :  tableData.length > 0  &&  typeof tableData[0][item.dataIndex] === 'number' ? 'right' : 'left',
                    dataIndex: item.dataIndex,
                    width: item.width,
                    render : (text, record) => {
                            let value  = null
                        if (typeof record[item.dataIndex] === 'number') {
                            value = record[item.dataIndex].toLocaleString('US')
                        }else if(typeof record[item.dataIndex] === 'string'){
                            if(item.dateType){
                                value = moment(record[item.dataIndex], dateTypeInput).format(item.dateType)
                        }else {
                                value = record[item.dataIndex]
                            }

                        }


                        return value
                    }
                }
            ]
            if (item.sort) {
                switch (item.sort) {
                    case 'string':
                        item.sorter = (a, b) => a[item.dataIndex].localeCompare(b[item.dataIndex])
                        break
                    case 'number':
                        item.sorter = (a, b) => a[item.dataIndex] - b[item.dataIndex]
                        break
                    case 'date':
                        item.sorter = (a, b) => {
                            const dateA = moment( a[item.dataIndex], 'YYYY-MM-DDTHH:mm:ss.SSSZ');
                            const dateB = moment(b[item.dataIndex], 'YYYY-MM-DDTHH:mm:ss.SSSZ');
                            return dateA - dateB;
                        }
                        break
                    default:

                        break

                }
            }

            if (item.filter) {
                // cols[index] = {...item, ...getColumnSearchProps(item.dataIndex)}


                // let filterData = []
                //
                //
                // dataFilter[item.dataIndex].forEach((itemData, index) => filterData.filter((filterDataItem) => filterDataItem.value === itemData.value).length === 0 ?
                //     filterData.push(itemData) : null)
                // // currentDataSource.forEach((itemData, index) => {
                // //     if (dataFilter.filter((dataFilterItem) =>
                // //         dataFilterItem.value == itemData[item.dataIndex]).length === 0 && itemData.key !== "sum") {
                // //         dataFilter.push(
                // //             {
                // //                 text: itemData[item.dataIndex]?.toString(),
                // //                 value: itemData[item.dataIndex],
                // //             }
                // //         )
                // //
                // //         plainOptions.push(
                // //             itemData[item.dataIndex]?.toString(),
                // //         )
                // //     }
                // // })
                // let filteredValue = filterData.map((itemData, index) => itemData.value)
                let dataFilter = []
                currentDataSource.forEach((itemData, index) => {
                    if (!dataFilter.includes(itemData[item.dataIndex])) {
                        dataFilter.push(itemData[item.dataIndex])
                    }
                })
                cols[index] = {
                    ...item,

                    // filterMode: 'tree',
                    // filters: dataFilter[item.dataIndex],
                    // defaultFilteredValue: filteredValue,
                    // filterSearch: (input, record) => {
                    //     return record.title.toString().toLowerCase().includes(input.toLowerCase())
                    // },
                    //
                    // onFilter: (value, record) => {
                    //     let checked = false
                    //     if (record.key === "sum") {
                    //         checked = true
                    //     } else {
                    //         if (typeof record[item.dataIndex] === "number") {
                    //             checked = record[item.dataIndex] === value
                    //         } else {
                    //             checked = record[item.dataIndex]?.toString().toLowerCase().includes(value.toLowerCase())
                    //         }
                    //     }
                    //     return checked
                    // },

                }

            }
        })

        return cols
    }

    const setUpTableData = (data) => {
        if (props.showIndex) {
            data.forEach((item, index) => {
                item.index = index + 1
            })
        }
        data.forEach((item, index) => {
            item.key = index
        })

        // const result = addSumaryRow(data)
        // console.log(props.headers)
        return data
    }

    // const addSumaryRow = (data) => {
    //     const headers = props.headers
    //     const headerSum = headers.filter((item) => item.sum)
    //
    //     let summary = [{
    //         index: 'Tổng',
    //         key: 'sum',
    //     }]
    //     headerSum.forEach((item) => {
    //         summary[0][item.dataIndex] = getSumValue(data, item.dataIndex)
    //     })
    //
    //     const result = summary.concat(data)
    //     return result
    // }

    // const handleResize = (index) => (e, {size}) => {
    //     const nextColumns = [...columns];
    //     nextColumns[index] = {
    //         ...nextColumns[index], width: size.width,
    //     };
    //     setColumns(nextColumns);
    // };

    // const components = {
    //     header: {
    //         cell: ResizableTitle,
    //     },
    // };
    //
    useEffect(() => {
        // const filterTableData = addSumaryRow(currentDataSource.filter((item) => item.key !== "sum"))
        // setfilterTableData(currentDataSource)

        if (tableData.length > 0) {
            const cols = setUpCols(columns)
            setColumns(cols)

        }


    }, [filter]);


    const onChange = (pagination, filters, sorter, extra) => {
        setCurrentDataSource(extra.currentDataSource)
        setDataFitler(setUpDataFilter(extra.currentDataSource))
        if (Object.entries(filters).length > 0) {
            setFilter(filters)
        }
    };
    const [state, setState] = useState({});
    const cols = useMemo(() => {
        return   setUpCols(columns).map((col) => {
            if (col.dateType) {
                return {
                    ...col,
                    children : [
                        {
                            title: '',
                            align : 'left',
                            dataIndex: col.dataIndex,
                            width: col.width,
                            render(_, record) {
                                return (
                                    <span>
                {record[col.dataIndex]
                    ? moment(record[col.dataIndex]).format(col.dateType)
                    : null}
              </span>
                                );
                            },
                        }
                    ]
                };
            }

            return col;
        });

    }, []);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setState({ ...state, [dataIndex]: selectedKeys });
    };

    const handleReset = (clearFilters, dataIndex) => {
        clearFilters();
        setState({ ...state, [dataIndex]: [] });
    };
    const options = useCallback(
        (col) => {
            const result = props.tableData
                .filter((item) => {
                    const cloneState = { ...state };
                    // delete cloneState[col.dataIndex];
                    let checkItem = true;
                    Object.keys(cloneState).forEach((s) => {
                        if (cloneState[s].length && !cloneState[s]?.includes(item[s])) {
                            checkItem = false;
                        }
                    });
                    return checkItem;
                })
                .map((record) => {
                    return {
                        value: record[col.dataIndex],
                        label: col.dateType
                            ? moment(record[col.dataIndex]).format(col.dateType)
                            : record[col.dataIndex],
                    };
                })
                .filter((value, index, self) => {
                    const indexFound = self.findIndex((i) => i.value === value.value);
                    return indexFound === index;
                });
            return result;
        },

        [state]
    );
    return (
        <Table
            // components={components}
            // columns={columns.map((col, index) => ({
            //     ...col,
            //     onHeaderCell: (column) => ({
            //         width: column.width,
            //         onResize: handleResize(index),
            //     }),
            // }))}
            className='Table-List'
            scroll={{y: 'calc(100vh - 250px)'}}
            size='small'
            columns={setUpCols(cols).map((col) => {
                if (!col.filterDropdown) return col;
                return {
                    ...col,
                    filterDropdown: ({
                                         setSelectedKeys,
                                         selectedKeys,
                                         confirm,
                                         clearFilters,
                                     }) => {
                        return (
                            <div style={{ padding: 8 }}>
                                {
                                    <FilterTable
                                        handleSearch={() =>
                                            handleSearch(selectedKeys, confirm, col.dataIndex)
                                        }
                                        handleReset={() =>
                                            handleReset(clearFilters, col.dataIndex)
                                        }
                                        setSelectedKeys={setSelectedKeys}
                                        options={options(col)}
                                    />
                                }
                            </div>
                        );
                    },
                    onFilter: (value, record) => {
                        if (typeof value === "string") {

                            return record[col.dataIndex]?.toLowerCase()
                                .includes(value?.toLowerCase());
                        }
                        if (!Number.isNaN(record[col.dataIndex])) {
                            return record[col.dataIndex] === parseInt(value, 10);
                        }
                    },
                    filterIcon: (filtered) => (
                        <FilterOutlined
                            style={{ color: filtered ? "#1890ff" : undefined }}
                        />
                    ),
                };
            })}

            onChange={onChange}
            dataSource={tableData}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => { if(props.onClickRow){props.onClickRow(record, rowIndex)}

                    }, // click row
                };
            }}
            pagination={false}
        />);


}

export default TableComponent;

