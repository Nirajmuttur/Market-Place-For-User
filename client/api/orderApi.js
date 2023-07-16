const create=(credentials,id)=>{
    return fetch('/api/order',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
        body:JSON.stringify(id)
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))

}

const order=(credentials,data)=>{
    return fetch('/api/orderData',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
        body:JSON.stringify(data)
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))
}

export{create,order}