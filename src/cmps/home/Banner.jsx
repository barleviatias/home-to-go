
export function Banner({ name, btnTxt, title, subtitle }) {

    return (
        <section className={"banner " + name}>
            <div>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <button>{btnTxt}</button>
            </div>
        </section>
    )
}