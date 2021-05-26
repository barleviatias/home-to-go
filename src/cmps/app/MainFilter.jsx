import { Component } from "react";


export class MainFilter extends Component {

    state = {

    }

    render() {

        return (
            <section className="main-filter">
                <form>
                    <input name="adress" type="search" />
                    <input name="date-start" type="date" />
                    <input name="date-end" type="date" />
                    <select name="guests">
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                        <option value="1">5</option>
                    </select>
                </form>
            </section>
        )
    }
}