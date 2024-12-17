'use client'
import Card from '../../../../../components/card';
import ConfigDialog from '../../../../../components/ConfirmDialog'
import { useState ,useRef} from 'react'

export default function AdminKategoriForm() {
    const editorRef = useRef(null);
    const [modal, setModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalMessage, setModalMessage] = useState("")
    const [data, setData] = useState({
    nama:'',
    email:'',
    content:'',
     created_at:new Date(),
        
       
    });

    
    const clearData = ()=>{
        setData({
            nama:'',
    email:'',
    content:'',
     created_at:'',
        
       
           
        })
    }

    const inputHandler= (e) =>{
        setData({...data, [e.target.name]: e.target.value })
    }

    const onCancel=()=>{
        setModal(false)
        setModalTitle('')
        setModalMessage('')
        clearData()
    }

    async function onSubmitData() {
        try{
            
                const body = data
               
                let res = await fetch('/api/komentar', {
                    method:'POST',
                    body: JSON.stringify(body),
                })

                let resData = await res.json()
                if(!resData.data){
                throw Error(resData.message)
                }
                setModal(true)
                setModalTitle('Info')
                setModalMessage(resData.message)
            
        }catch(err){
          console.error("ERR", err.message)
          setModal(true)
          setModalTitle('Err')
          setModalMessage(err.message)
        }
      }

    return (
    <>

        <Card title="Komentar Form">
            <div className="w-full my-2">
                <label>Nama Kategori</label>
                    <input 
                        name='namaKategori'
                        value={data.namaKategori}
                        onChange={inputHandler}
                        type="text" 
                        className="w-full border my-input-text"/>
            </div>

          
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
    )
}