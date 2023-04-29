<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\Products;
use App\Models\CartModel;
use App\Models\ProductModel;
use App\Models\UserModel;

class Carts extends ResourceController
{
    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    use ResponseTrait;

    public function getCartItems() {
        $cartModel = new CartModel();
        $userModel = new UserModel();

        helper(['form']);

        $userId = $this->request->getVar('userId');
        
        $user = $userModel->find(['id', $userId]);

        if(!$user) return $this->failNotFound("No Data Found!");
        
        $cartItems = $cartModel->select('carts.id, carts.quantity, carts.productId, products.nameProduct, products.price, products.amount, products.image')
            ->join('products', 'carts.productId=products.id')
            ->where('userId', $userId)
            ->orderBy('carts.id', 'ASC')
            ->findAll();

        return $this->respond($cartItems);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function subtractCartItem() {
        $cartModel = new CartModel();
        $productModel = new ProductModel();

        helper(['form']);

        $rules = [
            'userId' => 'required',
            'productId' => 'required',
            'quantity' => 'required',
        ];
        
        $id = $this->request->getVar('id');
        $userId = $this->request->getVar('userId');
        $productId = $this->request->getVar("productId");
        $quantity = $this->request->getVar("quantity");
        
        $findById = $cartModel->find(['id' => $id]);
        
        if(!$findById) return $this->failNotFound("No Data Found!");
        

        if(!$this->validate($rules)) {
            $response = [
                'status' => 404,
                'error' => 404,
                'messages' => [
                    'failed' => 'Data you have input ERROR!'
                ],
            ];

            return $this->fail($response);
        }

        $getAmount = $productModel->select('amount')->where('id', $productId)->first();
        $productController = new Products();

        if($getAmount['amount'] > $quantity) {
            $quantity = $getAmount['amount'] - $quantity;

            $data = [
                'userId' => $userId,
                'productId' => $productId,
                'quantity' => $quantity,
            ];

            session()->set('getProduct', $data);

            $productController->update($productId);
        }else {
            $productController->delete($productId);
        }
        
        $this->delete($id);
            
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Cart Successfully Deleted!'
            ],
        ];

        return $this->respondCreated($response);
    }


    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        $cartModel = new CartModel();

        helper(['form']);
        
        $rules = [
            'userId' => 'required',
            'productId' => 'required',
            'quantity' => 'required',
        ];
        
        $userId = $this->request->getVar('userId');
        $productId = $this->request->getVar("productId");
        $quantity = $this->request->getVar("quantity");
        
        $data = [
            'userId' => $userId,
            'productId' => $productId,
            'quantity' => $quantity,
        ];

        if(!$this->validate($rules)) {
            $response = [
                'status' => 404,
                'error' => 404,
                'messages' => [
                    'failed' => 'Data you have input ERROR!'
                ],
            ];

            return $this->fail($response);
        }
        
        $doubleCart = $cartModel->where('userId', $userId)->where('productId', $productId)->first();

        if($doubleCart) {
            $response = [
                'status' => 404,
                'error' => 404,
                'messages' => [
                    'failed' => 'You already add to cart!'
                ],
            ];

            return $this->fail($response);
        }

        $cartModel->save($data);

        $getCartId = $cartModel->select('id')->where('userId', $userId)->where('productId', $productId)->first();

        $response = [
            'status' => 201,
            'error' => null,
            'messages' => [
                'success' => 'Cart Successfully Created!',
                'id' => $getCartId['id'],
            ],
        ];

        return $this->respondCreated($response);
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        $cartModel = new CartModel();
        $productModel = new ProductModel();
        
        helper(['form']);

        $userId = $this->request->getVar('userId');
        $productId = $this->request->getVar("productId");
        $quantity = $this->request->getVar("quantity");

        $data = [
            'userId' => $userId,
            'productId' => $productId,
            'quantity' => $quantity,
        ];

        $getProduct = $productModel->where('id', $productId)->first();

        if(!$getProduct || $quantity > $getProduct['amount']) {
            $response = [
                'status' => 404,
                'error' => 404,
                'messages' => [
                    'failed' => 'Data you have add ERROR!'
                ],
            ];

            return $this->fail($response);
        }

        $findById = $cartModel->find(['id' => $id]);
        
        if(!$findById) return $this->failNotFound("No Data Found!");

        $cartModel->update($id, $data);

        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Cart Successfully Updated!'
            ],
        ];

        return $this->respondCreated($response);
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        $model = new CartModel();

        $model->delete($id);

        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Cart Successfully Deleted!'
            ],
        ];

        print_r($response);
    }
}
