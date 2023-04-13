import Products from "../models/products"
import { productSchema } from "../schemas/products"
export const getAll =async(req, res)=>{
    const {_page=1, _limit=4, _order="asc", _sort="createAt"} = req.query
    const options={
        page:_page,
        limit:_limit,
        sort:{
            [_sort]:_order == "desc" ? -1 : 1,
        }
    }
    try {
        const products = await Products.paginate({},options)
         if(products.length===0){
            return res.json({
                message:"Không có sản phẩm"
            })
         }
        return res.status(201).json(products)
    } catch (error) {
        return res.status(400).json({
            message:error
        })
    }
}
export const get =async(req, res)=>{
    try {
        const products = await Products.findById(req.params.id)
        return res.status(201).json({ products})
    } catch (error) {
        return res.status(400).json({
            message:error
        })
    }
}
export const create =async(req, res)=>{
    try {     
        const {error} =  productSchema.validate(req.body,{abortEarly:false})
        console.log(error);  
        if(error){
            return res.status(403).json({
                message: error.details.map(err=>err.message)
            })
        }      
        const products = await Products.create(req.body)
        if(!products){
            return res.status(401).json({
                message:"Thêm thất bại"
            })
        }
        return res.status(201).json({
            message:"Thêm thành công",
            products
        })
    } catch (error) {
        return res.status(400).json({
            message:error
        })
    }
}
export const update =async(req, res)=>{
    try {
        const {error} =  productSchema.validate(req.body,{abortEarly:false})
        console.log(error);  
        if(error){
            return res.status(403).json({
                message: error.details.map(err=>err.message)
            })
        }      
        const products = await Products.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!products){
            return res.status(401).json({
                message:"Update thất bại"
            })
        }
        return res.status(201).json({
            message:"Update thành công",
            products
        })
    } catch (error) {
        return res.status(400).json({
            message:error
        })
    }
}
export const remove =async(req, res)=>{
    try {
        const products = await Products.findByIdAndRemove(req.params.id,{new:true})
        return res.status(200).json({
            message:"Xóa thành công",
            products
        })
    } catch (error) {
        return res.status(400).json({
            message:error
        })
    }
}