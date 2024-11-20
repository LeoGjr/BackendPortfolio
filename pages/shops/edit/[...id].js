
import Head from "next/head"
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { router } from "next/router";
import Shop from "@/components/Shop";
import LoginLayout from "@/components/LoginLayout";

export default function Editshops() {


    // const router = useRouter();
    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/shops?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }
    }, [id])



    return <>
        <LoginLayout>


            <Head>
                <title>Update Product</title>
            </Head>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Edit <span>{productInfo?.title}</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard /> <span>/</span><span>Edit Product</span>
                    </div>
                </div>
                <div className="mt-3">
                    {
                        productInfo && (
                            <Shop {...productInfo} />
                        )
                    }
                </div>
            </div>
        </LoginLayout>
    </>
}