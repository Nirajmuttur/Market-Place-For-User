const create=(credentials,cartData)=>{
    return fetch('/api/addcartitems',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
        body:cartData
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))

}

const increaseQuantity=(credentials,q)=>{
    return fetch('/api/increaseQuantity/'+q.id,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))
}

const decreaseQuantity=(credentials,q)=>{
    return fetch('/api/decreaseQuantity/'+q.id,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))
}

const removeCartItem=(credentials,q)=>{
    return fetch('/api/removeCartItems/'+q.id,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))
}

export {create,increaseQuantity,decreaseQuantity,removeCartItem}