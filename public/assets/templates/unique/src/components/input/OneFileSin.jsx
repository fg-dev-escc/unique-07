import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const OneFileSin = ({ body, setBody }) => {
  //
  const props = {
    beforeUpload: (file) => {
      setBody({ ...body, file });
      return false;
    },
    maxCount: 1,
    showUploadList: false,
  };

  //
  return (
    <>
      <div className="label">Buscar Archivo</div>
      <div>
        <Upload {...props} style={{ width: "100%" }}>
          <Button style={{ textAlign: "left" }} icon={<UploadOutlined />}>
            Seleccione documento
          </Button>
        </Upload>
      </div>

      <small style={{ color: "orange", marginLeft: 10 }}>
        {body.file && body.file.name}
      </small>
    </>
  );
};
