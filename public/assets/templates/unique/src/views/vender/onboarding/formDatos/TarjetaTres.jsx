import { Col, Row } from "antd"

export const TarjetaTres = () => {
  return (
    <Row justify={'center'} style={{marginTop:10, padding:10}}>
      <Col span={20} className="formMensaje">
        <p>
          Hemos recibido sus datos satisfactoriamente. 
          La información será revisada y en cuanto se encuentre lista le informaremos.
        </p>
      </Col>
    </Row>
  )
}
