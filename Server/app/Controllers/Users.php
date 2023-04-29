<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
use CodeIgniter\I18n\Time;

class Users extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;    
    public function index()
    {
        $model = new UserModel();
        $data = $model->findAll();
        
        return $this->respond($data);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function verify()
    {
        $model = new UserModel();

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
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        $model = new UserModel();
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
        $model = new UserModel();

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
        $province = $this->request->getVar('province');
        $city = $this->request->getVar('city');
        $districts = $this->request->getVar('districts');
        $postalCode = $this->request->getVar('postalCode');
        $address = $this->request->getVar('address');
        $mobilePhone = $this->request->getVar('mobilePhone');
        $password = password_hash($this->request->getVar("password"), PASSWORD_BCRYPT, $option);
        $created_at =  new Time('now', 'Asia/Jakarta', 'id_ID');

        $data = [
            'fullName' => $fullName,
            'email' => $email,
            'province' => $province,
            'city' => $city,
            'districts' => $districts,
            'postalCode' => $postalCode,
            'address' => $address,
            'mobilePhone' => $mobilePhone,
            'password' => $password,
            'created_at' => $created_at,
        ];
        
        $doubleUser = $model->where('email', $email)->first();

        if(!$this->validate($rules) || !filter_var($email, FILTER_VALIDATE_EMAIL) || $doubleUser) {
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

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        $model = new UserModel();

        helper(['form']);

        $option = [
            "cost" => 12,
        ];

        $fullName = $this->request->getVar('fullName');
        $email = $this->request->getVar("email");
        $province = $this->request->getVar('province');
        $city = $this->request->getVar('city');
        $districts = $this->request->getVar('districts');
        $postalCode = $this->request->getVar('postalCode');
        $address = $this->request->getVar('address');
        $mobilePhone = $this->request->getVar('mobilePhone');
        $password = password_hash($this->request->getVar("password"), PASSWORD_BCRYPT, $option);
        $created_at =  new Time('now', 'Asia/Jakarta', 'id_ID');

        $isAllNotValid = $this->_validateAddressInputs($province, $city, $districts, $postalCode, $address, $mobilePhone);

        if($isAllNotValid) {
            $rules = [
                'fullName' => 'required',
                'email' => 'required',
                'password' => 'required',
            ];
        }

        $data = [
            'fullName' => $fullName,
            'email' => $email,
            'province' => $province,
            'city' => $city,
            'districts' => $districts,
            'postalCode' => $postalCode,
            'address' => $address,
            'mobilePhone' => $mobilePhone,
            'password' => $password,
            'created_at' => $created_at,
        ];

        $doubleUser = $model->where('email', $email)->get()->getRowArray();
        $currentUser = $model->where('id', $id)->get()->getRowArray();
        
        if($isAllNotValid) {
            if((!$this->validate($rules) || !filter_var($email, FILTER_VALIDATE_EMAIL) || !($doubleUser['email'] === $currentUser['email']))  ) {
                $response = [
                    'status' => 404,
                    'error' => 404,
                    'messages' => [
                        'failed' => 'Data you have input ERROR!'
                    ],
                ];
    
                return $this->fail($response);
            }
        }
    

        $findById = $model->find(['id' => $id]);
        print_r($id);
        
        if(!$findById) return $this->failNotFound("No Data Found!");

        $model->update($id, $data);

        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data Successfully Updated!'
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
        $model = new UserModel();
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

        // return $this->respondCreated($response);        
    }

     /**
     * Validates the address inputs.
     *
     * @param string|null $province
     * @param string|null $city
     * @param string|null $districts
     * @param string|null $postalCode
     * @param string|null $address
     * @param string|null $mobilePhone
     *
     * @return bool
     */
    private function _validateAddressInputs($province, $city, $districts, $postalCode, $address, $mobilePhone)
    {
        if (!$province || !$city || !$districts || !$postalCode || !$address || !$mobilePhone) {
            return true;
        }

        return false;
    }
}
