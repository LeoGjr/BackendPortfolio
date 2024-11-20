
import LoginLayout from "@/components/LoginLayout";
import Project from "@/components/Project";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function Addproject() {

    return <>
        <LoginLayout>


            <div className="addblogspage">
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>Add <span>Project</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <MdOutlineAddPhotoAlternate /> <span>/</span><span>Addproject</span>
                    </div>
                </div>
                <div className="blogsadd">
                    <Project />
                </div>
            </div>
        </LoginLayout>
    </>
}