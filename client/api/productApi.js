const productList = async(signal)=>{
    try {
        let response = await fetch('/api/productlist',{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            signal:signal
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

const productById=async(params,signal)=>{
    try {
        let response = await fetch('/api/productDetail/'+params.id,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            signal:signal
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

const productByCategory=async(params,signal)=>{
    try {
        let response = await fetch('/api/productByCategory/'+params.id,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            signal:signal
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export {productList,productById,productByCategory}