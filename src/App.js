import logo from './logo.svg';
import './App.css';
import TableComponent from "./tableComponent";

function App() {

    const dataUrl = 'data.json'

    const headers = [
        {
            title: 'Khối lượng',
            dataIndex: 'KHOI_LUONG',
            width: 100,
            sort: "number",
            sum: true,

        },
        {
            title: 'Khối lượng nhập ',
            dataIndex: 'KL_NHAP',
            width: 100,
        },
        {
            title: 'Khối lượng tốn dầu',
            dataIndex: 'KL_TONDAU',
            width: 100,
        },

        {
            title: 'Khối lượng xuất',
            dataIndex: 'KL_XUAT',
            width: 100,
            filter: true,
            sum: true,

        },

        {
            title: 'Số lượng nhập',
            dataIndex: 'SL_NHAP',
            width: 100,
            sum: true,
            filter: true
        },
        {
            title: 'Số tốn dầu',
            dataIndex: 'SL_TONDAU',
            width: 100,
            sum: true
        },
        {
            title: 'Số xuất',
            dataIndex: 'SL_XUAT',
            sort: "number",
            width: 100,
            filter: true,

        },
        {
            title: 'Mã sản phẩm',
            dataIndex: 'MA_SP',
            width: 100,
            filter: true,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'TEN_SP',
            sort: "string",
            width: 100,
            filter: true,
        },
        {
            title: 'STT',
            dataIndex: 'STT',
            width: 100,
            sum: true,


        },
    ]

    return (
        <div className="App">
            <div id={"customTable"}>
                <TableComponent showIndex = {true} headers={headers} dateType="DD-MM-YYYY" dataUrl={dataUrl}  />
            </div>
        </div>
    );
}

export default App;
