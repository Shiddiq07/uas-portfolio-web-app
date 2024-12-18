"use client"
import { useRouter, useParams } from 'next/navigation';
import Card from '../../../../../../components/card';
import { useEffect, useState, useRef } from 'react';
import ConfigDialog from '../../../../../../components/ConfirmDialog'
import { Editor } from '@tinymce/tinymce-react';

export default function Blogsbyid(){
    const params = useParams();
    const editorRef = useRef({});

    const [modal, setModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalMessage, setModalMessage] = useState("")
    const [komentar, setDataKomentar] = useState([])
    const [data, setData] = useState({
        nama:'',
        email:'',
        content:'',
        balasan:'',
        created_at:'',
        idBlog:`${params.id}`,
        updated_at:Date.now()
    });
    const [isLoading, setLoading] = useState(true)
    const clearKomentar = ()=>{
        setData({
          
            balasan:'',
        
        })
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
    const onFetchBlogs=async()=>{
        try{
            setLoading(true)
            let res = await fetch(`/api/balasan/${params.id}`)
            let data = await res.json()
            console.log(data.data)
            setData(data.data)
            setLoading(false)
        }catch(err){
            console.log('err', err)
            setData(null)
            setLoading(false)
        }
    }
   
    const onSubmitData=async ()=>{
        try{
            if (editorRef.current) {
                const body = data
                body.nama = editorRef.current['nama']?.getContent() || ""; // gunakan optional chaining dan default value
            body.email = editorRef.current['email']?.getContent() || "";
            body.content = editorRef.current['content']?.getContent() || "";
            body.balasan = editorRef.current['balasan']?.getContent() || "";
            body.created_at = editorRef.current['created_at']?.getContent() || "";


                let res = await fetch(`/api/balasan/${data._id}`, {
                    method:'PUT',
                    body: JSON.stringify(body),
                })

                let resData = await res.json()
                if(!resData.data){
                throw Error(resData.message)
                }
                setModal(true)
                setModalTitle('Info')
                setModalMessage(resData.message)
            }
        }catch(err){
          console.error("ERR", err.message)
          setModal(true)
          setModalTitle('Err')
          setModalMessage(err.message)
        }
    }
  
    useEffect(()=>{
        onFetchBlogs()
    },[])

    if(isLoading) return (<>Loading...</>)

    return (
        <>
            <div className='margin-0 mx-auto w-2/3'>
                <h2 className="text-center text-[32px] font-bold w-full">{data.nama}</h2>
                <div className='mt-10  ' dangerouslySetInnerHTML={{ __html: data.content }}/>
            </div>
            <Card title="Blogs Edit Form">
            
            <div className="hidden">
            <Editor className="hidden"
                    id='nama'
                    apiKey='m2afkqhuq0nwt7jf6mqbtbkpyxnf2radrrhi6s4kbu4mxdca'
                    onInit={(_evt, editor) =>  editorRef.current['nama'] = editor}
                    initialValue={data.nama}
                    init={{
                    height: 150,
                    menubar: false,
                    selector: '#nama',
                    // plugins: [
                    //     'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    //     'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    //     'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    // ],
                    // toolbar: 'undo redo | blocks | ' +
                    //     'bold italic forecolor | alignleft aligncenter ' +
                    //     'alignright alignjustify | bullist numlist outdent indent | ' +
                    //     'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
            <div className="hidden">
            <Editor className="hidden"
                    id='email'
                    apiKey='m2afkqhuq0nwt7jf6mqbtbkpyxnf2radrrhi6s4kbu4mxdca'
                    onInit={(_evt, editor) =>  editorRef.current['email'] = editor}
                    initialValue={data.email}
                    init={{
                    height: 150,
                    menubar: false,
                    selector: '#email',
                    // plugins: [
                    //     'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    //     'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    //     'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    // ],
                    // toolbar: 'undo redo | blocks | ' +
                    //     'bold italic forecolor | alignleft aligncenter ' +
                    //     'alignright alignjustify | bullist numlist outdent indent | ' +
                    //     'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
            <div className="hidden">
            <Editor className="hidden"
                    id='content'
                    apiKey='m2afkqhuq0nwt7jf6mqbtbkpyxnf2radrrhi6s4kbu4mxdca'
                    onInit={(_evt, editor) => editorRef.current['content'] = editor}
                    initialValue={data.content}
                    init={{
                    height: 150,
                    menubar: false,
                    selector: '#content',
                    // plugins: [
                    //     'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    //     'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    //     'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    // ],
                    // toolbar: 'undo redo | blocks | ' +
                    //     'bold italic forecolor | alignleft aligncenter ' +
                    //     'alignright alignjustify | bullist numlist outdent indent | ' +
                    //     'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
            <div className="hidden">
            <Editor className="hidden"
                    id='created_at'
                    apiKey='m2afkqhuq0nwt7jf6mqbtbkpyxnf2radrrhi6s4kbu4mxdca'
                    onInit={(_evt, editor) =>  editorRef.current['created_at'] = editor}
                    initialValue={data.created_at}
                    init={{
                    height: 150,
                    menubar: false,
                    selector: '#created_at',
                    // plugins: [
                    //     'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    //     'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    //     'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    // ],
                    // toolbar: 'undo redo | blocks | ' +
                    //     'bold italic forecolor | alignleft aligncenter ' +
                    //     'alignright alignjustify | bullist numlist outdent indent | ' +
                    //     'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
           
                        <Editor
                                id='balasan'
                                apiKey='m2afkqhuq0nwt7jf6mqbtbkpyxnf2radrrhi6s4kbu4mxdca'
                                onInit={(_evt, editor) =>  editorRef.current['balasan'] = editor}
                                initialValue={data.balasan}
                                init={{
                                height: 500,
                                menubar: false,
                                selector: '#balasan',
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
            
                        <button  className="btn-primary" onClick={onSubmitData}>
                            <span className="relative text-sm font-semibold text-white">
                                Save Data
                            </span>
                        </button> 
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