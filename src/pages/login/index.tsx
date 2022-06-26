import React from 'react';
import './index.css';
import { message, Button, Form, Input } from 'antd';

import api from '../../api'
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../hooks/useRedux';
import {
    loginSuccess,
} from '../../store/userSlice';

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Success:', values);

        api.login(values).then(res => {
            const data: any = res;
            if (data.code === 1) {
                dispatch(loginSuccess());

                navigate("/form", { replace: true });
            } else {
                message.error('账号或密码错误');
            }
        })

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-page">
            <div className="login-wrap">
                <div className="title">Welcome back!</div>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            LOG IN
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default LoginPage;
