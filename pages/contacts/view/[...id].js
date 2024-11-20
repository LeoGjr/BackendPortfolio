import Head from "next/head"
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { router } from "next/router";
import LoginLayout from "@/components/LoginLayout";

export default function Contactview() {


    // const router = useRouter();
    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/contacts?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }
    }, [id]);


    const createdAtDate = productInfo?.createdAt ? new Date(productInfo.createdAt) : null;

    // Function to format the date as "20 May 2024 14:11 pm"
    const formatDate = (date) => {
        // Check if date is valid
        if (!date || isNaN(date)) {
            return ''; // or handle the error as needed
        }

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // Use 12-hour format
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    // Usage example:
    const formattedDate = formatDate(createdAtDate);
    console.log(formattedDate); // Outputs something like "20 May 2024 14:11 pm" if createdAtDate is valid



    return <>
        <LoginLayout>



            <Head>
                <title>Contact View</title>
            </Head>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Contact: <span>{productInfo?.email}</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard /> <span>/</span><span>Contact</span>
                    </div>
                </div>
                <div className="contactinfo">
                    <h2>Name: <span>{productInfo?.name}</span></h2>
                    <h2>Last name: <span>{productInfo?.lname}</span></h2>
                    <h2>Email: <span>{productInfo?.email}</span></h2>
                    <h2>Company: <span>{productInfo?.company}</span></h2>
                    <h2>Phone: <span>{productInfo?.phone}</span></h2>
                    <h2>Country: <span>{productInfo?.country}</span></h2>
                    <h2>Projects: <span>{productInfo?.project.join(', ')}</span></h2>
                    <h2>Budget: <span>{productInfo?.price}</span></h2>
                    <h2>Description: <span>{productInfo?.description}</span></h2>
                    <h2>Contact time: <span>{formatDate(createdAtDate)}</span></h2>
                </div>

            </div>
        </LoginLayout>

    </>


}