import React, {useState, useRef, useEffect} from "react";
import {Divider, Input, Button, Table, Space, Row, Col, Typography, Card} from 'antd';
import axios from "axios";
import {Resizable} from 'react-resizable';
import './index.css';
import ResizableTitle from "./component/ResizableTitle";
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';

const {Text} = Typography

const TableComponent = (props) => {
    const [tableData, setTableData] = useState([])
    const [columns, setColumns] = useState(props.headers)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((event) => {
            // Depending on the layout, you may need to swap inlineSize with blockSize
            // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
            setWidth(event[0].contentBoxSize[0].inlineSize);
            setHeight(event[0].contentBoxSize[0].blockSize);
        });

        resizeObserver.observe(document.getElementById("customTable"));
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



    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        confirm();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
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
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
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
                text: 'STT',
                dataIndex: 'index',
                fixed: 'left',
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
                cols[index] = {...item, ...getColumnSearchProps(item.dataIndex)}
            }

            let title = null

            if(item.sum ){
                 title =  <Col>
                    <Row> <Text strong>{item.text}</Text></Row>
                    <Divider/>
                    <Row><Text type="danger">{getSumValue(tableData, item.dataIndex)} </Text></Row>
                </Col>
            }
            else {
                if(item.key === 0){
                     title  =  <Col>
                        <Row> <Text strong>{item.text}</Text></Row>
                        <Divider/>
                        <Row><Text type="danger">Tổng</Text></Row>
                    </Col>
                }
                else{
                  title =  <Col>
                        <Row> <Text strong>{item.text}</Text></Row>
                        <Divider/>
                        <Row></Row>
                    </Col>
                }
            }

            item.title = title
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

        return data
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
    };

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


            nChange={onChange}
            scroll={{x: width, y: height}}
            dataSource={tableData}
        />);
}

export default TableComponent;
