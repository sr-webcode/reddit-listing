import { Spin } from 'antd'

const PageSpinner: React.FC = () => {
  return (<div
    style={{ height: "100vh" }}
    className="p-5 w-100 d-flex justify-content-center align-items-center">
    <Spin size="large" />
  </div>)
}
export default PageSpinner