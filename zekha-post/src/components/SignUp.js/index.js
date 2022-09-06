import React, {useState} from 'react';
import { Layout, Col, Row, Button, Checkbox, Form, Input, Divider} from 'antd';
import { UserAuth } from '../../contexts/authcontext';
import {Link, useNavigate} from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;



const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {createUser} = UserAuth();

    const handleSubmit = async (e) => {
        //e.preventDefault();
        setError('');
        try {
            await createUser(email, password);
            navigate('/app/dashboard')
        } catch (e) {
            setError(e.message)
            
        }
    }
    

  return (
    <Layout>
      <Content style={{height:"100vh", paddingTop:"30vh"}}>
        <Row justify='center'>
            <Col>
                <div  style={{backgroundColor:"white", padding:30,borderRadius:50}}>
                    <div style={{textAlign:"center"}}>
                    <h1>Sign up</h1>
                    <br />
                    <p>Have an account? <Link to="/login">Log in.</Link></p>
                    </div>
                    
                    <Divider />
                    <Form
                       
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={handleSubmit}
        
                        autoComplete="off"
                        >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your email address!',
                            },
                            ]}
                        >
                            <Input onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ]}
                        >
                            <Input.Password onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                            offset: 8,
                            span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                </Form>
                </div>
                
            </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>© Pullfluence 2022</Footer>
    </Layout>
  )
}

export default SignUp;