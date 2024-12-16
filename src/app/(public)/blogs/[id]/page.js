"use client"

import Card from '../../../../components/card';
import { Editor } from '@tinymce/tinymce-react';
import ConfigDialog from '../../../../components/ConfirmDialog'

import { useState, useEffect,useRef } from 'react'
import { useParams } from 'next/navigation'

export default function Blogsbyid(){
    const params = useParams();
    const [isLoading, setLoading] = useState(true)
    const editorRef = useRef(null);
    const [modal, setModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalMessage, setModalMessage] = useState("")
    const [data, setData] = useState([]);
    const [komentar, setKomentar] = useState({
        nama:'',
        isiKomentar:'',
        created_at:new Date()
    });

    const clearKomentar = ()=>{
        setKomentar({
            nama:'',
            isiKomentar:'',
        })
    }

    const inputHandler= (e) =>{
        setKomentar({...komentar, [e.target.name]: e.target.value })
    }

    const onCancel=()=>{
        setModal(false)
        setModalTitle('')
        setModalMessage('')
        clearKomentar()
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
    const onFetchKomentar=async()=>{
        try{
            setLoadingKomentar(true)
            let res = await fetch(`/api/komentar/${params.id}`)
            let data = await res.json()
            setDataKomentar(data.data)
            setLoadingKomentar(false)
        }catch(err){
            console.log('err', err)
            setDataKomentar([])
            setLoadingKomentar(false)
        }
    }

    useEffect(()=>{
        onFetchBlogs()
        onFetchKomentar()
    },[])

    if(isLoading) return (<>Loading...</>)


        async function onSubmitData() {
            try{
                if (editorRef.current) {
                    const body = komentar
                    body.content = editorRef.current.getContent();
    
                    let res = await fetch('/api/komentar', {
                        method:'POST',
                        body: JSON.stringify(body),
                    })
    
                    let resKomentar = await res.json()
                    if(!resKomentar.komentar){
                    throw Error(resKomentar.message)
                    }
                    setModal(true)
                    setModalTitle('Info')
                    setModalMessage(resKomentar.message)
                }
            }catch(err){
              console.error("ERR", err.message)
              setModal(true)
              setModalTitle('Err')
              setModalMessage(err.message)
            }
          }
    
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
                <label>Komentar</label>
                <Editor
                    id='komentar'
                    apiKey='hz9os6h0p1826jcqknks4q1fm8yl9khctaa7nmexkf0rnx2e'
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue={komentar.komentar}
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