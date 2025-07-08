import { Button, Col, Row } from 'antd';
import { HeartOutlined, PictureOutlined } from '@ant-design/icons';

export const Controles = () => {
  return (
    <Row gutter={10} justify="end" style={{marginTop: 20}}>
      {/* <Col><Button className='BP' size='large' icon={<HeartOutlined />}></Button></Col> */}
      {/* <Col><Button className='BP' size='large' >Ofertar</Button></Col> */}
      {/* <Col><Button className='BP' size='large' >Comprar ahora</Button></Col> */}
      <Col><Button className='BP' size='large'  icon={<PictureOutlined />}></Button></Col>
    </Row>
  )
}
