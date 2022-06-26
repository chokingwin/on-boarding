import React from 'react';
import './index.css';
import { Button, Result } from 'antd';

const FinishPage: React.FC = () => {

    return (
        <div className="finish-page">
            <Result
                status="success"
                title="Thank you for your time!"
                subTitle="Our operations team will get back to you within 5 business days regarding your application."
                extra={[
                    <Button type="primary" key="START BROWSING KIWIDROP">START BROWSING KIWIDROP</Button>
                ]}
            />
        </div>
    );
}

export default FinishPage;