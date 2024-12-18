"use client"

import Card from '../../../../components/card';
import { Editor } from '@tinymce/tinymce-react';
import ConfigDialog from '../../../../components/ConfirmDialog'

import { useState, useEffect,useRef } from 'react'
import { useParams } from 'next/navigation'

export default function Blogsbyid(){
    const params = useParams();
    const [isLoading, setLoading] = useState(true)
    const [loadingKomen, setLoadingKomen] = useState(true)
    const editorRef = useRef(null);
    const [modal, setModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalMessage, setModalMessage] = useState("")
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [dataKomenById, setDataKomenById] = useState([]);
    const [komentar, setDataKomentar] = useState({
        nama:'',
        email:'',
        content:'',
        balasan:'',
        idBlog:`${params.id}`,
        created_at:new Date()
    });
    console.log()
const idBlog=`${params.id}`
    const clearKomentar = ()=>{
        setDataKomentar({
            nama:'',
            email:'',
            content:'',
            idBlog:`${params.id}`
        })
    }

    const inputHandler= (e) =>{
        setDataKomentar({...komentar, [e.target.name]: e.target.value })
    }  
    const handleRefresh = () => {
        window.location.reload();
      };


    const onCancel=()=>{
        setModal(false)
        setModalTitle('')
        setModalMessage('')
        clearKomentar()
        handleRefresh()

    }
   

    const onFetchKomentar=async()=>{
        try{
            setLoadingKomen(true)
            let res = await fetch(`/api/komentar/${params.id}`)
            let data = await res.json()
            console.log(data.data)
            setDataKomenById(data.data)
           
            setLoadingKomen(false)
        }catch(err){
            console.log('err', err)
           setDataKomenById([])
           setLoadingKomen(false)
        }
    }
    const handleKomentar = () => {
        const results = dataKomenById.filter((item) =>{
            
                return  item.idBlog.toLowerCase().includes(idBlog.toLowerCase())
            
        }
           
        );
        setFilteredData(results);
      };
        async function onSubmitData() {
            // const body = komentar
            //      body.content = editorRef.current.getContent();
                
            // console.log(body)
            try{
                if (editorRef.current) {
                    const body = komentar
                    body.content = editorRef.current.getContent();
    
                    let res = await fetch('/api/komentar', {
                        method:'POST',
                        body: JSON.stringify(body),
                    })
    
                    let resKomentar = await res.json()
                    if(!resKomentar.data){
                    throw Error(resKomentar.message)
                    }
                    setModal(true)
                    setModalTitle('Info')
                    setModalMessage(resKomentar.message)
                    handleRefresh()
                }
            }catch(err){
              console.error("ERR", err.message)
              setModal(true)
              setModalTitle('Err')
              setModalMessage(err.message)
            }
          }
         
    const onFetchBlogs=async()=>{
        try{
            setLoading(true)

            let res = await fetch(`/api/blogs/${params.id}`)
            let data = await res.json()
            setData(data.data)
            setLoading(false)
    
            
        }catch(err){
            console.log('err', err)
            setData(null)
            setLoading(false)

        }
    }
    useEffect(()=>{
        onFetchBlogs()
         onFetchKomentar()
         handleKomentar()
    },[])
 
console.log(dataKomenById)
    if(isLoading) return (<>Loading...</>)
    if(loadingKomen) return (<>Memuat Komentar...</>)
    
      
    return (
        <>
            <div className='margin-0 mx-auto w-2/3'>
                <h2 className="text-center text-[32px] font-bold w-full">{data.title}</h2>
                <div className='mt-10  ' dangerouslySetInnerHTML={{ __html: data.content }}/>
            </div>

            <Card title="Komentar">
            <div className="w-full my-2">
                <label>Nama</label>
                    <input 
                        name='nama'
                        value={komentar.nama}
                        onChange={inputHandler}
                        type="text" 
                        className="w-full border my-input-text"/>
            </div>
            <div className="w-full my-2">
                <label>Email</label>
                    <input 
                        name='email'
                        value={komentar.email}
                        onChange={inputHandler}
                        type="text" 
                        className="w-full border my-input-text"/>
            </div>

         
            <div className="w-full my-2">
                <label>Komentar</label>
                <Editor
                    id='content'
                    apiKey='m2afkqhuq0nwt7jf6mqbtbkpyxnf2radrrhi6s4kbu4mxdca'
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue={komentar.content}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
            <div className='inline-flex items-between'>
                <div > <button  className="btn-primary" onClick={onSubmitData}>
                <span className="relative text-sm font-semibold text-white">
                    Save Data
                </span>
            </button></div>

             <div>

             </div>
  
            </div>
         
        </Card>
     
        <Card>
        <div> <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className='table-head border-blue-gray-100'>No</th>
                        <th className='table-head border-blue-gray-100'>Nama</th>
                        <th className='table-head border-blue-gray-100'>Komentar</th>
                        <th className='table-head border-blue-gray-100'>Balasan</th>
                    </tr>
                </thead>
                <tbody>
                  
                {!loadingKomen && dataKomenById.length > 0 && dataKomenById.map((item, key)=>{
                        return (
                            <tr key={key} className='border-b border-blue-gray-50 '>
                                <td className='p-2 text-center'>{key+1}</td>
                                <td className='p-2 text-center'>{item.nama} </td>
                                <td className='p-2 text-center'><p dangerouslySetInnerHTML={{ __html: item.content }} /></td>
                                <td className='p-2 text-center'><p dangerouslySetInnerHTML={{ __html: item.balasan }} />
                                    {/* <div className="inline-flex text-[12px]">
                                        <button
                                        onClick={()=>goToDetail(item._id)}
                                        className=" bg-green-300 hover:bg-green-400 text-gray-800 py-2 px-4 rounded-l">
                                            Detail
                                        </button>
                                        <button 
                                            onClick={()=>gotoEditPage(item._id)}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4">
                                            Edit
                                        </button>
                                        <button 
                                            onClick={()=>onConfirmDelete(item._id)}
                                            className="bg-red-300 hover:bg-red-400 text-gray-800 py-2 px-4 rounded-r">
                                            Delete
                                        </button>
                                    </div> */}
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            </div>
        </Card>
        <ConfigDialog  
            onOkOny={()=>onCancel()} 
            showDialog={modal}
            title={modalTitle}
            message={modalMessage}
            onCancel={()=>onCancel()} 
            onOk={()=>onCancel()} 
            isOkOnly={true} />
    
        </>
    );
}