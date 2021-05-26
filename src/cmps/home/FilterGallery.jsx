import { Link } from "react-router-dom";


export function FilterGallery() {

    return (
        <section className="filter-gallery">
            <Link>
                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-49556649/original/03b60b78-e20d-43fc-85d4-910d08d21b64.jpeg?im_w=1200" />
                <h5>Lorem ipsum dolor sit amet.</h5>
            </Link>
            <Link>
                <img src="https://a0.muscache.com/im/pictures/88318135-5f04-4e68-bca3-1b81d0d6e013.jpg?im_w=720" />
                <h5>Lorem ipsum dolor sit amet.</h5>
            </Link>
            <Link>
                <img src="https://a0.muscache.com/im/pictures/22a4042d-663a-46df-ba5d-2384b4e3271f.jpg?im_w=720" />
                <h5>Lorem ipsum dolor sit amet.</h5>
            </Link>
            <Link>
                <img src="https://a0.muscache.com/im/pictures/d08e26ea-29fd-48d3-8d19-f92be8e83612.jpg?im_w=720" />
                <h5>Lorem ipsum dolor sit amet.</h5>
            </Link>
        </section>
    )
}