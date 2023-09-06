import logo from './logo.svg';
import './App.css';
import TableComponent from "./tableComponent";
import moment from 'moment';

function App() {

    const dataUrl = 'data.json'


    const  generateRandomDate = () => {
        const year = Math.floor(Math.random() * (2100 - 1900 + 1)) + 1900; // Adjust the year range as needed
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 31) + 1;
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);
        const second = Math.floor(Math.random() * 60);
        const millisecond = Math.floor(Math.random() * 1000);

        const randomDate = moment()
            .year(year)
            .month(month - 1) // Month is zero-based in Moment.js
            .date(day)
            .hour(hour)
            .minute(minute)
            .second(second)
            .millisecond(millisecond)
            .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        return randomDate;
    }


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
            filterDropdown: true,
            sum: true,
        },
        {
            title: 'Số lượng nhập',
            dataIndex: 'SL_NHAP',
            dateType: "DD-MM-YYYY",
            sort: "date",
            width: 100,
            filterDropdown: true
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
            sum: true,
            filterDropdown: true,

        },
        {
            title: 'Mã sản phẩm',
            dataIndex: 'MA_SP',
            width: 100,
            filterDropdown: true,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'TEN_SP',
            sort: "string",
            width: 100,
            filterDropdown: true,
        },
        {
            title: 'STT',
            dataIndex: 'STT',
            width: 100,
            sum: true,
        },
    ]

    const tableData = {
        "status": "success",
        "data": [

            {
                "MA_SP": "1BCCDRXVN",
                "TEN_SP": "THỊT BA CHỈ HEO CÓ DA RÚT XƯƠNG VLMK NGA (MÃ CÂN) - FROZEN PORK BELLY SINGLE RIBBED RIND ON",
                "SL_TONDAU": 2626,
                "KL_TONDAU": 55896.99,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 2626,
                "KHOI_LUONG": 55896.99,
                "STT": 2
            },
            {
                "MA_SP": "1DHC77N",
                "TEN_SP": "ĐUÔI HEO DÀI CHERKIZOVO 77 NGA 10KG  - FROZEN PORK TAILS",
                "SL_TONDAU": 590,
                "KL_TONDAU": 5900,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 13,
                "KL_XUAT": 130,
                "SL_TONKHO": 577,
                "KHOI_LUONG": 5770,
                "STT": 3
            },
            {
                "MA_SP": "1KGHTVLMK",
                "TEN_SP": "KHOANH GIÒ HEO TRƯỚC VLMK NGA (MÃ CÂN) - FROZEN PORK FORE HOCK",
                "SL_TONDAU": 922,
                "KL_TONDAU": 21335.97,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 122,
                "KL_XUAT": 2821.09,
                "SL_TONKHO": 800,
                "KHOI_LUONG": 18514.88,
                "STT": 4
            },
            {
                "MA_SP": "1LHND",
                "TEN_SP": "LƯỠI HEO NWT ĐỨC 10KG - FROZEN PORK TONGUE",
                "SL_TONDAU": 1272,
                "KL_TONDAU": 12720,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 15,
                "KL_XUAT": 150,
                "SL_TONKHO": 1257,
                "KHOI_LUONG": 12570,
                "STT": 5
            },
            {
                "MA_SP": "1MCHMN",
                "TEN_SP": "MỠ CẮT HEO MIRATORG NGA (MÃ CÂN) - PORK CUTTING FAT FROZEN",
                "SL_TONDAU": 499,
                "KL_TONDAU": 13606.6,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 5,
                "KL_XUAT": 134.67,
                "SL_TONKHO": 494,
                "KHOI_LUONG": 13471.93,
                "STT": 6
            },
            {
                "MA_SP": "1MGHSAPK",
                "TEN_SP": "MÓNG GIÒ HEO SAU APK NGA 10 KG - FROZEN PORK HIND FEET",
                "SL_TONDAU": 5598,
                "KL_TONDAU": 55980,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 5,
                "KL_XUAT": 50,
                "SL_TONKHO": 5593,
                "KHOI_LUONG": 55930,
                "STT": 7
            },
            {
                "MA_SP": "1MGHTAPKA",
                "TEN_SP": "MÓNG GIÒ HEO TRƯỚC APK \"A\" NGA 10 KG - FROZEN PORK FRONT FEET",
                "SL_TONDAU": 50,
                "KL_TONDAU": 500,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 5,
                "KL_XUAT": 50,
                "SL_TONKHO": 45,
                "KHOI_LUONG": 450,
                "STT": 8
            },
            {
                "MA_SP": "1MGHTSFD",
                "TEN_SP": "MÓNG GIÒ HEO TRƯỚC SIMON FLEISCH ĐỨC 10KG - PORK FRONT FEET",
                "SL_TONDAU": 2663,
                "KL_TONDAU": 26627,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 180,
                "KL_XUAT": 1800,
                "SL_TONKHO": 2483,
                "KHOI_LUONG": 24827,
                "STT": 9
            },
            {
                "MA_SP": "1MGHTVLMK",
                "TEN_SP": "MÓNG GIÒ HEO TRƯỚC VLMK 15 KG - PORK FRONT FEET FROZEN",
                "SL_TONDAU": 656,
                "KL_TONDAU": 9840,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 77,
                "KL_XUAT": 1155,
                "SL_TONKHO": 579,
                "KHOI_LUONG": 8685,
                "STT": 10
            },
            {
                "MA_SP": "1MHKDMN",
                "TEN_SP": "MÁ HEO KHÔNG DA MIRATORG NGA (MÃ CÂN) - PORK JOWLS SKINLESS FROZEN",
                "SL_TONDAU": 5765,
                "KL_TONDAU": 47589.06,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 5,
                "KL_XUAT": 42.38,
                "SL_TONKHO": 5760,
                "KHOI_LUONG": 47546.68,
                "STT": 11
            },
            {
                "MA_SP": "1MLMN",
                "TEN_SP": "MỠ LƯNG MIRATORG NGA (MÃ CÂN) - PORK CUTTING FAT FROZEN",
                "SL_TONDAU": 1963,
                "KL_TONDAU": 52494.39,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 1963,
                "KHOI_LUONG": 52494.39,
                "STT": 12
            },
            {
                "MA_SP": "1MTRN",
                "TEN_SP": "MÓNG GIÒ HEO TRƯỚC RUSAGRO NGA 10KG - FROZEN PORK FRONT FEET",
                "SL_TONDAU": 674,
                "KL_TONDAU": 6738,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 100,
                "KL_XUAT": 1000,
                "SL_TONKHO": 574,
                "KHOI_LUONG": 5738,
                "STT": 13
            },
            {
                "MA_SP": "1NVMN",
                "TEN_SP": "THỊT NẠC VAI HEO KHÔNG XƯƠNG MIRATORG NGA (MÃ CÂN) - PORK SHOULDER BONELESS SKINLESS",
                "SL_TONDAU": 12,
                "KL_TONDAU": 345.79,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 12,
                "KHOI_LUONG": 345.79,
                "STT": 14
            },
            {
                "MA_SP": "1SHCMD",
                "TEN_SP": "SỤN VẦNG TRĂNG CM CROWN MEAT ĐỨC 10KG - PORK SHOULDER MOONBONES",
                "SL_TONDAU": 2432,
                "KL_TONDAU": 24315,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 5,
                "KL_XUAT": 50,
                "SL_TONKHO": 2427,
                "KHOI_LUONG": 24265,
                "STT": 15
            },
            {
                "MA_SP": "1SHKM",
                "TEN_SP": "SƯỜN HEO KEKÉN MEXICO (MÃ CÂN) - FROZEN PORK SPARE RIB REG CUT",
                "SL_TONDAU": 28,
                "KL_TONDAU": 447.2,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 28,
                "KHOI_LUONG": 447.2,
                "STT": 16
            },
            {
                "MA_SP": "1SHSM",
                "TEN_SP": "SƯỜN HEO SMITHFIELD MỸ (MÃ CÂN) - FROZEN PORK SPARERIBS",
                "SL_TONDAU": 10,
                "KL_TONDAU": 139.37,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 5,
                "KL_XUAT": 69.78,
                "SL_TONKHO": 5,
                "KHOI_LUONG": 69.59,
                "STT": 17
            },
            {
                "MA_SP": "1SMTPY",
                "TEN_SP": "SỤN VẦNG TRĂNG PINI Ý 10KG- PORK MOON BONES",
                "SL_TONDAU": 320,
                "KL_TONDAU": 3196,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 90,
                "KL_XUAT": 900,
                "SL_TONKHO": 230,
                "KHOI_LUONG": 2296,
                "STT": 18
            },
            {
                "MA_SP": "1TBCHCDRXAN",
                "TEN_SP": "THỊT BA CHỈ HEO CÓ DA RÚT XƯƠNG APK NGA (MÃ CÂN) - BELLY SINGLE RIBBED RIND ON",
                "SL_TONDAU": 236,
                "KL_TONDAU": 4439.55,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 5,
                "KL_XUAT": 98.76,
                "SL_TONKHO": 231,
                "KHOI_LUONG": 4340.79,
                "STT": 19
            },
            {
                "MA_SP": "1TCLHCXAB",
                "TEN_SP": "THỊT CỐT LẾT HEO CÓ XƯƠNG ALEGRA BRAZIL (MÃ CÂN) - FROZEN PORK BONE-IN LOIN (WITH VERTEBRAE)",
                "SL_TONDAU": 1380,
                "KL_TONDAU": 26877.36,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 1380,
                "KHOI_LUONG": 26877.36,
                "STT": 20
            },
            {
                "MA_SP": "1TCLHCXFB",
                "TEN_SP": "THỊT CỐT LẾT HEO CÓ XƯƠNG FRIMESA BRASIL 25KG - PORK BONE IN LOIN WITHOUT FILLET",
                "SL_TONDAU": 0,
                "KL_TONDAU": 0,
                "SL_NHAP":  generateRandomDate(),
                "KL_NHAP": 27000,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 1080,
                "KHOI_LUONG": 27000,
                "STT": 21
            },
            {
                "MA_SP": "1TCLHDLB",
                "TEN_SP": "THỊT (SƯỜN) CỐT LẾT HEO DALIA BRAZIL (MÃ CÂN) - PORK LOIN BONE IN",
                "SL_TONDAU": 95,
                "KL_TONDAU": 2048.04,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 95,
                "KHOI_LUONG": 2048.04,
                "STT": 22
            },
            {
                "MA_SP": "1TDHC77N",
                "TEN_SP": "THỊT DẢI HEO CHERKIZOVO 77  NGA 12KG  - FROZEN PORK DIAPHRAGM",
                "SL_TONDAU": 1674,
                "KL_TONDAU": 20088,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 1674,
                "KHOI_LUONG": 20088,
                "STT": 23
            },
            {
                "MA_SP": "1TDHDLMAN",
                "TEN_SP": "THỊT DẢI HEO ĐÔNG LẠNH LLC MPK ATYASHEVSKY NGA 10KG - FROZEN PORK DIAPHRAGM",
                "SL_TONDAU": 2700,
                "KL_TONDAU": 26994,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 2700,
                "KHOI_LUONG": 26994,
                "STT": 24
            },
            {
                "MA_SP": "1THAGAN",
                "TEN_SP": "TAI HEO APK \"GRADE A\" NGA 16KG  - FROZEN PORK EARS",
                "SL_TONDAU": 1642,
                "KL_TONDAU": 26272,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 271,
                "KL_XUAT": 4336,
                "SL_TONKHO": 1371,
                "KHOI_LUONG": 21936,
                "STT": 25
            },
            {
                "MA_SP": "1THGVB",
                "TEN_SP": "TAI HEO GOODVALLEY BA LAN 10KG - PORK EARS",
                "SL_TONDAU": 3604,
                "KL_TONDAU": 36038,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 3604,
                "KHOI_LUONG": 36038,
                "STT": 26
            },
            {
                "MA_SP": "1THPGAN",
                "TEN_SP": "TAI HEO PRIMECHOICE 77 \"GRADE A\" NGA 10KG  - FROZEN PORK EARS GRADE A",
                "SL_TONDAU": 1472,
                "KL_TONDAU": 14707,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 190,
                "KL_XUAT": 1900,
                "SL_TONKHO": 1282,
                "KHOI_LUONG": 12807,
                "STT": 27
            },
            {
                "MA_SP": "1TNDHMM",
                "TEN_SP": " THỊT NẠC DĂM HEO MEATLIFE (MEADELI) VIỆT NAM (MÃ CÂN)",
                "SL_TONDAU": 97,
                "KL_TONDAU": 1983.86,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 97,
                "KHOI_LUONG": 1983.86,
                "STT": 28
            },
            {
                "MA_SP": "1TNDHMM",
                "TEN_SP": "THỊT NẠC DĂM HEO MEATLIFE (MEADELI) VIỆT NAM (MÃ CÂN) ",
                "SL_TONDAU": 13,
                "KL_TONDAU": 288.06,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 13,
                "KL_XUAT": 288.06,
                "SL_TONKHO": 0,
                "KHOI_LUONG": 0,
                "STT": 29
            },
            {
                "MA_SP": "1TNVHKXSB",
                "TEN_SP": "THỊT NẠC VAI HEO KHÔNG XƯƠNG SEARA BRASIL (MÃ CÂN) - FROZEN PORK SHOULDER BONELESS SKINLESS",
                "SL_TONDAU": 2063,
                "KL_TONDAU": 38987.85,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 5,
                "KL_XUAT": 93.65,
                "SL_TONKHO": 2058,
                "KHOI_LUONG": 38894.2,
                "STT": 30
            },
            {
                "MA_SP": "1VTHDCĐ",
                "TEN_SP": "VÀNH TAI HEO DANISH CROWN ĐỨC 15KG - FROZEN PORK EAR FLAPS",
                "SL_TONDAU": 217,
                "KL_TONDAU": 3251,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 217,
                "KHOI_LUONG": 3251,
                "STT": 31
            },
            {
                "MA_SP": "1VTHMB",
                "TEN_SP": "TAI HEO MIRKAR BA LAN 10KG - PORK EARS",
                "SL_TONDAU": 41,
                "KL_TONDAU": 408,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 41,
                "KHOI_LUONG": 408,
                "STT": 32
            },
            {
                "MA_SP": "1VTHMB10",
                "TEN_SP": "VÀNH TAI HEO MIRKAR BALAN 10KG - PORK EAR FLAPS",
                "SL_TONDAU": 1023,
                "KL_TONDAU": 10224,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 1023,
                "KHOI_LUONG": 10224,
                "STT": 33
            },
            {
                "MA_SP": "1VTHSD",
                "TEN_SP": "VÀNH TAI HEO SCHWEDE ĐỨC 10KG - PORK EAR FLAPS WITH RING FROZEN",
                "SL_TONDAU": 1734,
                "KL_TONDAU": 17333,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 23,
                "KL_XUAT": 230,
                "SL_TONKHO": 1711,
                "KHOI_LUONG": 17103,
                "STT": 34
            },
            {
                "MA_SP": "1VTHTD",
                "TEN_SP": "VÀNH TAI HEO TONNIES (917) ĐỨC 20KG - FROZEN PORK EARFLAPS",
                "SL_TONDAU": 1714,
                "KL_TONDAU": 34270,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 700,
                "KL_XUAT": 14000,
                "SL_TONKHO": 1014,
                "KHOI_LUONG": 20270,
                "STT": 35
            },
            {
                "MA_SP": "1XOHGB",
                "TEN_SP": "XƯƠNG ỐNG HEO GOODVALLEY BA LAN 10KG - FROZEN PORK FEMUR BONES",
                "SL_TONDAU": 1679,
                "KL_TONDAU": 16790,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 1679,
                "KHOI_LUONG": 16790,
                "STT": 36
            },
            {
                "MA_SP": "1XOHMB",
                "TEN_SP": "XƯƠNG ỐNG HEO SAU MIR KAR BA LAN 10KG - FROZEN PORK FEMUR BONES",
                "SL_TONDAU": 2755,
                "KL_TONDAU": 27542,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 2755,
                "KHOI_LUONG": 27542,
                "STT": 37
            },
            {
                "MA_SP": "3CGKGLAZBL",
                "TEN_SP": "CÁNH GÀ KHÚC GIỮA LOẠI A ZAKLADY DROB BOGS BA LAN 10KG - CHICKEN MID WINGS, QUICK FROZEN \"A\" GRADE",
                "SL_TONDAU": 377,
                "KL_TONDAU": 3770,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 34,
                "KL_XUAT": 340,
                "SL_TONKHO": 343,
                "KHOI_LUONG": 3430,
                "STT": 38
            },
            {
                "MA_SP": "3CGKGMGH",
                "TEN_SP": "CÁNH GÀ KHÚC GIỮA LOẠI A MASTER GOOD HUNGARY 10KG - FROZEN CHICKEN MID JOINT WINGS \"A\" GRADE",
                "SL_TONDAU": 4,
                "KL_TONDAU": 31,
                "SL_NHAP":  generateRandomDate(),
                "KL_NHAP": 20,
                "SL_XUAT": 4,
                "KL_XUAT": 31,
                "SL_TONKHO": 2,
                "KHOI_LUONG": 20,
                "STT": 39
            },
            {
                "MA_SP": "3DGMLHQ",
                "TEN_SP": "ĐÙI GÀ MÁI LỚN 1/4 ĐL SINGGREEN HÀN QUỐC 15 KG - CHICKEN LEG QUARTER",
                "SL_TONDAU": 486,
                "KL_TONDAU": 7290,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 10,
                "KL_XUAT": 150,
                "SL_TONKHO": 476,
                "KHOI_LUONG": 7140,
                "STT": 40
            },
            {
                "MA_SP": "5CBSCKHP",
                "TEN_SP": "CÁ BA SA CẮT KHOANH ( CẮT KHÚC) HÙNG PHÁT 10KG",
                "SL_TONDAU": 468,
                "KL_TONDAU": 4680,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 468,
                "KHOI_LUONG": 4680,
                "STT": 41
            },
            {
                "MA_SP": "5CBSFHP",
                "TEN_SP": "CÁ BASA FILLET HÙNG PHÁT 10KG",
                "SL_TONDAU": 45,
                "KL_TONDAU": 450,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 45,
                "KHOI_LUONG": 450,
                "STT": 42
            },
            {
                "MA_SP": "6MONCLS3-4A",
                "TEN_SP": "MỰC ỐNG NGUYÊN CON LÀM SẠCH 3-4 AMFCO 12KG",
                "SL_TONDAU": 261,
                "KL_TONDAU": 3132,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 13,
                "KL_XUAT": 156,
                "SL_TONKHO": 248,
                "KHOI_LUONG": 2976,
                "STT": 43
            },
            {
                "MA_SP": "9TSK31/40",
                "TEN_SP": "TÔM SÚ TƯƠI KIM NGÂN PHÁT SIZE 31/40 - 10KG",
                "SL_TONDAU": 12,
                "KL_TONDAU": 120,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 12,
                "KHOI_LUONG": 120,
                "STT": 44
            },
            {
                "MA_SP": "9TSNCPN25N500",
                "TEN_SP": "TÔM SÚ NGUYÊN CON PN SEAFOOD 25 NET 500 10KG - FRESH QUICK FROZEN SHRIMP",
                "SL_TONDAU": 18,
                "KL_TONDAU": 180,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 18,
                "KHOI_LUONG": 180,
                "STT": 45
            },
            {
                "MA_SP": "9TTHTTSS61/70",
                "TEN_SP": "TÔM THẺ HẤP TƯỜNG THỊNH SEAFOOD SIZE 61/70 10KG",
                "SL_TONDAU": 45,
                "KL_TONDAU": 450,
                "SL_NHAP": generateRandomDate(),
                "KL_NHAP": 0,
                "SL_XUAT": 0,
                "KL_XUAT": 0,
                "SL_TONKHO": 45,
                "KHOI_LUONG": 450,
                "STT": 46
            }
        ],
        "totalCount": 45
    }

    const onlickRow = (record, rowIndex) => { console.log(record, rowIndex)}

    return (
        <div className="App">
            <div id={"customTable"}>
                <TableComponent showIndex={true}
                                headers={headers}
                                dataUrl={dataUrl}
                                tableData={tableData.data}
                                onClickRow = {onlickRow}
                />
            </div>
        </div>
    );
}

export default App;
