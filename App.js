import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Modal, Button, Input, Form,Space} from 'antd';
import {DeleteOutlined, EditOutlined,LoadingOutlined} from "@ant-design/icons";
import axios from 'axios';
import Loader from './loader';




function App() {

  const [visible, setVisible] = useState(false);
  const [load, setLoad] = useState(false);
  const [body, setBody] = useState({});
  const [data, setData] = useState([]);// first api
  const [titlename,setTitlename] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState(null);
  const[api,setDataapi]=useState();


	useEffect(()=>{
		apiGet();
	},[]);
  
 const apiGet=async ()=>{
   try
   {
     const data=await axios.get("https://jsonplaceholder.typicode.com/posts").then(res=>{
      setData(res.data);
      
     });
    }catch(e){
      console.log(e);
    }
   }
 
  
const OnFinish = () => {
  setLoad(false);
    data[id].body =  body;
   data[id].title =  title;
  //  const returnedTarget = Object.assign(data, api);
  //  console.log("apreturnedTarget",returnedTarget);
   handleReset();  
    
  }

const handleReset = ()=>{
  setVisible(false);
  setBody('');
  setTitle('');
  setId('');
}

  const editRow = (data,ID) => {
  
    setTitlename('Edit ');
    setVisible(true);
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({data })
      };
      
      fetch('https://jsonplaceholder.typicode.com/posts/' + data.id, requestOptions)
          .then(async response => {
              const dataapi = await response.json();
              const api=dataapi;
              setDataapi(api)
              console.log("data two api",api)
             
              setId(ID);
          })
          // const url='https://jsonplaceholder.typicode.com/posts/' + data.id;
          // url.push(setData);
          console.log("setdata",setData)
   const { body,title } = data;
   setId(id);
   setTitle(title);
   setBody(body);
   
  };


  const handleCancel = () => {
    handleReset();
  };
     const dataSource = (data) => [
      data.map((data)=>
        ({
          key:data.id,
          userId:data.userId,
          id:data.id,
          title:data.title,
          body:data.body,
        }))]		
      


	const columns = [
		{
		  title: 'UserId',
		  dataIndex: 'userId',
		  key: 'userId',
		},
		  {
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		  },
		  
			{
			  title: 'Title',
			  dataIndex: 'title',
			  key: 'title',
			},
			{
			  title: 'Body',
			  dataIndex: 'body',
			  key: 'body',
			},
    {
      title: 'Action',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record, ID) => (
       <div>
       <Space>
        <EditOutlined  onClick={() => editRow(record,ID)}/>
        <DeleteOutlined />
        </Space>
    </div> 

        
      ),
    },
  ];
  
  return (
    <div>
     
     <Table dataSource={data} columns={columns} />
      <Modal
        visible={visible}
        title={titlename}
        width={1350}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
            </Button>,
          <Button key="submit" type="primary" onClick={OnFinish}>
            Submit
            </Button>
        ]}

      >
      { 
        !load? 
      
      <Form>
      <Form.Item  label="Body" rules={[{ required: true }]}>
    
        <Input
          type="text"
          name="body"
          value={body}
          placeholder="body..."
          
          onChange={(e) => setBody(e.target.value)}
        />
       </Form.Item>
       <Form.Item  label="Title" rules={[{ required: true }]}>
       
        <Input
          type="text"
          name="price"
          value={title}
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        </Form.Item>
        </Form>:<Loader />}
      </Modal>
     
    </div>
  );
}
export default App;
