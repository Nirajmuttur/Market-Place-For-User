const create = async(user)=>{
    try {
        let response = await fetch('/api/addUser',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(user)
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

const addAddress=async(credentials,addressData)=>{
    return fetch('/api/addAddress',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
        body:addressData
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))
}

const getAddress=async(credentials,signal)=>{
    try {
        let response = await fetch('/api/getAddress',{
            method:'GET',
            headers:{
                'Authorization':'Bearer '+credentials.t,
            },
            signal:signal
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

const getUserDeatils=async(credentials,signal)=>{
    try {
        let response = await fetch('/api/userdetails',{
            method:'GET',
            headers:{
                'Authorization':'Bearer '+credentials.t,
            },
            signal:signal
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export {create,addAddress,getAddress,getUserDeatils}