<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Models\PaymentAPIModel;
use CodeIgniter\I18n\Time;

class Paymentapi extends ResourceController
{
    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    use ResponseTrait;
    public function show($id = null)
    {
        $model = new PaymentAPIModel();

        $data = $model->where('userId', $id)->first();

        if(!$data) return $this->failNotFound("No Data Found!");

        return $this->respond($data);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    use ResponseTrait;
    public function createSession()
    {
        Stripe::setApiKey(getenv('STRIPE_KEY'));

        helper(['form']);

        $user = $this->request->getVar();

        $YOUR_DOMAIN = "http://localhost:3000/";
        $items = [];

        foreach ($user as $value) {
            array_push($items, [
                "price_data" => [
                    "currency" => "IDR",
                    "unit_amount" => $value->price * $value->quantity * 100,
                    "product_data" => [
                        "name" => $value->nameProduct,
                        "images" => [$value->image],
                    ],
                ],
                "quantity" => 1
            ]);
        }
        $checkout_session = Session::create([
            "payment_method_types" => ["card"],
            "line_items" => [$items],
            "mode" => "payment",
            "success_url" => $YOUR_DOMAIN . "success/{CHECKOUT_SESSION_ID}",
            "cancel_url" => $YOUR_DOMAIN . "?canceled=true",
        ]);

        $response = [
            'status' => 201,
            'error' => null,
            'messages' => [
                'checkout_session' => $checkout_session->id,
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
        $paymentModel = new PaymentAPIModel();

        helper(['form']);
        
        $rules = [
            'userId' => 'required',
            'paymentAPI' => 'required',
        ];

        $userId = $this->request->getVar('userId');
        $paymentAPI = $this->request->getVar("paymentAPI");
        $created_at =  new Time('now', 'Asia/Jakarta', 'id_ID');

        $data = [
            'userId' => $userId,
            'paymentAPI' => $paymentAPI,
            'created_at' => $created_at,
        ];
        
        $getData = $paymentModel->where('userId', $userId)->first();

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

        if($getData) {
            $this->update($getData);
            return "";
        }
        
        $paymentModel->save($data);

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
        $model = new PaymentAPIModel();

        helper(['form']);

        $userId = $this->request->getVar('userId');
        $paymentAPI = $this->request->getVar("paymentAPI");
        $created_at =  new Time('now', 'Asia/Jakarta', 'id_ID');

        $data = [
            'userId' => $userId,
            'paymentAPI' => $paymentAPI,
            'created_at' => $created_at,
        ];
        
        $model->set($data)->where('userId', $userId)->update();

        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data Successfully Updated!'
            ],
        ];

        print_r($response);
    }
}
