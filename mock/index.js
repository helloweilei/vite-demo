const mockjs = require('mockjs');

module.exports = [{
    method: 'get',
    url: '/api/users',
    response() {
        return mockjs.mock({
            code: 10000,
            message: 'OK',
            "data|100": [{
                name: '@name',
                age: '@integer(0, 100)',
                birth: "@date",
                married: '@boolean'
            }]
        })
    }
}]