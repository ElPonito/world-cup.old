const config = {
    dev: {
        strava_login_url: "http://www.strava.com/oauth/authorize?client_id=18363&response_type=code&redirect_uri=http://127.0.0.1:3333/login&approval_prompt=auto&scope=view_private",
        api_url: "http://localhost:15000"
    },
    production: {}
}

export default config[window.environment]