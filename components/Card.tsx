import mergeClass from "utils/mergeClass"

interface IProps {
    children: any
    className: string
    img: JSX.Element,
    nav: JSX.Element|string|never
}

export default function Card({ children, className = '', img, nav }: Partial<IProps>): JSX.Element {
    return (
        <div className={mergeClass(["display-inline-block", className])}>
            {img && (
                <aside className="rounded-1">
                    {img}
                </aside>
            )}
            {nav && (
                <nav>
                    {nav}
                </nav>
            )}
            {children && (
                <main className="p-1">
                    {children}
                </main>
            )}
        </div>
    )
}