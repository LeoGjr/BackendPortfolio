import Head from "next/head";
import { IoHome } from "react-icons/io5";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoginLayout from "@/components/LoginLayout";



export default function Home() {


  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  // use this on top for render error
  const [blogsData, setBlogsData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [shopsData, setShopsData] = useState([]);
  const [loading, setLoading] = useState(true);


  // Define options within the component scope
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Blogs Created Monthly by Year',
      },
    },
  };


  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogs');
        const responseproject = await fetch('/api/projects');
        const responseShop = await fetch('/api/shops');
        const responseGallery = await fetch('/api/photos');
        const data = await response.json();
        const dataproject = await responseproject.json();
        const dataShops = await responseShop.json();
        const dataPhotos = await responseGallery.json();
        setBlogsData(data); // Assuming data is an array of blog objects
        setProjectData(dataproject);
        setShopsData(dataShops);
        setPhotosData(dataPhotos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Aggregate data by year and month
  const monthlyData = blogsData.filter(dat => dat.status === "publish").reduce((acc, blog) => {
    const year = new Date(blog.createdAt).getFullYear(); // Get the year
    const month = new Date(blog.createdAt).getMonth(); // Get the month (0-indexed)
    acc[year] = acc[year] || Array(12).fill(0); // Initialize array for the year if not exists
    acc[year][month]++; // Increment count for the month
    return acc;
  }, {});

  const currentYear = new Date().getFullYear(); // Get the current year
  const years = Object.keys(monthlyData);
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const datasets = years.map(year => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0), // If no data for a month, default to 0
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`,
  }));

  const data = {
    labels,
    datasets,
  };


  return (
    <LoginLayout>
      <>
        <Head>
          <title>Blog Backend</title>
          <meta name="description" content="Blog website backend" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        {loading ? <div className="po-fixed-center"><Loading /></div> : <div className="dashboard">
          {/* title dashboard */}
          <div className="titledashboard flex flex-sb">
            <div data-aos="fade-right">
              <h2>Admin <span>Dashboard</span></h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb" data-aos="fade-left">
              <IoHome /> <span>/</span><span>Dashboard</span>
            </div>
          </div>
          {/* dashboard four cards */}
          <div className="topfourcards flex flex-sb">
            <div className="four_card" data-aos="fade-right">
              <h2>Total Blogs</h2>
              <span>{blogsData.filter(dat => dat.status === "publish").length}</span>
            </div>
            <div className="four_card" data-aos="fade-right">
              <h2>Total Projects</h2>
              <span>{projectData.filter(dat => dat.status === "publish").length}</span>
            </div>
            <div className="four_card" data-aos="fade-left">
              <h2>Total Shops</h2>
              <span>{shopsData.filter(dat => dat.status === "publish").length}</span>
            </div>
            <div className="four_card" data-aos="fade-left">
              <h2>Gallery Photos</h2>
              <span>{photosData.length}</span>
            </div>
          </div>
          {/* year overview */}
          <div className="year_overview flex flex-sb">
            <div className="leftyearoverview">
              <div className="flex flex-sb">
                <h3>Year Overview</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
                <h3 className="text-right">{blogsData.filter(dat => dat.status === "publish").length} / 365 <br /> <span>Total Published</span></h3>
              </div>
              <Bar data={data} options={options} />
            </div>
            <div className="right_salescont">
              <div>
                <h3>Blogs By Category</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
              </div>
              <div className="blogscategory flex flex-center">
                <table data-aos="fade-up">
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>Data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Next js</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "Next Js").length}</td>
                    </tr>
                    <tr>
                      <td>Css</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "Css").length}</td>
                    </tr>
                    <tr>
                      <td>Node Js</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "Node js").length}</td>
                    </tr>
                    <tr>
                      <td>Flutter Dev</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "Flutter Dev").length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>}

      </>
    </LoginLayout>
  );



}
