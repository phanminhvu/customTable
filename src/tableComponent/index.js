import React, {useState, useRef, useEffect} from "react";
import {
    // Divider,
    Table,
    // Input,Button, Space,  Checkbox,   Row, Col,
    Typography} from 'antd';
import axios from "axios";
// import {Resizable} from 'react-resizable';
import './index.css';
import ResizableTitle from "./component/ResizableTitle";
import moment from 'moment';
// import Highlighter from 'react-highlight-words';
// import { SearchOutlined } from '@ant-design/icons';
const {Text} = Typography




const TableComponent = (props) => {
    const [tableData, setTableData] = useState([])
    const [columns, setColumns] = useState(props.headers)
    const [filterTableData, setfilterTableData] = useState([])
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [filter, setFilter] = useState({});
    const [currentDataSource, setCurrentDataSource] = useState([])

    // const [searchText, setSearchText] = useState('');
    // const [searchedColumn, setSearchedColumn] = useState('');
    // const searchInput = useRef(null);
    //
    // const [checkedList, setCheckedList] = useState(defaultCheckedList);
    // const checkAll = plainOptions.length === checkedList.length;
    // const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
    // const onChangeChecked = (list) => {
    //     setCheckedList(list);
    // };
    // const onCheckAllChange = (e) => {
    //     console.log(e.target.checked)
    //     setCheckedList(e.target.checked ? plainOptions : []);
    // };
    //
    // const handleSearch = (selectedKeys, confirm, dataIndex) => {
    //     confirm();
    //     setSearchText(selectedKeys[0]);
    //     setSearchedColumn(dataIndex);
    // };
    // const handleReset = (clearFilters) => {
    //     clearFilters();
    //     setSearchText('');
    // };
    // const getColumnSearchProps = (dataIndex, dataOptions) => ({
    //     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
    //         <div
    //             style={{
    //                 padding: 8,
    //             }}
    //             onKeyDown={(e) => e.stopPropagation()}
    //         >
    //             <Input
    //                 ref={searchInput}
    //                 placeholder={`Search ${dataIndex}`}
    //                 value={selectedKeys[0]}
    //                 onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
    //                 onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //                 style={{
    //                     marginBottom: 8,
    //                     display: 'block',
    //                 }}
    //             />
    //
    //             <Checkbox  onChange={onCheckAllChange} checked={checkAll}>
    //                 Check all
    //             </Checkbox>
    //             <Divider />
    //             <CheckboxGroup options={dataOptions} value={checkedList} onChange={onChangeChecked} />
    //
    //             <Space>
    //                 <Button
    //                     type="primary"
    //                     onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //                     icon={<SearchOutlined />}
    //                     size="small"
    //                     style={{
    //                         width: 90,
    //                     }}
    //                 >
    //                     Search
    //                 </Button>
    //                 <Button
    //                     onClick={() => clearFilters && handleReset(clearFilters)}
    //                     size="small"
    //                     style={{
    //                         width: 90,
    //                     }}
    //                 >
    //                     Reset
    //                 </Button>
    //                 <Button
    //                     type="link"
    //                     size="small"
    //                     onClick={() => {
    //                         confirm({
    //                             closeDropdown: false,
    //                         });
    //                         setSearchText(selectedKeys[0]);
    //                         setSearchedColumn(dataIndex);
    //                     }}
    //                 >
    //                     Filter
    //                 </Button>
    //                 <Button
    //                     type="link"
    //                     size="small"
    //                     onClick={() => {
    //                         close();
    //                     }}
    //                 >
    //                     close
    //                 </Button>
    //             </Space>
    //         </div>
    //     ),
    //     filterIcon: (filtered) => (
    //         <SearchOutlined
    //             style={{
    //                 color: filtered ? '#1677ff' : undefined,
    //             }}
    //         />
    //     ),
    //     onFilter: (value, record) =>
    //         record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    //     onFilterDropdownOpenChange: (visible) => {
    //         if (visible) {
    //             setTimeout(() => searchInput.current?.select(), 100);
    //         }
    //     },
    //     render: (text) =>
    //         searchedColumn === dataIndex ? (
    //             <Highlighter
    //                 highlightStyle={{
    //                     backgroundColor: '#ffc069',
    //                     padding: 0,
    //                 }}
    //                 searchWords={[searchText]}
    //                 autoEscape
    //                 textToHighlight={text ? text.toString() : ''}
    //             />
    //         ) : (
    //             text
    //         ),
    // });



    useEffect(() => {
        try {

            const observerCallback: ResizeObserverCallback = (entries) => {
                window.requestAnimationFrame(() => {
                    if (!Array.isArray(entries) || !entries.length) {
                        return;
                    }
                    setWidth(entries[0].contentBoxSize[0].inlineSize);
                    setHeight(entries[0].contentBoxSize[0].blockSize);
                });
            };
            const resizeObserver = new ResizeObserver(observerCallback);
            //
            //
            // const resizeObserver = new ResizeObserver((event) => {
            //     setWidth(event[0].contentBoxSize[0].inlineSize);
            //     setHeight(event[0].contentBoxSize[0].blockSize);
            // });
            resizeObserver.observe(document.getElementById("customTable"));
        } catch (e) {
            console.log(e)
        }

    });


    useEffect(() => {
        didMount()

    }, []);


    useEffect(() => {
        if(tableData.length > 0) {
            const cols = setUpCols(columns)
            setColumns(cols)
        }
    }, [tableData]);


    const didMount = async () => {
        try {
            const res = await axios.get(props.dataUrl)
            let data = []
            if (typeof res.data === 'string') {
                data = JSON.parse(data)
            } else {
                data = res.data.data
            }
            data =  setUpTableData(data)
            setTableData(data)
            setCurrentDataSource(data)

        } catch (e) {
            console.log(e)
        }
    }


    const getSumValue = (data, dataIndex) => {

        let sum = 0
        data.forEach((itemData, index) => {
            sum += itemData[dataIndex]
        })

        return sum
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
                    title: item.key === 'index' ?   <Text type="danger">Tổng</Text>  : item.sum ?
                        <Text type="danger">{  getSumValue(currentDataSource, item.dataIndex)}</Text>
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

                let plainOptions = []
                let dataFilter = []

                let dataLoop = Object.entries(filter).length > 0 ? filterTableData : tableData

                // console.log(dataLoop)

                currentDataSource.forEach((itemData, index) => {
                    if (dataFilter.filter(( dataFilterItem) => dataFilterItem.value == itemData[item.dataIndex]).length === 0 && itemData.key !== "sum") {
                        dataFilter.push(
                        {
                            text: itemData[item.dataIndex]?.toString(),
                            value: itemData[item.dataIndex],
                        }
                        )

                        plainOptions.push(
                              itemData[item.dataIndex]?.toString(),
                        )
                    }
                })

                cols[index] = {...item,
                    // ...getColumnSearchProps(item.dataIndex, plainOptions),
                    filterMode: 'tree',
                    filters:dataFilter,
                    filterSearch: true,
                    onFilter: (value, record) =>

                    {
                      let checked = false
                        if(record.key === "sum") {
                            checked = true
                        }else {
                            if(typeof record[item.dataIndex] === "number") {
                                checked = record[item.dataIndex] === value
                            } else {
                                checked = record[item.dataIndex]?.toString().toLowerCase().includes(value.toLowerCase())
                            }
                        }
                    return checked
                    }
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
        setfilterTableData(currentDataSource)

        if(tableData.length > 0) {
            const cols = setUpCols(columns)
            setColumns(cols)
        }

    }, [filter]);

    const onChange = (pagination, filters, sorter, extra) => {
        setCurrentDataSource(extra.currentDataSource)
        if(Object.entries(filters).length > 0){
        setFilter(filters)}
    };


    return (
        <Table
            bordered
            // components={components}
            // columns={columns.map((col, index) => ({
            //     ...col,
            //     onHeaderCell: (column) => ({
            //         width: column.width,
            //         onResize: handleResize(index),
            //     }),
            // }))}
            columns={columns}
            onChange={onChange}
            scroll={{ y: height}}
            dataSource={tableData}
            pagination={false}
        />);
}

export default TableComponent;
