import { Col, Row } from "antd"
import { InputText } from "../../../../components/input/InputText";

export const TarjetaCuatro = ({form, onChangeInput, formValidation, mensajeError}) => {

    const colSize = { xs:12, sm:8, md:8, lg:8 };

  return (
    <>
      <p >Información del auto</p>
      <Row gutter={[10,10]} justify={'start'} style={{marginTop:10, padding:10}}>
        <Col xs={colSize.xs} sm={colSize.sm} md={colSize.md} lg={colSize.lg}>
          <InputText 
            label='Marca'
          />
        </Col>
        <Col xs={colSize.xs} sm={colSize.sm} md={colSize.md} lg={colSize.lg}>
          <InputText 
            label='Submarca'
          />
        </Col>
        <Col xs={colSize.xs} sm={colSize.sm} md={colSize.md} lg={colSize.lg}>
          <InputText 
            label='Modelo'
          />
        </Col>
        <Col xs={colSize.xs} sm={colSize.sm} md={colSize.md} lg={colSize.lg}>
          <InputText 
            label='Combustible'
          />
        </Col>
        <Col xs={colSize.xs} sm={colSize.sm} md={colSize.md} lg={colSize.lg}>
          <InputText 
            label='Potencia'
          />
        </Col>
        <Col xs={colSize.xs} sm={colSize.sm} md={colSize.md} lg={colSize.lg}>
          <InputText 
            label='Transmisión'
          />
        </Col>
        <Col xs={colSize.xs} sm={colSize.sm} md={colSize.md} lg={colSize.lg}>
          <InputText 
            label='Km'
          />
        </Col>
        <Col xs={colSize.xs} sm={colSize.sm} md={colSize.md} lg={colSize.lg}>
          <InputText 
            label='Color'
          />
        </Col>
        
      </Row>
    </>
  )
}
