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

            if($user->url == "cart/handleClick/paymentAPI") {
                
                $sql = "UPDATE admin SET paymentAPI =:paymentAPI WHERE id = 1";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':paymentAPI', $user->paymentAPI);
                
                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update record.'];
                }
                echo json_encode($response);
            }else if($user->url == "success/useEffect") {
                $sql = "SELECT paymentAPI FROM admin WHERE id = 1";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($users);   
            }
            break;
    }
?>
