import React, { useState, useEffect } from 'react';
import './index.css';
import { SmileTwoTone } from '@ant-design/icons';
import api from '../../api'

const HomePage: React.FC = () => {
    const [user, setUser] = useState({
        name: '',
        avatar: ''
    });

    useEffect(() => {
        api.getUserInfo({}).then(res => {
            const data: any = res;
            if (data.code === 1) {
                setUser(data.data);
            }
        })
    }, []);

    return (
        <div className="home-page">
            <div className="logo"><SmileTwoTone /> KiwiDropshipping</div>
            <div className="welcome">{user.name}</div>
            <img className="avatar" src={user.avatar} alt="" />
        </div>
    );
}

export default HomePage;