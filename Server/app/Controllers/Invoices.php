<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

use CodeIgniter\API\ResponseTrait;
use App\Models\InvoiceModel;
use App\Models\UserModel;
use CodeIgniter\I18n\Time;

class Invoices extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function show($id = null)
    {
        $invoiceModel = new InvoiceModel();
        $userModel = new UserModel();

        helper(['form']);
        
        $user = $userModel->find(['id', $id]);

        if(!$user) return $this->failNotFound("No Data Found!");
        
        $cartItems = $invoiceModel->select('invoices.id, invoices.userId, invoices.quantity, products.nameProduct, products.price, products.amount, products.image, products.created_at, users.fullName')
            ->join('products', 'invoices.productId=products.id')
            ->join('users', 'invoices.userId=users.id')
            ->where('userId', $id)
            ->orderBy('invoices.id', 'ASC')
            ->findAll();

        return $this->respond($cartItems);
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        $model = new InvoiceModel();

        helper(['form']);
        
        $rules = [
            'userId' => 'required',
            'productId' => 'required',
            'quantity' => 'required',
        ];
        
        $userId = $this->request->getVar('userId');
        $productId = $this->request->getVar("productId");
        $quantity = $this->request->getVar("quantity");
        $created_at =  new Time('now', 'Asia/Jakarta', 'id_ID');
        
        $data = [
            'userId' => $userId,
            'productId' => $productId,
            'quantity' => $quantity,
            'created_at' => $created_at,
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
        
        $model->save($data);

        $response = [
            'status' => 201,
            'error' => null,
            'messages' => [
                'success' => 'Invoice Successfully Created!',
            ],
        ];

        return $this->respondCreated($response);
    }
}
