import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import { MdDeleteForever } from "react-icons/md";
import Head from "next/head";

export default function Shop(

    {
        _id,
        title: existingTitle,
        slug: existingSlug,
        images: existingImages,
        description: existingDescription,
        tags: existingTags,
        price: existingPrice,
        afilink: existingAfilink,
        status: existingStatus,
    }

) {

    const [redirect, setRedirect] = useState(false)
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '')
    const [slug, setSlug] = useState(existingSlug || '')
    const [images, setImages] = useState(existingImages || [])
    const [description, setDescription] = useState(existingDescription || '')
    const [tags, setTags] = useState(existingTags || [])
    const [price, setPrice] = useState(existingPrice || '')
    const [afilink, setAfilink] = useState(existingAfilink || '')
    const [status, setStatus] = useState(existingStatus || '')

    const [isUploading, setIsUploading] = useState(false);

    const uploadImagesQueue = [];


    async function createProduct(ev) {
        ev.preventDefault();

        if (isUploading) {
            await Promise.all(uploadImagesQueue)
        }

        const data = { title, slug, images, description, tags, price, afilink, status };

        if (_id) {
            await axios.put('/api/shops', { ...data, _id })
            toast.success('Data Updated!')
        } else {
            await axios.post('/api/shops', data)
            toast.success('Product Created!')
        }

        setRedirect(true);
    };

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);

            for (const file of files) {
                const data = new FormData();
                data.append('file', file);

                // Use the axios.post method and push the promise to the queue
                uploadImagesQueue.push(
                    axios.post('/api/upload', data)
                        .then(res => {
                            setImages(oldImages => [...oldImages, ...res.data.links]);
                        })
                );
            }

            // Wait for all images to finish uploading
            await Promise.all(uploadImagesQueue);

            setIsUploading(false);
            toast.success('Image uploaded')
        } else {
            toast.error('An error occurred!')
        }
    }

    if (redirect) {
        router.push('/shops')
        return null;
    }

    function updateImagesOrder(images) {
        setImages(images)
    }

    function handleDeleteImage(index) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        toast.success('image deleted successfully!!')
    }


    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        // console.log("Input Value:", inputValue);

        const newSlug = inputValue
            // Replace spaces with hyphens
            .replace(/\s+/g, '-');

        console.log("New Slug:", newSlug);
        setSlug(newSlug);
    };


    return <>
        <Head>
            <title>Add Product</title>
        </Head>

        <form onSubmit={createProduct} className='addWebsiteform'>
            {/* Product title */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="title">Title</label>
                <input type="text" id='title' placeholder='Enter small title'
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
            </div>
            {/* Product slug url */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="slug">Slug</label>
                <input type="text" id='slug' placeholder='Enter slug title'
                    value={slug}
                    onChange={handleSlugChange}
                />
            </div>


            {/* Project Images */}
            <div className='w-100 flex flex-col flex-left mb-2'>
                <div className='w-100'>
                    <label htmlFor="images">Images (first image will be show as thumbnail, you can drag)</label>
                    <input type="file" id='fileInput' className='mt-1' accept='image/*' multiple onChange={uploadImages} />
                </div>
                <div className="w-100 flex flex-left">
                    {isUploading && (
                        <Spinner />
                    )}
                </div>
            </div>

            {!isUploading && (
                <div className='flex'>
                    <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200} className='flex gap-1' >
                        {images?.map((link, index) => (
                            <div key={link} className='uploadedimg'>
                                <img src={link} alt="image" className='object-cover' />
                                <div className='deleteimg'  >
                                    <button onClick={() => handleDeleteImage(index)}>
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            )}

            {/* markdown description */}
            <div className='description w-100 flex flex-col flex-left mb-2'>
                <label htmlFor="description">Project description (for image: first upload and copy link and paste in ![alt text](link) )</label>
                <MarkdownEditor
                    value={description}
                    onChange={(ev) => setDescription(ev.text)}
                    style={{ width: '100%', height: '400px' }} // You can adjust the height as needed
                    renderHTML={(text) => (
                        <ReactMarkdown components={{
                            code: ({ node, inline, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '');
                                if (inline) {
                                    return <code>{children}</code>;
                                } else if (match) {
                                    return (
                                        <div style={{ position: 'relative' }}>
                                            <pre style={{ padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' }} {...props}>
                                                <code >{children}</code>
                                            </pre>
                                            <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }} onClick={() => navigator.clipboard.writeText(children)}>
                                                Copy code
                                            </button>
                                        </div>
                                    );
                                } else {
                                    return <code {...props}>{children}</code>;
                                }
                            },
                        }}>
                            {text}
                        </ReactMarkdown>
                    )}
                />
            </div>

            {/* tags */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="tags">Tags (ctrl + leftclick for multiple select)</label>
                <select onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))} name="tags" id="tags" multiple value={tags}>
                    <option value="ADAPTER">ADAPTER</option>
                    <option value="USB C">USB C</option>
                    <option value="GRAPHIC">GRAPHIC</option>
                    <option value="GIMBAL">GIMBAL</option>
                    <option value="CONTENT CREATORS">CONTENT CREATORS</option>
                    <option value="DESK">DESK</option>
                    <option value="STANDING DESK">STANDING DESK</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {existingTags && existingTags.length > 0 && (
                    <span>{existingTags.join(', ')}</span>
                )}</p>
            </div>

            {/* Product Price */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="price">Price</label>
                <input type="text" id='price' placeholder='Enter Price'
                    value={price}
                    onChange={ev => setPrice(ev.target.value)}
                />
            </div>
            {/* Product afilink */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="afilink">Afilate link</label>
                <input type="text" id='afilink' placeholder='Enter afilink'
                    value={afilink}
                    onChange={ev => setAfilink(ev.target.value)}
                />
            </div>
            {/* Project status */}
            <div className='w-100 flex flex-col flex-left mb-2' >
                <label htmlFor="status">Status</label>
                <select onChange={(e) => setStatus(e.target.value)} name="status" id="status" value={status}>
                    <option value="">No Select</option>
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {existingStatus && existingStatus.length > 0 && (
                    <span>{existingStatus}</span>
                )}</p>
            </div>


            <div className='w-100 mb-2'>
                <button type='submit' className='w-100 addwebbtn flex-center'>SAVE DATA</button>
            </div>

        </form>

    </>
}

