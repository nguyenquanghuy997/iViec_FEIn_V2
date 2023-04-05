import {useState} from "react";
import {Typography} from 'antd';
import styled from '@emotion/styled'

const {Paragraph} = Typography;

const TextStyle = styled(Paragraph)`
  text-align: justify;
  font-size: 14px;
  font-weight: 400;
  color: #172B4D;
  font-family: 'Inter';
  a.ant-typography-expand {
    color: #172B4D;
    font-weight: 700;
    &:hover {
      color: #172B4D;
    }
  }
`

const ReadMoreText = ({text, rows = 3, ...props}) => {

  const [ellipsis, setEllipsis] = useState(true);
  const [counter, setCounter] = useState(0);

  const handleExpand = () => {
    setEllipsis(false);
    setCounter(counter => ellipsis ? counter + 1 : counter);
  };

  const handleClose = () => {
    setEllipsis(true);
    setCounter(counter => ellipsis ? counter + 1 : counter);
  };

  return (
      <div key={counter}>
        <TextStyle ellipsis={ellipsis ? {rows: rows, expandable: true, symbol: 'Xem thêm', onExpand: handleExpand} : false} {...props}>
          {text}
          {!ellipsis && <a className="ant-typography-expand" aria-label="Expand" onClick={handleClose}>Ẩn bớt</a>}
        </TextStyle>
      </div>
  )
}

export default ReadMoreText;