import { Table, Card, Spin , Button, Tooltip, Modal, Form, Input, Select} from "antd"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, addUser, editUser, deleteUser } from "../redux/getListadoUsers";
import { useNavigate } from "react-router-dom";

function ListadoUsers(){

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [form] = Form.useForm();

    const datasource = useSelector(state => state.users.usersList)

    const isLoading = useSelector(state => state.users.isLoading)

    const [openModal, setOpenModal] = useState(false)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const [isEdit, setIsEdit] = useState(false)

    const [idEdit, setIdEdit] = useState(null)

    const [idDelete, setIdDelete] = useState(null)

    useEffect(() => {
        console.log("carga componente")
        
        dispatch(getUsers())
    },[])
    
    // let datasource = [
    //     {
        
    //         id: 4,
    //         nombre: "Elwyn Armstrong MD",
    //         apellidos: "Schmeler",
    //         correo: "lonzo95@example.com",
    //         contrasena: "123456",
    //         rol: 1,
    //         created_at: "2023-06-27T19:27:11.000000Z",
    //         updated_at: "2023-06-27T19:27:11.000000Z"
            
    //     }
    // ]

    const generarColumnas = () => {
        const columns = [
            {
                title: 'ID:'  ,
                key: 'id',
                width:'300px',
                render: element => <>{element.id}</>,
                
            },
          {
            title: 'Nombre:'  ,
            key: 'name',
            width:'300px',
            render: element => <>{element.nombre}</>,
            
          },
          {
            title: 'Apellidos:'  ,
            key: 'lastName',
            width:'300px',
            render: element => <>{element.apellidos}</>,
          },
          {
            title: 'Correo:'  ,
            key: 'email',
            width:'150px',
            render: element => <>{element.correo}</>,
          },
          {
            title: 'Rol:'  ,
            key: 'role',
            width:'100px',
            render: element => <>{element.rol === 0 ? 'Visor': 'Administrador'}</>,
            
          },
          {
            title: 'Fecha creación:'  ,
            key: 'dateCreation',
            width:'400px',
            render: element => <>{element.created_at}</>,
            
          },
          {
            title: "Acciones",
            key: 'action',
            width:'100px',
            render: (element) => (
              <div style={{display:'grid', justifyContent:'center'}}>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', }}>

                <div>
                    <Tooltip title="Editar registro">
                        <Button onClick={ () => {activaModalEdit(element)}} type="primary" icon={<EditOutlined />} size="middle" />
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="Eliminar registro">
                        <Button type="dashed" onClick={() => { setOpenDeleteModal(true); setIdDelete(element.id)}} icon={<DeleteOutlined />} size="middle" />
                    </Tooltip>
                </div>
                </div>
              </div>
            ),
          },
        ];
        return columns
    }

    const addUserFunc = (values) => {
        console.log("Valores: ", values)
        if(isEdit){
            let data = {
                id: idEdit,
                nombre: values.name,
                apellidos: values.lastName,
                correo: values.email,
                contrasena: values.password,
                rol: values.role==='Administrador' ? 1 : 0 ,
            }
            setOpenModal(false)
            dispatch(editUser(data))
            setIsEdit(false)
            form.resetFields();
        }else{

            let data = {
                nombre: values.name,
                apellidos: values.lastName,
                correo: values.email,
                contrasena: values.password,
                rol: values.role,
            }
            setOpenModal(false)
            dispatch(addUser(data))
            form.resetFields();
        }
        

    }

    const activaModalEdit = (element) => {
        setIsEdit(true)
        console.log("valores:", element)
        setIdEdit(element.id)
        form.setFieldsValue({
            name:element.nombre,
            lastName:element.apellidos,
            email: element.correo,
            password:element.contrasena,
            role: element.rol ===1? 'Administrador': 'Visor',
        })
        setOpenModal(true)
    }

    return (
        <>
        <Button type="primary" danger onClick={() => { navigate("/")}}> Cerrar sesión</Button>
        <br />
        <br />
            <Card title="Listado Usuarios">
                {
                    isLoading ? (
                        <div id="spinDiv">
                            <Spin tip="Loading" size="large">

                            </Spin>
                        </div>
                    ):(<>
                        <Button type="primary" onClick={() => {setOpenModal(true)}}>Agregar Usuario +</Button>
                        <Table columns={generarColumnas()} dataSource={datasource} pagination={true}
                                            rowClassName={(record, index) => index % 2 === 0 ? 'row-gray' : 'row-white'}
                                            />
                        </>
                    )
                }
                <Modal title={isEdit ? "Modificar usuario":"Agregar un nuevo usuario"} open={openModal} closable={true} footer={null} onCancel={() => {setOpenModal(false)}}>
                        <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={addUserFunc}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Nombre"
                            name="name"
                            rules={[{ required: true, message: 'Por favor coloca tu nombre!' }]}
                        >
                            <Input placeholder='Nombre'/>
                        </Form.Item>

                        <Form.Item
                            label="Apellidos"
                            name="lastName"
                            rules={[{ required: true, message: 'Porfavor coloca tus apellidos!' }]}
                            >
                            <Input   placeholder='Apellidos'/>
                        </Form.Item>

                        <Form.Item
                            label="Contraseña"
                            name="password"
                            rules={[{ required: true, message: 'Porfavor coloca tu contraseña!' }]}
                            >
                            <Input.Password   placeholder='Contraseña'/>
                        </Form.Item>

                        <Form.Item
                            label="Correo"
                            name="email"
                            rules={[{ required: true,  message: 'Porfavor coloca tu correo!' }, { type: "email", message: "Coloca un correo válido"}]}
                            >
                            <Input   placeholder='Coreo'/>
                        </Form.Item>

                        <Form.Item
                            label="Rol"
                            name="role"
                            rules={[{ required: true, message: 'Porfavor coloca tu contraseña!' }]}
                            >
                            <Select>
                                <Select.Option value="0">Visor</Select.Option>
                                <Select.Option value="1">Administrador</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit" className="login-form-button buttonLogin">
                                {
                                    isEdit ? <>Modificar</>: <>Registrar</>
                                }
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal title="Eliminar" open={openDeleteModal} okText='Eliminar' cancelText="Cancelar"  closable={false} onCancel={() => {setOpenDeleteModal(false)}} onOk={() => {dispatch(deleteUser(idDelete)); setOpenDeleteModal(false) }}>
                    ¿Estas seguro de eliminar este registro?
                </Modal>
            </Card>
        </>
    )
}

export default ListadoUsers