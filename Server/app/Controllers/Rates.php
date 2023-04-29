<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\RateModel;
use CodeIgniter\I18n\Time;

class Rates extends ResourceController
{
    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    use ResponseTrait;
    public function show($id = null)
    {
        $model = new RateModel();
        // $data = $model->find(['productId' => $id]);

        $ratesData = $model->select('rate')->where('productId', $id)->findAll();
        
        if(!$ratesData) return $this->failNotFound("No Data Found!");

        return $this->respond($ratesData);
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        $model = new RateModel();

        helper(['form']);

        $rules = [
            'userId' => 'required',
            'productId' => 'required',
        ];

        $userId = $this->request->getVar('userId');
        $productId = $this->request->getVar("productId");        
        $rate = $this->request->getVar("rate");        
        $created_at =  new Time('now', 'Asia/Jakarta', 'id_ID');

        $data = [
            'userId' => $userId,
            'productId' => $productId,
            'rate' => $rate,
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
        
        $doubleRate = $model->where('userId', $userId)->where('productId', $productId)->first();

        if($doubleRate) {
            $response = [
                'status' => 404,
                'error' => 404,
                'messages' => [
                    'failed' => 'You already add Rates!'
                ],
            ];

            return $this->fail($response);
        }

        $model->save($data);

        $response = [
            'status' => 201,
            'error' => null,
            'messages' => [
                'success' => 'Rating Successfully Created!',
            ],
        ];

        return $this->respondCreated($response);
    }
}
