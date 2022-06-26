export default function mock(url: string, data: any = {}, method: string = 'POST') {
    return new Promise((resolve, reject) => {
        switch (url) {
            case '/api/user/login':
                if (data.email === '1' && data.password === '1') {
                    resolve({
                        code: 1
                    });
                } else {
                    resolve({
                        code: 1000
                    });
                }
                break;
            case '/api/user/onboarding':
                if (method === 'POST') {
                    resolve({
                        code: 1
                    });
                } else {
                    resolve({
                        code: 1,
                        data: {
                            name: 'Hello Demo User',
                            avatar: 'https://avatars.githubusercontent.com/u/17031553?v=4'
                        },
                    });
                }

                break;
            case '/api/file-uplad':
                resolve({
                    code: 1,
                    url: 'xxx'
                });
                break;
        }
    })
}
