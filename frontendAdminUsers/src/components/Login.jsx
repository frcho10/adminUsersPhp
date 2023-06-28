import { Button, Form, Input , Card} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log('Success:', values);
        navigate("/listadoUsers")
        
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <>
        <Card title="Login">

            <Form
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Usuario"
                    name="username"
                    rules={[{ required: true, message: 'Por favor coloca tu usuario!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder='Usuario'/>
                </Form.Item>

                <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[{ required: true, message: 'Porfavor coloca tu contraseña!' }]}
                    >
                    <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />} placeholder='Contraseña'/>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit" className="login-form-button buttonLogin">
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </Card>
        </>
    )
}

export default Login