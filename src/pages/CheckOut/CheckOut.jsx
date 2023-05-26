import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";


const CheckOut = () => {
    const service = useLoaderData();
    const { title, _id } = service;
    const {user}=useContext(AuthContext);
    const handleCheckOut=(event)=>{
        event.preventDefault();

        const form=event.target;
        const name=form.name.value;
        const email=user?.email;
        const date=form.date.value;
        const time=form.time.value;
        const order={
            customerName:name,
            email,
            date,
            service:_id,
            time,
        }
        console.log(order);
    }
    return (
        <div>
            <h2 className="text-center text-3xl font-bold">Check out: {title}</h2>

            <form onSubmit={handleCheckOut}  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" defaultValue={user?.displayName} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input type="date" name="date" className="input input-bordered" />

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" name="email" defaultValue={user?.email} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Time</span>
                    </label>
                    <input type="time" name="time" className="input input-bordered" />


                </div>
                </div>
                <div className="form-control mt-6">

                    <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
                </div>
            </form>
            <div className="card-body">

            </div>
        </div>

    );
};

export default CheckOut;