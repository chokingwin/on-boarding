import React, { useState } from 'react';
import './index.css';
import { Button, Form, Checkbox, Input, Select, Upload, UploadProps, Row, Col } from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import api from '../../api'
import { useAppDispatch } from '../../hooks/useRedux';
import {
    submitSuccess,
} from '../../store/userSlice';

const FormPage: React.FC = () => {
    const [step, setStep] = useState(1);
    const [step1, setStep1] = useState('step step1');
    const [step2, setStep2] = useState('step step2');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);

        api.sbumit(values).then(res => {
            const data: any = res;
            if (data.code === 1) {
                dispatch(submitSuccess());

                navigate("/finish", { replace: true });
            }
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const unitsArr = [
        'I want to do Dropshipping',
        '1 - 2 units（i keep small inventories）',
        '3 - 20 units',
        '21 - 100 units',
        '100 - 1,000 units',
        'Over 1,000 units'
    ];

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        // action: api.upload,
        fileList: []
    };

    const pre = () => {
        changeStep();
    }

    const next = () => {
        form.validateFields(['units']).then(res => {
            changeStep();
        }).catch(res => {
        });
    }

    const changeStep = () => {
        if (step === 1) {
            // 向左
            setStep(2);
            setStep1('step step1 leftSlide');
            setStep2('step step2 leftSlide');

            setTimeout(() => {
                setStep1('step step1Done');
                setStep2('step step2Done');
            }, 400);
        } else {
            // 向右
            setStep(1);
            setStep1('step step1Done rightSlide');
            setStep2('step step2Done rightSlide');

            setTimeout(() => {
                setStep1('step step1');
                setStep2('step step2');
            }, 400);
        }
    }

    return (
        <div className="form-page">
            <div className="form-wrap">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <div className="step-wrap">
                        <div className={step1}>
                            <div className="guide">
                                <div className="which-step">STEP 1 of 2</div>
                                <h1>What's your usual order volume per item?</h1>
                                <p>Let us know how much you usually need.We provide shipping options with different prices and speeds based on the amount.</p>
                            </div>
                            <Form.Item
                                name="units"
                                rules={[{ required: true, message: 'At least select one units' }]}
                            >
                                <Checkbox.Group options={unitsArr} />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    block
                                    onClick={next}
                                >NEXT</Button>
                            </Form.Item>
                        </div>
                        <div className={step2}>
                            <div className="guide">
                                <div className="which-step">STEP 2 of 2</div>
                                <h1>Tell us about your store</h1>
                                <p>Our technology will recommend the products based on your existing merchandise and followers.</p>
                            </div>
                            <Form.Item
                                label="Store name or handle"
                                name="name"
                                rules={[{ required: true, message: 'Please input your Store name or handle!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Website URL"
                                name="url"
                                rules={[{ required: true, message: 'Please input your Website URL!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Estimated Annual Revenue"
                                name="revenue"
                                rules={[{ required: true, message: 'Please input your Estimated Annual Revenue!' }]}
                            >
                                <Select>
                                    <Select.Option value="0 - 10 thousand">0 - 10 thousand</Select.Option>
                                    <Select.Option value="100 thousand">100 thousand</Select.Option>
                                    <Select.Option value="1 million">1 million</Select.Option>
                                </Select>
                            </Form.Item>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label="Business certificate#（EIN#，sellerpermit，etc）"
                                        name="businessCertificate"
                                        rules={[{ required: true, message: 'Please input your Business certificate!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={10} offset={4}>
                                    <Form.Item
                                        name="businessCertificateFile"
                                        rules={[{ required: true, message: 'Please input your Business Certificate File!' }]}
                                    >
                                        <Upload {...uploadProps}>
                                            <div>Upload Business Certificate（Jpeg，PDF）</div>
                                            <Button icon={<UploadOutlined />}>Choose files</Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Row>
                                    <Col span={6}>
                                        <Button
                                            type="primary"
                                            icon={<ArrowLeftOutlined />}
                                            block
                                            onClick={pre}
                                        ></Button>
                                    </Col>
                                    <Col span={16} offset={2}>
                                        <Button type="primary" htmlType="submit" block>SUBMIT</Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default FormPage;