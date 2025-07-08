import { Spin } from "antd";

export const Loading = () => {
  return (
    <div style={{  paddingTop: 50, marginLeft: 50}}>
      <Spin size="large" />
    </div>
  )
}
