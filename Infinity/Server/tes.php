<?php
    include './setApi.php';
    
    include "./stripe-php-master/init.php";

    \Stripe\Stripe::setApiKey("sk_test_51LIBrVEJe7hR7YyeuA7U9k7kvD9CPR4dopq12oXhHsgXci8Y3YtQQDsaTi3dxT4aYPd4ZoNjquIlIVkeEclcHJvi00FAMZiPgy");
    // header('Content-Type: application/json');
    $user = json_decode(file_get_contents('php://input'));
    // print_r("tes");
    $YOUR_DOMAIN = "http://localhost:3000/";
    $tes = [];
    // print_r($user->price);
    foreach ($user as $value) {
        array_push($tes, ["price_data" => [
            "currency" => "IDR",
            "unit_amount" => $value->price * $value->quantity * 100,
            "product_data" => [
                "name" => $value->nameProduct,
                "images" => [$value->image],
            ],
        ],
        "quantity" => 1]);
    }

    // print_r($tes[0]);

        $checkout_session = \Stripe\Checkout\Session::create([
            "payment_method_types" => ["card"],
            "line_items" => [$tes],
            "mode" => "payment",
            "success_url" => $YOUR_DOMAIN . "success/{CHECKOUT_SESSION_ID}",
            "cancel_url" => $YOUR_DOMAIN . "?canceled=true",
        ]);        
    
    echo json_encode(["id" => $checkout_session->id]);

?>
