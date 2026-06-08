import "dotenv/config"

export const getEnv = (key: string, defaultValue: string = "") => {
    const value = process.env[key] || defaultValue

    if (value === "") {
        throw new Error(`Missing required environment variable: ${key}`)
    }

    return value
}