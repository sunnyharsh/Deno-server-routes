import { Product } from "../type.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let products: Product[] = [
  {
    id: "1",
    name: "Product One",
    desc: "this is product one",
    price: 29.99
  },
  {
    id: "2",
    name: "Product two",
    desc: "this is product two",
    price: 30.99
  },
  {
    id: "3",
    name: "Product three",
    desc: "this is product three",
    price: 39.99
  },
  {
    id: "4",
    name: "Product Four",
    desc: "this is product Four",
    price: 99.99
  }
];

//@desc      Get all product
//@route     Get /api/v1/products
const getProducts = ({ response }: { response: any }) => {
  response.body = {
    sucess: true,
    data: products
  };
};

//@desc      Get single product
//@route     Get /api/v1/product
const getProduct = ({
  params,
  response
}: {
  params: { id: string };
  response: any;
}) => {
  const obj: Product | undefined = products.find(p => p.id === params.id);
  if (obj) {
    response.status = 200;
    response.body = {
      success: true,
      data: obj
    };
  } else {
    response.status = 400;
    response.body = {
      success: false,
      message: "No product Found"
    };
  }
};

//@desc      Add product
//@route     Post /api/v1/product
const addProduct =async ({ request, response }: { request: any; response: any }) => {
  const body=await request.body()
  if(!request.hasBody){
      response.status=400
      response.body={
          sucess:false,
          msg:"No data"
      }
  }
  else{
      const product:Product=body.value;
      product.id=v4.generate();
      products.push(product)
      response.status=201
      response.body={
          sucess:true,
          data:product
      }
  }
};

//@desc      Update product
//@route     Put /api/v1/products/:id
const updateProduct =async ({params, request, response }: {params:{id:string},request:any, response: any }) => {
    const obj: Product | undefined = products.find(p => p.id === params.id);
    if (obj) {
      const body=await request.body();
      const updateData:{name? :string;desc? :string;price? :number; }=body.value

      products=products.map(p=>p.id===params.id ? {...p, ...updateData }:p)
      response.status=200;
      response.body={
          success:true,
          data:products
      }
    } else {
      response.status = 400;
      response.body = {
        success: false,
        message: "No product Found"
      };
    }
};

//@desc      Delete product
//@route     Delete /api/v1/products/:id
const deleteProduct = ({params, response }: {params:{id:string}, response: any }) => {
  products=products.filter(p=>p.id !== params.id);
  response.body={
      success:true,
      msg:"product removed"
  }
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
