import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  const Checkout = () => {
    const [search, setSearch] = useState([]); 
    const [address, setAddress] = useState('');
    const [chose, setChose] = useState(true);
    const token=localStorage.getItem("access")
    const handleSearch = (e) => {
        const query = e.target.value;
        if (query.length > 4) {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setSearch(data);
                })
                .catch((error) => {
                    console.error('Error fetching address:', error);
                });
        }
    };

    const handleAddress = (value) => {
        setAddress(value);
        setChose(false);
    };
    const hadlereseach=()=>{
        setAddress('')
        setChose(true)
    }
    const handlepayment = () => {
        axios.post("http://127.0.0.1:8000/api/payment/", {},
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        )
        .then(res => {
            console.log("hello")
            console.log("Payment initiated: ", res.data);
            window.location.href = res.data.approval_url;
        })
        .catch(error => {
            console.error("Error in payment initiation: ", error.response ? error.response.data : error.message);
        });
    }
    

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <h1 className="flex justify-center text-2xl font-bold">Checkout</h1>
            {chose && (
                <div className="mt-2 text-lg p-5">
                    Enter Delivery address: 
                    <input
                        onChange={handleSearch}
                        className=" ml-1 p-2 rounded bg-slate-300 text-red-600"
                        type="text"
                        placeholder="Search for address..."
                    />
                </div>
            )}

            {chose && search.length > 0 && (
                <div>
                    {search.map((map, index) => (
                        <div key={index} className="p-2 cursor-pointer" onClick={() => handleAddress(map.display_name)}>
                            {map.display_name}
                        </div>
                    ))}
                </div>
            )}

            {address && (
                <div>
                    <span className="text-2xl font-bold">Delivery address: </span>
                    {address}
                </div>
            )}
            {address && <button onClick={hadlereseach}className=' mt-2 font-semibold text-lg flex justify-center bg-red-500 px-2 py-1 rounded'>change the address</button>}
            <AlertDialog>
                    <AlertDialogTrigger><Button className="ml-5 mt-5"variant="destructive">Proceed to payment</Button></AlertDialogTrigger>
                        <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle> Are you sure you want to initiate payment?
                        </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction><Button onClick={handlepayment} variant="red">                                    Yes, initiate payment
                        </Button></AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
            </AlertDialog>

        </div>
    );
};

export default Checkout;
