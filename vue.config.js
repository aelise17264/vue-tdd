module.exports = {
    devServer: {
        port: 9876,
        proxy: {
            "/api": {
                targert: "http://localhost:8080"
            }
        }
    }
}