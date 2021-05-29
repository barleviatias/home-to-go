import { Component } from 'react';
import { stayService } from '../../services/stay-service.js'

// export function MyPlaces() {

//     const { stays } = this.props
//     console.log(stays);
//     if (!stays) return <h3>Loading....</h3>
//     return (
//         <main>

//             <h1>My Stays</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <td>Id</td>
//                         <td>Name</td>
//                         <td>Precie per night</td>
//                         <td>Address</td>
//                         <td>Action</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {stays.map(stay => {
//                         return (
//                             <tr key={stay._id}>
//                                 <td>{stay._id}</td>
//                                 <td>{stay.name}</td>
//                                 <td>{stay.price}</td>
//                                 <td>{stay.loc.address}</td>
//                                 <td>
//                                     <button >Edit</button>
//                                     <button onClick={() => this.onRrmoveStays(stay._id)}>Remove</button>
//                                 </td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </table>
//         </main>
//     )
// }
































export function MyPlaces({ stays, removeStay }) {


    async function onRrmoveStays(stayId) {
        console.log(stayId);
        await removeStay(stayId)
    }

    if (!stays) return <h3>Loading....</h3>
    return (
        <main>

            <h1>My Stays</h1>
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Precie per night</td>
                        <td>Address</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {stays.map(stay => {
                        return (
                            <tr key={stay._id}>
                                <td>{stay._id}</td>
                                <td>{stay.name}</td>
                                <td>{stay.price}</td>
                                <td>{stay.loc.address}</td>
                                <td>
                                    <button >Edit</button>
                                    <button onClick={() => onRrmoveStays(stay._id)}>Remove</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </main>
    )
}
// }