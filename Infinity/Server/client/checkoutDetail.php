<?php 
    include '../setApi.php';
    
    include '../DbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();
    
    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case "POST":
            $user = json_decode(file_get_contents('php://input'));
            $path = explode('/', $_SERVER['REQUEST_URI']);

            if($user->url == "success/getCheckout") {
                
                $sql = "INSERT INTO checkoutDetail(id, checkoutId, productId, quantity) 
                VALUES(null, :checkoutId, :productId, :quantity)";

                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':checkoutId', $user->checkoutId);
                $stmt->bindParam(':productId', $user->productId);
                $stmt->bindParam(':quantity', $user->quantity);
                if($stmt->execute()) {
                    $query = $conn->prepare("SELECT amount FROM product WHERE id = $user->productId");
                    $query->execute();
                    $query = $query->fetch();

                    if($query["amount"] > $user->quantity) {
                        $queries = "UPDATE product SET amount = :amount WHERE id = :id";
                        $queries = $conn->prepare($queries);
                        $queries->bindParam(':id', $user->productId);
                        $query["amount"] = $query["amount"] - $user->quantity;
                        $queries->bindParam(':amount', $query["amount"]);
                            
                    }else {
                        $queries = "DELETE FROM product WHERE id = :id";
                        $queries = $conn->prepare($queries);
                        $queries->bindParam(':id', $user->productId);    
                    }
                    
                    if(isset($user->userId)) {
                        $sql = "DELETE FROM cart WHERE userId = :userId";

                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':userId', $user->userId);

                        if($queries->execute() && $stmt->execute()) {
                            $response = ['status' => 1, 'message' => 'Delete successfully.'];
                        } else {
                            $response = ['status' => 0, 'message' => 'Failed to create record.'];
                        }
                    }else {
                        if($queries->execute()) {
                            $response = ['status' => 1, 'message' => 'Delete successfully.'];
                        } else {
                            $response = ['status' => 0, 'message' => 'Failed to create record.'];
                        }
                    }
                    
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create record.'];
                }
            }else if($user->url == "Dashboard/TableCustomer/getCheckoutDetail") {
                $sql = "SELECT checkoutdetail.id, checkoutdetail.checkoutId, checkoutdetail.quantity, product.nameProduct, product.price, product.amount, product.image, product.created_at, checkout.firstName, checkout.lastName 
                FROM checkoutdetail 
                INNER JOIN product ON checkoutdetail.productId=product.id 
                INNER JOIN checkout ON checkoutdetail.checkoutId=checkout.id";

                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($users);
            }
            
            break;
     }
?>
