import { AppOptions } from "firebase-admin"
import { App, getApp, getApps } from "firebase-admin/app"
import { initializeApp } from "firebase/app"

export function getAdminApp(options: AppOptions, name: string): App {
    const appList = getApps()
    const appName = 'firebase-admin-adapter'
    const app = !!appList.length && !!appList.find(a => a.name === appName)
        ? getApp(appName)
        : initializeApp(options, appName)

    return app
}
