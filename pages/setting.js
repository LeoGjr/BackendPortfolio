import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Setting() {

    const { data: session, status } = useSession();

    if (status === "loading") {
        // Loading state, loader or any other indicator
        return <div className='full-h flex flex-center'>
            <div className="loading-bar">Loading</div>
        </div>;
    }
    const router = useRouter();
    if (!session) {
        router.push('/login')
        return null;
    }

    if (session) {
        return (
            <div className="settingpage">
                {/* title dashboard */}
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>Admin <span>Settings</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <IoSettingsOutline /> <span>/</span><span>Settings</span>
                    </div>
                </div>

                <div className="profilesettings">
                    <div className="leftprofile_details flex">
                        <img src="/img/coder.png" alt="coder" data-aos="fade-left" />
                        <div className="w-100" data-aos="fade-up">
                            <div className='flex flex-sb flex-left mt-2'>
                                <h2>My Profile:</h2>
                                <h3>Vbm Coder <br /> web developer</h3>
                            </div>
                            <div className="flex flex-sb mt-2">
                                <h3>Phone:</h3>
                                <input type="text" defaultValue="+91-0123456789" />
                            </div>
                            <div className="mt-2">
                                <input type="email" defaultValue="Youremailaddress@gmail.com" />
                            </div>
                            <div className="flex flex-center w-100 mt-2">
                                <button>Save</button>
                            </div>
                        </div>

                    </div>
                    <div className="rightlogoutsec" data-aos="fade-left">
                        <div className="topaccoutnbox">
                            <h2 className="flex flex-sb">My Account <MdOutlineAccountCircle /></h2>
                            <hr />
                            <div className="flex flex-sb mt-1">
                                <h3>Active Account <br /> <span>Email</span></h3>
                                <button onClick={() => signOut()}>Log Out</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}
