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
            
            // print_r
            if($user->url == "http://localhost:3000/addToCart") {
                $query = $conn->prepare("SELECT productId, userId FROM cart WHERE productId = $user->productId AND userId = $user->userId");
                $query->execute();                
                $result = $query->rowCount();

                if($result >= 1) {
                    echo false;
                }else {
                    $sql = "INSERT INTO cart(id, userId, productId, quantity) VALUES(null, :userId, :productId, :quantity)";
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':userId', $user->userId);
                    $stmt->bindParam(':productId', $user->productId);
                    $stmt->bindParam(':quantity', $user->quantity);
                    
                    if($stmt->execute()) {
                        $response = ['status' => 1, 'message' => 'Record created successfully.'];
                    } else {
                        $response = ['status' => 0, 'message' => 'Failed to create record.'];
                    }
                    echo json_encode($response);
                }

            }else if($user->url == "http://localhost:3000/GetCart") {
                $sql = "SELECT cart.id, cart.quantity, cart.productId, product.nameProduct, product.price, product.image
                FROM cart
                INNER JOIN product ON cart.productId=product.id
                WHERE userId = $user->userId";

                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($users);
            }else if($user->url == "http://localhost:3000/editCart") {
                $query = $conn->prepare("SELECT amount FROM product WHERE id = $user->productId");
                $query->execute();
                $query = $query->fetch();
                // print_r($user);
                $sql = "UPDATE cart SET quantity = :quantity WHERE id = :id AND :quantity <= $query[amount]";
                $stmt = $conn->prepare($sql);

                $stmt->bindParam(':id', $user->id);
                $stmt->bindParam(':quantity', $user->quantity);

                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update record.'];
                }
                echo json_encode($response);
            }else if($user->url == "http://localhost:3000/deleteCart") {
                $sql = "DELETE FROM cart WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $user->id);

                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                }
                echo json_encode($response);    
            }
            
            break;
     }
?>
