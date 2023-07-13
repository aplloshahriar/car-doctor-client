import { useEffect, useRef, useState } from 'react';
import ServiceCard from './ServiceCard';


const Services = () => {
    const [services, setServices] = useState([]);
    const [Asc, setAsc] = useState(true);

    const inputRef = useRef(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/services?search=${search}&sort=${Asc ? 'asc' : 'desc'}`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [Asc, search])

    const handleSearch = event => {
        console.log(inputRef.current.value);
        setSearch(inputRef.current.value);
    }

    return (
        <div className='mt-8'>
            <div className='text-center'>
                <h3 className='text-orange-500 text-2xl font-bold'>Services</h3>
                <h2 className='text-5xl mb-5'>Our Service Area</h2>
                <p > <small>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </small></p>


                <div className='flex justify-center mt-4 '>
                    <div className="form-control ">
                        <div className="input-group ">
                            <input type="text" ref={inputRef} placeholder="Find  Services" className="input input-bordered input-group-xs" />
                            <button onClick={handleSearch} className="btn btn-square">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </div>



                    <button className=' ml-2 btn btn-outline btn-info '
                        onClick={() => setAsc(!Asc)}
                    >{Asc ? "Price: High to Low" : 'Price: Low To High'}</button>
                </div>


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