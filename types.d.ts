interface ConfigDefinition {
    host: string
    port: number
    https: {
        enabled: boolean
        key?: string
        cert?: string
    }
    db: {
        host: string
        port: number
        database: string
    }
    debug: {
        stackSize: number
    }
    shutdown: {
        appKill: number
        serverClose: number
    }
    auth: {
        jwtSecret: string
    }
}

declare module 'config' {
    const config: ConfigDefinition; // eslint-disable-line vars-on-top
    export default config;
}
