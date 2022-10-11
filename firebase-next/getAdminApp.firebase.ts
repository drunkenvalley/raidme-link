import { AppOptions } from "firebase-admin"
import { App, getApp, getApps } from "firebase-admin/app"
import { initializeApp } from "firebase-admin/app"

export function getAdminApp(options: AppOptions, name: string = 'firebase-admin-app'): App {
    const appList = getApps()
    const app = !!appList.length && !!appList.find(a => a.name === name)
        ? getApp(name)
        : initializeApp(options, name)

    return app
}
