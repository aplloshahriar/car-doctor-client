import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import BookingRow from "./BookingRow";
import { useNavigate } from "react-router-dom";
// import { json } from "react-router-dom";


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const url = `http://localhost:5000/bookings?email=${user?.email}`
    const [bookings, setBookings] = useState([]);
   
    useEffect(() => {
        fetch(url, {
            method:"GET",
                headers:{
                    authorization:`Bearer ${localStorage.getItem('car-access-token')}`
                },
                // body:JSON.stringify({status:"confirm"})
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){
                    setBookings(data)
                }
                else{
                    navigate('/');
                }
            })
    }, [url,navigate])

    const handleDelete= id=>{
        const proceed=confirm('Are you sure you want to delete');
        if (proceed){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method:"DELETE"
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.deletedCount>0){
                    alert("Deleted Successful")
                    const remaining=bookings.filter(booking=>booking._id!==id);
                    setBookings(remaining);
                }
            })
    }
    }
    

    const handleBookingConfirm= id=>{
        const proceed=confirm('Are you sure you want to confirm');
        if (proceed){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method:"PATCH",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({status:"confirm"})
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.modifiedCount>0){
                    // update state
                    
                    const remaining=bookings.filter(booking=>booking._id!==id);
                    const updated=bookings.find(booking=>booking._id===id);
                    updated.status="confirm";
                    const newBookings=[updated,...remaining];
                    setBookings(newBookings);

                    // setBookings(remaining);
                }
            })
    }
    }

    return (
        <div>
            <h2 className="text-5xl mb-10">Your Bookings:{bookings.length}</h2>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                       {
                        bookings.map(booking=><BookingRow
                            key={booking._id}
                            booking={booking}
                            handleDelete={handleDelete}
                            handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>)
                       }
                         
                       
                    </tbody>
                 
                    

                </table>
            </div>
        </div>
        
    );
};

export default Bookings;