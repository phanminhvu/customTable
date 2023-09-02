import React, {useState, useRef, useEffect} from "react";
import {
    Row, Col,
    Form,
    // Divider,
    Table,
    Input, Button, Space, Checkbox,
    Typography, Divider
} from 'antd';
import axios from "axios";
// import {Resizable} from 'react-resizable';
import './index.css';
import ResizableTitle from "./component/ResizableTitle";
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';

const {Text} = Typography
const CheckboxGroup = Checkbox.Group;
const TableComponent = (props) => {
    const [tableData, setTableData] = useState([])
    const [columns, setColumns] = useState(props.headers)
    // const [filterTableData, setfilterTableData] = useState([])
    // const [width, setWidth] = useState(0);
    // const [height, setHeight] = useState(0);
    const [filter, setFilter] = useState({});
    const [currentDataSource, setCurrentDataSource] = useState({})

    const [dataFilter, setDataFitler] = useState([])
    const [checkedList, setCheckedList] = useState([])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    function onChecked(checkedValues) {
        console.log('checked = ', checkedValues);
    }

    const getColumnSearchProps = (dataIndex, checkboxOptions) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />

                <Divider/>

                <Checkbox onChange={onChecked} value='a'>Select All</Checkbox>

                <Form style={{paddingLeft: "15px"}}>
                    <Form.Item  style={{ paddingTop: "5px"}}>
                        <Checkbox.Group onChange={onChecked} >
                            <Col>    {checkboxOptions.map((item) => (
                                <Row><Checkbox value={item}>{item}</Checkbox></Row>
                            ))}</Col>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
                <Divider/>


                {/*<CheckboxGroup options={checkboxOptions} value={checkedList} onChange={onChange} />*/}
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    {/*<Button*/}
                    {/*    type="link"*/}
                    {/*    size="small"*/}
                    {/*    onClick={() => {*/}
                    {/*        confirm({*/}
                    {/*            closeDropdown: false,*/}
                    {/*        });*/}
                    {/*        setSearchText(selectedKeys[0]);*/}
                    {/*        setSearchedColumn(dataIndex);*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Filter*/}
                    {/*</Button>*/}
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

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
        let sum = 0
        data.forEach((itemData, index) => {
            sum += itemData[dataIndex]
        })
        return sum.toFixed(3);
    }

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
                    dataIndex: item.dataIndex,
                    width: item.width,
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
                        item.sorter = {
                            compare: (a, b) =>
                                moment(a.Date, props.dateType) - moment(b.Date, props.dateType),
                        }
                        break
                    default:

                        break

                }
            }

            if (item.filter) {
                // cols[index] = {...item, ...getColumnSearchProps(item.dataIndex)}


                let filterData = []


                dataFilter[item.dataIndex].forEach((itemData, index) => filterData.filter((filterDataItem) => filterDataItem.value === itemData.value).length === 0 ?
                    filterData.push(itemData) : null)
                currentDataSource.forEach((itemData, index) => {
                    if (dataFilter.filter((dataFilterItem) =>
                        dataFilterItem.value == itemData[item.dataIndex]).length === 0 && itemData.key !== "sum") {
                        dataFilter.push(
                            {
                                text: itemData[item.dataIndex]?.toString(),
                                value: itemData[item.dataIndex],
                            }
                        )

                        // plainOptions.push(
                        //     itemData[item.dataIndex]?.toString(),
                        // )
                    }
                })
                let filteredValue = filterData.map((itemData, index) => itemData.value)
                let dataFilter = []
                currentDataSource.forEach((itemData, index) => {
                    if (!dataFilter.includes(itemData[item.dataIndex])) {
                        dataFilter.push(itemData[item.dataIndex])
                    }
                })
                cols[index] = {
                    ...item,
                    // ...getColumnSearchProps(item.dataIndex, dataFilter),
                    filterMode: 'tree',
                    filters: dataFilter[item.dataIndex],
                    defaultFilteredValue: filteredValue,
                    filterSearch: (input, record) => {
                        return record.title.toString().toLowerCase().includes(input.toLowerCase())
                    },

                    onFilter: (value, record) => {
                        let checked = false
                        if (record.key === "sum") {
                            checked = true
                        } else {
                            if (typeof record[item.dataIndex] === "number") {
                                checked = record[item.dataIndex] === value
                            } else {
                                checked = record[item.dataIndex]?.toString().toLowerCase().includes(value.toLowerCase())
                            }
                        }
                        return checked
                    },

                    // typeof record[item.dataIndex] === "number" ?
                    //      record[item.dataIndex] === value
                    //      : record[item.dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),

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
            columns={columns}
            onChange={onChange}
            dataSource={tableData}
            pagination={false}
        />);


}

export default TableComponent;

