<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ProductModel;
use CodeIgniter\I18n\Time;

class Products extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {
        $model = new ProductModel();
        $data = $model->findAll();

        return $this->respond($data);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        $model = new ProductModel();
        $data = $model->find(['id' => $id]);

        if(!$data) return $this->failNotFound("No Data Found!");

        return $this->respond($data[0]);
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        $model = new ProductModel();

        helper(['form']);

        $rules = [
            'nameProduct' => 'required', 
            'price'=> 'required',  
            'amount'=> 'required', 
            'specification'=> 'required',  
            'type'=> 'required',  
            'image'=> 'required',  
        ];

        $nameProduct = $this->request->getVar('nameProduct');
        $price = $this->request->getVar("price");
        $amount = $this->request->getVar('amount');
        $specification = $this->request->getVar("specification");
        $type = $this->request->getVar('type');
        $image = $this->request->getVar("image");
        $created_at =  new Time('now', 'Asia/Jakarta', 'id_ID');

        $data = [
            'nameProduct' => $nameProduct,
            'price' => $price,
            'amount' => $amount,
            'specification' => $specification,
            'type' => $type,
            'image' => $image,
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
                'success' => 'Data Successfully Created!',
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
        $model = new ProductModel();

        helper(['form']);

        $session = session()->get('getProduct');
        if(!$session) {
            $data = $this->getDataFromRequest();

            if(!$this->validateProducts()) {
                $response = [
                    'status' => 404,
                    'error' => 404,
                    'messages' => [
                        'failed' => 'Data you have input ERROR!'
                    ],
                ];
    
                return($this->fail($response));
            }
        }

        $findById = $model->find(['id' => $id]);
                
        if(!$findById) print_r($this->failNotFound("No Data Found!"));

        

        if(!$session) {
            $model->update($id, $data);
        }else {
            $data = [
                'amount' => $session['quantity'],
            ];
            
            $model->set($data)->where('id', $id)->update();
        }

        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data Successfully Updated!'
            ],
        ];

        print_r($response);
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        $model = new ProductModel();
        $findById = $model->find(['id' => $id]);
        
        if(!$findById) return $this->failNotFound("No Data Found!");

        $model->delete($id);

        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data Successfully Deleted!'
            ],
        ];

        print_r($response);
    }


    /**
     * Get input data from the request
     *
     * @return array
     */
    private function getDataFromRequest()
    {
        return [
            'nameProduct' => $this->request->getVar('nameProduct'),
            'price' => $this->request->getVar('price'),
            'amount' => $this->request->getVar('amount'),
            'specification' => $this->request->getVar('specification'),
            'type' => $this->request->getVar('type'),
            'image' => $this->request->getVar('image'),
            'created_at' => new Time('now', 'Asia/Jakarta', 'id_ID'),
        ];
    }

    /**
     * Validate the input data
     * @return bool
     */
    private function validateProducts()
    {
        $rules = [
            'nameProduct' => 'required', 
            'price'=> 'required',  
            'amount'=> 'required', 
            'specification'=> 'required',  
            'type'=> 'required',  
            'image'=> 'required',  
        ];

        return $this->validate($rules);
    }
}
