<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\AdminModel;
use CodeIgniter\I18n\Time;

class Admin extends ResourceController
{

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    use ResponseTrait;
    public function show($id = null)
    {
        $model = new AdminModel();
        $data = $model->find(['id' => $id]);

        if(!$data) return $this->failNotFound("No Data Found!");

        return $this->respond($data[0]);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    use ResponseTrait;
    public function verify()
    {
        $model = new AdminModel();

        helper(['form']);

        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');
        
        $getData = $model->where('email', $email)->first();

        
        if(!$getData) {
            $response = [
                'status' => 404,
                'error' => 404,
                'messages' => [
                    'failed' => 'Data you have input ERROR!'
                ],
            ];

            return $this->respond($response);
        }
        
        $validation = password_verify($password, $getData['password']);   
        
        $data = [
            'email' => $email,
            'password' => $password,
        ];
        
        if(!$validation) {
            $response = [
                'status' => 404,
                'error' => 404,
                'messages' => [
                    'failed' => 'Data you have input ERROR!'
                ],
            ];

            return $this->fail($response);
        }

        
        $model->validate($data);

        $response = [
            'status' => 201,
            'error' => null,
            'messages' => [
                'success' => 'Data Successfully Verify!',
                'id' => $getData["id"],
                'fullName' => $getData["fullName"],
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
        $model = new AdminModel();

        helper(['form']);
        $rules = [
            'fullName' => 'required',
            'email' => 'required',
            'password' => 'required',
        ];

        $option = [
            "cost" => 12,
        ];

        $fullName = $this->request->getVar('fullName');
        $email = $this->request->getVar("email");
        $password = password_hash($this->request->getVar("password"), PASSWORD_BCRYPT, $option);
        $created_at =  new Time('now', 'Asia/Jakarta', 'id_ID');

        $data = [
            'fullName' => $fullName,
            'email' => $email,
            'password' => $password,
            'created_at' => $created_at,
        ];

        if(!$this->validate($rules) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
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
        $getData = $model->where('email', $email)->first();

        $response = [
            'status' => 201,
            'error' => null,
            'messages' => [
                'success' => 'Data Successfully Created!',
                'id' => $getData['id'],
            ],
        ];

        return $this->respondCreated($response);
    }
}
