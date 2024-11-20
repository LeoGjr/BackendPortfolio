
import LoginLayout from "@/components/LoginLayout";
import Photo from "@/components/photo";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function addphoto() {



    return <>
        <LoginLayout>

            <div className="addblogspage">
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>Add <span>Photo</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <MdOutlineAddPhotoAlternate /> <span>/</span><span>Addphoto</span>
                    </div>
                </div>
                <div className="blogsadd">
                    <Photo />
                </div>
            </div>
        </LoginLayout>
    </>


}