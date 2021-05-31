import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message } from 'antd'

interface IClipBoardProps {
  text: string;
}

const CopyClipBoard: React.FC<IClipBoardProps> = ({ text, children }) => {
  return (
    <CopyToClipboard text={text} onCopy={() => {
      message.destroy();
      message.success("Link Copied!")
    }}>
      {children}
    </CopyToClipboard>
  )
}
export default CopyClipBoard