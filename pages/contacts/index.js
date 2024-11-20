
import { BsPostcard } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import Link from "next/link";
import Dataloading from "@/components/Dataloading";
import LoginLayout from "@/components/LoginLayout";

export default function contacts() {


    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const [searchQuery, setSearchQuery] = useState('');
    const { alldata, loading } = useFetchData(`/api/contacts`);

    // Function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const allblog = alldata.length; // Total number of blogs

    // Filter all data based on search query
    const filteredBlogs = searchQuery.trim() === '' ? alldata : alldata.filter(blog =>
        blog.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate index of the first blog displayed on the current page
    const indexOfFirstblog = (currentPage - 1) * perPage;
    const indexOfLastblog = currentPage * perPage;

    // Get the current page's blogs
    const currentBlogs = filteredBlogs.slice(indexOfFirstblog, indexOfLastblog);

    // const publishedblogs = currentBlogs.filter(ab => ab.status === "publish");

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }



    return <>
        <LoginLayout>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>All<span> Contacts</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <BsPostcard /> <span>/</span><span>Contacts</span>
                    </div>
                </div>
                <div className="blogstable">
                    <div className="flex gap-2 mb-1" data-aos="fade-left">
                        <h2>Search Contact By Name: </h2>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title..."
                        />
                    </div>

                    <table className="table table-styling">

                        <thead data-aos="fade-up">
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Email</th>
                                <th>Phone no</th>
                                <th>Project</th>
                                <th>Open Contact </th>
                            </tr>
                        </thead>
                        <tbody data-aos="fade-up">
                            {loading ? <>
                                <tr>
                                    <td>
                                        <Dataloading />
                                    </td>
                                </tr>
                            </> : <>
                                {currentBlogs.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">No Contacts Available</td>
                                    </tr>
                                ) : (
                                    currentBlogs.map((blog, index) => (
                                        <tr key={blog._id} >
                                            <td>{indexOfFirstblog + index + 1}</td>
                                            <td><h3>{blog.name}</h3></td>
                                            <td><h3>{blog.email}</h3></td>
                                            <td><h3>{blog.phone}</h3></td>
                                            <td><h3>{blog.project[0]}</h3></td>
                                            <td>
                                                <div className='flex gap-2 flex-center'>
                                                    <Link href={'/contacts/view/' + blog._id}><button title='edit'><FaEye />View</button></Link>
                                                    {/* <Link href={'/projects/delete/' + blog._id}><button title='delete'><RiDeleteBin6Fill />Delete</button></Link> */}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </>
                            }

                        </tbody>
                    </table>
                    {currentBlogs.length === 0 ? (
                        ""
                    ) : (
                        <div className='blogpagination'>
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                            {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`${currentPage === number ? 'active' : ''}`}
                                >
                                    {number}
                                </button>
                            ))}
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
                        </div>
                    )}
                </div>

            </div>
        </LoginLayout>
    </>
}