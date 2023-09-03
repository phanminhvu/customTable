import { SearchOutlined } from "@ant-design/icons";
import { Button, Checkbox, Space } from "antd";
import Input from "antd/es/input/Input";
import { useCallback, useState } from "react";
const CheckboxGroup = Checkbox.Group;
const FilterTable = (props) => {
  // eslint-disable-next-line react/prop-types
  const { handleSearch, handleReset, options = [], setSelectedKeys } = props;
  const [inputValue, setInputValue] = useState("");
  const [optionsDefault] = useState(options);
  const [option, setOption] = useState(options);
  const [selectAll, setSelectAll] = useState(true);
  const [selectedValues, setSelectedValues] = useState(options);

  let timeoutId;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      let newOptions = optionsDefault.filter((i) => {
        if (Number.isNaN(value)) {
          return i.toLowerCase().includes(value.toLowerCase());
        }
        return i.toString().includes(value.toString());
      });
      if (!value) {
        newOptions = optionsDefault;
      }
      setOption(newOptions);
      setSelectedKeys(newOptions);
    }, 300); // 1000 milliseconds = 1 giây
  };

  const onReset = useCallback(() => {
    setInputValue("");
    setOption(optionsDefault);
    setSelectedValues(optionsDefault);
    setSelectedKeys([]);
    setSelectAll(true);
    handleReset();
  }, [handleReset, optionsDefault, setSelectedKeys]);

  const handleSelectAllChange = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedValues(option);
      setSelectedKeys(option);
    } else {
      setSelectedValues([]);
      setSelectedKeys([]);
    }
  };

  // Xử lý khi checkbox riêng lẻ thay đổi trạng thái
  const handleCheckboxChange = (checkedValues) => {
    setSelectedValues(checkedValues);
    setSelectedKeys(checkedValues);
    setSelectAll(checkedValues.length === option.length);
  };

  return (
      <div>
        <Input value={inputValue} onChange={handleInputChange}></Input>
        <div style={{ marginLeft: 16 }}>
          <Checkbox
              onChange={handleSelectAllChange}
              checked={selectAll}
              style={{ marginTop: 16 }}
          >
            Select All
          </Checkbox>
          <div style={{ maxHeight: 300, overflow: "scroll" }}>
            <CheckboxGroup
                style={{
                  display: "flex",
                  marginLeft: 8,
                  flexDirection: "column",
                }}
                options={option}
                value={selectedValues}
                onChange={handleCheckboxChange}
            />
          </div>
        </div>
        <Space style={{ marginTop: 16 }}>
          <Button
              type="primary"
              onClick={handleSearch}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={onReset} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
  );
};

export default FilterTable;
