import React, {useState,  useEffect} from "react";
import {Divider,  Table,  Row, Col, Typography} from 'antd';
import axios from "axios";
// import {Resizable} from 'react-resizable';
import './index.css';
import ResizableTitle from "./component/ResizableTitle";
import moment from 'moment';


const {Text} = Typography

const TableComponent = (props) => {
    const [tableData, setTableData] = useState([])
    const [columns, setColumns] = useState(props.headers)

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [currentDataSource, setCurrentDataSource] = useState([])


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


   //  useEffect(() => {
   // console.log('filteredData', filteredData)
   //  }, [filteredData]);

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

                let dataFilter = []
                tableData.forEach((itemData, index) => {
                    if (dataFilter.filter(( dataFilterItem) => dataFilterItem.value == itemData[item.dataIndex]).length === 0 && itemData.key !== "sum") {
                        dataFilter.push(
                        {
                            text: itemData[item.dataIndex]?.toString(),
                            value: itemData[item.dataIndex],
                        }
                        )
                    }
                })

                cols[index] = {...item,
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

        const headers = props.headers
        const headerSum = headers.filter((item) => item.sum)

        let summary = [{
            index: 'Tổng',
            key: 'sum',
        }]
        headerSum.forEach((item) => {
            summary[0][item.dataIndex] = getSumValue(data, item.dataIndex)
        })

        const result = summary.concat(data)




        // console.log(props.headers)

        return result
    }

    const handleResize = (index) => (e, {size}) => {
        const nextColumns = [...columns];
        nextColumns[index] = {
            ...nextColumns[index], width: size.width,
        };
        setColumns(nextColumns);
    };

    const components = {
        header: {
            cell: ResizableTitle,
        },
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        setCurrentDataSource(extra.currentDataSource)
    };
    console.log('currentDataSource', currentDataSource)

    return (
        <Table
            bordered
            components={components}
            columns={columns.map((col, index) => ({
                ...col,
                onHeaderCell: (column) => ({
                    width: column.width,
                    onResize: handleResize(index),
                }),
            }))}


            onChange={onChange}
            scroll={{x: width, y: height}}
            dataSource={tableData}
        />);
}

export default TableComponent;
