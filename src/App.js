import logo from './logo.svg';
import './App.css';
import TableComponent from "./tableComponent";

function App() {

    const dataUrl = 'data.json'

    const headers = [
        {
            text: 'Khối lượng',
            dataIndex: 'KHOI_LUONG',
            width: 100,
            sort: "number",
            sum: true,
            filter: true,
        },
        {
            text: 'Khối lượng nhập ',
            dataIndex: 'KL_NHAP',
            width: 100,
        },
        {
            text: 'Khối lượng tốn dầu',
            dataIndex: 'KL_TONDAU',
            width: 100,
        },

        {
            text: 'Khối lượng xuất',
            dataIndex: 'KL_XUAT',
            width: 100,

            sum: true,

        },

        {
            text: 'Số lượng nhập',
            dataIndex: 'SL_NHAP',
            width: 100,
            sum: true

        },
        {
            text: 'Số tốn dầu',
            dataIndex: 'SL_TONDAU',
            width: 100,
            sum: true
        },
        {
            text: 'Số xuất',
            dataIndex: 'SL_XUAT',
            sort: "number",
            width: 100,

        },
        {
            text: 'Mã sản phẩm',
            dataIndex: 'MA_SP',
            width: 100,
            filter: true,
        },
        {
            text: 'Tên sản phẩm',
            dataIndex: 'TEN_SP',
            sort: "string",
            width: 100,
            filter: true,
        },
        {
            text: 'STT',
            dataIndex: 'STT',
            width: 100,

        },
    ]

    return (
        <div className="App">
            <div id={"customTable"} style={{height: "600px", width: "2000px"}}>
                <TableComponent showIndex = {true} headers={headers} dateType="DD-MM-YYYY" dataUrl={dataUrl}  />
            </div>
        </div>
    );
}

export default App;
