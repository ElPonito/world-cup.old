let credentials = { mapboxToken: 'fake' }
try {
    credentials = require('./credentials')
} catch (e) {
    console.warn('No credentials found, using fake credentials')
}

const config = {
    local: {
        strava_login_url: 'http://www.strava.com/oauth/authorize?client_id=18363&response_type=code&redirect_uri=http://127.0.0.1:3000/login&approval_prompt=auto&scope=view_private',
        api_url: 'http://localhost:15000'
    },
    development: {
        strava_login_url: 'http://www.strava.com/oauth/authorize?client_id=18363&response_type=code&redirect_uri=http://127.0.0.1:3000/login&approval_prompt=auto&scope=view_private',
        api_url: 'http://localhost:15000'
        //api_url: 'http://dev-api.worldcup.guericed.com'
    },
    production: {
        strava_login_url: 'http://www.strava.com/oauth/authorize?client_id=18363&response_type=code&redirect_uri=http://worldcup.guericed.com/login&approval_prompt=auto&scope=view_private',
        api_url: 'http://api.worldcup.guericed.com'
    }
}

export default { ...config[process.env.NODE_ENV], ...credentials }