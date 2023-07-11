import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';


const Services = () => {
    const [services, setServices] = useState([]);
    const [Asc, setAsc] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/services ? sort=${Asc? 'asc' : 'desc'}`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [Asc])

    
    return (
        <div className='mt-4'>
            <div className='text-center'>
                <h3 className='text-orange-500 text-2xl font-bold'>Service</h3>
                <h2 className='text-5xl mb-5'>Our Service Area</h2>
                <p > <small>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </small></p>
                <button className='mt-5 btn btn-outline btn-info btn-sm'
                    onClick={()=>setAsc(!Asc)}
                >{Asc ? "Price: High to Low" : 'Price: Low To High'}</button>


            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;